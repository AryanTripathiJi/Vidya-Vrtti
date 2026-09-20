import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Role } from '../../types';
import { Lock, Mail, ShieldCheck, UserCheck, Sparkles, Building2, GraduationCap, ArrowRight } from 'lucide-react';
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
    <div className="min-h-screen bg-[#f1e0c5] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-400 text-navy-950 font-black text-2xl flex items-center justify-center mx-auto shadow-md">
          ST
        </div>
        <h2 className="font-serif mt-4 text-2xl font-extrabold text-[#71816d]">Sign In to ST-SETU Portal</h2>
        <p className="mt-1 text-xs text-slate-500">Ministry of Tribal Affairs Single Window Portal</p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl border border-[#c9b79c] sm:rounded-2xl sm:px-10">
          {/* Quick Demo Shortcuts Banner */}
          <div className="mb-6 p-3 rounded-xl bg-amber-50 border border-amber-200">
            <p className="text-[11px] font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-600" />
              Quick Demo Role Credentials
            </p>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              <button
                type="button"
                onClick={() => handleDemoLogin('applicant', 'student@demo.in')}
                className={`px-2 py-1.5 rounded-md border text-left font-medium flex items-center space-x-1.5 transition-colors ${
                  selectedRole === 'applicant' ? 'bg-amber-200/60 border-amber-400 text-amber-950 font-bold' : 'bg-white border-amber-200 text-amber-900 hover:bg-amber-100/50'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span className="truncate">ST Applicant</span>
              </button>
              
              <button
                type="button"
                onClick={() => handleDemoLogin('institute', 'institute@demo.in')}
                className={`px-2 py-1.5 rounded-md border text-left font-medium flex items-center space-x-1.5 transition-colors ${
                  selectedRole === 'institute' ? 'bg-indigo-200/60 border-indigo-400 text-indigo-950 font-bold' : 'bg-white border-amber-200 text-slate-800 hover:bg-[#e8d6ba]'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span className="truncate">Institute Nodal Officer</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('officer', 'officer@demo.in')}
                className={`px-2 py-1.5 rounded-md border text-left font-medium flex items-center space-x-1.5 transition-colors ${
                  selectedRole === 'officer' ? 'bg-teal-200/60 border-teal-400 text-teal-950 font-bold' : 'bg-white border-amber-200 text-slate-800 hover:bg-[#e8d6ba]'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span className="truncate">Verification Officer</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('committee', 'committee@demo.in')}
                className={`px-2 py-1.5 rounded-md border text-left font-medium flex items-center space-x-1.5 transition-colors ${
                  selectedRole === 'committee' ? 'bg-purple-200/60 border-purple-400 text-purple-950 font-bold' : 'bg-white border-amber-200 text-slate-800 hover:bg-[#e8d6ba]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span className="truncate">Selection Committee</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('admin', 'admin@demo.in')}
                className={`col-span-2 px-2 py-1.5 rounded-md border text-left font-medium flex items-center justify-center space-x-1.5 transition-colors ${
                  selectedRole === 'admin' ? 'bg-rose-200/60 border-rose-400 text-rose-950 font-bold' : 'bg-white border-amber-200 text-slate-800 hover:bg-[#e8d6ba]'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span className="truncate">MoTA Admin</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700">Email Address</label>
              <div className="mt-1 relative rounded-md shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-[#c9b79c] focus:border-[#c9b79c]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700">Password</label>
              <div className="mt-1 relative rounded-md shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-[#c9b79c] focus:border-[#c9b79c]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-xl shadow-md text-xs font-bold text-white bg-[#71816d] hover:bg-[#8c9c88] focus:outline-hidden transition-all"
            >
              {loading ? (
                <span>Signing In...</span>
              ) : (
                <span className="flex items-center">
                  <span>Sign In as {selectedRole.toUpperCase()}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </span>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#dfcdb1] text-center">
            <p className="text-xs text-slate-500">
              New ST Student applicant?{' '}
              <Link to="/register" className="font-bold text-orange-600 hover:underline">
                Register New Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
