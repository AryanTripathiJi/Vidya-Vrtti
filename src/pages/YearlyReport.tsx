import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FileText, Download, TrendingUp, Info } from 'lucide-react';

export const YearlyReport: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const [data, setData] = useState<string[][]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const title = type === 'pre-matric' ? 'Pre-Matric Yearly Report' : 'Post-Matric Yearly Report';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Both using the same reference file for now, in a real scenario we might filter or fetch different files
        const response = await fetch('/yearlyReportData.csv');
        const text = await response.text();
        
        // Simple CSV parser handling quotes
        const lines = text.split('\n').filter(line => line.trim() !== '');
        const parseLine = (line: string) => {
          const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
          if (!matches) return line.split(',');
          let arr: string[] = [];
          let inQuote = false;
          let currentStr = '';
          for (let i = 0; i < line.length; i++) {
            let char = line[i];
            if (char === '"') {
              inQuote = !inQuote;
            } else if (char === ',' && !inQuote) {
              arr.push(currentStr.trim());
              currentStr = '';
            } else {
              currentStr += char;
            }
          }
          arr.push(currentStr.trim());
          return arr;
        };

        if (lines.length > 0) {
          setHeaders(parseLine(lines[0]));
          const rows = lines.slice(1).map(parseLine);
          setData(rows);
        }
      } catch (error) {
        console.error("Failed to load CSV", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [type]);

  return (
    <div className="py-12 bg-white/50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6 px-4">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#c9b79c] p-6 flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-slate-900">{title}</h1>
              <p className="text-sm text-slate-500 font-medium">Financial insights and historical scholarship disbursements</p>
            </div>
          </div>
          
          <button className="flex items-center space-x-2 px-5 py-2.5 bg-[#71816d] hover:bg-[#5a6857] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            <span>Download Full Dataset (CSV)</span>
          </button>
        </div>

        {/* Data Table Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#c9b79c] overflow-hidden">
          <div className="p-4 border-b border-[#c9b79c] bg-slate-50 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-slate-500" />
              Detailed Financial Records
            </h2>
            <div className="flex items-center space-x-1 text-xs font-medium text-slate-500 bg-white px-3 py-1 rounded-md border border-slate-200">
              <Info className="w-3.5 h-3.5" />
              <span>Showing {data.length} records</span>
            </div>
          </div>
          
          {loading ? (
            <div className="p-12 text-center text-slate-500">
              <div className="w-8 h-8 border-4 border-[#71816d]/30 border-t-[#71816d] rounded-full animate-spin mx-auto mb-3"></div>
              <p>Loading historical data...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100/50">
                    {headers.map((h, i) => (
                      <th key={i} className="px-4 py-3 font-semibold text-slate-700 border-b border-[#c9b79c] whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-slate-50 transition-colors">
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="px-4 py-3 text-slate-600 max-w-[200px] truncate" title={cell}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {data.length === 0 && (
                    <tr>
                      <td colSpan={headers.length || 1} className="px-4 py-12 text-center text-slate-500">
                        No records found for this scheme type.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
