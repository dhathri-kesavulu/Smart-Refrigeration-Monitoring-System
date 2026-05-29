// Sensor alert thresholds
export const TEMP_MAX = 30;       // °C — above this = warning
export const TEMP_DANGER = 35;    // °C — above this = danger
export const HUMIDITY_MIN = 30;   // % — below this = warning
export const HUMIDITY_MAX = 80;   // % — above this = warning
export const GAS_LIMIT = 400;     // ppm — above this = danger
export const GAS_WARN = 200;      // ppm — above this = warning
export const WEIGHT_MAX = 20;     // kg — above this = warning (overloaded)

// App metadata
export const APP_NAME = "SRMS";
export const APP_SUBTITLE = "Smart Refrigerator Monitor";

// Chart config
export const CHART_POINTS = 20;   // how many history points to show
export const POLL_INTERVAL = 3000; // ms for mock data updates
