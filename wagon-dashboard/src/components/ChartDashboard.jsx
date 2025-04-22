import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
const MAX_DATA_POINTS = 100;
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

const THRESHOLDS = { temperature: 30, humidity: 60, weight: 350, vibration: 3, axleTemperature: 40 };

const fetchDataForWagon = (wagon) => {
  return dataMapping[wagon] || dataMapping["Engine"]; 
}
export default function ChartDashboard({ dataRef, alertLogRef, cartId }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      const point = {
        time: new Date().toLocaleTimeString(),
        ...fetchDataForWagon(cartId),
      };
      setData(prev => {
        const updated = [...prev, point];
        const sliced = updated.length > MAX_DATA_POINTS ? updated.slice(-MAX_DATA_POINTS) : updated;
        dataRef.current = sliced;
        return sliced;
      });
      Object.keys(THRESHOLDS).forEach(key => {
        if (point[key] > THRESHOLDS[key]) {
          alertLogRef.current.push({ time: point.time, metric: key, value: point[key] });
        }
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [dataRef, alertLogRef, cartId]);
  const renderChart = (key, color) => (
    <div id={`chart-${key}`} className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-blue-700 mb-2">{key} Chart (Threshold: {THRESHOLDS[key]})</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <XAxis dataKey="time" tick={{ fontSize: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={key} stroke={color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Object.keys(THRESHOLDS).map((k, i) => renderChart(k, ["#2563eb","#10b981","#f59e0b","#ef4444","#8b5cf6"][i]))}
    </div>
  );
}