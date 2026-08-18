export default function Landing({ onNavigate }) {
  return (
    <div className="landing">
      <h1>Amplify</h1>
      <div className="landing-kicker">PLATFORM ARCHITECTURE</div>

      <div className="signal-row">
        {['Microsoft Copilot', 'Claude Enterprise', 'Gemini', 'Workday'].map((s) => (
          <div className="signal-pill" key={s}>{s}</div>
        ))}
      </div>

      <div className="landing-hint" style={{ marginTop: -30, marginBottom: 44 }}>
        connected signal sources — usage telemetry feeds the AI Pulse below
      </div>

      <div className="layer-row">
        <div className="layer-card pulse-card" onClick={() => onNavigate('amplifyverse')}>
          <div className="layer-icon">🖥️</div>
          <h3>Frontend</h3>
          <div className="layer-tag">LMS INTERFACE</div>
          <p>The interface employees interact with for learning and experiences — the Amplifyverse, delivered through Microsoft Teams and the web.</p>
        </div>
        <div className="layer-card" onClick={() => onNavigate('orchestrator')}>
          <div className="layer-icon">⚙️</div>
          <h3>Backend</h3>
          <div className="layer-tag">BUSINESS LOGIC</div>
          <p>Handles business logic, data, and orchestrates all platform services — the Scenario Orchestrator and Command Centre run here.</p>
        </div>
        <div className="layer-card" onClick={() => onNavigate('cipher')}>
          <div className="layer-icon">🧠</div>
          <h3>AI Layer</h3>
          <div className="layer-tag">CONTENT GENERATION</div>
          <p>Embedded within the backend; responsible for generating learning content, scenarios, and dynamic material served to learners.</p>
        </div>
      </div>

      <div className="arch-flow">
        <span className="arch-node">Backend</span>
        <span className="arch-arrow">→</span>
        <span className="arch-node arch-node-accent">LiteLLM<small>unified API gateway</small></span>
        <span className="arch-arrow">→</span>
        <span className="arch-node">Claude Sonnet<small>content generation</small></span>
      </div>
      <div className="landing-hint" style={{ marginTop: 10 }}>
        model-agnostic by design — the model can be swapped or extended without touching backend logic
      </div>

      <div className="landing-hint" style={{ marginTop: 30 }}>Click a layer to explore · All data shown is synthetic demo data</div>
    </div>
  )
}
