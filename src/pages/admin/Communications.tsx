import React, { useState } from 'react';
import { MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export const CommunicationsPage: React.FC = () => {
  const [template, setTemplate] = useState('deficiency_notice');
  const [subject, setSubject] = useState('Urgent: MoTA Scholarship Document Deficiency Notification');
  const [body, setBody] = useState(
    'Dear Applicant, Verification Officer raised queries regarding your uploaded document. Please log into Vidya-Vrtti portal and upload corrected documents.'
  );

  const handleSendBroadcast = () => {
    toast.success('Broadcast SMS & Email Notification Sent to 24 Deficient Applicants');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-[#c9b79c] shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">MoTA Administration</span>
          <h1 className="text-2xl font-bold text-slate-900 mt-0.5">Automated SMS & Email Broadcast Center</h1>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#c9b79c] p-6 shadow-xs space-y-4 max-w-3xl">
        <h3 className="font-bold text-slate-900 text-sm border-b pb-2">Send Bulk Notification to Applicants</h3>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700">Notification Subject / Title</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700">SMS & Email Template Message</label>
            <textarea
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
            />
          </div>

          <button
            onClick={handleSendBroadcast}
            className="inline-flex items-center px-5 py-2.5 rounded-xl bg-[#71816d] hover:bg-[#8c9c88] text-white font-bold text-xs shadow-md"
          >
            <Send className="w-4 h-4 mr-2" />
            <span>Send Bulk Broadcast (SMS + Email)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
