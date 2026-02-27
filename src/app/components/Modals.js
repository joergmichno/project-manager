"use client";

import { useState } from "react";
import { useApp } from "../context";

const priorityOptions = [
    { value: "low", label: "Niedrig" },
    { value: "medium", label: "Mittel" },
    { value: "high", label: "Hoch" },
    { value: "critical", label: "Kritisch" },
];

export function AddTaskModal() {
    const { setShowModal, addTask, projects, teamMembers } = useApp();
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("medium");
    const [assignee, setAssignee] = useState("JM");
    const [project, setProject] = useState(projects[0]?.name || "");

    function handleSubmit(e) {
        e.preventDefault();
        if (!title.trim()) return;
        addTask({ title: title.trim(), priority, assignee, project });
        setShowModal(null);
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setShowModal(null)}>
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 w-[460px] max-w-[90vw] shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-lg font-bold text-white mb-5">Neue Aufgabe erstellen</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Title */}
                    <div>
                        <label className="text-xs text-[var(--color-text-muted)] mb-1.5 block">Titel</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Was muss erledigt werden?"
                            autoFocus
                            className="w-full bg-[var(--color-surface-light)] border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                        />
                    </div>

                    {/* Priority */}
                    <div>
                        <label className="text-xs text-[var(--color-text-muted)] mb-1.5 block">Priorität</label>
                        <div className="flex gap-2">
                            {priorityOptions.map((opt) => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => setPriority(opt.value)}
                                    className={`flex-1 text-xs py-2 rounded-lg border transition-all ${priority === opt.value
                                            ? "border-[var(--color-primary)] bg-[var(--color-primary)]/15 text-[var(--color-primary-light)]"
                                            : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-surface-lighter)]"
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Project */}
                    <div>
                        <label className="text-xs text-[var(--color-text-muted)] mb-1.5 block">Projekt</label>
                        <select
                            value={project}
                            onChange={(e) => setProject(e.target.value)}
                            className="w-full bg-[var(--color-surface-light)] border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[var(--color-primary)] transition-colors appearance-none"
                        >
                            {projects.map((p) => (
                                <option key={p.id} value={p.name}>{p.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Assignee */}
                    <div>
                        <label className="text-xs text-[var(--color-text-muted)] mb-1.5 block">Zugewiesen an</label>
                        <div className="flex gap-2">
                            {teamMembers.map((m) => (
                                <button
                                    key={m.initials}
                                    type="button"
                                    onClick={() => setAssignee(m.initials)}
                                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${assignee === m.initials
                                            ? "ring-2 ring-[var(--color-primary)] scale-110"
                                            : "hover:scale-105"
                                        }`}
                                    style={{ backgroundColor: m.color + "33", color: m.color }}
                                    title={m.name}
                                >
                                    {m.initials}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-2">
                        <button
                            type="button"
                            onClick={() => setShowModal(null)}
                            className="flex-1 py-2.5 rounded-xl border border-[var(--color-border)] text-sm text-[var(--color-text-muted)] hover:bg-[var(--color-surface-light)] transition-colors"
                        >
                            Abbrechen
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-sm text-white font-medium hover:opacity-90 transition-opacity"
                        >
                            Erstellen
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export function TaskDetailModal() {
    const { selectedTask, setShowModal, moveTask, deleteTask } = useApp();
    if (!selectedTask) return null;

    const priorityLabels = { critical: "Kritisch", high: "Hoch", medium: "Mittel", low: "Niedrig" };
    const columnLabels = { todo: "Offen", inProgress: "In Bearbeitung", review: "In Prüfung", done: "Erledigt" };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setShowModal(null)}>
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 w-[460px] max-w-[90vw] shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-start justify-between mb-4">
                    <h2 className="text-lg font-bold text-white">{selectedTask.title}</h2>
                    <button onClick={() => setShowModal(null)} className="text-[var(--color-text-muted)] hover:text-white text-lg">✕</button>
                </div>

                <div className="flex flex-col gap-3 mb-6">
                    <div className="flex justify-between text-sm">
                        <span className="text-[var(--color-text-muted)]">Status</span>
                        <span className="text-white">{columnLabels[selectedTask.column]}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-[var(--color-text-muted)]">Priorität</span>
                        <span className="text-white">{priorityLabels[selectedTask.priority]}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-[var(--color-text-muted)]">Projekt</span>
                        <span className="text-white">{selectedTask.project}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-[var(--color-text-muted)]">Zugewiesen</span>
                        <span className="text-white">{selectedTask.assignee}</span>
                    </div>
                </div>

                <div className="flex gap-2">
                    {selectedTask.column !== "done" && (
                        <button
                            onClick={() => {
                                const cols = ["todo", "inProgress", "review", "done"];
                                const next = cols[cols.indexOf(selectedTask.column) + 1];
                                if (next) moveTask(selectedTask.id, selectedTask.column, next);
                                setShowModal(null);
                            }}
                            className="flex-1 py-2 rounded-xl bg-[var(--color-primary)]/15 text-[var(--color-primary-light)] text-sm hover:bg-[var(--color-primary)]/25 transition-colors"
                        >
                            Weiter verschieben →
                        </button>
                    )}
                    <button
                        onClick={() => { deleteTask(selectedTask.id, selectedTask.column); setShowModal(null); }}
                        className="py-2 px-4 rounded-xl bg-[var(--color-danger)]/15 text-[var(--color-danger)] text-sm hover:bg-[var(--color-danger)]/25 transition-colors"
                    >
                        Löschen
                    </button>
                </div>
            </div>
        </div>
    );
}

export function NotificationsPanel({ onClose }) {
    const { notifications, markNotificationRead } = useApp();

    return (
        <div className="fixed inset-0 z-[90]" onClick={onClose}>
            <div
                className="absolute top-16 right-8 w-[340px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-2xl overflow-hidden animate-fade-in"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="px-4 py-3 border-b border-[var(--color-border)] flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white">Benachrichtigungen</h3>
                    <span className="text-[10px] bg-[var(--color-danger)] text-white px-1.5 py-0.5 rounded-full">
                        {notifications.filter((n) => !n.read).length}
                    </span>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                    {notifications.map((n) => (
                        <button
                            key={n.id}
                            onClick={() => markNotificationRead(n.id)}
                            className={`w-full text-left px-4 py-3 border-b border-[var(--color-border)] hover:bg-[var(--color-surface-light)] transition-colors ${n.read ? "opacity-50" : ""
                                }`}
                        >
                            <p className="text-sm text-white">{n.text}</p>
                            <p className="text-[11px] text-[var(--color-text-muted)] mt-1">{n.time}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
