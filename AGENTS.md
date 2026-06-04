# AGENTS.md

## Cursor Cloud specific instructions

### Product overview

Single-page **BTS Quiz** app (`bts-quiz`): React 19 + TypeScript + Vite 8 + Tailwind. All quiz data and history live in the browser (`localStorage`). No backend, database, or Docker services.

### Services

| Service | Command | URL / notes |
|---------|---------|-------------|
| Dev server (required) | `npm run dev` | Default http://127.0.0.1:5173 — use `--host 127.0.0.1` if binding matters in the VM |
| Production preview (optional) | `npm run build` then `npm run preview` | Serves `dist/` |

Optional network: Google Fonts, Spotify embed on home, external ARMY links — core quiz works offline.

### Standard commands

See `package.json` scripts and root `README.md` (mostly Vite template). From repo root:

- **Install deps:** `npm install` (lockfile: `package-lock.json`)
- **Lint:** `npm run lint` (`eslint .`) — may report a pre-existing `react-hooks/set-state-in-effect` error in `src/components/ResultsScreen.tsx`
- **Build:** `npm run build` (`tsc -b && vite build`)
- **Tests:** none configured (no test script or runner)

### Dev server in tmux

For long-running dev, use a named tmux session (e.g. `vite-dev-server`) with `tmux -f /exec-daemon/tmux.portal.conf` per Cloud Agent shell rules.

### Hello-world E2E check

Open the dev URL → start **Quick Quiz (5)** → answer questions → confirm results screen and optional theme toggle.
