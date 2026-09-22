import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockApi } from '../../lib/mockApi';
import { Application, Document, OCRField } from '../../types';
import { StatusBadge } from '../../components/shared/StatusBadge';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Eye,
  ShieldCheck,
  CheckSquare,
  Sparkles,
  Award,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

export const ApplicationReviewPage: React.FC = () => {
  const { appId } = useParams<{ appId: string }>();
  const navigate = useNavigate();
  const [app, setApp] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeDocTab, setActiveDocTab] = useState<string>('ST Caste Certificate');
  const [verifiedCheckboxes, setVerifiedCheckboxes] = useState<Record<string, boolean>>({
    personal: true,
    address: true,
    academic: true,
    bank: true
  });

  // Action Modals State
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('Documents failed validation requirements');
  const [showDeficiencyModal, setShowDeficiencyModal] = useState(false);
  const [deficiencyReasons, setDeficiencyReasons] = useState<string[]>([
    'Expired / Outdated Income Certificate'
  ]);
  const [deficiencyNote, setDeficiencyNote] = useState('');

  useEffect(() => {
    if (appId) {
      mockApi.getApplicationById(appId).then((data) => {
        setApp(data);
        if (data && data.documents.length > 0) {
          setActiveDocTab(data.documents[0].type);
        }
        setLoading(false);
      });
    }
  }, [appId]);

  if (loading || !app) {
    return <div className="p-8 text-center text-xs text-slate-500">Loading Application Review Engine...</div>;
  }

  const activeDoc = app.documents.find((d) => d.type === activeDocTab) || app.documents[0];

  const handleApprove = async () => {
    await mockApi.approveApplication(app.id);
    toast.success(`Application ${app.id} Approved & Verified!`);
    navigate('/admin/verification');
  };

  const handleReject = async () => {
    await mockApi.rejectApplication(app.id, rejectReason);
    toast.error(`Application ${app.id} Rejected`);
    setShowRejectModal(false);
    navigate('/admin/verification');
  };

  const handleRaiseDeficiency = async () => {
    if (deficiencyReasons.length === 0) {
      toast.error('Please select at least one deficiency reason');
      return;
    }
    await mockApi.raiseDeficiency(app.id, deficiencyReasons, deficiencyNote);
    toast.warning(`Deficiency Query Raised on ${app.id}`);
    setShowDeficiencyModal(false);
    navigate('/admin/verification');
  };

  const toggleDeficiencyReason = (reason: string) => {
    setDeficiencyReasons((prev) =>
      prev.includes(reason) ? prev.filter((r) => r !== reason) : [...prev, reason]
    );
  };

  return (
    <div className="space-y-4">
      {/* Navigation Header */}
      <div className="bg-white p-4 rounded-2xl border border-[#c9b79c] shadow-xs flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link to="/admin/applications" className="p-1.5 rounded-lg bg-[#e8d6ba] hover:bg-slate-200 text-slate-700">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono font-bold text-[#71816d] text-sm">App ID: {app.id}</span>
              <StatusBadge status={app.status} size="sm" />
            </div>
            <p className="text-xs text-slate-600 font-bold mt-0.5">
              {app.applicantName} | {app.schemeCode} ({app.address?.state || 'Odisha'})
            </p>
          </div>
        </div>

        {/* Action Buttons Top Bar */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowDeficiencyModal(true)}
            className="inline-flex items-center px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs"
          >
            <AlertTriangle className="w-4 h-4 mr-1.5" />
            <span>Raise Deficiency (⚠️)</span>
          </button>
          <button
            onClick={() => setShowRejectModal(true)}
            className="inline-flex items-center px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs"
          >
            <XCircle className="w-4 h-4 mr-1.5" />
            <span>Reject (❌)</span>
          </button>
          <button
            onClick={handleApprove}
            className="inline-flex items-center px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md"
          >
            <CheckCircle2 className="w-4 h-4 mr-1.5" />
            <span>Approve & Verify (✅)</span>
          </button>
        </div>
      </div>

      {/* Split-Screen Review Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT PANEL (40%): Form Field Data with Officer Verification Checkboxes */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-[#c9b79c] p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Applicant Form Data</h3>
              <span className="text-[10px] font-bold text-slate-500">Check to verify</span>
            </div>

            {/* Personal Details */}
            <div className="p-3.5 rounded-xl bg-[#f1e0c5] border border-[#c9b79c] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#71816d]">1. Personal Details</span>
                <label className="flex items-center space-x-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={verifiedCheckboxes.personal}
                    onChange={(e) => setVerifiedCheckboxes({ ...verifiedCheckboxes, personal: e.target.checked })}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-[10px] font-bold text-emerald-700">Confirmed</span>
                </label>
              </div>
              <div className="grid grid-cols-2 gap-2 text-slate-700 text-[11px]">
                <div>Name: <span className="font-bold text-slate-900">{app.personal.fullName}</span></div>
                <div>Tribe: <span className="font-bold text-slate-900">{app.personal.tribeName}</span></div>
                <div>DOB: <span className="font-semibold text-slate-900">{app.personal.dob}</span></div>
                <div>Income: <span className="font-bold text-slate-900">₹{app.personal.annualIncome.toLocaleString('en-IN')}</span></div>
              </div>
            </div>

            {/* Address & Domicile */}
            <div className="p-3.5 rounded-xl bg-[#f1e0c5] border border-[#c9b79c] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#71816d]">2. Address & Domicile</span>
                <label className="flex items-center space-x-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={verifiedCheckboxes.address}
                    onChange={(e) => setVerifiedCheckboxes({ ...verifiedCheckboxes, address: e.target.checked })}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-[10px] font-bold text-emerald-700">Confirmed</span>
                </label>
              </div>
              <div className="text-[11px] text-slate-700 space-y-1">
                <div>State: <span className="font-bold text-slate-900">{app.address.state}</span> ({app.address.district})</div>
                <div>Cert Ref: <span className="font-mono font-bold text-slate-900">{app.address.domicileCertNo}</span></div>
              </div>
            </div>

            {/* Academic Details */}
            <div className="p-3.5 rounded-xl bg-[#f1e0c5] border border-[#c9b79c] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#71816d]">3. Academic Performance</span>
                <label className="flex items-center space-x-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={verifiedCheckboxes.academic}
                    onChange={(e) => setVerifiedCheckboxes({ ...verifiedCheckboxes, academic: e.target.checked })}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-[10px] font-bold text-emerald-700">Confirmed</span>
                </label>
              </div>
              <div className="text-[11px] text-slate-700 space-y-1">
                <div>Highest Qual: <span className="font-bold text-slate-900">{app.academic.highestQualification}</span></div>
                <div>Institute: <span className="font-semibold text-slate-900">{app.academic.institutionName}</span></div>
                <div>Percentage / CGPA: <span className="font-extrabold text-emerald-700">{app.academic.percentageOrCgpa}%</span></div>
              </div>
            </div>

            {/* Scheme Specific Synopsis */}
            {app.schemeSpecific?.researchTopic && (
              <div className="p-3.5 rounded-xl bg-[#f1e0c5] border border-[#c9b79c] text-xs space-y-1">
                <span className="font-bold text-[#71816d]">4. Ph.D. Research Synopsis</span>
                <p className="text-[11px] text-slate-700 italic">"{app.schemeSpecific.researchTopic}"</p>
                <p className="text-[10px] text-slate-500">Guide: {app.schemeSpecific.guideName}</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL (60%): Interactive Document Viewer & Simulated OCR Overlay */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-[#c9b79c] p-5 shadow-xs space-y-4">
            {/* Document Tabs */}
            <div className="flex items-center space-x-2 border-b border-[#c9b79c] pb-3 overflow-x-auto">
              {app.documents.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => setActiveDocTab(doc.type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeDocTab === doc.type
                      ? 'bg-[#71816d] text-white shadow-xs'
                      : 'bg-[#e8d6ba] text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {doc.type}
                </button>
              ))}
            </div>

            {/* OCR Extracted Overlay Box */}
            {activeDoc && (
              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-extrabold text-amber-300">AI OCR Field Extractions</span>
                  </div>
                  <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-md">
                    Confidence: {activeDoc.ocrConfidence || 95}%
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {activeDoc.ocrFields?.map((f) => (
                    <div
                      key={f.id}
                      className={`p-2.5 rounded-lg border text-xs ${
                        f.confidence < 70 || f.isMismatch
                          ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                          : 'bg-white/10 border-white/20 text-slate-200'
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                        <span>{f.field}</span>
                        <span className={f.confidence < 70 ? 'text-rose-400 font-extrabold' : 'text-emerald-400'}>
                          {f.confidence}% Match
                        </span>
                      </div>
                      <div className="font-bold text-white mt-1">{f.value}</div>
                      {f.isMismatch && (
                        <div className="text-[10px] text-rose-300 mt-1 font-semibold">
                          ⚠️ Issue: {f.expectedValue}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Document Preview Box */}
            {activeDoc && (
              <div className="border border-[#c9b79c] rounded-xl overflow-hidden bg-[#e8d6ba] h-96 flex items-center justify-center relative">
                <img
                  src={activeDoc.url}
                  alt={activeDoc.fileName}
                  className="max-h-full max-w-full object-contain"
                />
                <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-mono px-3 py-1 rounded-md">
                  {activeDoc.fileName} ({activeDoc.fileSize})
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 border-b pb-2">Reject Application</h3>
            <div>
              <label className="block text-xs font-bold text-slate-700">Rejection Reason</label>
              <textarea
                rows={3}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>
            <div className="flex justify-end space-x-3 pt-2">
              <button onClick={() => setShowRejectModal(false)} className="px-4 py-2 rounded-xl bg-[#e8d6ba] text-xs font-bold">
                Cancel
              </button>
              <button onClick={handleReject} className="px-5 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-md">
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Raise Deficiency Modal */}
      {showDeficiencyModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 border-b pb-2">Raise Structured Deficiency Query</h3>

            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-800">Select Deficiency Checklist Items:</span>
              {[
                'Expired / Outdated Income Certificate',
                'Illegible / Blur Document Scan',
                'Candidate Name Mismatch between Aadhaar & Marksheet',
                'Non-Standard ST Caste Certificate Format',
                'Ph.D. Guide Seal & Signature Missing'
              ].map((item) => (
                <label key={item} className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg bg-[#f1e0c5] border border-[#c9b79c]">
                  <input
                    type="checkbox"
                    checked={deficiencyReasons.includes(item)}
                    onChange={() => toggleDeficiencyReason(item)}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-slate-800 font-medium">{item}</span>
                </label>
              ))}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">Officer Note to Candidate</label>
              <textarea
                rows={2}
                placeholder="Specific instructions e.g. Upload latest FY 2025-26 certificate"
                value={deficiencyNote}
                onChange={(e) => setDeficiencyNote(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button onClick={() => setShowDeficiencyModal(false)} className="px-4 py-2 rounded-xl bg-[#e8d6ba] text-xs font-bold">
                Cancel
              </button>
              <button onClick={handleRaiseDeficiency} className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold shadow-md">
                Send Deficiency Query
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
