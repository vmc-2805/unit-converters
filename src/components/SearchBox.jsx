import { useEffect, useId, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchConverters } from '../data/index.js';

/* Search box used in the header and on the home page.
   It searches converter names, category names and unit names. */
export default function SearchBox({ variant = 'header', placeholder, autoFocus = false }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const boxRef = useRef(null);
  const navigate = useNavigate();
  const listId = useId();

  const results = query.trim() ? searchConverters(query, 10) : [];

  useEffect(() => {
    function onClickOutside(event) {
      if (boxRef.current && !boxRef.current.contains(event.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  function go(entry) {
    if (!entry) return;
    setOpen(false);
    setQuery('');
    navigate(entry.url);
  }

  function onKeyDown(event) {
    if (!open || results.length === 0) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((index) => (index + 1) % results.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((index) => (index - 1 + results.length) % results.length);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      go(results[active]);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <div className={`search-box search-box--${variant}`} ref={boxRef}>
      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          go(results[active] || results[0]);
        }}
      >
        <span className="search-icon" aria-hidden="true">
          <svg viewBox="0 0 20 20" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="9" r="6" />
            <path d="M13.5 13.5 18 18" strokeLinecap="round" />
          </svg>
        </span>
        <input
          type="search"
          value={query}
          autoFocus={autoFocus}
          placeholder={placeholder || 'Search a converter or unit, e.g. Length or psi'}
          aria-label="Search converters and units"
          aria-expanded={open && results.length > 0}
          aria-controls={listId}
          autoComplete="off"
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
        />
        {query && (
          <button type="button" className="search-clear" onClick={() => setQuery('')} aria-label="Clear search">
            &times;
          </button>
        )}
      </form>

      {open && query.trim() && (
        <div className="search-results" id={listId} role="listbox">
          {results.length === 0 && (
            <p className="search-empty">
              Nothing found for &ldquo;{query}&rdquo;. Try a shorter word, such as "mass".
            </p>
          )}
          {results.map((entry, index) => (
            <button
              key={`${entry.kind}-${entry.url}-${entry.title}`}
              type="button"
              role="option"
              aria-selected={index === active}
              className={`search-hit${index === active ? ' is-active' : ''}`}
              onMouseEnter={() => setActive(index)}
              onClick={() => go(entry)}
            >
              <b>{entry.title}</b>
              <small>{entry.subtitle}</small>
            </button>
          ))}
          {results.length > 0 && (
            <p className="search-tip">Use the arrow keys to move, Enter to open.</p>
          )}
        </div>
      )}
    </div>
  );
}
