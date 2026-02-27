"use client";

import { useApp } from "../context";

export function ProjectsPage() {
    const { projects, setCurrentPage } = useApp();

    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Projekte</h2>
                <span className="text-xs text-[var(--color-text-muted)]">{projects.length} Projekte insgesamt</span>
            </div>

            <div className="flex flex-col gap-4">
                {projects.map((project) => {
                    const budgetPercent = Math.round((project.budget.spent / project.budget.total) * 100);
                    const statusLabels = {
                        "in-progress": { text: "In Bearbeitung", color: "text-[var(--color-primary-light)]", bg: "bg-[var(--color-primary)]/15" },
                        review: { text: "In Prüfung", color: "text-[var(--color-warning)]", bg: "bg-[var(--color-warning)]/15" },
                        planning: { text: "Planung", color: "text-[var(--color-text-muted)]", bg: "bg-[var(--color-surface-lighter)]" },
                    };
                    const status = statusLabels[project.status] || statusLabels.planning;

                    return (
                        <div key={project.id} className="glass rounded-2xl p-6 hover:border-[var(--color-primary)]/30 transition-all group">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-white font-semibold text-lg group-hover:text-[var(--color-primary-light)] transition-colors">{project.name}</h3>
                                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${status.bg} ${status.color}`}>{status.text}</span>
                                    </div>
                                    <p className="text-sm text-[var(--color-text-muted)]">{project.client} • Deadline: {new Date(project.deadline).toLocaleDateString("de-DE")}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-white">{project.progress}%</p>
                                    <p className="text-xs text-[var(--color-text-muted)]">Fortschritt</p>
                                </div>
                            </div>

                            <div className="w-full h-2.5 bg-[var(--color-surface-lighter)] rounded-full overflow-hidden mb-4">
                                <div className="progress-bar h-full" style={{ width: `${project.progress}%` }} />
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-4">
                                    <span className="text-[var(--color-text-muted)]">
                                        <span className="text-white font-medium">{project.tasks.completed}</span>/{project.tasks.total} Aufgaben
                                    </span>
                                    <span className={`font-medium ${budgetPercent > 90 ? "text-[var(--color-danger)]" : "text-[var(--color-text-muted)]"}`}>
                                        €{(project.budget.spent / 1000).toFixed(0)}k / €{(project.budget.total / 1000).toFixed(0)}k Budget
                                    </span>
                                </div>
                                <div className="flex -space-x-2">
                                    {project.team.map((m) => (
                                        <div key={m} className="w-7 h-7 rounded-full bg-[var(--color-surface-lighter)] border-2 border-[var(--color-surface-card)] flex items-center justify-center text-[10px] font-bold text-[var(--color-text-muted)]">{m}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export function TasksPage() {
    const { kanbanTasks } = useApp();
    const allTasks = [...kanbanTasks.todo, ...kanbanTasks.inProgress, ...kanbanTasks.review, ...kanbanTasks.done];
    const columnLabels = { todo: "Offen", inProgress: "In Bearbeitung", review: "In Prüfung", done: "Erledigt" };
    const priorityLabels = { critical: "Kritisch", high: "Hoch", medium: "Mittel", low: "Niedrig" };

    function getColumn(taskId) {
        for (const [col, tasks] of Object.entries(kanbanTasks)) {
            if (tasks.find((t) => t.id === taskId)) return col;
        }
        return "todo";
    }

    return (
        <div className="animate-fade-in">
            <h2 className="text-xl font-bold text-white mb-6">Alle Aufgaben</h2>

            <div className="glass rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-[var(--color-border)]">
                            <th className="text-left px-4 py-3 text-[var(--color-text-muted)] font-medium">Aufgabe</th>
                            <th className="text-left px-4 py-3 text-[var(--color-text-muted)] font-medium">Projekt</th>
                            <th className="text-left px-4 py-3 text-[var(--color-text-muted)] font-medium">Status</th>
                            <th className="text-left px-4 py-3 text-[var(--color-text-muted)] font-medium">Priorität</th>
                            <th className="text-left px-4 py-3 text-[var(--color-text-muted)] font-medium">Zugewiesen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allTasks.map((task) => (
                            <tr key={task.id} className="border-b border-[var(--color-border)] hover:bg-[var(--color-surface-light)] transition-colors">
                                <td className="px-4 py-3 text-white">{task.title}</td>
                                <td className="px-4 py-3 text-[var(--color-text-muted)]">{task.project}</td>
                                <td className="px-4 py-3"><span className="text-xs bg-[var(--color-primary)]/15 text-[var(--color-primary-light)] px-2 py-0.5 rounded-full">{columnLabels[getColumn(task.id)]}</span></td>
                                <td className="px-4 py-3 text-[var(--color-text-muted)]">{priorityLabels[task.priority]}</td>
                                <td className="px-4 py-3">
                                    <div className="w-6 h-6 rounded-full bg-[var(--color-surface-lighter)] flex items-center justify-center text-[9px] font-bold text-[var(--color-text-muted)]">{task.assignee}</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export function TeamPage() {
    const { teamMembers } = useApp();

    return (
        <div className="animate-fade-in">
            <h2 className="text-xl font-bold text-white mb-6">Team</h2>

            <div className="grid grid-cols-3 gap-5">
                {teamMembers.map((member) => (
                    <div key={member.initials} className="glass rounded-2xl p-6 text-center hover:border-[var(--color-primary)]/30 transition-all group">
                        <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform"
                            style={{ backgroundColor: member.color + "33", color: member.color }}
                        >
                            {member.initials}
                        </div>
                        <h3 className="text-white font-semibold">{member.name}</h3>
                        <p className="text-sm text-[var(--color-text-muted)] mt-1">{member.role}</p>
                        <div className="flex items-center justify-center gap-1.5 mt-3">
                            <div className="w-2 h-2 rounded-full bg-[var(--color-success)]" />
                            <span className="text-xs text-[var(--color-success)]">Online</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function PlaceholderPage({ title, icon }) {
    return (
        <div className="animate-fade-in flex flex-col items-center justify-center h-[60vh]">
            <span className="text-5xl mb-4">{icon}</span>
            <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
            <p className="text-sm text-[var(--color-text-muted)]">Diese Seite wird bald verfügbar sein.</p>
        </div>
    );
}
