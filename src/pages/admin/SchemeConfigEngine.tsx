import React, { useState } from 'react';
import { mockApi } from '../../lib/mockApi';
import { Scheme, EligibilityRule } from '../../types';
import { Sliders, Plus, Trash2, Save, Eye, Sparkles, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export const SchemeConfigEnginePage: React.FC = () => {
  const [schemeName, setSchemeName] = useState('National Fellowship for Tribal Excellence');
  const [schemeCode, setSchemeCode] = useState('NFTE-2026');
  const [category, setCategory] = useState('Higher Fellowship');
  const [amount, setAmount] = useState('₹45,000 / month + HRA');
  const [totalSlots, setTotalSlots] = useState(500);
  const [description, setDescription] = useState('Special fellowship for ST students in premier scientific research institutes.');

  const [rules, setRules] = useState<EligibilityRule[]>([
    { id: '1', field: 'Category', operator: 'eq', value: 'ST' },
    { id: '2', field: 'Annual Income', operator: 'lt', value: 600000 },
    { id: '3', field: 'Minimum Marks', operator: 'gt', value: 60 }
  ]);

  const [requiredDocs, setRequiredDocs] = useState<string[]>([
    'ST Caste Certificate',
    'Income Certificate',
    'Post-Graduation Marksheet',
    'Institute Admission Letter'
  ]);
  const [newDocName, setNewDocName] = useState('');

  const handleAddRule = () => {
    setRules((prev) => [
      ...prev,
      { id: Date.now().toString(), field: 'Qualification', operator: 'eq', value: 'Post Graduate' }
    ]);
  };

  const handleRemoveRule = (id: string) => {
    setRules((prev) => prev.filter((r) => r.id !== id));
  };

  const handleAddDoc = () => {
    if (!newDocName) return;
    setRequiredDocs((prev) => [...prev, newDocName]);
    setNewDocName('');
  };

  const handleSaveScheme = async () => {
    const newScheme: Partial<Scheme> = {
      code: schemeCode,
      name: schemeName,
      category,
      description,
      amount,
      totalSlots,
      eligibility: rules,
      requiredDocs,
      selectionCriteria: 'merit',
      window: { start: '2026-09-01', end: '2026-12-31' },
      stages: ['Submitted', 'Verified', 'Selected']
    };

    await mockApi.createScheme(newScheme);
    toast.success(`New Scheme "${schemeCode}" Configured & Published Live!`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-[#c9b79c] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">MoTA Administration</span>
          <h1 className="text-2xl font-bold text-slate-900 mt-0.5">No-Code Scheme Configuration Engine</h1>
          <p className="text-xs text-slate-500 mt-1">
            Create or edit MoTA scholarship schemes with dynamic eligibility rules without code changes.
          </p>
        </div>

        <button
          onClick={handleSaveScheme}
          className="inline-flex items-center px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-all"
        >
          <Save className="w-4 h-4 mr-2" />
          <span>Publish New Scheme Live</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Panel: Configuration Builder */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-[#c9b79c] shadow-xs space-y-6">
          <h3 className="font-bold text-slate-900 text-sm border-b pb-2">Scheme Metadata & Financials</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700">Scheme Name</label>
              <input
                type="text"
                value={schemeName}
                onChange={(e) => setSchemeName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700">Scheme Code (Unique)</label>
              <input
                type="text"
                value={schemeCode}
                onChange={(e) => setSchemeCode(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs uppercase font-mono font-bold"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700">Financial Assistance Amount</label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700">Total National Slots</label>
              <input
                type="number"
                value={totalSlots}
                onChange={(e) => setTotalSlots(Number(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>
          </div>

          {/* Dynamic Eligibility Rules Builder */}
          <div className="space-y-3 pt-4 border-t border-[#c9b79c]">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Dynamic Eligibility Rules Engine</h3>
              <button
                type="button"
                onClick={handleAddRule}
                className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#e8d6ba] hover:bg-slate-200 text-slate-800 text-xs font-bold"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                <span>Add Rule</span>
              </button>
            </div>

            <div className="space-y-2">
              {rules.map((rule, idx) => (
                <div key={rule.id || idx} className="flex items-center space-x-2 p-2.5 bg-[#f1e0c5] border border-[#c9b79c] rounded-xl text-xs">
                  <input
                    type="text"
                    value={rule.field}
                    onChange={(e) => {
                      const val = e.target.value;
                      setRules((prev) => prev.map((r, i) => (i === idx ? { ...r, field: val } : r)));
                    }}
                    className="w-1/3 px-2 py-1 border border-slate-300 rounded-md"
                  />
                  <select
                    value={rule.operator}
                    onChange={(e) => {
                      const val = e.target.value as EligibilityRule['operator'];
                      setRules((prev) => prev.map((r, i) => (i === idx ? { ...r, operator: val } : r)));
                    }}
                    className="w-1/4 px-2 py-1 border border-slate-300 rounded-md font-mono"
                  >
                    <option value="eq">EQUALS</option>
                    <option value="lt font-mono">LESS THAN</option>
                    <option value="gt">GREATER THAN</option>
                    <option value="in">IN LIST</option>
                  </select>
                  <input
                    type="text"
                    value={String(rule.value)}
                    onChange={(e) => {
                      const val = e.target.value;
                      setRules((prev) => prev.map((r, i) => (i === idx ? { ...r, value: val } : r)));
                    }}
                    className="w-1/3 px-2 py-1 border border-slate-300 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveRule(rule.id!)}
                    className="p-1 text-rose-600 hover:bg-rose-100 rounded-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel: Live Applicant Form Preview */}
        <div className="lg:col-span-5 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-bold text-amber-400 flex items-center">
              <Eye className="w-4 h-4 mr-1.5" />
              Live Applicant Form Preview
            </span>
            <span className="text-[10px] font-mono text-slate-400">Real-time sync</span>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="bg-amber-500 text-navy-950 font-extrabold text-[10px] px-2 py-0.5 rounded-md">
                {schemeCode}
              </span>
              <span className="text-slate-400 font-medium">{category}</span>
            </div>
            <h4 className="font-bold text-sm text-white">{schemeName}</h4>
            <p className="text-slate-300 text-[11px] leading-relaxed">{description}</p>
            <div className="p-2.5 rounded-lg bg-white/10 text-amber-300 font-bold">
              Assistance: {amount} ({totalSlots} Slots)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
