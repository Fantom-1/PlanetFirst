import React from "react";

/**
 * StatCard - Display metric with hover animation
 * Props:
 *  - number: the metric value to display
 *  - label: description of the metric
 */
export default function StatCard({ number, label }) {
  return (
    <div className="bg-white p-5 border border-gray-300 rounded-lg text-center transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="text-2xl font-semibold text-blue-600 mb-1">
        {number}
      </div>
      <div className="text-xs text-gray-500 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}