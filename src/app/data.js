// Business Brain — Echte Daten fuer AI-Labs Dashboard
// Letzte Aktualisierung: 14.03.2026

export const projects = [
    {
        id: 1,
        name: "KI-Automatisierung Service",
        client: "Revenue Stream #1",
        description: "Support-Bots + Lead-Qualifizierung fuer KMUs. Festpreis 500-1.200 EUR Setup + 99-149 EUR/Mo MRR. Upwork + Contra als Plattformen.",
        status: "in-progress",
        progress: 25,
        priority: "critical",
        startDate: "2026-03-14",
        deadline: "2026-04-21",
        team: ["JM", "CL", "BD"],
        tasks: { total: 30, completed: 4 },
        budget: { total: 0, spent: 0 },
        milestones: [
            { id: "m1", title: "Demo-Bot LIVE", date: "2026-03-14", completed: true },
            { id: "m2", title: "Proposal-Templates fertig", date: "2026-03-14", completed: true },
            { id: "m3", title: "Erste 5 Proposals", date: "2026-03-15", completed: false },
            { id: "m4", title: "15+ Proposals (Woche 2)", date: "2026-03-27", completed: false },
            { id: "m5", title: "Erster zahlender Kunde", date: "2026-04-03", completed: false },
            { id: "m6", title: "3 Kunden + Case Study", date: "2026-04-10", completed: false },
        ],
        tags: ["Revenue", "Upwork", "n8n", "AI"],
    },
    {
        id: 2,
        name: "ClawGuard Shield API",
        client: "Portfolio / SaaS",
        description: "Security Scanner fuer KI-Agenten. 42 Patterns, REST API, Stripe Integration. LIVE aber 0 zahlende Nutzer. Bleibt als Differenzierung.",
        status: "in-progress",
        progress: 95,
        priority: "low",
        startDate: "2026-02-01",
        deadline: "2026-04-22",
        team: ["JM", "CL"],
        tasks: { total: 10, completed: 9 },
        budget: { total: 0, spent: 0 },
        milestones: [
            { id: "m7", title: "API LIVE", date: "2026-03-03", completed: true },
            { id: "m8", title: "SDKs (Python + JS)", date: "2026-03-10", completed: true },
            { id: "m9", title: "Hard Launch (Stripe aktiv)", date: "2026-04-22", completed: false },
        ],
        tags: ["Security", "API", "SaaS", "Open Source"],
    },
    {
        id: 3,
        name: "Business Brain Dashboard",
        client: "Internes Tool",
        description: "Zentrales Dashboard fuer Joerg — Pipeline, Todos, Strategie, Kontakte. Eine Datenquelle, zwei Tueren (KI + Mensch).",
        status: "in-progress",
        progress: 30,
        priority: "high",
        startDate: "2026-03-14",
        deadline: "2026-03-16",
        team: ["CL"],
        tasks: { total: 6, completed: 2 },
        budget: { total: 0, spent: 0 },
        milestones: [
            { id: "m10", title: "Echte Daten statt Demo", date: "2026-03-14", completed: true },
            { id: "m11", title: "Revenue-Seite", date: "2026-03-14", completed: false },
            { id: "m12", title: "VPS API anbinden", date: "2026-03-15", completed: false },
            { id: "m13", title: "Mobile-tauglich", date: "2026-03-16", completed: false },
        ],
        tags: ["Dashboard", "Next.js", "Intern"],
    },
    {
        id: 4,
        name: "Jobsuche (Fallback)",
        client: "Absicherung",
        description: "Bewerbungen als Fallback falls Service-Business bis ALG-Ende nicht traegt. Aktiv: Rossmann, FI-TS, Leuchtfeuer.",
        status: "in-progress",
        progress: 40,
        priority: "medium",
        startDate: "2026-03-06",
        deadline: "2026-04-21",
        team: ["JM"],
        tasks: { total: 10, completed: 4 },
        budget: { total: 0, spent: 0 },
        milestones: [
            { id: "m14", title: "Profile fertig (4x)", date: "2026-03-06", completed: true },
            { id: "m15", title: "4 Bewerbungen gesendet", date: "2026-03-09", completed: true },
            { id: "m16", title: "Einladung zum Gespraech", date: "2026-03-28", completed: false },
        ],
        tags: ["Bewerbung", "Fallback"],
    },
];

export const kanbanTasks = {
    todo: [
        { id: "t1", title: "Erste 5 Upwork-Proposals senden", description: "Personalisierte Proposals mit Demo-Link an passende Jobs. Template A/B/C verwenden.", priority: "critical", assignee: "JM", project: "KI-Automatisierung", projectId: 1, startDate: "2026-03-15", deadline: "2026-03-15", createdAt: "2026-03-14", dependencies: [], comments: [] },
        { id: "t2", title: "Contra-Account erstellen", description: "contra.com Account anlegen, Bot als Projekt hochladen. 0% Gebuehr.", priority: "high", assignee: "JM", project: "KI-Automatisierung", projectId: 1, startDate: "2026-03-15", deadline: "2026-03-17", createdAt: "2026-03-14", dependencies: [], comments: [] },
        { id: "t3", title: "Demo-Bot Lead-Gen Variante", description: "Zweites n8n Template: Bot qualifiziert Leads statt FAQ.", priority: "high", assignee: "CL", project: "KI-Automatisierung", projectId: 1, startDate: "2026-03-16", deadline: "2026-03-18", createdAt: "2026-03-14", dependencies: [], comments: [] },
        { id: "t4", title: "VPS API fuer Dashboard", description: "n8n Webhook oder Express API die shared-memory JSONs ausliefert.", priority: "medium", assignee: "CL", project: "Business Brain", projectId: 3, startDate: "2026-03-15", deadline: "2026-03-16", createdAt: "2026-03-14", dependencies: [], comments: [] },
    ],
    inProgress: [
        { id: "t5", title: "Revenue-Seite im Dashboard", description: "Visuelle Darstellung der Strategie, Proposal-Counter, Pipeline.", priority: "high", assignee: "CL", project: "Business Brain", projectId: 3, startDate: "2026-03-14", deadline: "2026-03-14", createdAt: "2026-03-14", dependencies: [], comments: [] },
    ],
    review: [
        { id: "t6", title: "Heidi-Mode Erstattung", description: "Fachabteilung (Nelvins) hat geantwortet 14.03. Warten auf volle Erstattung 69,99 EUR. Frist 27.03.2026.", priority: "medium", assignee: "JM", project: "Sonstiges", projectId: 0, startDate: "2026-03-11", deadline: "2026-03-27", createdAt: "2026-03-11", dependencies: [], comments: [{ author: "CL", text: "Bot-Eskalation erfolgreich, echte Person antwortet jetzt.", time: "14.03." }] },
    ],
    done: [
        { id: "t7", title: "n8n auf VPS deployen", description: "Docker, Nginx Proxy, Basic Auth. ERLEDIGT.", priority: "high", assignee: "CL", project: "KI-Automatisierung", projectId: 1, startDate: "2026-03-14", deadline: "2026-03-14", createdAt: "2026-03-14", dependencies: [], comments: [] },
        { id: "t8", title: "Demo-Bot bauen + testen", description: "TechStyle Support Bot, 15 FAQ Topics, Webhook live.", priority: "critical", assignee: "CL", project: "KI-Automatisierung", projectId: 1, startDate: "2026-03-14", deadline: "2026-03-14", createdAt: "2026-03-14", dependencies: [], comments: [] },
        { id: "t9", title: "Proposal-Templates erstellen", description: "3 Templates: Chatbot, n8n Automation, Lead-Gen. ERLEDIGT.", priority: "high", assignee: "CL", project: "KI-Automatisierung", projectId: 1, startDate: "2026-03-14", deadline: "2026-03-14", createdAt: "2026-03-14", dependencies: [], comments: [] },
        { id: "t10", title: "Marktforschung durchfuehren", description: "Upwork 1.035 Jobs, +71% YoY, Preise validiert.", priority: "high", assignee: "CL", project: "KI-Automatisierung", projectId: 1, startDate: "2026-03-14", deadline: "2026-03-14", createdAt: "2026-03-14", dependencies: [], comments: [] },
        { id: "t11", title: "Direktive #11 (30-Reps)", description: "Anti-Pivot Regel in directives.md eingetragen.", priority: "medium", assignee: "CL", project: "Intern", projectId: 0, startDate: "2026-03-14", deadline: "2026-03-14", createdAt: "2026-03-14", dependencies: [], comments: [] },
        { id: "t12", title: "Fiverr Gig 1 (95%)", description: "Steps 1-5 fertig, Publish blocked (Identity). DEPRIORITISIERT.", priority: "low", assignee: "JM", project: "KI-Automatisierung", projectId: 1, startDate: "2026-03-13", deadline: "2026-03-14", createdAt: "2026-03-13", dependencies: [], comments: [] },
    ],
};

export const weeklyActivity = [
    { day: "Mo", tasks: 4, hours: 6 },
    { day: "Di", tasks: 6, hours: 8 },
    { day: "Mi", tasks: 8, hours: 9 },
    { day: "Do", tasks: 5, hours: 7 },
    { day: "Fr", tasks: 12, hours: 10 },
    { day: "Sa", tasks: 9, hours: 8 },
    { day: "So", tasks: 0, hours: 0 },
];

export const teamMembers = [
    { id: "JM", initials: "JM", name: "Joerg Michno", role: "CEO / Sales", email: "michno.jrg@gmail.com", phone: "", color: "#6366f1", skills: ["Sales", "Strategie", "E-Commerce", "KI-Vision"], status: "online", tasksActive: 2, projectIds: [1, 2, 4] },
    { id: "CL", initials: "CL", name: "Claude", role: "CTO / Umsetzer", email: "", phone: "", color: "#22d3ee", skills: ["Python", "Node.js", "n8n", "Next.js", "Security", "DevOps"], status: "online", tasksActive: 3, projectIds: [1, 2, 3] },
    { id: "BD", initials: "BD", name: "Buddy", role: "QA / Monitor", email: "", phone: "", color: "#34d399", skills: ["Monitoring", "Alerts", "Scheduling", "Code Review"], status: "online", tasksActive: 1, projectIds: [1] },
];

export const notifications = [
    { id: 1, text: "Demo-Bot ist LIVE: prompttools.co/demo/", time: "vor 1 Std.", read: false, type: "success" },
    { id: 2, text: "Proposal-Templates fertig (3 Varianten)", time: "vor 1 Std.", read: false, type: "success" },
    { id: 3, text: "Strategie-Entscheidung: KI-Auto fuer KMUs", time: "vor 2 Std.", read: false, type: "info" },
    { id: 4, text: "Direktive #11 (30-Reps) aktiviert", time: "vor 2 Std.", read: true, type: "info" },
    { id: 5, text: "ALG endet in 38 Tagen (21.04.2026)", time: "heute", read: false, type: "warning" },
    { id: 6, text: "Aegypten Restzahlung 1.020 EUR wird abgebucht", time: "heute", read: true, type: "warning" },
];

// ═══════════════════════════════════
// REVENUE STRATEGY DATA (v3 — Multi-Channel, 14.03.2026)
// ═══════════════════════════════════
export const revenueStrategy = {
    proposalCounter: { current: 0, target: 30 },
    algEndDate: "2026-04-21",
    weeksLeft: 5,
    monthlyTarget: 2000, // EUR
    pricing: {
        setup: { min: 500, max: 1200, intro: 250 },
        mrr: { min: 99, max: 149 },
    },
    // Multi-Channel Strategie (Claude+Buddy aligned)
    channels: [
        { name: "Direct Outreach", split: 60, status: "ready", icon: "📧", replyRate: "46-71%", description: "LinkedIn + Cold Email Multi-Channel", fee: "0%", tools: "LinkedIn, Apollo.io, Email", color: "#6366f1" },
        { name: "Upwork", split: 30, status: "ready", icon: "💼", replyRate: "5-10%", description: "Proposals an passende AI-Jobs", fee: "10%", tools: "Upwork Proposals", color: "#22d3ee" },
        { name: "Fiverr", split: 10, status: "passive", icon: "🎣", replyRate: "passiv", description: "Gig als Koeder (Boost-Window)", fee: "20%", tools: "Fiverr Gig (95% fertig)", color: "#34d399" },
    ],
    platforms: [
        { name: "Direct Outreach", status: "ready", jobs: null, growth: "46-71% Reply", fee: "0%" },
        { name: "Upwork", status: "ready", jobs: 3000, growth: "+178% AI YoY", fee: "10%" },
        { name: "Contra", status: "pending", jobs: null, growth: null, fee: "0%" },
        { name: "Fiverr", status: "passive", jobs: null, growth: "Boost 10-20x", fee: "20%" },
    ],
    // Outbound Heartbeat — taegliche Aktions-Ziele
    dailyTargets: {
        outreach: { target: 10, done: 0, label: "Cold Emails/LinkedIn", icon: "📧" },
        proposals: { target: 3, done: 0, label: "Upwork Proposals", icon: "💼" },
        followups: { target: 5, done: 0, label: "Follow-ups", icon: "🔄" },
    },
    // Sales Pipeline (Kanban-Style)
    pipeline: [],
    pipelineStages: ["Kontaktiert", "Demo gesendet", "Follow-up", "Verhandlung", "Gewonnen", "Verloren"],
    // Nischen (3 Test-Nischen parallel)
    testNiches: [
        { name: "E-Commerce (>50 Reviews)", reason: "Hohes Volumen, brauchen Support-Automation", searchTerms: "shopify support bot, woocommerce automation, ecommerce chatbot" },
        { name: "Handwerker/Dienstleister", reason: "Brauchen Terminbuchung + FAQ", searchTerms: "booking automation, appointment bot, handwerker website" },
        { name: "Coaches/Berater", reason: "Brauchen Lead-Qualifizierung", searchTerms: "lead qualification bot, coaching automation, consultant chatbot" },
    ],
    weekPlan: [
        { week: 1, dates: "14.-20.03.", focus: "Demo + Multi-Channel Setup + erste Outreach", target: "System bereit", status: "in-progress" },
        { week: 2, dates: "21.-27.03.", focus: "15+ Proposals + 50 Cold Emails", target: "Erste Antworten", status: "pending" },
        { week: 3, dates: "28.03.-03.04.", focus: "Follow-ups + erste Auftraege", target: "Erster Umsatz", status: "pending" },
        { week: 4, dates: "04.-10.04.", focus: "Delivery + Case Study + Testimonial", target: "Beweis", status: "pending" },
        { week: 5, dates: "11.-21.04.", focus: "Skalieren oder Fallback", target: "Sicherheit", status: "pending" },
    ],
    marketData: {
        totalMarket: "$15.12 Mrd",
        upworkJobs: 3000,
        yoyGrowth: 178,
        medianBudget: 400,
        costSaving: "20-40%",
        aiVideoGrowth: 329,
        aiIntegrationGrowth: 178,
        aiChatbotGrowth: 71,
        avgFreelancerPremium: 44, // AI Freelancer verdienen 44% mehr
    },
    // Avatar/Video Strategie
    videoStrategy: {
        tool: "HeyGen",
        cost: "$29/Mo (Free Tier zum Testen: 3 Videos)",
        impactData: "+60% Interview-Rate auf Upwork, +300% Response bei Outreach",
        plan: "A/B Test: 10 Emails mit echtem Video vs 10 mit HeyGen Avatar",
        status: "testing",
    },
    products: [
        { name: "FAQ Support Bot", price: "500 EUR", delivery: "3-5 Tage", description: "Automatischer Kundenservice" },
        { name: "Smart Support System", price: "800 EUR", delivery: "5-7 Tage", description: "Bot + CRM Integration" },
        { name: "Full AI Suite", price: "1.200 EUR", delivery: "7-10 Tage", description: "Bot + Lead-Gen + Analytics" },
    ],
};
