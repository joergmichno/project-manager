# 📊 Project Manager

**Webbasiertes Projektmanagement-Dashboard — IHK-Abschlussprojekt**

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://project-manager-five-olive.vercel.app/)

Ein modernes Projektmanagement-Dashboard für Freelancer und kleine Teams. Entwickelt als **IHK-Abschlussprojekt** im Rahmen der Umschulung zum Fachinformatiker für Anwendungsentwicklung.

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

## Kontext

Dieses Projekt entstand als **IHK-Abschlussprojekt** (Fachinformatiker für Anwendungsentwicklung) an der Bildungsakademie Hannover. Es demonstriert:

- Modernes Frontend-Development mit React 19 + Next.js 16
- Component-basierte Architektur mit State Management
- Responsive UI/UX Design mit Tailwind CSS
- Deployment und CI/CD mit Vercel

## Lizenz

MIT License — siehe [LICENSE](LICENSE) für Details.

---

**Erstellt von [Jörg Michno](https://github.com/joergmichno)** — IHK-Abschlussprojekt 2026 📊
