import { useState } from 'react'

const CHOICES = [
  { key: 'A', text: 'Paste the full document into your personal free chatbot account', good: false,
    coach: "Fast, but the document is marked Internal-Confidential — personal free-tier tools may train on or retain your data. This is the moment Shadow AI happens. The approved enterprise workspace does the same job with the right data guarantees." },
  { key: 'B', text: 'Use the approved enterprise AI workspace with a structured prompt', good: true,
    coach: "Exactly right. Enterprise workspace + a structured prompt (role, audience, format, length) turns a 3-hour task into a 20-minute review. Bonus: save the prompt as a template so the whole team benefits next quarter." },
  { key: 'C', text: 'Skip AI and do it manually to be safe', good: false,
    coach: "Safe, but you just spent 3 hours on a task AI does in minutes — this is a leverage moment missed. 'Safe' and 'AI' aren't opposites: the approved workspace exists precisely so you don't have to choose." },
]

const FLAGS = [
  'Tight deadline — a classic AI acceleration moment',
  'Document is Internal-Confidential — approved tools only',
  'Task is summarisation, a core LLM strength',
  'A reusable prompt template exists for board summaries',
]

export default function CipherLetter({ onNavigate }) {
  const [phase, setPhase] = useState('inbox') // inbox → reveal → persona
  const [picked, setPicked] = useState(null)
  const [investigated, setInvestigated] = useState(false)
  const [ticked, setTicked] = useState([])

  const toggleFlag = (f) =>
    setTicked((t) => (t.includes(f) ? t.filter((x) => x !== f) : [...t, f]))

  return (
    <div className="sim-shell">
      <div className="sim-topbar">
        <h2>
          <span className="chip chip-purple">✉ Prompt Lab</span>
          Prompt Lab — Live Simulation
          <span className="chip chip-amber">Draft preview</span>
        </h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-sm" onClick={() => { setPhase('inbox'); setPicked(null); setTicked([]); setInvestigated(false) }}>Reset state</button>
          <button className="btn btn-sm" onClick={() => onNavigate('catalog')}>← All modules</button>
        </div>
      </div>

      {phase !== 'inbox' && (
        <div className="attack-banner" style={{ background: 'var(--green)' }}>✨ This was an AI leverage moment</div>
      )}

      {phase === 'persona' ? (
        <Persona onNavigate={onNavigate} />
      ) : (
        <>
          {phase === 'inbox' && (
            <div style={{ textAlign: 'center', fontSize: 11.5, color: 'var(--ink-soft)', marginBottom: 12 }}>
              MESSAGE 1 OF 1
            </div>
          )}

          <div style={phase === 'reveal' ? { display: 'grid', gridTemplateColumns: '1fr 320px', gap: 18, alignItems: 'start' } : {}}>
            <div className="mail-window">
              <div className="mail-chrome">
                <span className="mail-logo">M ail</span>
                <span className="mail-search">🔍 Search mail</span>
                <span>⚙</span>
              </div>
              <div className="mail-body">
                <div className="mail-nav">
                  <div className="active"><span>📥 Inbox</span><span>1</span></div>
                  <div><span>⭐ Starred</span></div>
                  <div><span>🕓 Snoozed</span></div>
                  <div><span>📤 Sent</span></div>
                  <div><span>📝 Drafts</span></div>
                </div>
                <div className="mail-content">
                  <h3>Board summary needed by 5pm today</h3>
                  <div className="mail-from">
                    <div className="mail-from-avatar" style={{ background: '#3d5af1' }}>PS</div>
                    <div>
                      <b>Priya Sharma — Chief of Staff</b>
                      <span style={{ fontSize: 11, color: 'var(--ink-soft)' }}>To: me</span>
                      <span className="mail-from-addr">priya.sharma@meridian.com</span>
                    </div>
                    <span className="mail-date">11:42 AM</span>
                  </div>
                  <p className="mail-text">
                    Hi — the board meeting moved up to 5pm today. I need a one-page summary of the Q2 operations
                    review (the 40-page deck, marked <code>Internal-Confidential</code>): key decisions, risks,
                    and asks, in the usual board format. Sorry for the crunch — can you get this to me by 4:30?
                  </p>

                  {phase === 'inbox' &&
                    CHOICES.map((c) => (
                      <button
                        key={c.key}
                        className={`choice ${picked === c.key ? (c.good ? 'picked-good' : 'picked-bad') : ''}`}
                        onClick={() => setPicked(c.key)}
                      >
                        <span className="key">{c.key}</span>
                        {c.text}
                      </button>
                    ))}
                </div>
              </div>

              {phase === 'inbox' && picked && (
                <div className="coach-box">
                  <h5>COACHING — OPTION {picked}</h5>
                  <p>{CHOICES.find((c) => c.key === picked).coach}</p>
                  <div className="coach-rate">
                    <button className="btn btn-sm">Not very useful</button>
                    <button className="btn btn-sm">Helpful</button>
                  </div>
                </div>
              )}

              {phase === 'inbox' && investigated && (
                <div className="coach-box">
                  <h5>CHECK THE DATA CLASSIFICATION</h5>
                  <p>The deck is labelled Internal-Confidential. Policy allows it in the enterprise AI workspace (SSO, zero-retention) — but never in personal free-tier tools.</p>
                </div>
              )}

              {phase === 'inbox' && (
                <div className="sim-actions">
                  <button className="btn" onClick={() => setInvestigated(true)}>
                    🔍 Investigate <span className="chip chip-amber" style={{ marginLeft: 6 }}>{investigated ? '1 left' : '2 left'}</span>
                  </button>
                  <button className="btn btn-primary" onClick={() => setPhase('reveal')}>
                    ✨ Submit my approach
                  </button>
                  <button className="btn">⏭ Skip</button>
                </div>
              )}
            </div>

            {phase === 'reveal' && (
              <div className="card">
                <h4 style={{ fontSize: 11, letterSpacing: 1.2, color: 'var(--green)', marginBottom: 12 }}>
                  LEVERAGE SIGNALS — TICK THE ONES YOU NOTICED
                </h4>
                {FLAGS.map((f) => (
                  <label key={f} className={`flag-item ${ticked.includes(f) ? 'ticked' : ''}`} style={ticked.includes(f) ? { borderColor: 'var(--green)', background: 'var(--green-soft)' } : {}}>
                    <input type="checkbox" checked={ticked.includes(f)} onChange={() => toggleFlag(f)} />
                    <span>✨ {f}</span>
                  </label>
                ))}
                <button className="btn btn-primary big-cta" style={{ background: 'var(--purple)', borderColor: 'var(--purple)', marginTop: 10 }} onClick={() => setPhase('persona')}>
                  View Report →
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

function Persona({ onNavigate }) {
  return (
    <div className="persona-quad">
      <h2 style={{ fontSize: 18 }}>Where you sit</h2>
      <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 6 }}>
        Based on your responses: speed of adoption vs. depth of judgment.
      </p>
      <div className="persona-grid">
        <div className="pq-cell" style={{ background: '#e2f6ee', color: '#0d5c40' }}><span>🦅</span>Eagle</div>
        <div className="pq-cell" style={{ background: '#fdf3d7', color: '#7a5205' }}><span>🐿️</span>Squirrel</div>
        <div className="pq-cell" style={{ background: '#e7ebfd', color: '#2f3d8f' }}><span>🐢</span>Tortoise</div>
        <div className="pq-cell" style={{ background: '#fdeaec', color: '#7c1e26' }}><span>🦁</span>Lion</div>
        <div className="pq-you" style={{ top: '38%', right: '12%' }}>YOU</div>
      </div>
      <div className="pq-axis"><span>Cautious adoption</span><span>Bold adoption</span></div>

      <div className="persona-result">
        <b>⚡ The Quick Adopter (you)</b>
        <p style={{ marginTop: 8, color: 'var(--ink-soft)' }}>
          You reach for AI fast — great for leverage, risky without a data check. You picked the right tool
          and spotted 3 of 4 leverage signals. Pair your speed with a two-second classification check and
          you move into Strategic Operator territory.
        </p>
        <p style={{ marginTop: 8, fontSize: 11.5, color: 'var(--ink-soft)' }}>
          Other personas: The Confident Builder · The Strategic Operator · The Steady Learner
        </p>
      </div>
      <div style={{ marginTop: 18, display: 'flex', gap: 10, justifyContent: 'center' }}>
        <button className="btn" onClick={() => onNavigate('amplifyverse')}>Back to the Amplifyverse</button>
        <button className="btn btn-primary" onClick={() => onNavigate('pulse')}>See team impact in AI Pulse</button>
      </div>
    </div>
  )
}
