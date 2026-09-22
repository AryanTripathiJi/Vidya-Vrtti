import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Role } from '../../types';
import { Lock, Mail, ShieldCheck, UserCheck, Sparkles, Building2, GraduationCap, ArrowRight, User } from 'lucide-react';
import { toast } from 'sonner';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('student@demo.in');
  const [password, setPassword] = useState('demo123');
  const [selectedRole, setSelectedRole] = useState<Role>('applicant');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, selectedRole);
      toast.success(`Logged in as ${selectedRole.toUpperCase()}`);
      if (selectedRole === 'applicant') {
        navigate('/app');
      } else {
        navigate('/admin');
      }
    } catch (err) {
      toast.error('Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (role: Role, demoEmail: string) => {
    setSelectedRole(role);
    setEmail(demoEmail);
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="w-14 h-14 bg-gradient-to-tr from-slate-800 to-slate-900 rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-8">
          <span className="font-serif font-bold text-2xl text-white">ST</span>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back</h2>
        <p className="mt-2 text-sm text-slate-500 font-medium">Sign in to the Vidya-Vrtti Portal</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[440px]">
        <div className="bg-white py-10 px-6 shadow-2xl shadow-slate-200/50 rounded-3xl sm:px-12 border border-slate-100">
          
          {/* Quick Demo Shortcuts Banner */}
          <div className="mb-8 p-5 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4 flex items-center justify-center">
              <Sparkles className="w-4 h-4 mr-1.5 text-slate-400" />
              Demo Accounts
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleDemoLogin('applicant', 'student@demo.in')}
                className={`px-3 py-2.5 rounded-xl text-xs font-medium flex items-center space-x-2 transition-all duration-200 ${
                  selectedRole === 'applicant' ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <GraduationCap className="w-4 h-4 shrink-0" />
                <span className="truncate">Student (Applicant)</span>
              </button>
              
              <button
                type="button"
                onClick={() => handleDemoLogin('institute', 'institute@demo.in')}
                className={`px-3 py-2.5 rounded-xl text-xs font-medium flex items-center space-x-2 transition-all duration-200 ${
                  selectedRole === 'institute' ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <Building2 className="w-4 h-4 shrink-0" />
                <span className="truncate">Institute</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('officer', 'officer@demo.in')}
                className={`px-3 py-2.5 rounded-xl text-xs font-medium flex items-center space-x-2 transition-all duration-200 ${
                  selectedRole === 'officer' ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <UserCheck className="w-4 h-4 shrink-0" />
                <span className="truncate">Nodal Officer</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('admin', 'admin@demo.in')}
                className={`px-3 py-2.5 rounded-xl text-xs font-medium flex items-center space-x-2 transition-all duration-200 ${
                  selectedRole === 'admin' ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span className="truncate">MoTA Administrator</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address or Vidya-Vrtti ID</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. ST-A1B2C3 or user@domain.com"
                  className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-shadow outline-hidden text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-shadow outline-hidden text-slate-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3.5 px-4 mt-2 rounded-xl text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? (
                <span className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center">
                  <span>Sign in as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}</span>
                  <ArrowRight className="w-4 h-4 ml-2 opacity-70" />
                </span>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-slate-900 hover:text-slate-700 hover:underline transition-colors">
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
