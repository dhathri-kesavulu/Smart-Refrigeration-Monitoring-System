// src/components/SensorCard.jsx
// Displays a single sensor metric with status color, icon, value, and unit.

import StatusBadge from "./StatusBadge";

const statusGlow = {
  normal:  "shadow-glow-green border-green-500/20",
  warning: "shadow-glow-yellow border-yellow-500/20",
  danger:  "shadow-glow-red border-red-500/20",
};

const statusText = {
  normal:  "text-green-400",
  warning: "text-yellow-400",
  danger:  "text-red-400",
};

const statusBg = {
  normal:  "bg-green-500/10",
  warning: "bg-yellow-500/10",
  danger:  "bg-red-500/10",
};

export default function SensorCard({ title, value, unit, status = "normal", icon: Icon, large = false }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border bg-slate-800/60 backdrop-blur-sm p-4
      transition-all duration-500 animate-slide-up
      ${statusGlow[status] ?? statusGlow.normal}`}>

      {/* Background glow blob */}
      <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full blur-2xl opacity-30
        ${statusBg[status]}`} />

      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <div className={`flex items-center gap-2 rounded-xl p-2 ${statusBg[status]}`}>
          {Icon && <Icon className={`w-4 h-4 ${statusText[status]}`} />}
        </div>
        <StatusBadge status={status} small />
      </div>

      {/* Value */}
      <div className={`font-display font-bold leading-none ${large ? "text-4xl" : "text-3xl"} ${statusText[status]}`}>
        {value ?? "—"}
        <span className="text-base font-normal text-slate-400 ml-1">{unit}</span>
      </div>

      {/* Label */}
      <p className="mt-1.5 text-xs font-medium text-slate-400 uppercase tracking-widest">{title}</p>
    </div>
  );
}
