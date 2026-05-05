import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../..');

const DOCS_DIR = 'docs';
const CONTENT_DIR = path.join(DOCS_DIR, 'content');

function copyTemplate(templateName: string, destPath: string, replacements?: Record<string, string>) {
  const srcPath = path.join(rootDir, 'templates', templateName);
  let content = fs.readFileSync(srcPath, 'utf-8');
  
  if (replacements) {
    for (const [key, value] of Object.entries(replacements)) {
      content = content.split(key).join(value);
    }
  }
  
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, content);
}

export function init(flat: boolean = false) {
  const cwd = process.cwd();
  const docsPath = path.join(cwd, DOCS_DIR);
  const contentPath = path.join(cwd, CONTENT_DIR);

  if (fs.existsSync(docsPath)) {
    console.error(`Error: ./${DOCS_DIR}/ already exists. Remove it first if you want to re-initialize.`);
    process.exit(1);
  }

  console.log(`Scaffolding documentation site in ./${DOCS_DIR}/...`);

  fs.mkdirSync(docsPath, { recursive: true });
  fs.mkdirSync(contentPath, { recursive: true });

  copyTemplate('docs-package.json', path.join(docsPath, 'package.json'));
  copyTemplate('astro.config.mjs', path.join(docsPath, 'astro.config.mjs'));
  copyTemplate('mayboll.config.mjs', path.join(docsPath, 'mayboll.config.mjs'), {
    '{{FLAT_SIDEBAR}}': flat ? 'true' : 'false',
  });
  copyTemplate('DocLayout.astro', path.join(docsPath, 'src', 'layouts', 'DocLayout.astro'));
  copyTemplate('[...slug].astro', path.join(docsPath, 'src', 'pages', '[...slug].astro'));
  copyTemplate('index.astro', path.join(docsPath, 'src', 'pages', 'index.astro'));
  copyTemplate('content.config.ts', path.join(docsPath, 'src', 'content', 'config.ts'));
  copyTemplate('lib/sidebar.ts', path.join(docsPath, 'src', 'lib', 'sidebar.ts'));
  copyTemplate('components/SidebarTree.astro', path.join(docsPath, 'src', 'components', 'SidebarTree.astro'));

  const contentDocsPath = path.join(docsPath, 'src', 'content', 'docs');
  const relativeContentPath = path.relative(path.dirname(contentDocsPath), contentPath);
  fs.symlinkSync(relativeContentPath, contentDocsPath, 'dir');

  const indexMdPath = path.join(contentPath, 'index.md');
  if (!fs.existsSync(indexMdPath)) {
    fs.writeFileSync(
      indexMdPath,
      `---\ntitle: Welcome\n---\n\n# Welcome\n\nThis is your documentation homepage. Edit \`docs/content/index.md\` to get started.\n`
    );
  }

  console.log('Installing dependencies...');
  try {
    execSync('npm install', { cwd: docsPath, stdio: 'inherit' });
  } catch {
    console.error('Failed to install dependencies. You can run `npm install` manually in ./docs/');
    process.exit(1);
  }

  console.log(`\nDone! Your docs site is ready in ./${DOCS_DIR}/`);
  console.log(`- Edit docs/content/index.md to customize the homepage`);
  console.log(`- Run \`mayboll-docs dev\` to preview locally`);
}
