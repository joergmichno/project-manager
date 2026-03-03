"use client";

import { useState } from "react";
import { AppProvider, useApp } from "./context";
import Sidebar from "./components/Sidebar";
import StatsCard from "./components/StatsCard";
import ProjectCard from "./components/ProjectCard";
import ActivityChart from "./components/ActivityChart";
import KanbanBoard from "./components/KanbanBoard";
import { AddTaskModal, TaskDetailModal, ProjectModal, MemberModal, DeleteConfirmModal, NotificationsPanel } from "./components/Modals";
import { ProjectsPage, TasksPage, TeamPage, PlaceholderPage, ReportsPage, SettingsPage } from "./components/Pages";
import GanttChart from "./components/GanttChart";

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
    selectedProject, selectedMember, openProjectDetail,
  } = useApp();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const totalTasks = projects.reduce((sum, p) => sum + p.tasks.total, 0);
  const completedTasks = projects.reduce((sum, p) => sum + p.tasks.completed, 0);
  const totalBudget = projects.reduce((sum, p) => sum + p.budget.total, 0);
  const spentBudget = projects.reduce((sum, p) => sum + p.budget.spent, 0);
  const unreadNotifications = notifications.filter((n) => !n.read).length;

  const filteredTasks = getFilteredTasks();

  // Compute warnings for dashboard
  function getWarnings() {
    const warnings = [];
    const now = new Date();
    projects.forEach((p) => {
      const deadline = new Date(p.deadline);
      const daysLeft = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
      const budgetPercent = Math.round((p.budget.spent / p.budget.total) * 100);

      if (daysLeft <= 14 && p.progress < 60) {
        warnings.push({ type: "danger", text: `⚠️ ${p.name}: Nur ${daysLeft} Tage bis Deadline, aber erst ${p.progress}% fertig!`, projectId: p.id });
      } else if (daysLeft <= 7 && p.progress < 90) {
        warnings.push({ type: "danger", text: `🚨 ${p.name}: ${daysLeft} Tage bis Deadline! Fortschritt: ${p.progress}%`, projectId: p.id });
      }
      if (budgetPercent > 90) {
        warnings.push({ type: "warning", text: `💰 ${p.name}: Budget zu ${budgetPercent}% verbraucht!`, projectId: p.id });
      }
    });

    // Check team workload
    teamMembers.forEach((m) => {
      let tasks = 0;
      for (const col of Object.values(kanbanTasks)) {
        tasks += col.filter((t) => t.assignee === m.initials).length;
      }
      if (tasks > 5) {
        warnings.push({ type: "warning", text: `👤 ${m.name} hat ${tasks} aktive Aufgaben – mögliche Überlastung!` });
      }
    });

    return warnings;
  }

  function renderPage() {
    switch (currentPage) {
      case "projects": return <ProjectsPage />;
      case "tasks": return <TasksPage />;
      case "team": return <TeamPage />;
      case "calendar": return <GanttChart />;
      case "reports": return <ReportsPage />;
      case "settings": return <SettingsPage />;
      case "project-detail": return <ProjectDetailView />;
      case "member-detail": return <MemberDetailView />;
      default: return renderDashboard();
    }
  }

  function renderDashboard() {
    const warnings = getWarnings();

    return (
      <>
        {/* Warnings Banner */}
        {warnings.length > 0 && (
          <div className="mb-6 flex flex-col gap-2 animate-fade-in">
            {warnings.slice(0, 3).map((w, i) => (
              <div
                key={i}
                onClick={() => w.projectId && openProjectDetail(w.projectId)}
                className={`rounded-xl px-4 py-3 text-sm border cursor-pointer transition-all hover:brightness-110 ${w.type === "danger"
                  ? "bg-[var(--color-danger)]/10 border-[var(--color-danger)]/30 text-[var(--color-danger)]"
                  : "bg-[var(--color-warning)]/10 border-[var(--color-warning)]/30 text-[var(--color-warning)]"
                  }`}
              >
                {w.text}
              </div>
            ))}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5 mb-6 lg:mb-8">
          <StatsCard icon="📁" label="Aktive Projekte" value={projects.length} change="12%" changeType="up" delay="stagger-1" />
          <StatsCard icon="✅" label="Aufgaben erledigt" value={`${completedTasks}/${totalTasks}`} change="8%" changeType="up" delay="stagger-2" />
          <StatsCard icon="💰" label="Budget verbraucht" value={`€${(spentBudget / 1000).toFixed(0)}k`} change={`${totalBudget > 0 ? Math.round((spentBudget / totalBudget) * 100) : 0}%`} changeType="neutral" delay="stagger-3" />
          <StatsCard icon="👥" label="Teammitglieder" value={teamMembers.length} change={`${teamMembers.filter((m) => m.status === "online").length} Online`} changeType="up" delay="stagger-4" />
        </div>

        {/* Middle Row: Projects + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6 lg:mb-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-sm animate-fade-in">Aktive Projekte</h3>
              <button onClick={() => setCurrentPage("projects")} className="text-xs text-[var(--color-primary-light)] hover:text-[var(--color-primary)] transition-colors animate-fade-in">
                Alle anzeigen →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.slice(0, 4).map((project, i) => (
                <ProjectCard key={project.id} project={project} delay={`stagger-${i + 1}`} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <ActivityChart data={weeklyActivity} />

            {/* Team */}
            <div className="glass rounded-2xl p-5 animate-fade-in stagger-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold text-sm">Team</h3>
                <button onClick={() => setCurrentPage("team")} className="text-[10px] text-[var(--color-primary-light)] hover:text-[var(--color-primary)] transition-colors">Alle →</button>
              </div>
              <div className="flex flex-col gap-3">
                {teamMembers.slice(0, 5).map((member) => (
                  <div key={member.initials} onClick={() => { }} className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ backgroundColor: member.color + "33", color: member.color }}>{member.initials}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate group-hover:text-[var(--color-primary-light)] transition-colors">{member.name}</p>
                      <p className="text-[11px] text-[var(--color-text-muted)]">{member.role}</p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${member.status === "online" ? "bg-[var(--color-success)]" : member.status === "away" ? "bg-[var(--color-warning)]" : "bg-[var(--color-text-muted)]"}`} title={member.status} />
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
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 p-4 lg:p-8 ml-0 ${collapsed ? "lg:ml-[72px]" : "lg:ml-[240px]"}`}>
        {/* Header */}
        <header className="flex items-center justify-between mb-6 lg:mb-8 animate-fade-in">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger */}
            <button onClick={() => setMobileOpen(true)} className="lg:hidden w-10 h-10 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-lg hover:border-[var(--color-primary)] transition-colors">
              ☰
            </button>
            <div>
            <h1 className="text-2xl font-bold text-white">
              {currentPage === "dashboard" ? `${getGreeting()}, Jörg 👋` : ""}
            </h1>
            {currentPage === "dashboard" && (
              <p className="text-sm text-[var(--color-text-muted)] mt-1">
                Du hast noch <span className="text-[var(--color-primary-light)] font-medium">{totalTasks - completedTasks} Aufgaben</span> in {projects.length} Projekten offen.
              </p>
            )}
            {currentPage !== "dashboard" && currentPage !== "project-detail" && currentPage !== "member-detail" && (
              <button onClick={() => setCurrentPage("dashboard")} className="text-xs text-[var(--color-primary-light)] hover:text-white transition-colors mt-1">← Zurück zum Dashboard</button>
            )}
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-3">
            {/* Search */}
            <div className="relative">
              <input
                type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Suchen..."
                className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl px-4 py-2 pl-9 text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors w-[120px] lg:w-[200px]"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] text-sm">🔍</span>
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-white text-xs">✕</button>
              )}
            </div>

            {/* Notifications */}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative w-10 h-10 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-primary)] transition-colors"
            >
              <span className="text-sm">🔔</span>
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-danger)] rounded-full text-[10px] text-white flex items-center justify-center font-bold animate-pulse">{unreadNotifications}</span>
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
            Project Manager v2.0 — Erstellt mit Next.js, React & Tailwind CSS — Portfolio von{" "}
            <a href="https://github.com/joergmichno" target="_blank" className="text-[var(--color-primary-light)] hover:underline">
              Jörg Michno
            </a>
          </p>
        </footer>
      </main>

      {/* Modals */}
      {showModal === "addTask" && <AddTaskModal />}
      {showModal === "taskDetail" && <TaskDetailModal />}
      {(showModal === "addProject" || showModal === "editProject") && <ProjectModal />}
      {(showModal === "addMember" || showModal === "editMember") && <MemberModal />}
      {(showModal === "deleteProject" || showModal === "deleteMember") && <DeleteConfirmModal />}
      {showNotifications && <NotificationsPanel onClose={() => setShowNotifications(false)} />}
    </div>
  );
}

/* ═══════════════════════════════════ */
/* PROJECT DETAIL VIEW (Paket 2)       */
/* ═══════════════════════════════════ */
function ProjectDetailView() {
  const { selectedProject, setCurrentPage, kanbanTasks, teamMembers, setSelectedProject, setShowModal, setSelectedTask } = useApp();
  if (!selectedProject) return <PlaceholderPage title="Projekt nicht gefunden" icon="❓" />;

  const p = selectedProject;
  const projectTasks = [];
  const columnLabels = { todo: "Offen", inProgress: "In Bearbeitung", review: "In Prüfung", done: "Erledigt" };

  for (const [col, tasks] of Object.entries(kanbanTasks)) {
    for (const t of tasks) {
      if (t.projectId === p.id || t.project === p.name) {
        projectTasks.push({ ...t, column: col });
      }
    }
  }

  const budgetPercent = p.budget.total > 0 ? Math.round((p.budget.spent / p.budget.total) * 100) : 0;
  const daysLeft = Math.ceil((new Date(p.deadline) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className="animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] mb-4">
        <button onClick={() => setCurrentPage("dashboard")} className="hover:text-white transition-colors">Dashboard</button>
        <span>›</span>
        <button onClick={() => setCurrentPage("projects")} className="hover:text-white transition-colors">Projekte</button>
        <span>›</span>
        <span className="text-white">{p.name}</span>
      </div>

      {/* Project Header */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">{p.name}</h2>
            <p className="text-sm text-[var(--color-text-muted)]">{p.client} • Priorität: {p.priority}</p>
            {p.description && <p className="text-sm text-[var(--color-text-muted)] mt-2">{p.description}</p>}
          </div>
          <div className="flex gap-2 shrink-0">
            <button onClick={() => { setSelectedProject(p); setShowModal("editProject"); }} className="px-3 py-2 rounded-xl bg-[var(--color-surface)] text-sm text-[var(--color-primary-light)] hover:bg-[var(--color-primary)]/20 border border-[var(--color-border)] transition-all">✏️ Bearbeiten</button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-4">
          <div className="bg-[var(--color-surface)] rounded-xl p-3 border border-[var(--color-border)] text-center">
            <p className="text-2xl font-bold text-white">{p.progress}%</p>
            <p className="text-[10px] text-[var(--color-text-muted)]">Fortschritt</p>
          </div>
          <div className="bg-[var(--color-surface)] rounded-xl p-3 border border-[var(--color-border)] text-center">
            <p className={`text-2xl font-bold ${daysLeft <= 7 ? "text-[var(--color-danger)]" : daysLeft <= 14 ? "text-[var(--color-warning)]" : "text-white"}`}>{daysLeft}</p>
            <p className="text-[10px] text-[var(--color-text-muted)]">Tage bis Deadline</p>
          </div>
          <div className="bg-[var(--color-surface)] rounded-xl p-3 border border-[var(--color-border)] text-center">
            <p className="text-2xl font-bold text-white">{p.tasks.completed}/{p.tasks.total}</p>
            <p className="text-[10px] text-[var(--color-text-muted)]">Aufgaben</p>
          </div>
          <div className="bg-[var(--color-surface)] rounded-xl p-3 border border-[var(--color-border)] text-center">
            <p className={`text-2xl font-bold ${budgetPercent > 90 ? "text-[var(--color-danger)]" : "text-white"}`}>{budgetPercent}%</p>
            <p className="text-[10px] text-[var(--color-text-muted)]">Budget (€{(p.budget.spent / 1000).toFixed(0)}k/€{(p.budget.total / 1000).toFixed(0)}k)</p>
          </div>
        </div>

        <div className="w-full h-3 bg-[var(--color-surface-lighter)] rounded-full overflow-hidden">
          <div className="progress-bar h-full transition-all duration-500" style={{ width: `${p.progress}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Milestones */}
        <div className="glass rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4">◇ Meilensteine</h3>
          <div className="flex flex-col gap-3">
            {(p.milestones || []).map((ms) => (
              <div key={ms.id} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs ${ms.completed ? "bg-[var(--color-success)]/20 text-[var(--color-success)]" : "bg-[var(--color-surface-lighter)] text-[var(--color-text-muted)]"}`}>
                  {ms.completed ? "✅" : "◇"}
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${ms.completed ? "text-[var(--color-text-muted)] line-through" : "text-white"}`}>{ms.title}</p>
                  <p className="text-[10px] text-[var(--color-text-muted)]">{new Date(ms.date).toLocaleDateString("de-DE")}</p>
                </div>
              </div>
            ))}
            {(!p.milestones || p.milestones.length === 0) && <p className="text-xs text-[var(--color-text-muted)] italic">Keine Meilensteine definiert.</p>}
          </div>
        </div>

        {/* Team */}
        <div className="glass rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4">👥 Team</h3>
          <div className="flex flex-col gap-3">
            {p.team.map((initials) => {
              const member = teamMembers.find((m) => m.initials === initials);
              if (!member) return null;
              return (
                <div key={initials} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ backgroundColor: member.color + "33", color: member.color }}>{member.initials}</div>
                  <div>
                    <p className="text-sm text-white">{member.name}</p>
                    <p className="text-[10px] text-[var(--color-text-muted)]">{member.role}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tags & Info */}
        <div className="glass rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4">ℹ️ Details</h3>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between"><span className="text-[var(--color-text-muted)]">Startdatum</span><span className="text-white">{new Date(p.startDate).toLocaleDateString("de-DE")}</span></div>
            <div className="flex justify-between"><span className="text-[var(--color-text-muted)]">Deadline</span><span className="text-white">{new Date(p.deadline).toLocaleDateString("de-DE")}</span></div>
            <div className="flex justify-between"><span className="text-[var(--color-text-muted)]">Kunde</span><span className="text-white">{p.client}</span></div>
            {p.tags && p.tags.length > 0 && (
              <div className="pt-2 border-t border-[var(--color-border)]">
                <div className="flex flex-wrap gap-1">
                  {p.tags.map((tag) => <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-primary)]/15 text-[var(--color-primary-light)]">{tag}</span>)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Project Tasks */}
      <div className="glass rounded-2xl p-5 mt-6">
        <h3 className="text-sm font-semibold text-white mb-4">📋 Aufgaben ({projectTasks.length})</h3>
        <div className="flex flex-col gap-2">
          {projectTasks.map((task) => {
            const member = teamMembers.find((m) => m.initials === task.assignee);
            return (
              <div key={task.id} onClick={() => { setSelectedTask(task); setShowModal("taskDetail"); }} className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 cursor-pointer transition-all">
                <div className="flex-1">
                  <p className="text-sm text-white">{task.title}</p>
                  <p className="text-[10px] text-[var(--color-text-muted)]">{columnLabels[task.column]}</p>
                </div>
                {member && <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ backgroundColor: member.color + "33", color: member.color }}>{member.initials}</div>}
              </div>
            );
          })}
          {projectTasks.length === 0 && <p className="text-xs text-[var(--color-text-muted)] italic text-center py-4">Keine Aufgaben in diesem Projekt.</p>}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════ */
/* MEMBER DETAIL VIEW (Paket 2)        */
/* ═══════════════════════════════════ */
function MemberDetailView() {
  const { selectedMember, setCurrentPage, kanbanTasks, projects, setSelectedMember, setShowModal, setSelectedTask, teamMembers } = useApp();
  if (!selectedMember) return <PlaceholderPage title="Mitglied nicht gefunden" icon="❓" />;

  // Refresh member data from state
  const m = teamMembers.find((tm) => tm.id === selectedMember.id) || selectedMember;
  const columnLabels = { todo: "Offen", inProgress: "In Bearbeitung", review: "In Prüfung", done: "Erledigt" };

  const memberTasks = [];
  for (const [col, tasks] of Object.entries(kanbanTasks)) {
    for (const t of tasks) {
      if (t.assignee === m.initials) {
        memberTasks.push({ ...t, column: col });
      }
    }
  }

  const memberProjects = projects.filter((p) => p.team.includes(m.initials));

  return (
    <div className="animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] mb-4">
        <button onClick={() => setCurrentPage("dashboard")} className="hover:text-white transition-colors">Dashboard</button>
        <span>›</span>
        <button onClick={() => setCurrentPage("team")} className="hover:text-white transition-colors">Team</button>
        <span>›</span>
        <span className="text-white">{m.name}</span>
      </div>

      {/* Member Header */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold shrink-0" style={{ backgroundColor: m.color + "33", color: m.color }}>{m.initials}</div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-white">{m.name}</h2>
            <p className="text-sm text-[var(--color-text-muted)]">{m.role}</p>
            <div className="flex items-center justify-center sm:justify-start gap-4 mt-2 flex-wrap">
              {m.email && <span className="text-xs text-[var(--color-text-muted)]">📧 {m.email}</span>}
              {m.phone && <span className="text-xs text-[var(--color-text-muted)]">📱 {m.phone}</span>}
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button onClick={() => { setSelectedMember(m); setShowModal("editMember"); }} className="px-3 py-2 rounded-xl bg-[var(--color-surface)] text-sm text-[var(--color-primary-light)] hover:bg-[var(--color-primary)]/20 border border-[var(--color-border)] transition-all">✏️ Bearbeiten</button>
          </div>
        </div>

        {/* Skills */}
        {m.skills && m.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {m.skills.map((skill) => <span key={skill} className="text-xs px-2.5 py-1 rounded-lg bg-[var(--color-primary)]/15 text-[var(--color-primary-light)]">{skill}</span>)}
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 lg:gap-4 mb-6">
        <div className="glass rounded-2xl p-3 lg:p-4 text-center">
          <p className="text-xl lg:text-3xl font-bold text-white">{memberTasks.length}</p>
          <p className="text-xs text-[var(--color-text-muted)]">Aufgaben</p>
        </div>
        <div className="glass rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-white">{memberProjects.length}</p>
          <p className="text-xs text-[var(--color-text-muted)]">Projekte</p>
        </div>
        <div className="glass rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-white">{memberTasks.filter((t) => t.column === "done").length}</p>
          <p className="text-xs text-[var(--color-text-muted)]">Erledigt</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {/* Tasks */}
        <div className="glass rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4">📋 Aufgaben ({memberTasks.length})</h3>
          <div className="flex flex-col gap-2">
            {memberTasks.map((task) => (
              <div key={task.id} onClick={() => { setSelectedTask(task); setShowModal("taskDetail"); }} className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 cursor-pointer transition-all">
                <div>
                  <p className="text-sm text-white">{task.title}</p>
                  <p className="text-[10px] text-[var(--color-text-muted)]">{task.project} • {columnLabels[task.column]}</p>
                </div>
              </div>
            ))}
            {memberTasks.length === 0 && <p className="text-xs text-[var(--color-text-muted)] italic text-center py-4">Keine Aufgaben zugewiesen.</p>}
          </div>
        </div>

        {/* Projects */}
        <div className="glass rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4">📁 Projekte ({memberProjects.length})</h3>
          <div className="flex flex-col gap-2">
            {memberProjects.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                <div>
                  <p className="text-sm text-white">{project.name}</p>
                  <p className="text-[10px] text-[var(--color-text-muted)]">{project.client}</p>
                </div>
                <p className="text-sm font-bold text-white">{project.progress}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>
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
