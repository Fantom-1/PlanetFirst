import React from "react";

/**
 * AiAssistant - Floating AI helper with gradient styling
 * Props:
 *  - active: boolean (show/hide)
 *  - message: string
 *  - subMessage: string (optional)
 *  - onClose: fn (optional)
 */
export default function AiAssistant({ active, message, subMessage, onClose }) {
  if (!active) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-auto">
      <div className="flex items-end gap-3">
        {/* AI Avatar */}
        <div 
          className="w-12 h-12 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white text-2xl"
          style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
        >
          🤖
        </div>

        {/* Message Bubble */}
        <div 
          className="max-w-xs text-white shadow-lg rounded-2xl p-4 animate-fadeIn"
          style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="text-sm font-semibold">AI Assist</div>
            {onClose && (
              <button 
                onClick={onClose} 
                className="ml-2 text-white hover:text-gray-200 text-xl leading-none transition-colors"
              >
                ×
              </button>
            )}
          </div>

          <div className="text-sm leading-tight">{message}</div>
          {subMessage && (
            <div className="text-xs mt-2 opacity-90">{subMessage}</div>
          )}
          
          <div className="mt-2 text-[11px] opacity-75">
            ✨ AI helper · Prototype
          </div>
        </div>
      </div>
    </div>
  );
}