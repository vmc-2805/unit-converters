import { Link } from 'react-router-dom';
import { totalConverters, totalUnits, groups } from '../data/index.js';

export default function About() {
  return (
    <div className="page wrap">
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        About Us
      </nav>

      <h1>About Us</h1>

      <div className="panel">
        <h2 className="panel-title">What this site does</h2>
        <p>
          All In One Calculator is a small tool for changing one unit into another. It holds{' '}
          {totalConverters} converters and over {totalUnits} units across {groups.length}{' '}
          categories, from everyday length and weight to engineering, heat, light, electricity
          and radiology values.
        </p>
        <p>
          Everything works in the browser. No account, no download and no waiting for a server to
          answer.
        </p>
      </div>

      <div className="panel">
        <h2 className="panel-title">How to use it</h2>
        <ul className="info-list">
          <li>Open a converter from the menu, the search box or the home page.</li>
          <li>Type the value you already have in the "From" box.</li>
          <li>Pick the unit you have and the unit you want.</li>
          <li>The answer appears straight away and updates as you type.</li>
          <li>Use the Swap button to turn the conversion around.</li>
        </ul>
      </div>

      <div className="panel">
        <h2 className="panel-title">About the numbers</h2>
        <p>
          Each converter keeps one base unit. A value is first changed into that base unit and
          then into the unit you asked for. Standard factors are used, for example 1 inch is
          exactly 0.0254 meter and 1 pound is exactly 0.45359237 kilogram.
        </p>
        <p>
          Results are shown with high precision, but very large and very small answers are
          written in short scientific form such as 1.5E-7. For legal, medical or safety work,
          please check the result against an official source.
        </p>
      </div>
    </div>
  );
}
