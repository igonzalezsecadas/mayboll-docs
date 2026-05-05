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

function detectGitHubRepo(): { owner: string; repo: string; base: string } | null {
  try {
    const remoteUrl = execSync('git remote get-url origin', {
      cwd: process.cwd(),
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'ignore'],
    }).trim();

    // HTTPS: https://github.com/owner/repo.git
    let match = remoteUrl.match(/https:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?$/);
    if (match) {
      return { owner: match[1], repo: match[2], base: `/${match[2]}` };
    }

    // SSH: git@github.com:owner/repo.git
    match = remoteUrl.match(/git@github\.com:([^/]+)\/([^/]+?)(?:\.git)?$/);
    if (match) {
      return { owner: match[1], repo: match[2], base: `/${match[2]}` };
    }

    return null;
  } catch {
    return null;
  }
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

  const repoInfo = detectGitHubRepo();
  const basePath = repoInfo?.base || '';

  if (repoInfo) {
    console.log(`Detected GitHub repository: ${repoInfo.owner}/${repoInfo.repo}`);
    console.log(`Setting base path to: ${basePath}`);
  }

  copyTemplate('docs-package.json', path.join(docsPath, 'package.json'));
  copyTemplate('tsconfig.json', path.join(docsPath, 'tsconfig.json'));
  copyTemplate('astro.config.mjs', path.join(docsPath, 'astro.config.mjs'));
  copyTemplate('mayboll.config.mjs', path.join(docsPath, 'mayboll.config.mjs'), {
    '{{FLAT_SIDEBAR}}': flat ? 'true' : 'false',
    '{{BASE_PATH}}': basePath,
  });
  copyTemplate('DocLayout.astro', path.join(docsPath, 'src', 'layouts', 'DocLayout.astro'));
  copyTemplate('[...slug].astro', path.join(docsPath, 'src', 'pages', '[...slug].astro'));
  copyTemplate('index.astro', path.join(docsPath, 'src', 'pages', 'index.astro'));
  copyTemplate('content.config.ts', path.join(docsPath, 'src', 'content', 'config.ts'));
  copyTemplate('lib/sidebar.ts', path.join(docsPath, 'src', 'lib', 'sidebar.ts'));
  copyTemplate('components/SidebarTree.astro', path.join(docsPath, 'src', 'components', 'SidebarTree.astro'));
  copyTemplate('components/Search.astro', path.join(docsPath, 'src', 'components', 'Search.astro'));
  copyTemplate('components/CopyButton.astro', path.join(docsPath, 'src', 'components', 'CopyButton.astro'));

  // Generate GitHub Actions workflow
  const workflowDir = path.join(cwd, '.github', 'workflows');
  copyTemplate('deploy.yml', path.join(workflowDir, 'deploy.yml'));

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
  if (repoInfo) {
    console.log(`- A GitHub Actions workflow has been generated at .github/workflows/deploy.yml`);
    console.log(`  Push to main to deploy to GitHub Pages (remember to enable Pages in repo settings)`);
  }
}
