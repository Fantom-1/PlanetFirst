import React from "react";

/**
 * Tabs - Tabbed interface component
 * Props:
 *  - tabs: array of {key, label, content} objects
 *  - active: currently active tab key
 *  - onChange: function called when tab changes
 */
export default function Tabs({ tabs = [], active, onChange }) {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-300 bg-white overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-all ${
              active === t.key
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {tabs.find((x) => x.key === active)?.content}
      </div>
    </div>
  );
}