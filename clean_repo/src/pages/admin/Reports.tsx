import React from 'react';
import { BarChart3, Download, FileText, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export const ReportsPage: React.FC = () => {
  const exportReport = (title: string) => {
    toast.success(`Downloaded ${title} Analytics Report (PDF)`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-[#c9b79c] shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">MoTA Leadership</span>
          <h1 className="text-2xl font-bold text-slate-900 mt-0.5">Scheme Performance & Financial Reports</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#c9b79c] shadow-xs space-y-3">
          <div className="p-3 rounded-xl bg-blue-50 text-blue-700 w-fit">
            <BarChart3 className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">NFST Higher Fellowship Report</h3>
          <p className="text-xs text-slate-500">State-wise M.Phil and Ph.D. fellowship allocations and expenditure.</p>
          <button
            onClick={() => exportReport('NFST Fellowship')}
            className="inline-flex items-center text-xs font-bold text-[#71816d] hover:underline pt-2"
          >
            <Download className="w-3.5 h-3.5 mr-1" />
            <span>Export Report (PDF)</span>
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#c9b79c] shadow-xs space-y-3">
          <div className="p-3 rounded-xl bg-orange-50 text-orange-700 w-fit">
            <BarChart3 className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">NOS Overseas Fellowship Report</h3>
          <p className="text-xs text-slate-500">Foreign university admissions, country breakdown, and forex expenditure.</p>
          <button
            onClick={() => exportReport('NOS Overseas')}
            className="inline-flex items-center text-xs font-bold text-[#71816d] hover:underline pt-2"
          >
            <Download className="w-3.5 h-3.5 mr-1" />
            <span>Export Report (PDF)</span>
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#c9b79c] shadow-xs space-y-3">
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 w-fit">
            <BarChart3 className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">DBT Direct Payment Audit Report</h3>
          <p className="text-xs text-slate-500">Aadhaar-linked bank transfer status, PFMS transaction clearance rates.</p>
          <button
            onClick={() => exportReport('DBT Payment Audit')}
            className="inline-flex items-center text-xs font-bold text-[#71816d] hover:underline pt-2"
          >
            <Download className="w-3.5 h-3.5 mr-1" />
            <span>Export Report (PDF)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
