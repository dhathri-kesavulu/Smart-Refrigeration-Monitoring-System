// src/components/Navbar.jsx
// Sticky top navigation bar with app title and live connection status.

import { APP_NAME } from "../utils/constants";
import { firebaseEnabled } from "../services/firebase";
import { FiWifi, FiWifiOff } from "react-icons/fi";

export default function Navbar({ lastUpdated }) {
  return (
    <nav className="sticky top-0 z-50 w-full bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/60">
      <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">

        {/* Left: Logo + title */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-frost-600 flex items-center justify-center shadow-glow shrink-0">
            <span className="text-white text-xs font-bold font-mono">❄</span>
          </div>
          <div>
            <h1 className="text-sm font-bold text-white leading-none tracking-wide">{APP_NAME}</h1>
            <p className="text-[10px] text-slate-500 leading-tight">Smart Fridge Monitor</p>
          </div>
        </div>

        {/* Right: Connection status */}
        <div className="flex items-center gap-2">
          {lastUpdated && (
            <span className="text-[10px] text-slate-600 font-mono hidden sm:block">{lastUpdated}</span>
          )}
          <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-medium
            ${firebaseEnabled
              ? "bg-green-500/10 text-green-400 ring-1 ring-green-500/30"
              : "bg-slate-700/60 text-slate-400 ring-1 ring-slate-600/40"
            }`}>
            {firebaseEnabled
              ? <><FiWifi className="w-3 h-3" /> Live</>
              : <><FiWifiOff className="w-3 h-3" /> Mock</>
            }
          </div>
        </div>
      </div>
    </nav>
  );
}
