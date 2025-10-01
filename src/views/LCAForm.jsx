import React, { useState, useEffect } from "react";

// --- Helper Components (Previously Imported) ---

/**
 * Renders the stepper navigation and the current step's content.
 */
const FormStepper = ({ step, onNext, onPrev, isLast, children }) => (
    <div>
      <div className="mb-6">{children}</div>
      <div className="flex justify-between items-center mt-6 pt-4 border-t">
        <button
          onClick={onPrev}
          className={`px-4 py-2 border rounded text-gray-700 ${step === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
          disabled={step === 1}
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          className="px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700 font-semibold"
        >
          {isLast ? "Generate Assessment Report" : `Next →`}
        </button>
      </div>
    </div>
);

/**
 * A floating notification panel for the AI assistant.
 */
const AiAssistant = ({ active, message, subMessage, onClose }) => {
    if (!active) return null;
    return (
      <div className="fixed bottom-5 right-5 w-80 bg-white border rounded-lg shadow-xl p-4 animate-fadeIn z-50">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold text-sm text-indigo-700">✨ AI Assistant</p>
            <p className="text-sm text-gray-800 mt-2">{message}</p>
            {subMessage && <p className="text-xs text-gray-500 mt-1">{subMessage}</p>}
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-xl font-bold">&times;</button>
        </div>
      </div>
    );
};

/**
 * A progress bar to show the current step in the form.
 */
const ProgressBar = ({ currentStep }) => {
    const steps = ["Project Details", "Metals & Lifecycle", "Goals & Scenarios", "Review & Submit"];
    return (
        <div className="w-full mb-8">
            <div className="relative flex justify-between items-center">
                {/* The connecting line */}
                <div className="absolute top-3 left-0 w-full h-0.5 bg-gray-200"></div>
                
                {steps.map((label, index) => {
                    const stepNumber = index + 1;
                    const isCompleted = stepNumber < currentStep;
                    const isActive = stepNumber === currentStep;
                    return (
                        <div key={label} className="relative flex items-center bg-[rgb(249,250,251)]  px-2">
                             <div className={`
                                w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 flex-shrink-0 transition-all
                                ${isCompleted ? 'bg-green-600 text-white border-green-700' : ''}
                                ${isActive ? 'bg-indigo-600 text-white border-indigo-700' : ''}
                                ${!isCompleted && !isActive ? 'bg-white text-gray-400 border-gray-300' : ''}
                            `}>
                                {stepNumber}
                            </div>
                            <span className={`
                                ml-2 text-sm hidden sm:block
                                ${isCompleted ? 'text-gray-900' : 'text-gray-500'}
                                ${isActive ? 'font-bold text-indigo-600' : 'font-medium'}
                            `}>
                                {label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


// --- Sub-components for Step 2 ---

/**
 * A single production process card with inputs for type and energy use.
 */
const ProductionProcess = ({ onRemove }) => (
    <div className="bg-gray-50 p-3 mb-2 rounded-md border animate-fadeIn">
      <div className="flex justify-between items-center mb-3">
        <h5 className="font-semibold text-sm">Production Stage</h5>
        <button type="button" onClick={onRemove} className="px-2 py-1 text-xs bg-white border rounded hover:bg-gray-50">Remove</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Process Type</label>
          <select className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200">
            <option>Mining</option>
            <option>Smelting</option>
            <option>Refining</option>
            <option>Fabrication</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Energy Use (kWh/tonne)</label>
          <input type="number" placeholder="e.g., 15000" className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" />
        </div>
      </div>
    </div>
  );

/**
 * An expandable card for a single metal, containing multiple tabs for data entry.
 */
const MetalCard = ({ metal, onUpdate, onRemove }) => {
    const [activeTab, setActiveTab] = useState('inventory');
    const [processes, setProcesses] = useState([]);

    const addProcess = () => setProcesses([...processes, { id: `process-${Date.now()}` }]);
    const removeProcess = (id) => setProcesses(processes.filter(p => p.id !== id));

    const TABS = ['inventory', 'processes', 'transport', 'use', 'eol'];
    const metalSummary = metal.quantity && metal.type ? `: ${metal.quantity} tonnes of ${metal.type}` : (metal.type ? `: ${metal.type}` : '');

    const handleFieldChange = (section, field, value) => {
        onUpdate(metal.id, {
            [section]: {
                ...(metal[section] || {}),
                [field]: value
            }
        });
    };

    return (
      <div className="border rounded-lg mb-4 overflow-hidden shadow-sm animate-fadeIn">
        <div
          className="bg-gray-50 p-4 flex justify-between items-center cursor-pointer hover:bg-gray-100"
          onClick={() => onUpdate(metal.id, { expanded: !metal.expanded })}
        >
          <div className="flex items-center">
            <h4 className="font-semibold text-base">{metal.type || `Metal`}</h4>
            <span className="text-gray-600 text-sm ml-3 font-normal">{metalSummary}</span>
          </div>
           <div className="flex items-center gap-2">
            <div className={`transform transition-transform duration-200 ${metal.expanded ? 'rotate-90' : ''}`}>▶</div>
          </div>
        </div>

        {metal.expanded && (
          <div className="p-5 bg-white">
            <div className="flex border-b flex-wrap">
              {TABS.map(tab => (
                <button
                  key={tab} type="button" onClick={() => setActiveTab(tab)}
                  className={`capitalize px-4 py-2 border-b-2 text-sm font-medium ${
                    activeTab === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'eol' ? 'End-of-Life' : tab.replace('_', ' ')}
                </button>
              ))}
            </div>

            <div className="pt-5">
              {activeTab === 'inventory' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <label className="block text-sm font-semibold mb-1">Metal Type <span className="text-red-500">*</span></label>
                        <input value={metal.type} onChange={(e) => onUpdate(metal.id, { type: e.target.value })} className="w-full p-2 border rounded" placeholder="e.g., Copper" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Quantity (tonnes) <span className="text-red-500">*</span></label>
                        <input type="number" value={metal.quantity || ''} onChange={(e) => onUpdate(metal.id, { quantity: e.target.value })} step="0.1" min="0" placeholder="e.g., 10.5" className="w-full p-2 border rounded" />
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'processes' && (
                <div>
                  {processes.map(p => <ProductionProcess key={p.id} onRemove={() => removeProcess(p.id)} />)}
                  <button type="button" onClick={addProcess} className="mt-2 px-3 py-2 text-sm text-indigo-600 border border-indigo-500 rounded hover:bg-indigo-500 hover:text-white">
                    + Add Production Stage
                  </button>
                </div>
              )}
              {activeTab === 'transport' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Transport Stage</label>
                      <select value={metal.transport?.stage || ''} onChange={e => handleFieldChange('transport', 'stage', e.target.value)} className="w-full p-2 border rounded-md text-sm"><option>Raw material to Plant</option><option>Between processes</option><option>Plant to Customer</option></select>
                    </div>
                     <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mode</label>
                      <select value={metal.transport?.mode || ''} onChange={e => handleFieldChange('transport', 'mode', e.target.value)} className="w-full p-2 border rounded-md text-sm"><option>Road</option><option>Rail</option><option>Ship</option></select>
                    </div>
                  </div>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Distance (km)</label>
                        <input type="number" value={metal.transport?.distance || ''} onChange={e => handleFieldChange('transport', 'distance', e.target.value)} placeholder="e.g., 500" className="w-full p-2 border rounded-md text-sm"/>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'use' && (
                  <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Product Lifetime (years)</label>
                              <input type="number" value={metal.use?.lifetime || ''} onChange={e => handleFieldChange('use', 'lifetime', e.target.value)} placeholder="e.g., 25" className="w-full p-2 border rounded-md text-sm"/>
                          </div>
                      </div>
                  </div>
              )}
               {activeTab === 'eol' && (
                  <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Collection Rate (%)</label>
                              <input type="number" value={metal.eol?.collectionRate || ''} onChange={e => handleFieldChange('eol', 'collectionRate', e.target.value)} placeholder="e.g., 75" className="w-full p-2 border rounded-md text-sm"/>
                          </div>
                      </div>
                  </div>
              )}
            </div>
            <div className="mt-4 pt-4 border-t">
              <button type="button" onClick={() => onRemove(metal.id)} className="px-3 py-2 text-sm bg-red-50 text-red-600 border border-red-200 rounded hover:bg-red-500 hover:text-white">
                Remove Metal
              </button>
            </div>
          </div>
        )}
      </div>
    );
};


/**
 * The container component for the "Metals & Lifecycle" step.
 */
const MetalsLifecycleStep = ({ metals, onAddMetal, onRemoveMetal, onUpdateMetal }) => (
    <div className="bg-white border rounded-lg">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold">Metals & Lifecycle Stages</h3>
        <p className="text-sm text-gray-600 mt-1">Add and configure each metal and its lifecycle from production to end-of-life.</p>
      </div>
      <div className="p-6">
        <div>
          {metals.map((metal) => (
            <MetalCard
              key={metal.id}
              metal={metal}
              onUpdate={onUpdateMetal}
              onRemove={onRemoveMetal}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => onAddMetal()}
          className="w-full p-4 mt-2 border-2 border-dashed bg-gray-50 text-gray-600 rounded-md hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50"
        >
          <strong className="font-semibold">+ Add Metal</strong>
        </button>
      </div>
    </div>
  );


/**
 * The main form component that manages state and steps for an LCA project.
 */
export default function LCAForm({ onSave, project: initialProject }) {
  const [step, setStep] = useState(1);
  const [project, setProject] = useState({
    id: null, name: "", description: "", assessmentGoal: "",
    geographicScope: "global", timeHorizon: "cradle-grave", functionalUnit: "",
    referenceYear: "2023", metals: [], primaryObjective: "", targetRecycled: "",
    carbonBudget: "", improvementTimeframe: "short", investmentWillingness: "low",
    dataSource: "secondary", comparisonBenchmark: "none", sensitivityVars: "",
    status: "draft",
  });

  const blankMetal = {
    id: Date.now() + Math.random(),
    type: "",
    quantity: '',
    expanded: true,
    transport: { stage: 'Raw material to Plant', mode: 'Road', distance: '' },
    use: { lifetime: '' },
    eol: { collectionRate: '' }
  };

  useEffect(() => {
    if (initialProject) {
      setProject(p => ({...p, ...initialProject}));
    } else {
        addMetal();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialProject]);


  // AI assistant UI state
  const [aiActive, setAiActive] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [aiSub, setAiSub] = useState("");

  // ---------- Project helpers ----------
  function addMetal() {
    setProject((p) => ({ ...p, metals: [...p.metals, { ...blankMetal, id: Date.now() + Math.random() }] }));
  }
  function removeMetal(id) {
    if (project.metals.length <= 1) {
        alert("At least one metal must remain in the project.");
        return;
    }
    setProject((p) => ({ ...p, metals: p.metals.filter((m) => m.id !== id) }));
  }
  function updateMetal(id, updates) {
    setProject((p) => ({ ...p, metals: p.metals.map((m) => (m.id === id ? { ...m, ...updates } : m)) }));
  }

  function validateStep(s) {
    if (s === 1) {
      if (!project.name.trim() || !project.functionalUnit.trim()) {
        alert("Please fill required fields: Project Name and Functional Unit.");
        return false;
      }
    }
    if (s === 2) {
        for (const metal of project.metals) {
            if (!metal.type.trim() || !metal.quantity) {
                alert(`Please fill required fields for all metals: Type and Quantity.`);
                return false;
            }
        }
    }
    return true;
  }

  function next() {
    if (!validateStep(step)) return;
    if (step < 4) setStep((s) => s + 1);
    else handleSubmit();
  }
  function back() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleSubmit() {
    const p = { ...project, updated: new Date().toISOString().split("T")[0], created: project.created || new Date().toISOString().split("T")[0] };
    if (onSave) onSave(p);
  }

  const showOrDash = (v) => (v || "—");

  // ------------- AI simulation helpers -------------
  const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  function checkMissingFields(s, proj) {
    const missing = [];
    if (s === 1) {
      if (!proj.name.trim()) missing.push("Project Name");
      if (!proj.functionalUnit.trim()) missing.push("Functional Unit");
    }
    if (s === 2) {
      if (!proj.metals || proj.metals.length === 0) missing.push("Metals (add at least one)");
      else {
        proj.metals.forEach((m, i) => {
          if (!m.type.trim()) missing.push(`Metal ${i + 1} type`);
          if (!m.quantity) missing.push(`Metal ${i + 1} quantity`);
        });
      }
    }
    if (s === 3) {
      if (!proj.primaryObjective) missing.push("Primary Objective");
    }
    return missing;
  }

  function aiGenerateForStep(s) {
    const updates = {};
    let metalsToAdd = [];

    if (s === 1) {
      if (!project.name.trim()) updates.name = pick(["Green Copper Cable", "PlanetFirst Alloy Plan"]);
      if (!project.functionalUnit.trim()) updates.functionalUnit = pick(["1 km of cable", "1 tonne of copper"]);
      if (!project.assessmentGoal) updates.assessmentGoal = pick(["eco-design", "circularity"]);
    } else if (s === 2) {
      const metalUpdates = project.metals.map(m => {
        const metalUpd = { id: m.id };
        if (!m.type) metalUpd.type = pick(['Copper', 'Aluminum', 'Steel']);
        if (!m.quantity) metalUpd.quantity = randomInt(1, 20);
        return metalUpd;
      });
      updates.metals = metalUpdates;
    } else if (s === 3) {
      if (!project.primaryObjective) updates.primaryObjective = pick(["min-carbon", "max-circularity"]);
      if (!project.targetRecycled) updates.targetRecycled = String(randomInt(10, 70));
    }
    return { updates, metalsToAdd };
  }

  // Apply AI generated updates to project
  function applyAiResult({ updates, metalsToAdd }) {
    setProject((p) => {
      let next = { ...p };
      Object.keys(updates).forEach(key => {
        if (key !== 'metals') {
            next[key] = updates[key];
        }
      });
      if (updates.metals) {
        next.metals = next.metals.map((m) => {
          const found = updates.metals.find((um) => um.id === m.id);
          return found ? { ...m, ...found } : m;
        });
      }
      if (metalsToAdd.length) {
        next.metals = [...next.metals, ...metalsToAdd];
      }
      return next;
    });
  }

  async function aiFillStep(s = step) {
    const missing = checkMissingFields(s, project);
    if (missing.length === 0) {
        setAiActive(true);
        setAiMessage("All required fields look filled!");
        setTimeout(() => setAiActive(false), 2000);
        return;
    }

    setAiActive(true);
    setAiMessage(`Filling ${missing.length} missing field(s): ${missing.slice(0, 2).join(", ")}...`);
    await new Promise((r) => setTimeout(r, 1200));

    const result = aiGenerateForStep(s);
    applyAiResult(result);

    setAiMessage("Done — fields have been filled. Please review.");
    setTimeout(() => setAiActive(false), 2000);
  }

  function closeAi() {
    setAiActive(false);
  }

  return (
    <div className="max-w-5xl mx-auto relative">
      <h1 className="text-2xl font-semibold mb-2">{project.id ? `Edit: ${project.name}` : "Create New Project"}</h1>
      <p className="text-sm text-gray-500 mb-6">Start a new comprehensive life cycle assessment for metal products.</p>

        <ProgressBar currentStep={step} />

        <div className="flex items-center justify-end gap-2 mb-4">
            <button
            className="px-3 py-1 bg-indigo-600 text-white rounded text-sm shadow hover:bg-indigo-700"
            onClick={() => aiFillStep(step)}
            >
            ✨ AI fill this step
            </button>
        </div>

      <FormStepper step={step} setStep={setStep} onNext={next} onPrev={back} isLast={step === 4}>
        {step === 1 && (
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Project Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">Project Name <span className="text-red-500">*</span></label>
                <input value={project.name} onChange={(e) => setProject({ ...project, name: e.target.value })} className="w-full p-2 border rounded" placeholder="e.g., Green Copper Cable Initiative" />
              </div>
                <div>
                    <label className="block font-semibold mb-1">Assessment Goal</label>
                    <select value={project.assessmentGoal} onChange={(e) => setProject({ ...project, assessmentGoal: e.target.value })} className="w-full p-2 border rounded bg-white">
                        <option value="">Select a goal</option>
                        <option value="compliance">Compliance Reporting</option>
                        <option value="eco-design">Eco-design</option>
                        <option value="circularity">Circularity Optimization</option>
                        <option value="comparative">Comparative Analysis</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                    <label className="block font-semibold mb-1">Geographic Scope</label>
                    <select value={project.geographicScope} onChange={(e) => setProject({ ...project, geographicScope: e.target.value })} className="w-full p-2 border rounded bg-white">
                        <option value="na">North America</option>
                        <option value="eu">European Union</option>
                        <option value="asia">Asia-Pacific</option>
                        <option value="global">Global</option>
                    </select>
                </div>
                <div>
                    <label className="block font-semibold mb-1">Time Horizon</label>
                    <select value={project.timeHorizon} onChange={(e) => setProject({ ...project, timeHorizon: e.target.value })} className="w-full p-2 border rounded bg-white">
                        <option value="cradle-gate">Cradle-to-gate</option>
                        <option value="cradle-grave">Cradle-to-grave</option>
                        <option value="cradle-cradle">Cradle-to-cradle</option>
                        <option value="gate-gate">Gate-to-gate</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block font-semibold mb-1">Functional Unit <span className="text-red-500">*</span></label>
                <input value={project.functionalUnit} onChange={(e) => setProject({ ...project, functionalUnit: e.target.value })} className="w-full p-2 border rounded" placeholder="e.g., 1 km of power cable" />
              </div>
                <div>
                    <label className="block font-semibold mb-1">Reference Year</label>
                    <select value={project.referenceYear} onChange={(e) => setProject({ ...project, referenceYear: e.target.value })} className="w-full p-2 border rounded bg-white">
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                    </select>
                </div>
            </div>
             <div className="mt-4">
              <label className="block font-semibold mb-1">Project Description</label>
              <textarea value={project.description} onChange={(e) => setProject({ ...project, description: e.target.value })} className="w-full p-2 border rounded" placeholder="Describe your project..."></textarea>
            </div>
          </div>
        )}

        {step === 2 && (
            <MetalsLifecycleStep
                metals={project.metals}
                onAddMetal={addMetal}
                onRemoveMetal={removeMetal}
                onUpdateMetal={updateMetal}
            />
        )}

        {step === 3 && (
          <div className="bg-white border rounded-lg p-6 space-y-6">
            <div>
                <h3 className="text-lg font-semibold">Circularity Goals & Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <label className="block mb-1 font-medium">Primary Objective</label>
                    <select value={project.primaryObjective} onChange={(e) => setProject({ ...project, primaryObjective: e.target.value })} className="w-full p-2 border rounded bg-white">
                      <option value="">Select primary objective</option>
                      <option value="min-carbon">Minimize carbon footprint</option>
                      <option value="max-circularity">Maximize circularity</option>
                      <option value="cost-opt">Cost optimization</option>
                      <option value="balanced">Balanced approach</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Target Recycled Content (%)</label>
                    <input value={project.targetRecycled} onChange={(e) => setProject({ ...project, targetRecycled: e.target.value })} type="number" className="w-full p-2 border rounded" placeholder="e.g., 50" />
                  </div>
                </div>
            </div>
            <div>
                <h4 className="font-semibold">Data Quality & Scenario Analysis</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <label className="block mb-1 font-medium">Primary Data Source Type</label>
                    <select value={project.dataSource} onChange={(e) => setProject({ ...project, dataSource: e.target.value })} className="w-full p-2 border rounded bg-white">
                      <option value="primary">Primary (measured)</option>
                      <option value="secondary">Secondary (industry avg.)</option>
                      <option value="estimated">Estimated</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Comparison Benchmark</label>
                    <select value={project.comparisonBenchmark} onChange={(e) => setProject({ ...project, comparisonBenchmark: e.target.value })} className="w-full p-2 border rounded bg-white">
                      <option value="none">None</option>
                      <option value="industry-avg">Industry Average</option>
                      <option value="best-practice">Best Practice</option>
                      <option value="regulatory">Regulatory Limits</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block mb-1 font-medium">Key Variables to Test for Sensitivity</label>
                  <textarea value={project.sensitivityVars} onChange={(e) => setProject({ ...project, sensitivityVars: e.target.value })} className="w-full p-2 border rounded" placeholder="e.g., Energy price, Recycling rate, Transport distance..."></textarea>
                </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Project Review</h3>
             <div className="p-4 border rounded bg-gray-50">
                <div className="font-semibold mt-1">{showOrDash(project.name)}</div>
                <div className="text-sm text-gray-600 mt-2">{showOrDash(project.description)}</div>
             </div>
             <div className="mt-4">
                <h4 className="font-semibold">Metals</h4>
                {project.metals.length ? project.metals.map(m => (
                    <div key={m.id} className="p-2 border-b">
                        {m.type || 'Unnamed Metal'}: {m.quantity || 'N/A'} tonnes
                    </div>
                )) : <p className="text-gray-500">No metals added.</p>}
             </div>
          </div>
        )}
      </FormStepper>
      <AiAssistant active={aiActive} message={aiMessage} subMessage={aiSub} onClose={closeAi} />
    </div>
  );
}

