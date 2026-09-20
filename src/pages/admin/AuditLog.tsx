import React, { useState, useEffect } from 'react';
import { mockApi } from '../../lib/mockApi';
import { AuditLogEntry } from '../../types';
import { History, ShieldCheck, Search } from 'lucide-react';

export const AuditLogPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    mockApi.getAuditLog().then((data) => {
      setLogs(data);
      setLoading(false);
    });
  }, []);

  const filteredLogs = logs.filter(
    (l) =>
      l.actorName.toLowerCase().includes(search.toLowerCase()) ||
      l.entityId.toLowerCase().includes(search.toLowerCase()) ||
      l.action.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-[#c9b79c] shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Security & Governance</span>
          <h1 className="text-2xl font-bold text-slate-900 mt-0.5">System Audit Trail Log</h1>
          <p className="text-xs text-slate-500 mt-1">Immutable record of all officer actions, approvals, and deficiency queries.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-[#c9b79c] shadow-xs">
        <div className="relative max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search audit trail..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#c9b79c] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f1e0c5] border-b border-[#c9b79c] text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Timestamp</th>
                <th className="px-6 py-3.5">Actor / Officer</th>
                <th className="px-6 py-3.5">Action Code</th>
                <th className="px-6 py-3.5">Target Entity ID</th>
                <th className="px-6 py-3.5">Metadata Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#f1e0c5]/80 transition-colors">
                  <td className="px-6 py-3.5 text-slate-500 text-[11px]">
                    {new Date(log.timestamp).toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-3.5 font-bold text-slate-900">
                    {log.actorName} ({log.actorRole})
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="font-mono text-[10px] font-bold bg-[#e8d6ba] text-slate-800 px-2 py-0.5 rounded-md">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 font-mono font-bold text-[#71816d]">{log.entityId}</td>
                  <td className="px-6 py-3.5 text-slate-600 text-[11px]">
                    {log.metadata ? JSON.stringify(log.metadata) : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
