"use client";

export default function ActivityChart({ data }) {
    const maxTasks = Math.max(...data.map((d) => d.tasks));

    return (
        <div className="glass rounded-2xl p-5 animate-fade-in stagger-3">
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-white font-semibold text-sm">Wochenaktivität</h3>
                <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-sm bg-[var(--color-primary)]" />
                        <span className="text-[var(--color-text-muted)]">Aufgaben</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-sm bg-[var(--color-accent)]" />
                        <span className="text-[var(--color-text-muted)]">Stunden</span>
                    </div>
                </div>
            </div>

            <div className="flex items-end gap-3 h-[140px]">
                {data.map((item, i) => {
                    const taskHeight = (item.tasks / maxTasks) * 100;
                    const hourHeight = (item.hours / 10) * 100;

                    return (
                        <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                            <div className="w-full flex items-end gap-1 h-[110px]">
                                <div
                                    className="flex-1 rounded-t-md bg-gradient-to-t from-[var(--color-primary)] to-[var(--color-primary-light)] chart-bar opacity-80 hover:opacity-100 transition-opacity cursor-pointer relative group"
                                    style={{ height: `${taskHeight}%`, animationDelay: `${i * 0.1}s` }}
                                >
                                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[var(--color-surface)] text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {item.tasks} Aufgaben
                                    </div>
                                </div>
                                <div
                                    className="flex-1 rounded-t-md bg-gradient-to-t from-[var(--color-accent)] to-[var(--color-accent-light)] chart-bar opacity-60 hover:opacity-100 transition-opacity cursor-pointer relative group"
                                    style={{ height: `${hourHeight}%`, animationDelay: `${i * 0.1 + 0.05}s` }}
                                >
                                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[var(--color-surface)] text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {item.hours} Std.
                                    </div>
                                </div>
                            </div>
                            <span className="text-[11px] text-[var(--color-text-muted)]">{item.day}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
