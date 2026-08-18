import { useState } from 'react'

const STEPS = ['Details', 'Audience', 'Message', 'Review & Send']

export default function CommandCentre({ onNavigate, campaign }) {
  const [step, setStep] = useState(1)
  const [sent, setSent] = useState(false)
  const [audMode, setAudMode] = useState('Manual Entry')
  const [email, setEmail] = useState('caroline.vonkonigsmark@example.com')

  const title = campaign?.title || 'Agentic Workflow Fundamentals'

  if (sent) {
    return (
      <div className="light-shell">
        <Sidebar onNavigate={onNavigate} />
        <div className="content">
          <a style={{ fontSize: 12, color: 'var(--ink-soft)', cursor: 'pointer' }} onClick={() => setSent(false)}>← Back to Campaigns</a>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0 22px' }}>
            <h1>Training: {title} <span className="chip chip-green" style={{ verticalAlign: 'middle', marginLeft: 8 }}>Completed</span></h1>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-sm">Export CSV</button>
              <button className="btn btn-sm">Export JSON</button>
              <button className="btn btn-sm">⧉ Duplicate</button>
            </div>
          </div>

          <div className="tab-row">
            {['Overview', 'Audience', 'Message', 'Responses', 'Audit', 'Simulate'].map((t, i) => (
              <button key={t} className={i === 0 ? 'active' : ''}>{t}</button>
            ))}
          </div>

          <div className="stats-row">
            <div className="stat-card"><div className="num">1</div><div className="lbl">AUDIENCE</div></div>
            <div className="stat-card"><div className="num green">1</div><div className="lbl">DELIVERED</div></div>
            <div className="stat-card"><div className="num">0</div><div className="lbl">RESPONSES</div></div>
            <div className="stat-card"><div className="num">100%</div><div className="lbl">DELIVERY RATE</div></div>
            <div className="stat-card"><div className="num">0%</div><div className="lbl">RESPONSE RATE</div></div>
          </div>

          <div className="card" style={{ marginBottom: 16 }}>
            <h3 style={{ fontSize: 13.5, marginBottom: 14 }}>Delivery Status</h3>
            <div className="donut-wrap">
              <svg width="130" height="130" viewBox="0 0 130 130">
                <circle cx="65" cy="65" r="52" fill="none" stroke="#eef0f6" strokeWidth="16" />
                <circle cx="65" cy="65" r="52" fill="none" stroke="#17a673" strokeWidth="16"
                  strokeDasharray="82 245" strokeLinecap="round" transform="rotate(-90 65 65)" />
              </svg>
              <div style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>
                <span className="chip chip-green">● Delivered — 1</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize: 13.5, marginBottom: 14 }}>Campaign Info</h3>
            <div className="campaign-info-grid">
              <div>Created by: <b>caroline.vonkonigsmark@example.com</b></div>
              <div>Created: <b>22/06/2026, 5:36:34 pm</b></div>
              <div>Sent: <b>22/06/2026, 5:38:03 pm</b></div>
              <div>Completed: <b>22/06/2026, 5:38:04 pm</b></div>
              <div>Quiz: <b>No</b></div>
              <div>Channel: <b>Teams Chat (Amplify bot)</b></div>
            </div>
          </div>
          <div style={{ marginTop: 18 }}>
            <button className="btn btn-primary" onClick={() => onNavigate('teams')}>View delivery in Teams →</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="light-shell">
      <Sidebar onNavigate={onNavigate} />
      <div className="content" style={{ maxWidth: 860 }}>
        <a style={{ fontSize: 12, color: 'var(--ink-soft)', cursor: 'pointer' }}>← Back to Campaigns</a>
        <h1 style={{ margin: '10px 0 22px' }}>New Campaign</h1>

        <div className="wizard-steps">
          {STEPS.map((s, i) => (
            <div key={s} className={`wstep ${i < step ? 'done' : i === step ? 'current' : ''}`}>
              {i < step ? '✓ ' : ''}{s}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="card">
            <h3 style={{ fontSize: 16, marginBottom: 18 }}>Select Audience</h3>
            <div className="audience-tabs">
              {['Manual Entry', 'CSV Upload', 'Teams Channel', 'OoO / Group'].map((m) => (
                <button key={m} className={`btn btn-sm ${audMode === m ? 'btn-primary' : ''}`} onClick={() => setAudMode(m)}>{m}</button>
              ))}
            </div>
            <div className="field">
              <label>Email Addresses</label>
              <div className="hint">Type or paste emails. Press Enter or comma to add.</div>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="wizard-nav">
              <button className="btn" onClick={() => setStep(1)}>← Back</button>
              <button className="btn btn-primary" onClick={() => setStep(2)}>Next →</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="card">
            <h3 style={{ fontSize: 16, marginBottom: 6 }}>Compose Message</h3>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 14 }}>
              <span className="chip chip-grey">Quiz Mode ☐</span>
              <span className="chip chip-purple">WYSIWYG</span>
              <span className="chip chip-grey">Raw Markdown</span>
              <span style={{ flex: 1 }} />
              <button className="btn btn-sm">Preview</button>
            </div>
            <div className="compose-toolbar">
              {['B', 'I', 'S', '</>', '🔗', '{ }', '•', '😀'].map((t) => <span key={t}>{t}</span>)}
              <span style={{ flex: 1 }} />
              <span style={{ color: 'var(--accent)' }}>✦ Refine</span>
            </div>
            <div className="compose-body">
              🚀 <b>Think you could hand half your Monday to an AI agent?</b>
              <p style={{ marginTop: 10 }}>
                Agentic workflows let you delegate multi-step tasks — research, drafts, meeting prep — while
                you stay in the review seat.
              </p>
              <p style={{ marginTop: 10 }}>Put your delegation skills to the test and find out what you'd hand off first. 👇</p>
              <div className="compose-img">AGENTIC-WORKFLOWS — CAMPAIGN IMAGE</div>
            </div>
            <div style={{ display: 'flex', gap: 7, marginTop: 12 }}>
              {['+ Text', '+ Buttons', '+ Image', '+ Divider'].map((b) => <button key={b} className="btn btn-sm">{b}</button>)}
            </div>
            <div className="field" style={{ marginTop: 20 }}>
              <label>RESPONSE MESSAGES</label>
              <div className="hint">Configure the messages users receive after interacting with the campaign.</div>
              <input type="text" defaultValue="Thanks for your response!" />
            </div>
            <div className="wizard-nav">
              <button className="btn" onClick={() => setStep(1)}>← Back</button>
              <button className="btn btn-primary" onClick={() => setStep(3)}>Next →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="card">
            <h3 style={{ fontSize: 16, marginBottom: 18 }}>Review &amp; Send</h3>
            <div className="campaign-info-grid" style={{ marginBottom: 20 }}>
              <div>Campaign: <b>{title}</b></div>
              <div>Channel: <b>Teams Chat (Amplify bot)</b></div>
              <div>Audience: <b>{email}</b></div>
              <div>Quiz: <b>No</b></div>
            </div>
            <div className="wizard-nav">
              <button className="btn" onClick={() => setStep(2)}>← Back</button>
              <button className="btn btn-primary" onClick={() => setSent(true)}>🚀 Send Campaign</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Sidebar({ onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        <div className="sidebar-logo" style={{ background: 'radial-gradient(circle at 35% 30%, #ff9d5c, #d64550)' }}>🤖</div>
        <h2>Amplify</h2>
      </div>
      <div className="sidebar-sub">Command Centre</div>
      <div className="sidebar-section">NAVIGATION</div>
      <button className="sidebar-item active">📣 Campaigns</button>
      <button className="sidebar-item">💬 Chatbot</button>
      <button className="sidebar-item">⭐ Quiz &amp; Leaderboards</button>
      <button className="sidebar-item">ⓘ About</button>
      <button className="sidebar-item">‹/› Dev Guide</button>
      <div className="sidebar-footer">
        <div className="sidebar-section">PLATFORMS</div>
        <a onClick={() => onNavigate('orchestrator')}>› Scenario Orchestrator</a>
        <a onClick={() => onNavigate('teams')}>› Teams Delivery</a>
      </div>
    </aside>
  )
}
