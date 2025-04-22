import React, { useEffect, useState } from "react";
import SensorCard from "./SensorCard";

const fetchSensorData = (wagon) => {
  // This would be replaced with your actual sensor data fetching logic.
  // For example, you might call an API or use WebSockets to get data from the sensor.
  // Different data for each wagon
  const dataMapping = {
    Engine: {
      temperature: 22.5,
      humidity: 55.3,
      weight: 510.8,
      vibration: 2.3,
      axleTemperature: 34.2,
    },
    A1: {
      temperature: 24.3,
      humidity: 53.0,
      weight: 520.2,
      vibration: 2.1,
      axleTemperature: 33.5,
    },
    A2: {
      temperature: 21.8,
      humidity: 60.1,
      weight: 515.4,
      vibration: 2.5,
      axleTemperature: 35.0,
    },
    A3: {
      temperature: 23.1,
      humidity: 58.0,
      weight: 400.7,
      vibration: 2.0,
      axleTemperature: 32.8,
    },
  };

  // Return the data specific to the selected wagon
  return dataMapping[wagon] || dataMapping["Engine"];
};

export default function SensorDashboard({ cartId }) {
  const [data, setData] = useState({
    temperature: 0,
    humidity: 0,
    weight: 0,
    vibration: 0,
    axleTemperature: 0,
  });
  useEffect(() => {
    const interval = setInterval( () => {
      const sensorData = fetchSensorData(cartId);
      setData(sensorData);
    }, 3000);
    return () => clearInterval(interval);
  }, [cartId]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-xl">
      <SensorCard label="Temperature" value={`${data.temperature} °C`} icon="🌡️" />
      <SensorCard label="Humidity" value={`${data.humidity} %`} icon="💧" />
      <SensorCard label="Weight" value={`${data.weight} kg`} icon="⚖️" />
      <SensorCard label="Vibration" value={`${data.vibration} Hz`} icon="📳" />
      <SensorCard label="Axle Temp" value={`${data.axleTemperature} °C`} icon="🛞" />
      <div>

      </div>
    </div>
  );
}