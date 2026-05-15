# Claude Deck

Manage your full [Claude Code](https://claude.ai/code) capability stack from one place inside VS Code - Skills, MCP servers, Hooks, and Memory.


## Features

### Stack
A live architecture view of your Claude Code setup: active model, installed skills, MCP servers, hooks, and memory files - all at a glance.

### Skills
Browse and install slash commands (`/refactor`, `/debug`, `/explain`, and more) into your global or project scope. Skills are markdown files stored in `~/.claude/commands/` or `.claude/commands/`. You can also create custom skills from templates.

### MCP Servers
Browse a catalog of Model Context Protocol servers and add them to your Claude settings with one click. Servers that require configuration (API keys, connection strings) show an inline form before adding.

### Hooks
Install pre-built lifecycle hooks - safety guards, code quality runners, notifications, and workflow helpers - that run before or after Claude tool calls. Managed in `~/.claude/settings.json` or `.claude/settings.json`.

### Memory
View and edit memory files that are injected into every Claude session (`CLAUDE.md`, project memory, etc.).

## Installation

Install from the VS Code Marketplace or:

```
ext install claude-deck.claude-deck
```

## Usage

- Click the **Claude Deck** icon in the Activity Bar to open the sidebar
- Use `Ctrl+Shift+P` → **Claude: Claude Deck** to open the full panel
- Switch between **Global** and your project scope using the buttons in the top-right

## Requirements

- VS Code 1.85+
- [Claude Code CLI](https://claude.ai/code) installed

## Scope

Most features support two scopes:

| Scope | Location |
|-------|----------|
| Global | `~/.claude/` |
| Project | `<workspace>/.claude/` |

Global settings apply to all Claude Code sessions. Project settings apply only when Claude Code is run in that workspace.

## Release Notes

See CHANGELOG.md for version history.
