"use client";

import { useApp } from "../context";

const statusLabels = {
    "in-progress": { text: "In Bearbeitung", color: "text-[var(--color-primary-light)]", bg: "bg-[var(--color-primary)]/15" },
    review: { text: "In Prüfung", color: "text-[var(--color-warning)]", bg: "bg-[var(--color-warning)]/15" },
    planning: { text: "Planung", color: "text-[var(--color-text-muted)]", bg: "bg-[var(--color-surface-lighter)]" },
    completed: { text: "Abgeschlossen", color: "text-[var(--color-success)]", bg: "bg-[var(--color-success)]/15" },
};

const priorityLabels = { critical: "Kritisch", high: "Hoch", medium: "Mittel", low: "Niedrig" };
const priorityDots = { critical: "bg-[var(--color-danger)]", high: "bg-[var(--color-warning)]", medium: "bg-[var(--color-primary)]", low: "bg-[var(--color-success)]" };

/* ═══════════════════════════════════ */
/* PROJECTS PAGE                       */
/* ═══════════════════════════════════ */
export function ProjectsPage() {
    const { projects, teamMembers, setShowModal, setSelectedProject, openProjectDetail } = useApp();

    function handleEdit(e, project) {
        e.stopPropagation();
        setSelectedProject(project);
        setShowModal("editProject");
    }

    function handleDelete(e, project) {
        e.stopPropagation();
        setSelectedProject(project);
        setShowModal("deleteProject");
    }

    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white">Projekte</h2>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1">{projects.length} Projekte insgesamt</p>
                </div>
                <button onClick={() => setShowModal("addProject")} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-sm font-medium hover:brightness-110 transition-all">
                    <span>+</span> Neues Projekt
                </button>
            </div>

            <div className="flex flex-col gap-4">
                {projects.map((project) => {
                    const budgetPercent = Math.round((project.budget.spent / project.budget.total) * 100);
                    const status = statusLabels[project.status] || statusLabels.planning;
                    const daysLeft = Math.ceil((new Date(project.deadline) - new Date()) / (1000 * 60 * 60 * 24));
                    const isUrgent = daysLeft <= 14 && project.progress < 80;

                    return (
                        <div key={project.id} onClick={() => openProjectDetail(project.id)} className="glass rounded-2xl p-6 hover:border-[var(--color-primary)]/30 transition-all group cursor-pointer">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <h3 className="text-white font-semibold text-lg group-hover:text-[var(--color-primary-light)] transition-colors">{project.name}</h3>
                                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${status.bg} ${status.color}`}>{status.text}</span>
                                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${priorityDots[project.priority]} text-white`}>{priorityLabels[project.priority]}</span>
                                        {isUrgent && <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[var(--color-danger)]/15 text-[var(--color-danger)] animate-pulse">⚠ {daysLeft} Tage</span>}
                                    </div>
                                    <p className="text-sm text-[var(--color-text-muted)]">{project.client} • Deadline: {new Date(project.deadline).toLocaleDateString("de-DE")}</p>
                                    {project.description && <p className="text-xs text-[var(--color-text-muted)] mt-1 line-clamp-1">{project.description}</p>}
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={(e) => handleEdit(e, project)} className="w-8 h-8 rounded-lg bg-[var(--color-surface)] hover:bg-[var(--color-primary)]/20 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-all" title="Bearbeiten">✏️</button>
                                    <button onClick={(e) => handleDelete(e, project)} className="w-8 h-8 rounded-lg bg-[var(--color-surface)] hover:bg-[var(--color-danger)]/20 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-all" title="Löschen">🗑</button>
                                    <div className="text-right ml-2">
                                        <p className="text-2xl font-bold text-white">{project.progress}%</p>
                                        <p className="text-xs text-[var(--color-text-muted)]">Fortschritt</p>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-2.5 bg-[var(--color-surface-lighter)] rounded-full overflow-hidden mb-4">
                                <div className="progress-bar h-full transition-all duration-500" style={{ width: `${project.progress}%` }} />
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-4">
                                    <span className="text-[var(--color-text-muted)]">
                                        <span className="text-white font-medium">{project.tasks.completed}</span>/{project.tasks.total} Aufgaben
                                    </span>
                                    <span className={`font-medium ${budgetPercent > 90 ? "text-[var(--color-danger)]" : budgetPercent > 70 ? "text-[var(--color-warning)]" : "text-[var(--color-text-muted)]"}`}>
                                        €{(project.budget.spent / 1000).toFixed(0)}k / €{(project.budget.total / 1000).toFixed(0)}k Budget
                                    </span>
                                    {project.tags && project.tags.length > 0 && (
                                        <div className="flex gap-1">
                                            {project.tags.map((tag) => (
                                                <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-surface-lighter)] text-[var(--color-text-muted)]">{tag}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex -space-x-2">
                                    {project.team.map((m) => {
                                        const member = teamMembers.find((tm) => tm.initials === m);
                                        return (
                                            <div key={m} className="w-7 h-7 rounded-full border-2 border-[var(--color-surface-card)] flex items-center justify-center text-[10px] font-bold"
                                                style={{ backgroundColor: member ? member.color + "33" : "var(--color-surface-lighter)", color: member ? member.color : "var(--color-text-muted)" }}
                                                title={member?.name || m}>{m}</div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Milestones preview */}
                            {project.milestones && project.milestones.length > 0 && (
                                <div className="mt-3 pt-3 border-t border-[var(--color-border)]">
                                    <div className="flex items-center gap-3 overflow-x-auto">
                                        {project.milestones.map((ms) => (
                                            <div key={ms.id} className={`flex items-center gap-1.5 text-[11px] shrink-0 ${ms.completed ? "text-[var(--color-success)]" : "text-[var(--color-text-muted)]"}`}>
                                                <span>{ms.completed ? "✅" : "◇"}</span>
                                                <span>{ms.title}</span>
                                                <span className="text-[10px] opacity-60">{new Date(ms.date).toLocaleDateString("de-DE", { day: "2-digit", month: "short" })}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}

                {projects.length === 0 && (
                    <div className="text-center py-16">
                        <span className="text-5xl mb-4 block">📁</span>
                        <p className="text-white font-semibold mb-2">Noch keine Projekte</p>
                        <p className="text-sm text-[var(--color-text-muted)] mb-4">Erstelle dein erstes Projekt, um loszulegen.</p>
                        <button onClick={() => setShowModal("addProject")} className="px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white text-sm hover:brightness-110">+ Neues Projekt</button>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════ */
/* TASKS PAGE                          */
/* ═══════════════════════════════════ */
export function TasksPage() {
    const { kanbanTasks, teamMembers, setSelectedTask, setShowModal } = useApp();
    const allTasks = [...kanbanTasks.todo, ...kanbanTasks.inProgress, ...kanbanTasks.review, ...kanbanTasks.done];
    const columnLabels = { todo: "Offen", inProgress: "In Bearbeitung", review: "In Prüfung", done: "Erledigt" };

    function getColumn(taskId) {
        for (const [col, tasks] of Object.entries(kanbanTasks)) {
            if (tasks.find((t) => t.id === taskId)) return col;
        }
        return "todo";
    }

    const columnColors = {
        todo: "bg-[var(--color-text-muted)]/15 text-[var(--color-text-muted)]",
        inProgress: "bg-[var(--color-primary)]/15 text-[var(--color-primary-light)]",
        review: "bg-[var(--color-warning)]/15 text-[var(--color-warning)]",
        done: "bg-[var(--color-success)]/15 text-[var(--color-success)]",
    };

    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white">Alle Aufgaben</h2>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1">{allTasks.length} Aufgaben insgesamt</p>
                </div>
                <button onClick={() => setShowModal("addTask")} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-sm font-medium hover:brightness-110 transition-all">
                    <span>+</span> Neue Aufgabe
                </button>
            </div>

            <div className="glass rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-[var(--color-border)]">
                            <th className="text-left px-4 py-3 text-[var(--color-text-muted)] font-medium">Aufgabe</th>
                            <th className="text-left px-4 py-3 text-[var(--color-text-muted)] font-medium">Projekt</th>
                            <th className="text-left px-4 py-3 text-[var(--color-text-muted)] font-medium">Status</th>
                            <th className="text-left px-4 py-3 text-[var(--color-text-muted)] font-medium">Priorität</th>
                            <th className="text-left px-4 py-3 text-[var(--color-text-muted)] font-medium">Zugewiesen</th>
                            <th className="text-left px-4 py-3 text-[var(--color-text-muted)] font-medium">Deadline</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allTasks.map((task) => {
                            const col = getColumn(task.id);
                            const member = teamMembers.find((m) => m.initials === task.assignee);
                            return (
                                <tr key={task.id}
                                    onClick={() => { setSelectedTask({ ...task, column: col }); setShowModal("taskDetail"); }}
                                    className="border-b border-[var(--color-border)] hover:bg-[var(--color-surface)]/50 transition-colors cursor-pointer"
                                >
                                    <td className="px-4 py-3">
                                        <p className="text-white font-medium">{task.title}</p>
                                        {task.description && <p className="text-[11px] text-[var(--color-text-muted)] truncate max-w-[250px]">{task.description}</p>}
                                    </td>
                                    <td className="px-4 py-3 text-[var(--color-text-muted)]">{task.project}</td>
                                    <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full ${columnColors[col]}`}>{columnLabels[col]}</span></td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1.5">
                                            <div className={`w-2 h-2 rounded-full ${priorityDots[task.priority]}`} />
                                            <span className="text-[var(--color-text-muted)]">{priorityLabels[task.priority]}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        {member ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ backgroundColor: member.color + "33", color: member.color }}>{member.initials}</div>
                                                <span className="text-[var(--color-text-muted)] text-xs">{member.name}</span>
                                            </div>
                                        ) : (
                                            <span className="text-[var(--color-text-muted)]">{task.assignee || "–"}</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-[var(--color-text-muted)]">{task.deadline ? new Date(task.deadline).toLocaleDateString("de-DE") : "–"}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════ */
/* TEAM PAGE                           */
/* ═══════════════════════════════════ */
export function TeamPage() {
    const { teamMembers, kanbanTasks, projects, setShowModal, setSelectedMember, openMemberDetail } = useApp();

    function getActiveTasks(memberId) {
        let count = 0;
        for (const tasks of Object.values(kanbanTasks)) {
            count += tasks.filter((t) => t.assignee === memberId).length;
        }
        return count;
    }

    function getMemberProjects(memberId) {
        return projects.filter((p) => p.team.includes(memberId));
    }

    const statusColors = { online: "bg-[var(--color-success)]", away: "bg-[var(--color-warning)]", offline: "bg-[var(--color-text-muted)]" };
    const statusLabelsLocal = { online: "Online", away: "Abwesend", offline: "Offline" };

    function handleEdit(e, member) {
        e.stopPropagation();
        setSelectedMember(member);
        setShowModal("editMember");
    }

    function handleDelete(e, member) {
        e.stopPropagation();
        setSelectedMember(member);
        setShowModal("deleteMember");
    }

    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white">Team</h2>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1">{teamMembers.length} Mitglieder • {teamMembers.filter((m) => m.status === "online").length} Online</p>
                </div>
                <button onClick={() => setShowModal("addMember")} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-sm font-medium hover:brightness-110 transition-all">
                    <span>+</span> Neues Mitglied
                </button>
            </div>

            <div className="grid grid-cols-3 gap-5">
                {teamMembers.map((member) => {
                    const activeTasks = getActiveTasks(member.initials);
                    const memberProjects = getMemberProjects(member.initials);

                    return (
                        <div key={member.id} onClick={() => openMemberDetail(member.id)} className="glass rounded-2xl p-6 hover:border-[var(--color-primary)]/30 transition-all group cursor-pointer relative">
                            {/* Action buttons */}
                            <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={(e) => handleEdit(e, member)} className="w-7 h-7 rounded-lg bg-[var(--color-surface)] hover:bg-[var(--color-primary)]/20 flex items-center justify-center text-xs" title="Bearbeiten">✏️</button>
                                <button onClick={(e) => handleDelete(e, member)} className="w-7 h-7 rounded-lg bg-[var(--color-surface)] hover:bg-[var(--color-danger)]/20 flex items-center justify-center text-xs" title="Löschen">🗑</button>
                            </div>

                            <div className="text-center mb-4">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-3 group-hover:scale-110 transition-transform"
                                    style={{ backgroundColor: member.color + "33", color: member.color }}>{member.initials}</div>
                                <h3 className="text-white font-semibold">{member.name}</h3>
                                <p className="text-sm text-[var(--color-text-muted)]">{member.role}</p>
                                <div className="flex items-center justify-center gap-1.5 mt-2">
                                    <div className={`w-2 h-2 rounded-full ${statusColors[member.status]}`} />
                                    <span className={`text-xs ${member.status === "online" ? "text-[var(--color-success)]" : "text-[var(--color-text-muted)]"}`}>{statusLabelsLocal[member.status]}</span>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-2 mb-3">
                                <div className="bg-[var(--color-surface)] rounded-xl p-2.5 text-center border border-[var(--color-border)]">
                                    <p className="text-lg font-bold text-white">{activeTasks}</p>
                                    <p className="text-[10px] text-[var(--color-text-muted)]">Aufgaben</p>
                                </div>
                                <div className="bg-[var(--color-surface)] rounded-xl p-2.5 text-center border border-[var(--color-border)]">
                                    <p className="text-lg font-bold text-white">{memberProjects.length}</p>
                                    <p className="text-[10px] text-[var(--color-text-muted)]">Projekte</p>
                                </div>
                            </div>

                            {/* Skills */}
                            {member.skills && member.skills.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                    {member.skills.slice(0, 4).map((skill) => (
                                        <span key={skill} className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-surface-lighter)] text-[var(--color-text-muted)]">{skill}</span>
                                    ))}
                                    {member.skills.length > 4 && <span className="text-[10px] text-[var(--color-text-muted)]">+{member.skills.length - 4}</span>}
                                </div>
                            )}
                        </div>
                    );
                })}

                {teamMembers.length === 0 && (
                    <div className="col-span-3 text-center py-16">
                        <span className="text-5xl mb-4 block">👥</span>
                        <p className="text-white font-semibold mb-2">Noch keine Teammitglieder</p>
                        <button onClick={() => setShowModal("addMember")} className="px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white text-sm hover:brightness-110">+ Neues Mitglied</button>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════ */
/* PLACEHOLDER PAGE                    */
/* ═══════════════════════════════════ */
export function PlaceholderPage({ title, icon }) {
    return (
        <div className="animate-fade-in flex flex-col items-center justify-center h-[60vh]">
            <span className="text-5xl mb-4">{icon}</span>
            <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
            <p className="text-sm text-[var(--color-text-muted)]">Diese Seite wird bald verfügbar sein.</p>
        </div>
    );
}
