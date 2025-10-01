import React from "react";

/**
 * ProgressBar - Step indicator with connecting lines
 * Props:
 *  - step: current step number (1-4)
 *  - total: total number of steps (default 4)
 */
export default function ProgressBar({ step = 1, total = 4 }) {
  const steps = [
    "Project Details",
    "Metals & Lifecycle",
    "Goals & Scenarios",
    "Review & Submit"
  ];

  return (
    <div className="mb-8 flex justify-between relative">
      {/* Background connecting line */}
      <div 
        className="absolute top-3 left-3 right-3 h-0.5 bg-gray-300 z-0"
        style={{ zIndex: 1 }}
      />

      {steps.map((label, idx) => {
        const currentStep = idx + 1;
        const isCompleted = currentStep < step;
        const isActive = currentStep === step;

        return (
          <div
            key={currentStep}
            className={`flex items-center relative z-10 bg-[rgb(249,250,251)] px-2 ${
              isActive ? 'text-blue-600 font-semibold' : 
              isCompleted ? 'text-green-600' : 'text-gray-500'
            }`}
            style={{ zIndex: 2 }}
          >
            {/* Circle */}
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs font-semibold flex-shrink-0 border-2 ${
                isCompleted
                  ? 'bg-green-600 text-white border-green-600'
                  : isActive
                  ? 'bg-blue-600 text-white border-blue-600'
                  : ' border-gray-300'
              }`}
            >
              {currentStep}
            </div>
            
            {/* Label - hidden on mobile */}
            <span className="hidden md:inline text-sm whitespace-nowrap">
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}