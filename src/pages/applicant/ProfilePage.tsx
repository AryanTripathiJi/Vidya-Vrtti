import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, ShieldCheck, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-[#c9b79c] shadow-xs flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-navy-950 font-black text-2xl flex items-center justify-center shadow-md">
          {user?.name.charAt(0) || 'P'}
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">{user?.name}</h1>
          <p className="text-xs text-slate-500">ST Student Profile | Verified Community Member</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#c9b79c] p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm border-b pb-2">Aadhaar & ST Tribe Verification Status</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start space-x-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-emerald-950">Aadhaar e-KYC Verified</p>
              <p className="text-[11px] text-emerald-800 mt-0.5">Linked Masked Aadhaar: {user?.aadhaar || 'XXXX-XXXX-4921'}</p>
            </div>
          </div>

          <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl flex items-start space-x-2.5">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-blue-950">ST Caste Certificate Validated</p>
              <p className="text-[11px] text-blue-800 mt-0.5">Tribe Community: {user?.tribe || 'Gond'}</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#dfcdb1] space-y-3 text-xs">
          <div className="flex items-center space-x-3 text-slate-700">
            <Mail className="w-4 h-4 text-slate-400" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center space-x-3 text-slate-700">
            <Phone className="w-4 h-4 text-slate-400" />
            <span>+91 {user?.phone}</span>
          </div>
          <div className="flex items-center space-x-3 text-slate-700">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span>Domicile State: {user?.state || 'Odisha'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
