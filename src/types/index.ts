export type Role = 'applicant' | 'admin' | 'officer' | 'committee' | 'institute';

export type ApplicationStatus =
  | 'draft'
  | 'submitted'
  | 'under_verification'
  | 'query_raised'
  | 'verified'
  | 'scrutinized'
  | 'selected'
  | 'rejected'
  | 'disbursed';

export interface User {
  id: string;
  loginId?: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  createdAt: string;
  tribe?: string;
  aadhaar?: string;
  state?: string;
  avatar?: string;
}

export interface EligibilityRule {
  id?: string;
  field: string;
  operator: 'eq' | 'lt' | 'gt' | 'in' | 'range';
  value: string | number | string[];
  logic?: 'AND' | 'OR';
}

export interface Scheme {
  id: string;
  code: 'NFST' | 'NOS' | 'TCES' | string;
  name: string;
  description: string;
  category: string;
  window: { start: string; end: string };
  eligibility: EligibilityRule[];
  requiredDocs: string[];
  stages: string[];
  selectionCriteria: 'merit' | 'need' | 'hybrid';
  amount: string;
  maxScholarshipAmount: number;
  totalSlots: number;
  active: boolean;
}

export interface PersonalDetails {
  fullName: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  category: 'ST';
  tribeName: string;
  fatherName: string;
  motherName: string;
  aadhaarMasked: string;
  phone: string;
  email: string;
  physicallyHandicapped: 'Yes' | 'No';
  annualIncome: number;
}

export interface AddressDetails {
  permanentAddress: string;
  state: string;
  district: string;
  pincode: string;
  domicileCertNo: string;
  domicileState: string;
}

export interface AcademicDetails {
  highestQualification: string;
  institutionName: string;
  courseName: string;
  passingYear: string;
  percentageOrCgpa: number;
  rollNumber: string;
}

export interface BankDetails {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  branchName: string;
  passbookDocId?: string;
}

export interface OCRField {
  id: string;
  field: string;
  value: string;
  confidence: number; // 0 - 100
  sourceDocId: string;
  sourceDocName: string;
  pageNumber?: number;
  isMismatch?: boolean;
  expectedValue?: string;
}

export interface Document {
  id: string;
  type: string; // 'caste_cert' | 'income_cert' | 'marksheet' | 'admission_letter' | 'passport' | 'passbook'
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  status: 'pending' | 'verified' | 'deficient';
  url: string; // Data URL or mock preview image
  ocrConfidence?: number;
  ocrFields?: OCRField[];
}

export interface Deficiency {
  raisedAt: string;
  raisedBy: string;
  reasons: string[];
  note?: string;
  resolvedAt?: string;
  round: number;
  resubmittedDocs?: string[];
}

export interface Application {
  id: string;
  applicantId: string;
  applicantLoginId?: string;
  applicantName: string;
  schemeId: string;
  schemeCode: string;
  schemeName: string;
  status: ApplicationStatus;
  currentStage: number; // 1: Submitted, 2: Verification, 3: Scrutiny, 4: Selection, 5: Disbursed
  submittedAt: string;
  lastUpdatedAt: string;
  personal: PersonalDetails;
  address: AddressDetails;
  academic: AcademicDetails;
  schemeSpecific: Record<string, any>;
  bank: BankDetails;
  documents: Document[];
  ocrFields?: OCRField[];
  deficiency?: Deficiency;
  deficiencyHistory?: Deficiency[];
  score?: number;
  remarks?: string;
  verifiedBy?: string;
  verifiedAt?: string;
  anomalyFlags?: string[];
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface AuditLogEntry {
  id: string;
  actorId: string;
  actorName: string;
  actorRole: string;
  action: string;
  entityType: 'application' | 'scheme' | 'user' | 'deficiency' | 'merit';
  entityId: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface AdminStats {
  totalApplications: number;
  pendingVerification: number;
  verified: number;
  scrutinized: number;
  selected: number;
  rejected: number;
  deficient: number;
  disbursed: number;
  totalFundsDisbursed: number; // in INR Cr
  applicationsByDate: Array<{ date: string; count: number }>;
  schemeSplit: Array<{ name: string; value: number; color: string }>;
  stateSplit: Array<{ state: string; count: number }>;
  funnelData: Array<{ stage: string; count: number; percentage: number }>;
  deficiencyBreakdown: Array<{ reason: string; count: number }>;
  anomalies: Array<{ id: string; applicantName: string; schemeCode: string; reason: string; severity: 'High' | 'Medium' | 'Low' }>;
  disbursements: {
    total: string;
    monthlyTrend: Array<{ month: string; amount: number }>;
    schemeSplit: Array<{ scheme: string; amount: string }>;
    pending: number;
  };
  topPerformers: {
    states: Array<{ name: string; count: number }>;
    institutes: Array<{ name: string; count: number }>;
    officers: Array<{ name: string; count: number }>;
    bottomOfficers: Array<{ name: string; reason: string }>;
  };
  activityFeed: Array<{
    id: string;
    message: string;
    timestamp: string;
    type: 'approval' | 'deficiency' | 'submission' | 'merit' | 'disbursement';
  }>;
  schemePerformance: Array<{
    scheme: string;
    applications: number;
    pending: number;
    verified: number;
    selected: number;
    disbursedAmount: string;
    avgProcessingTimeDays: number;
  }>;
}

export interface MeritCandidate {
  applicationId: string;
  applicantName: string;
  schemeCode: string;
  state: string;
  academicScore: number;
  incomeWeightage: number;
  researchProposalScore?: number;
  totalScore: number;
  rank: number;
  status: 'Selected' | 'Waitlisted' | 'Under Review';
}
