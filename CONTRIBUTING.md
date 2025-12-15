# Contributing to Socket Chat App

Thanks for your interest in contributing! This document outlines how to propose changes and help improve the project.

## Ways to Contribute
- Report bugs and propose features via Issues
- Improve documentation (README, comments, examples)
- Submit code fixes and new features via Pull Requests

## Getting Started (Local Dev)
1) Fork this repo and clone your fork.
2) Create required env files as described in README.
3) Install and run each app:

Backend (ChatServer):
```powershell
cd "ChatServer"
npm install
npm run start
```

Frontend (client):
```powershell
cd "Frontend"
npm install
npm run dev
```

## Branching & Commits
- Create a feature branch from `main`:
  - `feat/<short-description>` for features
  - `fix/<short-description>` for bug fixes
  - `docs/<short-description>` for docs-only changes
  - `chore/<short-description>` for tooling/maintenance
- Prefer Conventional Commits in messages:
  - `feat: add message delivery receipts`
  - `fix: correct getMessages API path`
  - `docs: expand setup steps`

## Coding Standards
- Keep changes focused and minimal; avoid unrelated refactors.
- Frontend: run ESLint where available:
```powershell
cd "Frontend"
npm run lint
```
- Write clear, self-contained code and update docs when behavior changes.

## Pull Requests
- Describe the problem and how your change fixes it.
- Include screenshots or logs when UI/UX or runtime behavior changes.
- Reference related Issues (e.g., "Closes #123").
- Ensure both apps build/run locally without errors.

### PR Checklist
- [ ] Feature/bug is scoped and documented
- [ ] Env, config, or API changes are documented in README
- [ ] Frontend compiles and key flows are manually verified
- [ ] Backend starts and endpoints tested (where applicable)
- [ ] Linting passes (Frontend)

## Community Expectations
Be respectful and constructive. We value inclusive, collaborative discussions. Disagreements are fine—keep feedback specific and kind.
