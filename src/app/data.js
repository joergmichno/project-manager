// Demo-Daten für das Project Manager Dashboard
export const projects = [
    {
        id: 1,
        name: "E-Commerce Redesign",
        client: "TechCorp GmbH",
        status: "in-progress",
        progress: 68,
        priority: "high",
        deadline: "2026-03-15",
        team: ["JM", "AS", "KL"],
        tasks: { total: 24, completed: 16 },
        budget: { total: 45000, spent: 28500 },
    },
    {
        id: 2,
        name: "Mobile App MVP",
        client: "StartUp Inc.",
        status: "in-progress",
        progress: 42,
        priority: "critical",
        deadline: "2026-04-01",
        team: ["JM", "BT"],
        tasks: { total: 32, completed: 13 },
        budget: { total: 60000, spent: 22000 },
    },
    {
        id: 3,
        name: "API-Integration",
        client: "DataFlow AG",
        status: "review",
        progress: 91,
        priority: "medium",
        deadline: "2026-03-05",
        team: ["JM", "KL", "MR"],
        tasks: { total: 18, completed: 16 },
        budget: { total: 25000, spent: 23800 },
    },
    {
        id: 4,
        name: "Dashboard Analytik",
        client: "Intern",
        status: "planning",
        progress: 15,
        priority: "low",
        deadline: "2026-05-01",
        team: ["JM"],
        tasks: { total: 12, completed: 2 },
        budget: { total: 15000, spent: 2200 },
    },
];

export const kanbanTasks = {
    todo: [
        { id: "t1", title: "Design-System Dokumentation", priority: "medium", assignee: "JM", project: "E-Commerce Redesign" },
        { id: "t2", title: "CI/CD Pipeline einrichten", priority: "high", assignee: "KL", project: "Mobile App MVP" },
        { id: "t3", title: "Nutzerforschung Interviews", priority: "low", assignee: "AS", project: "Dashboard Analytik" },
    ],
    inProgress: [
        { id: "t4", title: "Checkout-Prozess Neugestaltung", priority: "critical", assignee: "JM", project: "E-Commerce Redesign" },
        { id: "t5", title: "REST API Endpunkte", priority: "high", assignee: "MR", project: "API-Integration" },
        { id: "t6", title: "Push-Benachrichtigungsdienst", priority: "medium", assignee: "BT", project: "Mobile App MVP" },
    ],
    review: [
        { id: "t7", title: "Zahlungsgateway Anbindung", priority: "high", assignee: "JM", project: "E-Commerce Redesign" },
        { id: "t8", title: "OAuth2 Implementierung", priority: "critical", assignee: "KL", project: "API-Integration" },
    ],
    done: [
        { id: "t9", title: "Datenbankschema Entwurf", priority: "high", assignee: "JM", project: "Mobile App MVP" },
        { id: "t10", title: "Wireframes v2", priority: "medium", assignee: "AS", project: "E-Commerce Redesign" },
        { id: "t11", title: "API Ratenbegrenzung", priority: "high", assignee: "MR", project: "API-Integration" },
        { id: "t12", title: "Fehlerbehandlung Middleware", priority: "medium", assignee: "KL", project: "API-Integration" },
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
    { initials: "JM", name: "Jörg Michno", role: "Lead Developer", color: "#6366f1" },
    { initials: "AS", name: "Anna Schmidt", role: "UI Designerin", color: "#22d3ee" },
    { initials: "KL", name: "Kai Lehmann", role: "Backend Entwickler", color: "#34d399" },
    { initials: "BT", name: "Ben Torres", role: "Mobile Entwickler", color: "#fbbf24" },
    { initials: "MR", name: "Mia Richter", role: "API Spezialistin", color: "#f87171" },
];
