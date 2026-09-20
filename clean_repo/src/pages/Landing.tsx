import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  FileCheck2,
  Award,
  ArrowRight,
  Zap,
  Building2,
  Lock,
  Globe2
} from 'lucide-react';
import { INITIAL_SCHEMES } from '../lib/mockData';

export const LandingPage: React.FC = () => {
  return (
    <div className="bg-[#f1e0c5] min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#71816d] text-white py-20 overflow-hidden border-b border-navy-700">
        <div className="absolute inset-0 bg-gradient-to-r from-[#5a6857] via-[#71816d] to-[#8c9c88] opacity-90"></div>
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MoTA AI-Driven Digital Empowerment Platform</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Unified Digital Window for <span className="text-amber-400">Scheduled Tribe</span> Education
            </h1>

            <p className="mt-4 text-lg text-slate-200 leading-relaxed font-normal">
              ST-SETU connects ST students with Ministry of Tribal Affairs (MoTA) Fellowships and Scholarships.
              Experience automated eligibility verification, AI document OCR intelligence, real-time application tracking, and transparent merit selection.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/app/schemes"
                className="inline-flex items-center px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-lg hover:shadow-orange-500/30 transition-all group"
              >
                <span>Browse All Schemes & Apply</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-xs transition-all"
              >
                <Lock className="w-4 h-4 mr-2 text-amber-300" />
                <span>Portal Login (Students & Officers)</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* KPI Ticker Bar */}
      <section className="bg-white border-b border-[#c9b79c] py-6 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-3 border-r border-[#dfcdb1] last:border-0">
              <p className="font-serif text-3xl font-extrabold text-[#71816d]">₹14.8 Cr+</p>
              <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Disbursed to ST Students</p>
            </div>
            <div className="p-3 border-r border-[#dfcdb1] last:border-0">
              <p className="font-serif text-3xl font-extrabold text-orange-500">100% Digital</p>
              <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">End-to-End Workflow</p>
            </div>
            <div className="p-3 border-r border-[#dfcdb1] last:border-0">
              <p className="font-serif text-3xl font-extrabold text-teal-600">&lt; 48 Hours</p>
              <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Average OCR Scrutiny</p>
            </div>
            <div className="p-3">
              <p className="font-serif text-3xl font-extrabold text-purple-700">750+ Slots</p>
              <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">National NFST Fellowships</p>
            </div>
          </div>
        </div>
      </section>

      {/* Schemes Catalog Preview */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">MoTA Flagship Schemes</span>
            <h2 className="font-serif text-3xl font-bold text-slate-900 mt-1">Explore Available Fellowships & Scholarships</h2>
          </div>
          <Link
            to="/app/schemes"
            className="text-xs font-bold text-[#71816d] hover:text-orange-600 flex items-center mt-3 md:mt-0"
          >
            <span>View All Details & Eligibility</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INITIAL_SCHEMES.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white rounded-2xl border border-[#c9b79c] p-6 flex flex-col justify-between hover:shadow-xl hover:border-slate-300 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="bg-navy-900 text-amber-400 font-extrabold text-xs px-2.5 py-1 rounded-md">
                    {scheme.code}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">{scheme.category}</span>
                </div>

                <h3 className="font-serif text-lg font-bold text-slate-900 mt-4 leading-snug group-hover:text-[#71816d] transition-colors">
                  {scheme.name}
                </h3>

                <p className="text-xs text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                  {scheme.description}
                </p>

                <div className="mt-5 p-3 rounded-xl bg-[#f1e0c5] border border-[#dfcdb1] space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Financial Assistance:</span>
                    <span className="font-bold text-slate-900 text-right">{scheme.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Available Slots:</span>
                    <span className="font-bold text-slate-900">{scheme.totalSlots} per year</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#dfcdb1] flex items-center justify-between">
                <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
                  Window Open
                </span>
                <Link
                  to={`/app/apply/${scheme.id}`}
                  className="inline-flex items-center text-xs font-bold text-orange-600 hover:text-orange-700 group-hover:translate-x-1 transition-transform"
                >
                  <span>Apply Online</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Feature Spotlight */}
      <section className="bg-[#5a6857] text-white py-16 border-y border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30 uppercase tracking-widest">
              AI & Automation Powered
            </span>
            <h2 className="font-serif text-3xl font-extrabold mt-3">Next-Generation Verification Engine</h2>
            <p className="text-xs text-slate-300 mt-2">
              Eliminating manual document bottleneck with OCR extraction, deficiency resolution, and automated merit ranking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-xs">
              <Zap className="w-8 h-8 text-amber-400 mb-3" />
              <h4 className="font-serif font-bold text-sm text-white">AI OCR Extraction</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Automatically extracts candidate name, income values, caste certificate numbers, and dates with confidence scores.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-xs">
              <FileCheck2 className="w-8 h-8 text-teal-400 mb-3" />
              <h4 className="font-serif font-bold text-sm text-white">Deficiency Workflow</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Officers flag missing or expired documents with structured checklists; candidates re-upload directly on the portal.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-xs">
              <Award className="w-8 h-8 text-purple-400 mb-3" />
              <h4 className="font-serif font-bold text-sm text-white">Automated Merit Engine</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Computes weighted merit scores combining academic performance, financial need, and research proposals.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-xs">
              <Building2 className="w-8 h-8 text-rose-400 mb-3" />
              <h4 className="font-serif font-bold text-sm text-white">Dynamic Config Engine</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                MoTA admins can create new schemes, dynamic eligibility rules, and document requirements without code changes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Process Visualizer */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-3xl font-bold text-slate-900">Simple 4-Step Digital Process</h2>
          <p className="text-xs text-slate-600 mt-2">Transparent tracking from submission to bank account credit.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          <div className="bg-white rounded-xl p-6 border border-[#c9b79c] text-center relative shadow-xs">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-extrabold flex items-center justify-center mx-auto mb-4">
              1
            </div>
            <h4 className="font-serif font-bold text-sm text-slate-900">Apply Online</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Fill 7-step guided form with auto-draft saving.</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-[#c9b79c] text-center relative shadow-xs">
            <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 font-extrabold flex items-center justify-center mx-auto mb-4">
              2
            </div>
            <h4 className="font-serif font-bold text-sm text-slate-900">AI Document Scrutiny</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">OCR extracts data; officer confirms verification.</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-[#c9b79c] text-center relative shadow-xs">
            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 font-extrabold flex items-center justify-center mx-auto mb-4">
              3
            </div>
            <h4 className="font-serif font-bold text-sm text-slate-900">Merit Ranking</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Selection committee finalizes candidate list.</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-[#c9b79c] text-center relative shadow-xs">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-extrabold flex items-center justify-center mx-auto mb-4">
              4
            </div>
            <h4 className="font-serif font-bold text-sm text-slate-900">DBT Bank Transfer</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Direct funds transfer via Aadhaar-linked bank A/c.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
