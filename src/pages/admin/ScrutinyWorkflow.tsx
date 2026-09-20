import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockApi } from '../../lib/mockApi';
import { Application } from '../../types';
import { StatusBadge } from '../../components/shared/StatusBadge';
import { FileSearch, CheckCircle2, ArrowRight } from 'lucide-react';

export const ScrutinyWorkflowPage: React.FC = () => {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApi.getApplications().then((data) => {
      setApps(data.filter((a) => a.status === 'verified' || a.status === 'scrutinized'));
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-[#c9b79c] shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Scrutiny Desk</span>
          <h1 className="text-2xl font-bold text-slate-900 mt-0.5">Academic & Eligibility Scrutiny Workflow</h1>
          <p className="text-xs text-slate-500 mt-1">Verified applications ready for final selection committee scoring.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#c9b79c] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f1e0c5] border-b border-[#c9b79c] text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">App ID</th>
                <th className="px-6 py-3.5">Candidate Name</th>
                <th className="px-6 py-3.5">Scheme</th>
                <th className="px-6 py-3.5">Academic Score</th>
                <th className="px-6 py-3.5">Verified By</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Scrutiny Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {apps.map((app) => (
                <tr key={app.id} className="hover:bg-[#f1e0c5]/80 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-[#71816d]">{app.id}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">{app.applicantName}</td>
                  <td className="px-6 py-4 font-bold text-slate-700">{app.schemeCode}</td>
                  <td className="px-6 py-4 font-extrabold text-emerald-700">{app.academic?.percentageOrCgpa || 80}%</td>
                  <td className="px-6 py-4 text-slate-600">{app.verifiedBy || 'Shri Rajesh Kumar'}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={app.status} size="sm" />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/admin/applications/${encodeURIComponent(app.id)}/review`}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-bold text-xs shadow-xs"
                    >
                      <span>Scrutinize Data</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
