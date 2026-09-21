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
        <div className="w-16 h-16 bg-[#ff6b6b] border-4 border-black shadow-[4px_4px_0_0_#000] flex items-center justify-center mx-auto mb-6 transform -rotate-3 hover:rotate-0 transition-transform">
          <span className="font-black text-3xl text-black">ST</span>
        </div>
        <h2 className="font-sans text-4xl font-black text-black uppercase tracking-tighter">Sign In</h2>
        <p className="mt-2 text-sm font-bold text-black border-b-2 border-black inline-block pb-1">ST-SETU Portal</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 border-4 border-black shadow-[8px_8px_0_0_#000] sm:px-10 relative">
          
          {/* Quick Demo Shortcuts Banner */}
          <div className="mb-8 p-4 bg-[#ffd93d] border-4 border-black shadow-[4px_4px_0_0_#000]">
            <p className="text-sm font-black text-black uppercase tracking-wider mb-3 flex items-center">
              <Sparkles className="w-5 h-5 mr-2" />
              Demo Roles
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleDemoLogin('applicant', 'student@demo.in')}
                className={`px-3 py-2 border-2 border-black font-black text-xs uppercase flex items-center space-x-2 transition-all ${
                  selectedRole === 'applicant' ? 'bg-[#ff6b6b] text-white shadow-[2px_2px_0_0_#000] translate-x-[-2px] translate-y-[-2px]' : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                <GraduationCap className="w-4 h-4 shrink-0" />
                <span className="truncate">Applicant</span>
              </button>
              
              <button
                type="button"
                onClick={() => handleDemoLogin('institute', 'institute@demo.in')}
                className={`px-3 py-2 border-2 border-black font-black text-xs uppercase flex items-center space-x-2 transition-all ${
                  selectedRole === 'institute' ? 'bg-[#4facfe] text-white shadow-[2px_2px_0_0_#000] translate-x-[-2px] translate-y-[-2px]' : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                <Building2 className="w-4 h-4 shrink-0" />
                <span className="truncate">Institute</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('officer', 'officer@demo.in')}
                className={`px-3 py-2 border-2 border-black font-black text-xs uppercase flex items-center space-x-2 transition-all ${
                  selectedRole === 'officer' ? 'bg-[#4facfe] text-white shadow-[2px_2px_0_0_#000] translate-x-[-2px] translate-y-[-2px]' : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                <UserCheck className="w-4 h-4 shrink-0" />
                <span className="truncate">Officer</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('committee', 'committee@demo.in')}
                className={`px-3 py-2 border-2 border-black font-black text-xs uppercase flex items-center space-x-2 transition-all ${
                  selectedRole === 'committee' ? 'bg-[#4facfe] text-white shadow-[2px_2px_0_0_#000] translate-x-[-2px] translate-y-[-2px]' : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                <span className="truncate">Committee</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('admin', 'admin@demo.in')}
                className={`col-span-2 px-3 py-2 border-2 border-black font-black text-xs uppercase flex items-center justify-center space-x-2 transition-all ${
                  selectedRole === 'admin' ? 'bg-[#ff6b6b] text-white shadow-[2px_2px_0_0_#000] translate-x-[-2px] translate-y-[-2px]' : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                <Building2 className="w-4 h-4 shrink-0" />
                <span className="truncate">MoTA Admin</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-black uppercase text-black mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-black" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border-4 border-black text-sm font-bold bg-[#f8f9fa] focus:bg-white focus:outline-hidden transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-black uppercase text-black mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-black" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border-4 border-black text-sm font-bold bg-[#f8f9fa] focus:bg-white focus:outline-hidden transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-4 px-4 border-4 border-black bg-[#6c5ce7] hover:bg-[#a29bfe] text-white font-black uppercase tracking-widest shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
            >
              {loading ? (
                <span>Loading...</span>
              ) : (
                <span className="flex items-center">
                  <span>Sign In As {selectedRole}</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </span>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t-4 border-black text-center">
            <p className="text-sm font-bold text-black">
              New Applicant?{' '}
              <Link to="/register" className="text-[#ff6b6b] hover:text-black hover:bg-[#ff6b6b] px-2 py-1 transition-colors">
                REGISTER NOW
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
