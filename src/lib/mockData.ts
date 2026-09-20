import { Scheme, User, Application, AuditLogEntry, AdminStats, MeritCandidate } from '../types';

export const INITIAL_SCHEMES: Scheme[] = [
  {
    id: 'scheme-nfst',
    code: 'NFST',
    name: 'National Fellowship for Higher Education of ST Students',
    category: 'Fellowship',
    description: 'Financial support for Scheduled Tribe (ST) students to pursue higher education leading to M.Phil. and Ph.D. degrees in Indian Universities, Institutes, and Scientific Institutions.',
    window: { start: '2026-07-01', end: '2026-10-31' },
    eligibility: [
      { id: 'e1', field: 'Category', operator: 'eq', value: 'ST' },
      { id: 'e2', field: 'Qualification', operator: 'in', value: ['Post Graduate', 'Master of Science', 'Master of Arts', 'M.Tech', 'M.Sc'] },
      { id: 'e3', field: 'Annual Income', operator: 'lt', value: 600000 },
      { id: 'e4', field: 'Minimum Marks', operator: 'gt', value: 55 }
    ],
    requiredDocs: [
      'ST Caste Certificate (Competent Authority)',
      'Family Income Certificate (Form 16 / Tehsildar)',
      'Post-Graduation Marksheet & Degree Certificate',
      'Ph.D. / M.Phil Admission Letter & Guide Declaration',
      'Aadhaar Card Copy',
      'Bank Passbook First Page'
    ],
    stages: ['Application Submitted', 'Document Verification', 'Academic Scrutiny', 'Selection Committee Merit', 'Disbursement'],
    selectionCriteria: 'hybrid',
    amount: '₹35,000 / month + HRA + Contingency',
    maxScholarshipAmount: 420000,
    totalSlots: 750,
    active: true
  },
  {
    id: 'scheme-nos',
    code: 'NOS',
    name: 'National Overseas Scholarship for ST Students',
    category: 'Overseas Fellowship',
    description: 'Financial assistance to selected ST students for pursuing Master level courses, Ph.D. and Post-Doctoral research abroad in specified fields of study.',
    window: { start: '2026-08-01', end: '2026-11-15' },
    eligibility: [
      { id: 'e5', field: 'Category', operator: 'eq', value: 'ST' },
      { id: 'e6', field: 'Age Limit', operator: 'lt', value: 35 },
      { id: 'e7', field: 'Annual Family Income', operator: 'lt', value: 800000 },
      { id: 'e8', field: 'Minimum PG Marks', operator: 'gt', value: 60 }
    ],
    requiredDocs: [
      'ST Caste Certificate (Govt of India format)',
      'Income Certificate',
      'Valid Indian Passport',
      'Unconditional Offer Letter from Top 500 Foreign University',
      'GRE / TOEFL / IELTS Scorecard',
      'Recommendation Letters (2)'
    ],
    stages: ['Application Submitted', 'Passport & Offer Verification', 'Selection Committee Interview', 'Final Merit List', 'Visa & Sanction Order'],
    selectionCriteria: 'merit',
    amount: 'USD $15,400 / year + Tuition Fee + Air passage',
    maxScholarshipAmount: 1800000,
    totalSlots: 100,
    active: true
  },
  {
    id: 'scheme-tces',
    code: 'TCES',
    name: 'Top Class Education Scheme for ST Students',
    category: 'Higher Education Scholarship',
    description: 'Full financial support for ST students who secure admission in notified premier institutions (IITs, NITs, IIMs, AIIMS, NLUs, etc.) for graduate and postgraduate studies.',
    window: { start: '2026-06-15', end: '2026-10-15' },
    eligibility: [
      { id: 'e9', field: 'Category', operator: 'eq', value: 'ST' },
      { id: 'e10', field: 'Annual Income', operator: 'lt', value: 600000 },
      { id: 'e11', field: 'Institution', operator: 'in', value: ['IIT', 'NIT', 'IIM', 'AIIMS', 'NLU', 'IISER', 'IIIT'] }
    ],
    requiredDocs: [
      'ST Caste Certificate',
      'Income Certificate issued by Revenue Authority',
      'Class 12th / Graduation Marksheet',
      'Institute Fee Structure & Bonafide Certificate',
      'Aadhaar Seeded Bank Account Details'
    ],
    stages: ['Application Submitted', 'Institute Verification', 'District / State Scrutiny', 'MoTA Sanction', 'Disbursement'],
    selectionCriteria: 'need',
    amount: 'Full Tuition Fee up to ₹2.0 Lakhs/yr + Living allowance ₹3,000/mo',
    maxScholarshipAmount: 250000,
    totalSlots: 1000,
    active: true
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-student-1',
    name: 'Priya Naik',
    email: 'student@demo.in',
    phone: '9876543210',
    role: 'applicant',
    createdAt: '2026-08-10T10:00:00Z',
    tribe: 'Gond',
    aadhaar: 'XXXX-XXXX-4921',
    state: 'Odisha'
  },
  {
    id: 'usr-officer-1',
    name: 'Shri Rajesh Kumar',
    email: 'officer@demo.in',
    phone: '9876500001',
    role: 'officer',
    createdAt: '2026-01-15T09:00:00Z'
  },
  {
    id: 'usr-scrutiny-1',
    name: 'Smt. Ananya Das',
    email: 'scrutiny@demo.in',
    phone: '9876500002',
    role: 'officer',
    createdAt: '2026-02-01T09:00:00Z'
  },
  {
    id: 'usr-committee-1',
    name: 'Dr. Meera Sharma',
    email: 'committee@demo.in',
    phone: '9876500003',
    role: 'committee',
    createdAt: '2026-03-01T09:00:00Z'
  },
  {
    id: 'usr-admin-1',
    name: 'Smt. Kavita Rao',
    email: 'admin@demo.in',
    phone: '9876500004',
    role: 'admin',
    createdAt: '2026-01-01T09:00:00Z'
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'NFST/2026/00142',
    applicantId: 'usr-student-1',
    applicantName: 'Priya Naik',
    schemeId: 'scheme-nfst',
    schemeCode: 'NFST',
    schemeName: 'National Fellowship for Higher Education of ST Students',
    status: 'query_raised',
    currentStage: 2,
    submittedAt: '2026-08-15T14:30:00Z',
    lastUpdatedAt: '2026-09-12T11:20:00Z',
    personal: {
      fullName: 'Priya Naik',
      dob: '2001-05-14',
      gender: 'Female',
      category: 'ST',
      tribeName: 'Gond',
      fatherName: 'Sanatana Naik',
      motherName: 'Subhadra Naik',
      aadhaarMasked: 'XXXX-XXXX-4921',
      phone: '9876543210',
      email: 'student@demo.in',
      physicallyHandicapped: 'No',
      annualIncome: 240000
    },
    address: {
      permanentAddress: 'At/PO: Sundargarh Town, Near Bus Stand',
      state: 'Odisha',
      district: 'Sundargarh',
      pincode: '770001',
      domicileCertNo: 'OD-DOM-2024-8849',
      domicileState: 'Odisha'
    },
    academic: {
      highestQualification: 'Master of Science (M.Sc Biotechnology)',
      institutionName: 'Utkal University, Bhubaneswar',
      courseName: 'Ph.D. in Molecular Biology',
      passingYear: '2023',
      percentageOrCgpa: 82.5,
      rollNumber: 'UU/MSC/BIO/2021-42'
    },
    schemeSpecific: {
      researchTopic: 'Genetic diversity and pharmacological potential of endemic medicinal plants in Similipal Biosphere Reserve',
      guideName: 'Dr. Ramesh Chandra Sethi',
      universityDepartment: 'Department of Biotechnology, Utkal University',
      phdRegNo: 'PHD/UTKAL/BIO/2024/0912'
    },
    bank: {
      accountHolderName: 'Priya Naik',
      accountNumber: '30492817492',
      ifscCode: 'SBIN0001234',
      bankName: 'State Bank of India',
      branchName: 'Sundargarh Main Branch'
    },
    documents: [
      {
        id: 'doc-101',
        type: 'ST Caste Certificate',
        fileName: 'Priya_Naik_Caste_Certificate.pdf',
        fileSize: '1.2 MB',
        uploadedAt: '2026-08-15T14:20:00Z',
        status: 'verified',
        url: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        ocrConfidence: 96,
        ocrFields: [
          { id: 'o1', field: 'Candidate Name', value: 'Priya Naik', confidence: 98, sourceDocId: 'doc-101', sourceDocName: 'Caste Cert' },
          { id: 'o2', field: 'Tribe Name', value: 'Gond', confidence: 95, sourceDocId: 'doc-101', sourceDocName: 'Caste Cert' },
          { id: 'o3', field: 'Issuing Officer', value: 'Tehsildar Sundargarh', confidence: 94, sourceDocId: 'doc-101', sourceDocName: 'Caste Cert' }
        ]
      },
      {
        id: 'doc-102',
        type: 'Income Certificate',
        fileName: 'Income_Certificate_2025_26.pdf',
        fileSize: '840 KB',
        uploadedAt: '2026-08-15T14:22:00Z',
        status: 'deficient',
        url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        ocrConfidence: 62,
        ocrFields: [
          { id: 'o4', field: 'Annual Income', value: 'Rs. 4,80,000', confidence: 58, sourceDocId: 'doc-102', sourceDocName: 'Income Cert', isMismatch: true, expectedValue: 'Rs. 2,40,000' },
          { id: 'o5', field: 'Financial Year', value: '2023-24', confidence: 64, sourceDocId: 'doc-102', sourceDocName: 'Income Cert', isMismatch: true, expectedValue: '2025-26 (Expired certificate)' }
        ]
      },
      {
        id: 'doc-103',
        type: 'M.Sc Marksheet',
        fileName: 'MSc_Final_Marksheet.pdf',
        fileSize: '2.1 MB',
        uploadedAt: '2026-08-15T14:25:00Z',
        status: 'verified',
        url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        ocrConfidence: 94,
        ocrFields: [
          { id: 'o6', field: 'Aggregate Percentage', value: '82.5%', confidence: 96, sourceDocId: 'doc-103', sourceDocName: 'Marksheet' },
          { id: 'o7', field: 'University', value: 'Utkal University', confidence: 95, sourceDocId: 'doc-103', sourceDocName: 'Marksheet' }
        ]
      }
    ],
    deficiency: {
      raisedAt: '2026-09-12T11:20:00Z',
      raisedBy: 'Shri Rajesh Kumar (Verification Officer)',
      reasons: ['Expired Income Certificate (FY 2023-24 submitted instead of current FY 2025-26)', 'Annual Income mismatch in document vs application form'],
      note: 'Please upload the latest Income Certificate issued on or after April 1, 2025 by a competent revenue authority.',
      round: 1
    },
    anomalyFlags: ['Income Certificate Financial Year Outdated', 'OCR Confidence < 70%']
  },

  {
    id: 'NOS/2026/00089',
    applicantId: 'usr-student-2',
    applicantName: 'Rajesh Munda',
    schemeId: 'scheme-nos',
    schemeCode: 'NOS',
    schemeName: 'National Overseas Scholarship for ST Students',
    status: 'under_verification',
    currentStage: 2,
    submittedAt: '2026-08-28T09:15:00Z',
    lastUpdatedAt: '2026-09-01T16:00:00Z',
    personal: {
      fullName: 'Rajesh Munda',
      dob: '1998-11-20',
      gender: 'Male',
      category: 'ST',
      tribeName: 'Munda',
      fatherName: 'Birsa Munda',
      motherName: 'Phulo Munda',
      aadhaarMasked: 'XXXX-XXXX-8812',
      phone: '9812345678',
      email: 'rajesh.munda@example.com',
      physicallyHandicapped: 'No',
      annualIncome: 350000
    },
    address: {
      permanentAddress: 'Village Khunti, PO: Khunti',
      state: 'Jharkhand',
      district: 'Khunti',
      pincode: '835210',
      domicileCertNo: 'JH-DOM-2023-1102',
      domicileState: 'Jharkhand'
    },
    academic: {
      highestQualification: 'B.Tech Mining Engineering',
      institutionName: 'IIT (ISM) Dhanbad',
      courseName: 'Master of Science in Sustainable Mining',
      passingYear: '2022',
      percentageOrCgpa: 84.0,
      rollNumber: '18JE0492'
    },
    schemeSpecific: {
      foreignUniversity: 'University of Melbourne, Australia',
      country: 'Australia',
      programName: 'Master of Energy Systems',
      greScore: '320 / 340',
      toeflScore: '105 / 120',
      admissionOfferRef: 'UMELB-ADM-2026-90412'
    },
    bank: {
      accountHolderName: 'Rajesh Munda',
      accountNumber: '40928174910',
      ifscCode: 'SBIN0000842',
      bankName: 'State Bank of India',
      branchName: 'Khunti Main Branch'
    },
    documents: [
      {
        id: 'doc-201',
        type: 'ST Caste Certificate',
        fileName: 'Rajesh_Munda_Caste_Cert.pdf',
        fileSize: '950 KB',
        uploadedAt: '2026-08-28T09:10:00Z',
        status: 'pending',
        url: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        ocrConfidence: 97,
        ocrFields: [
          { id: 'o8', field: 'Candidate Name', value: 'Rajesh Munda', confidence: 99, sourceDocId: 'doc-201', sourceDocName: 'Caste Cert' },
          { id: 'o9', field: 'Tribe', value: 'Munda', confidence: 97, sourceDocId: 'doc-201', sourceDocName: 'Caste Cert' }
        ]
      },
      {
        id: 'doc-202',
        type: 'Foreign Offer Letter',
        fileName: 'UniMelb_Offer_Letter_Unconditional.pdf',
        fileSize: '1.8 MB',
        uploadedAt: '2026-08-28T09:12:00Z',
        status: 'pending',
        url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        ocrConfidence: 92,
        ocrFields: [
          { id: 'o10', field: 'Institution', value: 'University of Melbourne', confidence: 95, sourceDocId: 'doc-202', sourceDocName: 'Offer Letter' },
          { id: 'o11', field: 'Offer Type', value: 'Unconditional Admission', confidence: 91, sourceDocId: 'doc-202', sourceDocName: 'Offer Letter' }
        ]
      }
    ]
  },

  {
    id: 'NFST/2026/00045',
    applicantId: 'usr-student-3',
    applicantName: 'Sunita Soren',
    schemeId: 'scheme-nfst',
    schemeCode: 'NFST',
    schemeName: 'National Fellowship for Higher Education of ST Students',
    status: 'verified',
    currentStage: 3,
    submittedAt: '2026-07-20T11:00:00Z',
    lastUpdatedAt: '2026-09-05T14:15:00Z',
    personal: {
      fullName: 'Sunita Soren',
      dob: '1999-03-25',
      gender: 'Female',
      category: 'ST',
      tribeName: 'Santhal',
      fatherName: 'Mangal Soren',
      motherName: 'Bahamani Soren',
      aadhaarMasked: 'XXXX-XXXX-1940',
      phone: '9777123456',
      email: 'sunita.soren@example.com',
      physicallyHandicapped: 'No',
      annualIncome: 180000
    },
    address: {
      permanentAddress: 'Village Dumka, PO: Dumka',
      state: 'Jharkhand',
      district: 'Dumka',
      pincode: '814101',
      domicileCertNo: 'JH-DOM-2024-0041',
      domicileState: 'Jharkhand'
    },
    academic: {
      highestQualification: 'M.A. Anthropology',
      institutionName: 'Santhal Pargana College, Dumka',
      courseName: 'Ph.D. in Indigenous Culture Studies',
      passingYear: '2022',
      percentageOrCgpa: 78.4,
      rollNumber: 'SKMU/MA/ANT/19-04'
    },
    schemeSpecific: {
      researchTopic: 'Documentation of traditional oral literature and rituals among Santhal tribes of Chota Nagpur',
      guideName: 'Prof. Hemant Soren',
      universityDepartment: 'Dept of Tribal Studies, Ranchi University',
      phdRegNo: 'RU/PHD/TRIBAL/2023/104'
    },
    bank: {
      accountHolderName: 'Sunita Soren',
      accountNumber: '20938419201',
      ifscCode: 'SBIN0000482',
      bankName: 'State Bank of India',
      branchName: 'Dumka Main Branch'
    },
    documents: [],
    verifiedBy: 'Shri Rajesh Kumar',
    verifiedAt: '2026-09-05T14:15:00Z'
  },

  {
    id: 'TCES/2026/00210',
    applicantId: 'usr-student-4',
    applicantName: 'Rameshwar Gond',
    schemeId: 'scheme-tces',
    schemeCode: 'TCES',
    schemeName: 'Top Class Education Scheme for ST Students',
    status: 'selected',
    currentStage: 4,
    submittedAt: '2026-06-25T16:00:00Z',
    lastUpdatedAt: '2026-09-10T09:30:00Z',
    personal: {
      fullName: 'Rameshwar Gond',
      dob: '2003-08-12',
      gender: 'Male',
      category: 'ST',
      tribeName: 'Gond',
      fatherName: 'Jagdish Gond',
      motherName: 'Lata Gond',
      aadhaarMasked: 'XXXX-XXXX-3341',
      phone: '9432109876',
      email: 'rameshwar.gond@example.com',
      physicallyHandicapped: 'No',
      annualIncome: 120000
    },
    address: {
      permanentAddress: 'At/PO: Jagdalpur, Bastar',
      state: 'Chhattisgarh',
      district: 'Bastar',
      pincode: '494001',
      domicileCertNo: 'CG-DOM-2023-9941',
      domicileState: 'Chhattisgarh'
    },
    academic: {
      highestQualification: 'Class 12th Senior Secondary',
      institutionName: 'IIT Kharagpur',
      courseName: 'B.Tech Computer Science & Engineering',
      passingYear: '2024',
      percentageOrCgpa: 94.2,
      rollNumber: '24CS10094'
    },
    schemeSpecific: {
      instituteName: 'Indian Institute of Technology Kharagpur',
      courseFeeYearly: 225000
    },
    bank: {
      accountHolderName: 'Rameshwar Gond',
      accountNumber: '50912839410',
      ifscCode: 'SBIN0000202',
      bankName: 'State Bank of India',
      branchName: 'IIT Kharagpur Campus'
    },
    documents: [],
    score: 96.5
  },

  {
    id: 'NFST/2026/00301',
    applicantId: 'usr-student-5',
    applicantName: 'Anita Khadia',
    schemeId: 'scheme-nfst',
    schemeCode: 'NFST',
    schemeName: 'National Fellowship for Higher Education of ST Students',
    status: 'submitted',
    currentStage: 1,
    submittedAt: '2026-09-15T08:45:00Z',
    lastUpdatedAt: '2026-09-15T08:45:00Z',
    personal: {
      fullName: 'Anita Khadia',
      dob: '2000-01-10',
      gender: 'Female',
      category: 'ST',
      tribeName: 'Khadia',
      fatherName: 'Peter Khadia',
      motherName: 'Mary Khadia',
      aadhaarMasked: 'XXXX-XXXX-6602',
      phone: '9123456780',
      email: 'anita.khadia@example.com',
      physicallyHandicapped: 'No',
      annualIncome: 210000
    },
    address: {
      permanentAddress: 'Village Simdega, PO: Simdega',
      state: 'Jharkhand',
      district: 'Simdega',
      pincode: '835223',
      domicileCertNo: 'JH-DOM-2025-0192',
      domicileState: 'Jharkhand'
    },
    academic: {
      highestQualification: 'M.Sc Environmental Science',
      institutionName: 'Central University of Jharkhand',
      courseName: 'Ph.D. Environmental Biology',
      passingYear: '2023',
      percentageOrCgpa: 81.0,
      rollNumber: 'CUJ/MSC/ENV/21-12'
    },
    schemeSpecific: {
      researchTopic: 'Impact of heavy metal mining on water tables in Saranda Forest',
      guideName: 'Dr. S. K. Gupta',
      universityDepartment: 'Dept of Environmental Sciences',
      phdRegNo: 'CUJ/PHD/ENV/2024/02'
    },
    bank: {
      accountHolderName: 'Anita Khadia',
      accountNumber: '10928374829',
      ifscCode: 'SBIN0000101',
      bankName: 'State Bank of India',
      branchName: 'Simdega Branch'
    },
    documents: []
  }
];

// Seed data generated for realistic admin dashboard stats:
const tribes = ['Gond', 'Bhil', 'Santhal', 'Munda', 'Khasi', 'Garo', 'Bodo', 'Oraon', 'Khadia', 'Mizo'];
const states = ['Odisha', 'Jharkhand', 'Chhattisgarh', 'Madhya Pradesh', 'Assam', 'Telangana', 'Rajasthan', 'Manipur', 'Nagaland', 'Kerala'];
const statuses: Array<Application['status']> = ['submitted', 'under_verification', 'query_raised', 'verified', 'scrutinized', 'selected', 'rejected'];

for (let i = 6; i <= 50; i++) {
  const tribe = tribes[i % tribes.length];
  const state = states[i % states.length];
  const status = statuses[i % statuses.length];
  const schemeCode = i % 3 === 0 ? 'NOS' : i % 2 === 0 ? 'TCES' : 'NFST';
  const schemeId = schemeCode === 'NOS' ? 'scheme-nos' : schemeCode === 'TCES' ? 'scheme-tces' : 'scheme-nfst';
  const schemeName = INITIAL_SCHEMES.find(s => s.code === schemeCode)?.name || 'ST Scheme';
  
  INITIAL_APPLICATIONS.push({
    id: `${schemeCode}/2026/00${100 + i}`,
    applicantId: `usr-student-${i}`,
    applicantName: `Applicant ${tribe} ${i}`,
    schemeId,
    schemeCode,
    schemeName,
    status,
    currentStage: status === 'submitted' ? 1 : status === 'under_verification' ? 2 : status === 'verified' ? 3 : status === 'selected' ? 4 : 2,
    submittedAt: `2026-08-${(i % 25) + 1}T10:00:00Z`,
    lastUpdatedAt: `2026-09-${(i % 14) + 1}T12:00:00Z`,
    personal: {
      fullName: `ST Candidate ${i} ${tribe}`,
      dob: '2000-06-15',
      gender: i % 2 === 0 ? 'Female' : 'Male',
      category: 'ST',
      tribeName: tribe,
      fatherName: `Father of Candidate ${i}`,
      motherName: `Mother of Candidate ${i}`,
      aadhaarMasked: `XXXX-XXXX-${1000 + i}`,
      phone: `980000${1000 + i}`,
      email: `candidate${i}@st-setu.gov.in`,
      physicallyHandicapped: 'No',
      annualIncome: 150000 + (i * 8000)
    },
    address: {
      permanentAddress: `District HQ, ${state}`,
      state,
      district: `${state} District ${i % 5}`,
      pincode: `${750000 + i}`,
      domicileCertNo: `${state.substring(0, 2).toUpperCase()}-DOM-2024-${i}90`,
      domicileState: state
    },
    academic: {
      highestQualification: 'Master of Science',
      institutionName: `${state} State University`,
      courseName: 'Ph.D.',
      passingYear: '2023',
      percentageOrCgpa: 70 + (i % 25),
      rollNumber: `ROLL/2023/${i}`
    },
    schemeSpecific: {
      researchTopic: `Research topic sample for candidate ${i}`,
      guideName: `Dr. Guide ${i}`
    },
    bank: {
      accountHolderName: `ST Candidate ${i}`,
      accountNumber: `309182390${i}`,
      ifscCode: 'SBIN0001234',
      bankName: 'State Bank of India',
      branchName: `${state} Main`
    },
    documents: [],
    score: status === 'selected' ? 88 + (i % 10) : undefined
  });
}

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log-1',
    actorId: 'usr-officer-1',
    actorName: 'Shri Rajesh Kumar',
    actorRole: 'Verification Officer',
    action: 'RAISE_DEFICIENCY',
    entityType: 'application',
    entityId: 'NFST/2026/00142',
    timestamp: '2026-09-12T11:20:00Z',
    metadata: { reason: 'Expired Income Certificate (FY 2023-24)' }
  },
  {
    id: 'log-2',
    actorId: 'usr-officer-1',
    actorName: 'Shri Rajesh Kumar',
    actorRole: 'Verification Officer',
    action: 'VERIFY_APPLICATION',
    entityType: 'application',
    entityId: 'NFST/2026/00045',
    timestamp: '2026-09-05T14:15:00Z',
    metadata: { remarks: 'All ST & Academic documents verified against state database' }
  },
  {
    id: 'log-3',
    actorId: 'usr-committee-1',
    actorName: 'Dr. Meera Sharma',
    actorRole: 'Selection Committee',
    action: 'MERIT_SELECTION',
    entityType: 'application',
    entityId: 'TCES/2026/00210',
    timestamp: '2026-09-10T09:30:00Z',
    metadata: { score: 96.5, rank: 1 }
  },
  {
    id: 'log-4',
    actorId: 'usr-admin-1',
    actorName: 'Smt. Kavita Rao',
    actorRole: 'MoTA Admin',
    action: 'CREATE_SCHEME',
    entityType: 'scheme',
    entityId: 'scheme-nfst',
    timestamp: '2026-07-01T00:00:00Z',
    metadata: { schemeCode: 'NFST', activeSlots: 750 }
  }
];

export const INITIAL_ADMIN_STATS: AdminStats = {
  totalApplications: 80,
  pendingVerification: 24,
  verified: 18,
  scrutinized: 12,
  selected: 14,
  rejected: 4,
  deficient: 8,
  disbursed: 10,
  totalFundsDisbursed: 14.8, // Cr INR
  applicationsByDate: [
    { date: 'Aug 15', count: 4 },
    { date: 'Aug 20', count: 8 },
    { date: 'Aug 25', count: 14 },
    { date: 'Aug 30', count: 19 },
    { date: 'Sep 05', count: 15 },
    { date: 'Sep 10', count: 12 },
    { date: 'Sep 15', count: 8 }
  ],
  schemeSplit: [
    { name: 'NFST (Higher Fellowship)', value: 42, color: '#71816d' },
    { name: 'NOS (Overseas Study)', value: 18, color: '#c9b79c' },
    { name: 'TCES (Top Class)', value: 20, color: '#2A9D8F' }
  ],
  stateSplit: [
    { state: 'Odisha', count: 18 },
    { state: 'Jharkhand', count: 16 },
    { state: 'Chhattisgarh', count: 14 },
    { state: 'Madhya Pradesh', count: 12 },
    { state: 'Assam', count: 9 },
    { state: 'Telangana', count: 6 },
    { state: 'Rajasthan', count: 5 }
  ],
  funnelData: [
    { stage: 'Applications Submitted', count: 80, percentage: 100 },
    { stage: 'Document Verification', count: 56, percentage: 70 },
    { stage: 'Scrutiny Cleared', count: 32, percentage: 40 },
    { stage: 'Merit Selected', count: 14, percentage: 17.5 },
    { stage: 'Scholarship Disbursed', count: 10, percentage: 12.5 }
  ],
  deficiencyBreakdown: [
    { reason: 'Expired / Outdated Income Cert', count: 14 },
    { reason: 'Caste Cert Format Issue', count: 8 },
    { reason: 'Illegible Scan / Blur Document', count: 6 },
    { reason: 'Name Mismatch in Aadhaar & Marksheet', count: 5 }
  ],
  anomalies: [
    {
      id: 'NFST/2026/00142',
      applicantName: 'Priya Naik',
      schemeCode: 'NFST',
      reason: 'Income Certificate financial year mismatch (2023-24 submitted instead of 2025-26)',
      severity: 'High'
    },
    {
      id: 'NOS/2026/00089',
      applicantName: 'Rajesh Munda',
      schemeCode: 'NOS',
      reason: 'Passport expiration date within 6 months of course start date',
      severity: 'Medium'
    },
    {
      id: 'NFST/2026/00312',
      applicantName: 'ST Candidate 12 Bhil',
      schemeCode: 'NFST',
      reason: 'Duplicate Aadhaar registration flag across two state portals',
      severity: 'High'
    }
  ]
};
