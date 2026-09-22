import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AdminStats, Application } from '../../types';
import { StatusBadge } from '../../components/shared/StatusBadge';
import {
  FileText, Clock, CheckCircle2, AlertTriangle, Award, Sparkles, TrendingUp, Building2, Search, ArrowRight, ShieldCheck, AlertCircle, Plus, Download, Mail, Activity, MoreVertical, XCircle, FileClock
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend, AreaChart, Area, ComposedChart
} from 'recharts';

const COLORS = ['#71816d', '#c9b79c', '#2A9D8F', '#6F42A0', '#E76F51'];

// 1. Global Filters & Quick Actions
export const GlobalFiltersAndActions = () => {
  return (
    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-2">
      <div className="flex flex-wrap items-center gap-2">
        <select className="bg-white border border-[#c9b79c] text-xs font-bold text-slate-700 px-3 py-2 rounded-lg shadow-xs focus:outline-none focus:border-amber-500">
          <option>Date: This FY (2025-26)</option>
          <option>Today</option>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
        <select className="bg-white border border-[#c9b79c] text-xs font-bold text-slate-700 px-3 py-2 rounded-lg shadow-xs focus:outline-none focus:border-amber-500">
          <option>Scheme: All Schemes</option>
          <option>NFST</option>
          <option>NOS</option>
          <option>TCES</option>
        </select>
        <select className="bg-white border border-[#c9b79c] text-xs font-bold text-slate-700 px-3 py-2 rounded-lg shadow-xs focus:outline-none focus:border-amber-500">
          <option>State: All India</option>
          <option>Odisha</option>
          <option>Jharkhand</option>
        </select>
        <select className="bg-white border border-[#c9b79c] text-xs font-bold text-slate-700 px-3 py-2 rounded-lg shadow-xs focus:outline-none focus:border-amber-500">
          <option>Status: All</option>
          <option>Pending Verification</option>
          <option>Verified</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <button className="flex items-center px-3 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition-colors">
          <Plus className="w-4 h-4 mr-1" /> New Scheme
        </button>
        <button className="flex items-center px-3 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition-colors">
          <Download className="w-4 h-4 mr-1" /> Export Data
        </button>
        <button className="flex items-center px-3 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition-colors">
          <Mail className="w-4 h-4 mr-1" /> Bulk Comm
        </button>
        <button className="flex items-center px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition-colors shadow-xs">
          <Activity className="w-4 h-4 mr-1" /> Audit Log
        </button>
      </div>
    </div>
  );
};

// 3. Alerts Panel
export const AlertsPanel = ({ anomalies }: { anomalies: AdminStats['anomalies'] }) => {
  const navigate = useNavigate();
  if (!anomalies || anomalies.length === 0) return null;
  return (
    <div className="bg-rose-50 border-l-4 border-rose-500 rounded-r-xl p-4 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-extrabold text-rose-950 text-sm flex items-center">
          <AlertTriangle className="w-4 h-4 mr-2 text-rose-600 animate-pulse" />
          AI & System Flags ({anomalies.length} Priority Alerts)
        </h3>
        <button className="text-xs font-bold text-rose-600 hover:underline">Dismiss All</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {anomalies.map((a, i) => (
          <div key={i} onClick={() => navigate(`/admin/applications/${encodeURIComponent(a.id)}/review`)} className="bg-white p-3 rounded-lg border border-rose-200 cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-1 h-full ${a.severity === 'High' ? 'bg-rose-500' : 'bg-orange-400'}`}></div>
            <div className="pl-3">
              <div className="flex justify-between items-start">
                <span className="font-bold text-xs text-slate-900">{a.id}</span>
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-xs uppercase ${a.severity === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-orange-100 text-orange-700'}`}>{a.severity}</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-tight mt-1">{a.reason}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 4. Action Queue
export const ActionQueue = ({ recentApps }: { recentApps: Application[] }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl border border-[#c9b79c] shadow-xs overflow-hidden">
      <div className="px-5 py-4 border-b border-[#c9b79c] flex items-center justify-between bg-gradient-to-r from-[#f1e0c5]/30 to-white">
        <div className="flex items-center space-x-2">
          <FileClock className="w-5 h-5 text-amber-600" />
          <h3 className="font-extrabold text-slate-900 text-sm">Action Queue</h3>
          <span className="bg-rose-100 text-rose-700 text-[10px] font-black px-2 py-0.5 rounded-full">Oldest First</span>
        </div>
        <Link to="/admin/verification" className="text-xs font-bold text-amber-700 hover:underline">Open Full Queue →</Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#f9f5f0] border-b border-[#c9b79c] text-slate-500 font-bold uppercase tracking-wider">
            <tr>
              <th className="px-5 py-3">App ID</th>
              <th className="px-5 py-3">Applicant & Scheme</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">SLA Alert</th>
              <th className="px-5 py-3 text-right">Quick Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {recentApps.slice(0, 5).map((app, idx) => (
              <tr key={app.id} className="hover:bg-[#f1e0c5]/40 transition-colors group">
                <td className="px-5 py-3 font-mono font-bold text-[#71816d]">{app.id}</td>
                <td className="px-5 py-3">
                  <div className="font-bold text-slate-900">{app.applicantName}</div>
                  <div className="text-[10px] text-slate-500">{app.schemeCode} • {app.address?.state || 'Odisha'}</div>
                </td>
                <td className="px-5 py-3"><StatusBadge status={app.status} size="sm" /></td>
                <td className="px-5 py-3">
                  {idx === 0 ? <span className="text-rose-600 font-bold text-[10px] flex items-center"><AlertTriangle className="w-3 h-3 mr-1"/> Breached (15 Days)</span> 
                  : idx === 1 ? <span className="text-amber-600 font-bold text-[10px] flex items-center"><Clock className="w-3 h-3 mr-1"/> Due Today</span>
                  : <span className="text-slate-400 font-bold text-[10px]">Within SLA</span>}
                </td>
                <td className="px-5 py-3 text-right flex items-center justify-end space-x-2">
                  <button className="text-[10px] font-bold bg-emerald-100 text-emerald-700 hover:bg-emerald-200 px-2 py-1 rounded transition-colors">Approve</button>
                  <button className="text-[10px] font-bold bg-amber-100 text-amber-700 hover:bg-amber-200 px-2 py-1 rounded transition-colors">Query</button>
                  <button onClick={() => navigate(`/admin/applications/${encodeURIComponent(app.id)}/review`)} className="p-1 text-slate-400 hover:text-slate-800 bg-slate-50 rounded hover:bg-slate-200"><ArrowRight className="w-4 h-4"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 5. Charts Grid (5 Essential Charts)
export const ChartsGrid = ({ stats }: { stats: AdminStats }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Chart 1: Applications Over Time */}
      <div className="bg-white p-5 rounded-2xl border border-[#c9b79c] shadow-xs xl:col-span-2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-900 text-sm">Applications Over Time</h3>
        </div>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.applicationsByDate}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#71816d" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#71816d" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
              <RechartsTooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
              <Area type="monotone" dataKey="count" stroke="#71816d" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Scheme Split */}
      <div className="bg-white p-5 rounded-2xl border border-[#c9b79c] shadow-xs">
        <h3 className="font-bold text-slate-900 text-sm mb-2">Scheme-wise Split</h3>
        <div className="h-60 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={stats.schemeSplit} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {stats.schemeSplit.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 3: Workflow Funnel */}
      <div className="bg-white p-5 rounded-2xl border border-[#c9b79c] shadow-xs">
        <h3 className="font-bold text-slate-900 text-sm mb-4">Workflow Funnel</h3>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.funnelData || []} layout="vertical" barSize={20}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
              <XAxis type="number" hide />
              <YAxis dataKey="stage" type="category" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} width={120} />
              <RechartsTooltip cursor={{fill: '#f8fafc'}} />
              <Bar dataKey="count" fill="#2A9D8F" radius={[0, 4, 4, 0]}>
                {(stats.funnelData || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 4: State-Wise Distribution */}
      <div className="bg-white p-5 rounded-2xl border border-[#c9b79c] shadow-xs">
        <h3 className="font-bold text-slate-900 text-sm mb-4">State-Wise Distribution</h3>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.stateSplit || []}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="state" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
              <RechartsTooltip />
              <Bar dataKey="count" fill="#6F42A0" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 5: Deficiency Reasons */}
      <div className="bg-white p-5 rounded-2xl border border-[#c9b79c] shadow-xs">
        <h3 className="font-bold text-slate-900 text-sm mb-4">Top Deficiency Reasons</h3>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.deficiencyBreakdown || []} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
              <XAxis type="number" hide />
              <YAxis dataKey="reason" type="category" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} width={120} />
              <RechartsTooltip />
              <Bar dataKey="count" fill="#E76F51" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// 6. Disbursement Tracker
export const DisbursementTracker = ({ disbursements }: { disbursements: AdminStats['disbursements'] }) => {
  if (!disbursements) return null;
  return (
    <div className="bg-gradient-to-br from-emerald-900 to-[#4e5a4b] text-white rounded-2xl shadow-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
      <div className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-2" />
            <h3 className="font-extrabold text-sm tracking-widest text-emerald-100 uppercase">FY 25-26 Disbursement</h3>
          </div>
          <button className="text-xs font-bold bg-white text-emerald-900 px-3 py-1.5 rounded hover:bg-emerald-50 transition-colors shadow-sm">
            View Sheet →
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <div className="col-span-1">
            <p className="text-[10px] text-emerald-200 font-bold uppercase tracking-wider mb-1">Total Disbursed</p>
            <div className="text-4xl font-black tracking-tighter mb-2">₹{disbursements.total}</div>
            <p className="text-xs font-medium text-emerald-300 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" /> +12% vs last FY
            </p>
          </div>
          
          <div className="col-span-1 border-l border-emerald-700/50 pl-6 space-y-3">
            {disbursements.schemeSplit.map((s, i) => (
              <div key={i} className="flex justify-between items-center text-sm font-bold">
                <span className="text-emerald-100">{s.scheme}</span>
                <span>₹{s.amount}</span>
              </div>
            ))}
          </div>

          <div className="col-span-2 h-24 mt-4 md:mt-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={disbursements.monthlyTrend}>
                <Area type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={3} fill="#10b981" fillOpacity={0.2} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#064e3b', border: 'none', color: '#fff', fontSize: '12px' }} itemStyle={{ color: '#fff' }}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// 7. Scheme Performance Table
export const SchemePerformanceTable = ({ performance }: { performance: AdminStats['schemePerformance'] }) => {
  if (!performance) return null;
  return (
    <div className="bg-white rounded-2xl border border-[#c9b79c] shadow-xs overflow-hidden">
      <div className="px-5 py-4 border-b border-[#c9b79c]">
        <h3 className="font-extrabold text-slate-900 text-sm">Scheme Performance Comparison</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#f9f5f0] border-b border-[#c9b79c] text-slate-500 font-bold uppercase tracking-wider">
            <tr>
              <th className="px-5 py-3">Scheme</th>
              <th className="px-5 py-3 text-right">Apps</th>
              <th className="px-5 py-3 text-right">Pending</th>
              <th className="px-5 py-3 text-right">Verified</th>
              <th className="px-5 py-3 text-right">Selected</th>
              <th className="px-5 py-3 text-right">Disbursed (₹)</th>
              <th className="px-5 py-3 text-right">Avg Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {performance.map((s, idx) => (
              <tr key={idx} className="hover:bg-[#f1e0c5]/40 transition-colors">
                <td className="px-5 py-3 font-bold text-slate-900">{s.scheme}</td>
                <td className="px-5 py-3 text-right">{s.applications.toLocaleString()}</td>
                <td className="px-5 py-3 text-right text-amber-600 font-bold">{s.pending}</td>
                <td className="px-5 py-3 text-right">{s.verified.toLocaleString()}</td>
                <td className="px-5 py-3 text-right">{s.selected.toLocaleString()}</td>
                <td className="px-5 py-3 text-right text-emerald-700 font-bold">₹{s.disbursedAmount}</td>
                <td className="px-5 py-3 text-right">{s.avgProcessingTimeDays} days</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 8. Top/Bottom Performers & 9. Activity Feed
export const PerformersAndFeed = ({ top, feed }: { top: AdminStats['topPerformers'], feed: AdminStats['activityFeed'] }) => {
  if (!top || !feed) return null;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Top States & Institutes */}
      <div className="bg-white rounded-2xl border border-[#c9b79c] shadow-xs p-5 lg:col-span-1">
        <h3 className="font-extrabold text-slate-900 text-sm mb-4">Top Performing States</h3>
        <div className="space-y-3 mb-6">
          {top.states.slice(0,5).map((s, i) => (
            <div key={i} className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">{i+1}. {s.name}</span>
              <span className="font-mono text-slate-500 bg-slate-100 px-2 rounded">{s.count}</span>
            </div>
          ))}
        </div>
        
        <h3 className="font-extrabold text-slate-900 text-sm mb-4">Bottom Officers (Attention)</h3>
        <div className="space-y-3">
          {top.bottomOfficers.slice(0,4).map((o, i) => (
            <div key={i} className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">{o.name}</span>
              <span className="text-rose-600 font-bold text-[10px]">{o.reason}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-white rounded-2xl border border-[#c9b79c] shadow-xs p-5 lg:col-span-2 flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-extrabold text-slate-900 text-sm">Live Activity Pulse</h3>
          <span className="flex items-center text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping mr-1.5"></span> Live
          </span>
        </div>
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {feed.map((act) => (
            <div key={act.id} className="flex space-x-3 items-start relative">
              <div className="absolute top-6 left-3 w-0.5 h-full bg-slate-100 -z-10"></div>
              <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] shadow-sm z-10
                ${act.type === 'approval' ? 'bg-emerald-100 text-emerald-600' : 
                  act.type === 'deficiency' ? 'bg-amber-100 text-amber-600' :
                  act.type === 'disbursement' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}
              >
                {act.type === 'approval' ? <CheckCircle2 className="w-3.5 h-3.5"/> : 
                 act.type === 'deficiency' ? <AlertTriangle className="w-3.5 h-3.5"/> : 
                 act.type === 'disbursement' ? <Building2 className="w-3.5 h-3.5"/> : <FileText className="w-3.5 h-3.5"/>}
              </div>
              <div>
                <p className="text-xs text-slate-800 font-medium leading-relaxed">{act.message}</p>
                <p className="text-[10px] text-slate-400 font-bold mt-0.5">{act.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
