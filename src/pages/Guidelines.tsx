import React from 'react';

export const GuidelinesPage: React.FC = () => {
  return (
    <div className="bg-[#fdfbf7] min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans text-[#2c352a]">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-sm border border-[#c9b79c] rounded-md">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-serif font-extrabold text-[#71816d] mb-4">Guidelines & Amendments</h1>
          <p className="text-sm text-[#5a6857] max-w-2xl mx-auto">
            Detailed information on the eligibility criteria, benefits, and recent updates for Ministry of Tribal Affairs Schemes.
          </p>
        </div>

        <div className="space-y-12">
          
          {/* NFST Section */}
          <section>
            <h2 className="text-2xl font-serif font-bold text-orange-700 flex items-center mb-4 border-b border-[#c9b79c] pb-2">
              <span className="text-3xl mr-2">📘</span> National Fellowship for Scheduled Tribes (NFST)
            </h2>
            <p className="text-sm leading-relaxed mb-6">
              The NFST is a Central Sector Scheme fully funded by the Ministry of Tribal Affairs, aimed at providing fellowships to meritorious ST students for pursuing higher education, specifically M.Phil. and Ph.D. programs in India.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#5a6857] mb-2">Guidelines & Eligibility Criteria</h3>
                <ul className="list-disc list-outside ml-5 space-y-2 text-sm leading-relaxed">
                  <li><strong>Objective & Coverage:</strong> The scheme supports research programs in India. It awards 750 fresh fellowships annually, with approximately 3,000 students currently benefiting.</li>
                  <li><strong>Qualification:</strong> Candidates must have completed their Master's degree with at least 55% marks or an equivalent grade. They must be registered for an M.Phil. or Ph.D. in a recognized university.</li>
                  <li><strong>Age Limit:</strong> There is no upper age limit for applicants.</li>
                  <li><strong>Income Criteria:</strong> There is no family income limit for this fellowship.</li>
                  <li><strong>Other Conditions:</strong> The scheme follows the "one child in a family and one-time assistance" rule. An individual can receive the award only once and cannot be considered for a second time or for a higher-level award under the same scheme.</li>
                  <li><strong>Selection & Disbursement:</strong> Fellowships are released through the Direct Benefit Transfer (DBT) mode after verification of documents like continuation certificates, HRA, and contingency claims.</li>
                </ul>
              </div>

              <div className="bg-[#f1e0c5] p-5 rounded-md border border-[#c9b79c]">
                <h3 className="text-lg font-bold text-[#2c352a] mb-2">Key Benefits</h3>
                <p className="text-sm mb-2">The fellowship provides a monthly stipend and an annual contingency grant aligned with UGC norms. Current rates are approximately:</p>
                <ul className="list-disc list-outside ml-5 space-y-1 text-sm">
                  <li><strong>Monthly Fellowship:</strong> ₹31,000 (first two years) and ₹35,000 (remaining three years) for Ph.D. programs.</li>
                  <li><strong>Annual Contingency:</strong> Up to ₹25,000, depending on the stream.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#5a6857] mb-2">Recent Amendments & Updates</h3>
                <ul className="list-disc list-outside ml-5 space-y-2 text-sm leading-relaxed">
                  <li><strong>Guideline Updates:</strong> The ministry has stated that if National Education Policy guidelines change the course structure, rules will be updated accordingly. Scholars enrolled before 2021-22 continue under the guidelines valid at their time of admission.</li>
                  <li><strong>Scheme Validity:</strong> The current validity of the scheme appears to extend up to the academic year 2025-26.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* NOS Section */}
          <section>
            <h2 className="text-2xl font-serif font-bold text-teal-700 flex items-center mb-4 border-b border-[#c9b79c] pb-2">
              <span className="text-3xl mr-2">🌍</span> National Overseas Scholarship (NOS) for ST Candidates
            </h2>
            <p className="text-sm leading-relaxed mb-6">
              The NOS scheme is specifically for ST students pursuing Master's, Ph.D., or Post-Doctoral research programs abroad.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#5a6857] mb-2">Guidelines & Eligibility Criteria</h3>
                <ul className="list-disc list-outside ml-5 space-y-2 text-sm leading-relaxed">
                  <li><strong>Objective & Coverage:</strong> The scholarship is admissible for studies at top 1000 QS World-ranked universities. A total of 20 slots are available annually for ST students.</li>
                  <li><strong>Category-wise Slots:</strong> The 20 awards are distributed as 17 for ST and 3 for Particularly Vulnerable Tribal Groups (PVTG), with 6 slots earmarked for female beneficiaries.</li>
                  <li>
                    <strong>Age & Marks Criteria (as on 1st July):</strong>
                    <div className="overflow-x-auto mt-2">
                      <table className="min-w-full border-collapse border border-[#c9b79c] text-xs md:text-sm">
                        <thead className="bg-[#e8d6ba]">
                          <tr>
                            <th className="border border-[#c9b79c] px-3 py-2 text-left">Criteria</th>
                            <th className="border border-[#c9b79c] px-3 py-2 text-left">Master's Degree</th>
                            <th className="border border-[#c9b79c] px-3 py-2 text-left">Ph.D.</th>
                            <th className="border border-[#c9b79c] px-3 py-2 text-left">Post-Doctoral</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-[#c9b79c] px-3 py-2 font-bold">Maximum Age</td>
                            <td className="border border-[#c9b79c] px-3 py-2">32 years</td>
                            <td className="border border-[#c9b79c] px-3 py-2">35 years</td>
                            <td className="border border-[#c9b79c] px-3 py-2">38 years</td>
                          </tr>
                          <tr>
                            <td className="border border-[#c9b79c] px-3 py-2 font-bold">Minimum Marks</td>
                            <td className="border border-[#c9b79c] px-3 py-2">55% in Bachelor's Degree</td>
                            <td className="border border-[#c9b79c] px-3 py-2">55% in Master's Degree</td>
                            <td className="border border-[#c9b79c] px-3 py-2">55% in Master's (with Ph.D. certificate)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </li>
                  <li><strong>Income Criteria:</strong> The annual family income from all sources must not exceed ₹6.00 lakh. This includes the combined income of both parents if both are working.</li>
                  <li><strong>Other Conditions:</strong> Only one child of the same parents is eligible for the scholarship, and it can be availed only once.</li>
                  <li><strong>Application Process:</strong> Applications must be submitted online through the NOS Portal (https://overseas.tribal.gov.in/) after registering on DigiLocker and uploading the required documents.</li>
                </ul>
              </div>

              <div className="bg-[#eaf1e8] p-5 rounded-md border border-[#8a9c85]">
                <h3 className="text-lg font-bold text-[#2c352a] mb-2">Key Benefits</h3>
                <p className="text-sm mb-2">Selected candidates receive comprehensive financial support, including:</p>
                <ul className="list-disc list-outside ml-5 space-y-1 text-sm">
                  <li><strong>Annual Maintenance Allowance:</strong> $15,400 (USA & other countries) or £9,900 (UK).</li>
                  <li><strong>Annual Contingency Allowance:</strong> $1,500 (USA & other countries) or £1,100 (UK).</li>
                  <li><strong>Tuition Fees:</strong> Fully covered as charged by the institution.</li>
                  <li><strong>Other Expenses:</strong> Visa fees, medical insurance premium, and economy class air tickets.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#5a6857] mb-2">Recent Amendments & Updates</h3>
                <ul className="list-disc list-outside ml-5 space-y-2 text-sm leading-relaxed">
                  <li><strong>New Guidelines (2026-27):</strong> A new set of scheme guidelines was brought into effect from the selection year 2026-27. A key change is that candidates now need an unconditional offer of admission from a top 500 QS World-ranked university to be considered in the first round.</li>
                  <li><strong>Income Certificate:</strong> The income certificate must be for the financial year 2025-26 (1st April 2025 to 31st March 2026).</li>
                  <li><strong>Application Timeline:</strong> The first round of applications for 2026-27 was open from 24 April to 2 June 2026. A second round may be conducted from September/October 2026 if slots remain vacant.</li>
                  <li><strong className="text-rose-700">Marks Relaxation:</strong> The minimum marks criteria (55%) do not apply to candidates who have already obtained admission in top 1,000 QS World-ranked institutes.</li>
                </ul>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
