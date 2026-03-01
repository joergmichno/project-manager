"use client";

import { useState, useEffect, useRef, useMemo, useLayoutEffect } from "react";
import { useApp } from "../context";

export default function GanttChart() {
    const { kanbanTasks, projects, updateTask, setSelectedTask, setShowModal } = useApp();
    const [viewMode, setViewMode] = useState("day"); // 'day', 'week', 'month'
    const [tasks, setTasks] = useState([]);

    const columnLabels = { todo: "Offen", inProgress: "In Bearbeitung", review: "In Prüfung", done: "Erledigt" };

    // Flatten tasks and sort by start date
    useEffect(() => {
        const all = [];
        for (const [col, colTasks] of Object.entries(kanbanTasks)) {
            for (const t of colTasks) {
                if (t.startDate && t.deadline) {
                    all.push({ ...t, column: col });
                }
            }
        }
        all.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
        setTasks(all);
    }, [kanbanTasks]);

    // Calculate timeline bounds
    const timeline = useMemo(() => {
        if (tasks.length === 0) return { start: new Date(), end: new Date(), days: [] };

        let minDate = new Date(tasks[0].startDate);
        let maxDate = new Date(tasks[0].deadline);

        tasks.forEach(t => {
            const start = new Date(t.startDate);
            const end = new Date(t.deadline);
            if (start < minDate) minDate = start;
            if (end > maxDate) maxDate = end;
        });

        // Add padding (7 days before, 14 days after)
        minDate.setDate(minDate.getDate() - 7);
        maxDate.setDate(maxDate.getDate() + 14);

        const days = [];
        let cur = new Date(minDate);
        while (cur <= maxDate) {
            days.push(new Date(cur));
            cur.setDate(cur.getDate() + 1);
        }

        return { start: minDate, end: maxDate, days };
    }, [tasks]);

    // Generate headers for timeline
    const headers = useMemo(() => {
        const months = [];
        let currentMonth = null;
        let daysInMonth = 0;

        timeline.days.forEach((day, i) => {
            const m = day.toLocaleString("de-DE", { month: "long", year: "numeric" });
            if (m !== currentMonth) {
                if (currentMonth !== null) months.push({ label: currentMonth, colspan: daysInMonth });
                currentMonth = m;
                daysInMonth = 1;
            } else {
                daysInMonth++;
            }
            if (i === timeline.days.length - 1) {
                months.push({ label: currentMonth, colspan: daysInMonth });
            }
        });

        return { months };
    }, [timeline]);

    // Drag & Resize State
    const headerRef = useRef(null);
    const bodyRef = useRef(null);
    const [dragging, setDragging] = useState(null); // { id, type: 'move'|'resize-left'|'resize-right', startX, initialStart, initialEnd }

    // Sync header and body scroll
    const handleScroll = (e) => {
        if (headerRef.current && e.target === bodyRef.current) {
            headerRef.current.scrollLeft = e.target.scrollLeft;
        }
    };

    const dayWidth = viewMode === "day" ? 40 : viewMode === "week" ? 10 : 3;

    // Auto-scroll to today
    useEffect(() => {
        if (bodyRef.current && timeline.days.length > 0) {
            const today = new Date();
            let targetDate = today;
            // If today is out of bounds, scroll to first task
            if (today < timeline.start || today > timeline.end) {
                targetDate = new Date(tasks[0]?.startDate || timeline.start);
            }
            const offsetDays = (targetDate - timeline.start) / (1000 * 60 * 60 * 24);
            const scrollX = Math.max(0, (offsetDays * dayWidth) - 100);

            const timer = setTimeout(() => {
                if (bodyRef.current) {
                    bodyRef.current.scrollTo({ left: scrollX, behavior: 'smooth' });
                }
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [timeline, dayWidth, tasks]);

    function getTaskStyle(task) {
        const start = new Date(task.startDate);
        const end = new Date(task.deadline);
        const offsetDays = (start - timeline.start) / (1000 * 60 * 60 * 24);
        const durationDays = (end - start) / (1000 * 60 * 60 * 24) + 1;

        return {
            left: `${offsetDays * dayWidth}px`,
            width: `${Math.max(durationDays * dayWidth, dayWidth)}px`,
        };
    }

    function handleMouseDown(e, task, type) {
        e.preventDefault(); // Verhindert den nativen Browser-Drag (Ghost-Image/Textauswahl)
        e.stopPropagation();
        setDragging({
            id: task.id,
            column: task.column,
            type,
            startX: e.clientX,
            initialStart: new Date(task.startDate),
            initialEnd: new Date(task.deadline)
        });
    }

    useEffect(() => {
        function handleMouseMove(e) {
            if (!dragging) return;

            const diffX = e.clientX - dragging.startX;
            const diffDays = Math.round(diffX / dayWidth);

            if (diffDays === 0) return;

            const t = tasks.find(t => t.id === dragging.id);
            if (!t) return;

            let newStart = new Date(dragging.initialStart);
            let newEnd = new Date(dragging.initialEnd);

            if (dragging.type === 'move') {
                newStart.setDate(newStart.getDate() + diffDays);
                newEnd.setDate(newEnd.getDate() + diffDays);
            } else if (dragging.type === 'resize-left') {
                newStart.setDate(newStart.getDate() + diffDays);
                if (newStart > newEnd) newStart = new Date(newEnd);
            } else if (dragging.type === 'resize-right') {
                newEnd.setDate(newEnd.getDate() + diffDays);
                if (newEnd < newStart) newEnd = new Date(newStart);
            }

            // Update local state for smooth dragging visually
            setTasks(prev => prev.map(task =>
                task.id === dragging.id
                    ? { ...task, startDate: newStart.toISOString().split("T")[0], deadline: newEnd.toISOString().split("T")[0] }
                    : task
            ));
        }

        function handleMouseUp() {
            if (dragging) {
                // Save to global context
                const updatedTask = tasks.find(t => t.id === dragging.id);
                if (updatedTask) {
                    updateTask(updatedTask.id, updatedTask.column, {
                        startDate: updatedTask.startDate,
                        deadline: updatedTask.deadline
                    });
                }
                setDragging(null);
            }
        }

        if (dragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [dragging, tasks, dayWidth, updateTask]);

    // Draw Dependency Lines (SVG)
    const renderDependencies = () => {
        const lines = [];
        tasks.forEach(t => {
            if (t.dependencies && t.dependencies.length > 0) {
                t.dependencies.forEach(depId => {
                    const depTask = tasks.find(x => x.id === depId);
                    if (!depTask) return;

                    const startT = new Date(t.startDate);
                    const depEnd = new Date(depTask.deadline);

                    const offsetT = (startT - timeline.start) / (1000 * 60 * 60 * 24);
                    const offsetDep = (depEnd - timeline.start) / (1000 * 60 * 60 * 24) + 1;

                    const depIdx = tasks.indexOf(depTask);
                    const tIdx = tasks.indexOf(t);
                    if (depIdx === -1 || tIdx === -1) return;

                    const x1 = offsetDep * dayWidth;
                    const y1 = depIdx * 56 + 28; // row center
                    const x2 = offsetT * dayWidth;
                    const y2 = tIdx * 56 + 28;

                    // Path math for arrow
                    const isCritical = t.priority === "critical" || depTask.priority === "critical";
                    const color = isCritical ? "var(--color-danger)" : "var(--color-primary-light)";

                    const isBackward = x2 <= x1 + 10;
                    let path;
                    if (isBackward) {
                        path = `M ${x1} ${y1} L ${x1 + 15} ${y1} L ${x1 + 15} ${y1 + 28} L ${x2 - 15} ${y1 + 28} L ${x2 - 15} ${y2} L ${x2} ${y2}`;
                    } else {
                        path = `M ${x1} ${y1} L ${x1 + 15} ${y1} L ${x1 + 15} ${y2} L ${x2} ${y2}`;
                    }

                    lines.push(
                        <g key={`${depId}-${t.id}`}>
                            <path d={path} fill="none" stroke={color} strokeWidth={isCritical ? "2.5" : "2"} strokeDasharray={isCritical ? "0" : "5 3"} opacity="0.8" />
                            <polygon points={`${x2},${y2 - 5} ${x2 + 7},${y2} ${x2},${y2 + 5}`} fill={color} opacity="1" />
                        </g>
                    );
                });
            }
        });
        return lines;
    };

    const statusColors = {
        todo: "bg-[var(--color-text-muted)]",
        inProgress: "bg-[var(--color-primary)]",
        review: "bg-[var(--color-warning)]",
        done: "bg-[var(--color-success)]",
    };

    return (
        <div className="animate-fade-in flex flex-col h-[calc(100vh-140px)]">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-4 glass p-3 rounded-2xl">
                <div className="flex items-center gap-4">
                    <h2 className="text-lg font-bold text-white">Gantt-Diagramm</h2>
                    <div className="flex bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-1">
                        {["day", "week", "month"].map(mode => (
                            <button
                                key={mode}
                                onClick={() => setViewMode(mode)}
                                className={`px-3 py-1 text-xs rounded-md capitalize transition-colors ${viewMode === mode ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text-muted)] hover:text-white"}`}
                            >
                                {mode === "day" ? "Tag" : mode === "week" ? "Woche" : "Monat"}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[var(--color-danger)]" /> Kritischer Pfad</span>
                    <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[var(--color-border)]" /> Abhängigkeit</span>
                </div>
            </div>

            {/* Gantt Container (Unified Scroll Wrapper) */}
            <div className="flex-1 glass rounded-2xl border border-[var(--color-border)] overflow-auto relative" ref={bodyRef}>
                <div className="flex flex-col min-w-full" style={{ width: `calc(300px + ${timeline.days.length * dayWidth}px + 48px)` }}>
                    {/* Header Row (Sticky Top) */}
                    <div className="flex border-b border-[var(--color-border)] bg-[var(--color-surface-card)] sticky top-0 z-50 shadow-sm">
                        <div className="w-[300px] shrink-0 border-r border-[var(--color-border)] p-4 flex items-end sticky left-0 z-50 bg-[var(--color-surface-card)]">
                            <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Aufgaben & Zuweisung</span>
                        </div>
                        <div className="flex-1 flex bg-[var(--color-surface-card)]">
                            <div className="flex flex-col h-full" style={{ width: timeline.days.length * dayWidth }}>
                                {/* Months */}
                                <div className="flex border-b border-[var(--color-border)]">
                                    {headers.months.map((m, i) => (
                                        <div key={i} className="text-xs font-bold text-white p-2 border-r border-[var(--color-border)] text-center truncate" style={{ width: m.colspan * dayWidth }}>
                                            {m.label}
                                        </div>
                                    ))}
                                </div>
                                {/* Days */}
                                <div className="flex h-6 bg-[var(--color-surface)]">
                                    {timeline.days.map((day, i) => {
                                        const isWeekend = day.getDay() === 0 || day.getDay() === 6;
                                        const isToday = new Date().toDateString() === day.toDateString();
                                        return (
                                            <div key={i} className={`relative flex-shrink-0 border-r border-[var(--color-border)] flex items-center justify-center text-[9px] ${isWeekend ? 'bg-[var(--color-danger)]/5 text-[var(--color-danger)]/50' : 'text-[var(--color-text-muted)]'}`} style={{ width: dayWidth }}>
                                                {viewMode === "day" ? day.getDate() : viewMode === "week" ? (day.getDay() === 1 ? day.getDate() : "") : ""}
                                                {isToday && viewMode === "day" && <div className="absolute top-[24px] w-0.5 h-[2000px] bg-[var(--color-primary)]/50 z-20 pointer-events-none" />}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            {/* Empty right-edge spacer for header */}
                            <div className="w-12 shrink-0 border-b border-[var(--color-border)]" />
                        </div>
                    </div>

                    {/* Body Row */}
                    <div className="flex flex-1">
                        {/* Sidebar / Task List (Sticky) */}
                        <div className="w-[300px] shrink-0 border-r border-[var(--color-border)] bg-[var(--color-surface-card)] sticky left-0 z-40">
                            {tasks.map(task => (
                                <div
                                    key={task.id}
                                    className="h-14 border-b border-[var(--color-border)] p-3 flex items-center justify-between hover:bg-[var(--color-surface)] transition-colors cursor-pointer"
                                    onClick={() => { setSelectedTask(task); setShowModal("taskDetail"); }}
                                >
                                    <div className="min-w-0 pr-2">
                                        <p className="text-sm text-white truncate font-medium">{task.title}</p>
                                        <p className="text-[10px] text-[var(--color-text-muted)] truncate">{task.project}</p>
                                    </div>
                                    <div className="w-6 h-6 shrink-0 rounded-full bg-[var(--color-surface-lighter)] flex items-center justify-center text-[9px] font-bold text-white border border-[var(--color-border)]">
                                        {task.assignee}
                                    </div>
                                </div>
                            ))}
                            {tasks.length === 0 && <div className="p-4 text-xs text-[var(--color-text-muted)]">Keine Aufgaben gefunden.</div>}
                        </div>

                        {/* Timeline Grid & Bars */}
                        <div className="flex-1 relative" style={{ minWidth: timeline.days.length * dayWidth, backgroundImage: `linear-gradient(to right, transparent calc(100% - 1px), var(--color-border) 100%)`, backgroundSize: `${dayWidth}px 100%`, borderRight: '1px solid var(--color-border)' }}>
                            {/* Dependencies SVG Layer */}
                            <svg className="absolute inset-0 pointer-events-none z-30" width="100%" height="100%">
                                {renderDependencies()}
                            </svg>

                            {/* Task Rows */}
                            {tasks.map((task, i) => {
                                const style = getTaskStyle(task);
                                const isCritical = task.priority === "critical";
                                const colorClass = statusColors[task.column] || statusColors.todo;

                                return (
                                    <div key={task.id} className="absolute h-14 w-full border-b border-[var(--color-border)]/50 hover:bg-white/5 z-20" style={{ top: i * 56 }}>
                                        {/* Gantt Bar */}
                                        <div
                                            className={`absolute top-2.5 h-9 rounded-lg shadow-lg group flex items-center cursor-move transition-shadow ${isCritical ? 'ring-2 ring-[var(--color-danger)] shadow-[0_0_12px_var(--color-danger)] z-10' : ''}`}
                                            style={{ left: style.left, width: style.width }}
                                            onMouseDown={(e) => handleMouseDown(e, task, 'move')}
                                        >
                                            <div className={`w-full h-full rounded-lg ${colorClass} opacity-80 group-hover:opacity-100 transition-opacity flex items-center px-3 overflow-hidden`}>
                                                <span className="text-[10px] font-bold text-white truncate">{task.title}</span>
                                            </div>

                                            {/* Resize Handles */}
                                            <div
                                                className="absolute left-0 top-0 w-3 h-full cursor-col-resize opacity-0 group-hover:opacity-100 hover:bg-white/20 rounded-l-lg"
                                                onMouseDown={(e) => handleMouseDown(e, task, 'resize-left')}
                                            />
                                            <div
                                                className="absolute right-0 top-0 w-3 h-full cursor-col-resize opacity-0 group-hover:opacity-100 hover:bg-white/20 rounded-r-lg"
                                                onMouseDown={(e) => handleMouseDown(e, task, 'resize-right')}
                                            />

                                            {/* Tooltip */}
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[var(--color-surface-card)] border border-[var(--color-border)] text-white text-[10px] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl transition-opacity">
                                                <strong>{new Date(task.startDate).toLocaleDateString("de-DE")}</strong> — <strong>{new Date(task.deadline).toLocaleDateString("de-DE")}</strong>
                                                <div className="text-[var(--color-text-muted)] mt-0.5">{task.assignee} • {columnLabels[task.column]}</div>
                                            </div>
                                        </div>

                                        {/* Milestones (if task ends) */}
                                        {task.column === "done" && (
                                            <div className="absolute top-4 w-3 h-3 bg-[var(--color-success)] rotate-45 z-10 border border-[var(--color-surface-card)]" style={{ left: `calc(${style.left} + ${style.width} + 4px)` }} title="Erledigt" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        {/* Empty right-edge spacer for body */}
                        <div className="w-12 shrink-0" />
                    </div>
                </div>
            </div>
        </div>
    );
}
