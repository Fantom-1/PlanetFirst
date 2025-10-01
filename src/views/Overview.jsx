import React from "react";
import StatCard from "../components/StatCard";
import ProjectCard from "../components/ProjectCard";

/**
 * Overview - Dashboard overview with stats and project grid
 * Props:
 *  - projects: array of project objects
 *  - onOpen: function to open a project detail view
 */
export default function Overview({ projects, onOpen }) {
  const completedCount = projects.filter((p) => p.status === "completed").length;

  return (
    <div className="max-w-7xl mx-auto ">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 font-large text-2xl">
        <StatCard number={projects.length} label="Total Projects" />
        <StatCard number={completedCount} label="Completed" />
        <StatCard number="1,247" label="Total Emissions (tCO₂eq)" />
        <StatCard number="73%" label="Avg Circularity" />
      </div>

      {/* Recent Projects Card */}
      <div className="bg-white border border-gray-300 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-300">
          <h3 className="text-lg font-semibold text-gray-900">Recent Projects</h3>
          <p className="text-sm text-gray-500 mt-1">
            Your lifecycle assessment projects
          </p>
        </div>
        
        <div className="p-6">
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.slice().reverse().map((p) => (
                <ProjectCard key={p.id} project={p} onOpen={onOpen} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="mt-4 text-gray-500">
                No projects yet. Click "New Project" to get started!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}