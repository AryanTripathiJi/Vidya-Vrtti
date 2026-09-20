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
    <div className="min-h-screen bg-[#fdfbf7] flex justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans text-[#2c352a]">
      <div className="w-full max-w-4xl bg-white shadow-sm border border-[#c9b79c] rounded-md p-8 md:p-12">
        
        <h2 className="text-3xl font-serif font-extrabold text-black mb-8 underline decoration-2 underline-offset-4">
          User Registration Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm font-medium">
          
          {/* User Type */}
          <div className="flex flex-col md:flex-row md:items-center">
            <label className="md:w-1/3 mb-1 md:mb-0">User Type <span className="text-red-600">*</span>:</label>
            <div className="md:w-2/3">
              <select required className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-[#c9b79c] focus:border-[#c9b79c] bg-white">
                <option value="">--Select--</option>
                <option value="Institute">Institute / University</option>
                <option value="State">State Nodal Officer</option>
                <option value="Ministry">Ministry Official</option>
              </select>
            </div>
          </div>

          {/* Applied in Scheme */}
          <div className="flex flex-col md:flex-row md:items-start">
            <label className="md:w-1/3 mt-2 mb-1 md:mb-0">Applied in Scheme <span className="text-red-600">*</span>:</label>
            <div className="md:w-2/3 space-y-2 mt-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4 text-[#71816d] border-slate-300 rounded focus:ring-[#71816d]" />
                <span>Post-Matric Scholarship Scheme For ST Students - BVOBC</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4 text-[#71816d] border-slate-300 rounded focus:ring-[#71816d]" />
                <span>Pre-Matric Scholarship Scheme For ST Student - BPVGK</span>
              </label>
            </div>
          </div>

          {/* Full Name */}
          <div className="flex flex-col md:flex-row md:items-center">
            <label className="md:w-1/3 mb-1 md:mb-0">Full Name <span className="text-red-600">*</span>:</label>
            <div className="md:w-2/3">
              <input type="text" required placeholder="Enter Full Name" className="w-full px-3 py-2 border border-black rounded focus:ring-[#c9b79c] focus:border-[#c9b79c]" />
            </div>
          </div>

          {/* State Name */}
          <div className="flex flex-col md:flex-row md:items-center">
            <label className="md:w-1/3 mb-1 md:mb-0">State Name <span className="text-red-600">*</span>:</label>
            <div className="md:w-2/3">
              <select required className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-[#c9b79c] focus:border-[#c9b79c] bg-white">
                <option value="">--Select--</option>
                <option value="Odisha">Odisha</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="MP">Madhya Pradesh</option>
              </select>
            </div>
          </div>

          {/* Designation */}
          <div className="flex flex-col md:flex-row md:items-center">
            <label className="md:w-1/3 mb-1 md:mb-0">Designation <span className="text-red-600">*</span>:</label>
            <div className="md:w-2/3">
              <select required className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-[#c9b79c] focus:border-[#c9b79c] bg-white">
                <option value="">--Select--</option>
                <option value="Principal">Principal</option>
                <option value="NodalOfficer">Nodal Officer</option>
                <option value="Clerk">Clerk</option>
              </select>
            </div>
          </div>

          {/* Mobile Number */}
          <div className="flex flex-col md:flex-row md:items-center">
            <label className="md:w-1/3 mb-1 md:mb-0">Mobile Number <span className="text-red-600">*</span>:</label>
            <div className="md:w-2/3">
              <input type="tel" required placeholder="Enter 10 digit Mobile No." className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-[#c9b79c] focus:border-[#c9b79c]" />
            </div>
          </div>

          {/* Alternate Mobile Number */}
          <div className="flex flex-col md:flex-row md:items-center">
            <label className="md:w-1/3 mb-1 md:mb-0">Alternate Mobile Number (Optional):</label>
            <div className="md:w-2/3">
              <input type="tel" placeholder="Enter 10 digit Mobile No." className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-[#c9b79c] focus:border-[#c9b79c]" />
            </div>
          </div>

          {/* Email ID */}
          <div className="flex flex-col md:flex-row md:items-center">
            <label className="md:w-1/3 mb-1 md:mb-0">Email ID <span className="text-red-600">*</span>:</label>
            <div className="md:w-2/3">
              <input type="email" required placeholder="Enter your Email ID" className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-[#c9b79c] focus:border-[#c9b79c]" />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col md:flex-row md:items-center">
            <label className="md:w-1/3 mb-1 md:mb-0">Password <span className="text-red-600">*</span>:</label>
            <div className="md:w-2/3">
              <input type="password" required placeholder="Create New Password" className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-[#c9b79c] focus:border-[#c9b79c]" />
            </div>
          </div>

          {/* Retype Password */}
          <div className="flex flex-col md:flex-row md:items-center">
            <label className="md:w-1/3 mb-1 md:mb-0">Retype Password <span className="text-red-600">*</span>:</label>
            <div className="md:w-2/3">
              <input type="password" required placeholder="Re-enter Your Password" className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-[#c9b79c] focus:border-[#c9b79c]" />
            </div>
          </div>

          {/* Office Address */}
          <div className="flex flex-col md:flex-row md:items-start">
            <label className="md:w-1/3 mt-2 mb-1 md:mb-0">Office Address <span className="text-red-600">*</span>:</label>
            <div className="md:w-2/3">
              <textarea required placeholder="Enter Office Address" rows={4} className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-[#c9b79c] focus:border-[#c9b79c] resize-y"></textarea>
            </div>
          </div>

          {/* Office Landline */}
          <div className="flex flex-col md:flex-row md:items-center">
            <label className="md:w-1/3 mb-1 md:mb-0">Office's landline No. with STD Code <span className="text-red-600">*</span>:</label>
            <div className="md:w-2/3 flex items-center">
              <input type="text" required placeholder="Enter Office's Landline No" className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-[#c9b79c] focus:border-[#c9b79c]" />
              <div className="ml-3 w-4 h-4 rounded-full bg-slate-400"></div>
            </div>
          </div>

          {/* Captcha Image */}
          <div className="flex flex-col md:flex-row md:items-center pt-2">
            <label className="md:w-1/3 mb-1 md:mb-0">Captcha Code:</label>
            <div className="md:w-2/3 flex items-center space-x-4">
              <div className="font-serif text-3xl font-black tracking-widest text-slate-800 italic select-none">
                H 9 5 8
              </div>
              <button type="button" className="text-slate-500 hover:text-black">
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Enter Captcha */}
          <div className="flex flex-col md:flex-row md:items-center">
            <label className="md:w-1/3 mb-1 md:mb-0">Enter Captcha Code <span className="text-red-600">*</span> :</label>
            <div className="md:w-2/3">
              <input type="text" required placeholder="Enter Captcha Code" className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-[#c9b79c] focus:border-[#c9b79c]" />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col md:flex-row md:items-center pt-6">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-2.5 border border-transparent rounded-sm shadow-xs text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 transition-colors"
              >
                {loading ? 'Submitting...' : 'Register'}
              </button>
              
              <div className="mt-4 text-xs text-slate-500">
                Already have an account?{' '}
                <Link to="/login" className="font-bold text-[#71816d] hover:underline">
                  Sign In Here
                </Link>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
