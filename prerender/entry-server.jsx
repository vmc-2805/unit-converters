import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App.jsx';

export { allRoutes, allSitemapRoutes, metaFor, SITE_URL, SITE_NAME } from '../src/lib/seo.js';

export function render(url) {
  return renderToString(
    <MemoryRouter initialEntries={[url]}>
      <App />
    </MemoryRouter>,
  );
}
