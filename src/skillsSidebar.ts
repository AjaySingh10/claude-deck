import * as vscode from 'vscode';
import * as path from 'path';
import * as manager from './skillsManager';
import * as settings from './settingsManager';
import * as memory from './memoryManager';

export class SkillsSidebarProvider implements vscode.WebviewViewProvider {
  constructor(private readonly context: vscode.ExtensionContext) {}

  resolveWebviewView(view: vscode.WebviewView): void {
    view.webview.options = { enableScripts: true };
    view.webview.html = buildSidebarHtml();

    view.webview.onDidReceiveMessage(msg => {
      if (msg.type === 'openPanel') {
        vscode.commands.executeCommand('claude-deck.open');
      } else if (msg.type === 'openPanelTab') {
        vscode.commands.executeCommand('claude-deck.openTab', msg.tab, msg.scope);
      }
    });

    const push = () => {
      const { projectPath } = getWorkspaceInfo();
      const gSkills = manager.getInstalledSkills('global');
      const pSkills = projectPath ? manager.getInstalledSkills('project', projectPath) : [];
      const memFiles = memory.getMemoryFiles();
      view.webview.postMessage({
        type: 'update',
        global: {
          skills: gSkills.length,
          mcps:   settings.getActiveMCPs('global').length,
          hooks:  settings.getActiveHooks('global').length,
        },
        project: {
          available: !!projectPath,
          name: projectPath ? path.basename(projectPath) : 'Project',
          skills: pSkills.length,
          mcps:   projectPath ? settings.getActiveMCPs('project', projectPath).length : 0,
          hooks:  projectPath ? settings.getActiveHooks('project', projectPath).length : 0,
        },
        memory: memFiles.length,
      });
    };

    push();
    const interval = setInterval(push, 5000);
    view.onDidDispose(() => clearInterval(interval));
  }
}

function buildSidebarHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'">
<style>
  *,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }
  body {
    font-family: var(--vscode-font-family);
    font-size: 12px;
    color: var(--vscode-foreground);
    background: var(--vscode-sideBar-background);
    padding: 0 0 16px;
  }
  .hdr {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 12px 10px;
    border-bottom: 1px solid var(--vscode-panel-border, #333);
  }
  .mark {
    width: 22px; height: 22px; border-radius: 5px;
    background: linear-gradient(135deg,#d97757,#b85a3e);
    display: grid; place-items: center; flex-shrink: 0;
    font-size: 12px; color: #fff;
  }
  .hdr-title { font-size: 11px; font-weight: 600; opacity: .9; }
  .open-btn {
    margin-left: auto; border: 1px solid var(--vscode-panel-border, #333);
    background: transparent; color: var(--vscode-foreground); border-radius: 3px;
    padding: 2px 8px; font-size: 10px; cursor: pointer; opacity: .6;
    white-space: nowrap;
  }
  .open-btn:hover { opacity: 1; }
  .section { padding: 10px 12px 0; }
  .sec-head {
    display: flex; align-items: center; gap: 6px;
    font-size: 10px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase;
    color: var(--vscode-descriptionForeground); margin-bottom: 4px;
  }
  .sec-head .dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
  .dot-global  { background: #74a8e8; box-shadow: 0 0 0 2px rgba(116,168,232,.2); }
  .dot-project { background: #b89bf0; box-shadow: 0 0 0 2px rgba(184,155,240,.2); }
  .row {
    display: flex; align-items: center; gap: 8px;
    padding: 6px 8px; border-radius: 4px; cursor: pointer;
    transition: background .1s;
  }
  .row:hover { background: var(--vscode-list-hoverBackground, rgba(255,255,255,.06)); }
  .row-icon {
    width: 20px; height: 20px; border-radius: 3px;
    background: var(--vscode-list-hoverBackground, rgba(255,255,255,.06));
    display: grid; place-items: center; flex-shrink: 0; color: var(--vscode-descriptionForeground);
  }
  .row-icon svg { width: 11px; height: 11px; }
  .row-label { flex: 1; font-size: 11.5px; }
  .row-count {
    font-size: 11px; font-weight: 600; min-width: 20px; text-align: right;
    font-variant-numeric: tabular-nums; color: var(--vscode-foreground);
  }
  .row-count.zero { color: var(--vscode-descriptionForeground); opacity: .45; }
  .divider { height: 1px; background: var(--vscode-panel-border, #333); margin: 10px 12px 0; opacity: .5; }
  .dimmed { opacity: .4; pointer-events: none; }
</style>
</head>
<body>
<div class="hdr">
  <div class="mark">⚡</div>
  <div class="hdr-title">Claude Deck</div>
  <button class="open-btn" onclick="open_panel()">Open ↗</button>
</div>

<div class="section">
  <div class="sec-head"><i class="dot dot-global"></i>Global</div>
  <div class="row" onclick="go('skills','global')">
    <div class="row-icon"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 2.5 A1.5 1.5 0 1 0 4.5 5.5 H11.5 A1.5 1.5 0 1 0 11.5 2.5 A1.5 1.5 0 1 0 11.5 5.5 V10.5 A1.5 1.5 0 1 0 11.5 13.5 A1.5 1.5 0 1 0 11.5 10.5 H4.5 A1.5 1.5 0 1 0 4.5 13.5 A1.5 1.5 0 1 0 4.5 10.5 V5.5"/></svg></div>
    <div class="row-label">Skills</div>
    <div class="row-count zero" id="g-skills">0</div>
  </div>
  <div class="row" onclick="go('mcp','global')">
    <div class="row-icon"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 1.5 V4.5"/><path d="M11 1.5 V4.5"/><rect x="3.5" y="4.5" width="9" height="4.5" rx="1"/><path d="M8 9 V12"/><path d="M5.5 12 H10.5 V14"/></svg></div>
    <div class="row-label">MCP Servers</div>
    <div class="row-count zero" id="g-mcps">0</div>
  </div>
  <div class="row" onclick="go('hooks','global')">
    <div class="row-icon"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M11 2 V8 A3 3 0 0 1 5 8"/><circle cx="11" cy="2" r="1"/></svg></div>
    <div class="row-label">Hooks</div>
    <div class="row-count zero" id="g-hooks">0</div>
  </div>
</div>

<div class="divider"></div>

<div class="section" id="proj-section">
  <div class="sec-head"><i class="dot dot-project"></i><span id="proj-name">Project</span></div>
  <div class="row" onclick="go('skills','project')">
    <div class="row-icon"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 2.5 A1.5 1.5 0 1 0 4.5 5.5 H11.5 A1.5 1.5 0 1 0 11.5 2.5 A1.5 1.5 0 1 0 11.5 5.5 V10.5 A1.5 1.5 0 1 0 11.5 13.5 A1.5 1.5 0 1 0 11.5 10.5 H4.5 A1.5 1.5 0 1 0 4.5 13.5 A1.5 1.5 0 1 0 4.5 10.5 V5.5"/></svg></div>
    <div class="row-label">Skills</div>
    <div class="row-count zero" id="p-skills">0</div>
  </div>
  <div class="row" onclick="go('mcp','project')">
    <div class="row-icon"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 1.5 V4.5"/><path d="M11 1.5 V4.5"/><rect x="3.5" y="4.5" width="9" height="4.5" rx="1"/><path d="M8 9 V12"/><path d="M5.5 12 H10.5 V14"/></svg></div>
    <div class="row-label">MCP Servers</div>
    <div class="row-count zero" id="p-mcps">0</div>
  </div>
  <div class="row" onclick="go('hooks','project')">
    <div class="row-icon"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M11 2 V8 A3 3 0 0 1 5 8"/><circle cx="11" cy="2" r="1"/></svg></div>
    <div class="row-label">Hooks</div>
    <div class="row-count zero" id="p-hooks">0</div>
  </div>
</div>

<div class="divider"></div>

<div class="section">
  <div class="sec-head"><svg style="width:10px;height:10px" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"><path d="M8 3 a2 2 0 0 0 -4 0 a2 2 0 0 0 -1 3.5 a2 2 0 0 0 0 3 a2 2 0 0 0 2 3 a2 2 0 0 0 3 0.5"/><path d="M8 3 a2 2 0 0 1 4 0 a2 2 0 0 1 1 3.5 a2 2 0 0 1 0 3 a2 2 0 0 1 -2 3 a2 2 0 0 1 -3 0.5"/><path d="M8 3 V13"/></svg>&nbsp;Memory</div>
  <div class="row" onclick="go('memory','global')">
    <div class="row-icon"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M4 2 H10 L13 5 V14 H4 Z"/><path d="M10 2 V5 H13"/><path d="M6 8 H11"/><path d="M6 11 H11"/></svg></div>
    <div class="row-label">Memory Files</div>
    <div class="row-count zero" id="mem-count">0</div>
  </div>
</div>

<script>
const vsc = acquireVsCodeApi();
function open_panel() { vsc.postMessage({ type: 'openPanel' }); }
function go(tab, scope) { vsc.postMessage({ type: 'openPanelTab', tab: tab, scope: scope }); }

function num(id, n) {
  var el = document.getElementById(id);
  if (!el) return;
  el.textContent = String(n);
  el.className = 'row-count' + (n === 0 ? ' zero' : '');
}

window.addEventListener('message', function(ev) {
  var d = ev.data;
  if (d.type !== 'update') return;
  num('g-skills', d.global.skills);
  num('g-mcps',   d.global.mcps);
  num('g-hooks',  d.global.hooks);
  num('p-skills', d.project.skills);
  num('p-mcps',   d.project.mcps);
  num('p-hooks',  d.project.hooks);
  num('mem-count', d.memory);
  var proj = document.getElementById('proj-section');
  if (proj) proj.className = 'section' + (d.project.available ? '' : ' dimmed');
  var pname = document.getElementById('proj-name');
  if (pname) pname.textContent = d.project.name || 'Project';
});
</script>
</body>
</html>`;
}

export function getWorkspaceInfo(): { projectPath?: string; projectName?: string } {
  const folder = vscode.workspace.workspaceFolders?.[0];
  if (!folder) { return {}; }
  return {
    projectPath: folder.uri.fsPath,
    projectName: path.basename(folder.uri.fsPath),
  };
}
