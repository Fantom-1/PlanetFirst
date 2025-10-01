import React from "react";
import Logo from "./PlanetFirstLogo.jpg"; // <-- 1. Import the logo

/**
 * Sidebar - Navigation sidebar with project list
 * Props:
 * - setView: function to change current view
 * - projects: array of project objects
 * - openProject: function to open a specific project by id
 * - activeView: string representing the current view
 * - activeProject: id of the currently viewed project
 */
export default function Sidebar({
  setView,
  projects,
  openProject,
  activeView, // Pass activeView to highlight the current item
  activeProject, // Pass activeProject to highlight
}) {
  // Helper to determine if a nav item is active
  const isViewActive = (view) => activeView === view && !activeProject;

  return (
    <aside className="w-72 bg-gray-50 border-r border-gray-200 h-screen sticky top-0 overflow-y-auto">
      {/* --- MODIFIED HEADER --- */}
      {/* 2. The header is now a flex container for the logo and text */}
      <div className="p-5 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <img src={Logo} alt="TerraLCA Logo" className="w-8 h-8" />
          <div className="text-xl font-semibold text-gray-800">PlanetFirst</div>
        </div>
        <div className="text-xs text-gray-500 mt-2">
          Metals Lifecycle Assessment
        </div>
      </div>
      {/* --- END MODIFIED HEADER --- */}

      <nav className="p-4 flex-1">
        {/* Dashboard Section */}
        <div className="mb-8">
          <div className="text-xs uppercase text-gray-500 font-semibold mb-2 px-5 tracking-wider">
            Dashboard
          </div>
          <div className="space-y-1">
            <button
              onClick={() => setView("overview")}
              className={`w-full text-left px-5 py-2 rounded text-sm transition-all flex items-center gap-3 ${
                isViewActive("overview")
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "hover:bg-gray-200 text-gray-600"
              }`}
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8ZM2.5 8a5.5 5.5 0 1 0 11 0 5.5 5.5 0 0 0-11 0Z"/>
              </svg>
              Overview
            </button>
            <button
              onClick={() => setView("lca-form")}
              className={`w-full text-left px-5 py-2 rounded text-sm transition-all flex items-center gap-3 ${
                isViewActive("lca-form")
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "hover:bg-gray-200 text-gray-600"
              }`}
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <path d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z"/>
              </svg>
              New Project
            </button>
          </div>
        </div>

        {/* Recent Projects Section */}
        <div className="mb-8">
          <div className="text-xs uppercase text-gray-500 font-semibold mb-2 px-5 tracking-wider">
            Recent Projects
          </div>
          <div className="space-y-1 max-h-64 overflow-auto">
            {projects.slice(-5).reverse().map((p) => (
              <button
                key={p.id}
                onClick={() => openProject(p.id)}
                className={`w-full text-left px-5 py-2 rounded text-sm transition-all flex items-center gap-2 ${
                  activeProject === p.id
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "hover:bg-gray-200 text-gray-600 hover:text-gray-900"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    p.status === "completed"
                      ? "bg-green-500"
                      : p.status === "in-progress"
                      ? "bg-yellow-500"
                      : "bg-gray-400"
                  }`}
                />
                <span className="truncate">{p.name}</span>
              </button>
            ))}
            {projects.length === 0 && (
              <div className="text-sm text-gray-500 px-5">No projects yet</div>
            )}
          </div>
        </div>

        {/* Tools Section */}
        <div>
          <div className="text-xs uppercase text-gray-500 font-semibold mb-2 px-5 tracking-wider">
            Tools
          </div>
          <div className="space-y-1">
            <button
              onClick={() => setView("templates")}
              className={`w-full text-left px-5 py-2 rounded text-sm transition-all flex items-center gap-3 ${
                isViewActive("templates")
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "hover:bg-gray-200 text-gray-600"
              }`}
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v3.585a.746.746 0 0 1-.746.746H.746A.746.746 0 0 1 0 5.331V1.75ZM0 7.75C0 6.784.784 6 1.75 6h12.5c.966 0 1.75.784 1.75 1.75v6.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25v-6.5Z"/>
              </svg>
              Templates
            </button>
            <button
              onClick={() => setView("analytics")}
              className={`w-full text-left px-5 py-2 rounded text-sm transition-all flex items-center gap-3 ${
                isViewActive("analytics")
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "hover:bg-gray-200 text-gray-600"
              }`}
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <path d="M1.5 1.75V13.5h13.75a.75.75 0 0 1 0 1.5H.75a.75.75 0 0 1-.75-.75V1.75a.75.75 0 0 1 1.5 0Zm14.28 2.53-5.25 5.25a.75.75 0 0 1-1.06 0L7 7.06 4.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0L10 8.94l4.72-4.72a.75.75 0 1 1 1.06 1.06Z"/>
              </svg>
              Analytics
            </button>
            <button
              onClick={() => setView("about")}
              className={`w-full text-left px-5 py-2 rounded text-sm transition-all flex items-center gap-3 ${
                isViewActive("about")
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "hover:bg-gray-200 text-gray-600"
              }`}
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
              </svg>
              About
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
}