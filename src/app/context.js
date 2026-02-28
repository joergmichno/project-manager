"use client";

import { useState, createContext, useContext, useCallback } from "react";
import { projects as initialProjects, kanbanTasks as initialKanban, weeklyActivity, teamMembers as initialTeam, notifications as initialNotifications } from "./data";

const AppContext = createContext();

export function useApp() {
    return useContext(AppContext);
}

export function AppProvider({ children }) {
    const [currentPage, setCurrentPage] = useState("dashboard");
    const [projects, setProjects] = useState(initialProjects);
    const [kanbanTasks, setKanbanTasks] = useState(initialKanban);
    const [teamMembers, setTeamMembers] = useState(initialTeam);
    const [searchQuery, setSearchQuery] = useState("");
    const [showModal, setShowModal] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedMember, setSelectedMember] = useState(null);
    const [notifications, setNotifications] = useState(initialNotifications);

    // ═══════════════════════════════════
    // TASK CRUD
    // ═══════════════════════════════════
    function addTask(task) {
        setKanbanTasks((prev) => ({
            ...prev,
            todo: [...prev.todo, { ...task, id: `t${Date.now()}`, createdAt: new Date().toISOString().split("T")[0], comments: [] }],
        }));
        addNotification(`Neue Aufgabe erstellt: ${task.title}`, "info");
    }

    function updateTask(taskId, column, updates) {
        setKanbanTasks((prev) => ({
            ...prev,
            [column]: prev[column].map((t) => (t.id === taskId ? { ...t, ...updates } : t)),
        }));
    }

    function moveTask(taskId, fromCol, toCol) {
        setKanbanTasks((prev) => {
            const task = prev[fromCol].find((t) => t.id === taskId);
            if (!task) return prev;
            return {
                ...prev,
                [fromCol]: prev[fromCol].filter((t) => t.id !== taskId),
                [toCol]: [...prev[toCol], task],
            };
        });
    }

    function deleteTask(taskId, column) {
        const task = kanbanTasks[column].find((t) => t.id === taskId);
        setKanbanTasks((prev) => ({
            ...prev,
            [column]: prev[column].filter((t) => t.id !== taskId),
        }));
        if (task) addNotification(`Aufgabe gelöscht: ${task.title}`, "info");
    }

    // ═══════════════════════════════════
    // PROJECT CRUD
    // ═══════════════════════════════════
    function addProject(project) {
        const newProject = {
            ...project,
            id: Date.now(),
            progress: 0,
            tasks: { total: 0, completed: 0 },
            milestones: project.milestones || [],
            tags: project.tags || [],
        };
        setProjects((prev) => [...prev, newProject]);
        addNotification(`Neues Projekt erstellt: ${project.name}`, "success");
    }

    function updateProject(projectId, updates) {
        setProjects((prev) => prev.map((p) => (p.id === projectId ? { ...p, ...updates } : p)));
    }

    function deleteProject(projectId) {
        const project = projects.find((p) => p.id === projectId);
        setProjects((prev) => prev.filter((p) => p.id !== projectId));
        // Remove tasks associated with this project
        if (project) {
            setKanbanTasks((prev) => {
                const result = {};
                for (const [col, tasks] of Object.entries(prev)) {
                    result[col] = tasks.filter((t) => t.projectId !== projectId);
                }
                return result;
            });
            addNotification(`Projekt gelöscht: ${project.name}`, "warning");
        }
    }

    // ═══════════════════════════════════
    // TEAM MEMBER CRUD
    // ═══════════════════════════════════
    function addMember(member) {
        const newMember = {
            ...member,
            id: member.initials,
            tasksActive: 0,
            projectIds: [],
        };
        setTeamMembers((prev) => [...prev, newMember]);
        addNotification(`Neues Teammitglied: ${member.name}`, "info");
    }

    function updateMember(memberId, updates) {
        setTeamMembers((prev) => prev.map((m) => (m.id === memberId ? { ...m, ...updates } : m)));
    }

    function deleteMember(memberId) {
        const member = teamMembers.find((m) => m.id === memberId);
        setTeamMembers((prev) => prev.filter((m) => m.id !== memberId));
        if (member) {
            // Unassign from tasks
            setKanbanTasks((prev) => {
                const result = {};
                for (const [col, tasks] of Object.entries(prev)) {
                    result[col] = tasks.map((t) => (t.assignee === memberId ? { ...t, assignee: "" } : t));
                }
                return result;
            });
            // Remove from projects
            setProjects((prev) => prev.map((p) => ({ ...p, team: p.team.filter((t) => t !== memberId) })));
            addNotification(`Teammitglied entfernt: ${member.name}`, "warning");
        }
    }

    // ═══════════════════════════════════
    // NOTIFICATIONS
    // ═══════════════════════════════════
    function addNotification(text, type = "info") {
        setNotifications((prev) => [
            { id: Date.now(), text, time: "Gerade eben", read: false, type },
            ...prev,
        ]);
    }

    function markNotificationRead(id) {
        setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    }

    // ═══════════════════════════════════
    // COMMENTS ON TASKS
    // ═══════════════════════════════════
    function addComment(taskId, column, comment) {
        setKanbanTasks((prev) => ({
            ...prev,
            [column]: prev[column].map((t) =>
                t.id === taskId
                    ? { ...t, comments: [...(t.comments || []), { author: "JM", text: comment, time: "Gerade eben" }] }
                    : t
            ),
        }));
    }

    // ═══════════════════════════════════
    // SEARCH FILTER
    // ═══════════════════════════════════
    const getFilteredTasks = useCallback(() => {
        if (!searchQuery) return kanbanTasks;
        const q = searchQuery.toLowerCase();
        const filterCol = (col) => col.filter((t) => t.title.toLowerCase().includes(q) || t.project.toLowerCase().includes(q) || (t.description && t.description.toLowerCase().includes(q)));
        return {
            todo: filterCol(kanbanTasks.todo),
            inProgress: filterCol(kanbanTasks.inProgress),
            review: filterCol(kanbanTasks.review),
            done: filterCol(kanbanTasks.done),
        };
    }, [searchQuery, kanbanTasks]);

    // ═══════════════════════════════════
    // NAVIGATION HELPERS
    // ═══════════════════════════════════
    function openProjectDetail(projectId) {
        setSelectedProject(projects.find((p) => p.id === projectId) || null);
        setCurrentPage("project-detail");
    }

    function openMemberDetail(memberId) {
        setSelectedMember(teamMembers.find((m) => m.id === memberId) || null);
        setCurrentPage("member-detail");
    }

    const value = {
        currentPage, setCurrentPage,
        projects, setProjects,
        kanbanTasks, setKanbanTasks,
        teamMembers, setTeamMembers,
        searchQuery, setSearchQuery,
        showModal, setShowModal,
        selectedTask, setSelectedTask,
        selectedProject, setSelectedProject,
        selectedMember, setSelectedMember,
        notifications, setNotifications,
        // Task CRUD
        addTask, updateTask, moveTask, deleteTask,
        // Project CRUD
        addProject, updateProject, deleteProject,
        // Member CRUD
        addMember, updateMember, deleteMember,
        // Notifications
        addNotification, markNotificationRead,
        // Comments
        addComment,
        // Helpers
        getFilteredTasks, openProjectDetail, openMemberDetail,
        weeklyActivity,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
