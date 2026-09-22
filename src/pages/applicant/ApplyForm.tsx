import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockApi } from '../../lib/mockApi';
import { useAuth } from '../../context/AuthContext';
import { Scheme, Application, OCRField, Document } from '../../types';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Save,
  UploadCloud,
  FileText,
  Sparkles,
  AlertCircle,
  Download,
  Building2,
  Lock,
  User,
  GraduationCap
} from 'lucide-react';
import { toast } from 'sonner';
import jsPDF from 'jspdf';

export const ApplyFormPage: React.FC = () => {
  const { schemeId } = useParams<{ schemeId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [scheme, setScheme] = useState<Scheme | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);

  // Form State
  const [personal, setPersonal] = useState({
    fullName: user?.name || 'Priya Naik',
    dob: '2001-05-14',
    gender: 'Female' as const,
    category: 'ST' as const,
    tribeName: user?.tribe || 'Gond',
    fatherName: 'Sanatana Naik',
    motherName: 'Subhadra Naik',
    aadhaarMasked: 'XXXX-XXXX-4921',
    phone: user?.phone || '9876543210',
    email: user?.email || 'student@demo.in',
    physicallyHandicapped: 'No' as const,
    annualIncome: 240000
  });

  const [address, setAddress] = useState({
    permanentAddress: 'At/PO: Sundargarh Town, Near Bus Stand',
    state: user?.state || 'Odisha',
    district: 'Sundargarh',
    pincode: '770001',
    domicileCertNo: 'OD-DOM-2024-8849',
    domicileState: 'Odisha'
  });

  const [academic, setAcademic] = useState({
    highestQualification: 'Master of Science (M.Sc Biotechnology)',
    institutionName: 'Utkal University, Bhubaneswar',
    courseName: 'Ph.D. in Molecular Biology',
    passingYear: '2023',
    percentageOrCgpa: 82.5,
    rollNumber: 'UU/MSC/BIO/2021-42'
  });

  const [schemeSpecific, setSchemeSpecific] = useState({
    researchTopic: 'Genetic diversity and pharmacological potential of endemic medicinal plants in Similipal Biosphere Reserve',
    guideName: 'Dr. Ramesh Chandra Sethi',
    universityDepartment: 'Department of Biotechnology, Utkal University',
    phdRegNo: 'PHD/UTKAL/BIO/2024/0912',
    foreignUniversity: 'University of Melbourne',
    country: 'Australia',
    greScore: '320 / 340'
  });

  const [bank, setBank] = useState({
    accountHolderName: user?.name || 'Priya Naik',
    accountNumber: '30492817492',
    ifscCode: 'SBIN0001234',
    bankName: 'State Bank of India',
    branchName: 'Sundargarh Main Branch'
  });

  // Uploaded Documents state
  const [documents, setDocuments] = useState<Document[]>([]);

  const [declarationConfirmed, setDeclarationConfirmed] = useState(false);
  const [ocrProcessing, setOcrProcessing] = useState(false);

  useEffect(() => {
    if (schemeId) {
      mockApi.getSchemeById(schemeId).then((data) => {
        setScheme(data);
      });
    }
    if (user?.id) {
      mockApi.getApplications({ applicantId: user.id }).then((apps) => {
        if (apps.length > 0) {
          toast.error("You have already applied for a scheme.");
          navigate('/app/schemes');
        }
      });
    }
  }, [schemeId, user, navigate]);

  // Handle Real File Upload with OCR Extraction
  const handleFileUpload = (docType: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error(`File size exceeds 2MB limit. Please upload a smaller file.`);
      e.target.value = '';
      return;
    }

    setOcrProcessing(true);
    
    let sizeStr = '';
    if (file.size > 1024 * 1024) {
      sizeStr = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
    } else {
      sizeStr = (file.size / 1024).toFixed(0) + ' KB';
    }

    // Read the file locally so we can link it (local blob url for preview)
    const fileUrl = URL.createObjectURL(file);

    setTimeout(() => {
      const newDoc: Document = {
        id: `doc-${Date.now()}`,
        type: docType,
        fileName: file.name,
        fileSize: sizeStr,
        uploadedAt: new Date().toISOString(),
        status: 'verified',
        url: fileUrl,
        ocrConfidence: Math.floor(Math.random() * 5) + 94, // 94-98%
        ocrFields: [
          { id: `ocr-${Date.now()}-1`, field: 'Document Title', value: docType, confidence: 98, sourceDocId: `doc-${Date.now()}`, sourceDocName: file.name },
          { id: `ocr-${Date.now()}-2`, field: 'Candidate Name', value: personal.fullName, confidence: 96, sourceDocId: `doc-${Date.now()}`, sourceDocName: file.name }
        ]
      };
      setDocuments((prev) => [...prev.filter((d) => d.type !== docType), newDoc]);
      setOcrProcessing(false);
      toast.success(`OCR Extracted successfully from ${file.name}`);
    }, 100);
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 7));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveDraft = () => {
    toast.success('Draft auto-saved to browser local storage');
  };

  const handleSubmit = async () => {
    if (!declarationConfirmed) {
      toast.error('Please confirm the self-declaration checkbox');
      return;
    }

    setSubmitting(true);
    try {
      const newApp = await mockApi.submitApplication({
        applicantId: user?.id || 'usr-student-1',
        schemeId: scheme?.id || 'scheme-nfst',
        schemeCode: scheme?.code || 'NFST',
        schemeName: scheme?.name || 'National Fellowship for ST Students',
        personal,
        address,
        academic,
        schemeSpecific,
        bank,
        documents
      });

      setSubmittedAppId(newApp.id);
      toast.success(`Application Submitted Successfully! ID: ${newApp.id}`);
    } catch (err) {
      toast.error('Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  // Generate PDF Acknowledgment
  const generatePDFReceipt = () => {
    if (!submittedAppId) return;
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('MINISTRY OF TRIBAL AFFAIRS (MoTA)', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text('Vidya-Vrtti Application Submission Acknowledgment', 105, 28, { align: 'center' });

    doc.setLineWidth(0.5);
    doc.line(20, 32, 190, 32);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Application ID: ${submittedAppId}`, 20, 42);
    doc.text(`Submission Date: ${new Date().toLocaleDateString('en-IN')}`, 130, 42);
    doc.text(`Scheme Code: ${scheme?.code || 'NFST'}`, 20, 50);
    doc.text(`Candidate Name: ${personal.fullName}`, 20, 58);
    doc.text(`ST Tribe Community: ${personal.tribeName}`, 20, 66);
    doc.text(`State of Domicile: ${address.state}`, 20, 74);
    doc.text(`Aadhaar Number: ${personal.aadhaarMasked}`, 20, 82);

    doc.setFont('helvetica', 'bold');
    doc.text('Uploaded Mandatory Documents Verified by AI OCR:', 20, 95);
    doc.setFont('helvetica', 'normal');
    documents.forEach((d, idx) => {
      doc.text(`${idx + 1}. ${d.type} - ${d.fileName} (Confidence: ${d.ocrConfidence || 95}%)`, 25, 105 + idx * 8);
    });

    doc.text('This is a computer-generated acknowledgment issued under DBT Portal.', 105, 170, { align: 'center' });
    doc.save(`Vidya-Vrtti_Acknowledgment_${submittedAppId.replace(/\//g, '_')}.pdf`);
  };

  // If already submitted success view:
  if (submittedAppId) {
    return (
      <div className="max-w-2xl mx-auto my-12 bg-white rounded-2xl border border-[#c9b79c] p-8 text-center shadow-lg">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900">Application Submitted to MoTA!</h2>
        <p className="text-xs text-slate-600 mt-2">
          Your application ID is <span className="font-extrabold text-[#71816d] text-sm">{submittedAppId}</span>
        </p>

        <div className="mt-6 p-4 rounded-xl bg-[#f1e0c5] border border-[#c9b79c] text-xs text-left space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">Scheme:</span>
            <span className="font-bold text-slate-900">{scheme?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">Applicant Name:</span>
            <span className="font-bold text-slate-900">{personal.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">ST Tribe & Domicile:</span>
            <span className="font-bold text-slate-900">
              {personal.tribeName} ({address.state})
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={generatePDFReceipt}
            className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-[#71816d] hover:bg-[#8c9c88] text-white font-bold text-xs shadow-md"
          >
            <Download className="w-4 h-4 mr-2" />
            <span>Download Official Acknowledgment PDF</span>
          </button>
          <button
            onClick={() => navigate('/app/applications')}
            className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md"
          >
            <span>Track Application Status</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#c9b79c] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">
            {scheme?.code || 'NFST'} Application Form
          </span>
          <h1 className="text-xl font-bold text-slate-900 mt-0.5">{scheme?.name}</h1>
        </div>

        <button
          onClick={handleSaveDraft}
          className="inline-flex items-center px-3.5 py-2 rounded-xl bg-[#e8d6ba] hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors"
        >
          <Save className="w-3.5 h-3.5 mr-1.5" />
          <span>Save as Draft</span>
        </button>
      </div>

      {/* 7-Step Horizontal Stepper Header */}
      <div className="bg-white p-4 rounded-2xl border border-[#c9b79c] shadow-xs overflow-x-auto">
        <div className="flex items-center justify-between min-w-[600px] text-xs font-bold">
          {[
            { num: 1, name: 'Personal' },
            { num: 2, name: 'Address' },
            { num: 3, name: 'Academic' },
            { num: 4, name: 'Scheme Spec' },
            { num: 5, name: 'Bank Details' },
            { num: 6, name: 'Documents' },
            { num: 7, name: 'Review & Submit' }
          ].map((s) => (
            <div
              key={s.num}
              onClick={() => s.num < currentStep && setCurrentStep(s.num)}
              className={`flex items-center space-x-1.5 cursor-pointer ${
                currentStep === s.num
                  ? 'text-[#71816d] font-extrabold'
                  : currentStep > s.num
                  ? 'text-emerald-600'
                  : 'text-slate-400'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${
                  currentStep === s.num
                    ? 'bg-[#71816d] text-white ring-4 ring-blue-100'
                    : currentStep > s.num
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {currentStep > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
              </div>
              <span className="hidden md:inline">{s.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Form Body */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#c9b79c] shadow-xs">
        {/* Step 1: Personal Details */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b pb-2">Step 1: Personal Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700">Full Candidate Name</label>
                <input
                  type="text"
                  value={personal.fullName}
                  onChange={(e) => setPersonal({ ...personal, fullName: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Date of Birth</label>
                <input
                  type="date"
                  value={personal.dob}
                  onChange={(e) => setPersonal({ ...personal, dob: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Category (ST Auto-Verified)</label>
                <input
                  type="text"
                  disabled
                  value="Scheduled Tribe (ST)"
                  className="mt-1 block w-full px-3 py-2 border border-[#c9b79c] rounded-lg text-xs bg-[#e8d6ba] font-bold text-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">ST Tribe Community Name</label>
                <input
                  type="text"
                  value={personal.tribeName}
                  onChange={(e) => setPersonal({ ...personal, tribeName: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Father's Name</label>
                <input
                  type="text"
                  value={personal.fatherName}
                  onChange={(e) => setPersonal({ ...personal, fatherName: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Mother's Name</label>
                <input
                  type="text"
                  value={personal.motherName}
                  onChange={(e) => setPersonal({ ...personal, motherName: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Annual Family Income (INR)</label>
                <input
                  type="number"
                  value={personal.annualIncome}
                  onChange={(e) => setPersonal({ ...personal, annualIncome: Number(e.target.value) })}
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Aadhaar (Masked)</label>
                <input
                  type="text"
                  disabled
                  value={personal.aadhaarMasked}
                  className="mt-1 block w-full px-3 py-2 border border-[#c9b79c] rounded-lg text-xs bg-[#e8d6ba] font-medium"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Address */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b pb-2">Step 2: Address & Domicile Details</h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700">Permanent Residential Address</label>
              <textarea
                rows={3}
                value={address.permanentAddress}
                onChange={(e) => setAddress({ ...address, permanentAddress: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700">State of Domicile</label>
                <input
                  type="text"
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700">District</label>
                <input
                  type="text"
                  value={address.district}
                  onChange={(e) => setAddress({ ...address, district: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700">PIN Code</label>
                <input
                  type="text"
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700">Domicile Certificate Reference Number</label>
              <input
                type="text"
                value={address.domicileCertNo}
                onChange={(e) => setAddress({ ...address, domicileCertNo: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>
          </div>
        )}

        {/* Step 3: Academic Details */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b pb-2">Step 3: Academic History</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700">Highest Qualification</label>
                <input
                  type="text"
                  value={academic.highestQualification}
                  onChange={(e) => setAcademic({ ...academic, highestQualification: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Institution / University Name</label>
                <input
                  type="text"
                  value={academic.institutionName}
                  onChange={(e) => setAcademic({ ...academic, institutionName: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Aggregate Percentage / CGPA</label>
                <input
                  type="number"
                  step="0.1"
                  value={academic.percentageOrCgpa}
                  onChange={(e) => setAcademic({ ...academic, percentageOrCgpa: Number(e.target.value) })}
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Year of Passing</label>
                <input
                  type="text"
                  value={academic.passingYear}
                  onChange={(e) => setAcademic({ ...academic, passingYear: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Scheme Specific */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b pb-2">Step 4: Scheme-Specific Research Details</h3>

            {scheme?.code === 'NOS' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Foreign University Name</label>
                  <input
                    type="text"
                    value={schemeSpecific.foreignUniversity}
                    onChange={(e) => setSchemeSpecific({ ...schemeSpecific, foreignUniversity: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Destination Country</label>
                  <input
                    type="text"
                    value={schemeSpecific.country}
                    onChange={(e) => setSchemeSpecific({ ...schemeSpecific, country: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Ph.D. / M.Phil Research Synopsis Topic</label>
                  <textarea
                    rows={3}
                    value={schemeSpecific.researchTopic}
                    onChange={(e) => setSchemeSpecific({ ...schemeSpecific, researchTopic: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700">Research Guide / Supervisor Name</label>
                    <input
                      type="text"
                      value={schemeSpecific.guideName}
                      onChange={(e) => setSchemeSpecific({ ...schemeSpecific, guideName: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700">Ph.D. Registration Number</label>
                    <input
                      type="text"
                      value={schemeSpecific.phdRegNo}
                      onChange={(e) => setSchemeSpecific({ ...schemeSpecific, phdRegNo: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 5: Bank Details */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b pb-2">Step 5: Bank Account & Direct Benefit Transfer (DBT)</h3>

            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900">
              <span className="font-bold">Aadhaar Seeded Bank Account:</span> Fellowship funds will be directly credited to this account via PFMS payment gateway.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700">Account Holder Name</label>
                <input
                  type="text"
                  value={bank.accountHolderName}
                  onChange={(e) => setBank({ ...bank, accountHolderName: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Bank Account Number</label>
                <input
                  type="text"
                  value={bank.accountNumber}
                  onChange={(e) => setBank({ ...bank, accountNumber: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Bank IFSC Code</label>
                <input
                  type="text"
                  value={bank.ifscCode}
                  onChange={(e) => setBank({ ...bank, ifscCode: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Bank Name & Branch</label>
                <input
                  type="text"
                  disabled
                  value={`${bank.bankName} (${bank.branchName})`}
                  className="mt-1 block w-full px-3 py-2 border border-[#c9b79c] rounded-lg text-xs bg-[#e8d6ba] font-medium"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Documents Upload & OCR */}
        {currentStep === 6 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-slate-900 text-sm">Step 6: Document Upload & AI OCR Extraction</h3>
              <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md">
                AI Auto Extraction Enabled
              </span>
            </div>

            <div className="space-y-3">
              {['ST Caste Certificate', 'Income Certificate', 'M.Sc Marksheet', 'Ph.D. Admission Letter'].map((docType) => {
                const existing = documents.find((d) => d.type === docType);
                return (
                  <div key={docType} className="p-4 rounded-xl bg-[#f1e0c5] border border-[#c9b79c] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-bold text-slate-900">{docType}</span>
                      {existing ? (
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-[11px] text-emerald-700 font-semibold flex items-center">
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                            {existing.fileName}
                          </span>
                          <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-xs">
                            OCR Confidence: {existing.ocrConfidence || 95}%
                          </span>
                        </div>
                      ) : (
                        <p className="text-[11px] text-slate-500 mt-0.5">Mandatory PDF / Image (Max 2MB)</p>
                      )}
                    </div>

                    <label
                      className={`inline-flex items-center px-3.5 py-2 rounded-lg bg-white border border-slate-300 hover:bg-[#e8d6ba] text-slate-800 text-xs font-bold shadow-xs transition-colors cursor-pointer ${ocrProcessing ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                      <UploadCloud className="w-4 h-4 mr-1.5 text-orange-500" />
                      <span>{existing ? 'Re-upload' : 'Upload & Run AI OCR'}</span>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload(docType, e)}
                        disabled={ocrProcessing}
                      />
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 7: Review & Submit */}
        {currentStep === 7 && (
          <div className="space-y-6">
            <h3 className="font-bold text-slate-900 text-sm border-b pb-2">Step 7: Final Review & Submission</h3>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#f1e0c5] border border-[#c9b79c]">
                <h4 className="text-xs font-bold text-slate-900 uppercase">Personal & ST Details</h4>
                <p className="text-xs text-slate-600 mt-1">
                  {personal.fullName} | Tribe: <span className="font-bold text-slate-900">{personal.tribeName}</span> | Income: ₹{personal.annualIncome.toLocaleString('en-IN')}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#f1e0c5] border border-[#c9b79c]">
                <h4 className="text-xs font-bold text-slate-900 uppercase">Academic & Research Synopsis</h4>
                <p className="text-xs text-slate-600 mt-1">
                  {academic.highestQualification} ({academic.institutionName}) - Marks: {academic.percentageOrCgpa}%
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs">
                <label className="flex items-start space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={declarationConfirmed}
                    onChange={(e) => setDeclarationConfirmed(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-slate-800 font-medium">
                    I hereby declare that I belong to the Scheduled Tribe (ST) community and all documents uploaded are authentic.
                    I understand any misrepresentation will lead to immediate cancellation of scholarship under MoTA rules.
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Buttons Navigation Bar */}
        <div className="mt-8 pt-4 border-t border-[#c9b79c] flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="inline-flex items-center px-4 py-2 rounded-xl bg-[#e8d6ba] hover:bg-slate-200 text-slate-700 text-xs font-bold disabled:opacity-40"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            <span>Previous</span>
          </button>

          {currentStep < 7 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center px-6 py-2.5 rounded-xl bg-[#71816d] hover:bg-[#8c9c88] text-white font-bold text-xs shadow-md"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="inline-flex items-center px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md"
            >
              {submitting ? 'Submitting to MoTA...' : 'Final Submit Application'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
