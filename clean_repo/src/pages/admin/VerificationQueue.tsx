import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockApi } from '../../lib/mockApi';
import { Application } from '../../types';
import { StatusBadge } from '../../components/shared/StatusBadge';
import { Clock, Eye, AlertTriangle, ArrowRight } from 'lucide-react';

export const VerificationQueuePage: React.FC = () => {
  const [queue, setQueue] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApi.getApplications().then((apps) => {
      const pending = apps.filter(
        (a) => a.status === 'submitted' || a.status === 'under_verification' || a.status === 'query_raised'
      );
      setQueue(pending);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-[#c9b79c] shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">Verification Officer Desk</span>
          <h1 className="text-2xl font-bold text-slate-900 mt-0.5">Priority OCR Verification Queue</h1>
          <p className="text-xs text-slate-500 mt-1">Applications sorted by AI risk score and submission priority.</p>
        </div>

        <span className="bg-amber-100 text-amber-900 font-extrabold text-xs px-3 py-1.5 rounded-xl border border-amber-300">
          {queue.length} Pending Actions
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-[#c9b79c] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f1e0c5] border-b border-[#c9b79c] text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">App ID</th>
                <th className="px-6 py-3.5">Candidate Name</th>
                <th className="px-6 py-3.5">Scheme</th>
                <th className="px-6 py-3.5">Tribe & State</th>
                <th className="px-6 py-3.5">AI Risk Score</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Review</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {queue.map((app) => (
                <tr key={app.id} className="hover:bg-[#f1e0c5]/80 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-[#71816d]">{app.id}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">{app.applicantName}</td>
                  <td className="px-6 py-4 font-bold text-slate-700">{app.schemeCode}</td>
                  <td className="px-6 py-4 text-slate-600">
                    {app.address?.state || 'Odisha'} ({app.personal?.tribeName || 'Gond'})
                  </td>
                  <td className="px-6 py-4">
                    {app.status === 'query_raised' ? (
                      <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-md">
                        High Risk (Mismatch)
                      </span>
                    ) : (
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md">
                        Low Risk (95%+ Match)
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={app.status} size="sm" />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/admin/applications/${encodeURIComponent(app.id)}/review`}
                      className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-[#71816d] hover:bg-[#8c9c88] text-white font-bold text-xs shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1" />
                      <span>Inspect & Act</span>
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
