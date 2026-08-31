import { Link } from 'react-router-dom';
import { groups, totalConverters, totalUnits } from '../data/index.js';
import SearchBox from '../components/SearchBox.jsx';
import ExpressConverter from '../components/ExpressConverter.jsx';

/* [category, from unit, to unit, forward label, reverse label] */
const conversionPairs = [
  ['length', 'centimeter', 'inch', 'cm to inches', 'inches to cm'],
  ['weight-and-mass', 'kilogram', 'pound', 'kg to lbs', 'lbs to kg'],
  ['temperature', 'Celsius', 'Fahrenheit', 'Celsius to Fahrenheit', 'Fahrenheit to Celsius'],
  ['length', 'millimeter', 'inch', 'mm to inches', 'inches to mm'],
  ['length', 'meter', 'foot', 'meters to feet', 'feet to meters'],
  ['length', 'kilometer', 'mile', 'km to miles', 'miles to km'],
  ['length', 'centimeter', 'foot', 'cm to feet', 'feet to cm'],
  ['weight-and-mass', 'gram', 'ounce', 'grams to ounces', 'ounces to grams'],
  ['length', 'inch', 'foot', 'inches to feet', 'feet to inches'],
  ['volume', 'liter', 'gallon (US)', 'liters to gallons', 'gallons to liters'],
  ['weight-and-mass', 'pound', 'ounce', 'pounds to ounces', 'ounces to pounds'],
  ['speed', 'mile/hour', 'kilometer/hour', 'mph to kph', 'kph to mph'],
  ['area', 'acre', 'square foot', 'acres to square feet', 'square feet to acres'],
  ['angle', 'radian', 'degree', 'radians to degrees', 'degrees to radians'],
  ['power', 'horsepower', 'kilowatt', 'hp to kw', 'kw to hp'],
  ['length', 'meter', 'yard', 'meters to yards', 'yards to meters'],
  ['volume', 'milliliter', 'cup (US)', 'mL to cups', 'cups to mL'],
];

function pairLink(category, from, to) {
  return `/convert/${category}?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
}

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <h1>Change any unit into another unit</h1>
          <p>
            Pick a converter, type your number and read the answer. Every calculation runs in
            your browser, so there is nothing to install and nothing to sign up for.
          </p>

          <div className="hero-search">
            <SearchBox
              variant="hero"
              placeholder={`Search ${totalConverters} converters and ${totalUnits}+ units...`}
            />
          </div>
        </div>
      </section>

      <div className="page wrap">
        <ExpressConverter />

        <section className="home-section">
          <h2 className="section-title">Common Conversions</h2>
          <div className="bullet-columns">
            <ul className="bullet-list">
              {conversionPairs.map(([category, from, to, label]) => (
                <li key={`${category}-${from}-${to}`}>
                  <Link to={pairLink(category, from, to)}>{label}</Link>
                </li>
              ))}
            </ul>
            <ul className="bullet-list">
              {conversionPairs.map(([category, from, to, , reverseLabel]) => (
                <li key={`${category}-${to}-${from}`}>
                  <Link to={pairLink(category, to, from)}>{reverseLabel}</Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="home-section">
          <h2 className="section-title">Unit Converters &mdash; Full Versions</h2>
          <div className="converter-index">
            {groups.map((group) => (
              <div className="index-group" key={group.id}>
                <h3>
                  <Link to={`/category/${group.id}`}>{group.name}</Link>
                </h3>
                <ul className="bullet-list">
                  {group.items.map((cat) => (
                    <li key={cat.id}>
                      <Link to={`/convert/${cat.id}`}>{cat.name} Converter</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
