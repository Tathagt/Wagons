import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";

export default function ReportGenerator({ wagonId, getChartData, getAlertLog }) {
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const checkInterval = setInterval(() => {
      if (getChartData().length > 0) {
        setHasData(true);
        clearInterval(checkInterval);
      }
    }, 500);
    return () => clearInterval(checkInterval);
  }, [getChartData]);

  async function generateReport() {
    const data = getChartData();
    const alerts = getAlertLog();
    if (!data || data.length === 0) {
      alert("No data to report yet — please wait a few seconds for readings to accumulate.");
      return;
    }

    const doc = new jsPDF({ unit: "pt" });
    doc.setFontSize(18);
    doc.text(`Trip Report — Wagon ${wagonId}`, 40, 50);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 40, 70);

    // Summary table
    const cols = ["Metric", "Avg", "Min", "Max"];
    const rows = Object.keys(data[0] || {})
      .filter(k => k !== "time")
      .map(key => {
        const vals = data.map(d => d[key]);
        return [
          key,
          (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2),
          Math.min(...vals).toFixed(2),
          Math.max(...vals).toFixed(2)
        ];
      });
    autoTable(doc, { head: [cols], body: rows, startY: 100 });

    // Chart snapshots
    for (const key of Object.keys(data[0]).filter(k => k !== "time")) {
      const el = document.getElementById(`chart-${key}`);
      if (!el) continue;
      const canvas = await html2canvas(el, { scale: 2 });
      const img = canvas.toDataURL("image/png");
      doc.addPage();
      doc.text(`${key} Chart`, 40, 40);
      doc.addImage(img, "PNG", 40, 60, 500, 250);
    }

    // Alerts log
    doc.addPage();
    doc.text("Alerts Log", 40, 50);
    alerts.forEach((a, i) => {
      doc.text(`${i + 1}. [${a.time}] ${a.metric} = ${a.value}`, 40, 70 + i * 20);
    });

    doc.save(`Trip_Report_Wagon_${wagonId}.pdf`);
  }

  return (
    <button
      disabled={!hasData}
      onClick={generateReport}
      className={`px-4 py-2 rounded-md font-semibold ${
        hasData
          ? "bg-green-600 text-white hover:bg-green-700"
          : "bg-gray-400 text-gray-200 cursor-not-allowed"
      }`}
    >
      Generate Trip Report
    </button>
  );
}
