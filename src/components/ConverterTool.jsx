import { useMemo, useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { convert, convertNumberBase, formatNumber } from '../lib/convert.js';

function indexOfUnit(category, name, fallback) {
  if (!name) return fallback;
  const wanted = name.toLowerCase();
  const found = category.units.findIndex((unit) => unit.name.toLowerCase() === wanted);
  return found === -1 ? fallback : found;
}

function CustomSelect({ id, value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div className="custom-select-container" ref={containerRef}>
      <button
        id={id}
        type="button"
        className={`custom-select-trigger${isOpen ? ' is-open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedOption?.label}</span>
        <span className="custom-select-arrow"></span>
      </button>
      {isOpen && (
        <ul className="custom-select-options" role="listbox">
          {options.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              className={`custom-select-option${opt.value === value ? ' is-selected' : ''}`}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
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

  const fromOptions = useMemo(() => {
    return category.units.map((unit, index) => ({
      value: index,
      label: unit.label,
    }));
  }, [category.units]);

  const toOptions = useMemo(() => {
    return category.units.map((unit, index) => {
      let display = unit.label;
      if (value.trim() !== '') {
        if (isNumbers) {
          const converted = convertNumberBase(value, fromUnit, unit);
          if (converted && converted !== 'invalid digits') {
            display = `${display} (${converted})`;
          }
        } else {
          const numeric = Number(value);
          if (!Number.isNaN(numeric)) {
            display = `${display} (${formatNumber(convert(category, numeric, fromUnit, unit))})`;
          }
        }
      }
      return {
        value: index,
        label: display,
      };
    });
  }, [category.units, value, isNumbers, fromUnit, category]);

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
            <CustomSelect
              id="from-unit"
              value={fromIndex}
              onChange={(nextFrom) => setUnits(nextFrom, toIndex)}
              options={fromOptions}
            />
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
            <CustomSelect
              id="to-unit"
              value={toIndex}
              onChange={(nextTo) => setUnits(fromIndex, nextTo)}
              options={toOptions}
            />
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
