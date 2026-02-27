"use client";

import { useState } from "react";
import { AppProvider, useApp } from "./context";
import Sidebar from "./components/Sidebar";
import StatsCard from "./components/StatsCard";
import ProjectCard from "./components/ProjectCard";
import ActivityChart from "./components/ActivityChart";
import KanbanBoard from "./components/KanbanBoard";
import { AddTaskModal, TaskDetailModal, NotificationsPanel } from "./components/Modals";
import { ProjectsPage, TasksPage, TeamPage, PlaceholderPage } from "./components/Pages";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Guten Morgen";
  if (hour < 18) return "Guten Nachmittag";
  return "Guten Abend";
}

function DashboardContent() {
  const {
    currentPage, setCurrentPage, projects, kanbanTasks, searchQuery, setSearchQuery,
    showModal, setShowModal, getFilteredTasks, weeklyActivity, teamMembers, notifications,
  } = useApp();

  const [collapsed, setCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const totalTasks = projects.reduce((sum, p) => sum + p.tasks.total, 0);
  const completedTasks = projects.reduce((sum, p) => sum + p.tasks.completed, 0);
  const totalBudget = projects.reduce((sum, p) => sum + p.budget.total, 0);
  const spentBudget = projects.reduce((sum, p) => sum + p.budget.spent, 0);
  const unreadNotifications = notifications.filter((n) => !n.read).length;

  const filteredTasks = getFilteredTasks();

  function renderPage() {
    switch (currentPage) {
      case "projects": return <ProjectsPage />;
      case "tasks": return <TasksPage />;
      case "team": return <TeamPage />;
      case "calendar": return <PlaceholderPage title="Kalender" icon="📅" />;
      case "reports": return <PlaceholderPage title="Berichte" icon="📈" />;
      case "settings": return <PlaceholderPage title="Einstellungen" icon="⚙️" />;
      default: return renderDashboard();
    }
  }

  function renderDashboard() {
    return (
      <>
        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-5 mb-8">
          <StatsCard icon="📁" label="Aktive Projekte" value={projects.length} change="12%" changeType="up" delay="stagger-1" />
          <StatsCard icon="✅" label="Aufgaben erledigt" value={`${completedTasks}/${totalTasks}`} change="8%" changeType="up" delay="stagger-2" />
          <StatsCard icon="💰" label="Budget verbraucht" value={`€${(spentBudget / 1000).toFixed(0)}k`} change={`${Math.round((spentBudget / totalBudget) * 100)}%`} changeType="neutral" delay="stagger-3" />
          <StatsCard icon="👥" label="Teammitglieder" value={teamMembers.length} change="Aktiv" changeType="up" delay="stagger-4" />
        </div>

        {/* Middle Row: Projects + Activity */}
        <div className="grid grid-cols-3 gap-5 mb-8">
          <div className="col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-sm animate-fade-in">Aktive Projekte</h3>
              <button
                onClick={() => setCurrentPage("projects")}
                className="text-xs text-[var(--color-primary-light)] hover:text-[var(--color-primary)] transition-colors animate-fade-in"
              >
                Alle anzeigen →
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} delay={`stagger-${i + 1}`} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <ActivityChart data={weeklyActivity} />

            {/* Team */}
            <div className="glass rounded-2xl p-5 animate-fade-in stagger-4">
              <h3 className="text-white font-semibold text-sm mb-4">Team</h3>
              <div className="flex flex-col gap-3">
                {teamMembers.map((member) => (
                  <div key={member.initials} className="flex items-center gap-3 group cursor-pointer">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ backgroundColor: member.color + "33", color: member.color }}
                    >
                      {member.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate group-hover:text-[var(--color-primary-light)] transition-colors">{member.name}</p>
                      <p className="text-[11px] text-[var(--color-text-muted)]">{member.role}</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-[var(--color-success)]" title="Online" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <KanbanBoard tasks={filteredTasks} />
      </>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 p-8 ${collapsed ? "ml-[72px]" : "ml-[240px]"}`}>
        {/* Header */}
        <header className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {currentPage === "dashboard" ? `${getGreeting()}, Jörg 👋` : ""}
            </h1>
            {currentPage === "dashboard" && (
              <p className="text-sm text-[var(--color-text-muted)] mt-1">
                Du hast noch <span className="text-[var(--color-primary-light)] font-medium">{totalTasks - completedTasks} Aufgaben</span> in {projects.length} Projekten offen.
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Suchen..."
                className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl px-4 py-2 pl-9 text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors w-[200px]"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] text-sm">🔍</span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-white text-xs"
                >✕</button>
              )}
            </div>

            {/* Notifications */}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative w-10 h-10 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-primary)] transition-colors"
            >
              <span className="text-sm">🔔</span>
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--color-danger)] rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                  {unreadNotifications}
                </span>
              )}
            </button>

            {/* Avatar */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:scale-105 transition-transform">
              JM
            </div>
          </div>
        </header>

        {/* Page Content */}
        {renderPage()}

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-[var(--color-border)] text-center">
          <p className="text-xs text-[var(--color-text-muted)]">
            Project Manager v1.0 — Erstellt mit Next.js, React & Tailwind CSS — Portfolio von{" "}
            <a href="https://github.com/joergmichno" target="_blank" className="text-[var(--color-primary-light)] hover:underline">
              Jörg Michno
            </a>
          </p>
        </footer>
      </main>

      {/* Modals */}
      {showModal === "addTask" && <AddTaskModal />}
      {showModal === "taskDetail" && <TaskDetailModal />}
      {showNotifications && <NotificationsPanel onClose={() => setShowNotifications(false)} />}
    </div>
  );
}

export default function Dashboard() {
  return (
    <AppProvider>
      <DashboardContent />
    </AppProvider>
  );
}
