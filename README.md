# Project Manager

**Web-based Project Management Dashboard**

[![CI](https://github.com/joergmichno/project-manager/actions/workflows/ci.yml/badge.svg)](https://github.com/joergmichno/project-manager/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://project-manager-five-olive.vercel.app/)

A modern project management dashboard for freelancers and small teams. Features a Kanban board with drag-and-drop, Gantt chart planner, budget tracking, early warning system, and a glassmorphism dark-mode UI.

**[Live Demo →](https://project-manager-five-olive.vercel.app/)**

---

## Features

### Dashboard
- **KPI Cards** — Active projects, task completion rate, budget consumption, team status
- **Project Overview** — All projects with progress bars, budgets, and team avatars
- **Activity Chart** — Weekly task and hours visualization
- **Early Warning System** — Automatic alerts for deadline risks, budget overruns, and team overload

### Kanban Board
- **Drag & Drop** — Move tasks between columns: Open → In Progress → In Review → Done
- **Priority Labels** — Critical, High, Medium, Low with color coding
- **Inline Task Creation** — Add new tasks directly from the board

### Gantt Planner
- **Timeline Visualization** — Tasks plotted on a day/week/month timeline
- **Task Dependencies** — See which tasks block others
- **Team Assignment** — Who's working on what, and when

### Team Management
- **Member Profiles** — Roles, skills, contact info, online status
- **Workload Overview** — Tasks and projects per team member
- **Skill Tags** — Technology badges per team member (React, Python, Docker, etc.)

### Additional Features
- **Global Search** — Search across all tasks and projects
- **Notifications** — Real-time alerts for project events
- **Responsive Design** — Works on desktop, tablet, and mobile
- **Dark Theme** — Glassmorphism UI with blur effects and gradients

## Screenshots

> **[See the live demo →](https://project-manager-five-olive.vercel.app/)**

| View | Description |
|------|-------------|
| **Dashboard** | KPI cards, project overview, activity chart, team status, Kanban preview |
| **Aufgaben** | Full task list with project, status, priority, assignee, and deadline columns |
| **Gantt-Planer** | Timeline view with day/week/month toggle, task bars with team assignment |
| **Team** | Member cards with avatars, roles, skills, online status, and workload stats |
| **Projekte** | Project cards with progress, budget tracking, milestones, and task counts |
| **Berichte** | Analytics dashboards with charts and KPIs |

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI Library | React 19 |
| Styling | Tailwind CSS 4 |
| State Management | React Context API |
| Deployment | Vercel (CI/CD via GitHub Actions) |
| Language | JavaScript (ES2022+) |

## Architecture

```
src/app/
├── page.js              # Dashboard + view routing
├── layout.js            # Root layout with metadata
├── globals.css          # Tailwind config + custom properties + glassmorphism
├── context.js           # AppProvider — centralized state management
├── data.js              # Demo data (projects, tasks, team members)
└── components/
    ├── Sidebar.js       # Collapsible navigation with icons
    ├── StatsCard.js     # KPI cards with trends
    ├── ProjectCard.js   # Project tiles with progress + budget
    ├── ActivityChart.js # Weekly activity bar chart (CSS-only)
    ├── KanbanBoard.js   # Drag-and-drop Kanban with 4 columns
    ├── GanttChart.js    # Timeline planner with day/week/month views
    ├── Pages.js         # Sub-views (Projects, Team, Reports, Settings)
    └── Modals.js        # CRUD dialogs + notification panel
```

### Design Decisions

- **No external UI library** — All components built from scratch with Tailwind CSS for full control
- **Context API over Redux** — Sufficient for this app's complexity, avoids unnecessary dependencies
- **CSS-only charts** — Activity chart and progress bars use pure CSS, no charting library needed
- **Single-page routing** — All views managed via React state, no page reloads
- **Demo data** — Realistic project management data included for immediate demonstration

## Quick Start

```bash
git clone https://github.com/joergmichno/project-manager.git
cd project-manager
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Why I Built This

Originally started as my IHK final project (Fachinformatiker für Anwendungsentwicklung), this dashboard has evolved into a full-featured project management tool. It demonstrates:

- Modern frontend architecture with React 19 + Next.js 16
- Component-based design with centralized state management
- Responsive glassmorphism UI/UX with Tailwind CSS 4
- Production deployment with CI/CD on Vercel

## Related Projects

- **[ClawGuard](https://github.com/joergmichno/clawguard)** — Security scanner for AI agents (38+ patterns, 53 tests)
- **[ClawGuard Shield](https://github.com/joergmichno/clawguard-shield)** — Security scanning REST API ([Live API](https://prompttools.co/api/v1/))
- **[Prompt Lab](https://github.com/joergmichno/prompt-lab)** — Interactive prompt injection playground ([Live Demo](https://prompttools.co))
- **[DocQA](https://github.com/joergmichno/docqa)** — RAG-based document Q&A tool

## License

MIT License — see [LICENSE](LICENSE) for details.

---

Built by [Jörg Michno](https://github.com/joergmichno)
