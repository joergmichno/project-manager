"use client";

import { useApp } from "../context";

const priorityStyles = {
    critical: { dot: "bg-[var(--color-danger)]", badge: "bg-[var(--color-danger)]/15 text-[var(--color-danger)]" },
    high: { dot: "bg-[var(--color-warning)]", badge: "bg-[var(--color-warning)]/15 text-[var(--color-warning)]" },
    medium: { dot: "bg-[var(--color-primary)]", badge: "bg-[var(--color-primary)]/15 text-[var(--color-primary-light)]" },
    low: { dot: "bg-[var(--color-success)]", badge: "bg-[var(--color-success)]/15 text-[var(--color-success)]" },
};

const priorityLabels = {
    critical: "Kritisch",
    high: "Hoch",
    medium: "Mittel",
    low: "Niedrig",
};

const columns = [
    { key: "todo", label: "Offen", icon: "📋", color: "var(--color-text-muted)" },
    { key: "inProgress", label: "In Bearbeitung", icon: "🔨", color: "var(--color-primary)" },
    { key: "review", label: "In Prüfung", icon: "👀", color: "var(--color-warning)" },
    { key: "done", label: "Erledigt", icon: "✅", color: "var(--color-success)" },
];

const columnOrder = ["todo", "inProgress", "review", "done"];

function getNextColumn(current) {
    const idx = columnOrder.indexOf(current);
    return idx < columnOrder.length - 1 ? columnOrder[idx + 1] : null;
}

function getPrevColumn(current) {
    const idx = columnOrder.indexOf(current);
    return idx > 0 ? columnOrder[idx - 1] : null;
}

function TaskCard({ task, column }) {
    const { moveTask, deleteTask, setSelectedTask, setShowModal } = useApp();
    const style = priorityStyles[task.priority];
    const label = priorityLabels[task.priority];
    const nextCol = getNextColumn(column);
    const prevCol = getPrevColumn(column);

    return (
        <div
            className="bg-[var(--color-surface)] rounded-xl p-3.5 border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 transition-all duration-200 cursor-pointer group hover:translate-y-[-2px] hover:shadow-lg hover:shadow-[var(--color-primary)]/5"
            onClick={() => { setSelectedTask({ ...task, column }); setShowModal("taskDetail"); }}
        >
            <div className="flex items-start justify-between mb-2">
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${style.badge}`}>
                    {label}
                </span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {prevCol && (
                        <button
                            onClick={(e) => { e.stopPropagation(); moveTask(task.id, column, prevCol); }}
                            className="w-5 h-5 rounded bg-[var(--color-surface-lighter)] hover:bg-[var(--color-primary)]/20 flex items-center justify-center text-[10px] text-[var(--color-text-muted)] hover:text-[var(--color-primary-light)]"
                            title="Zurück"
                        >◀</button>
                    )}
                    {nextCol && (
                        <button
                            onClick={(e) => { e.stopPropagation(); moveTask(task.id, column, nextCol); }}
                            className="w-5 h-5 rounded bg-[var(--color-surface-lighter)] hover:bg-[var(--color-primary)]/20 flex items-center justify-center text-[10px] text-[var(--color-text-muted)] hover:text-[var(--color-primary-light)]"
                            title="Weiter"
                        >▶</button>
                    )}
                    <button
                        onClick={(e) => { e.stopPropagation(); deleteTask(task.id, column); }}
                        className="w-5 h-5 rounded bg-[var(--color-surface-lighter)] hover:bg-[var(--color-danger)]/20 flex items-center justify-center text-[10px] text-[var(--color-text-muted)] hover:text-[var(--color-danger)]"
                        title="Löschen"
                    >✕</button>
                </div>
            </div>
            <h4 className="text-sm text-white font-medium mb-2 leading-snug">{task.title}</h4>
            <div className="flex items-center justify-between">
                <span className="text-[11px] text-[var(--color-text-muted)]">{task.project}</span>
                <div className="w-6 h-6 rounded-full bg-[var(--color-surface-lighter)] flex items-center justify-center text-[9px] font-bold text-[var(--color-text-muted)]">
                    {task.assignee}
                </div>
            </div>
        </div>
    );
}

export default function KanbanBoard({ tasks }) {
    const { setShowModal } = useApp();

    return (
        <div className="animate-fade-in stagger-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold text-sm">Kanban Board</h3>
                <button
                    onClick={() => setShowModal("addTask")}
                    className="text-xs text-[var(--color-primary-light)] hover:text-white bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/20 px-3 py-1.5 rounded-lg transition-all"
                >
                    + Aufgabe hinzufügen
                </button>
            </div>

            <div className="grid grid-cols-4 gap-4">
                {columns.map((col) => (
                    <div
                        key={col.key}
                        className="kanban-column rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-card)]/50 p-3 transition-colors duration-200 min-h-[200px]"
                    >
                        {/* Column Header */}
                        <div className="flex items-center gap-2 mb-3 px-1">
                            <span className="text-sm">{col.icon}</span>
                            <span className="text-xs font-semibold text-[var(--color-text)]">{col.label}</span>
                            <span className="text-[10px] font-medium bg-[var(--color-surface-lighter)] text-[var(--color-text-muted)] px-1.5 py-0.5 rounded-full ml-auto">
                                {tasks[col.key]?.length || 0}
                            </span>
                        </div>

                        {/* Cards */}
                        <div className="flex flex-col gap-2.5">
                            {tasks[col.key]?.map((task) => (
                                <TaskCard key={task.id} task={task} column={col.key} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
