import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockApi } from '../../lib/mockApi';
import { Application } from '../../types';
import { StatusBadge } from '../../components/shared/StatusBadge';
import { Search, Filter, Download, ArrowRight, RefreshCw, Eye } from 'lucide-react';
import { toast } from 'sonner';

export const ApplicationsListPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [schemeFilter, setSchemeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [stateFilter, setStateFilter] = useState('ALL');

  useEffect(() => {
    loadData();
  }, [schemeFilter, statusFilter, stateFilter, search]);

  const loadData = async () => {
    setLoading(true);
    const data = await mockApi.getApplications({
      schemeCode: schemeFilter,
      status: statusFilter,
      state: stateFilter,
      search
    });
    setApplications(data);
    setLoading(false);
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['App ID,Candidate Name,Scheme,State,Status,Submitted Date']
        .concat(
          applications.map(
            (a) => `${a.id},"${a.applicantName}",${a.schemeCode},${a.address?.state || 'N/A'},${a.status},${a.submittedAt}`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MoTA_Applications_Export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Applications Exported to CSV');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#c9b79c] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">MoTA Administration</span>
          <h1 className="text-2xl font-bold text-slate-900 mt-0.5">All ST Applications Directory</h1>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center px-4 py-2.5 rounded-xl bg-[#71816d] hover:bg-[#8c9c88] text-white font-bold text-xs shadow-xs transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          <span>Export Filtered Table (CSV)</span>
        </button>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-[#c9b79c] shadow-xs grid grid-cols-1 sm:grid-cols-4 gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by ID, Name, Tribe..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs"
          />
        </div>

        {/* Scheme Filter */}
        <select
          value={schemeFilter}
          onChange={(e) => setSchemeFilter(e.target.value)}
          className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-medium"
        >
          <option value="ALL">All Schemes (NFST, NOS, TCES)</option>
          <option value="NFST">NFST (Higher Fellowship)</option>
          <option value="NOS">NOS (Overseas Study)</option>
          <option value="TCES">TCES (Top Class Education)</option>
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-medium"
        >
          <option value="ALL">All Statuses</option>
          <option value="submitted">Submitted</option>
          <option value="under_verification">Under Verification</option>
          <option value="query_raised">Deficiency Raised</option>
          <option value="verified">Verified</option>
          <option value="selected">Merit Selected</option>
          <option value="rejected">Rejected</option>
        </select>

        {/* State Filter */}
        <select
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value)}
          className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-medium"
        >
          <option value="ALL">All States</option>
          <option value="Odisha">Odisha</option>
          <option value="Jharkhand">Jharkhand</option>
          <option value="Chhattisgarh">Chhattisgarh</option>
          <option value="Madhya Pradesh">Madhya Pradesh</option>
          <option value="Assam">Assam</option>
        </select>
      </div>

      {/* Main Applications Table */}
      <div className="bg-white rounded-2xl border border-[#c9b79c] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f1e0c5] border-b border-[#c9b79c] text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Application ID</th>
                <th className="px-6 py-3.5">Candidate Name</th>
                <th className="px-6 py-3.5">Scheme</th>
                <th className="px-6 py-3.5">State & Tribe</th>
                <th className="px-6 py-3.5">Current Status</th>
                <th className="px-6 py-3.5 text-right">Review Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    Loading applications directory...
                  </td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    No applications match the current filter criteria.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-[#f1e0c5]/80 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-[#71816d]">{app.id}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">{app.applicantName}</td>
                    <td className="px-6 py-4 font-bold text-slate-700">{app.schemeCode}</td>
                    <td className="px-6 py-4 text-slate-600">
                      {app.address?.state || 'Odisha'} ({app.personal?.tribeName || 'Gond'})
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={app.status} size="sm" />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/admin/applications/${encodeURIComponent(app.id)}/review`}
                        className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#71816d] hover:bg-[#8c9c88] text-white font-bold text-xs shadow-xs"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        <span>Inspect OCR</span>
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
