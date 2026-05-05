import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

export function build() {
  const cwd = process.cwd();
  const docsPath = path.join(cwd, 'docs');

  if (!fs.existsSync(docsPath)) {
    console.error('Error: ./docs/ does not exist. Run `mayboll-docs init` first.');
    process.exit(1);
  }

  console.log('Building for production...');
  try {
    execSync('npx astro build', { cwd: docsPath, stdio: 'inherit' });
  } catch {
    process.exit(1);
  }

  console.log('Build complete. Output is in ./docs/dist/');
}
