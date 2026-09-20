import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockApi } from '../../lib/mockApi';
import { Application, Document } from '../../types';
import { StatusBadge } from '../../components/shared/StatusBadge';
import {
  ArrowLeft,
  AlertTriangle,
  UploadCloud,
  CheckCircle2,
  FileText,
  Clock,
  Download,
  ShieldCheck,
  User,
  Building2
} from 'lucide-react';
import { toast } from 'sonner';
import jsPDF from 'jspdf';

export const ApplicationDetailPage: React.FC = () => {
  const { appId } = useParams<{ appId: string }>();
  const [app, setApp] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeficiencyModal, setShowDeficiencyModal] = useState(false);
  const [reuploading, setReuploading] = useState(false);
  const [revisedDocs, setRevisedDocs] = useState<Document[]>([]);

  useEffect(() => {
    if (appId) {
      mockApi.getApplicationById(appId).then((data) => {
        setApp(data);
        setLoading(false);
      });
    }
  }, [appId]);

  if (loading || !app) {
    return <div className="p-8 text-center text-xs text-slate-500">Loading application details...</div>;
  }

  const handleSimulateReupload = () => {
    setReuploading(true);
    setTimeout(() => {
      const newDoc: Document = {
        id: `doc-revised-${Date.now()}`,
        type: 'Income Certificate',
        fileName: 'Income_Certificate_2025_26_REVISED.pdf',
        fileSize: '1.1 MB',
        uploadedAt: new Date().toISOString(),
        status: 'pending',
        url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        ocrConfidence: 98,
        ocrFields: [
          { id: 'ocr-r1', field: 'Annual Income', value: 'Rs. 2,40,000', confidence: 99, sourceDocId: 'doc-r1', sourceDocName: 'Income Cert' },
          { id: 'ocr-r2', field: 'Financial Year', value: '2025-26', confidence: 98, sourceDocId: 'doc-r1', sourceDocName: 'Income Cert' }
        ]
      };

      setRevisedDocs([newDoc]);
      setReuploading(false);
      toast.success('Revised Income Certificate Uploaded & OCR Scrutinized');
    }, 600);
  };

  const handleResubmit = async () => {
    if (revisedDocs.length === 0) {
      toast.error('Please upload at least one revised document');
      return;
    }

    const updated = await mockApi.resubmitApplication(app.id, revisedDocs);
    setApp(updated);
    setShowDeficiencyModal(false);
    toast.success('Application Resubmitted to Verification Officer!');
  };

  const downloadReceipt = () => {
    const pdf = new jsPDF();
    pdf.setFont('helvetica', 'bold');
    pdf.text('MINISTRY OF TRIBAL AFFAIRS - SCHOLARSHIP ACKNOWLEDGMENT', 20, 20);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Application ID: ${app.id}`, 20, 35);
    pdf.text(`Scheme Name: ${app.schemeName}`, 20, 45);
    pdf.text(`Candidate Name: ${app.applicantName}`, 20, 55);
    pdf.text(`Current Status: ${app.status.toUpperCase()}`, 20, 65);
    pdf.save(`Receipt_${app.id.replace(/\//g, '_')}.pdf`);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link to="/app/applications" className="inline-flex items-center text-xs font-bold text-slate-600 hover:text-slate-900">
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>Back to My Applications</span>
        </Link>

        <button
          onClick={downloadReceipt}
          className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-[#e8d6ba] hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
        >
          <Download className="w-3.5 h-3.5 mr-1.5" />
          <span>Download PDF Receipt</span>
        </button>
      </div>

      {/* Main Details Card */}
      <div className="bg-white rounded-2xl border border-[#c9b79c] p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#dfcdb1] pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-[#71816d]">App ID: {app.id}</span>
            <h1 className="text-xl font-bold text-slate-900 mt-0.5">{app.schemeName}</h1>
          </div>
          <StatusBadge status={app.status} size="lg" />
        </div>

        {/* Deficiency Banner if Query Raised */}
        {app.status === 'query_raised' && app.deficiency && (
          <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-5 shadow-xs">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-extrabold text-rose-900 text-sm">Action Required: Verification Deficiency</h4>
                <p className="text-xs text-rose-800 mt-1">
                  Raised by: <span className="font-bold">{app.deficiency.raisedBy}</span> on{' '}
                  {new Date(app.deficiency.raisedAt).toLocaleDateString('en-IN')}
                </p>

                <div className="mt-2 bg-white/80 rounded-xl p-3 border border-rose-200 text-xs text-slate-800">
                  <p className="font-bold text-rose-900">Deficiency Items:</p>
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-700">
                    {app.deficiency.reasons.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                  {app.deficiency.note && (
                    <p className="mt-2 text-slate-600 italic">Officer Note: "{app.deficiency.note}"</p>
                  )}
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => setShowDeficiencyModal(true)}
                    className="inline-flex items-center px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs"
                  >
                    <UploadCloud className="w-4 h-4 mr-1.5" />
                    <span>Upload Corrected Documents & Resubmit</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Candidate & Academic Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl bg-[#f1e0c5] border border-[#dfcdb1] space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b pb-1">
              Personal & ST Verification
            </h4>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Full Name:</span>
              <span className="font-bold text-slate-900">{app.personal.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">ST Community:</span>
              <span className="font-bold text-slate-900">{app.personal.tribeName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">State of Domicile:</span>
              <span className="font-bold text-slate-900">{app.address.state}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Annual Income:</span>
              <span className="font-bold text-slate-900">₹{app.personal.annualIncome.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#f1e0c5] border border-[#dfcdb1] space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b pb-1">
              Academic & Bank Details
            </h4>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Institution:</span>
              <span className="font-bold text-slate-900">{app.academic.institutionName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Aggregate Marks:</span>
              <span className="font-bold text-slate-900">{app.academic.percentageOrCgpa}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">A/C Number:</span>
              <span className="font-mono font-bold text-slate-900">{app.bank.accountNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">IFSC Code:</span>
              <span className="font-mono font-bold text-slate-900">{app.bank.ifscCode}</span>
            </div>
          </div>
        </div>

        {/* Documents List */}
        <div>
          <h3 className="font-bold text-slate-900 text-sm mb-3">Uploaded Supporting Documents</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {app.documents.map((doc) => (
              <div key={doc.id} className="p-3.5 rounded-xl bg-[#f1e0c5] border border-[#c9b79c] flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-900">{doc.type}</p>
                  <p className="text-[11px] text-slate-500">{doc.fileName}</p>
                  {doc.ocrConfidence && (
                    <span className="inline-block mt-1 text-[10px] font-bold bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded-xs">
                      OCR Match: {doc.ocrConfidence}%
                    </span>
                  )}
                </div>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-[#71816d] hover:underline"
                >
                  Preview
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resubmit Deficiency Modal */}
      {showDeficiencyModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 border-b pb-2">
              Respond to Deficiency Query
            </h3>

            <div className="p-3 bg-rose-50 rounded-xl text-xs text-rose-900">
              <span className="font-bold">Required Fixes:</span> {app.deficiency?.reasons.join(', ')}
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700">Upload Corrected Document (PDF)</label>
              <button
                onClick={handleSimulateReupload}
                disabled={reuploading}
                className="w-full py-4 border-2 border-dashed border-orange-300 rounded-xl bg-orange-50/50 hover:bg-orange-50 text-center text-xs font-bold text-orange-900 transition-colors"
              >
                <UploadCloud className="w-6 h-6 mx-auto mb-1 text-orange-500" />
                <span>{reuploading ? 'Processing OCR...' : 'Click to Upload Revised Income Certificate'}</span>
              </button>

              {revisedDocs.length > 0 && (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                  <span className="font-bold">{revisedDocs[0].fileName}</span>
                  <span className="bg-emerald-200 text-emerald-950 px-2 py-0.5 rounded-md font-bold text-[10px]">
                    Ready to Resubmit
                  </span>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-[#dfcdb1]">
              <button
                onClick={() => setShowDeficiencyModal(false)}
                className="px-4 py-2 rounded-xl bg-[#e8d6ba] text-slate-700 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleResubmit}
                className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-md"
              >
                Resubmit to Officer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
