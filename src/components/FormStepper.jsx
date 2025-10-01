import React from "react";
import ProgressBar from "./ProgressBar";

/**
 * FormStepper - Multi-step form wrapper with navigation
 * Props:
 *  - step: current step number
 *  - setStep: function to update step
 *  - children: form content
 *  - onNext: function called on next/submit
 *  - onPrev: function called on back
 *  - isLast: boolean indicating if this is the last step
 */
export default function FormStepper({ step, setStep, children, onNext, onPrev, isLast }) {
  const stepLabels = [
    "Metals & Lifecycle",
    "Goals & Scenarios", 
    "Review & Submit"
  ];

  return (
    <div>
      <ProgressBar step={step} total={4} />

      <div className="mt-4">{children}</div>

      {/* Navigation Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t border-gray-300 gap-3">
        {/* Back Button */}
        <button
          onClick={() => {
            if (step > 1) {
              setStep(step - 1);
              if (onPrev) onPrev();
            }
          }}
          className={`inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 transition-all ${
            step === 1 ? 'invisible' : ''
          }`}
        >
          ← Back
        </button>

        {/* Next/Submit Button */}
        <button
          onClick={onNext}
          className="inline-flex items-center px-4 py-2 text-sm font-medium border rounded-md text-white transition-all bg-green-600 border-green-600 hover:bg-green-700 hover:border-green-700"
        >
          {!isLast
            ? `Next: ${stepLabels[step - 1] || 'Continue'} →`
            : 'Generate Assessment Report'}
        </button>
      </div>

      {/* AI Assist Banner */}
      <div 
        className="mt-6 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-center text-white gap-3"
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      >
        <div>
          <strong>AI Assist Available</strong> - Our AI can help estimate values based on industry standards. Look for the 🤖 icon.
        </div>
        <button 
          className="px-3 py-1.5 text-sm rounded bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors whitespace-nowrap"
        >
          🤖 Auto-fill
        </button>
      </div>
    </div>
  );
}