# AGENTS.md

## Cursor Cloud specific instructions

This is a client-side-only React SPA (BTS Quiz app) built with Vite, TypeScript, React 19, and Tailwind CSS 3. There is no backend, no database, and no Docker dependency.

### Key commands

| Action | Command |
|--------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (Vite, serves on port 5173) |
| Lint | `npm run lint` (ESLint) |
| Type-check | `npx tsc -b` |
| Build | `npm run build` (tsc + vite build) |
| Preview prod build | `npm run preview` |

### Notes

- The dev server supports `--host 0.0.0.0` for network access: `npm run dev -- --host 0.0.0.0`.
- There is one pre-existing ESLint error in `src/components/ResultsScreen.tsx` (`react-hooks/set-state-in-effect`). This is not a blocker for development.
- All quiz data is hardcoded in `src/data/questions.ts`; no API calls are needed.
- Quiz history is stored in browser `localStorage`.
