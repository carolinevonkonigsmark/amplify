import { useState } from 'react'

const MODULES = [
  { title: 'Tap Card Learning', slug: 'tap-card', status: 'Draft', kind: 'lesson', coll: 'Other', updated: 'Jun 22, 2026', desc: 'AI-generated awareness cards on a new capability. Tap through a stacked deck to reveal key facts.' },
  { title: 'Prompt Lab — Live Simulation', slug: 'prompt-lab-dynamic', status: 'Draft', kind: 'tool', coll: 'Prompt Lab', updated: 'Jun 22, 2026', desc: 'AI-generated workflow simulation. Each scenario targets a specific leverage moment.' },
  { title: 'Automate Your Monday', slug: 'automate-monday', status: 'Published', kind: 'lesson', coll: 'Other', updated: 'Jun 22, 2026', desc: 'Hand your recurring Monday chores to an agent — inbox triage, status drafts, meeting prep.' },
  { title: 'Prompt Patterns 101', slug: 'prompt-patterns', status: 'Published', kind: 'lesson', coll: 'Other', updated: 'Jun 17, 2026', desc: 'Role, context, format, examples: the four patterns behind reliable outputs.' },
  { title: 'Meeting Notes in Minutes', slug: 'meeting-notes', status: 'Published', kind: 'lesson', coll: 'Other', updated: 'Jun 15, 2026', desc: 'From raw transcript to decisions-and-actions summary — with a reusable template.' },
  { title: 'Shadow AI: The Incident', slug: 'shadow-ai-incident', status: 'Published', kind: 'lesson', coll: 'Other', updated: 'Jun 14, 2026', desc: 'Interactive story following a well-meaning employee who pastes source code into a public chatbot.' },
  { title: 'Prompt Lab', slug: 'prompt-lab', status: 'Published', kind: 'tool', coll: 'Simulations', updated: 'Jun 22, 2026', desc: 'Inbox simulator — spot AI leverage moments across email, Teams, and docs.' },
  { title: 'Agent Harbor', slug: 'agent-harbor', status: 'Published', kind: 'simulation', coll: 'Simulations', updated: 'Jun 11, 2026', desc: 'Agent-delegation tabletop simulation. Open this module to begin.' },
]

const COLLECTIONS = [
  { order: 1, name: 'Prompt Lab', slug: 'prompt-lab', modules: 1 },
  { order: 3, name: 'Agent Harbor', slug: 'agent-harbor', modules: 1 },
  { order: 5, name: 'Simulations', slug: 'simulations', modules: 2 },
  { order: 6, name: 'Other', slug: 'other', modules: 5 },
]

export default function AdminCatalog({ onNavigate }) {
  const [view, setView] = useState('modules')
  const [statusFilter, setStatusFilter] = useState('All')
  const [collFilter, setCollFilter] = useState('All collections')

  const shown = MODULES.filter(
    (m) =>
      (statusFilter === 'All' || m.status === statusFilter) &&
      (collFilter === 'All collections' || m.coll === collFilter),
  )

  return (
    <div className="light-shell">
      <aside className="sidebar">
        <div className="sidebar-title">
          <div className="sidebar-logo">AM</div>
          <h2>Amplify</h2>
        </div>
        <div className="sidebar-sub">Platform · Admin</div>
        <div className="sidebar-section">CONTENT</div>
        <button className={`sidebar-item ${view === 'modules' ? 'active' : ''}`} onClick={() => setView('modules')}>▦ Modules</button>
        <button className={`sidebar-item ${view === 'collections' ? 'active' : ''}`} onClick={() => setView('collections')}>🗂 Collections</button>
        <button className="sidebar-item">＋ Create / Import</button>
        <div className="sidebar-section">PEOPLE</div>
        <button className="sidebar-item">👥 Users</button>
        <div className="sidebar-section">SYSTEM</div>
        <button className="sidebar-item">⚙ Settings</button>
        <button className="sidebar-item">ⓘ About</button>
        <div className="sidebar-footer"><a onClick={() => onNavigate('amplifyverse')}>👁 View catalog</a></div>
      </aside>

      <div className="content">
        {view === 'modules' && (
          <>
            <div className="catalog-head">
              <h1>Modules <span style={{ fontSize: 13, color: 'var(--ink-soft)', fontWeight: 400 }}>({shown.length} shown)</span></h1>
              <button className="btn btn-primary">＋ Create or import</button>
            </div>
            <div className="filter-row">
              {['All', 'Published', 'Unlisted', 'Draft'].map((f) => (
                <button key={f} className={`filter-pill ${statusFilter === f ? 'active' : ''}`} onClick={() => setStatusFilter(f)}>{f}</button>
              ))}
              <span className="filter-gap" />
              {['All collections', 'Prompt Lab', 'Agent Harbor', 'Simulations', 'Other'].map((f) => (
                <button key={f} className={`filter-pill ${collFilter === f ? 'active' : ''}`} onClick={() => setCollFilter(f)}>{f}</button>
              ))}
            </div>
            {shown.map((m) => (
              <div className="module-row" key={m.slug}>
                <div className="module-info">
                  <h4>
                    {m.title}
                    <span className={`chip ${m.status === 'Published' ? 'chip-green' : m.status === 'Draft' ? 'chip-amber' : 'chip-grey'}`}>{m.status}</span>
                    <span className="chip chip-grey">{m.kind}</span>
                  </h4>
                  <div className="module-meta"><code>{m.slug}</code> {m.coll} · Updated {m.updated}</div>
                  <div className="module-desc">{m.desc}</div>
                </div>
                <div className="module-actions">
                  <button className="btn btn-sm btn-danger-ghost">Delete</button>
                  <button className="btn btn-sm">Edit</button>
                  <button className="btn btn-sm">Results</button>
                  <button className="btn btn-sm btn-primary" onClick={() => m.slug.startsWith('prompt-lab') ? onNavigate('cipher') : onNavigate('amplifyverse')}>Launch →</button>
                </div>
              </div>
            ))}
          </>
        )}

        {view === 'collections' && (
          <>
            <h1>Collections</h1>
            <p className="content-sub">
              Collections group modules together and appear as filters on the home page. They are shown in
              order_index order — the first one is selected by default.
            </p>
            <div className="card" style={{ marginBottom: 16, display: 'flex', gap: 10, alignItems: 'flex-end' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>New collection name</label>
                <input type="text" placeholder="e.g. Simulations" style={{ width: '100%', font: 'inherit', fontSize: 13, padding: '9px 12px', borderRadius: 8, border: '1px solid var(--line)' }} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>Order</label>
                <input type="text" defaultValue="4" style={{ width: 70, font: 'inherit', fontSize: 13, padding: '9px 12px', borderRadius: 8, border: '1px solid var(--line)' }} />
              </div>
              <button className="btn btn-primary">＋ Add</button>
            </div>
            <div className="card" style={{ padding: 0 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ textAlign: 'left', color: 'var(--ink-soft)', fontSize: 10.5, letterSpacing: 1 }}>
                    {['ORDER', 'NAME', 'SLUG', 'MODULES', 'ACTIONS'].map((col) => (
                      <th key={col} style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COLLECTIONS.map((c) => (
                    <tr key={c.slug}>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>{c.order} <button className="btn btn-sm" style={{ marginLeft: 8 }}>Set</button></td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)', fontWeight: 600 }}>{c.name}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}><code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, background: '#eef0f6', padding: '2px 7px', borderRadius: 5 }}>{c.slug}</code></td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>{c.modules}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}><button className="btn btn-sm btn-danger-ghost">Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
