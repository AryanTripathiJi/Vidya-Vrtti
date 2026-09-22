import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { mockApi } from '../../lib/mockApi';
import { Application } from '../../types';
import { DashboardCard } from '../../components/shared/DashboardCard';
import { StatusBadge } from '../../components/shared/StatusBadge';
import {
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Sparkles,
  Download,
  Bell,
  Upload
} from 'lucide-react';

export const ApplicantDashboard: React.FC = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadMyApplications();
  }, [user?.id]);

  const loadMyApplications = async () => {
    setLoading(true);
    const apps = await mockApi.getApplications({ applicantId: user?.id || 'usr-student-1' });
    setApplications(apps);
    setLoading(false);
  };

  const primaryApp = applications[0];
  const hasDeficiency = primaryApp?.status === 'query_raised';

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-[#71816d] to-[#8c9c88] rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ST Student Portal | Welcome back</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">Johar, {user?.name || 'Priya Naik'}!</h1>
          <p className="text-xs text-slate-200 mt-1">
            ST Community: <span className="font-bold text-amber-300">{user?.tribe || 'Gond'}</span> | State: {user?.state || 'Odisha'}
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex space-x-3">
          <Link
            to="/app/schemes"
            className="inline-flex items-center px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-all"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            <span>Apply for New Scheme</span>
          </Link>
        </div>
      </div>

      {/* Urgent Deficiency Alert Banner (if any) */}
      {hasDeficiency && primaryApp && (
        <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-5 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-rose-100 rounded-xl text-rose-700 shrink-0">
              <AlertTriangle className="w-6 h-6 animate-bounce" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-rose-900 uppercase tracking-wider">
                  Action Required: Deficiency Raised
                </span>
                <span className="text-xs text-rose-700 font-bold">App ID: {primaryApp.id}</span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm mt-1">
                Verification officer requested revised documents
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Reason: {primaryApp.deficiency?.reasons.join(', ')}
              </p>
              <div className="mt-3 flex items-center space-x-3">
                <Link
                  to={`/app/applications/${encodeURIComponent(primaryApp.id)}`}
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs"
                >
                  <Upload className="w-3.5 h-3.5 mr-1.5" />
                  <span>Upload Revised Documents & Resubmit</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Active Applications"
          value={applications.length}
          subtitle="Submitted to MoTA"
          icon={FileText}
          iconBgColor="bg-blue-50"
          iconTextColor="text-blue-700"
        />
        <DashboardCard
          title="Under Verification"
          value={applications.filter((a) => a.status === 'submitted' || a.status === 'under_verification').length}
          subtitle="Document OCR scrutiny"
          icon={Clock}
          iconBgColor="bg-amber-50"
          iconTextColor="text-amber-700"
        />
        <DashboardCard
          title="Queries / Deficiencies"
          value={applications.filter((a) => a.status === 'query_raised').length}
          subtitle="Pending candidate action"
          icon={AlertTriangle}
          iconBgColor="bg-rose-50"
          iconTextColor="text-rose-700"
        />
        <DashboardCard
          title="Approved & Selected"
          value={applications.filter((a) => a.status === 'verified' || a.status === 'selected').length}
          subtitle="Fellowship sanction ready"
          icon={CheckCircle2}
          iconBgColor="bg-emerald-50"
          iconTextColor="text-emerald-700"
        />
      </div>

      {/* Application Status Step Timeline */}
      {primaryApp && (
        <div className="bg-white rounded-2xl border border-[#c9b79c] p-6 shadow-xs">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#c9b79c]">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Latest Application Status</span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                {primaryApp.schemeName} ({primaryApp.schemeCode})
              </h3>
              <p className="text-xs text-slate-500">Application ID: {primaryApp.id}</p>
            </div>
            <StatusBadge status={primaryApp.status} size="lg" />
          </div>

          {/* Stepper Visualizer */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {[
              { step: 1, label: 'Submitted', desc: 'Application Received' },
              { step: 2, label: 'Verification', desc: 'Document & OCR Check' },
              { step: 3, label: 'Scrutiny', desc: 'Eligibility Scrutiny' },
              { step: 4, label: 'Merit Selection', desc: 'Committee Scoring' },
              { step: 5, label: 'Disbursement', desc: 'Bank Account Credit' }
            ].map((s) => {
              const isCompleted = primaryApp.currentStage > s.step;
              const isCurrent = primaryApp.currentStage === s.step;
              return (
                <div key={s.step} className="flex flex-col items-center text-center p-3 rounded-xl bg-[#f1e0c5] border border-[#c9b79c]">
                  <div
                    className={`w-9 h-9 rounded-full font-extrabold text-xs flex items-center justify-center mb-2 ${
                      isCompleted
                        ? 'bg-emerald-500 text-white'
                        : isCurrent
                        ? 'bg-[#71816d] text-white ring-4 ring-blue-100'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : s.step}
                  </div>
                  <p className="text-xs font-bold text-slate-900">{s.label}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{s.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex justify-end">
            <Link
              to={`/app/applications/${encodeURIComponent(primaryApp.id)}`}
              className="inline-flex items-center text-xs font-bold text-[#71816d] hover:text-orange-600"
            >
              <span>View Full Application Details & Documents</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
