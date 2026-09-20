import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockApi } from '../../lib/mockApi';
import { Scheme } from '../../types';
import { ArrowLeft, CheckCircle2, FileText, Calendar, Award, ArrowRight, ShieldCheck } from 'lucide-react';

export const SchemeDetailPage: React.FC = () => {
  const { schemeId } = useParams<{ schemeId: string }>();
  const [scheme, setScheme] = useState<Scheme | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (schemeId) {
      mockApi.getSchemeById(schemeId).then((data) => {
        setScheme(data);
        setLoading(false);
      });
    }
  }, [schemeId]);

  if (loading || !scheme) {
    return <div className="p-8 text-center text-xs text-slate-500">Loading scheme details...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <Link to="/app/schemes" className="inline-flex items-center text-xs font-bold text-slate-600 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4 mr-1" />
        <span>Back to All Schemes</span>
      </Link>

      {/* Main Header Card */}
      <div className="bg-white rounded-2xl border border-[#c9b79c] p-6 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="bg-[#71816d] text-amber-300 font-extrabold text-sm px-3 py-1 rounded-md">
            {scheme.code}
          </span>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
            Application Window Active
          </span>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mt-4">{scheme.name}</h1>
        <p className="text-xs text-slate-600 mt-2 leading-relaxed">{scheme.description}</p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#f1e0c5] border border-[#dfcdb1]">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Financial Assistance</p>
            <p className="text-sm font-extrabold text-slate-900 mt-1">{scheme.amount}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#f1e0c5] border border-[#dfcdb1]">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Annual National Slots</p>
            <p className="text-sm font-extrabold text-slate-900 mt-1">{scheme.totalSlots} Slots</p>
          </div>
          <div className="p-4 rounded-xl bg-[#f1e0c5] border border-[#dfcdb1]">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Selection Mode</p>
            <p className="text-sm font-extrabold text-slate-900 mt-1 capitalize">{scheme.selectionCriteria} Based</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Link
            to={`/app/apply/${scheme.id}`}
            className="inline-flex items-center px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-all"
          >
            <span>Proceed to 7-Step Application</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>

      {/* Required Documents Checklist */}
      <div className="bg-white rounded-2xl border border-[#c9b79c] p-6 shadow-xs">
        <h3 className="font-bold text-slate-900 text-sm flex items-center">
          <FileText className="w-4 h-4 mr-2 text-[#71816d]" />
          Mandatory Documents Checklist for Application
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {scheme.requiredDocs.map((doc, idx) => (
            <div key={idx} className="flex items-start space-x-2.5 p-3 rounded-xl bg-[#f1e0c5] border border-[#dfcdb1]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="text-xs font-semibold text-slate-800">{doc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
