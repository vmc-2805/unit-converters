# All In One Calculator

A unit converter website built with React and Vite. It follows the menu structure
of unitconverters.net (same categories, same converters, same unit lists and the
same From / To input layout) with its own green and sand theme.

## What is inside

- 78 converters in 9 categories: Common, Engineering, Heat, Fluids, Light,
  Electricity, Magnetism, Radiology and Other.
- More than 1,600 units in total.
- Special handling for temperature scales, number bases (base 2 to base 36) and
  inverse units such as litre/100 km.
- Live conversion: the answer updates while you type.
- Shareable links, for example `/convert/length?from=inch&to=foot`.
- Header menu with a dropdown for every category, a search box, a full converter
  list page, plus About and Contact pages and a footer with quick links.

## Search

The header and the home page share one search box (`src/components/SearchBox.jsx`).
It looks through converter names, category names and unit names, so both
"Pressure" and "psi" lead to the pressure converter. Arrow keys move through the
results and Enter opens the highlighted one.

## SEO

- Per route title, description, keywords, canonical link, Open Graph and Twitter
  tags, plus JSON-LD (WebSite, WebApplication, BreadcrumbList, ItemList) - see
  `src/lib/seo.js`.
- `npm run build` pre-renders all 91 routes into real HTML files, so crawlers do
  not need JavaScript. It also writes `dist/sitemap.xml` and a `404.html`
  fallback.
- `public/robots.txt`, `public/site.webmanifest` and `public/og-image.svg` ship
  with the site.
- Set your real domain in `SITE_URL` at the top of `src/lib/seo.js` and in
  `public/robots.txt` before going live.

## Commands

```bash
npm install     # install dependencies
npm run dev     # start the development server (http://localhost:5173)
npm run build   # build for production into dist/
npm run preview # preview the production build
npm run lint    # run oxlint
```

## Project layout

```
src/
  components/   Header, Footer, ConverterTool
  data/         unit tables, one file per category group
  lib/          convert.js - all conversion maths and number formatting
  pages/        Home, ConverterPage, GroupPage, AllConverters, About, Contact
  styles.css    theme and layout
```

## How the data works

Each unit is written as `[name, symbol, factor]`, where
`value in base unit = value x factor`. A fourth entry `'inv'` marks an inverse
unit, where `value in base unit = factor / value`. Temperature and number bases
use their own formulas in `src/lib/convert.js`.
