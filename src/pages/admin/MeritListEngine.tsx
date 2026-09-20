import React, { useState, useEffect } from 'react';
import { mockApi } from '../../lib/mockApi';
import { MeritCandidate } from '../../types';
import { Award, Download, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import jsPDF from 'jspdf';

export const MeritListEnginePage: React.FC = () => {
  const [candidates, setCandidates] = useState<MeritCandidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedScheme, setSelectedScheme] = useState('NFST');

  useEffect(() => {
    loadMeritList();
  }, [selectedScheme]);

  const loadMeritList = async () => {
    setLoading(true);
    const list = await mockApi.generateMeritList(selectedScheme);
    setCandidates(list);
    setLoading(false);
  };

  const exportMeritPDF = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(`MINISTRY OF TRIBAL AFFAIRS - SELECTION COMMITTEE MERIT LIST`, 105, 18, { align: 'center' });
    doc.setFontSize(11);
    doc.text(`Scheme: ${selectedScheme} | Date: ${new Date().toLocaleDateString('en-IN')}`, 105, 26, { align: 'center' });
    doc.line(20, 30, 190, 30);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('Rank', 20, 38);
    doc.text('Application ID', 35, 38);
    doc.text('Candidate Name', 75, 38);
    doc.text('State', 125, 38);
    doc.text('Merit Score', 155, 38);
    doc.text('Status', 180, 38);
    doc.line(20, 41, 190, 41);

    doc.setFont('helvetica', 'normal');
    candidates.forEach((c, idx) => {
      const y = 48 + idx * 7;
      if (y < 270) {
        doc.text(`${c.rank}`, 20, y);
        doc.text(c.applicationId, 35, y);
        doc.text(c.applicantName, 75, y);
        doc.text(c.state, 125, y);
        doc.text(`${c.totalScore}`, 155, y);
        doc.text(c.status, 180, y);
      }
    });

    doc.save(`MoTA_Merit_List_${selectedScheme}_${Date.now()}.pdf`);
    toast.success('Official Merit List PDF Downloaded');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-[#c9b79c] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Selection Committee Desk</span>
          <h1 className="text-2xl font-bold text-slate-900 mt-0.5">Automated Merit Scoring & Ranking Engine</h1>
          <p className="text-xs text-slate-500 mt-1">Multi-criteria scoring: Academic (70%) + Need Weightage + Research Synopsis.</p>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={exportMeritPDF}
            className="inline-flex items-center px-4 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-xs"
          >
            <Download className="w-4 h-4 mr-2" />
            <span>Export Official Merit List PDF</span>
          </button>
        </div>
      </div>

      {/* Scheme Selector Tabs */}
      <div className="bg-white p-4 rounded-2xl border border-[#c9b79c] shadow-xs flex items-center justify-between">
        <div className="flex space-x-2">
          {['NFST', 'NOS', 'TCES'].map((code) => (
            <button
              key={code}
              onClick={() => setSelectedScheme(code)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedScheme === code
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'bg-[#e8d6ba] text-slate-700 hover:bg-slate-200'
              }`}
            >
              {code} Scheme Merit List
            </button>
          ))}
        </div>

        <button
          onClick={loadMeritList}
          className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#e8d6ba] hover:bg-slate-200 text-slate-700 text-xs font-bold"
        >
          <RefreshCw className="w-3.5 h-3.5 mr-1" />
          <span>Re-compute Rankings</span>
        </button>
      </div>

      {/* Merit List Table */}
      <div className="bg-white rounded-2xl border border-[#c9b79c] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f1e0c5] border-b border-[#c9b79c] text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Rank</th>
                <th className="px-6 py-3.5">App ID</th>
                <th className="px-6 py-3.5">Candidate Name</th>
                <th className="px-6 py-3.5">State</th>
                <th className="px-6 py-3.5">Academic (70%)</th>
                <th className="px-6 py-3.5">Need Weight</th>
                <th className="px-6 py-3.5">Total Score</th>
                <th className="px-6 py-3.5 text-right">Committee Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-slate-500">
                    Computing candidate merit rankings...
                  </td>
                </tr>
              ) : (
                candidates.map((c) => (
                  <tr key={c.applicationId} className="hover:bg-[#f1e0c5]/80 transition-colors">
                    <td className="px-6 py-4">
                      <span className="w-7 h-7 rounded-full bg-purple-100 text-purple-900 font-extrabold flex items-center justify-center text-xs">
                        #{c.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-[#71816d]">{c.applicationId}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">{c.applicantName}</td>
                    <td className="px-6 py-4 text-slate-600">{c.state}</td>
                    <td className="px-6 py-4 font-bold text-slate-800">{c.academicScore}%</td>
                    <td className="px-6 py-4 text-slate-600">+{c.incomeWeightage} pts</td>
                    <td className="px-6 py-4 font-extrabold text-purple-900 text-sm">{c.totalScore} / 100</td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                          c.status === 'Selected'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : c.status === 'Waitlisted'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-[#e8d6ba] text-slate-700'
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
