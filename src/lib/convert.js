/* Conversion maths for every converter type in the site. */

const TEMPERATURE = {
  kelvin: { toBase: (v) => v, fromBase: (v) => v },
  Celsius: { toBase: (v) => v + 273.15, fromBase: (v) => v - 273.15 },
  Fahrenheit: { toBase: (v) => (v + 459.67) * (5 / 9), fromBase: (v) => v * 1.8 - 459.67 },
  Rankine: { toBase: (v) => v * (5 / 9), fromBase: (v) => v * 1.8 },
  Reaumur: { toBase: (v) => v * 1.25 + 273.15, fromBase: (v) => (v - 273.15) * 0.8 },
  'Triple point of water': { toBase: (v) => v * 273.16, fromBase: (v) => v / 273.16 },
};

function radixOf(unit) {
  const match = /base (\d+)/.exec(unit.symbol || '');
  return match ? Number(match[1]) : 10;
}

/* Radix conversion that also keeps the fractional part. */
export function convertNumberBase(text, fromUnit, toUnit) {
  const fromRadix = radixOf(fromUnit);
  const toRadix = radixOf(toUnit);
  const clean = String(text).trim().toLowerCase();
  if (!clean) return '';

  const negative = clean.startsWith('-');
  const body = negative ? clean.slice(1) : clean;
  const [intPart = '', fracPart = ''] = body.split('.');

  const digits = '0123456789abcdefghijklmnopqrstuvwxyz'.slice(0, fromRadix);
  const valid = (ch) => digits.includes(ch);
  if (![...intPart].every(valid) || ![...fracPart].every(valid)) return 'invalid digits';
  if (!intPart && !fracPart) return '';

  let whole = 0;
  for (const ch of intPart) whole = whole * fromRadix + parseInt(ch, 36);
  let fraction = 0;
  for (let i = fracPart.length - 1; i >= 0; i -= 1) {
    fraction = (fraction + parseInt(fracPart[i], 36)) / fromRadix;
  }

  let out = Math.floor(whole).toString(toRadix);
  if (fraction > 0) {
    let rest = fraction;
    let digitsOut = '';
    for (let i = 0; i < 12 && rest > 1e-12; i += 1) {
      rest *= toRadix;
      const digit = Math.floor(rest);
      digitsOut += digit.toString(toRadix);
      rest -= digit;
    }
    if (digitsOut) out += `.${digitsOut}`;
  }
  return (negative ? '-' : '') + out.toUpperCase();
}

export function toBaseValue(unit, value) {
  if (unit.inverse) return value === 0 ? Infinity : unit.factor / value;
  return value * unit.factor;
}

export function fromBaseValue(unit, base) {
  if (unit.inverse) return base === 0 ? Infinity : unit.factor / base;
  return base / unit.factor;
}

export function convert(category, value, fromUnit, toUnit) {
  if (category.kind === 'temperature') {
    const from = TEMPERATURE[fromUnit.name];
    const to = TEMPERATURE[toUnit.name];
    if (!from || !to) return NaN;
    return to.fromBase(from.toBase(value));
  }
  return fromBaseValue(toUnit, toBaseValue(fromUnit, value));
}

/* Readable output: plain digits when possible, scientific notation otherwise. */
export function formatNumber(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return '';
  if (!Number.isFinite(value)) return 'Infinity';
  if (value === 0) return '0';

  const size = Math.abs(value);
  if (size >= 1e15 || size < 1e-7) {
    const [mantissa, exponent] = value.toExponential(9).split('e');
    return `${trimZeros(mantissa)}E${exponent.replace('+', '')}`;
  }
  return trimZeros(Number(value.toPrecision(12)).toFixed(12));
}

function trimZeros(text) {
  if (!text.includes('.')) return text;
  return text.replace(/0+$/, '').replace(/\.$/, '');
}

/* Rows for the "Conversion Table" block on a converter page. */
export function buildConversionTable(category, fromUnit, limit = 12) {
  if (category.kind === 'numbers') return [];
  const samples = [1, 2, 3, 5, 10, 20, 50, 100, 500, 1000];
  const targets = category.units.filter((u) => u.name !== fromUnit.name).slice(0, limit);
  return { samples, targets };
}

export function quickPairs(category, fromUnit, count = 10) {
  return category.units
    .filter((u) => u.name !== fromUnit.name)
    .slice(0, count)
    .map((unit) => ({
      unit,
      value: convert(category, 1, fromUnit, unit),
    }));
}
