// src/components/Alerts.jsx
// Generates and displays alerts based on sensor thresholds.

import { useMemo } from "react";
import { FiAlertTriangle, FiAlertOctagon, FiCheckCircle } from "react-icons/fi";
import { TEMP_MAX, TEMP_DANGER, GAS_LIMIT, GAS_WARN, HUMIDITY_MAX, HUMIDITY_MIN } from "../utils/constants";

function buildAlerts(data) {
  if (!data) return [];
  const alerts = [];

  if (data.temperature >= TEMP_DANGER) {
    alerts.push({ id: "temp-danger", level: "danger", msg: `Critical temp: ${data.temperature}°C — check cooling immediately!` });
  } else if (data.temperature >= TEMP_MAX) {
    alerts.push({ id: "temp-warn", level: "warning", msg: `High temperature: ${data.temperature}°C (limit ${TEMP_MAX}°C)` });
  }

  if (data.gas >= GAS_LIMIT) {
    alerts.push({ id: "gas-danger", level: "danger", msg: `Gas leak detected! Level: ${data.gas} ppm — ventilate now!` });
  } else if (data.gas >= GAS_WARN) {
    alerts.push({ id: "gas-warn", level: "warning", msg: `Elevated gas level: ${data.gas} ppm — monitor closely` });
  }

  if (data.door === "Open") {
    alerts.push({ id: "door-open", level: "warning", msg: `Refrigerator door is open${data.doorOpenFor > 3 ? " — please close it" : ""}` });
  }

  if (data.humidity > HUMIDITY_MAX) {
    alerts.push({ id: "hum-high", level: "warning", msg: `Humidity too high: ${data.humidity}% (max ${HUMIDITY_MAX}%)` });
  } else if (data.humidity < HUMIDITY_MIN) {
    alerts.push({ id: "hum-low", level: "warning", msg: `Humidity too low: ${data.humidity}% (min ${HUMIDITY_MIN}%)` });
  }

  return alerts;
}

const levelConfig = {
  danger:  { icon: FiAlertOctagon,  bg: "bg-red-500/10",    border: "border-red-500/30",    text: "text-red-400",    label: "DANGER" },
  warning: { icon: FiAlertTriangle, bg: "bg-yellow-500/10", border: "border-yellow-500/30", text: "text-yellow-400", label: "WARN"   },
};

export default function Alerts({ data }) {
  const alerts = useMemo(() => buildAlerts(data), [data]);

  if (!alerts.length) {
    return (
      <div className="rounded-2xl bg-slate-800/60 border border-green-500/20 backdrop-blur-sm p-4
        flex items-center gap-3 animate-slide-up">
        <FiCheckCircle className="text-green-400 w-5 h-5 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-green-400">All systems normal</p>
          <p className="text-xs text-slate-500 mt-0.5">No alerts at this time</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {alerts.map(({ id, level, msg }) => {
        const { icon: Icon, bg, border, text, label } = levelConfig[level];
        return (
          <div key={id}
            className={`rounded-2xl border backdrop-blur-sm p-3.5 flex items-start gap-3 animate-slide-up
              ${bg} ${border}`}>
            <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${text}`} />
            <div>
              <span className={`text-[10px] font-mono font-bold tracking-widest ${text}`}>{label}</span>
              <p className="text-sm text-slate-300 mt-0.5 leading-snug">{msg}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
