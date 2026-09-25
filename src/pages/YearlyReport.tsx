import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FileText, Download, TrendingUp, Info, BarChart2, PieChart as PieChartIcon } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#71816d', '#c9b79c', '#e76f51', '#2a9d8f', '#e9c46a', '#f4a261', '#264653', '#8ab17d', '#b08968', '#ddbea9'];

export const YearlyReport: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const [data, setData] = useState<string[][]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [chartDataYear, setChartDataYear] = useState<{year: string, amount: number}[]>([]);
  const [chartDataState, setChartDataState] = useState<{name: string, value: number}[]>([]);

  const title = type === 'pre-matric' ? 'Pre-Matric Yearly Report' : 'Post-Matric Yearly Report';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/yearlyReportData.csv');
        const text = await response.text();
        
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
              arr.push(currentStr.trim().replace(/^"|"$/g, ''));
              currentStr = '';
            } else {
              currentStr += char;
            }
          }
          arr.push(currentStr.trim().replace(/^"|"$/g, ''));
          return arr;
        };

        if (lines.length > 0) {
          setHeaders(parseLine(lines[0]));
          const rows = lines.slice(1).map(parseLine);
          setData(rows);
          
          // Calculate chart data
          const yearMap: Record<string, number> = {};
          const stateMap: Record<string, number> = {};
          
          rows.forEach(row => {
            const state = row[1];
            const year = row[6];
            const amountLakhStr = row[7];
            
            const amountLakh = parseFloat(amountLakhStr) || 0;
            
            if (year && year !== 'NA' && year !== '') {
              yearMap[year] = (yearMap[year] || 0) + amountLakh;
            }
            if (state && state !== 'NA' && state !== '') {
              stateMap[state] = (stateMap[state] || 0) + amountLakh;
            }
          });
          
          const yearData = Object.keys(yearMap)
            .map(y => ({ year: y, amount: Math.round(yearMap[y]) }))
            .sort((a,b) => a.year.localeCompare(b.year));
            
          const stateData = Object.keys(stateMap)
            .map(s => ({ name: s, value: Math.round(stateMap[s]) }))
            .sort((a,b) => b.value - a.value)
            .slice(0, 10);
          
          setChartDataYear(yearData);
          setChartDataState(stateData);
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
          
          <a 
            href="/yearlyReportData.csv" 
            download={`${type}-yearly-report.csv`}
            className="flex items-center space-x-2 px-5 py-2.5 bg-[#71816d] hover:bg-[#5a6857] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Full Dataset (CSV)</span>
          </a>
        </div>

        {/* Charts Section */}
        {!loading && data.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Year over Year Trend */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#c9b79c] p-6">
              <div className="flex items-center space-x-2 mb-6">
                <BarChart2 className="w-5 h-5 text-[#71816d]" />
                <h2 className="text-lg font-bold text-slate-800">Disbursement Trend (In Lakhs)</h2>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartDataYear}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(value) => `₹${value}`} />
                    <RechartsTooltip 
                      cursor={{ fill: '#f1e0c5', opacity: 0.4 }}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      formatter={(value: any) => [`₹${Number(value).toLocaleString()} Lakhs`, 'Amount']}
                    />
                    <Bar dataKey="amount" fill="#71816d" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top 10 States */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#c9b79c] p-6">
              <div className="flex items-center space-x-2 mb-6">
                <PieChartIcon className="w-5 h-5 text-[#e76f51]" />
                <h2 className="text-lg font-bold text-slate-800">Top 10 States (In Lakhs)</h2>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartDataState}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {chartDataState.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      formatter={(value: any) => [`₹${Number(value).toLocaleString()} Lakhs`, 'Amount']}
                    />
                    <Legend 
                      layout="vertical" 
                      verticalAlign="middle" 
                      align="right"
                      wrapperStyle={{ fontSize: '11px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

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
            <div className="overflow-x-auto max-h-[500px]">
              <table className="w-full text-left border-collapse text-sm">
                <thead className="sticky top-0 z-10 bg-slate-100">
                  <tr>
                    {headers.map((h, i) => (
                      <th key={i} className="px-4 py-3 font-semibold text-slate-700 border-b border-[#c9b79c] whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-[#f1e0c5]/40 transition-colors">
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
