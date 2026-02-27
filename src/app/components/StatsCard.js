export default function StatsCard({ icon, label, value, change, changeType, delay }) {
    return (
        <div className={`glass rounded-2xl p-5 animate-fade-in ${delay || ""} hover:scale-[1.02] transition-transform duration-200`}>
            <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{icon}</span>
                {change && (
                    <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${changeType === "up"
                                ? "bg-[var(--color-success)]/15 text-[var(--color-success)]"
                                : changeType === "down"
                                    ? "bg-[var(--color-danger)]/15 text-[var(--color-danger)]"
                                    : "bg-[var(--color-warning)]/15 text-[var(--color-warning)]"
                            }`}
                    >
                        {changeType === "up" ? "↑" : changeType === "down" ? "↓" : "→"} {change}
                    </span>
                )}
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">{label}</p>
        </div>
    );
}
