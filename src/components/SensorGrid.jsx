// src/components/SensorGrid.jsx
// Lays out all sensor cards in a responsive 2-column grid.

import SensorCard from "./SensorCard";
import {
  WiThermometer,
} from "react-icons/wi";
import {
  FiDroplet, FiActivity, FiPackage, FiMenu
} from "react-icons/fi";
import { MdSensorDoor } from "react-icons/md";

export default function SensorGrid({ data }) {
  if (!data) return null;
  const { temperature, humidity, gas, weight, door, statuses } = data;

  return (
    <div className="grid grid-cols-2 gap-3">
      <SensorCard
        title="Temperature"
        value={temperature}
        unit="°C"
        status={statuses.temperature}
        icon={WiThermometer}
      />
      <SensorCard
        title="Humidity"
        value={humidity}
        unit="%"
        status={statuses.humidity}
        icon={FiDroplet}
      />
      <SensorCard
        title="Gas Level"
        value={gas}
        unit="ppm"
        status={statuses.gas}
        icon={FiActivity}
      />
      <SensorCard
        title="Weight"
        value={weight}
        unit="kg"
        status={statuses.weight}
        icon={FiPackage}
      />
      {/* Door status spans full width */}
      <div className="col-span-2">
        <SensorCard
          title="Door Status"
          value={door}
          unit=""
          status={statuses.door}
          icon={MdSensorDoor}
          large
        />
      </div>
    </div>
  );
}
