// src/components/Controls.jsx
// Device control buttons for cooling system and relay.
// For now, simulates state via local React state + Firebase write (if configured).

import { useState } from "react";
import { ref, update } from "firebase/database";
import { db, firebaseEnabled } from "../services/firebase";
import { FiPower, FiZap, FiThermometer } from "react-icons/fi";

function ControlButton({ label, description, icon: Icon, active, onToggle, accentOn, accentOff }) {
  return (
    <button
      onClick={onToggle}
      className={`relative flex items-center gap-3 w-full rounded-2xl border p-4
        transition-all duration-300 text-left
        ${active
          ? `${accentOn} shadow-lg`
          : "bg-slate-800/60 border-slate-700/50 hover:border-slate-600"
        }`}>
      <div className={`rounded-xl p-2.5 transition-colors duration-300
        ${active ? "bg-white/20" : "bg-slate-700/50"}`}>
        <Icon className={`w-5 h-5 ${active ? "text-white" : "text-slate-400"}`} />
      </div>
      <div className="flex-1">
        <p className={`text-sm font-semibold ${active ? "text-white" : "text-slate-200"}`}>{label}</p>
        <p className={`text-xs ${active ? "text-white/70" : "text-slate-500"}`}>{description}</p>
      </div>
      {/* Toggle pill */}
      <div className={`relative w-11 h-6 rounded-full transition-colors duration-300 shrink-0
        ${active ? "bg-white/30" : "bg-slate-700"}`}>
        <div className={`absolute top-0.5 w-5 h-5 rounded-full shadow transition-transform duration-300
          ${active ? "translate-x-5 bg-white" : "translate-x-0.5 bg-slate-400"}`} />
      </div>
    </button>
  );
}

export default function Controls() {
  const [cooling, setCooling] = useState(false);
  const [relay, setRelay]   = useState(false);

  function toggle(device, current, setter) {
    const next = !current;
    setter(next);

    if (firebaseEnabled && db) {
      update(ref(db, "controls"), { [device]: next ? "ON" : "OFF" })
        .catch(err => console.warn("Firebase write failed:", err));
    } else {
      console.log(`[Mock] ${device} → ${next ? "ON" : "OFF"}`);
    }
  }

  return (
    <div className="rounded-2xl bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm p-4 animate-slide-up">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-frost-400" />
        <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-widest">Device Controls</h3>
      </div>

      <div className="flex flex-col gap-3">
        <ControlButton
          label="Cooling System"
          description={cooling ? "Active — compressor running" : "Inactive — standby mode"}
          icon={FiThermometer}
          active={cooling}
          onToggle={() => toggle("cooling", cooling, setCooling)}
          accentOn="bg-frost-600/70 border-frost-400/50 shadow-glow"
        />
        <ControlButton
          label="Relay Switch"
          description={relay ? "Relay ON — circuit closed" : "Relay OFF — circuit open"}
          icon={FiZap}
          active={relay}
          onToggle={() => toggle("relay", relay, setRelay)}
          accentOn="bg-purple-700/60 border-purple-400/50"
        />
      </div>

      {!firebaseEnabled && (
        <p className="mt-3 text-[10px] text-slate-600 text-center font-mono">
          Simulation mode — connect Firebase to control hardware
        </p>
      )}
    </div>
  );
}
