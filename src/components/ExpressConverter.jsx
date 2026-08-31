import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { allCategories, findCategory } from '../data/index.js';
import { convert, formatNumber } from '../lib/convert.js';

/* The quick converter on the home page: six tabs, each with a short list of
   the units people ask for most. */
const TABS = [
  {
    id: 'length',
    label: 'Length',
    units: ['meter', 'kilometer', 'centimeter', 'millimeter', 'micrometer', 'nanometer',
      'mile', 'yard', 'foot', 'inch', 'light year'],
  },
  {
    id: 'temperature',
    label: 'Temperature',
    units: ['kelvin', 'Celsius', 'Fahrenheit', 'Rankine', 'Reaumur'],
  },
  {
    id: 'area',
    label: 'Area',
    units: ['square meter', 'square kilometer', 'square centimeter', 'square millimeter',
      'square micrometer', 'hectare', 'square mile', 'square yard', 'square foot',
      'square inch', 'acre'],
  },
  {
    id: 'volume',
    label: 'Volume',
    units: ['cubic meter', 'cubic kilometer', 'cubic centimeter', 'cubic millimeter',
      'liter', 'milliliter', 'gallon (US)', 'quart (US)', 'pint (US)', 'cup (US)',
      'tablespoon (US)', 'teaspoon (US)', 'cubic mile', 'cubic yard', 'cubic foot',
      'cubic inch'],
  },
  {
    id: 'weight-and-mass',
    label: 'Weight',
    units: ['kilogram', 'gram', 'milligram', 'ton (metric)', 'pound', 'ounce', 'carat',
      'ton (short)', 'ton (long)', 'Atomic mass unit'],
  },
  {
    id: 'time',
    label: 'Time',
    units: ['second', 'millisecond', 'minute', 'hour', 'day', 'week', 'month', 'year'],
  },
];

function unitsOf(tab) {
  const category = findCategory(tab.id);
  return tab.units
    .map((name) => category.units.find((u) => u.name.toLowerCase() === name.toLowerCase()))
    .filter(Boolean);
}

function titled(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/* ------------------------- quick converter ------------------------- */
function QuickConvert() {
  const [tabId, setTabId] = useState('length');
  const [value, setValue] = useState('1');
  const [pick, setPick] = useState({});

  const tab = TABS.find((t) => t.id === tabId);
  const category = findCategory(tab.id);
  const units = useMemo(() => unitsOf(tab), [tab]);

  const chosen = pick[tabId] || { from: units[0].name, to: units[1].name };
  const fromUnit = units.find((u) => u.name === chosen.from) || units[0];
  const toUnit = units.find((u) => u.name === chosen.to) || units[1];

  const result = useMemo(() => {
    if (value.trim() === '') return '';
    const numeric = Number(value);
    if (Number.isNaN(numeric)) return '';
    return formatNumber(convert(category, numeric, fromUnit, toUnit));
  }, [value, category, fromUnit, toUnit]);

  function choose(side, name) {
    setPick((old) => ({ ...old, [tabId]: { ...chosen, [side]: name } }));
  }

  return (
    <section className="express">
      <h2 className="section-title">Unit Converter Express Version</h2>

      <div className="express-tabs" role="tablist" aria-label="Quick converters">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={item.id === tabId}
            className={`express-tab${item.id === tabId ? ' is-active' : ''}`}
            onClick={() => setTabId(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="express-body">
        <div className="express-cols">
          <div className="express-col">
            <label htmlFor="express-from">From:</label>
            <input
              id="express-from"
              type="number"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              inputMode="decimal"
              autoComplete="off"
            />
            <select
              className="unit-listbox"
              size="10"
              value={fromUnit.name}
              aria-label="Convert from unit"
              onChange={(event) => choose('from', event.target.value)}
            >
              {units.map((unit) => (
                <option key={unit.name} value={unit.name}>
                  {titled(unit.name)}
                </option>
              ))}
            </select>
          </div>

          <div className="express-col">
            <label htmlFor="express-to">To:</label>
            <input id="express-to" type="text" value={result} readOnly className="result" />
            <select
              className="unit-listbox"
              size="10"
              value={toUnit.name}
              aria-label="Convert to unit"
              onChange={(event) => choose('to', event.target.value)}
            >
              {units.map((unit) => {
                const numeric = Number(value);
                const showVal = value.trim() !== '' && !Number.isNaN(numeric);
                const display = showVal
                  ? `${titled(unit.name)} (${formatNumber(convert(category, numeric, fromUnit, unit))})`
                  : titled(unit.name);
                return (
                  <option key={unit.name} value={unit.name}>
                    {display}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <p className="express-foot">
          <b>{value || 0}</b> {fromUnit.name} = <b>{result || 0}</b> {toUnit.name} &nbsp;&middot;&nbsp;
          <Link
            to={`/convert/${category.id}?from=${encodeURIComponent(fromUnit.name)}&to=${encodeURIComponent(toUnit.name)}`}
          >
            Open the full {category.name} converter
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ------------------------- unit finder ------------------------- */
/* Exact names win over symbols, and both win over a part of a longer name,
   so "gram" does not pick "kilogram". The rank is kept so the converter with
   the closest match is listed first. */
function bestUnit(category, text) {
  const term = text.trim().toLowerCase();
  if (!term) return null;

  let best = null;
  for (const unit of category.units) {
    const name = unit.name.toLowerCase();
    let rank = null;
    if (name === term) rank = 0;
    else if (unit.symbol.toLowerCase() === term) rank = 1;
    else if (name.startsWith(term)) rank = 2;
    else if (name.includes(term)) rank = 3;

    if (rank !== null && (!best || rank < best.rank)) {
      best = { unit, rank };
      if (rank === 0) break;
    }
  }
  return best;
}

function findPairs(fromText, toText, limit = 6) {
  if (!fromText.trim() || !toText.trim()) return [];

  const found = [];
  for (const category of allCategories) {
    const from = bestUnit(category, fromText);
    const to = bestUnit(category, toText);
    if (from && to && from.unit.name !== to.unit.name) {
      found.push({ category, from: from.unit, to: to.unit, rank: from.rank + to.rank });
    }
  }

  found.sort((a, b) => a.rank - b.rank);
  return found.slice(0, limit);
}

function UnitFinder() {
  const [fromText, setFromText] = useState('');
  const [toText, setToText] = useState('');
  const [searched, setSearched] = useState(false);

  const pairs = useMemo(() => findPairs(fromText, toText), [fromText, toText]);

  return (
    <section className="finder">
      <h2>Find the Units to Convert</h2>
      <p>Type the two units you have in mind and we will point you to the right converter.</p>

      <form
        className="finder-grid"
        onSubmit={(event) => {
          event.preventDefault();
          setSearched(true);
        }}
      >
        <div className="field">
          <label htmlFor="finder-from">From Unit:</label>
          <input
            id="finder-from"
            type="text"
            value={fromText}
            placeholder="e.g. kilogram"
            autoComplete="off"
            onChange={(event) => {
              setFromText(event.target.value);
              setSearched(true);
            }}
          />
        </div>
        <div className="field">
          <label htmlFor="finder-to">To Unit:</label>
          <input
            id="finder-to"
            type="text"
            value={toText}
            placeholder="e.g. lbs"
            autoComplete="off"
            onChange={(event) => {
              setToText(event.target.value);
              setSearched(true);
            }}
          />
        </div>
      </form>

      {searched && fromText.trim() && toText.trim() && (
        <div className="finder-results">
          {pairs.length === 0 ? (
            <p className="finder-empty">
              No converter holds both units. Check the spelling, or use the search box at the top.
            </p>
          ) : (
            <ul className="bullet-list">
              {pairs.map(({ category, from, to }) => (
                <li key={`${category.id}-${from.name}-${to.name}`}>
                  <Link
                    to={`/convert/${category.id}?from=${encodeURIComponent(from.name)}&to=${encodeURIComponent(to.name)}`}
                  >
                    {titled(from.name)} to {titled(to.name)}
                  </Link>{' '}
                  <span className="finder-note">
                    in {category.name} &mdash; 1 {from.name} ={' '}
                    {formatNumber(convert(category, 1, from, to))} {to.name}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}

export default function ExpressConverter() {
  return (
    <>
      <QuickConvert />
      <UnitFinder />
    </>
  );
}
