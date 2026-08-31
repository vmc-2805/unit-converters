/* Writes a real HTML file for every route so search engines and social
   networks see finished pages instead of an empty <div id="root">. */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const { render, allRoutes, allSitemapRoutes, metaFor, SITE_URL } = await import(
  pathToFileURL(join(root, '.prerender', 'entry-server.js')).href
);

const template = await readFile(join(dist, 'index.html'), 'utf8');

const escapeAttr = (text) =>
  String(text).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function headFor(meta) {
  const image = `${SITE_URL}/og-image.svg`;
  const tags = [
    `<meta name="description" content="${escapeAttr(meta.description)}" />`,
    meta.keywords ? `<meta name="keywords" content="${escapeAttr(meta.keywords)}" />` : '',
    `<meta name="robots" content="${escapeAttr(meta.robots)}" />`,
    `<link rel="canonical" href="${escapeAttr(meta.canonical)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="All In One Calculator" />`,
    `<meta property="og:title" content="${escapeAttr(meta.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
    `<meta property="og:url" content="${escapeAttr(meta.canonical)}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="twitter:card" content="summary_large_image" />`,
    `<meta property="twitter:title" content="${escapeAttr(meta.title)}" />`,
    `<meta property="twitter:description" content="${escapeAttr(meta.description)}" />`,
    `<meta property="twitter:image" content="${image}" />`,
    ...(meta.jsonLd || []).map(
      (data) =>
        `<script type="application/ld+json" data-seo-jsonld="true">${JSON.stringify(data).replace(/</g, '\u003c')}</script>`,
    ),
  ];
  return tags.filter(Boolean).join('\n    ');
}

const routes = allRoutes();
let written = 0;

for (const route of routes) {
  const meta = metaFor(route, '');
  const appHtml = render(route);

  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(meta.title)}</title>`)
    .replace(/<meta\s+name="description"[\s\S]*?>/, '')
    .replace('</head>', `  ${headFor(meta)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  const target = route === '/' ? join(dist, 'index.html') : join(dist, route, 'index.html');
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html, 'utf8');
  written += 1;
}

/* Sitemap */
const escapeXml = (text) =>
  String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const today = new Date().toISOString().slice(0, 10);
const sitemapRoutes = allSitemapRoutes ? allSitemapRoutes() : routes;
const priority = (route) => {
  if (route === '/') return '1.0';
  if (route.includes('?')) return '0.7';
  if (route.startsWith('/convert/')) return '0.8';
  return '0.6';
};
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapRoutes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${escapeXml(route === '/' ? '/' : route)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority(route)}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;
await writeFile(join(dist, 'sitemap.xml'), sitemap, 'utf8');

/* Fallback page for static hosts that need one. */
await writeFile(join(dist, '404.html'), await readFile(join(dist, 'index.html'), 'utf8'), 'utf8');

console.log(`pre-rendered ${written} pages + sitemap.xml (${sitemapRoutes.length} urls)`);
