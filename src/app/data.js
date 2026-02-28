// Demo-Daten für das Project Manager Dashboard – v2.0

export const projects = [
    {
        id: 1,
        name: "E-Commerce Redesign",
        client: "TechCorp GmbH",
        description: "Kompletter Relaunch des Online-Shops mit neuem Design, verbesserter UX und optimiertem Checkout-Prozess. Ziel: Conversion-Rate um 25% steigern.",
        status: "in-progress",
        progress: 68,
        priority: "high",
        startDate: "2026-01-15",
        deadline: "2026-03-15",
        team: ["JM", "AS", "KL"],
        tasks: { total: 24, completed: 16 },
        budget: { total: 45000, spent: 28500 },
        milestones: [
            { id: "m1", title: "Design-Freigabe", date: "2026-02-01", completed: true },
            { id: "m2", title: "Frontend fertig", date: "2026-02-28", completed: false },
            { id: "m3", title: "Go-Live", date: "2026-03-15", completed: false },
        ],
        tags: ["Frontend", "UI/UX", "E-Commerce"],
    },
    {
        id: 2,
        name: "Mobile App MVP",
        client: "StartUp Inc.",
        description: "Native Mobile App für iOS und Android mit Fokus auf schnelle Iteration. MVP umfasst Onboarding, Dashboard und Push-Benachrichtigungen.",
        status: "in-progress",
        progress: 42,
        priority: "critical",
        startDate: "2026-02-01",
        deadline: "2026-04-01",
        team: ["JM", "BT"],
        tasks: { total: 32, completed: 13 },
        budget: { total: 60000, spent: 22000 },
        milestones: [
            { id: "m4", title: "Wireframes fertig", date: "2026-02-15", completed: true },
            { id: "m5", title: "Beta-Release", date: "2026-03-15", completed: false },
            { id: "m6", title: "App Store Launch", date: "2026-04-01", completed: false },
        ],
        tags: ["Mobile", "React Native", "MVP"],
    },
    {
        id: 3,
        name: "API-Integration",
        client: "DataFlow AG",
        description: "Integration von REST und GraphQL APIs für Echtzeit-Datenverwaltung. Anbindung an 3 externe Systeme mit OAuth2-Authentifizierung.",
        status: "review",
        progress: 91,
        priority: "medium",
        startDate: "2026-01-20",
        deadline: "2026-03-05",
        team: ["JM", "KL", "MR"],
        tasks: { total: 18, completed: 16 },
        budget: { total: 25000, spent: 23800 },
        milestones: [
            { id: "m7", title: "API-Design", date: "2026-02-01", completed: true },
            { id: "m8", title: "Integration Tests", date: "2026-02-25", completed: true },
            { id: "m9", title: "Abnahme", date: "2026-03-05", completed: false },
        ],
        tags: ["Backend", "API", "Integration"],
    },
    {
        id: 4,
        name: "Dashboard Analytik",
        client: "Intern",
        description: "Internes Analytics-Dashboard zur Visualisierung von KPIs, Umsatzzahlen und Kundenaktivität. Real-Time Charts mit WebSocket-Anbindung.",
        status: "planning",
        progress: 15,
        priority: "low",
        startDate: "2026-03-01",
        deadline: "2026-05-01",
        team: ["JM"],
        tasks: { total: 12, completed: 2 },
        budget: { total: 15000, spent: 2200 },
        milestones: [
            { id: "m10", title: "Anforderungsanalyse", date: "2026-03-10", completed: false },
            { id: "m11", title: "Prototyp", date: "2026-04-01", completed: false },
            { id: "m12", title: "Fertigstellung", date: "2026-05-01", completed: false },
        ],
        tags: ["Analytics", "Dashboard", "Charts"],
    },
];

export const kanbanTasks = {
    todo: [
        { id: "t1", title: "Design-System Dokumentation", description: "Alle UI-Komponenten dokumentieren und in Storybook erfassen.", priority: "medium", assignee: "JM", project: "E-Commerce Redesign", projectId: 1, deadline: "2026-03-01", createdAt: "2026-02-20", comments: [] },
        { id: "t2", title: "CI/CD Pipeline einrichten", description: "GitHub Actions Pipeline für automatisches Testing und Deployment konfigurieren.", priority: "high", assignee: "KL", project: "Mobile App MVP", projectId: 2, deadline: "2026-03-05", createdAt: "2026-02-18", comments: [] },
        { id: "t3", title: "Nutzerforschung Interviews", description: "5 User-Interviews durchführen und Key Insights dokumentieren.", priority: "low", assignee: "AS", project: "Dashboard Analytik", projectId: 4, deadline: "2026-03-20", createdAt: "2026-02-22", comments: [] },
    ],
    inProgress: [
        { id: "t4", title: "Checkout-Prozess Neugestaltung", description: "Neuer 3-Schritt Checkout mit Apple Pay und Google Pay Integration.", priority: "critical", assignee: "JM", project: "E-Commerce Redesign", projectId: 1, deadline: "2026-03-01", createdAt: "2026-02-15", comments: [{ author: "AS", text: "Wireframes sind ready, bitte reviewen!", time: "vor 2 Std." }] },
        { id: "t5", title: "REST API Endpunkte", description: "CRUD-Endpunkte für alle Ressourcen implementieren mit Swagger-Docs.", priority: "high", assignee: "MR", project: "API-Integration", projectId: 3, deadline: "2026-02-28", createdAt: "2026-02-10", comments: [] },
        { id: "t6", title: "Push-Benachrichtigungsdienst", description: "Firebase Cloud Messaging für Push-Notifications einrichten.", priority: "medium", assignee: "BT", project: "Mobile App MVP", projectId: 2, deadline: "2026-03-10", createdAt: "2026-02-16", comments: [] },
    ],
    review: [
        { id: "t7", title: "Zahlungsgateway Anbindung", description: "Stripe und PayPal als Zahlungsprovider integrieren und testen.", priority: "high", assignee: "JM", project: "E-Commerce Redesign", projectId: 1, deadline: "2026-03-05", createdAt: "2026-02-08", comments: [{ author: "KL", text: "Testdaten im Staging bereit!", time: "vor 1 Std." }] },
        { id: "t8", title: "OAuth2 Implementierung", description: "OAuth2 Flow für alle externen APIs implementieren mit Token-Refresh.", priority: "critical", assignee: "KL", project: "API-Integration", projectId: 3, deadline: "2026-02-25", createdAt: "2026-02-05", comments: [] },
    ],
    done: [
        { id: "t9", title: "Datenbankschema Entwurf", description: "PostgreSQL Schema für alle Entitäten designen mit Migrationen.", priority: "high", assignee: "JM", project: "Mobile App MVP", projectId: 2, deadline: "2026-02-15", createdAt: "2026-02-01", comments: [] },
        { id: "t10", title: "Wireframes v2", description: "Überarbeitete Wireframes für alle Hauptseiten.", priority: "medium", assignee: "AS", project: "E-Commerce Redesign", projectId: 1, deadline: "2026-02-10", createdAt: "2026-01-28", comments: [] },
        { id: "t11", title: "API Ratenbegrenzung", description: "Rate Limiting mit Redis implementieren: 100 req/min pro User.", priority: "high", assignee: "MR", project: "API-Integration", projectId: 3, deadline: "2026-02-20", createdAt: "2026-02-10", comments: [] },
        { id: "t12", title: "Fehlerbehandlung Middleware", description: "Zentrale Error-Handling Middleware mit Logging und Sentry-Integration.", priority: "medium", assignee: "KL", project: "API-Integration", projectId: 3, deadline: "2026-02-18", createdAt: "2026-02-08", comments: [] },
    ],
};

export const weeklyActivity = [
    { day: "Mo", tasks: 8, hours: 7.5 },
    { day: "Di", tasks: 12, hours: 8.2 },
    { day: "Mi", tasks: 6, hours: 5.1 },
    { day: "Do", tasks: 15, hours: 9.0 },
    { day: "Fr", tasks: 10, hours: 7.8 },
    { day: "Sa", tasks: 3, hours: 2.5 },
    { day: "So", tasks: 1, hours: 1.0 },
];

export const teamMembers = [
    { id: "JM", initials: "JM", name: "Jörg Michno", role: "Lead Developer", email: "joerg@example.com", phone: "+49 170 1234567", color: "#6366f1", skills: ["React", "Next.js", "Node.js", "TypeScript"], status: "online", tasksActive: 4, projectIds: [1, 2, 3, 4] },
    { id: "AS", initials: "AS", name: "Anna Schmidt", role: "UI Designerin", email: "anna@example.com", phone: "+49 171 2345678", color: "#22d3ee", skills: ["Figma", "UI/UX", "CSS", "Prototyping"], status: "online", tasksActive: 2, projectIds: [1, 4] },
    { id: "KL", initials: "KL", name: "Kai Lehmann", role: "Backend Entwickler", email: "kai@example.com", phone: "+49 172 3456789", color: "#34d399", skills: ["Python", "PostgreSQL", "Docker", "AWS"], status: "online", tasksActive: 3, projectIds: [1, 2, 3] },
    { id: "BT", initials: "BT", name: "Ben Torres", role: "Mobile Entwickler", email: "ben@example.com", phone: "+49 173 4567890", color: "#fbbf24", skills: ["React Native", "Swift", "Kotlin", "Firebase"], status: "away", tasksActive: 1, projectIds: [2] },
    { id: "MR", initials: "MR", name: "Mia Richter", role: "API Spezialistin", email: "mia@example.com", phone: "+49 174 5678901", color: "#f87171", skills: ["REST", "GraphQL", "Node.js", "OAuth"], status: "online", tasksActive: 2, projectIds: [3] },
];

export const notifications = [
    { id: 1, text: "API-Integration ist zu 91% abgeschlossen", time: "vor 2 Std.", read: false, type: "success" },
    { id: 2, text: "Kai hat OAuth2 zur Prüfung eingereicht", time: "vor 4 Std.", read: false, type: "info" },
    { id: 3, text: "Budget-Warnung: E-Commerce bei 64%", time: "vor 6 Std.", read: false, type: "warning" },
    { id: 4, text: "Mobile App MVP: Beta-Release Deadline in 15 Tagen", time: "vor 1 Tag", read: true, type: "warning" },
    { id: 5, text: "Neues Teammitglied: Ben Torres ist dem Team beigetreten", time: "vor 3 Tagen", read: true, type: "info" },
];
