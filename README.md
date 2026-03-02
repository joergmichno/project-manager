# 📊 Project Manager

**Webbasiertes Projektmanagement-Dashboard**

[![CI](https://github.com/joergmichno/project-manager/actions/workflows/ci.yml/badge.svg)](https://github.com/joergmichno/project-manager/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://project-manager-five-olive.vercel.app/)

Ein modernes Projektmanagement-Dashboard für Freelancer und kleine Teams. Ursprünglich als IHK-Abschlussprojekt begonnen, inzwischen stetig weiterentwickelt mit neuen Features.

**[Live Demo →](https://project-manager-five-olive.vercel.app/)**

---

## Features

- **Dashboard** — Übersicht mit Stats, aktiven Projekten, Aktivitäts-Chart und Team-Status
- **Kanban Board** — Drag-&-Drop Aufgabenverwaltung (Offen → In Bearbeitung → In Prüfung → Erledigt)
- **Projektverwaltung** — CRUD für Projekte mit Budget-Tracking, Meilensteinen und Fortschrittsanzeige
- **Teamverwaltung** — Mitglieder mit Rollen, Skills, Kontaktdaten und Auslastungs-Übersicht
- **Gantt-Planer** — Zeitliche Visualisierung von Aufgaben und Deadlines
- **Frühwarnsystem** — Automatische Warnungen bei Deadline-Risiken, Budget-Überschreitungen und Team-Überlastung
- **Benachrichtigungen** — Echtzeit-Notifications für Projekt-Events
- **Suche** — Globale Suche über alle Aufgaben und Projekte
- **Responsive Design** — Dark-Theme mit glassmorphism UI-Elementen

## Tech Stack

| Kategorie | Technologie |
|-----------|-------------|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Styling | Tailwind CSS 4 |
| State | React Context API |
| Deployment | Vercel (CI/CD) |
| Sprache | JavaScript (ES2022+) |

## Projektstruktur

```
project-manager/
├── src/app/
│   ├── page.js              # Dashboard + Detail Views
│   ├── layout.js            # Root Layout mit Metadata
│   ├── globals.css           # Tailwind + Custom Properties
│   ├── context.js           # AppProvider (State Management)
│   ├── data.js              # Demo-Daten (Projekte, Tasks, Team)
│   └── components/
│       ├── Sidebar.js       # Navigation (collapsible)
│       ├── StatsCard.js     # KPI-Karten
│       ├── ProjectCard.js   # Projekt-Kacheln
│       ├── ActivityChart.js # Wochenaktivitäts-Chart
│       ├── KanbanBoard.js   # Kanban mit Drag & Drop
│       ├── GanttChart.js    # Gantt-Planer
│       ├── Pages.js         # Unterseiten (Projekte, Team, etc.)
│       └── Modals.js        # CRUD-Dialoge + Notifications
├── package.json
├── next.config.mjs
├── postcss.config.mjs
└── eslint.config.mjs
```

## Quickstart

```bash
# Repository klonen
git clone https://github.com/joergmichno/project-manager.git
cd project-manager

# Dependencies installieren
npm install

# Dev-Server starten
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

## Screenshots

Die Live-Demo ist unter **[project-manager-five-olive.vercel.app](https://project-manager-five-olive.vercel.app/)** erreichbar.

## Hintergrund

Ursprünglich als IHK-Abschlussprojekt gestartet, wird dieses Dashboard aktiv weiterentwickelt. Es demonstriert:

- Modernes Frontend-Development mit React 19 + Next.js 16
- Component-basierte Architektur mit State Management (Context API)
- Responsive UI/UX Design mit Tailwind CSS 4 + Glassmorphism
- Continuous Deployment mit Vercel

## Related Projects

- **[ClawGuard](https://github.com/joergmichno/clawguard)** — Security scanner for AI agents (38+ patterns, 53 tests)
- **[DocQA](https://github.com/joergmichno/docqa)** — RAG-based document Q&A tool
- **[Prompt Lab](https://github.com/joergmichno/prompt-lab)** — Interactive prompt injection playground ([Live Demo](https://prompttools.co))

## Lizenz

MIT License — siehe [LICENSE](LICENSE) für Details.

---

**Erstellt von [Jörg Michno](https://github.com/joergmichno)** — Projektmanagement-Dashboard mit Gantt-Planer und Kanban-Board. 📊
