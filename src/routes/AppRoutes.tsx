import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { Footer } from '../components/layout/Footer';

// Public & Auth Pages
import { LandingPage } from '../pages/Landing';
import { LoginPage } from '../pages/auth/Login';
import { RegisterPage } from '../pages/auth/Register';
import { HelpPage } from '../pages/HelpPage';

import { ContactUs } from '../pages/ContactUs';
import { GuidelinesPage } from '../pages/Guidelines';
import { Introduction } from '../pages/Introduction';
import { YearlyReport } from '../pages/YearlyReport';

// Applicant Pages
import { ApplicantDashboard } from '../pages/applicant/Dashboard';
import { BrowseSchemes } from '../pages/applicant/BrowseSchemes';
import { SchemeDetailPage } from '../pages/applicant/SchemeDetail';
import { ApplyFormPage } from '../pages/applicant/ApplyForm';
import { MyApplicationsPage } from '../pages/applicant/MyApplications';
import { ApplicationDetailPage } from '../pages/applicant/ApplicationDetail';
import { ProfilePage } from '../pages/applicant/ProfilePage';

// Admin Pages
import { AdminDashboard } from '../pages/admin/Dashboard';
import { ApplicationsListPage } from '../pages/admin/ApplicationsList';
import { ApplicationReviewPage } from '../pages/admin/ApplicationReview';
import { VerificationQueuePage } from '../pages/admin/VerificationQueue';
import { ScrutinyWorkflowPage } from '../pages/admin/ScrutinyWorkflow';
import { MeritListEnginePage } from '../pages/admin/MeritListEngine';
import { SchemeConfigEnginePage } from '../pages/admin/SchemeConfigEngine';
import { CommunicationsPage } from '../pages/admin/Communications';
import { ReportsPage } from '../pages/admin/Reports';
import { AuditLogPage } from '../pages/admin/AuditLog';
import { Role } from '../types';

// Main Portal App Layout Wrapper with Navbar, Sidebar & Footer
const PortalLayout: React.FC = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen flex flex-col bg-[#f1e0c5]">
      <Navbar />
      <div className="flex flex-1">
        {user && <Sidebar />}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

// Public Layout Wrapper with Navbar & Footer
const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f1e0c5]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

interface ProtectedRouteProps {
  allowedRoles?: Role[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, role } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/guidelines" element={<GuidelinesPage />} />
        <Route path="/reports/:type" element={<YearlyReport />} />
      </Route>

      {/* Applicant Portal Routes */}
      <Route path="/app" element={<ProtectedRoute allowedRoles={['applicant']} />}>
        <Route element={<PortalLayout />}>
          <Route index element={<ApplicantDashboard />} />
          <Route path="schemes" element={<BrowseSchemes />} />
          <Route path="schemes/:schemeId" element={<SchemeDetailPage />} />
          <Route path="apply/:schemeId" element={<ApplyFormPage />} />
          <Route path="applications" element={<MyApplicationsPage />} />
          <Route path="applications/:appId" element={<ApplicationDetailPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Route>

      {/* Admin / Officers Portal Routes */}
      <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin', 'officer', 'institute', 'committee']} />}>
        <Route element={<PortalLayout />}>
          {/* Shared Routes */}
          <Route index element={<AdminDashboard />} />
          <Route path="applications" element={<ApplicationsListPage />} />
          <Route path="applications/:appId/review" element={<ApplicationReviewPage />} />
          <Route path="verification" element={<VerificationQueuePage />} />
          <Route path="scrutiny" element={<ScrutinyWorkflowPage />} />
          <Route path="reports" element={<ReportsPage />} />
          
          {/* Admin Exclusive Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="selection" element={<MeritListEnginePage />} />
            <Route path="schemes/configure" element={<SchemeConfigEnginePage />} />
            <Route path="communications" element={<CommunicationsPage />} />
            <Route path="audit" element={<AuditLogPage />} />
          </Route>
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
