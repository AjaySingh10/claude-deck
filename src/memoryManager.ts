import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

const PROJECTS_DIR = path.join(os.homedir(), '.claude', 'projects');

export interface MemoryFile {
  projectSlug: string;
  projectPath: string;
  filename: string;
  filepath: string;
  preview: string;
  size: number;
  modifiedAt: Date;
}

function slugToPath(slug: string): string {
  // Converts "-home-ajax-myproject" → "/home/ajax/myproject"
  return slug.replace(/^-/, '/').replace(/-/g, '/');
}

export function getMemoryFiles(): MemoryFile[] {
  if (!fs.existsSync(PROJECTS_DIR)) { return []; }
  const result: MemoryFile[] = [];

  for (const slug of fs.readdirSync(PROJECTS_DIR)) {
    const memDir = path.join(PROJECTS_DIR, slug, 'memory');
    if (!fs.existsSync(memDir)) { continue; }
    for (const file of fs.readdirSync(memDir).filter(f => f.endsWith('.md'))) {
      const filepath = path.join(memDir, file);
      const content = fs.readFileSync(filepath, 'utf-8');
      const lines = content.split('\n').filter(l => l.trim());
      const preview = lines.slice(0, 3).join(' ').replace(/^#+\s*/, '').slice(0, 120);
      const stat = fs.statSync(filepath);
      result.push({
        projectSlug: slug,
        projectPath: slugToPath(slug),
        filename: file,
        filepath,
        preview,
        size: stat.size,
        modifiedAt: stat.mtime,
      });
    }
  }

  return result.sort((a, b) => b.modifiedAt.getTime() - a.modifiedAt.getTime());
}

export function readMemoryFile(filepath: string): string {
  try { return fs.readFileSync(filepath, 'utf-8'); } catch { return ''; }
}
