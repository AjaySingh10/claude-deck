import * as vscode from 'vscode';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import { buildWebviewHtml, handleMessage, sendInstalled, sendStack, WebviewContext } from './webviewShared';
import { getWorkspaceInfo } from './skillsSidebar';

export class SkillsPanel {
  static readonly viewType = 'claude-deck.panel';
  private static _instance: SkillsPanel | undefined;

  private readonly _panel: vscode.WebviewPanel;
  private _disposables: vscode.Disposable[] = [];

  static createOrShow(context: vscode.ExtensionContext): void {
    if (SkillsPanel._instance) { SkillsPanel._instance._panel.reveal(); return; }
    const panel = vscode.window.createWebviewPanel(
      SkillsPanel.viewType, 'Claude Deck', vscode.ViewColumn.One,
      { enableScripts: true, retainContextWhenHidden: true }
    );
    SkillsPanel._instance = new SkillsPanel(panel);
  }

  static navigateToTab(tab: string, scope?: string): void {
    if (!SkillsPanel._instance) { return; }
    SkillsPanel._instance._panel.reveal();
    SkillsPanel._instance._panel.webview.postMessage({ type: 'navigateTab', tab, scope });
  }

  private constructor(panel: vscode.WebviewPanel) {
    this._panel = panel;
    const { projectPath, projectName } = getWorkspaceInfo();
    this._panel.webview.html = buildWebviewHtml(projectPath, projectName);

    const ctx: WebviewContext = { webview: panel.webview, projectPath, projectName };
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    this._panel.webview.onDidReceiveMessage(msg => handleMessage(msg, ctx), null, this._disposables);

    setTimeout(() => { sendInstalled(ctx, 'global'); sendStack(ctx); }, 200);

    const watchDirs = [path.join(os.homedir(), '.claude')];
    if (projectPath) watchDirs.push(path.join(projectPath, '.claude'));
    for (const dir of watchDirs) {
      try {
        if (!fs.existsSync(dir)) { fs.mkdirSync(dir, { recursive: true }); }
        let debounce: ReturnType<typeof setTimeout> | undefined;
        const w = fs.watch(dir, { persistent: false }, (_, filename) => {
          if (filename === 'settings.json') {
            clearTimeout(debounce);
            debounce = setTimeout(() => sendStack(ctx), 100);
          }
        });
        this._disposables.push({ dispose: () => { clearTimeout(debounce); w.close(); } });
      } catch { /* ignore */ }
    }
  }

  dispose(): void {
    SkillsPanel._instance = undefined;
    this._panel.dispose();
    this._disposables.forEach(d => d.dispose());
    this._disposables = [];
  }
}
