"use client";

import { revenueStrategy } from "../data";

/* ═══════════════════════════════════ */
/* OUTBOUND HEARTBEAT — Taegliche Aktion */
/* ═══════════════════════════════════ */
function OutboundHeartbeat() {
    const targets = revenueStrategy.dailyTargets;
    const total = Object.values(targets).reduce((s, t) => s + t.done, 0);
    const totalTarget = Object.values(targets).reduce((s, t) => s + t.target, 0);
    const pct = totalTarget > 0 ? Math.round((total / totalTarget) * 100) : 0;
    const heartColor = pct >= 80 ? "#34d399" : pct >= 40 ? "#fbbf24" : "#f87171";

    return (
        <div className="glass-card p-6 col-span-full border-2 transition-all" style={{ borderColor: heartColor + "44", background: `linear-gradient(135deg, ${heartColor}08, ${heartColor}03)` }}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="text-4xl animate-pulse" style={{ animationDuration: pct > 0 ? "1s" : "3s" }}>
                        {pct >= 80 ? "💚" : pct >= 40 ? "💛" : "❤️"}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Outbound Heartbeat</h3>
                        <p className="text-sm text-white/40">Taeglich machen, nicht planen. Jede Aktion zaehlt.</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-4xl font-black" style={{ color: heartColor }}>
                        {total}<span className="text-lg text-white/30">/{totalTarget}</span>
                    </div>
                    <div className="text-xs text-white/40">Aktionen heute</div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {Object.entries(targets).map(([key, t]) => {
                    const itemPct = t.target > 0 ? Math.round((t.done / t.target) * 100) : 0;
                    const itemColor = itemPct >= 80 ? "#34d399" : itemPct >= 40 ? "#fbbf24" : "#f87171";
                    return (
                        <div key={key} className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-lg">{t.icon}</span>
                                <span className="text-2xl font-black" style={{ color: itemColor }}>
                                    {t.done}<span className="text-sm text-white/30">/{t.target}</span>
                                </span>
                            </div>
                            <div className="text-sm text-white/70">{t.label}</div>
                            <div className="w-full h-2 rounded-full bg-white/10 mt-2 overflow-hidden">
                                <div className="h-full rounded-full transition-all" style={{ width: `${Math.max(itemPct, 2)}%`, background: itemColor }} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════ */
/* MULTI-CHANNEL STRATEGIE              */
/* ═══════════════════════════════════ */
function ChannelStrategy() {
    const channels = revenueStrategy.channels;
    return (
        <div className="glass-card p-6 col-span-full">
            <h3 className="text-lg font-bold text-white mb-2">Multi-Channel Strategie</h3>
            <p className="text-sm text-white/40 mb-5">Nicht nur eine Quelle. Drei Kanaele, gewichtet nach ROI.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {channels.map((ch) => {
                    const statusColor = ch.status === "ready" ? "#34d399" : ch.status === "passive" ? "#fbbf24" : "#6366f1";
                    const statusLabel = ch.status === "ready" ? "Aktiv" : ch.status === "passive" ? "Passiv" : "Setup";
                    return (
                        <div key={ch.name} className="p-5 rounded-xl border border-white/10 bg-white/3 hover:bg-white/5 transition-all relative overflow-hidden">
                            {/* Split Percentage */}
                            <div className="absolute top-3 right-3 text-3xl font-black" style={{ color: ch.color + "33" }}>
                                {ch.split}%
                            </div>
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-2xl">{ch.icon}</span>
                                <div>
                                    <h4 className="text-sm font-bold text-white">{ch.name}</h4>
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ backgroundColor: statusColor + "22", color: statusColor }}>
                                        {statusLabel}
                                    </span>
                                </div>
                            </div>
                            <p className="text-xs text-white/50 mb-3">{ch.description}</p>
                            <div className="space-y-1.5 text-xs">
                                <div className="flex justify-between"><span className="text-white/40">Reply Rate</span><span className="text-green-400 font-semibold">{ch.replyRate}</span></div>
                                <div className="flex justify-between"><span className="text-white/40">Fee</span><span className="text-white/70">{ch.fee}</span></div>
                                <div className="flex justify-between"><span className="text-white/40">Tools</span><span className="text-white/50">{ch.tools}</span></div>
                            </div>
                            {/* Split bar */}
                            <div className="w-full h-2 rounded-full bg-white/10 mt-3 overflow-hidden">
                                <div className="h-full rounded-full" style={{ width: `${ch.split}%`, background: ch.color }} />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-4 p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300">
                <strong>Warum diese Gewichtung?</strong> Direct Outreach hat 5-10x hoehere Conversion als Plattform-Proposals. Upwork-Kunden haben aber hoehere Kaufabsicht. Fiverr = kostenloses Lotterielos (Boost-Window 7-10 Tage).
            </div>
        </div>
    );
}

/* ═══════════════════════════════════ */
/* TEST-NISCHEN                         */
/* ═══════════════════════════════════ */
function TestNiches() {
    const niches = revenueStrategy.testNiches;
    const colors = ["#6366f1", "#22d3ee", "#34d399"];
    return (
        <div className="glass-card p-6 col-span-full">
            <h3 className="text-lg font-bold text-white mb-2">3 Test-Nischen (parallel)</h3>
            <p className="text-sm text-white/40 mb-5">Nicht eine Nische raten — drei testen und Daten sammeln.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {niches.map((n, i) => (
                    <div key={i} className="p-5 rounded-xl border transition-all hover:bg-white/5" style={{ borderColor: colors[i] + "33" }}>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black" style={{ backgroundColor: colors[i] + "22", color: colors[i] }}>
                                {i + 1}
                            </div>
                            <h4 className="text-sm font-bold text-white">{n.name}</h4>
                        </div>
                        <p className="text-xs text-white/50 mb-3">{n.reason}</p>
                        <div className="p-2 rounded-lg bg-white/5 text-[10px] text-white/30">
                            <strong className="text-white/50">Suchbegriffe:</strong> {n.searchTerms}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════ */
/* PROPOSAL COUNTER                     */
/* ═══════════════════════════════════ */
function ProposalCounter({ current, target }) {
    const pct = Math.round((current / target) * 100);
    return (
        <div className="glass-card p-6 col-span-full">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-2xl font-bold text-white">Proposal Counter</h3>
                    <p className="text-sm text-white/50">30-Reps-Regel — Kein Pivot vor 30 echten Markt-Interaktionen</p>
                </div>
                <div className="text-5xl font-black" style={{ color: current >= target ? "#34d399" : current > 0 ? "#6366f1" : "#f87171" }}>
                    {current}<span className="text-2xl text-white/40">/{target}</span>
                </div>
            </div>
            <div className="w-full h-4 rounded-full bg-white/10 overflow-hidden">
                <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                        width: `${Math.max(pct, 2)}%`,
                        background: pct >= 100 ? "linear-gradient(90deg, #34d399, #22d3ee)" : pct > 0 ? "linear-gradient(90deg, #6366f1, #22d3ee)" : "#f87171",
                    }}
                />
            </div>
            <div className="flex justify-between mt-2 text-xs text-white/40">
                <span>Start</span>
                <span>{pct}% — {target - current} noch offen</span>
                <span>Ziel: 30</span>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════ */
/* COUNTDOWN + REVENUE CARDS            */
/* ═══════════════════════════════════ */
function CountdownCard() {
    const now = new Date();
    const end = new Date(revenueStrategy.algEndDate);
    const days = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const urgency = days <= 14 ? "#f87171" : days <= 28 ? "#fbbf24" : "#34d399";
    return (
        <div className="glass-card p-6">
            <h3 className="text-sm text-white/50 mb-2">ALG Countdown</h3>
            <div className="text-5xl font-black mb-1" style={{ color: urgency }}>{days}</div>
            <div className="text-sm text-white/60">Tage verbleibend</div>
            <div className="text-xs text-white/40 mt-2">{weeks} Wochen bis 21.04.2026</div>
            <div className="w-full h-2 rounded-full bg-white/10 mt-3 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${Math.max(0, 100 - (days / 38) * 100)}%`, background: urgency }} />
            </div>
        </div>
    );
}

function RevenueTarget() {
    const earned = 0;
    const target = revenueStrategy.monthlyTarget;
    const pct = Math.round((earned / target) * 100);
    return (
        <div className="glass-card p-6">
            <h3 className="text-sm text-white/50 mb-2">Revenue (aktuell)</h3>
            <div className="text-4xl font-black text-white mb-1">{earned} <span className="text-lg text-white/40">EUR</span></div>
            <div className="text-sm text-white/60">Ziel: {target} EUR/Monat</div>
            <div className="w-full h-2 rounded-full bg-white/10 mt-3 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
}

function MarketPulse() {
    const md = revenueStrategy.marketData;
    return (
        <div className="glass-card p-6">
            <h3 className="text-sm text-white/50 mb-3">Markt-Puls</h3>
            <div className="space-y-2">
                <div className="flex justify-between text-sm"><span className="text-white/40">AI Jobs (Upwork)</span><span className="text-green-400 font-bold">{md.upworkJobs}+</span></div>
                <div className="flex justify-between text-sm"><span className="text-white/40">AI Integration</span><span className="text-green-400 font-bold">+{md.aiIntegrationGrowth}% YoY</span></div>
                <div className="flex justify-between text-sm"><span className="text-white/40">AI Video</span><span className="text-green-400 font-bold">+{md.aiVideoGrowth}% YoY</span></div>
                <div className="flex justify-between text-sm"><span className="text-white/40">AI Premium</span><span className="text-cyan-400 font-bold">+{md.avgFreelancerPremium}% Gehalt</span></div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════ */
/* VIDEO STRATEGY (HeyGen A/B Test)    */
/* ═══════════════════════════════════ */
function VideoStrategy() {
    const vs = revenueStrategy.videoStrategy;
    return (
        <div className="glass-card p-6 col-span-full border border-purple-500/20" style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.06), rgba(139,92,246,0.02))" }}>
            <div className="flex items-start gap-4">
                <div className="text-3xl">🎬</div>
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-white">Video-Proposals (A/B Test)</h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-400">
                            {vs.status === "testing" ? "Geplant" : "Aktiv"}
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                            <span className="text-white/40">Tool:</span> <span className="text-white">{vs.tool}</span>
                            <br /><span className="text-white/40">Kosten:</span> <span className="text-white/70 text-xs">{vs.cost}</span>
                        </div>
                        <div>
                            <span className="text-white/40">Impact:</span>
                            <div className="text-green-400 text-xs font-semibold mt-1">{vs.impactData}</div>
                        </div>
                        <div>
                            <span className="text-white/40">Plan:</span>
                            <div className="text-white/70 text-xs mt-1">{vs.plan}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════ */
/* PLAYBOOK — Wenn-Dann Checkliste     */
/* ═══════════════════════════════════ */
function Playbook() {
    const steps = [
        { nr: 1, title: "Leads finden", subtitle: "20 Adressen/Tag aus 3 Nischen", details: "Apollo.io/Google Maps fuer E-Commerce, Handwerker, Coaches. LinkedIn fuer Entscheider. Upwork fuer aktive Jobs.", status: "ready", icon: "🔍" },
        { nr: 2, title: "Outreach senden", subtitle: "10 Emails + 3 Proposals/Tag", details: "Cold Email mit Demo-Link. Upwork Proposals mit Template. Personalisierung: Firmenname + konkretes Problem.", status: "ready", icon: "📨" },
        { nr: 3, title: "Kunde antwortet", subtitle: "4 Fragen klaeren", details: "Scope, Input, Output, Fallback klaeren. Bei technischen Fragen: 2-Stunden-Regel.", status: "waiting", icon: "💬" },
        { nr: 4, title: "Kunde sagt JA", subtitle: "Onboarding-Formular senden", details: "5 Fragen: Website-URL, Top-10 Kundenfragen, Sprache, Bot-Placement, Ansprechpartner.", status: "waiting", icon: "🤝" },
        { nr: 5, title: "Claude baut", subtitle: "Bot in n8n erstellen (2-48h)", details: "Claude bekommt Formular-Daten, baut n8n-Workflow, testet. Du pruefst Ergebnis.", status: "waiting", icon: "🔧" },
        { nr: 6, title: "Auslieferung", subtitle: "Bot deployen + Kunde informieren", details: "Webhook-URL geben. Kurze Anleitung. Auf Plattform als Delivered markieren.", status: "waiting", icon: "🚀" },
        { nr: 7, title: "Review kassieren", subtitle: "5-Sterne = naechster Kunde leichter", details: "Freundlich um Review bitten. Testimonial fuer Website anfragen.", status: "waiting", icon: "⭐" },
    ];

    const statusColor = { ready: "#34d399", waiting: "#6366f1", done: "#22d3ee" };
    const statusLabel = { ready: "Bereit", waiting: "Wartet", done: "Erledigt" };

    return (
        <div className="glass-card p-6 col-span-full">
            <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-bold text-white">Playbook: Vom Lead zum Geld</h3>
                <span className="px-2 py-1 rounded-full text-xs bg-indigo-500/20 text-indigo-300">7 Schritte</span>
            </div>
            <p className="text-sm text-white/40 mb-6">Fuer JEDEN Auftrag — egal ob Outreach oder Upwork.</p>

            <div className="space-y-3">
                {steps.map((s) => (
                    <div key={s.nr} className="flex items-start gap-4 p-4 rounded-xl border transition-all hover:bg-white/5"
                        style={{ borderColor: s.status === "ready" ? statusColor.ready + "44" : "rgba(255,255,255,0.08)" }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                            style={{ backgroundColor: statusColor[s.status] + "22" }}>
                            {s.icon}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs text-white/30">Schritt {s.nr}</span>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                                    style={{ backgroundColor: statusColor[s.status] + "22", color: statusColor[s.status] }}>
                                    {statusLabel[s.status]}
                                </span>
                            </div>
                            <h4 className="text-sm font-semibold text-white">{s.title}</h4>
                            <p className="text-xs text-white/50 mt-0.5">{s.subtitle}</p>
                            <p className="text-xs text-white/30 mt-2 leading-relaxed">{s.details}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════ */
/* 4 FRAGEN                            */
/* ═══════════════════════════════════ */
function FourQuestions() {
    const questions = [
        { nr: 1, q: "Was soll es tun?", hint: "Max 2 klare Aktionen. Beispiel: 'Kundenanfragen beantworten + an Support weiterleiten'", icon: "🎯", color: "#6366f1" },
        { nr: 2, q: "Woher kommen die Daten?", hint: "Website, PDF, API, Google Sheet? KEIN Altsystem ohne API annehmen!", icon: "📥", color: "#22d3ee" },
        { nr: 3, q: "Wo soll das Ergebnis hin?", hint: "E-Mail, Slack, Excel, Chat-Widget auf Website?", icon: "📤", color: "#34d399" },
        { nr: 4, q: "Was wenn die KI es nicht weiss?", hint: "IMMER: Eskalation an Menschen. 'Ich leite Sie an einen Mitarbeiter weiter.'", icon: "🛡️", color: "#fbbf24" },
    ];
    return (
        <div className="glass-card p-6 col-span-full">
            <h3 className="text-lg font-bold text-white mb-2">4 Fragen vor jedem Auftrag</h3>
            <p className="text-sm text-white/40 mb-5">Wenn du diese 4 Fragen beantworten kannst, nimm den Auftrag an.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions.map((q) => (
                    <div key={q.nr} className="p-4 rounded-xl border border-white/10 bg-white/3 hover:bg-white/5 transition-all">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">{q.icon}</span>
                            <span className="text-sm font-bold" style={{ color: q.color }}>Frage {q.nr}</span>
                        </div>
                        <h4 className="text-white font-semibold mb-1">{q.q}</h4>
                        <p className="text-xs text-white/40 leading-relaxed">{q.hint}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════ */
/* 2-STUNDEN-REGEL                     */
/* ═══════════════════════════════════ */
function SafetyNet() {
    return (
        <div className="glass-card p-6 col-span-full border-2 border-yellow-500/30" style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.05), rgba(251,191,36,0.02))" }}>
            <div className="flex items-start gap-4">
                <div className="text-4xl">🛡️</div>
                <div>
                    <h3 className="text-lg font-bold text-yellow-400 mb-2">Die 2-Stunden-Regel</h3>
                    <p className="text-sm text-white/70 mb-3">Bei JEDER technischen Frage die du nicht sofort beantworten kannst:</p>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-3">
                        <p className="text-white italic text-sm">
                            &quot;Das klingt machbar. Ich spreche das kurz mit meinem Lead-Developer durch und bestaetige Ihnen die technische Umsetzung in 2 Stunden.&quot;
                        </p>
                    </div>
                    <p className="text-xs text-white/40">
                        Du bist der <span className="text-cyan-400 font-semibold">Projektmanager</span>. Claude ist der <span className="text-indigo-400 font-semibold">Entwickler</span>. Du musst NICHTS live entscheiden.
                    </p>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════ */
/* EINSTIEGS-JOBS                      */
/* ═══════════════════════════════════ */
function StarterJobs() {
    const jobs = [
        { title: "Webhook-Verbindung", budget: "50-150 EUR", time: "1-2h", example: "Typeform/Google Form an Slack/Sheets anbinden", difficulty: "Sehr einfach", diffColor: "#34d399", search: "n8n webhook integration" },
        { title: "E-Mail-Klassifizierung", budget: "100-200 EUR", time: "2-4h", example: "Eingehende Mails lesen + weiterleiten", difficulty: "Einfach", diffColor: "#22d3ee", search: "email classification AI" },
        { title: "FAQ-Bot (wie unsere Demo)", budget: "150-300 EUR", time: "3-6h", example: "Kundenservice-Bot mit 10-20 FAQ", difficulty: "Mittel", diffColor: "#fbbf24", search: "chatbot FAQ support" },
    ];
    return (
        <div className="glass-card p-6 col-span-full">
            <h3 className="text-lg font-bold text-white mb-2">Einstiegs-Jobs (Bewertungen aufbauen)</h3>
            <p className="text-sm text-white/40 mb-5">Nach 3-5 Reviews: 500+ EUR Jobs. Nach 10+: Retainer-Kunden.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {jobs.map((j, i) => (
                    <div key={i} className="p-5 rounded-xl border border-white/10 bg-white/3 hover:bg-white/5 transition-all">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xl font-black text-white">{j.budget}</span>
                            <span className="px-2 py-1 rounded-full text-[10px] font-bold" style={{ backgroundColor: j.diffColor + "22", color: j.diffColor }}>{j.difficulty}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-cyan-400 mb-1">{j.title}</h4>
                        <p className="text-xs text-white/50 mb-2">{j.example}</p>
                        <div className="text-xs text-white/30 pt-2 border-t border-white/5">Claude: {j.time} | Suche: {j.search}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════ */
/* WEEK PLAN                           */
/* ═══════════════════════════════════ */
function WeekPlan() {
    const statusIcon = { "in-progress": "🔵", pending: "⚪", done: "✅" };
    return (
        <div className="glass-card p-6 col-span-full">
            <h3 className="text-lg font-bold text-white mb-4">5-Wochen Schlachtplan</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {revenueStrategy.weekPlan.map((w) => (
                    <div key={w.week} className="p-4 rounded-xl border transition-all"
                        style={{
                            borderColor: w.status === "in-progress" ? "#6366f1" : "rgba(255,255,255,0.1)",
                            backgroundColor: w.status === "in-progress" ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.03)",
                        }}>
                        <div className="flex items-center gap-2 mb-2">
                            <span>{statusIcon[w.status]}</span>
                            <span className="text-sm font-bold text-white">Woche {w.week}</span>
                        </div>
                        <div className="text-xs text-white/50 mb-2">{w.dates}</div>
                        <div className="text-sm text-white/80 mb-2">{w.focus}</div>
                        <div className="text-xs font-semibold px-2 py-1 rounded-full bg-white/10 text-cyan-400 inline-block">{w.target}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════ */
/* PIPELINE                            */
/* ═══════════════════════════════════ */
function PipelineBoard() {
    const pipeline = revenueStrategy.pipeline;
    const stages = revenueStrategy.pipelineStages;
    const stageColors = ["#6366f1", "#22d3ee", "#fbbf24", "#f97316", "#34d399", "#f87171"];

    if (pipeline.length === 0) {
        return (
            <div className="glass-card p-6 col-span-full">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">Sales Pipeline</h3>
                    <span className="text-sm text-white/40">0 Leads</span>
                </div>
                {/* Show empty stages */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
                    {stages.map((stage, i) => (
                        <div key={stage} className="p-3 rounded-xl border border-white/10 text-center">
                            <div className="text-2xl font-black" style={{ color: stageColors[i] + "66" }}>0</div>
                            <div className="text-[10px] text-white/40 mt-1">{stage}</div>
                        </div>
                    ))}
                </div>
                <div className="text-center py-6">
                    <div className="text-4xl mb-3">📭</div>
                    <div className="text-white/50 text-lg">Noch keine Leads</div>
                    <div className="text-white/30 text-sm mt-1">Starte mit Outreach → Leads kommen automatisch hier rein</div>
                </div>
            </div>
        );
    }

    return (
        <div className="glass-card p-6 col-span-full">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Sales Pipeline</h3>
                <span className="text-sm text-white/40">{pipeline.length} Leads</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {stages.map((stage, i) => {
                    const stageLeads = pipeline.filter((p) => p.stage === stage);
                    return (
                        <div key={stage} className="p-3 rounded-xl border border-white/10">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold" style={{ color: stageColors[i] }}>{stage}</span>
                                <span className="text-xs text-white/40">{stageLeads.length}</span>
                            </div>
                            <div className="space-y-2">
                                {stageLeads.map((lead, j) => (
                                    <div key={j} className="p-2 rounded-lg bg-white/5 text-xs">
                                        <div className="text-white font-semibold truncate">{lead.client}</div>
                                        <div className="text-white/40">{lead.budget}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════ */
/* MARKT & PREISE                      */
/* ═══════════════════════════════════ */
function MarketAndProducts() {
    const md = revenueStrategy.marketData;
    return (
        <div className="glass-card p-6 col-span-full">
            <h3 className="text-lg font-bold text-white mb-4">Markt & Preise</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 className="text-sm text-white/50 mb-3">Marktdaten (aktualisiert)</h4>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm"><span className="text-white/60">Globaler AI Support Markt</span><span className="font-bold text-white">{md.totalMarket}</span></div>
                        <div className="flex justify-between text-sm"><span className="text-white/60">Offene AI-Jobs (Upwork)</span><span className="font-bold text-green-400">{md.upworkJobs}+</span></div>
                        <div className="flex justify-between text-sm"><span className="text-white/60">AI Integration Wachstum</span><span className="font-bold text-green-400">+{md.aiIntegrationGrowth}% YoY</span></div>
                        <div className="flex justify-between text-sm"><span className="text-white/60">AI Chatbot Wachstum</span><span className="font-bold text-green-400">+{md.aiChatbotGrowth}% YoY</span></div>
                        <div className="flex justify-between text-sm"><span className="text-white/60">AI Freelancer Premium</span><span className="font-bold text-cyan-400">+{md.avgFreelancerPremium}% mehr Gehalt</span></div>
                        <div className="flex justify-between text-sm"><span className="text-white/60">KMU Kostenersparnis</span><span className="font-bold text-cyan-400">{md.costSaving}</span></div>
                    </div>
                </div>
                <div>
                    <h4 className="text-sm text-white/50 mb-3">Unsere Preise (ab Review #5+)</h4>
                    <div className="space-y-2">
                        {revenueStrategy.products.map((p, i) => (
                            <div key={i} className="flex justify-between items-center p-2 rounded-lg bg-white/5 text-sm">
                                <div>
                                    <span className="text-white font-semibold">{p.name}</span>
                                    <span className="text-white/30 ml-2 text-xs">{p.delivery}</span>
                                </div>
                                <span className="text-cyan-400 font-bold">{p.price}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-3 p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-xs text-yellow-400">
                        Einstieg: 250 EUR fuer erste 3 Kunden gegen Testimonial
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════ */
/* MAIN REVENUE PAGE                   */
/* ═══════════════════════════════════ */
export default function RevenuePage() {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Revenue Strategy</h1>
                    <p className="text-sm text-white/50">Multi-Channel: Outreach + Upwork + Fiverr (passiv)</p>
                </div>
                <a href="https://prompttools.co/demo/" target="_blank" rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
                    style={{ background: "linear-gradient(135deg, #6366f1, #22d3ee)" }}>
                    Live Demo →
                </a>
            </div>

            {/* 1. Outbound Heartbeat — das Wichtigste zuerst */}
            <div className="grid grid-cols-1 gap-4 mb-4">
                <OutboundHeartbeat />
            </div>

            {/* 2. Counter + Stats */}
            <div className="grid grid-cols-1 gap-4 mb-4">
                <ProposalCounter current={revenueStrategy.proposalCounter.current} target={revenueStrategy.proposalCounter.target} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <CountdownCard />
                <RevenueTarget />
                <MarketPulse />
            </div>

            {/* 3. Multi-Channel Strategie */}
            <div className="grid grid-cols-1 gap-4 mb-4">
                <ChannelStrategy />
            </div>

            {/* 4. Test-Nischen */}
            <div className="grid grid-cols-1 gap-4 mb-4">
                <TestNiches />
            </div>

            {/* 5. Video-Strategie */}
            <div className="grid grid-cols-1 gap-4 mb-4">
                <VideoStrategy />
            </div>

            {/* 6. Sicherheitsnetz */}
            <div className="grid grid-cols-1 gap-4 mb-4">
                <SafetyNet />
            </div>

            {/* 7. Playbook */}
            <div className="grid grid-cols-1 gap-4 mb-4">
                <Playbook />
            </div>

            {/* 8. 4 Fragen */}
            <div className="grid grid-cols-1 gap-4 mb-4">
                <FourQuestions />
            </div>

            {/* 9. Einstiegs-Jobs */}
            <div className="grid grid-cols-1 gap-4 mb-4">
                <StarterJobs />
            </div>

            {/* 10. Pipeline */}
            <div className="grid grid-cols-1 gap-4 mb-4">
                <PipelineBoard />
            </div>

            {/* 11. Wochen-Plan */}
            <div className="grid grid-cols-1 gap-4 mb-4">
                <WeekPlan />
            </div>

            {/* 12. Markt & Preise */}
            <div className="grid grid-cols-1 gap-4 mb-4">
                <MarketAndProducts />
            </div>
        </div>
    );
}
