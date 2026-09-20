import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockApi } from '../../lib/mockApi';
import { Scheme } from '../../types';
import { BookOpen, CheckCircle2, ArrowRight, Filter, Sparkles, HelpCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const BrowseSchemes: React.FC = () => {
  const { user } = useAuth();
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [showEligibilityWizard, setShowEligibilityWizard] = useState(false);
  const [userIncome, setUserIncome] = useState(250000);
  const [userQualification, setUserQualification] = useState('Post Graduate');
  const [userMarks, setUserMarks] = useState(60);
  const [userQualifiesNet, setUserQualifiesNet] = useState(true);
  const [userAge, setUserAge] = useState(25);
  const [eligibilityResult, setEligibilityResult] = useState<{eligible: string[], reason: string} | null>(null);

  useEffect(() => {
    mockApi.getSchemes().then((data) => {
      setSchemes(data);
      if (user?.id) {
        mockApi.getApplications({ applicantId: user.id }).then((apps) => {
          if (apps.length > 0) {
            setHasApplied(true);
          }
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });
  }, [user]);

  const filteredSchemes = schemes.filter((s) => {
    if (categoryFilter !== 'ALL' && s.category !== categoryFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#c9b79c] shadow-xs">
        <div>
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">MoTA Scholarship Catalog</span>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Available ST Schemes & Fellowships</h1>
          <p className="text-xs text-slate-500 mt-1">
            Check eligibility guidelines and apply online with automated document scrutiny.
          </p>
        </div>

        <button
          onClick={() => setShowEligibilityWizard(!showEligibilityWizard)}
          className="inline-flex items-center px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs transition-colors"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          <span>Eligibility Checker Wizard</span>
        </button>
      </div>

      {/* Eligibility Wizard Modal */}
      {showEligibilityWizard && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6 shadow-md">
          <h3 className="font-extrabold text-amber-950 text-sm flex items-center">
            <Sparkles className="w-4 h-4 mr-2 text-amber-600" />
            Interactive ST Eligibility Checker
          </h3>
          <p className="text-xs text-amber-800 mt-1">Select your qualifications to filter eligible schemes:</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-xs font-bold text-amber-900">Highest Academic Qualification</label>
              <select
                value={userQualification}
                onChange={(e) => setUserQualification(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-amber-300 rounded-lg text-xs bg-white text-slate-900 font-medium"
              >
                <option value="Post Graduate">Post Graduate / M.Sc / M.A. / M.Tech</option>
                <option value="Under Graduate">Under Graduate / B.Tech / B.Sc</option>
                <option value="Class 12th">Class 12th Senior Secondary</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-900">Annual Family Income (₹)</label>
              <input
                type="number"
                value={userIncome}
                onChange={(e) => setUserIncome(Number(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-amber-300 rounded-lg text-xs bg-white text-slate-900 font-medium"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-amber-900">Age (Years)</label>
              <input
                type="number"
                value={userAge}
                onChange={(e) => setUserAge(Number(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-amber-300 rounded-lg text-xs bg-white text-slate-900 font-medium"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-amber-900">Degree Marks (%)</label>
              <input
                type="number"
                value={userMarks}
                onChange={(e) => setUserMarks(Number(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-amber-300 rounded-lg text-xs bg-white text-slate-900 font-medium"
              />
            </div>
            
            <div className="flex items-center mt-6">
              <input
                type="checkbox"
                checked={userQualifiesNet}
                onChange={(e) => setUserQualifiesNet(e.target.checked)}
                className="w-4 h-4 text-amber-600 border-amber-300 rounded focus:ring-amber-500"
              />
              <label className="ml-2 block text-xs font-bold text-amber-900">
                Qualified UGC-NET / CSIR NET
              </label>
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={() => {
                let eligibleSchemes: string[] = [];
                let reason = "";

                if (userIncome > 600000) {
                  reason = "Income exceeds the maximum limit (₹6,00,000) for MoTA schemes.";
                } else if (userAge > 36) {
                  reason = "Age exceeds the maximum limit (36 years) for fellowships.";
                } else {
                  if (userQualification === 'Post Graduate') {
                    if (userMarks >= 55 && userQualifiesNet) {
                      eligibleSchemes.push('NFST (National Fellowship)');
                      eligibleSchemes.push('NOS (National Overseas Scholarship)');
                      reason = `Eligible based on PG status, age (${userAge}), marks (${userMarks}%), NET qualification, and income.`;
                    } else {
                      reason = "For NFST/NOS, you need minimum 55% marks and UGC-NET/CSIR NET qualification.";
                    }
                  } else if (userQualification === 'Under Graduate') {
                    eligibleSchemes.push('Top Class Education (TCE)');
                    if (userIncome <= 250000) eligibleSchemes.push('Post-Matric Scholarship');
                    reason = `Based on your Under Graduate status and income criteria.`;
                  } else if (userQualification === 'Class 12th') {
                    if (userIncome <= 250000) {
                      eligibleSchemes.push('Post-Matric Scholarship');
                      reason = `Based on Class 12th status and income <= ₹2,50,000.`;
                    } else {
                      reason = `Income exceeds ₹2,50,000 limit for Post-Matric Scholarship.`;
                    }
                  }
                }
                
                setEligibilityResult({ eligible: eligibleSchemes, reason });
              }}
              className="inline-flex items-center px-4 py-2 rounded-xl bg-[#c9b79c] hover:bg-[#b5a48b] text-slate-900 font-bold text-xs shadow-sm transition-colors"
            >
              Check Eligibility
            </button>
          </div>

          {eligibilityResult && (
            <div className="mt-4 p-3 bg-white/80 rounded-xl border border-[#dfcdb1] text-xs text-[#5a6857]">
              <span className="font-bold">Result: </span> 
              {eligibilityResult.eligible.length > 0 ? (
                <span>
                  You are eligible for{' '}
                  {eligibilityResult.eligible.map((s, i) => (
                    <span key={i} className="font-extrabold text-[#71816d]">{s}{i < eligibilityResult.eligible.length - 1 ? ' and ' : ' '}</span>
                  ))}
                  ! {eligibilityResult.reason}
                </span>
              ) : (
                <span className="text-red-700 font-bold">You are not eligible for any schemes currently. {eligibilityResult.reason}</span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white rounded-2xl border border-[#c9b79c] p-6 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="bg-[#71816d] text-amber-300 font-extrabold text-xs px-2.5 py-1 rounded-md">
                  {scheme.code}
                </span>
                <span className="text-xs font-semibold text-slate-500">{scheme.category}</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mt-4 leading-snug">{scheme.name}</h3>

              <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">{scheme.description}</p>

              <div className="mt-4 space-y-2">
                <div className="p-3 rounded-xl bg-[#f1e0c5] border border-[#dfcdb1] text-xs space-y-1">
                  <div className="flex justify-between flex-wrap gap-x-2 gap-y-1 items-start">
                    <span className="text-slate-500 font-medium shrink-0">Financial Aid:</span>
                    <span className="font-bold text-slate-900 text-right">{scheme.amount}</span>
                  </div>
                  <div className="flex justify-between flex-wrap gap-x-2 gap-y-1 items-start">
                    <span className="text-slate-500 font-medium shrink-0">Application Window:</span>
                    <span className="font-bold text-slate-900 text-right">
                      {new Date(scheme.window.start).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} -{' '}
                      {new Date(scheme.window.end).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] font-medium text-slate-700">
                  <span className="font-bold text-slate-900">Key Documents Required:</span>
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-600">
                    {scheme.requiredDocs.slice(0, 3).map((doc, idx) => (
                      <li key={idx}>{doc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#dfcdb1] flex items-center justify-between">
              <Link
                to={`/app/schemes/${scheme.id}`}
                className="text-xs font-bold text-[#71816d] hover:underline"
              >
                View Details
              </Link>
              {hasApplied ? (
                <button
                  disabled
                  className="inline-flex items-center px-4 py-2 rounded-xl bg-slate-200 text-slate-500 font-bold text-xs cursor-not-allowed shadow-xs"
                  title="You have already applied for a scheme"
                >
                  <span>Already Applied</span>
                </button>
              ) : (
                <Link
                  to={`/app/apply/${scheme.id}`}
                  className="inline-flex items-center px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
