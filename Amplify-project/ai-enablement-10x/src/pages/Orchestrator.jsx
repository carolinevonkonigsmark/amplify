import { useState } from 'react'

const SKILL_TYPES = ['All', 'Prompting', 'Agents', 'Data', 'Automation']
const POP_MODES = ['✦ AI Selected', '👥 By Persona', '🏢 By Group', '✕ Intersections']

export default function Orchestrator({ onNavigate, campaign, setCampaign }) {
  const [brief, setBrief] = useState('https://ai-blog.example.com/announcements/introducing-computer-use-agents-for-the-enterprise/')
  const [skillType, setSkillType] = useState('All')
  const [popMode, setPopMode] = useState('✦ AI Selected')
  const [formats, setFormats] = useState({ sim: true, teams: true })
  const [generating, setGenerating] = useState(false)
  const [resultTab, setResultTab] = useState('Results')

  const generate = () => {
    setGenerating(true)
    setTimeout(() => {
      setCampaign({
        title: 'Agentic Workflow Fundamentals',
        source: brief,
        emailPreview:
          'Your quarterly board summary is due at 5pm. The source doc is 40 pages and marked Internal-Confidential. How do you get it done…',
        simUrl: 'https://enablement-platform.example.com/modules/prompt-lab-dynamic?scenario_id=4d5a6be1-98a7-4a09-ad13-d6f1e5aeccf0',
        teamsMessage:
          '🚀 New AI skills scenario live: Agentic Workflows. Test your delegation skills at',
        inferred: ['Inferred: Agents', 'Inferred: Data Judgment'],
        recommended: ['⭐ Recommended', '🏆 Champions', '🔧 Frustrated', '🤨 Skeptical', '💤 Disengaged'],
      })
      setGenerating(false)
    }, 1600)
  }

  return (
    <div className="light-shell">
      <aside className="sidebar">
        <div className="sidebar-title">
          <div className="sidebar-logo">⚡</div>
          <h2>Orchestrator</h2>
        </div>
        <div className="sidebar-sub">AI Enablement</div>
        <div className="sidebar-section">TOOLS</div>
        <button className="sidebar-item active">✦ Generate Campaign</button>
        <button className="sidebar-item">🕓 History</button>
        <button className="sidebar-item">⚙ Settings</button>
        <div className="sidebar-footer">
          <div className="sidebar-section">PLATFORMS</div>
          <a onClick={() => onNavigate('amplifyverse')}>› Amplifyverse</a>
          <a onClick={() => onNavigate('pulse')}>› AI Pulse</a>
          <a onClick={() => onNavigate('catalog')}>› Module Catalog</a>
          <a onClick={() => onNavigate('command')}>› Amplify</a>
        </div>
      </aside>

      <div className="content" style={{ maxWidth: 1250 }}>
        <div className="orch-grid">
          <div>
            <h1>Generate Enablement Campaign</h1>
            <p className="content-sub">Paste a capability brief. AI builds the training.</p>

            <div className="card orch-step">
              <h4>1 — CAPABILITY BRIEF</h4>
              <textarea value={brief} onChange={(e) => setBrief(e.target.value)} />
              <div style={{ marginTop: 12 }}>
                <h4 style={{ marginBottom: 8 }}>SKILL FOCUS</h4>
                <div className="pill-row">
                  {SKILL_TYPES.map((r) => (
                    <button key={r} className={`filter-pill small ${skillType === r ? 'active' : ''}`} onClick={() => setSkillType(r)}>{r}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="card orch-step">
              <h4>2 — TARGET POPULATIONS</h4>
              <div className="pill-row" style={{ marginBottom: 12 }}>
                {POP_MODES.map((p) => (
                  <button key={p} className={`filter-pill small ${popMode === p ? 'active' : ''}`} onClick={() => setPopMode(p)}>{p}</button>
                ))}
              </div>
              {campaign ? (
                <div className="inferred-tags">
                  {campaign.inferred.map((t) => <span key={t} className="chip chip-purple">{t}</span>)}
                  {campaign.recommended.map((t) => <span key={t} className="chip chip-grey">{t}</span>)}
                </div>
              ) : (
                <p style={{ fontSize: 11.5, color: 'var(--ink-soft)' }}>
                  Type a brief or select a skill focus above.<br />
                  <em>No low-proficiency intersections found. Try a different skill focus or add a capability brief.</em>
                </p>
              )}
              <button className="btn btn-sm" style={{ marginTop: 10 }} onClick={() => onNavigate('pulse')}>🔍 Explore in AI Pulse</button>
            </div>

            <div className="card orch-step">
              <h4>3 — ENGAGEMENT FORMATS</h4>
              <label className={`format-opt ${formats.sim ? 'checked' : ''}`}>
                <input type="checkbox" checked={formats.sim} onChange={() => setFormats({ ...formats, sim: !formats.sim })} />
                <div>
                  <h5>🎯 Workflow Simulator</h5>
                  <p>Realistic prompt-lab scenario. Recipients get a shareable link.</p>
                </div>
              </label>
              <label className={`format-opt ${formats.teams ? 'checked' : ''}`}>
                <input type="checkbox" checked={formats.teams} onChange={() => setFormats({ ...formats, teams: !formats.teams })} />
                <div>
                  <h5>💬 Amplify Teams Blast</h5>
                  <p>Announcement message drafted for the Amplify Teams bot.</p>
                </div>
              </label>
              <button className="btn btn-primary big-cta" onClick={generate} disabled={generating}>
                {generating ? (<><span className="spin" />Synthesizing campaign…</>) : '✦ Generate'}
              </button>
            </div>
          </div>

          <div>
            <div className="tab-row">
              {['Results', 'History', 'Settings'].map((t) => (
                <button key={t} className={resultTab === t ? 'active' : ''} onClick={() => setResultTab(t)}>{t}</button>
              ))}
            </div>

            {resultTab === 'Results' && !campaign && (
              <div className="card">
                <div className="empty-state">
                  <div className="es-icon">📄</div>
                  No campaign generated yet<br />
                  <span style={{ fontSize: 11.5 }}>Fill in a capability brief and click Generate.</span>
                </div>
              </div>
            )}

            {resultTab === 'Results' && campaign && (
              <>
                <div className="card gen-result">
                  <div className="gen-result-head">
                    <h4><span className="status-dot" /> WORKFLOW SIMULATOR</h4>
                    <span className="chip chip-grey">Email – Prompt Lab</span>
                  </div>
                  <b style={{ fontSize: 13.5 }}>{campaign.title}</b>
                  <div className="gen-quote">{campaign.emailPreview}</div>
                  <div className="gen-url">
                    <code>{campaign.simUrl}</code>
                    <button className="btn btn-sm">Copy</button>
                  </div>
                  <button className="btn btn-primary big-cta" onClick={() => onNavigate('cipher')}>Open Simulation</button>
                </div>

                <div className="card gen-result">
                  <div className="gen-result-head">
                    <h4><span className="status-dot" /> AMPLIFY TEAMS BLAST</h4>
                    <span className="chip chip-grey">Teams Chat Campaign</span>
                  </div>
                  <div style={{ fontSize: 10.5, letterSpacing: 1, color: 'var(--ink-soft)', marginBottom: 8 }}>GENERATED MESSAGE</div>
                  <div className="gen-quote" style={{ fontStyle: 'normal' }}>
                    {campaign.teamsMessage} {campaign.simUrl}
                  </div>
                  <button className="btn btn-primary big-cta" onClick={() => onNavigate('command')}>Open in Amplify</button>
                  <button className="btn big-cta">Copy Message</button>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <button className="btn btn-sm" onClick={() => setCampaign(null)}>Generate another scenario</button>
                </div>
              </>
            )}

            {resultTab !== 'Results' && (
              <div className="card"><div className="empty-state">Nothing here yet in this demo.</div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
