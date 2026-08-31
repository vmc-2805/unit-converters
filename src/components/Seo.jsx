import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { applySeo, metaFor } from '../lib/seo.js';

/* Keeps the title, meta tags, canonical link and structured data in step
   with the current route. */
export default function Seo() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    applySeo(metaFor(pathname, search));
  }, [pathname, search]);

  return null;
}
