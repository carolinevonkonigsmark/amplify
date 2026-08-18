# Amplify — Demo

A clickable prototype of an AI enablement / proficiency platform. All data is synthetic mock data;
no proprietary information, branding, or customer data is included.

## What's inside

- **Overview** — signal-consolidation architecture: AI usage telemetry feeding three layers (ML, LLM, GenAI)
- **AI Pulse** — proficiency dashboard: adoption-drivers scatter (Champions / Frustrated / Skeptical / Disengaged) and a dynamic proficiency matrix (team / location / seniority × skill vector)
- **Module Catalog** — admin view of enablement modules and collections
- **Scenario Orchestrator** — paste a capability announcement → AI generates a workflow simulation + Teams campaign
- **Amplify Command Centre** — campaign wizard (details → audience → message → review/send) with a results dashboard
- **Teams Delivery** — mock Microsoft Teams chat showing the bot-delivered campaign
- **Prompt Lab** — live workflow simulation: inbox scenario, response choices with coaching, leverage-moment reveal, signal checklist, AI-persona report
- **The Amplifyverse** — gamified learner portal with a galaxy map, XP, missions, and an unvetted-AI-vendor simulation

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

To build for production: `npm run build` — output lands in `dist/`.

## Stack

React 18 + Vite. No other runtime dependencies; charts are hand-rolled SVG, styling is plain CSS.
