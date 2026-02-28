"use client";

import { useApp } from "../context";

const priorityColors = {
    critical: "bg-[var(--color-danger)]",
    high: "bg-[var(--color-warning)]",
    medium: "bg-[var(--color-primary)]",
    low: "bg-[var(--color-success)]",
};

const statusLabels = {
    "in-progress": { text: "In Bearbeitung", color: "text-[var(--color-primary-light)]", bg: "bg-[var(--color-primary)]/15" },
    review: { text: "In Prüfung", color: "text-[var(--color-warning)]", bg: "bg-[var(--color-warning)]/15" },
    planning: { text: "Planung", color: "text-[var(--color-text-muted)]", bg: "bg-[var(--color-surface-lighter)]" },
    completed: { text: "Abgeschlossen", color: "text-[var(--color-success)]", bg: "bg-[var(--color-success)]/15" },
};

export default function ProjectCard({ project, delay }) {
    const { openProjectDetail } = useApp();
    const status = statusLabels[project.status] || statusLabels.planning;
    const budgetPercent = Math.round((project.budget.spent / project.budget.total) * 100);
    const isOverBudget = budgetPercent > 90;

    return (
        <div onClick={() => openProjectDetail(project.id)} className={`glass rounded-2xl p-5 animate-fade-in ${delay || ""} hover:border-[var(--color-primary)]/30 transition-all duration-300 group cursor-pointer`}>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <div className={`w-2 h-2 rounded-full ${priorityColors[project.priority]}`} />
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${status.bg} ${status.color}`}>
                            {status.text}
                        </span>
                    </div>
                    <h3 className="text-white font-semibold text-base group-hover:text-[var(--color-primary-light)] transition-colors">
                        {project.name}
                    </h3>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{project.client}</p>
                </div>
            </div>

            {/* Progress */}
            <div className="mb-4">
                <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-[var(--color-text-muted)]">Fortschritt</span>
                    <span className="text-white font-medium">{project.progress}%</span>
                </div>
                <div className="w-full h-2 bg-[var(--color-surface-lighter)] rounded-full overflow-hidden">
                    <div className="progress-bar h-full" style={{ width: `${project.progress}%` }} />
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
                {/* Team */}
                <div className="flex -space-x-2">
                    {project.team.map((member) => (
                        <div
                            key={member}
                            className="w-7 h-7 rounded-full bg-[var(--color-surface-lighter)] border-2 border-[var(--color-surface-card)] flex items-center justify-center text-[10px] font-bold text-[var(--color-text-muted)]"
                        >
                            {member}
                        </div>
                    ))}
                </div>

                {/* Tasks */}
                <div className="text-xs text-[var(--color-text-muted)]">
                    <span className="text-white font-medium">{project.tasks.completed}</span>/{project.tasks.total} Aufgaben
                </div>

                {/* Budget */}
                <div className={`text-xs font-medium ${isOverBudget ? "text-[var(--color-danger)]" : "text-[var(--color-text-muted)]"}`}>
                    €{(project.budget.spent / 1000).toFixed(0)}k / €{(project.budget.total / 1000).toFixed(0)}k
                </div>
            </div>
        </div>
    );
}
