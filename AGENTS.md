# NuevasTecnologias · Agent Context

> Operational context and rules for AI agents working in this repository.

---

## Project Overview

**NuevasTecnologias** is the course repository for the "Nuevas Tecnologías de Desarrollo" (NTD) course at Fundación Universitaria Konrad Lorenz. It contains individual workshop exercises by Brian Vargas (branch `13rian`).

The team also uses this repo — Lina Bello, Brian Vargas, Sebastián Angulo — but this branch (`13rian`) contains only Brian's individual exercises.

**AlMargen** is the team's final project for this course (very early stage, 1% progress). It lives in a separate repo or branch.

---

## Repository Structure

```text
NuevasTecnologias/   (branch: 13rian — Brian's individual work)
├── 01-Introduction-HTML-&-CSS/   # Workshop 1: HTML & CSS basics
├── 02-CSS-&-JS/                  # Workshop 2: CSS and JavaScript
├── 03-Taller-3/                  # Workshop 3
├── 04-API-Zoologico/             # Workshop 4: Zoo API (Node.js + JWT)
│   ├── index.html
│   ├── models/
│   └── package.json
├── 05-Web-Zoologico/             # Workshop 5: Zoo web client
├── CONTRIBUTING.md
└── README.md
```

Each workshop is a standalone exercise in its own directory.

---

## Tech Stack (workshop-dependent)

- Workshops 1–3: HTML, CSS, JavaScript (static)
- Workshop 4: Node.js, JWT (`jsonwebtoken`)
- Workshop 5: HTML/CSS/JS web client

---

## Dev Commands (Workshop 4 example)

```bash
cd 04-API-Zoologico
pnpm install         # or npm install
node index.js        # start server
```

Always read the workshop directory's own `README.md` or `package.json` before running commands.

---

## Branch Convention

- `main`: course documentation only (README).
- `13rian`: Brian's individual exercises.
- `Taller1`, `Taller2`, ...: per-workshop team branches.
- `NameSurname` branches: per-member work during team assignments.

---

## Conventions

- Each workshop is independent — do not cross-import between them.
- Code may mix Spanish and English depending on professor requirements.
- Commits: Conventional Commits, English, lowercase.
  ```
  feat: add zoo api jwt authentication
  fix: resolve cors header in workshop 4
  ```

---

## AI Agent Instructions

- Read the target workshop directory's files before making changes.
- Do not modify other workshops when working on one.
- Do not assume shared packages between workshops — each may have its own `package.json`.
- This is academic work. Do not introduce production-level complexity unless the assignment requires it.
- No automatic commits. Present changes for review first.


---

## Temporary Files

- `tmp/` is gitignored. Store one-off scripts and throwaway files there.
- Delete after use. Never commit anything from `tmp/`.