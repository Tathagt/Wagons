import React from "react";
const wagons = ["Engine", "A1", "A2", "A3"];
export default function WagonSelector({ selected, onSelect }) {
  return (
    <div className="flex md:flex-col items-center gap-4 bg-white p-4 rounded-xl shadow-md">
      {wagons.map(wagon => (
        <button
          key={wagon}
          className={`px-5 py-2 rounded-full border font-semibold transition-all duration-200 shadow-sm hover:shadow-md ${
            selected === wagon
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 border-blue-600"
          }`}
          onClick={() => onSelect(wagon)}
        >
          {wagon}
        </button>
      ))}
    </div>
  );
}