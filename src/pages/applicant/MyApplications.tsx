import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { mockApi } from '../../lib/mockApi';
import { Application } from '../../types';
import { StatusBadge } from '../../components/shared/StatusBadge';
import { FileText, ArrowRight, Clock, AlertTriangle } from 'lucide-react';

export const MyApplicationsPage: React.FC = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApi.getApplications({ applicantId: user?.id || 'usr-student-1' }).then((data) => {
      setApplications(data);
      setLoading(false);
    });
  }, [user?.id]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-[#c9b79c] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Candidate Portal</span>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">My Submitted Applications</h1>
        </div>

        <Link
          to="/app/schemes"
          className="inline-flex items-center px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-xs"
        >
          <span>Apply for Another Scheme</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-[#c9b79c] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f1e0c5] border-b border-[#c9b79c] text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Application ID</th>
                <th className="px-6 py-3.5">Scheme</th>
                <th className="px-6 py-3.5">Submission Date</th>
                <th className="px-6 py-3.5">Current Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No applications submitted yet.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-[#f1e0c5]/80 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-[#71816d]">{app.id}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">{app.schemeName} ({app.schemeCode})</td>
                    <td className="px-6 py-4 text-slate-600">
                      {new Date(app.submittedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/app/applications/${encodeURIComponent(app.id)}`}
                        className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#e8d6ba] hover:bg-slate-200 text-slate-900 font-bold text-xs transition-colors"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Link>
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
