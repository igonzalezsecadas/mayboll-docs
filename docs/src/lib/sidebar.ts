import { getCollection } from 'astro:content';
import maybollConfig from '../../mayboll.config.mjs';

export interface SidebarNode {
  type: 'file' | 'directory';
  name: string;
  slug?: string;
  title?: string;
  order?: number;
  children?: SidebarNode[];
}

export function toTitleCase(str: string): string {
  return str
    .replace(/[-_]/g, ' ')
    .replace(/\.mdx?$/i, '')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function normalizeSlug(slug: string): string {
  if (slug === 'index') return '';
  return slug.endsWith('/index') ? slug.slice(0, -6) : slug;
}

function shouldExcludeDrafts(): boolean {
  return import.meta.env.PROD;
}

export async function getSidebarTree(): Promise<SidebarNode[]> {
  const docs = await getCollection('docs');
  const pages = docs.filter((doc) => {
    if (doc.slug === 'index') return false;
    if (shouldExcludeDrafts() && doc.data.draft) return false;
    return true;
  });

  if (maybollConfig.flatSidebar) {
    const flatNodes: SidebarNode[] = pages.map((doc) => {
      const normalizedSlug = normalizeSlug(doc.slug);
      const label = doc.data.sidebar_label || doc.data.title || toTitleCase(normalizedSlug.split('/').pop() || '');
      return {
        type: 'file',
        name: normalizedSlug.split('/').pop() || '',
        slug: normalizedSlug,
        title: label,
        order: doc.data.order ?? 0,
      };
    });
    flatNodes.sort((a, b) => {
      const orderA = a.order ?? 0;
      const orderB = b.order ?? 0;
      if (orderA !== orderB) return orderA - orderB;
      return (a.name || '').localeCompare(b.name || '');
    });
    return flatNodes;
  }

  const root: SidebarNode = { type: 'directory', name: '', children: [] };

  for (const doc of pages) {
    const normalizedSlug = normalizeSlug(doc.slug);
    const parts = normalizedSlug.split('/').filter(Boolean);
    let current = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isLast = i === parts.length - 1;

      if (isLast) {
        const label = doc.data.sidebar_label || doc.data.title || toTitleCase(part);
        current.children!.push({
          type: 'file',
          name: part,
          slug: normalizedSlug,
          title: label,
          order: doc.data.order ?? 0,
        });
      } else {
        let dir = current.children!.find(
          (c) => c.type === 'directory' && c.name === part
        );
        if (!dir) {
          dir = { type: 'directory', name: part, children: [] };
          current.children!.push(dir);
        }
        current = dir;
      }
    }
  }

  function sortNode(node: SidebarNode) {
    if (!node.children) return;
    node.children.sort((a, b) => {
      if (a.type !== b.type) return a.type === 'directory' ? -1 : 1;
      const orderA = a.order ?? 0;
      const orderB = b.order ?? 0;
      if (orderA !== orderB) return orderA - orderB;
      return a.name.localeCompare(b.name);
    });
    node.children.forEach(sortNode);
  }
  sortNode(root);

  return root.children || [];
}

export function getDirectoryIndexes(docs: any[]) {
  const pages = docs.filter((doc) => {
    if (doc.slug === 'index') return false;
    if (shouldExcludeDrafts() && doc.data.draft) return false;
    return true;
  });

  const dirs = new Set<string>();

  for (const doc of pages) {
    const normalized = normalizeSlug(doc.slug);
    const parts = normalized.split('/').filter(Boolean);
    let path = '';
    for (let i = 0; i < parts.length - 1; i++) {
      path = path ? `${path}/${parts[i]}` : parts[i];
      dirs.add(path);
    }
  }

  const dirPaths = [];
  for (const dir of dirs) {
    const hasIndex = pages.some((doc) => normalizeSlug(doc.slug) === dir);
    if (!hasIndex) {
      const children = pages.filter((doc) => {
        const normalized = normalizeSlug(doc.slug);
        const parent = normalized.split('/').slice(0, -1).join('/');
        return parent === dir;
      });
      dirPaths.push({
        slug: dir,
        type: 'directory' as const,
        children,
        title: toTitleCase(dir.split('/').pop() || ''),
      });
    }
  }

  return dirPaths;
}
