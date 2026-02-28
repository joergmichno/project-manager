"use client";

import { useState } from "react";
import { useApp } from "../context";

const priorityOptions = [
    { value: "low", label: "Niedrig", color: "text-green-400" },
    { value: "medium", label: "Mittel", color: "text-blue-400" },
    { value: "high", label: "Hoch", color: "text-orange-400" },
    { value: "critical", label: "Kritisch", color: "text-red-400" },
];

const statusOptions = [
    { value: "planning", label: "Planung" },
    { value: "in-progress", label: "In Bearbeitung" },
    { value: "review", label: "In Prüfung" },
    { value: "completed", label: "Abgeschlossen" },
];

/* ═══════════════════════════════════ */
/* MODAL WRAPPER                       */
/* ═══════════════════════════════════ */
function ModalWrapper({ title, onClose, children, wide }) {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
            <div className={`bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-2xl p-6 shadow-2xl ${wide ? "w-[700px] max-h-[85vh]" : "w-[500px] max-h-[80vh]"} overflow-y-auto`} onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                    <button onClick={onClose} className="w-8 h-8 rounded-lg bg-[var(--color-surface)] hover:bg-[var(--color-danger)]/20 flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-danger)] transition-all">✕</button>
                </div>
                {children}
            </div>
        </div>
    );
}

function InputField({ label, value, onChange, type = "text", placeholder, required, textarea }) {
    const cls = "w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors";
    return (
        <div>
            <label className="text-xs text-[var(--color-text-muted)] mb-1.5 block font-medium">{label}{required && <span className="text-[var(--color-danger)] ml-0.5">*</span>}</label>
            {textarea ? (
                <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={`${cls} min-h-[80px] resize-none`} required={required} />
            ) : (
                <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} required={required} />
            )}
        </div>
    );
}

function SelectField({ label, value, onChange, options, required }) {
    return (
        <div>
            <label className="text-xs text-[var(--color-text-muted)] mb-1.5 block font-medium">{label}{required && <span className="text-[var(--color-danger)] ml-0.5">*</span>}</label>
            <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[var(--color-primary)] transition-colors appearance-none" required={required}>
                <option value="">Auswählen...</option>
                {options.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
        </div>
    );
}

/* ═══════════════════════════════════ */
/* ADD TASK MODAL                      */
/* ═══════════════════════════════════ */
export function AddTaskModal() {
    const { addTask, setShowModal, projects, teamMembers } = useApp();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("medium");
    const [assignee, setAssignee] = useState("");
    const [project, setProject] = useState("");
    const [deadline, setDeadline] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (!title.trim()) return;
        const proj = projects.find((p) => p.name === project);
        addTask({ title: title.trim(), description, priority, assignee, project, projectId: proj?.id || null, deadline });
        setShowModal(null);
    }

    return (
        <ModalWrapper title="✏️ Neue Aufgabe erstellen" onClose={() => setShowModal(null)}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <InputField label="Titel" value={title} onChange={setTitle} placeholder="z.B. Login-Seite implementieren" required />
                <InputField label="Beschreibung" value={description} onChange={setDescription} placeholder="Details zur Aufgabe..." textarea />
                <div className="grid grid-cols-2 gap-4">
                    <SelectField label="Priorität" value={priority} onChange={setPriority} options={priorityOptions} required />
                    <SelectField label="Zugewiesen an" value={assignee} onChange={setAssignee} options={teamMembers.map((m) => ({ value: m.initials, label: m.name }))} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <SelectField label="Projekt" value={project} onChange={setProject} options={projects.map((p) => ({ value: p.name, label: p.name }))} />
                    <InputField label="Deadline" value={deadline} onChange={setDeadline} type="date" />
                </div>
                <div className="flex gap-3 mt-2">
                    <button type="button" onClick={() => setShowModal(null)} className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--color-border)] text-sm text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] transition-colors">Abbrechen</button>
                    <button type="submit" className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-sm font-medium hover:brightness-110 transition-all">Erstellen</button>
                </div>
            </form>
        </ModalWrapper>
    );
}

/* ═══════════════════════════════════ */
/* TASK DETAIL MODAL (Extended)        */
/* ═══════════════════════════════════ */
export function TaskDetailModal() {
    const { selectedTask, setShowModal, moveTask, deleteTask, updateTask, addComment, teamMembers } = useApp();
    const [newComment, setNewComment] = useState("");
    const [editing, setEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(selectedTask?.title || "");
    const [editDesc, setEditDesc] = useState(selectedTask?.description || "");
    const [editPriority, setEditPriority] = useState(selectedTask?.priority || "medium");
    const [editAssignee, setEditAssignee] = useState(selectedTask?.assignee || "");

    if (!selectedTask) return null;

    const columnLabels = { todo: "Offen", inProgress: "In Bearbeitung", review: "In Prüfung", done: "Erledigt" };
    const columnOrder = ["todo", "inProgress", "review", "done"];
    const idx = columnOrder.indexOf(selectedTask.column);
    const nextCol = idx < columnOrder.length - 1 ? columnOrder[idx + 1] : null;

    function handleSave() {
        updateTask(selectedTask.id, selectedTask.column, { title: editTitle, description: editDesc, priority: editPriority, assignee: editAssignee });
        setEditing(false);
    }

    function handleComment() {
        if (!newComment.trim()) return;
        addComment(selectedTask.id, selectedTask.column, newComment.trim());
        setNewComment("");
    }

    return (
        <ModalWrapper title={editing ? "✏️ Aufgabe bearbeiten" : "📋 Aufgabendetails"} onClose={() => setShowModal(null)} wide>
            <div className="flex flex-col gap-4">
                {editing ? (
                    <>
                        <InputField label="Titel" value={editTitle} onChange={setEditTitle} required />
                        <InputField label="Beschreibung" value={editDesc} onChange={setEditDesc} textarea />
                        <div className="grid grid-cols-2 gap-4">
                            <SelectField label="Priorität" value={editPriority} onChange={setEditPriority} options={priorityOptions} />
                            <SelectField label="Zugewiesen" value={editAssignee} onChange={setEditAssignee} options={teamMembers.map((m) => ({ value: m.initials, label: m.name }))} />
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setEditing(false)} className="flex-1 px-4 py-2 rounded-xl border border-[var(--color-border)] text-sm text-[var(--color-text-muted)] hover:bg-[var(--color-surface)]">Abbrechen</button>
                            <button onClick={handleSave} className="flex-1 px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white text-sm font-medium hover:brightness-110">Speichern</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h4 className="text-white text-lg font-semibold mb-1">{selectedTask.title}</h4>
                                <p className="text-sm text-[var(--color-text-muted)]">{selectedTask.description || "Keine Beschreibung"}</p>
                            </div>
                            <button onClick={() => setEditing(true)} className="px-3 py-1.5 rounded-lg bg-[var(--color-surface)] text-xs text-[var(--color-primary-light)] hover:bg-[var(--color-primary)]/20 transition-colors">✏️ Bearbeiten</button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[
                                { label: "Status", value: columnLabels[selectedTask.column], icon: "📊" },
                                { label: "Priorität", value: priorityOptions.find((p) => p.value === selectedTask.priority)?.label || selectedTask.priority, icon: "🎯" },
                                { label: "Zugewiesen", value: teamMembers.find((m) => m.initials === selectedTask.assignee)?.name || selectedTask.assignee, icon: "👤" },
                                { label: "Projekt", value: selectedTask.project, icon: "📁" },
                            ].map((item) => (
                                <div key={item.label} className="bg-[var(--color-surface)] rounded-xl p-3 border border-[var(--color-border)]">
                                    <p className="text-[10px] text-[var(--color-text-muted)] mb-1">{item.icon} {item.label}</p>
                                    <p className="text-sm text-white font-medium truncate">{item.value}</p>
                                </div>
                            ))}
                        </div>

                        {selectedTask.deadline && (
                            <div className="bg-[var(--color-surface)] rounded-xl p-3 border border-[var(--color-border)]">
                                <p className="text-xs text-[var(--color-text-muted)]">📅 Deadline: <span className="text-white font-medium">{new Date(selectedTask.deadline).toLocaleDateString("de-DE")}</span></p>
                            </div>
                        )}

                        {/* Comments */}
                        <div className="border-t border-[var(--color-border)] pt-4">
                            <h5 className="text-sm text-white font-semibold mb-3">💬 Kommentare ({selectedTask.comments?.length || 0})</h5>
                            <div className="flex flex-col gap-2 mb-3 max-h-[200px] overflow-y-auto">
                                {(selectedTask.comments || []).map((c, i) => (
                                    <div key={i} className="bg-[var(--color-surface)] rounded-xl p-3 border border-[var(--color-border)]">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-bold text-[var(--color-primary-light)]">{c.author}</span>
                                            <span className="text-[10px] text-[var(--color-text-muted)]">{c.time}</span>
                                        </div>
                                        <p className="text-sm text-[var(--color-text)]">{c.text}</p>
                                    </div>
                                ))}
                                {(!selectedTask.comments || selectedTask.comments.length === 0) && <p className="text-xs text-[var(--color-text-muted)] italic">Noch keine Kommentare.</p>}
                            </div>
                            <div className="flex gap-2">
                                <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Kommentar schreiben..." className="flex-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl px-4 py-2 text-sm text-white placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]" onKeyDown={(e) => e.key === "Enter" && handleComment()} />
                                <button onClick={handleComment} className="px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white text-sm hover:brightness-110 transition-all">Senden</button>
                            </div>
                        </div>
                    </>
                )}

                {/* Actions */}
                {!editing && (
                    <div className="flex gap-3 border-t border-[var(--color-border)] pt-4">
                        {nextCol && (
                            <button onClick={() => { moveTask(selectedTask.id, selectedTask.column, nextCol); setShowModal(null); }} className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-sm font-medium hover:brightness-110 transition-all">
                                Weiter verschieben →
                            </button>
                        )}
                        <button onClick={() => { deleteTask(selectedTask.id, selectedTask.column); setShowModal(null); }} className="px-4 py-2.5 rounded-xl border border-[var(--color-danger)]/30 text-[var(--color-danger)] text-sm hover:bg-[var(--color-danger)]/10 transition-colors">
                            🗑 Löschen
                        </button>
                    </div>
                )}
            </div>
        </ModalWrapper>
    );
}

/* ═══════════════════════════════════ */
/* ADD/EDIT PROJECT MODAL              */
/* ═══════════════════════════════════ */
export function ProjectModal() {
    const { showModal, setShowModal, selectedProject, addProject, updateProject, teamMembers } = useApp();
    const isEdit = showModal === "editProject" && selectedProject;

    const [name, setName] = useState(isEdit ? selectedProject.name : "");
    const [client, setClient] = useState(isEdit ? selectedProject.client : "");
    const [description, setDescription] = useState(isEdit ? selectedProject.description : "");
    const [status, setStatus] = useState(isEdit ? selectedProject.status : "planning");
    const [priority, setPriority] = useState(isEdit ? selectedProject.priority : "medium");
    const [startDate, setStartDate] = useState(isEdit ? selectedProject.startDate : "");
    const [deadline, setDeadline] = useState(isEdit ? selectedProject.deadline : "");
    const [budgetTotal, setBudgetTotal] = useState(isEdit ? selectedProject.budget.total.toString() : "");
    const [budgetSpent, setBudgetSpent] = useState(isEdit ? selectedProject.budget.spent.toString() : "0");
    const [selectedTeam, setSelectedTeam] = useState(isEdit ? selectedProject.team : []);
    const [tagsInput, setTagsInput] = useState(isEdit ? (selectedProject.tags || []).join(", ") : "");
    const [progress, setProgress] = useState(isEdit ? selectedProject.progress.toString() : "0");

    function toggleTeamMember(initials) {
        setSelectedTeam((prev) => prev.includes(initials) ? prev.filter((m) => m !== initials) : [...prev, initials]);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!name.trim()) return;
        const projectData = {
            name: name.trim(),
            client: client.trim(),
            description: description.trim(),
            status,
            priority,
            progress: parseInt(progress) || 0,
            startDate,
            deadline,
            team: selectedTeam,
            budget: { total: parseInt(budgetTotal) || 0, spent: parseInt(budgetSpent) || 0 },
            tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
        };

        if (isEdit) {
            updateProject(selectedProject.id, projectData);
        } else {
            addProject(projectData);
        }
        setShowModal(null);
    }

    return (
        <ModalWrapper title={isEdit ? "✏️ Projekt bearbeiten" : "📁 Neues Projekt erstellen"} onClose={() => setShowModal(null)} wide>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <InputField label="Projektname" value={name} onChange={setName} placeholder="z.B. E-Commerce Redesign" required />
                    <InputField label="Kunde" value={client} onChange={setClient} placeholder="z.B. TechCorp GmbH" />
                </div>
                <InputField label="Beschreibung" value={description} onChange={setDescription} placeholder="Projekt-Beschreibung..." textarea />
                <div className="grid grid-cols-3 gap-4">
                    <SelectField label="Status" value={status} onChange={setStatus} options={statusOptions} required />
                    <SelectField label="Priorität" value={priority} onChange={setPriority} options={priorityOptions} required />
                    {isEdit && <InputField label="Fortschritt (%)" value={progress} onChange={setProgress} type="number" />}
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <InputField label="Startdatum" value={startDate} onChange={setStartDate} type="date" />
                    <InputField label="Deadline" value={deadline} onChange={setDeadline} type="date" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <InputField label="Budget gesamt (€)" value={budgetTotal} onChange={setBudgetTotal} type="number" placeholder="z.B. 45000" />
                    {isEdit && <InputField label="Budget verbraucht (€)" value={budgetSpent} onChange={setBudgetSpent} type="number" />}
                </div>
                <InputField label="Tags (kommagetrennt)" value={tagsInput} onChange={setTagsInput} placeholder="z.B. Frontend, UI/UX, React" />

                {/* Team Selection */}
                <div>
                    <label className="text-xs text-[var(--color-text-muted)] mb-2 block font-medium">Team zuweisen</label>
                    <div className="flex flex-wrap gap-2">
                        {teamMembers.map((m) => (
                            <button key={m.initials} type="button" onClick={() => toggleTeamMember(m.initials)}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm border transition-all ${selectedTeam.includes(m.initials)
                                    ? "border-[var(--color-primary)] bg-[var(--color-primary)]/15 text-[var(--color-primary-light)]"
                                    : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)]/30"
                                    }`}
                            >
                                <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: m.color + "33", color: m.color }}>{m.initials}</div>
                                {m.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex gap-3 mt-2">
                    <button type="button" onClick={() => setShowModal(null)} className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--color-border)] text-sm text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] transition-colors">Abbrechen</button>
                    <button type="submit" className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-sm font-medium hover:brightness-110 transition-all">{isEdit ? "Speichern" : "Erstellen"}</button>
                </div>
            </form>
        </ModalWrapper>
    );
}

/* ═══════════════════════════════════ */
/* ADD/EDIT MEMBER MODAL               */
/* ═══════════════════════════════════ */
export function MemberModal() {
    const { showModal, setShowModal, selectedMember, addMember, updateMember } = useApp();
    const isEdit = showModal === "editMember" && selectedMember;

    const [name, setName] = useState(isEdit ? selectedMember.name : "");
    const [initials, setInitials] = useState(isEdit ? selectedMember.initials : "");
    const [role, setRole] = useState(isEdit ? selectedMember.role : "");
    const [email, setEmail] = useState(isEdit ? (selectedMember.email || "") : "");
    const [phone, setPhone] = useState(isEdit ? (selectedMember.phone || "") : "");
    const [color, setColor] = useState(isEdit ? selectedMember.color : "#6366f1");
    const [skillsInput, setSkillsInput] = useState(isEdit ? (selectedMember.skills || []).join(", ") : "");
    const [status, setStatus] = useState(isEdit ? (selectedMember.status || "online") : "online");

    function handleSubmit(e) {
        e.preventDefault();
        if (!name.trim() || !initials.trim()) return;
        const memberData = {
            name: name.trim(),
            initials: initials.trim().toUpperCase(),
            role: role.trim(),
            email: email.trim(),
            phone: phone.trim(),
            color,
            skills: skillsInput.split(",").map((s) => s.trim()).filter(Boolean),
            status,
        };
        if (isEdit) {
            updateMember(selectedMember.id, memberData);
        } else {
            addMember(memberData);
        }
        setShowModal(null);
    }

    // Auto-generate initials from name
    function handleNameChange(val) {
        setName(val);
        if (!isEdit && val.trim()) {
            const parts = val.trim().split(" ");
            const gen = parts.length >= 2 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : val.substring(0, 2).toUpperCase();
            setInitials(gen);
        }
    }

    return (
        <ModalWrapper title={isEdit ? "✏️ Mitarbeiter bearbeiten" : "👤 Neues Teammitglied"} onClose={() => setShowModal(null)}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <InputField label="Vollständiger Name" value={name} onChange={handleNameChange} placeholder="z.B. Max Mustermann" required />
                    <InputField label="Kürzel" value={initials} onChange={(v) => setInitials(v.toUpperCase())} placeholder="z.B. MM" required />
                </div>
                <InputField label="Rolle" value={role} onChange={setRole} placeholder="z.B. Frontend Entwickler" />
                <div className="grid grid-cols-2 gap-4">
                    <InputField label="E-Mail" value={email} onChange={setEmail} type="email" placeholder="max@example.com" />
                    <InputField label="Telefon" value={phone} onChange={setPhone} placeholder="+49 170 ..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs text-[var(--color-text-muted)] mb-1.5 block font-medium">Farbe</label>
                        <div className="flex items-center gap-3">
                            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-10 h-10 rounded-xl cursor-pointer border border-[var(--color-border)]" />
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold" style={{ backgroundColor: color + "33", color }}>{initials || "?"}</div>
                        </div>
                    </div>
                    <SelectField label="Status" value={status} onChange={setStatus} options={[{ value: "online", label: "Online" }, { value: "away", label: "Abwesend" }, { value: "offline", label: "Offline" }]} />
                </div>
                <InputField label="Skills (kommagetrennt)" value={skillsInput} onChange={setSkillsInput} placeholder="z.B. React, TypeScript, Node.js" />

                <div className="flex gap-3 mt-2">
                    <button type="button" onClick={() => setShowModal(null)} className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--color-border)] text-sm text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] transition-colors">Abbrechen</button>
                    <button type="submit" className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-sm font-medium hover:brightness-110 transition-all">{isEdit ? "Speichern" : "Hinzufügen"}</button>
                </div>
            </form>
        </ModalWrapper>
    );
}

/* ═══════════════════════════════════ */
/* DELETE CONFIRMATION MODAL           */
/* ═══════════════════════════════════ */
export function DeleteConfirmModal() {
    const { showModal, setShowModal, selectedProject, selectedMember, deleteProject, deleteMember } = useApp();
    const isProject = showModal === "deleteProject";
    const item = isProject ? selectedProject : selectedMember;
    const name = item?.name || "?";

    function handleDelete() {
        if (isProject && selectedProject) {
            deleteProject(selectedProject.id);
        } else if (selectedMember) {
            deleteMember(selectedMember.id);
        }
        setShowModal(null);
    }

    return (
        <ModalWrapper title="⚠️ Löschen bestätigen" onClose={() => setShowModal(null)}>
            <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-[var(--color-danger)]/15 flex items-center justify-center text-3xl mx-auto mb-4">🗑</div>
                <p className="text-white text-sm mb-2">Möchtest du <strong>{name}</strong> wirklich löschen?</p>
                <p className="text-xs text-[var(--color-text-muted)] mb-6">
                    {isProject ? "Alle zugehörigen Aufgaben werden ebenfalls entfernt." : "Alle zugewiesenen Aufgaben werden nicht zugewiesen."}
                </p>
                <div className="flex gap-3">
                    <button onClick={() => setShowModal(null)} className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--color-border)] text-sm text-[var(--color-text-muted)] hover:bg-[var(--color-surface)]">Abbrechen</button>
                    <button onClick={handleDelete} className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--color-danger)] text-white text-sm font-medium hover:brightness-110">Endgültig löschen</button>
                </div>
            </div>
        </ModalWrapper>
    );
}

/* ═══════════════════════════════════ */
/* NOTIFICATIONS PANEL                 */
/* ═══════════════════════════════════ */
export function NotificationsPanel({ onClose }) {
    const { notifications, markNotificationRead } = useApp();

    const typeColors = {
        success: "border-l-[var(--color-success)]",
        warning: "border-l-[var(--color-warning)]",
        info: "border-l-[var(--color-primary)]",
        error: "border-l-[var(--color-danger)]",
    };

    return (
        <div className="fixed inset-0 z-50" onClick={onClose}>
            <div className="absolute right-8 top-20 w-[360px] bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-2xl shadow-2xl overflow-hidden animate-fade-in" onClick={(e) => e.stopPropagation()}>
                <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white">🔔 Benachrichtigungen</h3>
                    <span className="text-[10px] text-[var(--color-text-muted)]">{notifications.filter((n) => !n.read).length} ungelesen</span>
                </div>
                <div className="max-h-[350px] overflow-y-auto">
                    {notifications.map((notif) => (
                        <div
                            key={notif.id}
                            onClick={() => markNotificationRead(notif.id)}
                            className={`px-4 py-3 border-b border-[var(--color-border)] border-l-2 ${typeColors[notif.type] || typeColors.info} cursor-pointer hover:bg-[var(--color-surface)]/50 transition-colors ${notif.read ? "opacity-50" : ""}`}
                        >
                            <p className="text-sm text-white">{notif.text}</p>
                            <p className="text-[10px] text-[var(--color-text-muted)] mt-1">{notif.time}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
