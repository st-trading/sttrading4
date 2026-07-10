import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn, LogOut, Shield, User, ChevronDown } from "lucide-react";
import { auth, googleProvider } from "../lib/firebase";
import { signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";

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
    { id: "home", label: "HOME" },
    {
      id: "company",
      label: "COMPANY",
      subItems: [
        { label: "인사말", subId: "greeting" },
        { label: "회사연혁", subId: "history" },
        { label: "오시는길", subId: "location" }
      ]
    },
    {
      id: "product",
      label: "PRODUCT",
      subItems: [
        { label: "전체보기", subId: "all" },
        { label: "염료 / DYE", subId: "dye" },
        { label: "색소 / COLOR", subId: "color" },
        { label: "보습제 / HUMECTANT", subId: "humectant" },
        { label: "ACTIVE (기능성)", subId: "active" }
      ]
    },
    { id: "inquiry", label: "C/S (견적문의)", subItems: [{ label: "견적문의", subId: "all" }] }
  ];

  const handleNavClick = (viewId: string, subId?: string) => {
    onViewChange(viewId, subId);
    setMobileMenuOpen(false);
  };

  return (
    <header id="navbar-header" className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 text-slate-800 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick("home")}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-sky-400 flex items-center justify-center shadow-md shadow-indigo-500/10">
                <span className="font-extrabold text-xl tracking-wider text-white">ST</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight leading-none text-slate-800">에스티트레이딩</span>
                <span className="text-[10px] tracking-widest text-slate-500 uppercase font-medium mt-1">ST TRADING CO.</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
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

          {/* Actions & Profile (Desktop) - Removed as requested */}
          <div className="hidden md:flex items-center">
            {/* Kept empty to maintain structural alignment or removed */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
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
            className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-3 shadow-md"
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

            {/* Removed mobile actions per request */}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
