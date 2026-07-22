import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Company from "./components/Company";
import ProductSection from "./components/ProductSection";
import InquiryForm from "./components/InquiryForm";
import AdminPortal from "./components/AdminPortal";
import { Mail, Phone, MapPin, Shield, Building, Globe } from "lucide-react";
import { useLanguage } from "./contexts/LanguageContext";

export default function App() {
  const [activeView, setActiveView] = useState("home");
  const [activeSubView, setActiveSubView] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [isAdminDemo, setIsAdminDemo] = useState(false);
  const { t } = useLanguage();

  React.useEffect(() => {
    document.title = t("에스티트레이딩", "ST Trading");
  }, [t]);

  const handleViewChange = (viewId: string, subId?: string) => {
    setActiveView(viewId);
    if (subId) {
      setActiveSubView(subId);
    } else {
      // Setup smart defaults
      if (viewId === "company") {
        setActiveSubView("greeting");
      } else if (viewId === "product") {
        setActiveSubView("all");
      } else {
        setActiveSubView("all");
      }
    }
    // Instantly scroll to the top of the page when shifting views
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white antialiased">
      
      {/* 1. Global GNB Header */}
      <Navbar
        activeView={activeView}
        activeSubView={activeSubView}
        onViewChange={handleViewChange}
        isAdminDemo={isAdminDemo}
        setIsAdminDemo={setIsAdminDemo}
      />

      {/* Main Content Area */}
      <main className="flex-grow pt-20">
        {activeView === "home" && (
          <Home onViewChange={handleViewChange} />
        )}

        {activeView === "company" && (
          <Company
            activeTab={activeSubView}
            onSubViewChange={(tab) => handleViewChange("company", tab)}
          />
        )}

        {activeView === "product" && (
          <ProductSection
            selectedCategory={activeSubView as any}
            setSelectedCategory={(cat) => handleViewChange("product", cat)}
            onSelectProduct={setSelectedProduct}
            onViewChange={handleViewChange}
          />
        )}

        {activeView === "inquiry" && (
          <InquiryForm
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
          />
        )}

        {activeView === "admin" && (
          <AdminPortal isAdminDemo={isAdminDemo} />
        )}
      </main>

      {/* 2. Corporate Footer */}
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-slate-900 pb-12 mb-12">
            
            {/* Column 1: Brand & Desc */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center space-x-3 text-white cursor-pointer group/footer-logo" onClick={() => handleViewChange("home")}>
                <div className="relative w-12 h-9 flex items-center justify-center shrink-0">
                  <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 54 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M 4 4 L 34 4 A 16 16 0 0 1 34 36 L 4 36 Q 22 20 4 4 Z" 
                      fill="url(#footer-logo-grad)" 
                      className="opacity-25 blur-md transform translate-y-0.5" 
                    />
                    <path 
                      d="M 1 4 L 31 4 A 16 16 0 0 1 31 36 L 1 36 Q 19 20 1 4 Z" 
                      fill="url(#footer-trail-grad)" 
                      className="opacity-40 transform translate-x-[-2px] group-hover/footer-logo:translate-x-[-4px] transition-transform duration-300" 
                    />
                    <path 
                      d="M 4 4 L 34 4 A 16 16 0 0 1 34 36 L 4 36 Q 22 20 4 4 Z" 
                      fill="url(#footer-logo-grad)" 
                    />
                    <defs>
                      <linearGradient id="footer-logo-grad" x1="4" y1="4" x2="50" y2="36" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#4f46e5" />
                        <stop offset="1" stopColor="#0ea5e9" />
                      </linearGradient>
                      <linearGradient id="footer-trail-grad" x1="1" y1="4" x2="47" y2="36" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#6366f1" stopOpacity="0.8" />
                        <stop offset="1" stopColor="#38bdf8" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="relative font-black text-[15px] tracking-wider text-white z-10 select-none pl-2 transform group-hover/footer-logo:scale-105 transition-transform duration-300 italic">
                    ST
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-base tracking-tight leading-none text-white">
                    {t("에스티트레이딩", "ST Trading")}
                  </span>
                  <span className="text-[9px] tracking-widest text-slate-500 uppercase mt-0.5">ST TRADING CO.</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
                {t(
                  "에스티트레이딩은 글로벌 화장품 제조사들과의 견고한 원자재 유통 총판 네트워크를 토대로 안전하고 검증된 고순도 기초 화학 원료 및 유효 진정 성분을 합리적인 단가에 공급합니다.",
                  "ST Trading provides high-purity chemical raw materials and proven cosmetic active ingredients at competitive prices, backed by our solid distribution partnerships with global cosmetic manufacturers."
                )}
              </p>
            </div>

            {/* Column 2: Legal Contacts */}
            <div className="md:col-span-5 space-y-4 text-xs">
              <p className="text-white font-bold uppercase tracking-wider text-[10px]">
                {t("연락처 정보", "CONTACT INFORMATION")}
              </p>
              <div className="space-y-2.5">
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="font-semibold text-slate-300 whitespace-nowrap">
                    {t("전화번호: 031-5196-6151", "Tel: +82-31-5196-6151")}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="whitespace-nowrap">
                    {t("이메일: sttrading@naver.com", "Email: sttrading@naver.com")}
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                  <span className="leading-snug tracking-tight md:whitespace-nowrap lg:whitespace-nowrap">
                    {t(
                      "본사: 경기도 안양시 만안구 덕천로152번길 25, 안양ISBIZ타워 729A호",
                      "HQ: Rm 729A, Anyang ISBIZ Tower, 25 Deokcheon-ro 152beon-gil, Manan-gu, Anyang-si, Gyeonggi-do, Republic of Korea"
                    )}
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                  <span className="leading-snug tracking-tight md:whitespace-nowrap lg:whitespace-nowrap">
                    {t(
                      "공장: 경기도 안양시 만안구 덕천로152번길 25, 안양ISBIZ타워 B148호",
                      "Factory: Rm B148, Anyang ISBIZ Tower, 25 Deokcheon-ro 152beon-gil, Manan-gu, Anyang-si, Gyeonggi-do, Republic of Korea"
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Column 3: Quick Links */}
            <div className="md:col-span-3 space-y-4 text-xs">
              <p className="text-white font-bold uppercase tracking-wider text-[10px]">
                {t("사업자 정보", "BUSINESS INFO")}
              </p>
              <div className="space-y-1.5">
                <p>
                  {t("사업자 등록번호: 134-23-69674", "Business Reg. No: 134-23-69674")}
                </p>
                <p>
                  {t("대표이사: 한상의", "CEO: Han Sang-ui")}
                </p>
                <p className="text-[10px] text-slate-500 mt-2">Certified for High Purity Raw Material Logistics</p>
              </div>
            </div>

          </div>

          {/* Copyright Section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 ST TRADING CO., LTD. All Rights Reserved.</p>
            
            <div className="flex space-x-4">
              <button onClick={() => handleViewChange("company", "greeting")} className="hover:text-slate-300 transition-colors cursor-pointer">
                {t("회사소개", "Company Info")}
              </button>
              <button onClick={() => handleViewChange("product", "all")} className="hover:text-slate-300 transition-colors cursor-pointer">
                {t("취급원료", "Products")}
              </button>
              <button onClick={() => handleViewChange("inquiry")} className="hover:text-slate-300 transition-colors cursor-pointer">
                {t("견적문의", "Inquiry")}
              </button>
              <span className="text-slate-700">|</span>
              <span className="text-indigo-400 font-semibold uppercase tracking-wider text-[10px]">K-Beauty Partner</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
