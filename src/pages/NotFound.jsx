import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page wrap">
      <h1>Page Not Found</h1>
      <p>The page you asked for does not exist. Try one of these instead.</p>
      <div className="pill-row">
        <Link className="pill" to="/">Home</Link>
        <Link className="pill" to="/converters">All Converters</Link>
        <Link className="pill" to="/convert/length">Length Converter</Link>
        <Link className="pill" to="/convert/temperature">Temperature Converter</Link>
      </div>
    </div>
  );
}
