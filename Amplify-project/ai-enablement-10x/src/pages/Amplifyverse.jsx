import { useMemo, useState } from 'react'

const PLANETS = [
  { id: 'cipher', name: 'PROMPT LAB', color: '#e2762d', x: 22, y: 38, size: 58, labelColor: '#e2762d',
    stats: [0, 0, 0], mods: ['Prompt Lab — Live Simulation'] },
  { id: 'harbor', name: 'AGENT HARBOR', color: '#8b3ff0', x: 45, y: 26, size: 66, labelColor: '#a678f5',
    stats: [0, 0, 0], mods: ['Agent Harbor'] },
  { id: 'sims', name: 'SIMULATIONS', color: '#e838a8', x: 18, y: 66, size: 50, labelColor: '#e838a8',
    stats: [2, 2, 0], mods: ['Prompt Lab', 'Agent Harbor'] },
  { id: 'other', name: 'OTHER', color: '#f2b64c', x: 38, y: 62, size: 54, labelColor: '#f2b64c',
    stats: [6, 6, 0], mods: ['Automate Your Monday', 'Tap Card Learning', 'Prompt Patterns 101', 'Shadow AI: The Incident', 'Meeting Notes in Minutes', 'Test'] },
]

const MODULES = [
  { coll: 'PROMPT LAB', tag: 'TOOL', title: 'Prompt Lab', desc: 'Inbox simulator — spot AI leverage moments across email, Teams, and docs. Your responses reveal your AI persona.', updated: 'Jun 19', target: 'cipher' },
  { coll: 'AGENT HARBOR', tag: 'SIMULATION', title: 'Agent Harbor', desc: 'Agent-delegation tabletop. Open this module to begin.', updated: 'Jun 11', target: 'vendor' },
  { coll: 'SIMULATIONS', tag: 'TOOL', title: 'Prompt Lab', desc: 'Inbox simulator — spot AI leverage moments across email, Teams, and docs.', updated: 'Jun 19', target: 'cipher' },
  { coll: 'SIMULATIONS', tag: 'SIMULATION', title: 'Agent Harbor', desc: 'Open this module to begin.', updated: 'Jun 11', target: 'vendor' },
  { coll: 'OTHER', tag: 'LESSON', title: 'Automate Your Monday', desc: 'Hand your recurring Monday chores to an agent — inbox triage, status drafts, meeting prep.', updated: 'Jun 22', target: 'vendor' },
  { coll: 'OTHER', tag: 'LESSON', title: 'Shadow AI: The Incident', desc: 'Interactive story about a well-meaning employee and a public chatbot.', updated: 'Jun 14', target: 'cipher' },
]

function Stars() {
  const stars = useMemo(
    () =>
      Array.from({ length: 130 }, (_, i) => ({
        left: (i * 37.3) % 100,
        top: (i * 61.7) % 100,
        size: 1 + ((i * 13) % 3),
        opacity: 0.25 + ((i * 7) % 60) / 100,
      })),
    [],
  )
  return (
    <>
      {stars.map((s, i) => (
        <span key={i} className="star" style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, opacity: s.opacity }} />
      ))}
    </>
  )
}

export default function Amplifyverse({ onNavigate }) {
  const [view, setView] = useState('home') // home | galaxy
  const [collTab, setCollTab] = useState('SIMULATIONS')
  const [selected, setSelected] = useState(null)
  const [vendor, setVendor] = useState(false)
  const [vendorOutcome, setVendorOutcome] = useState(null)

  if (view === 'galaxy') {
    const p = PLANETS.find((x) => x.id === selected)
    return (
      <div className="galaxy">
        <Stars />
        <div className="galaxy-hud">
          <span className="hud-brand">⚡ AMPLIFYVERSE</span>
          <span className="hud-tab on">🗺 GALAXY MAP</span>
          <span className="hud-tab">MISSIONS</span>
          <span className="hud-tab">ACHIEVEMENTS</span>
          <span className="hud-tab">LEADERBOARD</span>
          <span className="hud-xp">✦ 1,200 XP</span>
          <span className="hud-tab" style={{ cursor: 'pointer' }} onClick={() => setView('home')}>CAROLINE VON KONIGSMARK ▾</span>
        </div>

        {PLANETS.map((pl) => (
          <div key={pl.id} className="planet-wrap" style={{ left: `${pl.x}%`, top: `${pl.y}%` }} onClick={() => setSelected(pl.id)}>
            <div className="planet" style={{
              width: pl.size, height: pl.size,
              background: `radial-gradient(circle at 32% 28%, ${pl.color}, #10091c 130%)`,
              boxShadow: `0 0 26px ${pl.color}66`,
            }}>
              {selected === pl.id && <div className="planet-ring" />}
            </div>
            <div className="planet-label" style={{ color: pl.labelColor }}>{pl.name}</div>
          </div>
        ))}

        {/* Earth easter egg */}
        <div className="planet-wrap" style={{ right: '12%', top: '30%', cursor: 'default' }}>
          <div className="planet" style={{
            width: 120, height: 120,
            background: 'radial-gradient(circle at 35% 30%, #7ec8ff, #1c56c9 60%, #0a1e52 110%)',
            boxShadow: '0 0 44px rgba(80,150,255,0.5)',
          }} />
        </div>

        {p && (
          <div className="mission-panel">
            <h3>{p.name}</h3>
            <div className="mission-stats">
              <div className="ms">{p.stats[0]}<small>MODULES</small></div>
              <div className="ms">{p.stats[1]}<small>AVAILABLE</small></div>
              <div className="ms">{p.stats[2]}<small>CLEARED</small></div>
            </div>
            <ul className="mission-mods">
              {p.mods.map((m) => <li key={m}>{m}</li>)}
            </ul>
            <button className="mission-launch" onClick={() => (p.id === 'harbor' ? setVendor(true) : onNavigate('cipher'))}>
              ⊕ LAUNCH MISSION ›
            </button>
          </div>
        )}

        <div className="mascot">
          <div className="mascot-sprite">🤖</div>
          <div className="mascot-say">
            <b>» Amplify</b><br />
            {selected
              ? `${PLANETS.find((x) => x.id === selected).mods.length} modules detected in the ${PLANETS.find((x) => x.id === selected).name.toLowerCase()} sector. Clearance status: active.`
              : 'Incoming signal from Agent Harbor. 2 missions queued for launch.'}
          </div>
        </div>

        {vendor && (
          <VendorSim
            outcome={vendorOutcome}
            setOutcome={setVendorOutcome}
            close={() => { setVendor(false); setVendorOutcome(null) }}
          />
        )}
      </div>
    )
  }

  const shown = MODULES.filter((m) => m.coll === collTab)

  return (
    <div className="amplify-shell">
      <aside className="amplify-side">
        <div className="as-brand">✦ THE AMPLIFYVERSE</div>
        <div className="sidebar-section">LEARNER</div>
        <button className="amplify-item active">🏠 Home</button>
        <button className="amplify-item">▦ Modules</button>
        <div className="sidebar-section">QUICK LINKS</div>
        <button className="amplify-item">💬 Ask Amplify</button>
        <button className="amplify-item">🧰 Approved AI Tools</button>
        <button className="amplify-item">🧱 Stacks 4 Hacks</button>
        <div className="sidebar-section">ADMIN</div>
        <button className="amplify-item" onClick={() => onNavigate('catalog')}>⚙ Admin</button>
      </aside>

      <div className="amplify-main">
        <div className="galaxy-toggle">
          <span style={{ fontSize: 11, color: 'var(--dark-muted)' }}>v2 classic</span>
          <button className="btn btn-sm btn-primary" onClick={() => setView('galaxy')}>🪐 Switch to v3 Galaxy Map</button>
        </div>

        <div className="welcome-hero">
          <h1>Welcome, Caroline von Konigsmark.</h1>
          <p>Pick a module below to get started. Your progress is saved as you go, and your submissions stay private to you and your admins.</p>
        </div>

        <div className="avail-head">
          <h4>AVAILABLE MODULES</h4>
          <span>8 available</span>
        </div>
        <div className="collection-tabs">
          {['PROMPT LAB', 'AGENT HARBOR', 'SIMULATIONS', 'OTHER'].map((c) => (
            <button key={c} className={`ctab ${collTab === c ? 'active' : ''}`} onClick={() => setCollTab(c)}>{c}</button>
          ))}
        </div>
        <div className="mod-cards">
          {shown.map((m, i) => (
            <div className="mod-card" key={i}>
              <span className="tag">{m.tag}</span>
              <h4>{m.title}</h4>
              <p>{m.desc}</p>
              <div className="mod-card-foot">
                <span>Updated {m.updated}</span>
                <button onClick={() => (m.target === 'cipher' ? onNavigate('cipher') : setVendor(true))}>Open →</button>
              </div>
            </div>
          ))}
        </div>

        {vendor && (
          <VendorSim
            outcome={vendorOutcome}
            setOutcome={setVendorOutcome}
            close={() => { setVendor(false); setVendorOutcome(null) }}
          />
        )}
      </div>
    </div>
  )
}

function VendorSim({ outcome, setOutcome, close }) {
  return (
    <div className="modal-back" onClick={close}>
      <div className="li-card" onClick={(e) => e.stopPropagation()}>
        <div className="li-chrome">
          <div className="li-logo">in</div>
          <span style={{ fontSize: 12, color: '#8a8d92' }}>Search</span>
          <span style={{ flex: 1 }} />
          <span style={{ fontSize: 11.5, color: '#8a8d92' }}>Home · My Network · Messaging · Notifications</span>
          <button onClick={close} style={{ border: 'none', background: '#0a66c2', color: '#fff', borderRadius: '50%', width: 22, height: 22, cursor: 'pointer' }}>✕</button>
        </div>
        <div className="li-body">
          <div className="li-banner" />
          <div className="li-profile">
            <div className="li-avatar" style={{ background: 'linear-gradient(135deg, #7b5cf0, #3d5af1)' }}>NA</div>
            <h3>NovaAI Tools</h3>
            <div className="li-role">"SummarizeGPT — your meetings, summarized. 100% free forever."</div>
            <div className="li-loc">Software company · 11–50 employees</div>
            <div className="li-stats">
              <span><b>2,4k</b> Followers</span>
              <span><b>8</b> Posts</span>
              <span><b>3 mo</b> Page age</span>
            </div>
          </div>
          <div className="li-section">
            <h4>Sponsored message</h4>
            <p>
              Hi Caroline! 👋 Loved your post about meeting overload. SummarizeGPT gives you instant AI
              summaries of every meeting — completely free. Just connect your Google Drive and calendar and
              we handle the rest. Setup takes 30 seconds — no IT approval needed!
            </p>
          </div>
          <div className="li-section">
            <h4>What to weigh</h4>
            <ul style={{ paddingLeft: 18 }}>
              <li>"Free forever" + full Drive access — what's the business model?</li>
              <li>3-month-old company page, no security or privacy documentation</li>
              <li>"No IT approval needed" is a pitch aimed at bypassing your tool-intake process</li>
              <li>Your org already has an approved meeting-summary workflow</li>
            </ul>
          </div>
        </div>
        {outcome && (
          <div className={`li-feedback ${outcome === 'report' ? 'good' : 'bad'}`}>
            {outcome === 'report' ? (
              <><b>✓ Best move.</b> Submitting the tool for vetting keeps the door open — if it's legit, IT can approve it for everyone; if not, you just prevented an org-wide Drive exposure. Enablement means more AI, through the right door.</>
            ) : outcome === 'connect' ? (
              <><b>✗ Risky.</b> Connecting Drive grants a 3-month-old unvetted vendor access to everything you can see. "Free forever" usually means your data is the product. Route it through tool intake instead — approval often takes days, not months.</>
            ) : (
              <><b>△ Understandable.</b> Ignoring it protects you, but colleagues got the same pitch. Submitting it for vetting (30 seconds) protects the whole org — and if the tool is good, everyone gets it properly.</>
            )}
          </div>
        )}
        <div className="li-actions">
          <button className="li-btn primary" onClick={() => setOutcome('connect')}>Connect Google Drive</button>
          <button className="li-btn ghost" onClick={() => setOutcome('ignore')}>Ignore</button>
          <button className="li-btn report" onClick={() => setOutcome('report')}>Submit for Vetting</button>
        </div>
      </div>
    </div>
  )
}
