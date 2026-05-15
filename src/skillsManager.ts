import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

export type Scope = 'global' | 'project';

const GLOBAL_COMMANDS_DIR = path.join(os.homedir(), '.claude', 'commands');

export function commandsDir(scope: Scope, projectPath?: string): string {
  if (scope === 'project' && projectPath) {
    return path.join(projectPath, '.claude', 'commands');
  }
  return GLOBAL_COMMANDS_DIR;
}

export interface InstalledSkill {
  name: string;
  filename: string;
  firstLine: string;
  content: string;
  modifiedAt: Date;
}

function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) { fs.mkdirSync(dir, { recursive: true }); }
}

export function getInstalledSkills(scope: Scope, projectPath?: string): InstalledSkill[] {
  const dir = commandsDir(scope, projectPath);
  if (!fs.existsSync(dir)) { return []; }
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  return files.map(filename => {
    const filepath = path.join(dir, filename);
    const content = fs.readFileSync(filepath, 'utf-8');
    const firstLine = content.split('\n')[0]?.replace(/^#\s*/, '').trim() ?? filename;
    const stat = fs.statSync(filepath);
    return { name: filename.replace(/\.md$/, ''), filename, firstLine, content, modifiedAt: stat.mtime };
  }).sort((a, b) => a.name.localeCompare(b.name));
}

export function isInstalled(skillName: string, scope: Scope, projectPath?: string): boolean {
  return fs.existsSync(path.join(commandsDir(scope, projectPath), `${skillName}.md`));
}

export function installSkill(skillName: string, content: string, scope: Scope, projectPath?: string): void {
  const dir = commandsDir(scope, projectPath);
  ensureDir(dir);
  fs.writeFileSync(path.join(dir, `${skillName}.md`), content, 'utf-8');
}

export function uninstallSkill(skillName: string, scope: Scope, projectPath?: string): void {
  const filepath = path.join(commandsDir(scope, projectPath), `${skillName}.md`);
  if (fs.existsSync(filepath)) { fs.unlinkSync(filepath); }
}
