import { Link, Navigate, useParams } from 'react-router-dom';
import { groupById } from '../data/index.js';

export default function GroupPage() {
  const { groupId } = useParams();
  const group = groupById(groupId);

  if (!group) return <Navigate to="/converters" replace />;

  return (
    <div className="page wrap">
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        {group.name}
      </nav>

      <h1>{group.name}</h1>
      <p>{group.blurb} Pick a converter below to start.</p>

      <div className="card-grid">
        {group.items.map((cat) => (
          <Link key={cat.id} className="card" to={`/convert/${cat.id}`}>
            <b>{cat.name}</b>
            <span>Base unit: {cat.base}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
