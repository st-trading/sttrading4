import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
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
    <header id="navbar-header" className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick("home")}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-sky-400 flex items-center justify-center shadow-md shadow-indigo-500/20">
                <span className="font-extrabold text-xl tracking-wider text-white">ST</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight leading-none text-white">에스티트레이딩</span>
                <span className="text-[10px] tracking-widest text-slate-400 uppercase font-medium mt-1">ST TRADING CO.</span>
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
                    activeView === item.id ? "text-sky-400 font-bold" : "text-slate-300 hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.subItems && (
                    <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
                  )}
                </button>
                
                {/* Dropdown menu if sub-items exist */}
                {item.subItems && (
                  <div className="absolute left-1/2 -translate-x-1/2 pt-2 w-48 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                    <div className="py-2 px-1 rounded-xl bg-slate-800 border border-slate-700 shadow-xl">
                      {item.subItems.map((sub, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleNavClick(item.id, sub.subId)}
                          className={`w-full text-left px-4 py-2.5 text-xs rounded-lg transition-colors cursor-pointer ${
                            activeView === item.id && activeSubView === sub.subId
                              ? "bg-slate-700 text-sky-400 font-bold"
                              : "text-slate-300 hover:text-white hover:bg-slate-700/50"
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
                  activeView === "admin" ? "text-amber-400" : "text-slate-300 hover:text-amber-300"
                }`}
              >
                <Shield className="w-4 h-4 text-amber-400" />
                <span>ADMIN PORTAL</span>
              </button>
            )}
          </nav>

          {/* Actions & Profile (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Demo admin toggle */}
            <div className="flex items-center bg-slate-800/80 rounded-full px-3 py-1 border border-slate-700">
              <span className="text-[10px] text-slate-400 font-medium mr-2">ADMIN DEMO</span>
              <button
                onClick={() => setIsAdminDemo(!isAdminDemo)}
                className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-200 focus:outline-none cursor-pointer ${
                  isAdminDemo ? "bg-amber-500" : "bg-slate-600"
                }`}
              >
                <div
                  className={`w-3 h-3 bg-white rounded-full shadow-md transform duration-200 ${
                    isAdminDemo ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-full border border-slate-700 transition-colors cursor-pointer"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-6 h-6 rounded-full referrerPolicy" referrerPolicy="no-referrer" />
                  ) : (
                    <User className="w-4 h-4 text-slate-300" />
                  )}
                  <span className="text-xs font-semibold text-slate-200 max-w-[100px] truncate">
                    {user.displayName || user.email}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-800 border border-slate-700 shadow-xl overflow-hidden z-50"
                    >
                      <div className="px-4 py-3 border-b border-slate-700 bg-slate-800/50">
                        <p className="text-xs text-slate-400">Signed in as</p>
                        <p className="text-sm font-semibold text-slate-200 truncate">{user.email}</p>
                        {isActualAdmin && (
                          <span className="inline-block mt-1 px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded text-[9px] font-bold uppercase tracking-wider">
                            Administrator
                          </span>
                        )}
                      </div>
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            handleNavClick("inquiry");
                          }}
                          className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors cursor-pointer"
                        >
                          My Inquiries
                        </button>
                        {isActualAdmin && (
                          <button
                            onClick={() => {
                              setProfileDropdownOpen(false);
                              handleNavClick("admin");
                            }}
                            className="w-full text-left px-4 py-2 text-xs text-amber-300 hover:bg-slate-700/50 hover:text-amber-200 transition-colors font-medium cursor-pointer"
                          >
                            Admin Dashboard
                          </button>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2.5 text-xs text-rose-400 hover:bg-slate-700/50 hover:text-rose-300 transition-colors flex items-center space-x-2 cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>로그아웃 (Sign Out)</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-full transition-all duration-200 shadow-md shadow-indigo-600/15 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Google 로그인</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white focus:outline-none"
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
            className="md:hidden border-t border-slate-800 bg-slate-900/98 px-4 py-4 space-y-3 shadow-inner"
          >
            <div className="space-y-1">
              {navItems.map((item) => (
                <div key={item.id} className="py-1">
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold tracking-wide transition-colors cursor-pointer ${
                      activeView === item.id ? "bg-slate-800 text-sky-400 font-bold" : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
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
                              ? "text-sky-400 font-bold bg-slate-800/40"
                              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/20"
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
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold tracking-wide flex items-center space-x-2 mt-2 cursor-pointer ${
                    activeView === "admin" ? "bg-amber-500/10 text-amber-400" : "text-amber-300 hover:bg-slate-800/50"
                  }`}
                >
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span>ADMIN PORTAL</span>
                </button>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col space-y-3">
              <div className="flex items-center justify-between bg-slate-800/80 rounded-xl px-4 py-2.5 border border-slate-700">
                <span className="text-xs text-slate-400 font-medium">ADMIN DEMO (관리자 체험)</span>
                <button
                  onClick={() => setIsAdminDemo(!isAdminDemo)}
                  className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-200 focus:outline-none cursor-pointer ${
                    isAdminDemo ? "bg-amber-500" : "bg-slate-600"
                  }`}
                >
                  <div
                    className={`w-3 h-3 bg-white rounded-full shadow-md transform duration-200 ${
                      isAdminDemo ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {user ? (
                <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-800/80 flex flex-col space-y-2">
                  <div className="flex items-center space-x-3">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full referrerPolicy" referrerPolicy="no-referrer" />
                    ) : (
                      <User className="w-8 h-8 text-slate-300 bg-slate-700 p-1.5 rounded-full" />
                    )}
                    <div className="flex flex-col min-w-0">
                      <p className="text-xs font-semibold text-slate-200 truncate">{user.displayName || "Client"}</p>
                      <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-center py-2 text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 rounded-lg font-medium transition-colors border border-rose-500/20 cursor-pointer"
                  >
                    로그아웃 (Sign Out)
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-3 rounded-xl transition-colors shadow-md cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Google 계정으로 로그인</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
