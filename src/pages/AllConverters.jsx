import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { groups, totalConverters } from '../data/index.js';

export default function AllConverters() {
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get('q') || '');

  const term = filter.trim().toLowerCase();

  return (
    <div className="page wrap">
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        All Converters
      </nav>

      <h1>All Converters</h1>
      <p>The full list of {totalConverters} converters, sorted by category.</p>

      <div className="panel">
        <h2 className="panel-title">Find a Converter</h2>
        <div className="field">
          <label htmlFor="filter">Type a name</label>
          <input
            id="filter"
            type="search"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            placeholder="For example: pressure"
            autoComplete="off"
          />
        </div>
      </div>

      {groups.map((group) => {
        const items = group.items.filter((cat) => cat.name.toLowerCase().includes(term));
        if (items.length === 0) return null;
        return (
          <section className="group-block" key={group.id}>
            <div className="group-head">
              <h2>
                <Link to={`/category/${group.id}`}>{group.name}</Link>
              </h2>
              <p>{items.length} converters</p>
            </div>
            <ul className="link-list">
              {items.map((cat) => (
                <li key={cat.id}>
                  <Link to={`/convert/${cat.id}`}>{cat.name}</Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
