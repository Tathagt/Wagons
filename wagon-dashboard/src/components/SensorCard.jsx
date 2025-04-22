import React from "react";
export default function SensorCard({ label, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center border border-blue-200 transform hover:scale-105 transition-transform">
      <div className="text-5xl mb-2">{icon}</div>
      <div className="text-lg font-medium text-gray-700">{label}</div>
      <div className="text-2xl font-bold text-blue-700 mt-1">{value}</div>
    </div>
  );
}

