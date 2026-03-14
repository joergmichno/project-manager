"use client";

import { useState } from "react";

const niches = [
    { id: 1, name: "E-Commerce", en: "Online Shops", fit: 9, tier: 1, budget: "1-5k", mrr: "100-300", market: "80-460k", difficulty: "Einfach", competition: "Hoch", mrrPot: "Hoch", pain: "24/7 Support, Retouren, Bestellstatus", useCase: "FAQ-Bot, Order-Tracking, Retouren-Automation", findAt: "Upwork, Shopify Communities, LinkedIn", color: "#6366f1" },
    { id: 2, name: "Immobilienmakler", en: "Real Estate", fit: 9, tier: 1, budget: "1.5-4k", mrr: "150-400", market: "42k", difficulty: "Einfach", competition: "Mittel", mrrPot: "Hoch", pain: "Lead-Qualifizierung (80% unqualifiziert)", useCase: "Lead-Qualifier, Expose-Versand, Besichtigungstermine", findAt: "ImmobilienScout24, LinkedIn, Google Maps", color: "#22d3ee" },
    { id: 3, name: "Coaches / Berater", en: "Consultants", fit: 9, tier: 1, budget: "0.8-3k", mrr: "100-300", market: "70k+", difficulty: "Einfach", competition: "Mittel", mrrPot: "Hoch", pain: "Erstgespraechs-Qualifizierung, Lead-Nurturing", useCase: "Qualifizierungs-Bot, Buchung, Content-Delivery", findAt: "LinkedIn, Instagram, Facebook-Gruppen", color: "#34d399" },
    { id: 4, name: "Rechtsanwaelte", en: "Law Firms", fit: 8, tier: 1, budget: "2-6k", mrr: "200-500", market: "166k", difficulty: "Mittel", competition: "Niedrig", mrrPot: "Sehr hoch", pain: "Mandanten-Erstberatung, Terminbuchung", useCase: "Intake-Bot, Fall-Qualifizierung, Dokumenten-Sammlung", findAt: "BRAK, Anwalt.de, LinkedIn", color: "#f59e0b" },
    { id: 5, name: "Steuerberater", en: "Tax Advisors", fit: 8, tier: 1, budget: "2-5k", mrr: "200-400", market: "50k", difficulty: "Mittel", competition: "Niedrig", mrrPot: "Sehr hoch", pain: "Saisonale Ueberlastung, Belegannahme", useCase: "WhatsApp Beleg-Upload, FAQ, Erinnerungen", findAt: "StBK, LinkedIn, DATEV-Community", color: "#ec4899" },
    { id: 6, name: "Personalvermittler", en: "Recruiters", fit: 8, tier: 1, budget: "1.5-5k", mrr: "200-500", market: "7k", difficulty: "Einfach", competition: "Mittel", mrrPot: "Hoch", pain: "CV-Screening, Kandidaten-Kommunikation", useCase: "Bewerber-Screening-Bot, Interview-Buchung", findAt: "LinkedIn, Upwork, HR-Events", color: "#8b5cf6" },
    { id: 7, name: "Hausverwaltungen", en: "Property Mgmt", fit: 8, tier: 1, budget: "1.5-4k", mrr: "150-400", market: "29k", difficulty: "Mittel", competition: "Sehr niedrig", mrrPot: "Sehr hoch", pain: "Mieteranfragen, Handwerker-Koordination", useCase: "Mieter-Bot, Schadensmeldung, Handwerker-Dispatch", findAt: "VDIV, Google Maps, LinkedIn", color: "#14b8a6" },
    { id: 8, name: "B2B Grosshandel", en: "Wholesalers", fit: 7, tier: 2, budget: "2-6k", mrr: "200-500", market: "130k", difficulty: "Mittel", competition: "Mittel", mrrPot: "Hoch", pain: "Bestellannahme, Preis-Auskunft", useCase: "Bestell-Bot, Preis/Verfuegbarkeit, Nachbestellungen", findAt: "BGL, LinkedIn, Frachtboersen", color: "#6366f1" },
    { id: 9, name: "Tierarztpraxen", en: "Veterinary", fit: 7, tier: 2, budget: "1-3k", mrr: "100-200", market: "6.8k", difficulty: "Mittel", competition: "Niedrig", mrrPot: "Hoch", pain: "Notfall-Triage, Terminbuchung", useCase: "Symptom-Check, Termin, Impf-Erinnerungen", findAt: "Google Maps, Jameda, LinkedIn", color: "#22d3ee" },
    { id: 10, name: "Handwerker", en: "Tradespeople", fit: 7, tier: 2, budget: "0.5-2k", mrr: "50-150", market: "1.038k", difficulty: "Schwer", competition: "Niedrig", mrrPot: "Mittel", pain: "Verpasste Anrufe, Terminplanung", useCase: "Anfrage-Bot, Termin-Buchung, Angebote", findAt: "MyHammer, Google Maps, Facebook", color: "#34d399" },
    { id: 11, name: "Zahnarztpraxen", en: "Dental", fit: 7, tier: 2, budget: "1.5-4k", mrr: "150-350", market: "36k", difficulty: "Mittel", competition: "Niedrig", mrrPot: "Hoch", pain: "Termine, No-Shows, Recall", useCase: "Termin-Bot, Recall-System, Kosten-Info", findAt: "Jameda, Google Maps, Dental-Messen", color: "#f59e0b" },
    { id: 12, name: "Versicherungsmakler", en: "Insurance", fit: 7, tier: 2, budget: "1.5-4k", mrr: "150-400", market: "14k", difficulty: "Mittel", competition: "Mittel", mrrPot: "Hoch", pain: "Lead-Qualifizierung, Schadensmeldung", useCase: "Lead-Qualifier, Erstangebot, Cross-Selling", findAt: "LinkedIn, BVK, Google Maps", color: "#ec4899" },
    { id: 13, name: "Hotels", en: "Hospitality", fit: 7, tier: 2, budget: "2-6k", mrr: "200-500", market: "12k", difficulty: "Mittel", competition: "Mittel", mrrPot: "Hoch", pain: "24/7 Buchungen, Gaeste-FAQ", useCase: "Mehrsprachiger Buchungs-Bot, Upselling", findAt: "DEHOGA, Google Maps, LinkedIn", color: "#8b5cf6" },
    { id: 14, name: "Fitnessstudios", en: "Gyms", fit: 7, tier: 2, budget: "0.8-2.5k", mrr: "100-200", market: "9.3k", difficulty: "Einfach", competition: "Niedrig", mrrPot: "Mittel", pain: "Mitglieder-Akquise, Kuendigung", useCase: "Probetraining-Buchung, Kursplan, Retention", findAt: "Google Maps, Instagram, Facebook", color: "#14b8a6" },
    { id: 15, name: "Marketing Agenturen", en: "Agencies", fit: 7, tier: 2, budget: "1-4k", mrr: "150-400", market: "15-20k", difficulty: "Einfach", competition: "Hoch", mrrPot: "Hoch", pain: "Reporting, Content, Lead-Gen", useCase: "White-Label Bots fuer deren Kunden", findAt: "LinkedIn, Clutch.co, Sortlist", color: "#f97316" },
    { id: 16, name: "Autohauser", en: "Car Dealers", fit: 7, tier: 2, budget: "2-6k", mrr: "200-500", market: "36-65k", difficulty: "Mittel", competition: "Niedrig", mrrPot: "Hoch", pain: "Probefahrt, Finanzierung, After-Sales", useCase: "Fahrzeug-Suche-Bot, Probefahrt-Buchung", findAt: "AutoScout24, mobile.de, Google Maps", color: "#ef4444" },
    { id: 17, name: "Arztpraxen", en: "Medical", fit: 6, tier: 3, budget: "2-6k", mrr: "200-500", market: "98k", difficulty: "Schwer", competition: "Mittel", mrrPot: "Hoch", pain: "Telefon-Ueberlastung, Termine", useCase: "Termin-Bot, Rezeptbestellung, FAQ", findAt: "KV, Jameda, Google Maps", color: "#6366f1" },
    { id: 18, name: "Restaurants", en: "Food Service", fit: 6, tier: 3, budget: "0.5-2k", mrr: "50-150", market: "170k", difficulty: "Mittel", competition: "Mittel", mrrPot: "Mittel", pain: "Reservierungen, Bestellungen", useCase: "Reservierungs-Bot, Speisekarten-FAQ", findAt: "Google Maps, Lieferando, Instagram", color: "#22d3ee" },
    { id: 19, name: "Friseure / Beauty", en: "Salons", fit: 6, tier: 3, budget: "0.3-1k", mrr: "30-80", market: "95k", difficulty: "Einfach", competition: "Mittel", mrrPot: "Niedrig", pain: "Terminbuchung, No-Shows", useCase: "Termin-Bot, Erinnerungen", findAt: "Google Maps, Instagram, Treatwell", color: "#34d399" },
    { id: 20, name: "Bildung / Kurse", en: "Education", fit: 6, tier: 3, budget: "1-4k", mrr: "100-300", market: "50k", difficulty: "Mittel", competition: "Niedrig", mrrPot: "Mittel", pain: "Kursberatung, Anmeldung", useCase: "Kursberater-Bot, Anmeldung, FAQ", findAt: "LinkedIn, VHS, Teachable", color: "#f59e0b" },
    { id: 21, name: "Finanzdienstleister", en: "Financial", fit: 6, tier: 3, budget: "2-6k", mrr: "200-500", market: "41k", difficulty: "Schwer", competition: "Mittel", mrrPot: "Sehr hoch", pain: "Lead-Qualifizierung, Compliance", useCase: "Risikoprofil-Bot, Portfolio-Reports", findAt: "LinkedIn, BVK, DIHK", color: "#ec4899" },
    { id: 22, name: "Event-Veranstalter", en: "Events", fit: 6, tier: 3, budget: "1-3k", mrr: "100-300", market: "10-15k", difficulty: "Einfach", competition: "Niedrig", mrrPot: "Mittel", pain: "Anfragen, Angebote, Gaeste-Komm.", useCase: "Anfrage-Bot, Briefing-Sammlung", findAt: "LinkedIn, Google Maps, Instagram", color: "#8b5cf6" },
    { id: 23, name: "Fahrschulen", en: "Driving Schools", fit: 6, tier: 3, budget: "0.5-1.5k", mrr: "50-100", market: "10k", difficulty: "Einfach", competition: "Niedrig", mrrPot: "Mittel", pain: "Terminplanung, Preis-FAQ", useCase: "Preis/Ablauf-Bot, Fahrstunden-Buchung", findAt: "Google Maps, Facebook", color: "#14b8a6" },
    { id: 24, name: "Reinigungsfirmen", en: "Cleaning", fit: 6, tier: 3, budget: "0.5-1.5k", mrr: "50-100", market: "13.9k", difficulty: "Einfach", competition: "Niedrig", mrrPot: "Niedrig", pain: "Angebots-Anfragen, Termine", useCase: "Sofort-Angebot-Bot, Termin-Buchung", findAt: "Google Maps, MyHammer", color: "#f97316" },
    { id: 25, name: "Pflegedienste", en: "Home Care", fit: 6, tier: 3, budget: "1-3k", mrr: "100-250", market: "15.4k", difficulty: "Mittel", competition: "Niedrig", mrrPot: "Mittel", pain: "Erstberatung, Dienstplanung", useCase: "Pflegestufen-Berater, Terminplanung", findAt: "Google Maps, Pflege-Portale", color: "#ef4444" },
];

const tierLabels = { 1: "Top-Nische", 2: "Gute Nische", 3: "Mit Einschraenkungen" };
const tierColors = { 1: "#34d399", 2: "#fbbf24", 3: "#f87171" };
const diffColors = { "Einfach": "#34d399", "Mittel": "#fbbf24", "Schwer": "#f87171" };
const mrrColors = { "Sehr hoch": "#34d399", "Hoch": "#22d3ee", "Mittel": "#fbbf24", "Niedrig": "#f87171", "Sehr niedrig": "#f87171" };

export default function NichesPage() {
    const [view, setView] = useState("table");
    const [tierFilter, setTierFilter] = useState(0);
    const [sortBy, setSortBy] = useState("fit");

    const filtered = tierFilter > 0 ? niches.filter(n => n.tier === tierFilter) : niches;
    const sorted = [...filtered].sort((a, b) => {
        if (sortBy === "fit") return b.fit - a.fit;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "market") return 0;
        if (sortBy === "difficulty") {
            const order = { "Einfach": 0, "Mittel": 1, "Schwer": 2 };
            return order[a.difficulty] - order[b.difficulty];
        }
        return 0;
    });

    const topNiches = niches.filter(n => n.fit >= 8);

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Nischen-Analyse</h1>
                    <p className="text-sm text-white/50">{niches.length} Branchen analysiert — Welche lohnt sich am meisten?</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setView("table")} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${view === "table" ? "bg-indigo-500 text-white" : "bg-white/10 text-white/50"}`}>Tabelle</button>
                    <button onClick={() => setView("cards")} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${view === "cards" ? "bg-indigo-500 text-white" : "bg-white/10 text-white/50"}`}>Karten</button>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <div className="glass-card p-4 text-center">
                    <div className="text-3xl font-black text-green-400">{niches.filter(n => n.fit >= 8).length}</div>
                    <div className="text-xs text-white/40">Top-Nischen (8+)</div>
                </div>
                <div className="glass-card p-4 text-center">
                    <div className="text-3xl font-black text-cyan-400">{niches.filter(n => n.fit === 7).length}</div>
                    <div className="text-xs text-white/40">Gute Nischen (7)</div>
                </div>
                <div className="glass-card p-4 text-center">
                    <div className="text-3xl font-black text-white">2.2 Mio</div>
                    <div className="text-xs text-white/40">Adressierbarer Markt DE</div>
                </div>
                <div className="glass-card p-4 text-center">
                    <div className="text-3xl font-black text-indigo-400">132k</div>
                    <div className="text-xs text-white/40">EUR/Jahr bei 30 Kunden</div>
                </div>
            </div>

            {/* Top 7 Highlight */}
            <div className="glass-card p-6 mb-6">
                <h3 className="text-lg font-bold text-white mb-4">Top 7 Starter-Nischen (Fit 8+)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {topNiches.map(n => (
                        <div key={n.id} className="p-4 rounded-xl border transition-all hover:bg-white/5" style={{ borderColor: n.color + "44" }}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-bold text-white">{n.name}</span>
                                <span className="text-lg font-black" style={{ color: n.color }}>{n.fit}</span>
                            </div>
                            <p className="text-[10px] text-white/40 mb-2">{n.pain}</p>
                            <div className="flex justify-between text-xs">
                                <span className="text-white/50">Setup: {n.budget} EUR</span>
                                <span className="text-green-400">{n.mrr}/Mo</span>
                            </div>
                            <div className="text-[10px] text-white/30 mt-2">Markt DE: {n.market}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
                <button onClick={() => setTierFilter(0)} className={`px-3 py-1.5 rounded-lg text-xs transition-all ${tierFilter === 0 ? "bg-white/20 text-white" : "bg-white/5 text-white/40"}`}>Alle ({niches.length})</button>
                <button onClick={() => setTierFilter(1)} className={`px-3 py-1.5 rounded-lg text-xs transition-all ${tierFilter === 1 ? "bg-green-500/30 text-green-400" : "bg-white/5 text-white/40"}`}>Tier 1 — Top ({niches.filter(n => n.tier === 1).length})</button>
                <button onClick={() => setTierFilter(2)} className={`px-3 py-1.5 rounded-lg text-xs transition-all ${tierFilter === 2 ? "bg-yellow-500/30 text-yellow-400" : "bg-white/5 text-white/40"}`}>Tier 2 — Gut ({niches.filter(n => n.tier === 2).length})</button>
                <button onClick={() => setTierFilter(3)} className={`px-3 py-1.5 rounded-lg text-xs transition-all ${tierFilter === 3 ? "bg-red-500/30 text-red-400" : "bg-white/5 text-white/40"}`}>Tier 3 — Eingeschraenkt ({niches.filter(n => n.tier === 3).length})</button>
                <span className="text-white/20 mx-2">|</span>
                <button onClick={() => setSortBy("fit")} className={`px-3 py-1.5 rounded-lg text-xs ${sortBy === "fit" ? "bg-indigo-500/30 text-indigo-300" : "bg-white/5 text-white/40"}`}>Sort: Fit</button>
                <button onClick={() => setSortBy("name")} className={`px-3 py-1.5 rounded-lg text-xs ${sortBy === "name" ? "bg-indigo-500/30 text-indigo-300" : "bg-white/5 text-white/40"}`}>Sort: Name</button>
                <button onClick={() => setSortBy("difficulty")} className={`px-3 py-1.5 rounded-lg text-xs ${sortBy === "difficulty" ? "bg-indigo-500/30 text-indigo-300" : "bg-white/5 text-white/40"}`}>Sort: Schwierigkeit</button>
            </div>

            {view === "table" ? (
                <div className="glass-card p-4 overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-white/40 border-b border-white/10">
                                <th className="pb-2 pr-3">#</th>
                                <th className="pb-2 pr-3">Nische</th>
                                <th className="pb-2 pr-3">Fit</th>
                                <th className="pb-2 pr-3">Tier</th>
                                <th className="pb-2 pr-3">Setup EUR</th>
                                <th className="pb-2 pr-3">MRR EUR</th>
                                <th className="pb-2 pr-3">Markt DE</th>
                                <th className="pb-2 pr-3">Schwierigkeit</th>
                                <th className="pb-2 pr-3">MRR-Potenzial</th>
                                <th className="pb-2">Pain Point</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sorted.map((n, i) => (
                                <tr key={n.id} className="border-b border-white/5 hover:bg-white/5 transition-all">
                                    <td className="py-2.5 pr-3 text-white/30">{i + 1}</td>
                                    <td className="py-2.5 pr-3">
                                        <div className="text-white font-semibold">{n.name}</div>
                                        <div className="text-[10px] text-white/30">{n.en}</div>
                                    </td>
                                    <td className="py-2.5 pr-3">
                                        <span className="text-lg font-black" style={{ color: n.fit >= 8 ? "#34d399" : n.fit >= 7 ? "#fbbf24" : "#f87171" }}>{n.fit}</span>
                                    </td>
                                    <td className="py-2.5 pr-3">
                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ backgroundColor: tierColors[n.tier] + "22", color: tierColors[n.tier] }}>{tierLabels[n.tier]}</span>
                                    </td>
                                    <td className="py-2.5 pr-3 text-white/70">{n.budget}</td>
                                    <td className="py-2.5 pr-3 text-green-400 font-semibold">{n.mrr}</td>
                                    <td className="py-2.5 pr-3 text-white/50">{n.market}</td>
                                    <td className="py-2.5 pr-3">
                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ backgroundColor: (diffColors[n.difficulty] || "#888") + "22", color: diffColors[n.difficulty] }}>{n.difficulty}</span>
                                    </td>
                                    <td className="py-2.5 pr-3">
                                        <span className="text-xs" style={{ color: mrrColors[n.mrrPot] || "#888" }}>{n.mrrPot}</span>
                                    </td>
                                    <td className="py-2.5 text-white/40 text-xs max-w-[200px] truncate">{n.pain}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sorted.map(n => (
                        <div key={n.id} className="glass-card p-5 border transition-all hover:scale-[1.01]" style={{ borderColor: n.color + "33" }}>
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <h4 className="text-sm font-bold text-white">{n.name}</h4>
                                    <span className="text-[10px] text-white/30">{n.en}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ backgroundColor: tierColors[n.tier] + "22", color: tierColors[n.tier] }}>{tierLabels[n.tier]}</span>
                                    <span className="text-2xl font-black" style={{ color: n.fit >= 8 ? "#34d399" : n.fit >= 7 ? "#fbbf24" : "#f87171" }}>{n.fit}</span>
                                </div>
                            </div>
                            <p className="text-xs text-white/50 mb-3">{n.pain}</p>
                            <div className="space-y-1.5 text-xs mb-3">
                                <div className="flex justify-between"><span className="text-white/40">Setup</span><span className="text-white font-semibold">{n.budget} EUR</span></div>
                                <div className="flex justify-between"><span className="text-white/40">MRR</span><span className="text-green-400 font-semibold">{n.mrr} EUR/Mo</span></div>
                                <div className="flex justify-between"><span className="text-white/40">Markt DE</span><span className="text-white/60">{n.market}</span></div>
                                <div className="flex justify-between"><span className="text-white/40">Schwierigkeit</span><span style={{ color: diffColors[n.difficulty] }}>{n.difficulty}</span></div>
                                <div className="flex justify-between"><span className="text-white/40">MRR-Potenzial</span><span style={{ color: mrrColors[n.mrrPot] }}>{n.mrrPot}</span></div>
                                <div className="flex justify-between"><span className="text-white/40">Wettbewerb</span><span className="text-white/60">{n.competition}</span></div>
                            </div>
                            <div className="p-2 rounded-lg bg-white/5 text-[10px] text-white/40 mb-2">
                                <strong className="text-white/60">Use Case:</strong> {n.useCase}
                            </div>
                            <div className="text-[10px] text-white/30">
                                <strong>Finden:</strong> {n.findAt}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Revenue Projection */}
            <div className="glass-card p-6 mt-6">
                <h3 className="text-lg font-bold text-white mb-4">Revenue-Projektion (bei 30 Kunden/Jahr)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-center">
                        <div className="text-3xl font-black text-indigo-400">60k</div>
                        <div className="text-xs text-white/40">EUR Setup (einmalig)</div>
                        <div className="text-[10px] text-white/30 mt-1">30 x ~2.000 EUR</div>
                    </div>
                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                        <div className="text-3xl font-black text-green-400">72k</div>
                        <div className="text-xs text-white/40">EUR MRR/Jahr</div>
                        <div className="text-[10px] text-white/30 mt-1">30 x ~200 EUR/Mo</div>
                    </div>
                    <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-center">
                        <div className="text-3xl font-black text-cyan-400">132k</div>
                        <div className="text-xs text-white/40">EUR Gesamt/Jahr</div>
                        <div className="text-[10px] text-white/30 mt-1">Setup + MRR kumuliert</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
