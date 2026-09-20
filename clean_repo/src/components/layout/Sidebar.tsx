import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  UserCheck,
  FileSearch,
  Award,
  Sliders,
  MessageSquare,
  BarChart3,
  History,
  HelpCircle,
  User,
  LucideIcon
} from 'lucide-react';

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
  badge?: string;
}

export const Sidebar: React.FC = () => {
  const { role } = useAuth();
  const isApplicant = role === 'applicant';

  const applicantLinks: NavItem[] = [
    { to: '/app', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { to: '/app/schemes', label: 'Browse Schemes', icon: BookOpen },
    { to: '/app/applications', label: 'My Applications', icon: FileText },
    { to: '/app/profile', label: 'My Profile', icon: User },
    { to: '/help', label: 'Help & FAQs', icon: HelpCircle }
  ];

  const adminLinks: NavItem[] = [
    { to: '/admin', label: 'Executive Dashboard', icon: LayoutDashboard, exact: true },
    { to: '/admin/applications', label: 'All Applications', icon: FileText },
    { to: '/admin/verification', label: 'Verification Queue', icon: UserCheck, badge: 'AI-OCR' },
    { to: '/admin/scrutiny', label: 'Scrutiny Workflow', icon: FileSearch },
    { to: '/admin/selection', label: 'Merit List Engine', icon: Award },
    { to: '/admin/schemes/configure', label: 'Scheme Config Engine', icon: Sliders },
    { to: '/admin/communications', label: 'Communications', icon: MessageSquare },
    { to: '/admin/reports', label: 'Reports & Analytics', icon: BarChart3 },
    { to: '/admin/audit', label: 'System Audit Log', icon: History }
  ];

  const instituteLinks: NavItem[] = [
    { to: '/admin', label: 'Institute Dashboard', icon: LayoutDashboard, exact: true },
    { to: '/admin/applications', label: 'Student Applications', icon: FileText },
    { to: '/admin/verification', label: 'Institute Level Verification', icon: UserCheck, badge: 'AI-OCR' },
    { to: '/admin/reports', label: 'Reports & Analytics', icon: BarChart3 }
  ];

  const links = isApplicant ? applicantLinks : (role === 'institute' ? instituteLinks : adminLinks);

  return (
    <aside className="w-64 bg-white border-r border-[#c9b79c] min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between shrink-0">
      <div>
        <div className="px-3 py-2 mb-4 bg-[#f1e0c5] rounded-lg border border-[#dfcdb1]">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {isApplicant ? 'ST Student Workspace' : (role === 'institute' ? 'Institute Workspace' : 'MoTA Administration Hub')}
          </p>
          <p className="text-xs font-bold text-slate-800 mt-0.5">
            {isApplicant ? 'Scholarship Portal' : (role === 'institute' ? 'Institute Nodal Portal' : 'Unified Officers Portal')}
          </p>
        </div>

        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.exact}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#71816d] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-[#e8d6ba] hover:text-slate-900'
                  }`
                }
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="bg-orange-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-xs uppercase">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="mt-8 p-3 rounded-lg bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-900">
        <p className="font-bold flex items-center">
          <span className="w-2 h-2 rounded-full bg-amber-500 mr-1.5 animate-pulse"></span>
          Direct Benefit Transfer (DBT)
        </p>
        <p className="text-[10px] text-amber-700 mt-1 leading-snug">
          Integrated with Aadhaar PFMS Payment Gateway for direct student disbursement.
        </p>
      </div>
    </aside>
  );
};
