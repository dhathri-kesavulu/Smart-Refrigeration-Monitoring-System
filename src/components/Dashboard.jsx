// src/components/Dashboard.jsx
// Main orchestrator component. Fetches data and arranges all sections.

import { useState } from "react";
import { useSensorData } from "../hooks/useSensorData";
import SensorGrid from "./SensorGrid";
import Charts from "./Charts";
import Alerts from "./Alerts";
import Controls from "./Controls";
import Navbar from "./Navbar";

// Skeleton placeholder cards while loading
function Skeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i} className={`rounded-2xl bg-slate-800/40 h-28 ${i === 4 ? "col-span-2" : ""}`} />
      ))}
    </div>
  );
}

// Section wrapper with collapsible title
function Section({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 w-full text-left mb-3 group">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest group-hover:text-slate-300 transition-colors">
          {title}
        </span>
        <span className="flex-1 h-px bg-slate-800" />
        <span className="text-slate-600 text-xs">{open ? "▲" : "▼"}</span>
      </button>
      {open && children}
    </section>
  );
}

export default function Dashboard() {
  const { data, history, loading } = useSensorData();
  const lastUpdated = data ? new Date().toLocaleTimeString() : null;

  return (
    <div className="min-h-screen bg-slate-950 font-display">
      <Navbar lastUpdated={lastUpdated} />

      <main className="max-w-lg mx-auto px-4 py-5 flex flex-col gap-6 pb-12">

        {/* Live Sensors */}
        <Section title="Live Sensors">
          {loading ? <Skeleton /> : <SensorGrid data={data} />}
        </Section>

        {/* Alerts */}
        <Section title="Alerts">
          <Alerts data={data} />
        </Section>

        {/* Trend Charts */}
        <Section title="Trends" defaultOpen={true}>
          {history.length > 1 ? <Charts history={history} /> : (
            <div className="rounded-2xl bg-slate-800/40 p-6 text-center text-slate-600 text-sm">
              Collecting data points…
            </div>
          )}
        </Section>

        {/* Device Controls */}
        <Section title="Controls">
          <Controls />
        </Section>

      </main>
    </div>
  );
}
