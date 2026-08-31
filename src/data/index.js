import { commonGroup } from './common.js';
import { engineeringGroup } from './engineering.js';
import { heatGroup } from './heat.js';
import { fluidsGroup } from './fluids.js';
import { lightGroup } from './light.js';
import { electricityGroup } from './electricity.js';
import { magnetismGroup, radiologyGroup, otherGroup } from './other.js';

const rawGroups = [
  commonGroup,
  engineeringGroup,
  heatGroup,
  fluidsGroup,
  lightGroup,
  electricityGroup,
  magnetismGroup,
  radiologyGroup,
  otherGroup,
];

function normalizeUnit(row) {
  const [name, symbol, factor, flag] = row;
  return {
    name,
    symbol: symbol || '',
    label: symbol ? `${name} [${symbol}]` : name,
    factor: typeof factor === 'number' ? factor : 1,
    inverse: flag === 'inv',
  };
}

export const groups = rawGroups.map((group) => ({
  id: group.id,
  name: group.name,
  blurb: group.blurb,
  items: group.items.map((cat) => ({
    id: cat.id,
    name: cat.name,
    base: cat.base,
    kind: cat.kind || 'linear',
    groupId: group.id,
    groupName: group.name,
    units: cat.units.map(normalizeUnit),
  })),
}));

export const allCategories = groups.flatMap((g) => g.items);

export const categoryById = Object.fromEntries(allCategories.map((c) => [c.id, c]));

export function findCategory(id) {
  return categoryById[id] || null;
}

export function groupById(id) {
  return groups.find((g) => g.id === id) || null;
}

/* Shown on the home page as quick links. */
export const popularConversions = [
  { from: 'Inch', to: 'Centimeter', id: 'length' },
  { from: 'Centimeter', to: 'Inch', id: 'length' },
  { from: 'Foot', to: 'Meter', id: 'length' },
  { from: 'Kilogram', to: 'Pound', id: 'weight-and-mass' },
  { from: 'Pound', to: 'Kilogram', id: 'weight-and-mass' },
  { from: 'Celsius', to: 'Fahrenheit', id: 'temperature' },
  { from: 'Fahrenheit', to: 'Celsius', id: 'temperature' },
  { from: 'Liter', to: 'Gallon (US)', id: 'volume' },
  { from: 'Square Meter', to: 'Square Foot', id: 'area' },
  { from: 'Kilometer/hour', to: 'Mile/hour', id: 'speed' },
  { from: 'Megabyte', to: 'Gigabyte', id: 'data-storage' },
  { from: 'Bar', to: 'Psi', id: 'pressure' },
];

export const totalConverters = allCategories.length;
export const totalUnits = allCategories.reduce((sum, c) => sum + c.units.length, 0);

/* ---------------- search ----------------
   The index holds every converter name and every unit name, so a visitor can
   look for "Pressure" as well as for "psi". */

const converterEntries = allCategories.map((cat) => ({
  kind: 'converter',
  title: cat.name,
  subtitle: cat.groupName,
  url: `/convert/${cat.id}`,
  needle: `${cat.name} ${cat.groupName}`.toLowerCase(),
  sortKey: cat.name.toLowerCase(),
}));

const groupEntries = groups.map((group) => ({
  kind: 'category',
  title: group.name,
  subtitle: `${group.items.length} converters`,
  url: `/category/${group.id}`,
  needle: group.name.toLowerCase(),
  sortKey: group.name.toLowerCase(),
}));

const unitEntries = allCategories.flatMap((cat) =>
  cat.units.map((unit) => ({
    kind: 'unit',
    title: unit.label,
    subtitle: `${cat.name} unit`,
    url: `/convert/${cat.id}?from=${encodeURIComponent(unit.name)}&to=${encodeURIComponent(
      (cat.units.find((u) => u.name !== unit.name) || unit).name,
    )}`,
    needle: `${unit.name} ${unit.symbol}`.toLowerCase(),
    sortKey: unit.name.toLowerCase(),
  })),
);

export const searchIndex = [...converterEntries, ...groupEntries, ...unitEntries];

const KIND_WEIGHT = { converter: 0, category: 1, unit: 2 };

/* Best matches first: exact name, then names that start with the term, then the rest. */
export function searchConverters(term, limit = 10) {
  const query = term.trim().toLowerCase();
  if (!query) return [];

  const hits = [];
  for (const entry of searchIndex) {
    const at = entry.needle.indexOf(query);
    if (at === -1) continue;
    let score = KIND_WEIGHT[entry.kind] * 10;
    if (entry.sortKey === query) score -= 8;
    else if (entry.sortKey.startsWith(query)) score -= 5;
    else if (at === 0) score -= 3;
    hits.push({ entry, score, at });
    if (hits.length > 900) break;
  }

  hits.sort((a, b) => a.score - b.score || a.at - b.at || a.entry.sortKey.localeCompare(b.entry.sortKey));
  return hits.slice(0, limit).map((hit) => hit.entry);
}
