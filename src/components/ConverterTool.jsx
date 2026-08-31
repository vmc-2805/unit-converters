import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { convert, convertNumberBase, formatNumber } from '../lib/convert.js';

function indexOfUnit(category, name, fallback) {
  if (!name) return fallback;
  const wanted = name.toLowerCase();
  const found = category.units.findIndex((unit) => unit.name.toLowerCase() === wanted);
  return found === -1 ? fallback : found;
}

export default function ConverterTool({ category }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState('1');

  const defaultTo = category.units.length > 1 ? 1 : 0;
  const fromIndex = indexOfUnit(category, searchParams.get('from'), 0);
  const toIndex = indexOfUnit(category, searchParams.get('to'), defaultTo);

  const fromUnit = category.units[fromIndex];
  const toUnit = category.units[toIndex];
  const isNumbers = category.kind === 'numbers';

  const result = useMemo(() => {
    if (value.trim() === '') return '';
    if (isNumbers) return convertNumberBase(value, fromUnit, toUnit);
    const numeric = Number(value);
    if (Number.isNaN(numeric)) return '';
    return formatNumber(convert(category, numeric, fromUnit, toUnit));
  }, [value, category, fromUnit, toUnit, isNumbers]);

  function setUnits(nextFrom, nextTo) {
    setSearchParams(
      {
        from: category.units[nextFrom].name,
        to: category.units[nextTo].name,
      },
      { replace: true },
    );
  }

  return (
    <div className="panel">
      <h2 className="panel-title">{category.name} Converter</h2>

      <div className="converter-grid">
        <div>
          <div className="field">
            <label htmlFor="from-value">From</label>
            <input
              id="from-value"
              type={isNumbers ? 'text' : 'number'}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="Enter a value"
              inputMode={isNumbers ? 'text' : 'decimal'}
              autoComplete="off"
            />
          </div>
          <div className="field">
            <label htmlFor="from-unit">Unit</label>
            <select
              id="from-unit"
              value={fromIndex}
              onChange={(event) => setUnits(Number(event.target.value), toIndex)}
            >
              {category.units.map((unit, index) => (
                <option key={`from-${unit.name}-${index}`} value={index}>
                  {unit.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="button" className="swap-btn" onClick={() => setUnits(toIndex, fromIndex)}>
          Swap
        </button>

        <div>
          <div className="field">
            <label htmlFor="to-value">To</label>
            <input id="to-value" className="result" type="text" value={result} readOnly />
          </div>
          <div className="field">
            <label htmlFor="to-unit">Unit</label>
            <select
              id="to-unit"
              value={toIndex}
              onChange={(event) => setUnits(fromIndex, Number(event.target.value))}
            >
              {category.units.map((unit, index) => (
                <option key={`to-${unit.name}-${index}`} value={index}>
                  {unit.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {result !== '' && (
        <p className="result-line">
          <b>{value}</b> {fromUnit.name} = <b>{result}</b> {toUnit.name}
        </p>
      )}

      <p className="converter-note">
        {isNumbers
          ? 'Type a number in the chosen base. Letters A to Z stand for digits above 9.'
          : `Base unit of this converter: ${category.base}. The answer updates while you type.`}
      </p>
    </div>
  );
}
