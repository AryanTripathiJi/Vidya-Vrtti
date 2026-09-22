import React, { useState } from 'react';

const CONTACTS = [
  {
    category: "Minister Office",
    contacts: [
      { id: 1, name: "Sh. Jual Oram", designation: "Cabinet Minister", phone: "011-24013782, 011-24013783", email: "jual.oram@gov.in" }
    ]
  },
  {
    category: "Minister of State Office",
    contacts: [
      { id: 6, name: "Sh. Durgadas Uikey", designation: "Minister of State", phone: "011-24013784, 011-24013785", email: "mos-tribalaffairs@gov.in" }
    ]
  },
  {
    category: "Secretary",
    contacts: [
      { id: 10, name: "Smt. Ranjana Chopra", designation: "Secretary", phone: "011-24013700, 011-24013701", email: "secy-tribal@nic.in" }
    ]
  },
  {
    category: "Additional Secretary",
    contacts: [
      { id: 15, name: "Sh. Manish Thakur", designation: "Additional Secretary", phone: "011-24013698, 011-24013699", email: "manishthakur-ps@gov.in" }
    ]
  },
  {
    category: "Joint Secretaries / Advisors / DDG",
    contacts: [
      { id: 17, name: "Sh. Brij Nandan Prasad", designation: "Joint Secretary", phone: "011-24013704, 011-24013705", email: "prasad.bn@nic.in" },
      { id: 19, name: "Sh. Anant Prakash Pandey", designation: "Joint Secretary", phone: "011-24013702, 011-24013703", email: "js-mota@tribal.gov.in" },
      { id: 22, name: "Smt. Bhawna Singh", designation: "DDG", phone: "011-23340471", email: "Bhawna.75@nic.in" },
      { id: 24, name: "Ms. Athira S. Babu", designation: "Economic Advisor", phone: "011-23340005", email: "athira.babu@gov.in" },
      { id: 26, name: "Sh. Naval Kishor", designation: "Joint Secretary", phone: "011-23340045", email: "naval.kishor@gov.in" },
      { id: 28, name: "Sh. Bhaskar Choradia", designation: "JS & FA", phone: "011-24013706, 011-24013716", email: "jsfa.mota@tribal.gov.in" }
    ]
  },
  {
    category: "Directors",
    contacts: [
      { id: 30, name: "Smt. Samidha Singh", designation: "Director", phone: "011-24013717", email: "samidha.singh@gov.in" },
      { id: 32, name: "Ms. Deepali Masirkar", designation: "Director", phone: "011-24013714", email: "masirkar.deepali@gov.in" },
      { id: 34, name: "Sh. Arvind Kumar", designation: "Director", phone: "011-24013708", email: "arvind.kumar84@nic.in" },
      { id: 37, name: "Dr. Varnali Deka", designation: "Director", phone: "011-24013709", email: "varnali.deka@nic.in" },
      { id: 39, name: "Sh. Randhir Kumar B. Patel", designation: "Director", phone: "011-23343303", email: "randhir.patel@nic.in" }
    ]
  },
  {
    category: "Deputy Secretaries / Joint Directors",
    contacts: [
      { id: 41, name: "Sh. Sangeet Kumar", designation: "Deputy Secretary", phone: "011-24013707", email: "s.kumar27@nic.in" },
      { id: 45, name: "Sh. Jafar Malik", designation: "Deputy Secretary", phone: "011-24013710", email: "jafar.malik@ias.nic.in" },
      { id: 47, name: "Sh. Ganesh Nagarajan", designation: "Deputy Secretary", phone: "011-24013712", email: "ganeshnagarajan.ifs@gov.in" },
      { id: 51, name: "Sh. Ved Prakash Meena", designation: "Joint Director (OL)", phone: "011-23340461", email: "vp.meena16@nic.in" }
    ]
  },
  {
    category: "Nodal Grievance Resolution & NIC Cell",
    contacts: [
      { id: 85, name: "Sh. Vineet Tomer", designation: "Sr. Director (IT) / NIC Cell", phone: "011-23340470", email: "hod-tribalaffairs@nic.in" },
      { id: 86, name: "Sh. Balbir Singh", designation: "Scientist-B / NIC Cell", phone: "011-24013747", email: "singh.balbir56@nic.in" },
      { id: 94, name: "Sh. Ganesh Nagarajan", designation: "Web Information Manager", phone: "011-24013712", email: "ganeshnagarajan.ifs@gov.in" },
      { id: 95, name: "Sh. Randhir Kumar B. Patel", designation: "Nodal Grievance Resolution Officer", phone: "011-23343303", email: "randhir.patel@nic.in" }
    ]
  },
  {
    category: "Helpdesk & Dedicated Queries",
    contacts: [
      { id: 96, name: "Sh. Satish Kumar Singh", designation: "Under Secretary (Admin / Scholarship Queries)", phone: "011-23343708", email: "satish.edu@nic.in" },
      { id: 97, name: "Rahul Bansal", designation: "Technical Queries", phone: "N/A", email: "rahul.bansal@govcontractor.nic.in" }
    ]
  }
];

export const ContactUs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="bg-[#f1e0c5] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-extrabold text-[#71816d] mb-4">Contact Directory</h1>
          <p className="text-lg text-[#5a6857] max-w-2xl mx-auto">
            Ministry of Tribal Affairs<br/>
            Kartavya Path, Rajpath Area, Central Secretariat,<br/>
            Kartavya Bhawan - 01, New Delhi - 110001
          </p>
        </div>

        <div className="mb-8 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search officials by name or designation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-[#c9b79c] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#71816d] bg-white text-[#2c352a]"
          />
        </div>

        <div className="space-y-12">
          {CONTACTS.map((group, idx) => {
            const filteredContacts = group.contacts.filter(c => 
              c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
              c.designation.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (filteredContacts.length === 0) return null;

            return (
              <section key={idx} className="bg-[#fdfbf7] p-8 rounded-md shadow-sm border border-[#c9b79c]">
                <h2 className="text-2xl font-serif font-bold text-[#5a6857] mb-6 border-b border-[#c9b79c] pb-2">
                  {group.category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredContacts.map((contact) => (
                    <div key={contact.id} className="bg-white p-5 rounded-md border border-[#c9b79c] shadow-inner hover:shadow-md transition-shadow">
                      <h3 className="text-lg font-bold text-[#2c352a]">{contact.name}</h3>
                      <p className="text-sm font-semibold text-[#71816d] mb-3">{contact.designation}</p>
                      
                      <div className="space-y-2 text-sm text-[#5a6857]">
                        <div className="flex items-start">
                          <span className="font-bold w-16">Phone:</span>
                          <span className="flex-1">{contact.phone}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="font-bold w-16">Email:</span>
                          <a href={`mailto:${contact.email}`} className="flex-1 text-orange-700 hover:underline break-all">
                            {contact.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};
