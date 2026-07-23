import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn, LogOut, Shield, User, ChevronDown, Globe } from "lucide-react";
import { auth, googleProvider } from "../lib/firebase";
import { signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { useLanguage } from "../contexts/LanguageContext";

interface NavbarProps {
  activeView: string;
  activeSubView: string;
  onViewChange: (view: string, subView?: string) => void;
  isAdminDemo: boolean;
  setIsAdminDemo: (value: boolean) => void;
}

export default function Navbar({
  activeView,
  activeSubView,
  onViewChange,
  isAdminDemo,
  setIsAdminDemo
}: NavbarProps) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setProfileDropdownOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isActualAdmin = user?.email === "ehlolhan@gmail.com" || isAdminDemo;

  const navItems = [
    { id: "home", label: t("HOME", "HOME") },
    {
      id: "company",
      label: t("COMPANY", "COMPANY"),
      subItems: [
        { label: t("인사말", "Greeting"), subId: "greeting" },
        { label: t("회사연혁", "History"), subId: "history" },
        { label: t("오시는길", "Location"), subId: "location" }
      ]
    },
    {
      id: "product",
      label: t("PRODUCT", "PRODUCT"),
      subItems: [
        { label: t("전체보기", "All Raw Materials"), subId: "all" },
        { label: t("염료 / DYE", "Dyes (DYE)"), subId: "dye" },
        { label: t("색소 / COLOR", "Colorants (COLOR)"), subId: "color" },
        { label: t("보습제 / HUMECTANT", "Humectants (HUMECTANT)"), subId: "humectant" },
        { label: t("ACTIVE (기능성)", "Active Ingredients"), subId: "active" }
      ]
    },
    { id: "inquiry", label: t("INQUIRY", "INQUIRY"), subItems: [{ label: t("견적문의", "Get Quote"), subId: "all" }] }
  ];

  const handleNavClick = (viewId: string, subId?: string) => {
    onViewChange(viewId, subId);
    setMobileMenuOpen(false);
  };

  return (
    <header id="navbar-header" className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 text-slate-800 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* Logo Section */}
          <div className="flex items-center cursor-pointer group/logo" onClick={() => handleNavClick("home")}>
            <div className="flex items-center space-x-3">
              <div className="relative w-14 h-10 flex items-center justify-center">
                {/* Forward-stretching dynamic capsule shape matching user's requested style */}
                <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 54 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Outer glowing blur */}
                  <path 
                    d="M 4 4 L 34 4 A 16 16 0 0 1 34 36 L 4 36 Q 22 20 4 4 Z" 
                    fill="url(#logo-grad)" 
                    className="opacity-25 blur-md transform translate-y-0.5" 
                  />
                  
                  {/* Speed/forward trail stretching out to the left */}
                  <path 
                    d="M 1 4 L 31 4 A 16 16 0 0 1 31 36 L 1 36 Q 19 20 1 4 Z" 
                    fill="url(#trail-grad)" 
                    className="opacity-40 transform translate-x-[-2px] group-hover/logo:translate-x-[-5px] transition-transform duration-300" 
                  />
                  
                  {/* Main aerodynamic body with crescent cutout on left, rounded on right */}
                  <path 
                    d="M 4 4 L 34 4 A 16 16 0 0 1 34 36 L 4 36 Q 22 20 4 4 Z" 
                    fill="url(#logo-grad)" 
                    className="filter drop-shadow-[0_4px_6px_rgba(79,70,229,0.18)]" 
                  />

                  <defs>
                    <linearGradient id="logo-grad" x1="4" y1="4" x2="50" y2="36" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#4f46e5" />
                      <stop offset="1" stopColor="#0ea5e9" />
                    </linearGradient>
                    <linearGradient id="trail-grad" x1="1" y1="4" x2="47" y2="36" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#6366f1" stopOpacity="0.8" />
                      <stop offset="1" stopColor="#38bdf8" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* "ST" centered lettering (offset slightly right to account for left crescent cutout) */}
                <span className="relative font-black text-[17px] tracking-wider text-white z-10 select-none pl-2.5 transform group-hover/logo:scale-105 transition-transform duration-300 italic">
                  ST
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg tracking-tight leading-none text-slate-950 group-hover/logo:text-indigo-600 transition-colors">
                  {t("에스티트레이딩", "ST Trading")}
                </span>
                <span className="text-[10px] tracking-widest text-slate-500 uppercase font-semibold mt-1">ST TRADING CO.</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-1 py-2 text-sm font-semibold tracking-wide transition-colors duration-200 cursor-pointer ${
                    activeView === item.id ? "text-indigo-600 font-bold" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.subItems && (
                    <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                  )}
                </button>
                
                {/* Dropdown menu if sub-items exist */}
                {item.subItems && (
                  <div className="absolute left-1/2 -translate-x-1/2 pt-2 w-48 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                    <div className="py-2 px-1 rounded-xl bg-white border border-slate-200/80 shadow-lg">
                      {item.subItems.map((sub, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleNavClick(item.id, sub.subId)}
                          className={`w-full text-left px-4 py-2.5 text-xs rounded-lg transition-colors cursor-pointer ${
                            activeView === item.id && activeSubView === sub.subId
                              ? "bg-slate-50 text-indigo-600 font-bold"
                              : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                          }`}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isActualAdmin && (
              <button
                onClick={() => handleNavClick("admin")}
                className={`py-2 text-sm font-semibold tracking-wide transition-colors duration-200 flex items-center space-x-1.5 cursor-pointer ${
                  activeView === "admin" ? "text-amber-600 font-bold" : "text-slate-600 hover:text-amber-600"
                }`}
              >
                <Shield className="w-4 h-4 text-amber-500" />
                <span>ADMIN PORTAL</span>
              </button>
            )}
          </nav>

          {/* Desktop Language Switcher */}
          <div className="hidden md:flex items-center space-x-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200/50">
            <button
              onClick={() => setLanguage("ko")}
              className={`px-3 py-1 text-[11px] font-bold rounded-md transition-all cursor-pointer ${
                language === "ko"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              KR
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`px-3 py-1 text-[11px] font-bold rounded-md transition-all cursor-pointer ${
                language === "en"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              EN
            </button>
          </div>

          {/* Mobile Menu Button & Language toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/50 text-[10px] font-bold">
              <button
                onClick={() => setLanguage("ko")}
                className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                  language === "ko" ? "bg-white text-indigo-600 shadow-xs" : "text-slate-500"
                }`}
              >
                KR
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                  language === "en" ? "bg-white text-indigo-600 shadow-xs" : "text-slate-500"
                }`}
              >
                EN
              </button>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-500 hover:text-slate-900 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-4 shadow-md"
          >
            <div className="space-y-1">
              {navItems.map((item) => (
                <div key={item.id} className="py-1">
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold tracking-wide transition-colors cursor-pointer ${
                      activeView === item.id ? "bg-slate-100 text-indigo-600 font-bold" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {item.label}
                  </button>
                  {item.subItems && (
                    <div className="pl-6 mt-1 space-y-1">
                      {item.subItems.map((sub, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleNavClick(item.id, sub.subId)}
                          className={`w-full text-left py-1.5 text-xs rounded-md px-2.5 transition-colors cursor-pointer ${
                            activeView === item.id && activeSubView === sub.subId
                              ? "text-indigo-600 font-bold bg-indigo-50/75"
                              : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                          }`}
                        >
                          • {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isActualAdmin && (
                <button
                  onClick={() => handleNavClick("admin")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold tracking-wide flex items-center space-x-2 mt-2 cursor-pointer ${
                    activeView === "admin" ? "bg-amber-500/10 text-amber-600" : "text-amber-600 hover:bg-slate-50"
                  }`}
                >
                  <Shield className="w-4 h-4 text-amber-500" />
                  <span>ADMIN PORTAL</span>
                </button>
              )}
            </div>

            {/* Mobile Language Switcher (additional indicator) */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-4 px-2">
              <span className="text-xs font-semibold text-slate-500 flex items-center space-x-1">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>Language / 언어</span>
              </span>
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/50 text-[11px] font-bold">
                <button
                  onClick={() => {
                    setLanguage("ko");
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                    language === "ko" ? "bg-white text-indigo-600 shadow-xs" : "text-slate-500"
                  }`}
                >
                  한국어
                </button>
                <button
                  onClick={() => {
                    setLanguage("en");
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                    language === "en" ? "bg-white text-indigo-600 shadow-xs" : "text-slate-500"
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
