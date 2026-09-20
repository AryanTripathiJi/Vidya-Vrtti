import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockApi } from '../../lib/mockApi';
import { AdminStats, Application } from '../../types';
import { DashboardCard } from '../../components/shared/DashboardCard';
import { StatusBadge } from '../../components/shared/StatusBadge';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Award,
  Sparkles,
  TrendingUp,
  Building2,
  Search,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentApps, setRecentApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    const data = await mockApi.getAdminStats();
    const apps = await mockApi.getApplications();
    setStats(data);
    setRecentApps(apps.slice(0, 6));
    setLoading(false);
  };

  if (loading || !stats) {
    return <div className="p-8 text-center text-xs text-slate-500">Loading MoTA Executive Dashboard...</div>;
  }

  const COLORS = ['#71816d', '#c9b79c', '#2A9D8F', '#6F42A0'];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#c9b79c] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">MoTA Leadership Portal</span>
          <h1 className="text-2xl font-bold text-slate-900 mt-0.5">Executive Scheme Dashboard</h1>
          <p className="text-xs text-slate-500 mt-1">Real-time overview of ST scholarship applications, OCR verification, and disbursements.</p>
        </div>

        <div className="flex space-x-3">
          <Link
            to="/admin/verification"
            className="inline-flex items-center px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-xs"
          >
            <Clock className="w-4 h-4 mr-1.5" />
            <span>Open Verification Queue ({stats.pendingVerification})</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Submissions"
          value={stats.totalApplications}
          change="+14.2%"
          trend="up"
          subtitle="vs last period"
          icon={FileText}
          iconBgColor="bg-blue-50"
          iconTextColor="text-blue-700"
          onClick={() => navigate('/admin/applications')}
        />
        <DashboardCard
          title="Pending OCR Verification"
          value={stats.pendingVerification}
          change="-5%"
          trend="down"
          subtitle="Needs officer review"
          icon={Clock}
          iconBgColor="bg-amber-50"
          iconTextColor="text-amber-700"
          onClick={() => navigate('/admin/verification')}
        />
        <DashboardCard
          title="Merit Selected Candidates"
          value={stats.selected}
          change="+18%"
          trend="up"
          subtitle="Committee approved"
          icon={Award}
          iconBgColor="bg-purple-50"
          iconTextColor="text-purple-700"
          onClick={() => navigate('/admin/selection')}
        />
        <DashboardCard
          title="Disbursed Funds"
          value={`₹${stats.totalFundsDisbursed} Cr`}
          change="+22.4%"
          trend="up"
          subtitle="Aadhaar DBT credit"
          icon={CheckCircle2}
          iconBgColor="bg-emerald-50"
          iconTextColor="text-emerald-700"
          onClick={() => navigate('/admin/reports')}
        />
      </div>

      {/* AI Anomaly Alert Panel */}
      <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-extrabold text-rose-950 text-sm flex items-center">
            <AlertCircle className="w-4 h-4 mr-2 text-rose-600" />
            AI Anomaly Flags ({stats.anomalies.length} Flagged Applications)
          </h3>
          <span className="text-[11px] font-bold text-rose-800">Requires Priority Audit</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {stats.anomalies.map((a) => (
            <div
              key={a.id}
              onClick={() => navigate(`/admin/applications/${encodeURIComponent(a.id)}/review`)}
              className="bg-white p-3.5 rounded-xl border border-rose-200 cursor-pointer hover:shadow-md transition-all space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-[#71816d]">{a.id}</span>
                <span className="bg-rose-100 text-rose-800 text-[10px] font-black px-1.5 py-0.5 rounded-xs uppercase">
                  {a.severity} Severity
                </span>
              </div>
              <p className="text-xs font-bold text-slate-900">{a.applicantName}</p>
              <p className="text-[11px] text-slate-600 leading-tight">{a.reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Submission Trend Line Chart */}
        <div className="bg-white p-6 rounded-2xl border border-[#c9b79c] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Applications Submitted Over Time</h3>
            <span className="text-xs text-slate-400 font-semibold">Last 30 Days</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.applicationsByDate}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#71816d" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Scheme-wise Split Pie Chart */}
        <div className="bg-white p-6 rounded-2xl border border-[#c9b79c] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Scheme-Wise Distribution</h3>
            <span className="text-xs text-slate-400 font-semibold">NFST vs NOS vs TCES</span>
          </div>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={stats.schemeSplit} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {stats.schemeSplit.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. State-Wise Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-[#c9b79c] shadow-xs space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">State-Wise ST Applicant Breakdown</h3>
            <span className="text-xs text-slate-400 font-semibold">Top ST Concentration States</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.stateSplit}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="state" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip />
                <Bar dataKey="count" fill="#c9b79c" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Applications Needing Officer Action */}
      <div className="bg-white rounded-2xl border border-[#c9b79c] shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-[#dfcdb1] flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Applications Requiring Verification</h3>
          <Link to="/admin/applications" className="text-xs font-bold text-[#71816d] hover:underline">
            View All Applications ({stats.totalApplications})
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f1e0c5] border-b border-[#c9b79c] text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3">App ID</th>
                <th className="px-6 py-3">Candidate</th>
                <th className="px-6 py-3">Scheme</th>
                <th className="px-6 py-3">State</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {recentApps.map((app) => (
                <tr key={app.id} className="hover:bg-[#f1e0c5]/80 transition-colors">
                  <td className="px-6 py-3.5 font-mono font-bold text-[#71816d]">{app.id}</td>
                  <td className="px-6 py-3.5 font-bold text-slate-900">{app.applicantName}</td>
                  <td className="px-6 py-3.5 font-semibold text-slate-700">{app.schemeCode}</td>
                  <td className="px-6 py-3.5 text-slate-600">{app.address?.state || 'Odisha'}</td>
                  <td className="px-6 py-3.5">
                    <StatusBadge status={app.status} size="sm" />
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <Link
                      to={`/admin/applications/${encodeURIComponent(app.id)}/review`}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#71816d] text-white hover:bg-[#8c9c88] font-bold text-xs shadow-xs"
                    >
                      <span>Review & OCR</span>
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
