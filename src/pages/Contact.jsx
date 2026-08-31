import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  function update(field, value) {
    setForm((old) => ({ ...old, [field]: value }));
    setSent(false);
  }

  function onSubmit(event) {
    event.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  }

  return (
    <div className="page wrap">
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        Contact
      </nav>

      <h1>Contact</h1>
      <p>
        Found a unit that is missing, or a value that looks wrong? Send a short note and it will
        be checked.
      </p>

      <div className="two-col">
        <div className="panel">
          <h2 className="panel-title">Send a Message</h2>
          <form onSubmit={onSubmit}>
            <div className="field">
              <label htmlFor="name">Your name</label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(event) => update('name', event.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(event) => update('email', event.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                rows="5"
                required
                value={form.message}
                onChange={(event) => update('message', event.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 11px',
                  fontSize: '15px',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius)',
                  fontFamily: 'inherit',
                }}
              />
            </div>
            <button type="submit" className="swap-btn" style={{ marginTop: '12px' }}>
              Send Message
            </button>
            {sent && (
              <p className="result-line" style={{ marginTop: '16px' }}>
                Thank you. Your message has been noted on this device.
              </p>
            )}
          </form>
          <p className="converter-note">
            This form is a demo. It does not send email yet, so nothing leaves your browser.
          </p>
        </div>

        <aside className="panel">
          <h2 className="panel-title">Other Ways to Reach Us</h2>
          <ul className="info-list">
            <li>Email: support@allinonecalculator.example</li>
            <li>Working hours: Monday to Friday, 10:00 to 18:00</li>
            <li>Answer time: usually within two working days</li>
          </ul>
          <p>
            When you write about a wrong value, please include the converter name, the two units
            and the number you used. That makes the check much faster.
          </p>
        </aside>
      </div>
    </div>
  );
}
