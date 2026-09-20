import React from 'react';
import { BookOpen, Target, ShieldCheck, Users, Sparkles, Building2 } from 'lucide-react';

export const Introduction: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Hero Section */}
      <div className="bg-white p-8 sm:p-12 rounded-2xl border border-[#c9b79c] shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full blur-3xl -mr-20 -mt-20 opacity-50"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 font-serif">Introduction</h1>
              <p className="text-sm font-bold text-[#71816d] tracking-wider uppercase mt-1">
                Scholarship & Fellowship Tribal Education Unified Platform
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="bg-white rounded-2xl border border-[#c9b79c] shadow-xs overflow-hidden">
        
        {/* 1. Background and Context */}
        <div className="p-8 border-b border-[#dfcdb1]">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 font-serif flex items-center">
            <Building2 className="w-6 h-6 mr-3 text-amber-600" />
            1. Background and Context
          </h2>
          <div className="space-y-4 text-sm text-slate-700 leading-relaxed font-medium">
            <p>
              The Ministry of Tribal Affairs (MoTA), Government of India, is the nodal ministry responsible for the holistic development of Scheduled Tribe (ST) communities across the country. Among its many responsibilities, the Ministry implements several flagship scholarship and fellowship schemes aimed at promoting higher education among ST students. These schemes are designed to provide financial assistance to meritorious ST students who wish to pursue advanced studies, research programmes, and professional courses within India and abroad.
            </p>
            <p>Two of the most prominent schemes administered by MoTA are:</p>
            <ul className="list-disc list-inside ml-4 space-y-2 text-slate-800 bg-[#f1e0c5] p-4 rounded-xl border border-[#dfcdb1]">
              <li><strong>The National Fellowship for Scheduled Tribes (NFST)</strong> – which supports ST students pursuing M.Phil. and Ph.D. programmes in recognized Indian universities and institutions.</li>
              <li><strong>The National Overseas Scholarship (NOS)</strong> – which enables ST students to pursue Master's, Ph.D., and Post-Doctoral research programmes at top-ranked universities abroad.</li>
            </ul>
            <p>
              In addition to these, MoTA administers several other scholarship schemes such as the Top Class Education Scheme, Pre-Matric and Post-Matric Scholarships, and various state-level and central-sector initiatives. Together, these schemes represent a significant investment by the Government of India in the educational empowerment of Scheduled Tribe communities.
            </p>
            <p>
              Despite the noble intent and substantial budgetary allocation, the implementation of these schemes has historically faced several systemic challenges. The processes involved—applicant registration, online application, document submission, eligibility verification, scrutiny, screening, selection, communication, and post-selection fellowship management—are largely manual, fragmented, and repetitive. Each scheme operates with its own set of eligibility criteria, document requirements, selection processes, and workflow stages, resulting in administrative complexity and inefficiency.
            </p>
          </div>
        </div>

        {/* 2. The Problem */}
        <div className="p-8 border-b border-[#dfcdb1] bg-slate-50">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 font-serif flex items-center">
            <ShieldCheck className="w-6 h-6 mr-3 text-rose-600" />
            2. The Problem
          </h2>
          <p className="text-sm text-slate-700 mb-4 font-medium">
            The current landscape of MoTA scholarship administration faces several critical challenges:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Fragmented Systems', desc: 'Different schemes operate on separate platforms, each with its own application process, document requirements, and verification procedures. This fragmentation creates confusion for applicants and administrative overhead for officials.' },
              { title: 'Manual Scrutiny', desc: 'A significant portion of the verification and scrutiny process is manual, requiring officials to physically examine documents, cross-check data, and validate eligibility criteria. This is time-consuming, error-prone, and difficult to scale during peak application seasons.' },
              { title: 'Repetitive Correspondence', desc: 'When applications are incomplete or contain deficiencies, officials must individually correspond with applicants, often through multiple rounds of communication. This delays the entire process and creates frustration for both parties.' },
              { title: 'Limited Real-Time Visibility', desc: 'Neither applicants nor administrators have real-time visibility into the status of applications. Applicants cannot track where their application is in the pipeline, and administrators lack dashboards to monitor overall scheme performance.' },
              { title: 'Verification Errors', desc: 'Manual verification of documents such as caste certificates, income certificates, mark sheets, and admission letters is prone to errors, inconsistencies, and in some cases, fraudulent submissions.' },
              { title: 'Delayed Disbursement', desc: 'Due to the above challenges, there is often a significant delay between application submission and the actual disbursement of scholarship funds, defeating the purpose of timely financial assistance.' },
              { title: 'Lack of Transparency', desc: 'The absence of a transparent, auditable workflow makes it difficult to ensure accountability and fairness in the selection process.' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. The ST-SETU Solution */}
        <div className="p-8 border-b border-[#dfcdb1]">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 font-serif flex items-center">
            <Sparkles className="w-6 h-6 mr-3 text-[#71816d]" />
            3. The ST-SETU Solution
          </h2>
          <div className="space-y-4 text-sm text-slate-700 leading-relaxed font-medium">
            <p>
              ST-SETU (Scholarship & Fellowship Tribal Education Unified Platform) is a proposed AI-enabled digital platform that addresses these challenges by bringing the complete end-to-end administration of MoTA scholarship and fellowship schemes onto one integrated, secure, transparent, and intelligent system.
            </p>
            <p className="bg-[#f1e0c5] p-4 rounded-xl border border-[#dfcdb1] font-bold text-slate-800 text-center text-lg italic font-serif">
              The name "SETU" (meaning "bridge" in Sanskrit and several Indian languages) reflects the platform's core purpose: to serve as a bridge between deserving ST students and the financial assistance they need.
            </p>
            <p>ST-SETU is designed with the following foundational principles:</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              <li className="bg-slate-50 p-3 rounded-lg border border-slate-200"><strong className="text-slate-900">Unified Platform:</strong> A single platform that handles all MoTA scholarship schemes, eliminating the need for multiple disjointed systems.</li>
              <li className="bg-slate-50 p-3 rounded-lg border border-slate-200"><strong className="text-slate-900">Configurable Architecture:</strong> Built on a configurable rule engine that allows scheme-specific eligibility criteria, document requirements, selection processes, and workflow stages to be defined without code changes.</li>
              <li className="bg-slate-50 p-3 rounded-lg border border-slate-200"><strong className="text-slate-900">AI-Assisted Verification:</strong> Leverages AI and OCR technologies to automatically extract data from uploaded documents, validate them, and detect inconsistencies.</li>
              <li className="bg-slate-50 p-3 rounded-lg border border-slate-200"><strong className="text-slate-900">End-to-End Workflow:</strong> Covers the entire lifecycle—from applicant registration to selection, communication, disbursement, and post-selection fellowship management.</li>
              <li className="bg-slate-50 p-3 rounded-lg border border-slate-200"><strong className="text-slate-900">Transparency and Auditability:</strong> Every action taken on the platform is logged, creating a complete audit trail that ensures accountability.</li>
              <li className="bg-slate-50 p-3 rounded-lg border border-slate-200"><strong className="text-slate-900">Role-Based Interfaces:</strong> Separate interfaces for applicants and administrators, each optimized for their specific needs.</li>
            </ul>
          </div>
        </div>

        {/* 4. How ST-SETU Works */}
        <div className="p-8 border-b border-[#dfcdb1] bg-slate-50">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 font-serif flex items-center">
            <Target className="w-6 h-6 mr-3 text-blue-600" />
            4. How ST-SETU Works
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-[#71816d] mb-3">4.1 Applicant Portal</h3>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-700 font-medium">
                <li><strong>Registration and Profile Management:</strong> Profiles can be reused across multiple applications.</li>
                <li><strong>Scheme Browsing:</strong> View eligibility criteria, required documents, and application timelines.</li>
                <li><strong>Eligibility Pre-Check:</strong> An eligibility checker tells applicants which schemes they are eligible for.</li>
                <li><strong>Multi-Step Application Form:</strong> Guided, step-by-step form with auto-save functionality.</li>
                <li><strong>Document Upload:</strong> Simple drag-and-drop interface for uploading required documents.</li>
                <li><strong>Application Tracking:</strong> Real-time status tracker (submitted, verified, scrutinized, etc.).</li>
                <li><strong>Deficiency Response:</strong> Respond to raised queries without starting a new application.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-amber-700 mb-3">4.2 Admin/Officer Portal</h3>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-700 font-medium">
                <li><strong>Dashboard:</strong> Comprehensive dashboard with KPIs and analytics.</li>
                <li><strong>Application Management:</strong> Powerful table view with filters and bulk actions.</li>
                <li><strong>AI-Assisted Verification:</strong> Shows declared data alongside AI-extracted data with confidence scores.</li>
                <li><strong>Deficiency Management:</strong> Interface to raise deficiencies automatically notifying the applicant.</li>
                <li><strong>Scrutiny Workflow:</strong> Structured workflow for scrutinizing verified applications.</li>
                <li><strong>Selection and Merit List:</strong> Tools for ranking applications and generating merit lists.</li>
                <li><strong>Scheme Configuration:</strong> Admin interface for configuring new schemes or modifying existing ones.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-purple-700 mb-3">4.3 AI and Intelligence Layer</h3>
              <p className="text-sm text-slate-700 mb-2 font-medium">At the heart of ST-SETU is an AI layer that assists with:</p>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-700 font-medium ml-4">
                <li><strong>Document Intelligence:</strong> OCR technology extracts text from uploaded documents.</li>
                <li><strong>Data Validation:</strong> Cross-checks extracted data against declared information.</li>
                <li><strong>Eligibility Verification:</strong> Auto-checks criteria to reduce manual effort.</li>
                <li><strong>Anomaly Detection:</strong> Flags potentially fraudulent or anomalous applications.</li>
                <li><strong>Confidence Scoring:</strong> Assigns scores allowing officers to focus on low-confidence fields.</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-rose-700 mb-3">4.4 Scheme Configuration Engine</h3>
              <p className="text-sm text-slate-700 mb-2 font-medium">Allows administrators to:</p>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-700 font-medium ml-4">
                <li>Define Eligibility Rules with visual builders.</li>
                <li>Specify Document Requirements.</li>
                <li>Configure Workflow Stages.</li>
                <li>Set Selection Criteria (merit-based, need-based).</li>
                <li>Manage Application Windows.</li>
                <li>Add New Schemes purely through configuration without code changes.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 5-9 Combined Shortened Sections */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 font-serif flex items-center">
            <Users className="w-6 h-6 mr-3 text-orange-600" />
            5. Vision, Impact, and Conclusion
          </h2>
          <div className="space-y-4 text-sm text-slate-700 leading-relaxed font-medium">
            <p>
              <strong>Scheme Coverage:</strong> ST-SETU is designed to handle all MoTA scholarship and fellowship schemes, including NFST, NOS, Top Class Education, and Pre/Post-Matric Scholarships.
            </p>
            <p>
              <strong>Benefits to Stakeholders:</strong> 
              <br/>- For Students: Simplified application, real-time tracking, faster processing.
              <br/>- For Officials: Reduced manual effort, improved accuracy, better prioritization.
              <br/>- For the Ministry: Improved efficiency, enhanced transparency, data-driven decisions.
            </p>
            <p>
              <strong>Alignment with Government Initiatives:</strong> ST-SETU is aligned with Digital India, Direct Benefit Transfer (DBT), Smart Education, E-Governance, Atmanirbhar Bharat, and NEP 2020.
            </p>
            <div className="bg-[#71816d] text-white p-6 rounded-xl mt-6 shadow-md">
              <h3 className="text-lg font-bold mb-2 font-serif text-amber-200">Conclusion</h3>
              <p className="text-sm font-medium leading-relaxed">
                ST-SETU represents a comprehensive, thoughtful, and future-ready solution to the challenges facing MoTA's scholarship and fellowship administration. By bringing together the entire lifecycle onto one integrated platform, leveraging AI and configurable rules, and prioritizing transparency and human oversight, ST-SETU has the potential to significantly improve the efficiency, transparency, and accountability of scholarship administration—ultimately benefiting thousands of Scheduled Tribe students across India.
              </p>
              <p className="text-sm font-medium leading-relaxed mt-4 italic text-amber-100">
                The platform is not just a technological solution; it is a bridge (SETU) between deserving students and the opportunities they deserve, between government intent and effective implementation, and between traditional administration and digital transformation.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
