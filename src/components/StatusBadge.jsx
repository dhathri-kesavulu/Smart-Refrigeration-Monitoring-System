// src/components/StatusBadge.jsx
// Small pill badge showing normal / warning / danger state.

const config = {
  normal:  { label: "Normal",  classes: "bg-green-500/20 text-green-400 ring-green-500/40" },
  warning: { label: "Warning", classes: "bg-yellow-500/20 text-yellow-400 ring-yellow-500/40" },
  danger:  { label: "Danger",  classes: "bg-red-500/20 text-red-400 ring-red-500/40" },
};

export default function StatusBadge({ status = "normal", small = false }) {
  const { label, classes } = config[status] ?? config.normal;
  return (
    <span className={`inline-flex items-center rounded-full ring-1 font-mono font-medium tracking-wide
      ${small ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs"}
      ${classes}`}>
      <span className={`mr-1.5 inline-block rounded-full ${small ? "w-1 h-1" : "w-1.5 h-1.5"}
        ${status === "normal" ? "bg-green-400" : status === "warning" ? "bg-yellow-400" : "bg-red-400"}
        animate-pulse`} />
      {label}
    </span>
  );
}
