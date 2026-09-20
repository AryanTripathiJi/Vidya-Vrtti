import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#5a6857] text-slate-400 text-xs py-8 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-6 border-b border-navy-800">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-white font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span>ST-SETU Portal</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Single Digital Window for End-to-End Management of MoTA Scholarships & Fellowships for ST Students.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2">MoTA Schemes</h4>
            <ul className="space-y-1 text-[11px]">
              <li>National Fellowship for ST Students (NFST)</li>
              <li>National Overseas Scholarship (NOS)</li>
              <li>Top Class Education Scheme (TCES)</li>
              <li>Pre-Matric & Post-Matric ST Schemes</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1 text-[11px]">
              <li>
                <a href="https://tribal.nic.in/ScholarshiP.aspx" target="_blank" rel="noreferrer" className="hover:text-amber-300">
                  MoTA Official Website
                </a>
              </li>
              <li>
                <a href="https://dbttribal.gov.in/AllScheme.aspx" target="_blank" rel="noreferrer" className="hover:text-amber-300">
                  DBT Tribal Portal
                </a>
              </li>
              <li>National Scholarship Portal (NSP)</li>
              <li>DigiLocker Integration</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2">Helpline & Support</h4>
            <p className="text-[11px] text-slate-300">Toll-Free Helpline: 1800-11-7788</p>
            <p className="text-[11px] text-slate-300 mt-1">Email: support-stsetu@mota.gov.in</p>
            <p className="text-[10px] text-slate-500 mt-2">Ministry of Tribal Affairs, Shastri Bhawan, New Delhi</p>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
          <p>© 2026 Ministry of Tribal Affairs, Government of India. Developed for Smart India Hackathon (SIH25017).</p>
          <p className="flex items-center mt-2 sm:mt-0">
            Designed with <Heart className="w-3 h-3 text-rose-500 mx-1 fill-rose-500" /> for ST Empowerment
          </p>
        </div>
      </div>
    </footer>
  );
};
