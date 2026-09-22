import {
  Scheme,
  User,
  Application,
  AuditLogEntry,
  AdminStats,
  Notification,
  MeritCandidate,
  OCRField,
  Document
} from '../types';
import {
  INITIAL_SCHEMES,
  INITIAL_USERS,
  INITIAL_APPLICATIONS,
  INITIAL_AUDIT_LOGS,
  INITIAL_ADMIN_STATS
} from './mockData';

const STORAGE_KEYS = {
  SCHEMES: 'st_setu_schemes',
  USERS: 'st_setu_users',
  APPLICATIONS: 'st_setu_applications',
  AUDIT_LOGS: 'st_setu_audit_logs',
  NOTIFICATIONS: 'st_setu_notifications',
  CURRENT_USER: 'st_setu_current_user'
};

/**
 * ==========================================
 * 🛠 DEVELOPER INTEGRATION GUIDE
 * ==========================================
 * This file currently serves as the frontend API layer, handling data via local storage.
 * To connect your real backend API (Django, Node.js, Spring, etc.):
 * 
 * 1. Replace the `getStoredData` calls below with real `axios` or `fetch` requests.
 * 2. Example: 
 *    async getSchemes(): Promise<Scheme[]> {
 *       const response = await axios.get('https://api.yourdomain.com/schemes');
 *       return response.data;
 *    }
 * 3. Keep the function names and return types the same so the UI components don't break.
 * ==========================================
 */

// Helper latency delay removed to make it fast
const delay = (ms = 0) => new Promise((resolve) => setTimeout(resolve, 0));

// Helper initializer
const getStoredData = <T>(key: string, initialValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (err) {
    console.error(`Error reading ${key} from localStorage`, err);
    return initialValue;
  }
};

const setStoredData = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing ${key} to localStorage`, err);
  }
};

// Initialize localStorage if empty
if (!localStorage.getItem(STORAGE_KEYS.SCHEMES)) {
  setStoredData(STORAGE_KEYS.SCHEMES, INITIAL_SCHEMES);
}
if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
  setStoredData(STORAGE_KEYS.USERS, INITIAL_USERS);
}
if (!localStorage.getItem(STORAGE_KEYS.APPLICATIONS)) {
  setStoredData(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
}
if (!localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS)) {
  setStoredData(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
}
if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
  const initialNotifications: Notification[] = [
    {
      id: 'notif-1',
      userId: 'usr-student-1',
      title: 'Action Required: Deficiency Raised',
      message: 'Verification officer raised a query regarding your Income Certificate for NFST/2026/00142.',
      type: 'warning',
      read: false,
      link: '/app/applications/NFST/2026/00142',
      createdAt: '2026-09-12T11:20:00Z'
    },
    {
      id: 'notif-2',
      userId: 'usr-student-1',
      title: 'Application Received',
      message: 'Your application NFST/2026/00142 has been successfully submitted to MoTA.',
      type: 'info',
      read: true,
      link: '/app/applications/NFST/2026/00142',
      createdAt: '2026-08-15T14:30:00Z'
    }
  ];
  setStoredData(STORAGE_KEYS.NOTIFICATIONS, initialNotifications);
}

export const mockApi = {
  // Auth API
  async login(identifier: string, role?: string): Promise<{ user: User; token: string }> {
    await delay(300);
    const users = getStoredData<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
    let user = users.find((u) => u.email.toLowerCase() === identifier.toLowerCase() || u.loginId?.toLowerCase() === identifier.toLowerCase());

    if (!user) {
      // Return a demo user based on role or fallback
      user = {
        id: `usr-demo-${Date.now()}`,
        loginId: `ST-${Math.floor(100000 + Math.random() * 900000)}`,
        name: role === 'officer' ? 'Shri Rajesh Kumar' : role === 'admin' ? 'Smt. Kavita Rao' : role === 'committee' ? 'Dr. Meera Sharma' : 'Demo Student',
        email: identifier.includes('@') ? identifier : 'demo@vidya-vrtti.gov.in',
        phone: '9876543210',
        role: (role as User['role']) || 'applicant',
        createdAt: new Date().toISOString()
      };
    }

    setStoredData(STORAGE_KEYS.CURRENT_USER, user);
    return { user, token: `jwt-token-${user.id}` };
  },

  async register(data: Partial<User>): Promise<User> {
    await delay(400);
    const users = getStoredData<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
    
    // Generate a unique 6-digit alphanumeric ID
    const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
    const loginId = `ST-${randomSuffix}`;

    const newUser: User = {
      id: `usr-${Date.now()}`,
      loginId,
      name: data.name || 'New User',
      email: data.email || 'user@demo.in',
      phone: data.phone || '9876543210',
      role: data.role || 'applicant',
      tribe: data.tribe || 'Gond',
      aadhaar: data.aadhaar || 'XXXX-XXXX-9921',
      state: data.state || 'Odisha',
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    setStoredData(STORAGE_KEYS.USERS, users);
    setStoredData(STORAGE_KEYS.CURRENT_USER, newUser);
    return newUser;
  },

  getCurrentUser(): User | null {
    return getStoredData<User | null>(STORAGE_KEYS.CURRENT_USER, INITIAL_USERS[0]);
  },

  setCurrentUser(user: User): void {
    setStoredData(STORAGE_KEYS.CURRENT_USER, user);
  },

  // Schemes API
  async getSchemes(): Promise<Scheme[]> {
    await delay(200);
    return getStoredData<Scheme[]>(STORAGE_KEYS.SCHEMES, INITIAL_SCHEMES);
  },

  async getSchemeById(id: string): Promise<Scheme | null> {
    await delay(200);
    const schemes = getStoredData<Scheme[]>(STORAGE_KEYS.SCHEMES, INITIAL_SCHEMES);
    return schemes.find((s) => s.id === id || s.code === id) || null;
  },

  async createScheme(schemeData: Partial<Scheme>): Promise<Scheme> {
    await delay(400);
    const schemes = getStoredData<Scheme[]>(STORAGE_KEYS.SCHEMES, INITIAL_SCHEMES);
    const newScheme: Scheme = {
      id: `scheme-${Date.now()}`,
      code: schemeData.code || 'CUSTOM',
      name: schemeData.name || 'New ST Scheme',
      description: schemeData.description || 'Description of the scheme',
      category: schemeData.category || 'Scholarship',
      window: schemeData.window || { start: '2026-09-01', end: '2026-12-31' },
      eligibility: schemeData.eligibility || [],
      requiredDocs: schemeData.requiredDocs || ['ST Caste Certificate', 'Income Certificate'],
      stages: schemeData.stages || ['Submitted', 'Verified', 'Selected'],
      selectionCriteria: schemeData.selectionCriteria || 'merit',
      amount: schemeData.amount || '₹50,000 / year',
      maxScholarshipAmount: schemeData.maxScholarshipAmount || 50000,
      totalSlots: schemeData.totalSlots || 500,
      active: true
    };
    schemes.unshift(newScheme);
    setStoredData(STORAGE_KEYS.SCHEMES, schemes);

    await this.logAuditAction('CREATE_SCHEME', 'scheme', newScheme.id, { schemeCode: newScheme.code });
    return newScheme;
  },

  async updateScheme(id: string, schemeData: Partial<Scheme>): Promise<Scheme> {
    await delay(300);
    const schemes = getStoredData<Scheme[]>(STORAGE_KEYS.SCHEMES, INITIAL_SCHEMES);
    const index = schemes.findIndex((s) => s.id === id);
    if (index === -1) throw new Error('Scheme not found');

    schemes[index] = { ...schemes[index], ...schemeData };
    setStoredData(STORAGE_KEYS.SCHEMES, schemes);
    await this.logAuditAction('UPDATE_SCHEME', 'scheme', id, schemeData);
    return schemes[index];
  },

  // Applications API
  async getApplications(filters?: {
    schemeCode?: string;
    status?: string;
    search?: string;
    state?: string;
    applicantId?: string;
  }): Promise<Application[]> {
    await delay(300);
    let apps = getStoredData<Application[]>(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);

    if (filters) {
      if (filters.schemeCode && filters.schemeCode !== 'ALL') {
        apps = apps.filter((a) => a.schemeCode === filters.schemeCode);
      }
      if (filters.status && filters.status !== 'ALL') {
        apps = apps.filter((a) => a.status === filters.status);
      }
      if (filters.state && filters.state !== 'ALL') {
        apps = apps.filter((a) => a.address?.state === filters.state);
      }
      if (filters.applicantId) {
        apps = apps.filter((a) => a.applicantId === filters.applicantId);
      }
      if (filters.search) {
        const query = filters.search.toLowerCase();
        apps = apps.filter(
          (a) =>
            a.id.toLowerCase().includes(query) ||
            a.applicantName.toLowerCase().includes(query) ||
            a.personal?.tribeName?.toLowerCase().includes(query) ||
            a.address?.state?.toLowerCase().includes(query)
        );
      }
    }
    return apps;
  },

  async getApplicationById(id: string): Promise<Application | null> {
    await delay(200);
    const apps = getStoredData<Application[]>(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
    // Decode URI component in case URL contained slash e.g. NFST/2026/00142
    const cleanId = decodeURIComponent(id);
    return apps.find((a) => a.id === cleanId || a.id.replace(/\//g, '-') === cleanId.replace(/\//g, '-')) || null;
  },

  async submitApplication(appData: Partial<Application>): Promise<Application> {
    await delay(500);
    const apps = getStoredData<Application[]>(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
    const schemeCode = appData.schemeCode || 'NFST';
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const generatedId = `${schemeCode}/2026/00${randomNum}`;

    const newApp: Application = {
      id: generatedId,
      applicantId: appData.applicantId || 'usr-student-1',
      applicantName: appData.personal?.fullName || 'Priya Naik',
      schemeId: appData.schemeId || 'scheme-nfst',
      schemeCode,
      schemeName: appData.schemeName || 'National Fellowship for Higher Education of ST Students',
      status: 'submitted',
      currentStage: 1,
      submittedAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
      personal: appData.personal!,
      address: appData.address!,
      academic: appData.academic!,
      schemeSpecific: appData.schemeSpecific || {},
      bank: appData.bank!,
      documents: appData.documents || []
    };

    apps.unshift(newApp);
    setStoredData(STORAGE_KEYS.APPLICATIONS, apps);

    // Send notification
    await this.sendNotification(
      newApp.applicantId,
      'Application Submitted',
      `Your application ${newApp.id} for ${newApp.schemeCode} has been submitted successfully to MoTA.`,
      'info',
      `/app/applications/${encodeURIComponent(newApp.id)}`
    );

    await this.logAuditAction('SUBMIT_APPLICATION', 'application', newApp.id, { schemeCode });
    return newApp;
  },

  async approveApplication(id: string, officerName = 'Shri Rajesh Kumar'): Promise<Application> {
    await delay(400);
    const apps = getStoredData<Application[]>(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
    const index = apps.findIndex((a) => a.id === id);
    if (index === -1) throw new Error('Application not found');

    apps[index].status = 'verified';
    apps[index].currentStage = 3;
    apps[index].verifiedBy = officerName;
    apps[index].verifiedAt = new Date().toISOString();
    apps[index].lastUpdatedAt = new Date().toISOString();

    setStoredData(STORAGE_KEYS.APPLICATIONS, apps);

    await this.sendNotification(
      apps[index].applicantId,
      'Application Verified!',
      `Great news! Your application ${id} has passed document verification by MoTA.`,
      'success',
      `/app/applications/${encodeURIComponent(id)}`
    );

    await this.logAuditAction('VERIFY_APPLICATION', 'application', id, { verifiedBy: officerName });
    return apps[index];
  },

  async rejectApplication(id: string, reason: string, officerName = 'Shri Rajesh Kumar'): Promise<Application> {
    await delay(400);
    const apps = getStoredData<Application[]>(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
    const index = apps.findIndex((a) => a.id === id);
    if (index === -1) throw new Error('Application not found');

    apps[index].status = 'rejected';
    apps[index].remarks = reason;
    apps[index].lastUpdatedAt = new Date().toISOString();

    setStoredData(STORAGE_KEYS.APPLICATIONS, apps);

    await this.sendNotification(
      apps[index].applicantId,
      'Application Status Update',
      `Your application ${id} was rejected: ${reason}`,
      'error',
      `/app/applications/${encodeURIComponent(id)}`
    );

    await this.logAuditAction('REJECT_APPLICATION', 'application', id, { reason });
    return apps[index];
  },

  async raiseDeficiency(
    id: string,
    reasons: string[],
    note?: string,
    officerName = 'Shri Rajesh Kumar'
  ): Promise<Application> {
    await delay(400);
    const apps = getStoredData<Application[]>(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
    const index = apps.findIndex((a) => a.id === id);
    if (index === -1) throw new Error('Application not found');

    const currentRound = (apps[index].deficiency?.round || 0) + 1;
    const newDeficiency = {
      raisedAt: new Date().toISOString(),
      raisedBy: officerName,
      reasons,
      note,
      round: currentRound
    };

    apps[index].status = 'query_raised';
    apps[index].deficiency = newDeficiency;
    apps[index].lastUpdatedAt = new Date().toISOString();

    setStoredData(STORAGE_KEYS.APPLICATIONS, apps);

    await this.sendNotification(
      apps[index].applicantId,
      'Action Required: Deficiency Raised',
      `Verification Officer raised queries on ${id}. Please check deficient documents and resubmit.`,
      'warning',
      `/app/applications/${encodeURIComponent(id)}`
    );

    await this.logAuditAction('RAISE_DEFICIENCY', 'application', id, { reasons, note, round: currentRound });
    return apps[index];
  },

  async resubmitApplication(id: string, revisedDocs: Document[]): Promise<Application> {
    await delay(500);
    const apps = getStoredData<Application[]>(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
    const index = apps.findIndex((a) => a.id === id);
    if (index === -1) throw new Error('Application not found');

    apps[index].status = 'under_verification';
    apps[index].lastUpdatedAt = new Date().toISOString();

    if (apps[index].deficiency) {
      apps[index].deficiency!.resolvedAt = new Date().toISOString();
    }

    // Update documents list
    const existingDocMap = new Map(apps[index].documents.map((d) => [d.type, d]));
    revisedDocs.forEach((doc) => {
      existingDocMap.set(doc.type, doc);
    });
    apps[index].documents = Array.from(existingDocMap.values());

    setStoredData(STORAGE_KEYS.APPLICATIONS, apps);

    await this.logAuditAction('RESUBMIT_DEFICIENCY', 'application', id, { count: revisedDocs.length });
    return apps[index];
  },

  async generateMeritList(schemeCode = 'NFST'): Promise<MeritCandidate[]> {
    await delay(600);
    const apps = getStoredData<Application[]>(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
    const eligibleApps = apps.filter(
      (a) => a.schemeCode === schemeCode && (a.status === 'verified' || a.status === 'scrutinized' || a.status === 'selected')
    );

    const candidates: MeritCandidate[] = eligibleApps.map((a, i) => {
      const academicScore = a.academic?.percentageOrCgpa || 75;
      const incomeVal = a.personal?.annualIncome || 200000;
      // Need-based weightage: lower income gets higher weight
      const incomeWeightage = Math.max(0, 20 - Math.floor(incomeVal / 30000));
      const researchScore = a.schemeCode === 'NFST' ? 15 + (i % 10) : 0;
      const totalScore = parseFloat((academicScore * 0.7 + incomeWeightage + researchScore).toFixed(2));

      return {
        applicationId: a.id,
        applicantName: a.applicantName,
        schemeCode: a.schemeCode,
        state: a.address?.state || 'Odisha',
        academicScore,
        incomeWeightage,
        researchProposalScore: researchScore,
        totalScore,
        rank: i + 1,
        status: i < 15 ? 'Selected' : i < 25 ? 'Waitlisted' : 'Under Review'
      };
    });

    // Sort by totalScore descending
    candidates.sort((a, b) => b.totalScore - a.totalScore);
    candidates.forEach((c, idx) => (c.rank = idx + 1));

    await this.logAuditAction('GENERATE_MERIT_LIST', 'merit', schemeCode, { totalCandidates: candidates.length });
    return candidates;
  },

  // Document OCR simulation
  async runOCR(docType: string, fileName: string): Promise<OCRField[]> {
    await delay(700);
    if (docType.includes('Income') || fileName.includes('Income')) {
      return [
        { id: 'ocr-1', field: 'Candidate Name', value: 'Priya Naik', confidence: 96, sourceDocId: 'doc-102', sourceDocName: fileName },
        { id: 'ocr-2', field: 'Annual Income', value: 'Rs. 2,40,000', confidence: 64, sourceDocId: 'doc-102', sourceDocName: fileName, isMismatch: true, expectedValue: 'Rs. 2,40,000 (Low OCR confidence)' },
        { id: 'ocr-3', field: 'Issuing Authority', value: 'Tehsildar Sundargarh', confidence: 91, sourceDocId: 'doc-102', sourceDocName: fileName },
        { id: 'ocr-4', field: 'Certificate Issue Date', value: '14-05-2023', confidence: 58, sourceDocId: 'doc-102', sourceDocName: fileName, isMismatch: true, expectedValue: 'Must be on/after 01-04-2025' }
      ];
    }

    if (docType.includes('Caste') || fileName.includes('Caste')) {
      return [
        { id: 'ocr-5', field: 'Candidate Name', value: 'Priya Naik', confidence: 98, sourceDocId: 'doc-101', sourceDocName: fileName },
        { id: 'ocr-6', field: 'ST Tribe Name', value: 'Gond', confidence: 97, sourceDocId: 'doc-101', sourceDocName: fileName },
        { id: 'ocr-7', field: 'Certificate Number', value: 'OD-ST-2022-99120', confidence: 95, sourceDocId: 'doc-101', sourceDocName: fileName },
        { id: 'ocr-8', field: 'Government Format', value: 'Government of Odisha ST Format', confidence: 99, sourceDocId: 'doc-101', sourceDocName: fileName }
      ];
    }

    return [
      { id: 'ocr-9', field: 'Document Type', value: docType, confidence: 94, sourceDocId: 'doc-gen', sourceDocName: fileName },
      { id: 'ocr-10', field: 'Extracted Field 1', value: 'Verified Text Segment', confidence: 92, sourceDocId: 'doc-gen', sourceDocName: fileName }
    ];
  },

  // Admin Stats
  async getAdminStats(): Promise<AdminStats> {
    await delay(200);
    const apps = getStoredData<Application[]>(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);

    const stats: AdminStats = {
      ...INITIAL_ADMIN_STATS,
      totalApplications: apps.length,
      pendingVerification: apps.filter((a) => a.status === 'submitted' || a.status === 'under_verification').length,
      verified: apps.filter((a) => a.status === 'verified').length,
      scrutinized: apps.filter((a) => a.status === 'scrutinized').length,
      selected: apps.filter((a) => a.status === 'selected').length,
      rejected: apps.filter((a) => a.status === 'rejected').length,
      deficient: apps.filter((a) => a.status === 'query_raised').length
    };

    return stats;
  },

  // Notifications
  async getNotifications(userId: string): Promise<Notification[]> {
    await delay(150);
    const allNotifs = getStoredData<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
    return allNotifs.filter((n) => n.userId === userId || userId === 'ALL');
  },

  async markNotificationRead(id: string): Promise<void> {
    const allNotifs = getStoredData<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
    const index = allNotifs.findIndex((n) => n.id === id);
    if (index !== -1) {
      allNotifs[index].read = true;
      setStoredData(STORAGE_KEYS.NOTIFICATIONS, allNotifs);
    }
  },

  async sendNotification(userId: string, title: string, message: string, type: Notification['type'], link?: string): Promise<Notification> {
    const allNotifs = getStoredData<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
    const newNotif: Notification = {
      id: `notif-${Date.now()}`,
      userId,
      title,
      message,
      type,
      read: false,
      link,
      createdAt: new Date().toISOString()
    };
    allNotifs.unshift(newNotif);
    setStoredData(STORAGE_KEYS.NOTIFICATIONS, allNotifs);
    return newNotif;
  },

  // Audit Log
  async getAuditLog(): Promise<AuditLogEntry[]> {
    await delay(200);
    return getStoredData<AuditLogEntry[]>(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
  },

  async logAuditAction(
    action: string,
    entityType: AuditLogEntry['entityType'],
    entityId: string,
    metadata?: Record<string, any>
  ): Promise<AuditLogEntry> {
    const logs = getStoredData<AuditLogEntry[]>(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
    const currentUser = this.getCurrentUser();
    const newEntry: AuditLogEntry = {
      id: `log-${Date.now()}`,
      actorId: currentUser?.id || 'usr-system',
      actorName: currentUser?.name || 'MoTA Officer',
      actorRole: currentUser?.role || 'officer',
      action,
      entityType,
      entityId,
      timestamp: new Date().toISOString(),
      metadata
    };
    logs.unshift(newEntry);
    setStoredData(STORAGE_KEYS.AUDIT_LOGS, logs);
    return newEntry;
  }
};
