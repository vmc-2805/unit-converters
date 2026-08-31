/* Page titles, descriptions and structured data for every route.
   The same file is used by the app in the browser and by the
   pre-render script, so nothing here may touch `document` at import time. */

import { allCategories, groups, findCategory, groupById, totalConverters, totalUnits, popularConversions } from '../data/index.js';

/* Change this to your real domain before going live. */
export const SITE_URL = 'https://www.allinonecalculator.com';
export const SITE_NAME = 'All In One Calculator';

function clean(text) {
  return text.replace(/\s+/g, ' ').trim();
}

function unitNamed(category, name) {
  if (!name) return null;
  return category.units.find((u) => u.name.toLowerCase() === name.toLowerCase()) || null;
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/converters?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

function breadcrumb(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/* Returns every tag a page needs. `path` is the pathname, `search` the query string. */
export function metaFor(path, search = '') {
  const params = new URLSearchParams(search);
  const base = {
    canonical: `${SITE_URL}${path}`,
    robots: 'index, follow',
    jsonLd: [websiteJsonLd],
  };

  if (path === '/') {
    return {
      ...base,
      title: `${SITE_NAME} - Free Online Unit Converter`,
      description: clean(`Free unit converter with ${totalConverters} converters and over ${totalUnits}
        units. Convert length, weight, temperature, volume, area, speed, data and engineering units in one place.`),
      keywords: 'unit converter, measurement converter, length converter, weight converter, temperature converter',
      jsonLd: [
        websiteJsonLd,
        {
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: SITE_NAME,
          url: SITE_URL,
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'Any',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        },
      ],
    };
  }

  if (path === '/converters') {
    return {
      ...base,
      title: `All Converters - ${totalConverters} Unit Converters | ${SITE_NAME}`,
      description: clean(`Browse all ${totalConverters} unit converters, sorted by category:
        common, engineering, heat, fluids, light, electricity, magnetism, radiology and more.`),
      keywords: 'all unit converters, converter list, measurement categories',
      jsonLd: [
        breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'All Converters', path: '/converters' },
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Unit converters',
          numberOfItems: allCategories.length,
          itemListElement: allCategories.slice(0, 40).map((cat, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: `${cat.name} Converter`,
            url: `${SITE_URL}/convert/${cat.id}`,
          })),
        },
      ],
    };
  }

  if (path === '/about') {
    return {
      ...base,
      title: `About Us - ${SITE_NAME}`,
      description: clean(`Learn how All In One Calculator works, which base units it uses and how
        accurate the conversion factors are.`),
      keywords: 'about unit converter, how unit conversion works',
      jsonLd: [breadcrumb([{ name: 'Home', path: '/' }, { name: 'About Us', path: '/about' }])],
    };
  }

  if (path === '/contact') {
    return {
      ...base,
      title: `Contact - ${SITE_NAME}`,
      description: 'Report a missing unit or a wrong value, or send a suggestion for a new converter.',
      keywords: 'contact unit converter, report wrong value',
      jsonLd: [breadcrumb([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])],
    };
  }

  if (path.startsWith('/category/')) {
    const group = groupById(path.split('/')[2]);
    if (group) {
      const names = group.items.map((c) => c.name).slice(0, 8).join(', ');
      return {
        ...base,
        title: `${group.name} - ${group.items.length} Converters | ${SITE_NAME}`,
        description: clean(`${group.blurb} Includes ${names} and more. Free and easy to use.`),
        keywords: `${group.name.toLowerCase()}, ${names.toLowerCase()}`,
        jsonLd: [
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: group.name, path: `/category/${group.id}` },
          ]),
        ],
      };
    }
  }

  if (path.startsWith('/convert/')) {
    const category = findCategory(path.split('/')[2]);
    if (category) {
      const group = groupById(category.groupId);
      const from = unitNamed(category, params.get('from'));
      const to = unitNamed(category, params.get('to'));
      const trail = breadcrumb([
        { name: 'Home', path: '/' },
        { name: group.name, path: `/category/${group.id}` },
        { name: `${category.name} Converter`, path: `/convert/${category.id}` },
      ]);

      if (from && to) {
        return {
          ...base,
          canonical: `${SITE_URL}/convert/${category.id}?from=${encodeURIComponent(from.name)}&to=${encodeURIComponent(to.name)}`,
          title: `Convert ${from.name} to ${to.name} - ${category.name} Converter`,
          description: clean(`Convert ${from.name} to ${to.name} online. Free ${category.name.toLowerCase()}
            converter with a conversion table, the formula and ${category.units.length} more units.`),
          keywords: `${from.name} to ${to.name}, ${category.name.toLowerCase()} converter`,
          jsonLd: [trail],
        };
      }

      const sample = category.units.slice(0, 6).map((u) => u.name).join(', ');
      return {
        ...base,
        title: `${category.name} Converter - Free Online ${category.name} Units`,
        description: clean(`Convert ${category.name.toLowerCase()} units online: ${sample} and
          ${Math.max(category.units.length - 6, 0)} more. Instant results, conversion table and formula.`),
        keywords: `${category.name.toLowerCase()} converter, ${category.name.toLowerCase()} units, ${sample.toLowerCase()}`,
        jsonLd: [trail],
      };
    }
  }

  return {
    ...base,
    title: `Page Not Found - ${SITE_NAME}`,
    description: 'The page you asked for does not exist on All In One Calculator.',
    robots: 'noindex, follow',
    jsonLd: [],
  };
}

/* Every URL the pre-render script and the sitemap should cover. */
export function allRoutes() {
  return [
    '/',
    '/converters',
    '/about',
    '/contact',
    ...groups.map((g) => `/category/${g.id}`),
    ...allCategories.map((c) => `/convert/${c.id}`),
  ];
}

/* Returns the full list of URLs for the sitemap, including popular unit pairs. */
export function allSitemapRoutes() {
  const baseRoutes = allRoutes();
  const routesSet = new Set(baseRoutes);

  // Add popular conversions
  popularConversions.forEach((p) => {
    routesSet.add(`/convert/${p.id}?from=${encodeURIComponent(p.from)}&to=${encodeURIComponent(p.to)}`);
  });

  // Add conversions for the first 8 units of each category
  allCategories.forEach((category) => {
    const units = category.units.slice(0, 8);
    for (let i = 0; i < units.length; i++) {
      for (let j = 0; j < units.length; j++) {
        if (i !== j) {
          routesSet.add(`/convert/${category.id}?from=${encodeURIComponent(units[i].name)}&to=${encodeURIComponent(units[j].name)}`);
        }
      }
    }
  });

  return Array.from(routesSet);
}

/* ---- browser side ---- */

function setTag(selector, create, attributes) {
  if (typeof document === 'undefined') return;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  Object.entries(attributes).forEach(([key, value]) => el.setAttribute(key, value));
}

export function applySeo(meta) {
  if (typeof document === 'undefined') return;

  document.title = meta.title;

  const named = {
    description: meta.description,
    keywords: meta.keywords || '',
    robots: meta.robots,
  };
  Object.entries(named).forEach(([name, content]) => {
    setTag(`meta[name="${name}"]`, () => {
      const el = document.createElement('meta');
      el.setAttribute('name', name);
      return el;
    }, { content });
  });

  const social = {
    'og:type': 'website',
    'og:site_name': SITE_NAME,
    'og:title': meta.title,
    'og:description': meta.description,
    'og:url': meta.canonical,
    'og:image': `${SITE_URL}/og-image.svg`,
    'twitter:card': 'summary_large_image',
    'twitter:title': meta.title,
    'twitter:description': meta.description,
    'twitter:image': `${SITE_URL}/og-image.svg`,
  };
  Object.entries(social).forEach(([property, content]) => {
    setTag(`meta[property="${property}"]`, () => {
      const el = document.createElement('meta');
      el.setAttribute('property', property);
      return el;
    }, { content });
  });

  setTag('link[rel="canonical"]', () => {
    const el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    return el;
  }, { href: meta.canonical });

  document.head.querySelectorAll('script[data-seo-jsonld]').forEach((el) => el.remove());
  (meta.jsonLd || []).forEach((data) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo-jsonld', 'true');
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  });
}
