"use client";

import { useState, createContext, useContext } from "react";
import { projects as initialProjects, kanbanTasks as initialKanban, weeklyActivity, teamMembers } from "./data";

// App Context for shared state
const AppContext = createContext();

export function useApp() {
    return useContext(AppContext);
}

export function AppProvider({ children }) {
    const [currentPage, setCurrentPage] = useState("dashboard");
    const [projects, setProjects] = useState(initialProjects);
    const [kanbanTasks, setKanbanTasks] = useState(initialKanban);
    const [searchQuery, setSearchQuery] = useState("");
    const [showModal, setShowModal] = useState(null); // null | "addTask" | "addProject" | "taskDetail"
    const [selectedTask, setSelectedTask] = useState(null);
    const [notifications, setNotifications] = useState([
        { id: 1, text: "API-Integration ist zu 91% abgeschlossen", time: "vor 2 Std.", read: false },
        { id: 2, text: "Kai hat OAuth2 zur Prüfung eingereicht", time: "vor 4 Std.", read: false },
        { id: 3, text: "Budget-Warnung: E-Commerce bei 64%", time: "vor 6 Std.", read: false },
    ]);

    // Add a new task
    function addTask(task) {
        setKanbanTasks((prev) => ({
            ...prev,
            todo: [...prev.todo, { ...task, id: `t${Date.now()}` }],
        }));
    }

    // Move task between columns
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

    // Delete task
    function deleteTask(taskId, column) {
        setKanbanTasks((prev) => ({
            ...prev,
            [column]: prev[column].filter((t) => t.id !== taskId),
        }));
    }

    // Mark notification as read
    function markNotificationRead(id) {
        setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    }

    // Search filter
    function getFilteredTasks() {
        if (!searchQuery) return kanbanTasks;
        const q = searchQuery.toLowerCase();
        const filterCol = (col) => col.filter((t) => t.title.toLowerCase().includes(q) || t.project.toLowerCase().includes(q));
        return {
            todo: filterCol(kanbanTasks.todo),
            inProgress: filterCol(kanbanTasks.inProgress),
            review: filterCol(kanbanTasks.review),
            done: filterCol(kanbanTasks.done),
        };
    }

    const value = {
        currentPage, setCurrentPage,
        projects, setProjects,
        kanbanTasks, setKanbanTasks,
        searchQuery, setSearchQuery,
        showModal, setShowModal,
        selectedTask, setSelectedTask,
        notifications, setNotifications,
        addTask, moveTask, deleteTask,
        markNotificationRead, getFilteredTasks,
        weeklyActivity, teamMembers,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
