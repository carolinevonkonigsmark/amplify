import { useState } from 'react'

const CONTEXTS = [
  { icon: '📈', title: 'Overall Proficiency', desc: 'Aggregated usage telemetry across all skill vectors.' },
  { icon: '✍️', title: 'Prompt Engineering', desc: 'Structured prompting, context setting, iteration habits.' },
  { icon: '🤖', title: 'Agentic Workflows', desc: 'Delegating multi-step tasks to agents with review loops.' },
  { icon: '🗂️', title: 'Data Judgment', desc: 'Knowing which data can go into which tool; approved workspaces.' },
  { icon: '⚡', title: 'Shadow AI', desc: 'Unsanctioned tool usage — an enablement opportunity, not just a risk.' },
]

const QUADRANTS = [
  { dot: '#17a673', name: 'Champions (High Mot, High Skill)', desc: 'AI power users. Give them frontier tools and let them evangelize.' },
  { dot: '#d99a06', name: 'Rising (High Mot, Low Skill)', desc: 'Eager and motivated — just need the right templates and hands-on support to convert fast.' },
  { dot: '#e2762d', name: 'Untapped (Low Mot, High Skill)', desc: 'Already capable. A peer win or a clear ROI story usually flips this group quickly.' },
  { dot: '#4d7ee0', name: 'Getting Started (Low Mot, Low Skill)', desc: 'Earliest in the journey. Small wins and guided first steps close this gap fast.' },
]

// scatter points: [skill, motivation, quadrant color, team]
const POINTS = [
  [78, 88, '#17a673', 'Engineering'], [84, 81, '#17a673', 'TDI'], [68, 74, '#17a673', 'Marketing'],
  [30, 79, '#d99a06', 'Finance'], [24, 68, '#d99a06', 'HR'], [38, 84, '#d99a06', 'Sales'],
  [76, 30, '#e2762d', 'Security'], [82, 22, '#e2762d', 'Legal'],
  [26, 24, '#4d7ee0', 'Field Ops'], [34, 18, '#4d7ee0', 'Contractors'],
]

const VECTORS = ['Prompting', 'Agent Use', 'Data Judgment', 'Automation']

const MATRIX = {
  Team: [
    ['Engineering', 78, [82, 74, 79, 76]],
    ['TDI', 74, [79, 71, 75, 72]],
    ['Marketing', 66, [74, 58, 62, 68]],
    ['Finance', 48, [55, 38, 61, 39]],
    ['Sales', 44, [52, 33, 48, 41]],
    ['HR', 42, [49, 31, 56, 33]],
    ['Legal', 35, [41, 22, 58, 20]],
  ],
  Location: [
    ['US', 61, [67, 54, 63, 58]],
    ['India', 63, [68, 58, 62, 63]],
    ['Canada', 58, [64, 51, 61, 55]],
    ['Australia', 56, [62, 49, 59, 53]],
    ['Romania', 59, [64, 53, 60, 58]],
    ['UK', 60, [66, 52, 63, 57]],
    ['Ireland', 57, [63, 50, 60, 54]],
    ['Philippines', 55, [61, 48, 58, 52]],
    ['Spain', 54, [60, 46, 58, 51]],
    ['Japan', 49, [56, 40, 55, 44]],
  ],
  Seniority: [
    ['Executive', 44, [52, 33, 56, 34]],
    ['Director', 52, [59, 44, 58, 46]],
    ['Manager', 57, [63, 50, 60, 54]],
    ['IC — Senior', 66, [71, 61, 65, 66]],
    ['IC — Junior', 71, [77, 66, 63, 74]],
    ['Contractor', 41, [48, 31, 49, 35]],
  ],
}

// proficiency: higher is better
function heatColor(v) {
  if (v >= 75) return { background: '#dff3e9', color: '#0d5c40' }
  if (v >= 60) return { background: '#e9f2d4', color: '#4a5c0d' }
  if (v >= 45) return { background: '#fbe9c2', color: '#7a5205' }
  if (v >= 30) return { background: '#f9d7c0', color: '#7d3a10' }
  return { background: '#f6c3c8', color: '#7c1e26' }
}

function Scatter() {
  const W = 520, H = 360, PAD = 44
  const x = (v) => PAD + (v / 100) * (W - PAD - 16)
  const y = (v) => H - PAD - (v / 100) * (H - PAD - 16)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%' }}>
      {/* quadrant tints */}
      <rect x={x(0)} y={y(100)} width={(x(50) - x(0))} height={y(50) - y(100)} fill="#d99a06" opacity="0.07" />
      <rect x={x(50)} y={y(100)} width={(x(100) - x(50))} height={y(50) - y(100)} fill="#17a673" opacity="0.07" />
      <rect x={x(0)} y={y(50)} width={(x(50) - x(0))} height={y(0) - y(50)} fill="#4d7ee0" opacity="0.07" />
      <rect x={x(50)} y={y(50)} width={(x(100) - x(50))} height={y(0) - y(50)} fill="#e2762d" opacity="0.07" />
      <text x={x(25)} y={y(76)} textAnchor="middle" fontSize="15" fontWeight="800" fill="#d99a06" opacity="0.4">RISING</text>
      <text x={x(75)} y={y(76)} textAnchor="middle" fontSize="15" fontWeight="800" fill="#17a673" opacity="0.4">CHAMPIONS</text>
      <text x={x(25)} y={y(24)} textAnchor="middle" fontSize="14" fontWeight="800" fill="#4d7ee0" opacity="0.45">GETTING STARTED</text>
      <text x={x(75)} y={y(24)} textAnchor="middle" fontSize="15" fontWeight="800" fill="#e2762d" opacity="0.4">UNTAPPED</text>
      {/* axes */}
      <line x1={x(0)} y1={y(0)} x2={x(100)} y2={y(0)} stroke="#c8cde0" />
      <line x1={x(0)} y1={y(0)} x2={x(0)} y2={y(100)} stroke="#c8cde0" />
      {[0, 25, 50, 75, 100].map((t) => (
        <g key={t}>
          <text x={x(t)} y={H - PAD + 16} textAnchor="middle" fontSize="9" fill="#5a6178">{t}</text>
          <text x={PAD - 8} y={y(t) + 3} textAnchor="end" fontSize="9" fill="#5a6178">{t}</text>
        </g>
      ))}
      {/* diagonal frontier */}
      <line x1={x(2)} y1={y(98)} x2={x(98)} y2={y(2)} stroke="#5a6178" strokeDasharray="5 4" opacity="0.5" />
      {/* points */}
      {POINTS.map(([a, m, c, team], i) => (
        <g key={i}>
          <circle cx={x(a)} cy={y(m)} r="6" fill={c} opacity="0.9">
            <title>{team} — skill {a}, motivation {m}</title>
          </circle>
        </g>
      ))}
      <text x={W / 2} y={H - 8} textAnchor="middle" fontSize="10" fill="#5a6178">Skill (Tools, Training, Fluency) →</text>
      <text x={13} y={H / 2} textAnchor="middle" fontSize="10" fill="#5a6178" transform={`rotate(-90 13 ${H / 2})`}>Motivation (Curiosity, Buy-in) →</text>
    </svg>
  )
}

export default function SecurityPulse() {
  const [context, setContext] = useState(0)
  const [tab, setTab] = useState('map')
  const [axis, setAxis] = useState('Team')
  const [popTab, setPopTab] = useState('Team')

  return (
    <div className="light-shell">
      <aside className="sidebar">
        <div className="sidebar-title">
          <div className="sidebar-logo">AP</div>
          <h2>AI Pulse</h2>
        </div>
        <div className="sidebar-sub">AI Proficiency Dashboard</div>
        <div className="sidebar-section">VIEWS</div>
        <button className={`sidebar-item ${tab === 'map' ? 'active' : ''}`} onClick={() => setTab('map')}>Adoption Mapping</button>
        <button className={`sidebar-item ${tab === 'matrix' ? 'active' : ''}`} onClick={() => setTab('matrix')}>Proficiency Matrix</button>
        <div className="sidebar-footer">
          <div className="sidebar-section">PLATFORMS</div>
          <a>› Amplifyverse</a>
          <a>› Scenario Orchestrator</a>
          <a>› Amplify</a>
        </div>
      </aside>

      <div className="content">
        <div className="sidebar-section" style={{ marginTop: 0 }}>▼ DASHBOARD SKILL CONTEXT</div>
        <div className="context-row">
          {CONTEXTS.map((c, i) => (
            <button key={c.title} className={`context-card ${context === i ? 'selected' : ''}`} onClick={() => setContext(i)}>
              <span className="cc-icon">{c.icon}</span>
              <h4>{c.title}</h4>
              <p>{c.desc}</p>
            </button>
          ))}
        </div>

        <div className="tab-row">
          <button className={tab === 'map' ? 'active' : ''} onClick={() => setTab('map')}>Adoption Mapping</button>
          <button className={tab === 'matrix' ? 'active' : ''} onClick={() => setTab('matrix')}>Proficiency Matrix</button>
        </div>

        {tab === 'map' && (
          <div className="pulse-grid">
            <div className="card">
              <div className="scatter-head">
                <h3>📊 Adoption Drivers Assessment</h3>
                <div className="seg">
                  {['Team', 'Location', 'Seniority'].map((t) => (
                    <button key={t} className={popTab === t ? 'active' : ''} onClick={() => setPopTab(t)}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="scatter-sub">Mapping populations to understand why AI adoption stalls — or takes off.</div>
              <Scatter />
            </div>
            <div>
              <div className="card">
                <h3 style={{ fontSize: 13, marginBottom: 14 }}>Adoption Quadrants</h3>
                <div className="quad-legend">
                  {QUADRANTS.map((q) => (
                    <div className="quad-item" key={q.name}>
                      <span className="quad-dot" style={{ background: q.dot }} />
                      <span><b>{q.name}</b><br />{q.desc}</span>
                    </div>
                  ))}
                </div>
                <div className="analyst-note">
                  <h5>⚡ ANALYST INTERPRETATION ({popTab.toUpperCase()})</h5>
                  Analyzing adoption by {popTab} highlights structural enablement gaps. A cluster in the
                  'Rising' quadrant usually means a team is motivated but lacks workflow-specific templates and
                  training — not a motivation problem, a support problem.
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'matrix' && (
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontSize: 14.5 }}>📍 Dynamic Proficiency Matrix</h3>
                <div className="scatter-sub">Cross-reference AI proficiency scores (0–100, higher is better) across dimensions.</div>
              </div>
              <div className="matrix-controls">
                <label>Y-AXIS</label>
                <select value={axis} onChange={(e) => setAxis(e.target.value)}>
                  {Object.keys(MATRIX).map((k) => <option key={k}>{k}</option>)}
                </select>
                <label>X-AXIS</label>
                <select defaultValue="Skill Vector"><option>Skill Vector</option></select>
              </div>
            </div>
            <table className="matrix">
              <thead>
                <tr>
                  <th className="rowhead">{axis} vs Skill Vector</th>
                  {VECTORS.map((v) => <th key={v}>{v}</th>)}
                </tr>
              </thead>
              <tbody>
                {MATRIX[axis].map(([name, avg, vals]) => (
                  <tr key={name}>
                    <td className="rowlabel">{name}<span>Avg {avg}</span></td>
                    {vals.map((v, i) => (
                      <td key={i}><span className="heat" style={heatColor(v)}>{v}</span></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
