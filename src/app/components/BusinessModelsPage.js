"use client";

import { useState } from "react";
import { useApp } from "../context";

/* ═══════════════════════════════════
   BUSINESS MODELS DATA (Marktforschung 14.03.2026)
   ═══════════════════════════════════ */
const businessModels = [
    {
        id: 1,
        name: "AI Automation Agency (Upwork)",
        category: "Freelance",
        description: "Support-Bots, n8n-Workflows, Lead-Qualifizierung fuer KMUs ueber Upwork/Contra.",
        revenueMin: 3000,
        revenueMax: 15000,
        difficulty: 2,
        timeToRevenue: "2-4 Wochen",
        competition: "Hoch",
        fit: 9,
        status: "active",
        pros: ["Demo-Bot als Showcase", "Upwork AI Jobs +109% YoY", "Claude baut alles", "Festpreis + MRR moeglich"],
        cons: ["0 Reviews am Start", "Hohe Konkurrenz", "10-20% Plattform-Gebuehr"],
        platforms: ["Upwork", "Contra"],
        monthlyInvestment: 0,
        buddyOpinion: "ALIGNED — Das ist unsere Strategie. Durchziehen bis 30 Reps.",
        claudeOpinion: "Bestes Fit fuer Joergs Profil. n8n + Demo-Bot = sofort einsatzbereit. Risiko: Review-Gap.",
    },
    {
        id: 2,
        name: "n8n Template Sales",
        category: "Digital Products",
        description: "Fertige n8n-Workflows auf Gumroad, n8n Creator Hub, eigene Website verkaufen.",
        revenueMin: 500,
        revenueMax: 3000,
        difficulty: 2,
        timeToRevenue: "1-3 Monate",
        competition: "Mittel",
        fit: 9,
        status: "later",
        pros: ["Passives Einkommen", "Einmal bauen, oft verkaufen", "Wir kennen n8n perfekt", "Low Barrier"],
        cons: ["Braucht Audience (SEO/YouTube)", "Survivorship Bias in Erfolgsgeschichten", "Langsamer Anlauf"],
        platforms: ["Gumroad", "n8n Hub", "Eigene Website"],
        monthlyInvestment: 0,
        buddyOpinion: "VETO als Sofort-Play. 47K/Jahr = Survivorship Bias. Erst nach 30 Reps evaluieren.",
        claudeOpinion: "Langfristig attraktiv (passiv). Aber NICHT vor Revenue. Erst Client-Arbeit, Templates als Nebenprodukt.",
    },
    {
        id: 3,
        name: "White-Label AI fuer Agencies",
        category: "B2B",
        description: "Chatbots/Automationen bauen die andere Agencies unter ihrem Branding verkaufen.",
        revenueMin: 2000,
        revenueMax: 15000,
        difficulty: 2,
        timeToRevenue: "2-4 Wochen",
        competition: "Mittel",
        fit: 8,
        status: "later",
        pros: ["Skalierbar ohne Endkunden-Akquise", "100-300 EUR/Client/Monat Marge", "Agencies haben Kunden", "Kein eigenes Marketing"],
        cons: ["Abhaengigkeit von Agencies", "Niedrigere Margen als Direktverkauf", "Qualitaetsanspruch hoch"],
        platforms: ["LinkedIn", "Cold Email", "Partnerschaft"],
        monthlyInvestment: 0,
        buddyOpinion: "Interessant aber erst nach bewiesenem Track Record. Ohne Reviews kauft keine Agency.",
        claudeOpinion: "Starkes Modell fuer Phase 2. Erst 3+ Kunden direkt, dann Agency-Partnerschaften.",
    },
    {
        id: 4,
        name: "Cold Email / Direct Outreach",
        category: "Direct Sales",
        description: "E-Commerce-Shops direkt anschreiben mit fertigem Bot-Angebot. Upwork-Filter umgehen.",
        revenueMin: 3000,
        revenueMax: 20000,
        difficulty: 3,
        timeToRevenue: "2-6 Wochen",
        competition: "Mittel",
        fit: 7,
        status: "evaluate",
        pros: ["Keine Plattform-Gebuehren", "Volle Kontrolle", "Hoehere Margen", "Kann PARALLEL zu Upwork laufen"],
        cons: ["Lead-Listen noetig", "Kein Vertrauensvorschuss", "Spam-Risiko", "Hoehere Huerden"],
        platforms: ["Email", "LinkedIn"],
        monthlyInvestment: 20,
        buddyOpinion: "EMPFOHLEN als Ergaenzung. 10 Mails an E-Commerce-Shops mit echtem Loom-Video.",
        claudeOpinion: "Guter Zusatzkanal, aber NICHT statt Upwork. Upwork hat Escrow + Trust. Cold Email braucht mehr Skill.",
    },
    {
        id: 5,
        name: "Micro-SaaS (AI Tool)",
        category: "SaaS",
        description: "Kleines AI-Tool als SaaS verkaufen (z.B. Nischen-Chatbot-Builder, Content-Generator).",
        revenueMin: 1000,
        revenueMax: 10000,
        difficulty: 4,
        timeToRevenue: "3-6 Monate",
        competition: "Hoch",
        fit: 7,
        status: "later",
        pros: ["Skaliert ohne proportionalen Aufwand", "MRR-Modell", "Wir haben die Tech-Skills"],
        cons: ["Lange Entwicklung", "Marketing/Distribution noetig", "Hohe Konkurrenz", "Support-Last"],
        platforms: ["ProductHunt", "IndieHackers", "SEO"],
        monthlyInvestment: 30,
        buddyOpinion: "VETO. Shield hat 0 Nutzer nach Wochen. Erst Revenue durch Services, dann SaaS.",
        claudeOpinion: "Zu frueh. Shield beweist: Gutes Produkt ohne Distribution = 0 Umsatz. Erst Kunden, dann Produkt.",
    },
    {
        id: 6,
        name: "AI Consulting",
        category: "Consulting",
        description: "Unternehmen bei KI-Einfuehrung beraten. Strategie + Umsetzung.",
        revenueMin: 5000,
        revenueMax: 30000,
        difficulty: 3,
        timeToRevenue: "2-6 Wochen",
        competition: "Mittel-Hoch",
        fit: 7,
        status: "later",
        pros: ["Hohe Stundensaetze", "Wissenstransfer", "Beziehungsaufbau"],
        cons: ["Erfordert Reputation", "Nicht skalierbar", "Live-Calls unvermeidbar", "Joergs Constraint: async only"],
        platforms: ["LinkedIn", "Upwork", "Empfehlungen"],
        monthlyInvestment: 0,
        buddyOpinion: "Joergs 'kein Call'-Constraint macht Consulting schwierig. Nur async moeglich.",
        claudeOpinion: "Revenue-Potenzial hoch, aber Calls sind Standard. Joergs async-Stil passt besser zu Delivery als Beratung.",
    },
    {
        id: 7,
        name: "AI Content Services",
        category: "Freelance",
        description: "KI-gestuetzte Texterstellung, Social Media, SEO-Content fuer Unternehmen.",
        revenueMin: 3000,
        revenueMax: 10000,
        difficulty: 2,
        timeToRevenue: "1-4 Wochen",
        competition: "Sehr hoch",
        fit: 5,
        status: "skip",
        pros: ["Schneller Einstieg", "Hohe Nachfrage", "Einfach zu liefern"],
        cons: ["Race to bottom", "Leicht ersetzbar", "Kein technischer Moat", "Nicht Joergs Staerke"],
        platforms: ["Upwork", "Fiverr", "Content-Agenturen"],
        monthlyInvestment: 20,
        buddyOpinion: "SKIP. Null Differenzierung. Jeder mit ChatGPT macht das. Kein Moat.",
        claudeOpinion: "Agreed. Joergs Staerke ist Technik (n8n, Bots), nicht Content. Skip.",
    },
    {
        id: 8,
        name: "Fiverr Gigs (AI Services)",
        category: "Freelance",
        description: "AI-Gigs auf Fiverr: Chatbot-Setup, n8n-Workflows, API-Integration.",
        revenueMin: 500,
        revenueMax: 5000,
        difficulty: 1,
        timeToRevenue: "1-2 Wochen",
        competition: "Sehr hoch",
        fit: 6,
        status: "evaluate",
        pros: ["Sehr niedriger Einstieg", "Kunden kommen zu dir", "Portfolio aufbauen"],
        cons: ["20% Gebuehr", "Race-to-bottom Preise", "ID-Verification pending", "Kleine Auftraege"],
        platforms: ["Fiverr"],
        monthlyInvestment: 0,
        buddyOpinion: "VETO. Gestern beerdigt, heute wieder ausgegraben? Race-to-bottom. Lenkt von Upwork ab.",
        claudeOpinion: "Als SEKUNDAER neben Upwork OK. Nicht statt Upwork. ID-Verification blockiert aktuell sowieso.",
    },
    {
        id: 9,
        name: "Voice AI / Phone Bots",
        category: "Nische",
        description: "KI-Telefonbots, IVR-Systeme, Voice-Assistenten fuer Unternehmen.",
        revenueMin: 2500,
        revenueMax: 40000,
        difficulty: 4,
        timeToRevenue: "4-8 Wochen",
        competition: "Mittel",
        fit: 7,
        status: "later",
        pros: ["Hohe Margen", "35% CAGR Markt", "Weniger Konkurrenz", "Premium-Segment"],
        cons: ["Hohe Komplexitaet", "Neue Technologie lernen", "Laengere Entwicklung"],
        platforms: ["Direct Sales", "Upwork"],
        monthlyInvestment: 50,
        buddyOpinion: "Spannend fuer Phase 3. Erst Chat-Bots meistern, dann Voice.",
        claudeOpinion: "Logische Evolution von Chat zu Voice. Aber erst nach erstem zahlenden Kunden.",
    },
    {
        id: 10,
        name: "AI Video Proposals (Avatar)",
        category: "Tool",
        description: "HeyGen + ElevenLabs fuer personalisierte Video-Proposals an Kunden.",
        revenueMin: 0,
        revenueMax: 0,
        difficulty: 1,
        timeToRevenue: "Sofort (Conversion-Booster)",
        competition: "Niedrig",
        fit: 8,
        status: "evaluate",
        pros: ["Hebt sich von Text-Proposals ab", "Automatisierbar mit n8n", "Persoenlicher Eindruck", "29 USD/Mo"],
        cons: ["Deepfake-Bedenken", "Kann als Spam wirken", "Vertrauensfrage bei B2B"],
        platforms: ["HeyGen", "ElevenLabs"],
        monthlyInvestment: 34,
        buddyOpinion: "ABSOLUTES VETO. B2B-Kunden = Vertrauen. Deepfake = Scam-Signal. Echtes Loom stattdessen.",
        claudeOpinion: "FREE TIER TESTEN (0 EUR), dann entscheiden. Buddys Punkt ist valide, aber Daten > Meinung.",
    },
    {
        id: 11,
        name: "API / Tool Reselling",
        category: "SaaS",
        description: "Auf OpenAI/Claude APIs aufbauen, Mehrwert hinzufuegen, teurer weiterverkaufen.",
        revenueMin: 1000,
        revenueMax: 10000,
        difficulty: 3,
        timeToRevenue: "2-8 Wochen",
        competition: "Hoch",
        fit: 7,
        status: "later",
        pros: ["Hohe Marge", "Tech-Vorteil nutzbar", "Wir haben die Infra"],
        cons: ["API-Abhaengigkeit", "Pricing-Risiko bei API-Aenderungen", "Braucht Distribution"],
        platforms: ["Eigene Website", "RapidAPI"],
        monthlyInvestment: 50,
        buddyOpinion: "Shield IST das bereits. 0 Nutzer. Beweis dass Produkt ohne Distribution stirbt.",
        claudeOpinion: "Shield bestaetigt: Technik allein reicht nicht. Erst Kunden durch Service, dann Produkt.",
    },
    {
        id: 12,
        name: "Productized Service (Direct)",
        category: "Direct Sales",
        description: "Standardisierter Service (z.B. 'FAQ-Bot in 48h fuer 499 EUR') direkt vermarkten.",
        revenueMin: 3000,
        revenueMax: 15000,
        difficulty: 3,
        timeToRevenue: "2-4 Wochen",
        competition: "Mittel",
        fit: 8,
        status: "evaluate",
        pros: ["Klares Angebot", "Wiederholbar", "Skalierbar", "Kein Plattform-Abhaengigkeit"],
        cons: ["Eigenes Marketing noetig", "Landing Page + SEO", "Kein eingebauter Trust"],
        platforms: ["Eigene Website", "LinkedIn", "Cold Email"],
        monthlyInvestment: 0,
        buddyOpinion: "EMPFOHLEN als Ziel. Upwork fuer Reviews → dann eigene Website mit Productized Service.",
        claudeOpinion: "Das ist das Ziel fuer Phase 2. Upwork = Sprungbrett, Productized Service = Destination.",
    },
];

/* ═══════════════════════════════════
   STATUS CONFIG
   ═══════════════════════════════════ */
const statusConfig = {
    active: { label: "AKTIV", color: "#34d399", bg: "#34d39922", description: "Wird gerade umgesetzt" },
    evaluate: { label: "PRUEFEN", color: "#fbbf24", bg: "#fbbf2422", description: "Wird evaluiert" },
    later: { label: "SPAETER", color: "#818cf8", bg: "#818cf822", description: "Nach 30 Reps evaluieren" },
    skip: { label: "SKIP", color: "#f87171", bg: "#f8717122", description: "Nicht passend" },
};

const difficultyLabel = ["", "Sehr einfach", "Einfach", "Mittel", "Schwer", "Sehr schwer"];
const difficultyColor = ["", "#34d399", "#22d3ee", "#fbbf24", "#f87171", "#dc2626"];

/* ═══════════════════════════════════
   MODEL CARD COMPONENT
   ═══════════════════════════════════ */
function ModelCard({ model, expanded, onToggle }) {
    const sc = statusConfig[model.status];
    return (
        <div
            className="rounded-2xl border transition-all hover:scale-[1.005] cursor-pointer"
            style={{
                borderColor: model.status === "active" ? "#34d39966" : model.status === "evaluate" ? "#fbbf2444" : "rgba(255,255,255,0.08)",
                background: model.status === "active" ? "rgba(52,211,153,0.05)" : "rgba(255,255,255,0.02)",
            }}
            onClick={onToggle}
        >
            <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ backgroundColor: sc.bg, color: sc.color }}>
                                {sc.label}
                            </span>
                            <span className="text-[10px] text-white/30">{model.category}</span>
                        </div>
                        <h3 className="text-base font-bold text-white">{model.name}</h3>
                        <p className="text-xs text-white/50 mt-1">{model.description}</p>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                        <div className="text-lg font-black text-white">
                            {model.fit}<span className="text-xs text-white/30">/10</span>
                        </div>
                        <div className="text-[10px] text-white/40">Fit</div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-4 gap-2 mb-3">
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                        <div className="text-xs font-bold text-green-400">{model.revenueMin > 0 ? `${(model.revenueMin / 1000).toFixed(0)}-${(model.revenueMax / 1000).toFixed(0)}k` : "—"}</div>
                        <div className="text-[9px] text-white/30">EUR/Mo</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                        <div className="text-xs font-bold" style={{ color: difficultyColor[model.difficulty] }}>
                            {"●".repeat(model.difficulty)}{"○".repeat(5 - model.difficulty)}
                        </div>
                        <div className="text-[9px] text-white/30">Schwierigkeit</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                        <div className="text-xs font-bold text-cyan-400">{model.timeToRevenue.split(" ")[0]}</div>
                        <div className="text-[9px] text-white/30">{model.timeToRevenue.split(" ").slice(1).join(" ")}</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                        <div className="text-xs font-bold text-white">{model.competition}</div>
                        <div className="text-[9px] text-white/30">Konkurrenz</div>
                    </div>
                </div>

                {/* Fit Bar */}
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                            width: `${model.fit * 10}%`,
                            background: model.fit >= 8 ? "linear-gradient(90deg, #34d399, #22d3ee)" : model.fit >= 6 ? "linear-gradient(90deg, #fbbf24, #22d3ee)" : "#f87171",
                        }}
                    />
                </div>

                {/* Expand Indicator */}
                <div className="text-center mt-2">
                    <span className="text-[10px] text-white/30">{expanded ? "▲ weniger" : "▼ Details"}</span>
                </div>
            </div>

            {/* Expanded Details */}
            {expanded && (
                <div className="border-t border-white/10 p-5 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {/* Pros */}
                        <div>
                            <h4 className="text-xs font-bold text-green-400 mb-2">PRO</h4>
                            <ul className="space-y-1">
                                {model.pros.map((p, i) => (
                                    <li key={i} className="text-xs text-white/70 flex items-start gap-2">
                                        <span className="text-green-400 shrink-0">+</span>{p}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Cons */}
                        <div>
                            <h4 className="text-xs font-bold text-red-400 mb-2">CONTRA</h4>
                            <ul className="space-y-1">
                                {model.cons.map((c, i) => (
                                    <li key={i} className="text-xs text-white/70 flex items-start gap-2">
                                        <span className="text-red-400 shrink-0">-</span>{c}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Platforms */}
                    <div className="mb-4">
                        <h4 className="text-xs font-bold text-white/50 mb-2">PLATTFORMEN</h4>
                        <div className="flex flex-wrap gap-1">
                            {model.platforms.map((p) => (
                                <span key={p} className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300">{p}</span>
                            ))}
                        </div>
                    </div>

                    {/* Investment */}
                    {model.monthlyInvestment > 0 && (
                        <div className="text-xs text-white/40 mb-4">
                            Monatliche Kosten: <span className="text-white font-bold">{model.monthlyInvestment} EUR</span>
                        </div>
                    )}

                    {/* Opinions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-green-500/5 border border-green-500/20">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="w-5 h-5 rounded-md bg-green-500/20 text-green-400 flex items-center justify-center text-[10px] font-bold">BD</span>
                                <span className="text-[10px] font-bold text-green-400">Buddy (PM)</span>
                            </div>
                            <p className="text-xs text-white/60">{model.buddyOpinion}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="w-5 h-5 rounded-md bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-bold">CL</span>
                                <span className="text-[10px] font-bold text-cyan-400">Claude (CTO)</span>
                            </div>
                            <p className="text-xs text-white/60">{model.claudeOpinion}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════
   SUMMARY SECTION
   ═══════════════════════════════════ */
function StrategySummary() {
    return (
        <div className="glass-card p-6 col-span-full border-2 border-green-500/30" style={{ background: "linear-gradient(135deg, rgba(52,211,153,0.08), rgba(34,211,238,0.03))" }}>
            <div className="flex items-start gap-4">
                <div className="text-4xl">🎯</div>
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-green-400 mb-2">Strategie-Fazit (Claude + Buddy aligned)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="p-3 rounded-xl bg-white/5">
                            <h4 className="text-sm font-bold text-white mb-1">Phase 1: JETZT</h4>
                            <p className="text-xs text-white/60">AI Automation via Upwork. 30 Proposals raus. Demo-Bot als Showcase. Einstiegs-Jobs (50-300 EUR) fuer Reviews.</p>
                            <div className="mt-2 text-[10px] text-green-400 font-bold">→ Aktuelle Strategie</div>
                        </div>
                        <div className="p-3 rounded-xl bg-white/5">
                            <h4 className="text-sm font-bold text-white mb-1">Phase 2: Nach 30 Reps</h4>
                            <p className="text-xs text-white/60">Productized Service auf eigener Website. White-Label fuer Agencies. n8n Templates als passive Revenue.</p>
                            <div className="mt-2 text-[10px] text-indigo-400 font-bold">→ Evaluation nach Daten</div>
                        </div>
                        <div className="p-3 rounded-xl bg-white/5">
                            <h4 className="text-sm font-bold text-white mb-1">Phase 3: Skalierung</h4>
                            <p className="text-xs text-white/60">Voice AI, Micro-SaaS, Consulting. Nur wenn Phase 1 + 2 validiert sind.</p>
                            <div className="mt-2 text-[10px] text-white/30 font-bold">→ Langfristiges Potenzial</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════
   RANKING TABLE
   ═══════════════════════════════════ */
function RankingTable({ models, onSelect }) {
    const sorted = [...models].sort((a, b) => {
        // Active first, then by fit desc, then by revenueMax desc
        if (a.status === "active" && b.status !== "active") return -1;
        if (b.status === "active" && a.status !== "active") return 1;
        if (b.fit !== a.fit) return b.fit - a.fit;
        return b.revenueMax - a.revenueMax;
    });

    return (
        <div className="glass-card p-6 col-span-full overflow-x-auto">
            <h3 className="text-lg font-bold text-white mb-4">Ranking-Uebersicht</h3>
            <table className="w-full text-sm min-w-[700px]">
                <thead>
                    <tr className="text-left text-white/40 border-b border-white/10">
                        <th className="pb-3 pr-3">#</th>
                        <th className="pb-3 pr-3">Business-Modell</th>
                        <th className="pb-3 pr-3 text-center">Fit</th>
                        <th className="pb-3 pr-3 text-right">Revenue/Mo</th>
                        <th className="pb-3 pr-3 text-center">Schwierigkeit</th>
                        <th className="pb-3 pr-3">Time to $</th>
                        <th className="pb-3 text-center">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {sorted.map((m, i) => {
                        const sc = statusConfig[m.status];
                        return (
                            <tr
                                key={m.id}
                                onClick={() => onSelect(m.id)}
                                className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-all"
                                style={m.status === "active" ? { backgroundColor: "rgba(52,211,153,0.05)" } : {}}
                            >
                                <td className="py-3 pr-3 text-white/30 text-xs">{i + 1}</td>
                                <td className="py-3 pr-3">
                                    <div className="text-white font-medium text-sm">{m.name}</div>
                                    <div className="text-[10px] text-white/30">{m.category}</div>
                                </td>
                                <td className="py-3 pr-3 text-center">
                                    <span className="text-base font-black" style={{ color: m.fit >= 8 ? "#34d399" : m.fit >= 6 ? "#fbbf24" : "#f87171" }}>
                                        {m.fit}
                                    </span>
                                </td>
                                <td className="py-3 pr-3 text-right text-white/80">
                                    {m.revenueMax > 0 ? `${(m.revenueMin / 1000).toFixed(0)}-${(m.revenueMax / 1000).toFixed(0)}k` : "—"}
                                </td>
                                <td className="py-3 pr-3 text-center">
                                    <span style={{ color: difficultyColor[m.difficulty] }}>
                                        {"●".repeat(m.difficulty)}{"○".repeat(5 - m.difficulty)}
                                    </span>
                                </td>
                                <td className="py-3 pr-3 text-white/60 text-xs">{m.timeToRevenue}</td>
                                <td className="py-3 text-center">
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ backgroundColor: sc.bg, color: sc.color }}>
                                        {sc.label}
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

/* ═══════════════════════════════════
   FILTER BAR
   ═══════════════════════════════════ */
function FilterBar({ activeFilter, setActiveFilter }) {
    const filters = [
        { key: "all", label: "Alle", count: businessModels.length },
        { key: "active", label: "Aktiv", count: businessModels.filter((m) => m.status === "active").length },
        { key: "evaluate", label: "Pruefen", count: businessModels.filter((m) => m.status === "evaluate").length },
        { key: "later", label: "Spaeter", count: businessModels.filter((m) => m.status === "later").length },
        { key: "skip", label: "Skip", count: businessModels.filter((m) => m.status === "skip").length },
    ];
    return (
        <div className="flex flex-wrap gap-2 mb-6">
            {filters.map((f) => (
                <button
                    key={f.key}
                    onClick={() => setActiveFilter(f.key)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                    style={{
                        backgroundColor: activeFilter === f.key ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.05)",
                        color: activeFilter === f.key ? "#818cf8" : "rgba(255,255,255,0.5)",
                        border: `1px solid ${activeFilter === f.key ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.08)"}`,
                    }}
                >
                    {f.label} ({f.count})
                </button>
            ))}
        </div>
    );
}

/* ═══════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════ */
export default function BusinessModelsPage() {
    const [activeFilter, setActiveFilter] = useState("all");
    const [expandedId, setExpandedId] = useState(null);
    const [view, setView] = useState("cards"); // "cards" or "table"

    const filtered = activeFilter === "all" ? businessModels : businessModels.filter((m) => m.status === activeFilter);

    const handleSelect = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Business-Modelle</h1>
                    <p className="text-sm text-white/50">Marktforschung: 12 AI-Geschaeftsmodelle im Vergleich</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setView("cards")}
                        className="px-3 py-2 rounded-lg text-sm transition-all"
                        style={{
                            backgroundColor: view === "cards" ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.05)",
                            color: view === "cards" ? "#818cf8" : "rgba(255,255,255,0.5)",
                        }}
                    >
                        Karten
                    </button>
                    <button
                        onClick={() => setView("table")}
                        className="px-3 py-2 rounded-lg text-sm transition-all"
                        style={{
                            backgroundColor: view === "table" ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.05)",
                            color: view === "table" ? "#818cf8" : "rgba(255,255,255,0.5)",
                        }}
                    >
                        Tabelle
                    </button>
                </div>
            </div>

            {/* Strategy Summary */}
            <div className="mb-6">
                <StrategySummary />
            </div>

            {/* Filter */}
            <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

            {/* Content */}
            {view === "table" ? (
                <RankingTable models={filtered} onSelect={handleSelect} />
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {filtered.map((model) => (
                        <ModelCard
                            key={model.id}
                            model={model}
                            expanded={expandedId === model.id}
                            onToggle={() => handleSelect(model.id)}
                        />
                    ))}
                </div>
            )}

            {/* Bottom Note */}
            <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-white/40 leading-relaxed">
                    <span className="text-white font-bold">Direktive #11 (30-Reps):</span> Keine Strategie-Aenderung vor 30 Proposals.
                    Diese Uebersicht dient als Entscheidungsgrundlage — die aktuelle Strategie (AI Automation via Upwork) bleibt bis zur Auswertung.
                    Datenstand: 14.03.2026 | Quellen: Upwork, Fiverr, Gartner, Grand View Research
                </p>
            </div>
        </div>
    );
}
