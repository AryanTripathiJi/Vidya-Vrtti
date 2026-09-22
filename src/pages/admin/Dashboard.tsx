import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockApi } from '../../lib/mockApi';
import { AdminStats, Application } from '../../types';
import { DashboardCard } from '../../components/shared/DashboardCard';
import { FileText, Clock, AlertTriangle, CheckCircle2, Award } from 'lucide-react';
import { 
  GlobalFiltersAndActions, 
  AlertsPanel, 
  ActionQueue, 
  ChartsGrid, 
  DisbursementTracker, 
  SchemePerformanceTable, 
  PerformersAndFeed 
} from './DashboardComponents';

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
    setRecentApps(apps.filter(a => a.status === 'submitted' || a.status === 'under_verification').slice(0, 10));
    setLoading(false);
  };

  if (loading || !stats) {
    return <div className="p-8 text-center text-xs text-slate-500">Loading MoTA Executive Dashboard...</div>;
  }

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Global Filters & Quick Actions Bar (Top) */}
      <GlobalFiltersAndActions />

      {/* Top Header Label */}
      <div className="flex justify-between items-end mb-2">
        <div>
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">MoTA Leadership Portal</span>
          <h1 className="text-2xl font-bold text-slate-900 mt-0.5">Executive Scheme Dashboard</h1>
        </div>
      </div>

      {/* 2. KPI Cards Row (The Non-Negotiables) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <DashboardCard
          title="Total Applications"
          value={stats.totalApplications}
          change="+14.2%" trend="up" subtitle="vs last period"
          icon={FileText} iconBgColor="bg-blue-50" iconTextColor="text-blue-700"
          onClick={() => navigate('/admin/applications')}
        />
        <DashboardCard
          title="Pending Verification"
          value={stats.pendingVerification}
          change="-5%" trend="down" subtitle="Needs officer review"
          icon={Clock} iconBgColor="bg-amber-50" iconTextColor="text-amber-700"
          onClick={() => navigate('/admin/verification')}
        />
        <DashboardCard
          title="Query / Deficient"
          value={stats.deficient}
          change="+2%" trend="up" subtitle="Waiting on applicant"
          icon={AlertTriangle} iconBgColor="bg-rose-50" iconTextColor="text-rose-700"
          onClick={() => navigate('/admin/applications')}
        />
        <DashboardCard
          title="Verified"
          value={stats.verified}
          change="+18%" trend="up" subtitle="Ready for scrutiny"
          icon={CheckCircle2} iconBgColor="bg-emerald-50" iconTextColor="text-emerald-700"
          onClick={() => navigate('/admin/applications')}
        />
        <DashboardCard
          title="Selected / Disbursed"
          value={stats.selected + stats.disbursed}
          change="+12%" trend="up" subtitle="Outcome metric"
          icon={Award} iconBgColor="bg-purple-50" iconTextColor="text-purple-700"
          onClick={() => navigate('/admin/selection')}
        />
      </div>

      {/* 3. Alerts Panel (AI + System Flags) */}
      <AlertsPanel anomalies={stats.anomalies} />

      {/* 4. Action Queue (What Needs Attention Now) */}
      <ActionQueue recentApps={recentApps} />

      {/* 5. Charts Grid (5 Essential Charts) */}
      <ChartsGrid stats={stats} />

      {/* 6. Disbursement Tracker (Money Matters) */}
      <DisbursementTracker disbursements={stats.disbursements} />

      {/* 7. Scheme Performance Table (Comparative View) */}
      <SchemePerformanceTable performance={stats.schemePerformance} />

      {/* 8. Top/Bottom Performers & 9. Recent Activity Feed */}
      <PerformersAndFeed top={stats.topPerformers} feed={stats.activityFeed} />

    </div>
  );
};
