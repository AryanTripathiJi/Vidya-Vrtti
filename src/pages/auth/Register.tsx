import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Mocking registration logic
      await register({ name: 'Admin User', email: 'admin@demo.in', role: 'institute' });
      toast.success('User Registered Successfully!');
      navigate('/login');
    } catch (err) {
      toast.error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1e0c5] flex justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans text-black">
      <div className="w-full max-w-4xl bg-white border-4 border-black shadow-[8px_8px_0_0_#000] p-8 md:p-12 relative">
        
        {/* Decorative elements */}
        <div className="absolute -top-6 -right-6 w-12 h-12 bg-[#ffd93d] border-4 border-black shadow-[4px_4px_0_0_#000] rounded-full z-10"></div>
        <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-[#ff6b6b] border-4 border-black shadow-[4px_4px_0_0_#000] transform rotate-12 z-10 flex items-center justify-center">
          <span className="text-2xl font-black">!</span>
        </div>

        <div className="mb-10 border-b-4 border-black pb-6">
          <h2 className="text-4xl font-black uppercase tracking-tighter inline-block bg-[#4facfe] text-white px-4 py-2 border-4 border-black shadow-[4px_4px_0_0_#000] transform -rotate-1">
            User Registration
          </h2>
          <p className="mt-4 font-bold text-sm uppercase tracking-wide">Join the ST-SETU Platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-sm font-bold uppercase tracking-wide">
          
          {/* User Type */}
          <div className="flex flex-col md:flex-row md:items-center">
            <label className="md:w-1/3 mb-2 md:mb-0">User Type <span className="text-[#ff6b6b] text-lg leading-none">*</span></label>
            <div className="md:w-2/3">
              <select required className="w-full px-4 py-3 border-4 border-black focus:outline-hidden focus:bg-[#ffd93d] transition-colors cursor-pointer appearance-none bg-white">
                <option value="">-- Select Role --</option>
                <option value="Institute">Institute / University</option>
                <option value="State">State Nodal Officer</option>
                <option value="Ministry">Ministry Official</option>
              </select>
            </div>
          </div>

          {/* Applied in Scheme */}
          <div className="flex flex-col md:flex-row md:items-start">
            <label className="md:w-1/3 mt-2 mb-2 md:mb-0">Applied Scheme <span className="text-[#ff6b6b] text-lg leading-none">*</span></label>
            <div className="md:w-2/3 space-y-3 mt-2">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <div className="relative flex items-center justify-center w-6 h-6 border-4 border-black bg-white group-hover:bg-[#ffd93d] transition-colors">
                  <input type="checkbox" className="absolute opacity-0 w-full h-full cursor-pointer peer" />
                  <div className="hidden peer-checked:block w-3 h-3 bg-black"></div>
                </div>
                <span>Post-Matric Scholarship (BVOBC)</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <div className="relative flex items-center justify-center w-6 h-6 border-4 border-black bg-white group-hover:bg-[#ffd93d] transition-colors">
                  <input type="checkbox" className="absolute opacity-0 w-full h-full cursor-pointer peer" />
                  <div className="hidden peer-checked:block w-3 h-3 bg-black"></div>
                </div>
                <span>Pre-Matric Scholarship (BPVGK)</span>
              </label>
            </div>
          </div>

          {/* Full Name */}
          <div className="flex flex-col md:flex-row md:items-center">
            <label className="md:w-1/3 mb-2 md:mb-0">Full Name <span className="text-[#ff6b6b] text-lg leading-none">*</span></label>
            <div className="md:w-2/3">
              <input type="text" required placeholder="ENTER FULL NAME" className="w-full px-4 py-3 border-4 border-black bg-[#f8f9fa] focus:bg-white focus:outline-hidden placeholder-gray-400 transition-colors" />
            </div>
          </div>

          {/* State Name */}
          <div className="flex flex-col md:flex-row md:items-center">
            <label className="md:w-1/3 mb-2 md:mb-0">State Name <span className="text-[#ff6b6b] text-lg leading-none">*</span></label>
            <div className="md:w-2/3">
              <select required className="w-full px-4 py-3 border-4 border-black focus:outline-hidden focus:bg-[#ffd93d] transition-colors cursor-pointer appearance-none bg-white">
                <option value="">-- Select State --</option>
                <option value="Odisha">Odisha</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="MP">Madhya Pradesh</option>
              </select>
            </div>
          </div>

          {/* Designation */}
          <div className="flex flex-col md:flex-row md:items-center">
            <label className="md:w-1/3 mb-2 md:mb-0">Designation <span className="text-[#ff6b6b] text-lg leading-none">*</span></label>
            <div className="md:w-2/3">
              <select required className="w-full px-4 py-3 border-4 border-black focus:outline-hidden focus:bg-[#ffd93d] transition-colors cursor-pointer appearance-none bg-white">
                <option value="">-- Select Designation --</option>
                <option value="Principal">Principal</option>
                <option value="NodalOfficer">Nodal Officer</option>
                <option value="Clerk">Clerk</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t-4 border-black">
            {/* Mobile Number */}
            <div>
              <label className="block mb-2">Mobile Number <span className="text-[#ff6b6b] text-lg leading-none">*</span></label>
              <input type="tel" required placeholder="10 DIGIT MOBILE" className="w-full px-4 py-3 border-4 border-black bg-[#f8f9fa] focus:bg-white focus:outline-hidden placeholder-gray-400 transition-colors" />
            </div>

            {/* Alternate Mobile */}
            <div>
              <label className="block mb-2">Alternate Mobile <span className="text-gray-400 ml-1 text-xs">(OPTIONAL)</span></label>
              <input type="tel" placeholder="10 DIGIT MOBILE" className="w-full px-4 py-3 border-4 border-black bg-[#f8f9fa] focus:bg-white focus:outline-hidden placeholder-gray-400 transition-colors" />
            </div>
          </div>

          {/* Email ID */}
          <div className="flex flex-col md:flex-row md:items-center pt-4">
            <label className="md:w-1/3 mb-2 md:mb-0">Email Address <span className="text-[#ff6b6b] text-lg leading-none">*</span></label>
            <div className="md:w-2/3">
              <input type="email" required placeholder="ENTER EMAIL ADDRESS" className="w-full px-4 py-3 border-4 border-black bg-[#f8f9fa] focus:bg-white focus:outline-hidden placeholder-gray-400 transition-colors" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {/* Password */}
            <div>
              <label className="block mb-2">Password <span className="text-[#ff6b6b] text-lg leading-none">*</span></label>
              <input type="password" required placeholder="CREATE PASSWORD" className="w-full px-4 py-3 border-4 border-black bg-[#f8f9fa] focus:bg-white focus:outline-hidden placeholder-gray-400 transition-colors" />
            </div>

            {/* Retype Password */}
            <div>
              <label className="block mb-2">Confirm Password <span className="text-[#ff6b6b] text-lg leading-none">*</span></label>
              <input type="password" required placeholder="RE-ENTER PASSWORD" className="w-full px-4 py-3 border-4 border-black bg-[#f8f9fa] focus:bg-white focus:outline-hidden placeholder-gray-400 transition-colors" />
            </div>
          </div>

          {/* Office Address */}
          <div className="flex flex-col md:flex-row md:items-start pt-4 border-t-4 border-black">
            <label className="md:w-1/3 mt-2 mb-2 md:mb-0">Office Address <span className="text-[#ff6b6b] text-lg leading-none">*</span></label>
            <div className="md:w-2/3">
              <textarea required placeholder="ENTER COMPLETE OFFICE ADDRESS" rows={4} className="w-full px-4 py-3 border-4 border-black bg-[#f8f9fa] focus:bg-white focus:outline-hidden placeholder-gray-400 transition-colors resize-y"></textarea>
            </div>
          </div>

          {/* Office Landline */}
          <div className="flex flex-col md:flex-row md:items-center">
            <label className="md:w-1/3 mb-2 md:mb-0">Office Landline <span className="text-[#ff6b6b] text-lg leading-none">*</span></label>
            <div className="md:w-2/3 flex items-center">
              <input type="text" required placeholder="STD CODE + NUMBER" className="w-full px-4 py-3 border-4 border-black bg-[#f8f9fa] focus:bg-white focus:outline-hidden placeholder-gray-400 transition-colors" />
              <div className="ml-4 w-6 h-6 border-4 border-black bg-[#4facfe] rounded-full shrink-0"></div>
            </div>
          </div>

          {/* Captcha Image */}
          <div className="flex flex-col md:flex-row md:items-center pt-6 border-t-4 border-black">
            <label className="md:w-1/3 mb-2 md:mb-0">Security Check</label>
            <div className="md:w-2/3 flex items-center space-x-6">
              <div className="bg-[#ffd93d] border-4 border-black px-6 py-2 shadow-[4px_4px_0_0_#000] transform rotate-2">
                <span className="font-serif text-3xl font-black tracking-[0.5em] text-black italic select-none">H958</span>
              </div>
              <button type="button" className="p-3 border-4 border-black bg-white hover:bg-gray-100 shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
                <RefreshCw className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Enter Captcha */}
          <div className="flex flex-col md:flex-row md:items-center">
            <label className="md:w-1/3 mb-2 md:mb-0">Enter Captcha <span className="text-[#ff6b6b] text-lg leading-none">*</span></label>
            <div className="md:w-2/3">
              <input type="text" required placeholder="TYPE CODE ABOVE" className="w-full px-4 py-3 border-4 border-black bg-[#f8f9fa] focus:bg-white focus:outline-hidden placeholder-gray-400 transition-colors font-black tracking-widest uppercase" />
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t-4 border-black mt-8">
            <Link to="/login" className="px-6 py-4 border-4 border-black bg-white hover:bg-gray-100 font-black uppercase text-center w-full sm:w-auto shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] transition-all">
              Cancel
            </Link>
            
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 border-4 border-black bg-[#00b894] hover:bg-[#55efc4] text-white font-black uppercase tracking-widest text-center w-full sm:w-auto shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
            >
              {loading ? 'Processing...' : 'Register Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
