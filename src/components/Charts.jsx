// src/components/Charts.jsx
// Shows temperature and weight trend line charts using Recharts.

import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  Tooltip, CartesianGrid, AreaChart, Area,
} from "recharts";

// Custom tooltip styling
function CustomTooltip({ active, payload, label, unit }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs shadow-xl">
      <p className="text-slate-400 mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.color }} className="font-mono font-medium">
          {p.value} {unit}
        </p>
      ))}
    </div>
  );
}

function ChartCard({ title, children, accent }) {
  return (
    <div className="rounded-2xl bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm p-4 animate-slide-up">
      <div className="flex items-center gap-2 mb-4">
        <span className={`w-2 h-2 rounded-full ${accent}`} />
        <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-widest">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function Charts({ history }) {
  if (!history?.length) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* Temperature trend */}
      <ChartCard title="Temperature Trend" accent="bg-frost-400">
        <ResponsiveContainer width="100%" height={140}>
          <AreaChart data={history} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
            <defs>
              <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#3399ff" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#3399ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="time" tick={{ fill: "#64748b", fontSize: 9 }} interval="preserveStartEnd" />
            <YAxis tick={{ fill: "#64748b", fontSize: 9 }} domain={["auto", "auto"]} />
            <Tooltip content={<CustomTooltip unit="°C" />} />
            <Area type="monotone" dataKey="temp" stroke="#3399ff" strokeWidth={2}
              fill="url(#tempGrad)" dot={false} activeDot={{ r: 4, fill: "#3399ff" }} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Weight trend */}
      <ChartCard title="Weight Trend" accent="bg-purple-400">
        <ResponsiveContainer width="100%" height={140}>
          <LineChart data={history} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="time" tick={{ fill: "#64748b", fontSize: 9 }} interval="preserveStartEnd" />
            <YAxis tick={{ fill: "#64748b", fontSize: 9 }} domain={["auto", "auto"]} />
            <Tooltip content={<CustomTooltip unit="kg" />} />
            <Line type="monotone" dataKey="weight" stroke="#a78bfa" strokeWidth={2}
              dot={false} activeDot={{ r: 4, fill: "#a78bfa" }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Humidity trend */}
      <ChartCard title="Humidity Trend" accent="bg-teal-400">
        <ResponsiveContainer width="100%" height={140}>
          <AreaChart data={history} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
            <defs>
              <linearGradient id="humGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#2dd4bf" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="time" tick={{ fill: "#64748b", fontSize: 9 }} interval="preserveStartEnd" />
            <YAxis tick={{ fill: "#64748b", fontSize: 9 }} domain={[0, 100]} />
            <Tooltip content={<CustomTooltip unit="%" />} />
            <Area type="monotone" dataKey="humidity" stroke="#2dd4bf" strokeWidth={2}
              fill="url(#humGrad)" dot={false} activeDot={{ r: 4, fill: "#2dd4bf" }} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
