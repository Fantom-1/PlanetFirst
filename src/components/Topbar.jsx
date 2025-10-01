import React from "react";

/**
 * Topbar - Top navigation bar with breadcrumb and actions
 * Props:
 *  - view: current view name
 *  - onNew: function called when "New Project" button is clicked
 */
export default function Topbar({ view, onNew }) {
  const viewLabels = {
    overview: "Overview",
    "lca-form": "New Project",
    templates: "Templates",
    analytics: "Analytics",
    "project-detail": "Project Detail",
    about: "About"
  };

  return (
    <header className="h-16 bg-white border-b border-gray-300 flex items-center justify-between px-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm">
        <span className="text-gray-500">Dashboard</span>
        <span className="mx-2 text-gray-500">/</span>
        <span className="font-medium text-gray-900">
          {viewLabels[view] || "Dashboard"}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onNew}
          className="px-4 py-2 text-sm font-medium border border-green-600 rounded-md bg-green-600 text-white hover:bg-green-700 hover:border-green-700 transition-all"
        >
          New Project
        </button>
      </div>
    </header>
  );
}