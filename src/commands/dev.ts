import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

export function dev() {
  const cwd = process.cwd();
  const docsPath = path.join(cwd, 'docs');

  if (!fs.existsSync(docsPath)) {
    console.error('Error: ./docs/ does not exist. Run `mayboll-docs init` first.');
    process.exit(1);
  }

  console.log('Starting development server...');
  try {
    execSync('npx astro dev', { cwd: docsPath, stdio: 'inherit' });
  } catch {
    process.exit(1);
  }
}
