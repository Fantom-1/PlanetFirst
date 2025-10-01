import React from "react";

/**
 * ProjectCard - Displays project summary with hover effects
 * Props:
 *  - project: object with {id, name, description, status, updated, metals}
 *  - onOpen: function called when card is clicked
 */
export default function ProjectCard({ project, onOpen }) {
  const statusConfig = {
    completed: {
      bg: 'rgba(26, 127, 55, 0.1)',
      text: 'text-green-700',
      dot: 'bg-green-600'
    },
    'in-progress': {
      bg: 'rgba(154, 103, 0, 0.1)',
      text: 'text-yellow-700',
      dot: 'bg-yellow-600'
    },
    draft: {
      bg: '#f6f8fa',
      text: 'text-gray-600',
      dot: 'bg-gray-400'
    }
  };

  const config = statusConfig[project.status] || statusConfig.draft;

  return (
    <div
      onClick={() => onOpen(project)}
      className="bg-white border border-gray-300 rounded-lg p-5 cursor-pointer transition-all duration-150 hover:border-blue-600 hover:shadow-md hover:-translate-y-0.5"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="font-semibold text-base mb-1">
            {project.name}
          </div>
          <div className="text-xs text-gray-500">
            Updated {new Date(project.updated).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="text-sm text-gray-600 leading-snug mb-4">
        {project.description}
      </div>

      {/* Status Badge */}
      <span
        className={`inline-block px-2 py-1 rounded-xl text-xs font-medium capitalize ${config.text}`}
        style={{ backgroundColor: config.bg }}
      >
        {project.status.replace('-', ' ')}
      </span>
    </div>
  );
}