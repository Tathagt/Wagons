import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WagonSelector from "./components/WagonSelector";
import SensorDashboard from "./components/SensorDashboard";
import ChartDashboard from "./components/ChartDashboard";
import ReportGenerator from "./components/ReportGenerator";

export default function App() {
  const [selectedWagon, setSelectedWagon] = useState("Engine");
  const chartDataRef = useRef([]);
  const alertLogRef = useRef([]);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-800 drop-shadow-sm">
          Wagon Monitoring Dashboard
        </h1>
        <nav className="flex justify-center gap-4 mb-6">
          <Link to="/" className="text-blue-700 underline font-medium">Dashboard</Link>
          <Link to="/charts" className="text-blue-700 underline font-medium">Charts</Link>
        </nav>
        <div className="flex justify-center mb-4">
          <ReportGenerator
            wagonId={selectedWagon}
            getChartData={() => chartDataRef.current}
            getAlertLog={() => alertLogRef.current}
          />
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
                <WagonSelector selected={selectedWagon} onSelect={setSelectedWagon} />
                <SensorDashboard cartId={selectedWagon} />
              </div>
            }
          />
          <Route
            path="/charts"
            element={
              <ChartDashboard dataRef={chartDataRef} alertLogRef={alertLogRef} cartId={selectedWagon} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}