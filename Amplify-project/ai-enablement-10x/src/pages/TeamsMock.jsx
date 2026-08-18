const CHANNELS = [
  'ai-exchange', 'ai-edge-weekly', 'amplify-testing', 'ai-champions',
  'ai-enablement-priv…', 'ai-office-hours', 'ai-apj',
  'agent-playbooks', 'ai-partners-lea…', 'ai-sessions-res…',
]

export default function TeamsMock({ onNavigate, campaign }) {
  const msg = campaign?.teamsMessage ||
    '🚀 New AI skills scenario live: Agentic Workflows. Test your delegation skills at'

  return (
    <div className="teams">
      <div className="teams-rail">
        <div className="rail-logo">◍</div>
        <div className="rail-item"><span className="ri-icon">🔔</span>Activity</div>
        <div className="rail-item active"><span className="ri-icon">💬</span>Chat</div>
        <div className="rail-item"><span className="ri-icon">👥</span>Teams</div>
        <div className="rail-item"><span className="ri-icon">📅</span>Calendar</div>
        <div className="rail-item"><span className="ri-icon">📁</span>Files</div>
        <div className="rail-item"><span className="ri-icon">⋯</span>More</div>
      </div>

      <div className="teams-sidebar">
        <div className="teams-ws">Chat</div>
        <div className="teams-section">▾ Pinned</div>
        <div className="teams-chan active">🤖 Amplify</div>
        <div className="teams-section">▾ Recent</div>
        <div className="teams-chan">👤 Priya Ramaswami</div>
        <div className="teams-chan">👤 Daniel Osei</div>
        <div className="teams-chan">👤 Freya Lindqvist</div>
        <div className="teams-section">▾ Teams</div>
        {CHANNELS.map((c) => (
          <div className="teams-chan" key={c}># {c}</div>
        ))}
      </div>

      <div className="teams-main">
        <div className="teams-header">
          <span className="teams-avatar" style={{ width: 26, height: 26, fontSize: 15, borderRadius: '50%' }}>🤖</span>
          Amplify <span className="teams-app-badge">APP</span>
          <span style={{ fontWeight: 400, fontSize: 12.5, color: '#8a8886', marginLeft: 8 }}>Chat · Files · Organization</span>
        </div>

        <div className="teams-msgs">
          <div className="teams-day"><span>Today</span></div>
          <div className="teams-msg">
            <div className="teams-avatar">🤖</div>
            <div>
              <div className="teams-msg-head">
                <b>Amplify</b>
                <span className="teams-app-badge">APP</span>
                <span className="teams-time">5:38 PM</span>
              </div>
              <div className="teams-bubble">
                🚀 <b>Think you could hand half your Monday to an AI agent?</b>
                <br /><br />
                Agentic workflows let you delegate multi-step tasks — research, drafts, meeting prep —
                while you stay in the review seat.
                <br /><br />
                Put your delegation skills to the test and find out what you'd hand off first. 👇
                <br /><br />
                <a onClick={() => onNavigate('cipher')}>Take the simulation now</a>
                <div style={{ fontSize: 11, color: '#8a8886', marginTop: 8 }}>(351 kB) ▾</div>
                <div className="teams-img">AGENTIC-WORKFLOWS — CAMPAIGN IMAGE</div>
              </div>
            </div>
          </div>
        </div>

        <div className="teams-composer">Type a new message</div>
      </div>
    </div>
  )
}
