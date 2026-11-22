import { useEffect, useState } from 'react';

// Set when the site builds: the API's public URL. In walroos it's a variable of the app, which
// the static build passes to Vite.
const API = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

async function call(method, path, body) {
  const res = await fetch(API + path, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || `${method} ${path}: ${res.status}`);
  return res.status === 204 ? null : res.json();
}

export function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const load = () => call('GET', '/api/notes').then(setNotes, e => setError(e.message));
  useEffect(() => { load(); }, []);

  const add = e => {
    e.preventDefault();
    call('POST', '/api/notes', { text }).then(() => { setText(''); setError(''); load(); }, e => setError(e.message));
  };
  const remove = id => call('DELETE', `/api/notes/${id}`).then(load, e => setError(e.message));

  return (
    <main>
      <h1>Notes</h1>
      <p className="muted">A static React site built with Bun and an API with Postgres, deployed with walroos.</p>
      {!API && <p className="error">VITE_API_URL wasn't set when this site was built.</p>}
      <form onSubmit={add}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Write a note" maxLength={500} />
        <button disabled={!text.trim()}>Add</button>
      </form>
      {error && <p className="error">{error}</p>}
      <ul>
        {notes.map(n => (
          <li key={n.id}>
            <span>{n.text}</span>
            <button className="ghost" onClick={() => remove(n.id)} aria-label="Delete">×</button>
          </li>
        ))}
      </ul>
      <p className="muted small">API: {API || 'not set'}</p>
    </main>
  );
}
