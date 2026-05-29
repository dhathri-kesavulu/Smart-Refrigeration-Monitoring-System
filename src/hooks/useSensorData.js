// src/hooks/useSensorData.js
// Listens to Firebase for live sensor data.
// Falls back to simulated mock data if Firebase isn't configured.

import { useState, useEffect, useRef } from "react";
import { ref, onValue } from "firebase/database";
import { db, firebaseEnabled } from "../services/firebase";
import {
  TEMP_MAX, TEMP_DANGER,
  HUMIDITY_MIN, HUMIDITY_MAX,
  GAS_LIMIT, GAS_WARN,
  WEIGHT_MAX,
  CHART_POINTS, POLL_INTERVAL
} from "../utils/constants";

// ─── Status helpers ──────────────────────────────────────────────
function getTempStatus(v)     { return v >= TEMP_DANGER ? "danger" : v >= TEMP_MAX ? "warning" : "normal"; }
function getHumidityStatus(v) { return (v < HUMIDITY_MIN || v > HUMIDITY_MAX) ? "warning" : "normal"; }
function getGasStatus(v)      { return v >= GAS_LIMIT ? "danger" : v >= GAS_WARN ? "warning" : "normal"; }
function getWeightStatus(v)   { return v >= WEIGHT_MAX ? "warning" : "normal"; }
function getDoorStatus(v)     { return v === "Open" ? "warning" : "normal"; }

function computeStatuses(d) {
  return {
    temperature: getTempStatus(d.temperature),
    humidity:    getHumidityStatus(d.humidity),
    gas:         getGasStatus(d.gas),
    weight:      getWeightStatus(d.weight),
    door:        getDoorStatus(d.door),
  };
}

// ─── Mock data generator ─────────────────────────────────────────
let mockDoor = "Closed";
let doorOpenFor = 0;

function generateMockData() {
  // Occasionally toggle door
  if (Math.random() < 0.03) mockDoor = mockDoor === "Closed" ? "Open" : "Closed";
  if (mockDoor === "Open") doorOpenFor++; else doorOpenFor = 0;

  return {
    temperature: parseFloat((22 + Math.random() * 12).toFixed(1)),
    humidity:    Math.round(50 + Math.random() * 30),
    gas:         Math.round(80 + Math.random() * 350),
    weight:      parseFloat((3 + Math.random() * 10).toFixed(2)),
    door:        mockDoor,
    doorOpenFor,
  };
}

// ─── Hook ────────────────────────────────────────────────────────
export function useSensorData() {
  const [data, setData] = useState(null);
  const [history, setHistory] = useState([]);   // [{time, temp, weight}, ...]
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);

  function pushHistory(d) {
    const point = {
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      temp: d.temperature,
      weight: d.weight,
      humidity: d.humidity,
      gas: d.gas,
    };
    setHistory(prev => [...prev.slice(-CHART_POINTS + 1), point]);
  }

  useEffect(() => {
    if (firebaseEnabled && db) {
      // ── Real Firebase listener ──
      const sensorRef = ref(db, "sensorData");
      const unsub = onValue(sensorRef, (snapshot) => {
        const raw = snapshot.val();
        if (!raw) return;
        const enriched = { ...raw, doorOpenFor: 0 };
        enriched.statuses = computeStatuses(enriched);
        setData(enriched);
        pushHistory(enriched);
        setLoading(false);
      });
      return () => unsub();
    } else {
      // ── Mock data simulation ──
      const tick = () => {
        const d = generateMockData();
        d.statuses = computeStatuses(d);
        setData(d);
        pushHistory(d);
        setLoading(false);
      };
      tick(); // immediate first read
      timerRef.current = setInterval(tick, POLL_INTERVAL);
      return () => clearInterval(timerRef.current);
    }
  }, []);

  return { data, history, loading, isLive: firebaseEnabled };
}
