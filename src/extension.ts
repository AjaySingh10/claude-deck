import * as vscode from 'vscode';
import { SkillsPanel } from './skillsPanel';
import { SkillsSidebarProvider } from './skillsSidebar';

export function activate(context: vscode.ExtensionContext): void {
  // Activity bar sidebar view
  const sidebarProvider = new SkillsSidebarProvider(context);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('claude-deck.mainView', sidebarProvider, {
      webviewOptions: { retainContextWhenHidden: true }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('claude-deck.open', () => {
      SkillsPanel.createOrShow(context);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('claude-deck.openTab', (tab: string, scope?: string) => {
      SkillsPanel.createOrShow(context);
      setTimeout(() => SkillsPanel.navigateToTab(tab, scope), 250);
    })
  );
}

export function deactivate(): void {}
