import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { findCategory, groupById } from '../data/index.js';
import { convert, formatNumber } from '../lib/convert.js';
import ConverterTool from '../components/ConverterTool.jsx';

function unitByName(category, name, fallbackIndex) {
  if (name) {
    const found = category.units.find((u) => u.name.toLowerCase() === name.toLowerCase());
    if (found) return found;
  }
  return category.units[fallbackIndex] || category.units[0];
}

export default function ConverterPage() {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const category = findCategory(categoryId);

  if (!category) return <Navigate to="/converters" replace />;

  const group = groupById(category.groupId);
  const fromUnit = unitByName(category, searchParams.get('from'), 0);
  const toUnit = unitByName(category, searchParams.get('to'), category.units.length > 1 ? 1 : 0);

  const isNumbers = category.kind === 'numbers';
  const isTemperature = category.kind === 'temperature';

  const tableUnits = category.units.filter((u) => u.name !== fromUnit.name).slice(0, 18);
  const popularPairs = category.units.slice(0, 9);

  return (
    <div className="page wrap">
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to={`/category/${group.id}`}>{group.name}</Link>
        <span>/</span>
        {category.name}
      </nav>

      <h1>{category.name} Converter</h1>
      <p>
        Convert {category.name.toLowerCase()} values from one unit to another. Choose the unit
        you have, choose the unit you want, and the result appears at once.
      </p>

      <ConverterTool key={category.id} category={category} />

      <div className="two-col">
        <div>
          {!isNumbers && (
            <div className="panel">
              <h2 className="panel-title">
                {fromUnit.name} to {toUnit.name} Conversion Table
              </h2>
              <div className="table-scroll">
                <table className="data">
                  <thead>
                    <tr>
                      <th>{fromUnit.label}</th>
                      <th>{toUnit.label}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[0.01, 0.1, 1, 2, 3, 5, 10, 20, 50, 100, 1000].map((sample) => (
                      <tr key={sample}>
                        <td>{sample}</td>
                        <td>{formatNumber(convert(category, sample, fromUnit, toUnit))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="panel">
            <h2 className="panel-title">How to Convert {category.name}</h2>
            {isNumbers ? (
              <>
                <p>
                  A number can be written in many bases. Base 10 uses the digits 0 to 9. Base 2
                  uses only 0 and 1. Bases above 10 use letters, so A means 10, B means 11 and so
                  on.
                </p>
                <ul className="info-list">
                  <li>Type the number exactly as it is written in the first base.</li>
                  <li>Pick the base you want the answer in.</li>
                  <li>Decimal points are allowed, for example 1010.11 in base 2.</li>
                </ul>
              </>
            ) : isTemperature ? (
              <>
                <p>Temperature scales do not share a common zero, so each one has its own formula.</p>
                <ul className="info-list">
                  <li>Celsius to Fahrenheit: F = C x 1.8 + 32</li>
                  <li>Fahrenheit to Celsius: C = (F - 32) / 1.8</li>
                  <li>Celsius to Kelvin: K = C + 273.15</li>
                  <li>Kelvin to Rankine: R = K x 1.8</li>
                  <li>Celsius to Reaumur: r = C x 0.8</li>
                </ul>
              </>
            ) : (
              <>
                <p>
                  Every unit on this page is linked to one base unit: {category.base}. To move
                  from one unit to another, the value first goes to the base unit and then to the
                  unit you asked for.
                </p>
                <ul className="info-list">
                  <li>
                    1 {fromUnit.name} = {formatNumber(convert(category, 1, fromUnit, toUnit))}{' '}
                    {toUnit.name}
                  </li>
                  <li>
                    1 {toUnit.name} = {formatNumber(convert(category, 1, toUnit, fromUnit))}{' '}
                    {fromUnit.name}
                  </li>
                  <li>
                    Example: 15 {fromUnit.name} ={' '}
                    {formatNumber(convert(category, 15, fromUnit, toUnit))} {toUnit.name}
                  </li>
                </ul>
              </>
            )}
          </div>

          {!isNumbers && (
            <div className="panel">
              <h2 className="panel-title">1 {fromUnit.name} in Other Units</h2>
              <div className="table-scroll">
                <table className="data">
                  <thead>
                    <tr>
                      <th>Unit</th>
                      <th>Value of 1 {fromUnit.name}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableUnits.map((unit) => (
                      <tr key={unit.name}>
                        <td>{unit.label}</td>
                        <td>{formatNumber(convert(category, 1, fromUnit, unit))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <aside>
          <div className="panel">
            <h2 className="panel-title">Popular {category.name} Conversions</h2>
            <ul className="info-list">
              {popularPairs
                .filter((unit) => unit.name !== fromUnit.name)
                .map((unit) => (
                  <li key={unit.name}>
                    <Link
                      to={`/convert/${category.id}?from=${encodeURIComponent(fromUnit.name)}&to=${encodeURIComponent(unit.name)}`}
                    >
                      {fromUnit.name} to {unit.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div className="panel">
            <h2 className="panel-title">More in {group.name}</h2>
            <ul className="info-list">
              {group.items
                .filter((item) => item.id !== category.id)
                .map((item) => (
                  <li key={item.id}>
                    <Link to={`/convert/${item.id}`}>{item.name}</Link>
                  </li>
                ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
