import { Link } from 'react-router-dom';
import { groups, totalConverters, totalUnits } from '../data/index.js';

const popular = [
  ['length', 'Length Converter'],
  ['weight-and-mass', 'Weight and Mass'],
  ['temperature', 'Temperature'],
  ['volume', 'Volume'],
  ['area', 'Area'],
  ['data-storage', 'Data Storage'],
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <h4>All In One Calculator</h4>
          <p>
            A simple place to change one unit into another. It covers {totalConverters} converters
            and more than {totalUnits} units, from everyday length and weight to engineering,
            heat, light and electricity values.
          </p>
          <p>Type a number, pick the two units, and read the answer straight away.</p>
        </div>

        <div>
          <h4>Popular Converters</h4>
          <ul>
            {popular.map(([id, label]) => (
              <li key={id}>
                <Link to={`/convert/${id}`}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Categories</h4>
          <ul>
            {groups.map((group) => (
              <li key={group.id}>
                <Link to={`/category/${group.id}`}>{group.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Site</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/converters">All Converters</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} All In One Calculator. Values are given for general use.
        Please check important results before you rely on them.
      </div>
    </footer>
  );
}
