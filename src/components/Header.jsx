import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { groups } from '../data/index.js';
import SearchBox from './SearchBox.jsx';

function Chevron() {
  return (
    <svg className="chev" viewBox="0 0 12 8" width="11" height="8" aria-hidden="true">
      <path d="M1 1.5 6 6.5 11 1.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Header() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef(null);
  const location = useLocation();

  // Close every menu when the page changes.
  const [lastPath, setLastPath] = useState(location.pathname + location.search);
  const currentKey = location.pathname + location.search;
  if (lastPath !== currentKey) {
    setLastPath(currentKey);
    setOpenMenu(null);
    setMobileOpen(false);
  }

  // Close the menus on an outside click or on Escape.
  useEffect(() => {
    function onClick(event) {
      if (headerRef.current && !headerRef.current.contains(event.target)) setOpenMenu(null);
    }
    function onKey(event) {
      if (event.key === 'Escape') {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  // Stop the page behind the mobile menu from scrolling.
  useEffect(() => {
    document.body.classList.toggle('no-scroll', mobileOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [mobileOpen]);

  const isDesktop = () => typeof window !== 'undefined' && window.innerWidth > 900;

  return (
    <header className="site-header" ref={headerRef}>
      <div className="header-top">
        <Link to="/" className="brand" aria-label="All In One Calculator home">
          <span className="brand-mark" aria-hidden="true">AC</span>
          <span className="brand-text">
            <span className="brand-name">All In One Calculator</span>
            <span className="brand-sub">Free unit converter</span>
          </span>
        </Link>

        <div className="header-search">
          <SearchBox variant="header" />
        </div>

        <button
          type="button"
          className={`menu-toggle${mobileOpen ? ' is-open' : ''}`}
          aria-expanded={mobileOpen}
          aria-controls="main-menu"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span className="burger" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="menu-toggle-text">{mobileOpen ? 'Close' : 'Menu'}</span>
        </button>
      </div>

      <nav
        id="main-menu"
        className={`site-nav${mobileOpen ? ' open' : ''}`}
        aria-label="Main menu"
      >
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              Home
            </NavLink>
          </li>

          {groups.map((group) => {
            const isOpen = openMenu === group.id;
            return (
              <li
                key={group.id}
                className={`nav-item has-menu${isOpen ? ' open' : ''}`}
                onMouseEnter={() => isDesktop() && setOpenMenu(group.id)}
                onMouseLeave={() => isDesktop() && setOpenMenu(null)}
              >
                <button
                  type="button"
                  className="nav-link nav-parent"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onClick={() => setOpenMenu(isOpen ? null : group.id)}
                >
                  {group.name.replace(' Converters', '')}
                  <Chevron />
                </button>

                {isOpen && (
                  <div className="dropdown" role="menu">
                    <div className="dropdown-head">
                      <b>{group.name}</b>
                      <span>{group.items.length} converters</span>
                    </div>
                    <div className="dropdown-grid">
                      {group.items.map((cat) => (
                        <Link key={cat.id} to={`/convert/${cat.id}`} role="menuitem">
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                    <Link className="dropdown-all" to={`/category/${group.id}`}>
                      View all {group.name} &rarr;
                    </Link>
                  </div>
                )}
              </li>
            );
          })}

          <li className="nav-item">
            <NavLink to="/converters" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              All Converters
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
