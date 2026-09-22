import React from 'react';
import { HelpCircle, FileText, Phone, Mail, ShieldCheck } from 'lucide-react';

export const HelpPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-[#c9b79c] shadow-xs">
        <h1 className="text-2xl font-bold text-slate-900">MoTA Scholarship Helpdesk & FAQs</h1>
        <p className="text-xs text-slate-500 mt-1">
          Official guidance for Scheduled Tribe (ST) students applying for NFST, NOS, and Top Class schemes.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#c9b79c] p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm border-b pb-2">Frequently Asked Questions</h3>

        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-xl bg-[#f1e0c5] border border-[#c9b79c]">
            <h4 className="font-bold text-slate-900 text-sm">Q: What is the annual family income ceiling for NFST?</h4>
            <p className="text-slate-600 mt-1 leading-relaxed">
              The annual family income limit for NFST is ₹6.0 Lakhs per annum. Income certificates must be issued by a competent revenue officer (Tehsildar / Sub-Divisional Magistrate).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#f1e0c5] border border-[#c9b79c]">
            <h4 className="font-bold text-slate-900 text-sm">Q: How does the AI OCR Document Scrutiny work?</h4>
            <p className="text-slate-600 mt-1 leading-relaxed">
              When you upload your ST Caste Certificate or Income Certificate, our AI OCR engine automatically extracts your name, tribe name, certificate issue date, and financial year. If a deficiency or mismatch is found, a query notification will appear on your dashboard allowing you to re-upload.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#f1e0c5] border border-[#c9b79c]">
            <h4 className="font-bold text-slate-900 text-sm">Q: How are scholarship funds disbursed?</h4>
            <p className="text-slate-600 mt-1 leading-relaxed">
              All approved fellowship amounts are directly transferred to the candidate's Aadhaar-seeded bank account via Direct Benefit Transfer (DBT) and PFMS.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
