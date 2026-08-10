# Contributing to Atlas Watchtower

Thank you for your interest in contributing! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Code Style](#code-style)

---

## Code of Conduct

Be respectful, constructive, and inclusive. We do not tolerate harassment, discrimination, or personal attacks.

---

## Getting Started

```bash
git clone https://github.com/meet-the-1337/AtlasWatchtower.git
cd AtlasWatchtower
npm install
cp .env.example .env
npm run dev
```

---

## Development Workflow

1. **Fork** the repository
2. **Create a branch**: `git checkout -b feat/your-feature-name`
3. **Make changes** and test with `npm run dev`
4. **Type check**: `npm run typecheck`
5. **Commit** using conventional commit format
6. **Push** and open a Pull Request

---

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Use For |
|---|---|
| `feat:` | New features |
| `fix:` | Bug fixes |
| `perf:` | Performance improvements |
| `refactor:` | Code restructuring |
| `docs:` | Documentation updates |
| `chore:` | Build, CI, dependency updates |

---

## Pull Request Process

1. Ensure `npm run typecheck` passes
2. Update docs if adding features or env variables
3. Keep PRs focused — one feature or fix per PR
4. Fill out the PR template completely

---

## Reporting Bugs

Use the [Bug Report template](https://github.com/meet-the-1337/AtlasWatchtower/issues/new?template=bug_report.yml) and include:
- Browser/OS version
- Steps to reproduce
- Expected vs actual behavior
- Console errors and screenshots

---

## Code Style

- **TypeScript** strict mode, 2-space indent, single quotes, semicolons
- No `any` — use proper types
- Preserve existing comments, add JSDoc for public methods

---

## Adding a New Data Source

1. Create `src/services/your-source.ts` and export from `src/services/index.ts`
2. Add server handler in `server/worldmonitor/your-domain/v1/`
3. Define types in `src/types/index.ts`
4. Add map layer in `DeckGLMap.ts` or panel in `src/components/`
5. Register in `src/config/panels.ts`
6. Document env variables in `.env.example`

---

Thank you for helping make Atlas Watchtower better! 🌍
