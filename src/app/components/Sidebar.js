"use client";

import { useApp } from "../context";

const navItems = [
    { icon: "📊", label: "Dashboard", page: "dashboard" },
    { icon: "💰", label: "Revenue", page: "revenue" },
    { icon: "🏢", label: "Modelle", page: "business-models" },
    { icon: "📁", label: "Projekte", page: "projects" },
    { icon: "🎯", label: "Nischen", page: "niches" },
    { icon: "✅", label: "Aufgaben", page: "tasks" },
    { icon: "👥", label: "Team", page: "team" },
];

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
    const { currentPage, setCurrentPage } = useApp();

    const handleNavClick = (page) => {
        setCurrentPage(page);
        if (setMobileOpen) setMobileOpen(false);
    };

    return (
        <>
            {/* Mobile Overlay */}
            {mobileOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
            )}
            <aside
                className={`fixed left-0 top-0 h-full bg-[var(--color-surface)] border-r border-[var(--color-border)] transition-all duration-300 z-50 flex flex-col ${collapsed ? "w-[72px]" : "w-[240px]"} ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
            >
            {/* Logo */}
            <div className="flex items-center gap-3 px-5 py-6 border-b border-[var(--color-border)]">
                <button
                    onClick={() => setCurrentPage("dashboard")}
                    className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white font-bold text-sm shrink-0 hover:scale-105 transition-transform"
                >
                    BB
                </button>
                {!collapsed && (
                    <div className="animate-fade-in">
                        <h1 className="text-base font-bold text-white leading-tight">Business Brain</h1>
                        <p className="text-[11px] text-[var(--color-text-muted)]">AI-Labs v1.0</p>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 px-3">
                {navItems.map((item) => (
                    <button
                        key={item.label}
                        onClick={() => handleNavClick(item.page)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all duration-200 text-sm ${currentPage === item.page
                            ? "bg-[var(--color-primary)] bg-opacity-20 text-[var(--color-primary-light)] shadow-lg shadow-[var(--color-primary)]/10"
                            : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-light)] hover:text-[var(--color-text)]"
                            }`}
                    >
                        <span className="text-lg shrink-0">{item.icon}</span>
                        {!collapsed && <span>{item.label}</span>}
                    </button>
                ))}
            </nav>

            {/* Collapse Toggle */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="mx-3 mb-4 px-3 py-2 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-surface-light)] hover:text-[var(--color-text)] transition-all text-sm flex items-center gap-3"
            >
                <span className="text-lg shrink-0">{collapsed ? "▶" : "◀"}</span>
                {!collapsed && <span>Einklappen</span>}
            </button>
        </aside>
        </>
    );
}
