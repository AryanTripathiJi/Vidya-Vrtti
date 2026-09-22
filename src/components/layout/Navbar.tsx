import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Role } from '../../types';
import {
  Bell,
  User,
  LogOut,
  ChevronDown,
  ShieldCheck,
  Building2,
  GraduationCap,
  Sparkles,
  FileCheck2,
  CheckCircle2,
  AlertCircle,
  LayoutDashboard,
  Globe
} from 'lucide-react';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi - हिंदी' },
  { code: 'bn', name: 'Bengali - বাংলা' },
  { code: 'mr', name: 'Marathi - मराठी' },
  { code: 'te', name: 'Telugu - తెలుగు' },
  { code: 'ta', name: 'Tamil - தமிழ்' },
  { code: 'gu', name: 'Gujarati - ગુજરાતી' },
  { code: 'ur', name: 'Urdu - اردو' },
  { code: 'kn', name: 'Kannada - ಕನ್ನಡ' },
  { code: 'or', name: 'Odia - ଓଡ଼ିଆ' },
  { code: 'ml', name: 'Malayalam - മലയാളം' },
  { code: 'pa', name: 'Punjabi - ਪੰਜਾਬੀ' },
  { code: 'as', name: 'Assamese - অসমীয়া' },
  { code: 'mai', name: 'Maithili - मैथिली' },
  { code: 'sat', name: 'Santali - ᱥᱟᱱᱛᱟᱲᱤ' },
  { code: 'ks', name: 'Kashmiri - कॉशुर' },
  { code: 'ne', name: 'Nepali - नेपाली' },
  { code: 'sd', name: 'Sindhi - सिन्धी' },
  { code: 'doi', name: 'Dogri - डोगरी' },
  { code: 'kok', name: 'Konkani - कोंकणी' },
  { code: 'mni', name: 'Manipuri - ꯃꯤꯇꯩꯂꯣꯟ' },
  { code: 'brx', name: 'Bodo - बड़ो' },
  { code: 'sa', name: 'Sanskrit - संस्कृतम्' },
  { code: 'bho', name: 'Bhojpuri - भोजपुरी' },
  { code: 'raj', name: 'Rajasthani - राजस्थानी' },
  { code: 'hne', name: 'Chhattisgarhi - छत्तीसगढ़ी' },
  { code: 'mag', name: 'Magahi - मगही' },
  { code: 'bgc', name: 'Haryanvi - हरियाणवी' },
  { code: 'mwr', name: 'Marwari - मारवाड़ी' },
  { code: 'mup', name: 'Malvi - मालवी' },
  { code: 'mtr', name: 'Mewari - मेवाड़ी' },
  { code: 'kfq', name: 'Khortha - खोरठा' },
  { code: 'sck', name: 'Sadri - सादरी' },
  { code: 'gbm', name: 'Garhwali - गढ़वाली' },
  { code: 'kfy', name: 'Kumaoni - कुमाऊँनी' },
  { code: 'tcy', name: 'Tulu - ತುಳು' },
  { code: 'lus', name: 'Mizo - Mizo ṭawng' }
];

export const Navbar: React.FC = () => {
  const { user, role, switchRole, logout, notifications, unreadCount, markNotificationAsRead } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [language, setLanguage] = useState('en');
  const navigate = useNavigate();

  // Sync custom dropdown with Google Translate widget
  useEffect(() => {
    const triggerTranslation = () => {
      const selectField = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (selectField) {
        selectField.value = language;
        selectField.dispatchEvent(new Event('change'));
      }
    };
    
    // Slight delay to ensure widget is loaded when first changing
    setTimeout(triggerTranslation, 300);
  }, [language]);

  const handleRoleSwitch = (newRole: Role) => {
    switchRole(newRole);
    setShowRoleDropdown(false);
    if (newRole === 'applicant') {
      navigate('/app');
    } else {
      navigate('/admin');
    }
  };

  const getRoleLabel = (r: Role) => {
    switch (r) {
      case 'applicant':
        return 'ST Applicant';
      case 'officer':
        return 'Verification Officer';
      case 'committee':
        return 'Selection Committee';
      case 'admin':
        return 'MoTA Administrator';
      default:
        return r;
    }
  };

  const getRoleBadgeColor = (r: Role) => {
    switch (r) {
      case 'applicant':
        return 'bg-amber-500/20 text-amber-200 border-amber-400/40';
      case 'officer':
        return 'bg-teal-500/20 text-teal-200 border-teal-400/40';
      case 'committee':
        return 'bg-purple-500/20 text-purple-200 border-purple-400/40';
      case 'admin':
        return 'bg-rose-500/20 text-rose-200 border-rose-400/40';
    }
  };



  return (
    <header className="bg-[#71816d] text-white sticky top-0 z-50 shadow-md border-b border-navy-700">
      {/* Top Govt Bar */}
      <div className="bg-[#5a6857] px-4 py-1 text-xs font-medium text-slate-300 flex items-center justify-between border-b border-navy-800">
        <div className="flex items-center space-x-3">
          <span className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-1.5"></span>
            Government of India | Ministry of Tribal Affairs (MoTA)
          </span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline text-amber-300 font-semibold">Direct Benefit Transfer (DBT) Portal</span>
        </div>
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <div className="flex items-center space-x-1.5 bg-[#4e5a4b] px-2 py-0.5 rounded border border-[#71816d]">
            <Globe className="w-3.5 h-3.5 text-slate-300" />
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-slate-200 text-[11px] font-medium focus:outline-none cursor-pointer appearance-none pr-3"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23cbd5e1%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right .1rem top 50%',
                backgroundSize: '.5rem auto',
              }}
            >
              {LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.code} className="bg-white text-slate-800">
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          <span>|</span>
          <Link to="/help" className="hover:text-amber-300 transition-colors">
            Help & Guidelines
          </Link>
          <span>|</span>
          <span className="text-slate-300">Smart India Hackathon 2026 (SIH25017)</span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center font-black text-xl text-navy-950 shadow-inner group-hover:scale-105 transition-transform">
              ST
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif font-extrabold text-xl tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  Vidya-Vrtti
                </span>
                <span className="bg-orange-500 text-navy-950 text-[10px] font-black px-1.5 py-0.5 rounded-xs uppercase tracking-wider">
                  AI-Unified
                </span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium tracking-wide">
                Scholarship & Fellowship Tribal Education System
              </p>
            </div>
          </Link>
        </div>

        {/* Center removed */}
        <div className="hidden lg:flex flex-1"></div>

        {/* Right: Notifications & Profile */}
        <div className="flex items-center space-x-3">
          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-navy-800 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-orange-500 text-white font-bold text-[10px] flex items-center justify-center animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-[#c9b79c] py-2 text-slate-800 z-50">
                <div className="px-4 py-2 border-b border-[#c9b79c] flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">Notifications ({notifications.length})</span>
                  <span className="text-xs text-orange-600 font-semibold cursor-pointer hover:underline">
                    Mark all read
                  </span>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-500">No notifications</div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markNotificationAsRead(n.id);
                          if (n.link) navigate(n.link);
                          setShowNotifications(false);
                        }}
                        className={`p-3 hover:bg-[#f1e0c5] cursor-pointer transition-colors ${
                          !n.read ? 'bg-amber-50/60' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-2.5">
                          {n.type === 'warning' ? (
                            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <div className="text-xs font-bold text-slate-900">{n.title}</div>
                            <div className="text-[11px] text-slate-600 mt-0.5 leading-snug">{n.message}</div>
                            <div className="text-[10px] text-slate-400 mt-1">
                              {new Date(n.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-navy-800 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-navy-950 font-bold flex items-center justify-center text-sm shadow-xs">
                  {user.name.charAt(0)}
                </div>
                <span className="hidden lg:inline text-xs font-semibold text-slate-200 max-w-[120px] truncate">
                  {user.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#c9b79c] py-2 text-slate-800 z-50">
                  <div className="px-4 py-2 border-b border-[#c9b79c]">
                    <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                  </div>
                  <Link
                    to={role === 'applicant' ? '/app' : '/admin'}
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center space-x-2 px-4 py-2 text-xs text-slate-700 hover:bg-[#f1e0c5]"
                  >
                    <LayoutDashboard className="w-4 h-4 text-slate-500" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    to="/app/profile"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center space-x-2 px-4 py-2 text-xs text-slate-700 hover:bg-[#f1e0c5]"
                  >
                    <User className="w-4 h-4 text-slate-500" />
                    <span>My Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setShowProfileMenu(false);
                      navigate('/login');
                    }}
                    className="w-full text-left flex items-center space-x-2 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors shadow-xs"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* Secondary Navigation Bar */}
      <div className="bg-[#4e5a4b] border-t border-navy-700 hidden lg:block overflow-visible relative z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] font-medium text-slate-200 py-2">
            <li><Link to="/" className="hover:text-amber-300 transition-colors">Home</Link></li>
            <li className="relative group">
              <button className="hover:text-amber-300 flex items-center transition-colors pb-2 -mb-2">
                About the Scheme <ChevronDown className="w-3 h-3 ml-0.5" />
              </button>
              <div className="absolute left-0 top-full mt-0 w-80 bg-white text-slate-800 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <ul className="py-1 border border-[#c9b79c] rounded">
                  <li><Link to="/introduction" className="block px-4 py-2 hover:bg-[#f1e0c5] hover:text-amber-600 transition-colors border-b border-[#c9b79c]">Introduction</Link></li>
                  <li><Link to="/guidelines" className="block px-4 py-2 hover:bg-[#f1e0c5] hover:text-amber-600 transition-colors border-b border-[#c9b79c]">Guidelines & Amendments</Link></li>
                  <li><Link to="#" className="block px-4 py-2 hover:bg-[#f1e0c5] hover:text-amber-600 transition-colors border-b border-[#c9b79c]">Circulars / Orders / Notifications</Link></li>
                  <li><a href="/docs/Post_Matric.pdf" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 hover:bg-[#f1e0c5] hover:text-amber-600 transition-colors border-b border-[#c9b79c]">Post-Matric Scholarship Scheme For ST Students</a></li>
                  <li><a href="/docs/Pre_Matric.pdf" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 hover:bg-[#f1e0c5] hover:text-amber-600 transition-colors border-b border-[#c9b79c]">Pre-Matric Scholarship Scheme For ST Student</a></li>
                  <li><a href="/docs/Fellowship_and_Top_Class.pdf" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 hover:bg-[#f1e0c5] hover:text-amber-600 transition-colors border-b border-[#c9b79c]">Top Class Education For ST Students</a></li>
                  <li><a href="/docs/Fellowship_and_Top_Class.pdf" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 hover:bg-[#f1e0c5] hover:text-amber-600 transition-colors border-b border-[#c9b79c]">National Fellowship for ST Students</a></li>
                  <li><a href="/docs/National_Overseas.pdf" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 hover:bg-[#f1e0c5] hover:text-amber-600 transition-colors">National Overseas Scholarship Scheme</a></li>
                </ul>
              </div>
            </li>
            <li><a href="https://dashboard.tribal.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors">Tribal Performance Dashboard</a></li>
            <li><Link to="/contact" className="hover:text-amber-300 transition-colors">Contact Us</Link></li>

            <li className="relative group">
              <button className="hover:text-amber-300 flex items-center transition-colors pb-2 -mb-2">
                New Registration <ChevronDown className="w-3 h-3 ml-0.5" />
              </button>
              <div className="absolute right-0 top-full mt-0 w-64 bg-white text-slate-800 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <ul className="py-1 border border-[#c9b79c] rounded">
                  <li><Link to="/register?tab=student" className="block px-4 py-2 hover:bg-[#f1e0c5] hover:text-amber-600 transition-colors">Students Fresh</Link></li>
                  <li><Link to="/register?tab=institute" className="block px-4 py-2 hover:bg-[#f1e0c5] hover:text-amber-600 transition-colors">University/ Institute</Link></li>
                  <li><Link to="/register?tab=student&type=renewal" className="block px-4 py-2 hover:bg-[#f1e0c5] hover:text-amber-600 transition-colors">Renewal Students( M.Phil to Ph.D)</Link></li>
                </ul>
              </div>
            </li>

            <li className="relative group">
              <button className="hover:text-amber-300 flex items-center transition-colors pb-2 -mb-2">
                View Yearly Report <ChevronDown className="w-3 h-3 ml-0.5" />
              </button>
              <div className="absolute right-0 top-full mt-0 w-48 bg-white text-slate-800 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <ul className="py-1 border border-[#c9b79c] rounded">
                  <li><Link to="/reports/pre-matric" className="block px-4 py-2 hover:bg-[#f1e0c5] hover:text-amber-600 transition-colors border-b border-[#c9b79c]">Pre-Matric Report</Link></li>
                  <li><Link to="/reports/post-matric" className="block px-4 py-2 hover:bg-[#f1e0c5] hover:text-amber-600 transition-colors">Post-Matric Report</Link></li>
                </ul>
              </div>
            </li>
            
            {!user && <li><Link to="/login" className="hover:text-amber-300 text-amber-400 font-bold transition-colors">Login</Link></li>}
          </ul>
        </div>
      </div>
    </header>
  );
};
