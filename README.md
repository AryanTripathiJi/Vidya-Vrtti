# ST-SETU: Scholarship & Fellowship Tribal Education Unified Platform

![ST-SETU Banner](https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200&h=400)

**ST-SETU** is an AI-enabled, end-to-end digital platform designed for the Ministry of Tribal Affairs (MoTA), Government of India. It unifies the administration of flagship scholarship and fellowship schemes—such as the National Fellowship for Scheduled Tribes (NFST) and National Overseas Scholarship (NOS)—onto a single, transparent, and intelligent system.

---

## 🚀 Key Features

### 1. Unified Applicant Portal
- **Smart Scheme Browsing:** Applicants can view eligibility criteria, required documents, and deadlines in a structured format.
- **Eligibility Pre-Check:** A wizard that instantly informs applicants of their eligibility based on income, age, and academic qualifications.
- **Guided Application Form:** Multi-step wizard with auto-save functionality for personal, academic, and scheme-specific details.
- **Real-Time Tracking:** Transparent status tracking from submission to final disbursement.

### 2. Intelligent Admin & Officer Portal
- **Dashboard & Analytics:** Real-time KPIs covering total applications, verification statuses, and scheme-wise breakdowns.
- **AI-Assisted Document Scrutiny:** Automated OCR (Optical Character Recognition) extracts and validates data from uploaded documents against declared information, assigning confidence scores to minimize manual verification errors.
- **Deficiency Management:** Streamlined workflow to raise queries and allow applicants to resubmit specific documents without starting over.
- **Configurable Rule Engine:** Allows administrators to add new schemes or modify existing eligibility criteria without requiring code changes.

---

## 🛠 Tech Stack

- **Frontend Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (v4)
- **Routing:** React Router v7
- **Icons:** Lucide React
- **PDF Generation:** jsPDF
- **State Management:** React Context API

---

## 💻 Local Development Setup

To run this project locally, follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/st-setu.git
   cd st-setu
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🏗 Developer Architecture Note

Currently, the platform operates using an **in-memory mock API service layer** (`src/lib/mockApi.ts`) backed by browser `localStorage`. This allows the entire frontend to be developed, tested, and demonstrated independently of a backend server.

**To transition to a live backend (e.g., Node.js, Python/Django):**
Developers simply need to replace the local storage fetch functions in `mockApi.ts` with standard `axios` or `fetch` requests pointing to the real API endpoints. The frontend components are already heavily typed and decoupled, ensuring a seamless integration.

---

## 🛡 License

This project was built as a solution for SIH (Smart India Hackathon) 2026. All rights and administrative control logic belong to the respective contributors and stakeholders.
