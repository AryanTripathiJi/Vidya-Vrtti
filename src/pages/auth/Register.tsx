import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const generateCaptcha = () => Math.random().toString(36).substring(2, 6).toUpperCase();

export const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [captchaText, setCaptchaText] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRefreshCaptcha = () => {
    setCaptchaText(generateCaptcha());
    setCaptchaInput('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (captchaInput !== captchaText) {
      toast.error('Invalid Captcha code! Please try again.');
      handleRefreshCaptcha();
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    setLoading(true);
    try {
      const newUser = await register({ 
        name: data.fullName as string, 
        email: data.email as string, 
        role: data.role as any,
        phone: data.mobile as string,
        state: data.state as string
      });
      toast.success(`Registered Successfully! Your Login ID is ${newUser.loginId}`, { duration: 10000 });
      
      if (data.role === 'student' || data.role === 'applicant') {
        navigate('/app');
      } else {
        navigate('/admin');
      }
    } catch (err) {
      toast.error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDigitInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '');
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] flex justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-3xl bg-white shadow-2xl shadow-slate-200/50 rounded-3xl p-8 md:p-12 border border-slate-100">
        
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-gradient-to-tr from-slate-800 to-slate-900 rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-6">
            <span className="font-serif font-bold text-2xl text-white">ST</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Create an account</h2>
          <p className="mt-2 text-sm text-slate-500 font-medium">Join the Vidya-Vrtti Platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-sm">
          
          {/* User Type */}
          <div className="flex flex-col md:flex-row md:items-center">
            <label className="md:w-1/3 mb-1.5 md:mb-0 font-medium text-slate-700">User Type <span className="text-rose-500">*</span></label>
            <div className="md:w-2/3">
              <select name="role" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-hidden transition-all text-slate-900">
                <option value="">-- Select Role --</option>
                <option value="applicant">Student (Applicant)</option>
                <option value="institute">Institute Nodal Officer</option>
                <option value="officer">State Nodal Officer</option>
                <option value="admin">MoTA Administrator</option>
              </select>
            </div>
          </div>

          {/* Full Name */}
          <div className="flex flex-col md:flex-row md:items-center pt-2">
            <label className="md:w-1/3 mb-1.5 md:mb-0 font-medium text-slate-700">Full Name <span className="text-rose-500">*</span></label>
            <div className="md:w-2/3">
              <input type="text" name="fullName" required placeholder="Enter full name" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-hidden transition-all text-slate-900" />
            </div>
          </div>

          {/* State Name */}
          <div className="flex flex-col md:flex-row md:items-center pt-2">
            <label className="md:w-1/3 mb-1.5 md:mb-0 font-medium text-slate-700">State Name <span className="text-rose-500">*</span></label>
            <div className="md:w-2/3">
              <select name="state" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-hidden transition-all text-slate-900">
                <option value="">-- Select State --</option>
                {INDIAN_STATES.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Designation */}
          <div className="flex flex-col md:flex-row md:items-center pt-2">
            <label className="md:w-1/3 mb-1.5 md:mb-0 font-medium text-slate-700">Designation <span className="text-rose-500">*</span></label>
            <div className="md:w-2/3">
              <select name="designation" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-hidden transition-all text-slate-900">
                <option value="">-- Select Designation --</option>
                <option value="student">Student</option>
                <option value="clerk_principal">Clerk/Principal</option>
                <option value="nodal_officer">Nodal Officer</option>
                <option value="mota_admin">MoTA Administration</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
            {/* Mobile Number */}
            <div>
              <label className="block mb-1.5 font-medium text-slate-700">Mobile Number <span className="text-rose-500">*</span></label>
              <input type="tel" name="mobile" required onInput={handleDigitInput} placeholder="10 digit mobile" maxLength={10} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-hidden transition-all text-slate-900" />
            </div>

            {/* Alternate Mobile */}
            <div>
              <label className="block mb-1.5 font-medium text-slate-700">Alternate Mobile <span className="text-slate-400 ml-1 text-xs font-normal">(Optional)</span></label>
              <input type="tel" name="altMobile" onInput={handleDigitInput} placeholder="10 digit mobile" maxLength={10} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-hidden transition-all text-slate-900" />
            </div>
          </div>

          {/* Email ID */}
          <div className="flex flex-col md:flex-row md:items-center pt-2">
            <label className="md:w-1/3 mb-1.5 md:mb-0 font-medium text-slate-700">Email Address <span className="text-rose-500">*</span></label>
            <div className="md:w-2/3">
              <input type="email" name="email" required placeholder="Enter email address" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-hidden transition-all text-slate-900" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            {/* Password */}
            <div>
              <label className="block mb-1.5 font-medium text-slate-700">Password <span className="text-rose-500">*</span></label>
              <input type="password" name="password" required placeholder="Create password" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-hidden transition-all text-slate-900" />
            </div>

            {/* Retype Password */}
            <div>
              <label className="block mb-1.5 font-medium text-slate-700">Confirm Password <span className="text-rose-500">*</span></label>
              <input type="password" name="confirmPassword" required placeholder="Re-enter password" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-hidden transition-all text-slate-900" />
            </div>
          </div>

          {/* Office Address */}
          <div className="flex flex-col md:flex-row md:items-start pt-4 border-t border-slate-100">
            <label className="md:w-1/3 mt-2 mb-1.5 md:mb-0 font-medium text-slate-700">Office Address <span className="text-rose-500">*</span></label>
            <div className="md:w-2/3">
              <textarea name="address" required placeholder="Enter complete office address" rows={3} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-hidden transition-all text-slate-900 resize-y"></textarea>
            </div>
          </div>

          {/* Office Landline */}
          <div className="flex flex-col md:flex-row md:items-center pt-2">
            <label className="md:w-1/3 mb-1.5 md:mb-0 font-medium text-slate-700">Office Landline <span className="text-rose-500">*</span></label>
            <div className="md:w-2/3">
              <input type="text" name="landline" required onInput={handleDigitInput} placeholder="STD Code + Number" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-hidden transition-all text-slate-900" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center pt-6 border-t border-slate-100">
            {/* Captcha Image */}
            <div className="md:w-1/2 flex items-center space-x-4 mb-4 md:mb-0">
              <div className="bg-slate-100 border border-slate-200 rounded-lg px-6 py-2 shadow-inner min-w-[140px] text-center">
                <span className="font-serif text-3xl font-bold tracking-[0.3em] text-slate-800 italic select-none">{captchaText}</span>
              </div>
              <button type="button" onClick={handleRefreshCaptcha} className="p-2.5 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors" title="Refresh Captcha">
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>

            {/* Enter Captcha */}
            <div className="md:w-1/2">
              <input type="text" required value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())} placeholder="Enter captcha code" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-hidden transition-all text-slate-900 font-bold tracking-widest uppercase" />
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 mt-6">
            <Link to="/login" className="px-6 py-3.5 rounded-xl font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors text-center w-full sm:w-auto">
              Cancel
            </Link>
            
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-center w-full sm:w-auto shadow-md transition-all focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 disabled:opacity-70 flex justify-center items-center"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Processing...
                </>
              ) : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
