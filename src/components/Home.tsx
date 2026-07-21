import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, FileText, Compass } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

// Define custom professional background images from public directory
const slides = [
  {
    id: 1,
    img: "/images/bg_pink_1784608963607.jpg",
    titleKo: "최상위 화장품 원료 소싱 및 연구 개발",
    titleEn: "Top-Tier Cosmetics Raw Materials Sourcing & R&D"
  },
  {
    id: 2,
    img: "/images/bg_blue_1784608947042.jpg",
    titleKo: "엄격한 규격 관리 기반의 고순도 유효 성분",
    titleEn: "High-Purity Active Ingredients under Strict Standard Control"
  },
  {
    id: 3,
    img: "/images/bg_leaves_1784608977344.jpg",
    titleKo: "혁신적인 처방과 맞춤형 원료 솔루션",
    titleEn: "Innovative Formulations & Customized Ingredient Solutions"
  },
  {
    id: 4,
    img: "/images/bg_gray_1784608929625.jpg",
    titleKo: "지속 가능한 100% 비건 및 친환경 바이오 원료",
    titleEn: "Sustainable 100% Vegan & Eco-Friendly Bio-Ingredients"
  }
];

interface HomeProps {
  onViewChange: (view: string, subView?: string) => void;
}

export default function Home({ onViewChange }: HomeProps) {
  const { t, language } = useLanguage();
  const [currentIdx, setCurrentIdx] = useState(0);
  
  const SLIDE_DURATION = 6000; // 6 seconds per slide transition

  const handleNext = useCallback(() => {
    setCurrentIdx((prev) => (prev + 1) % slides.length);
  }, []);

  // Set up high-reliability slideshow autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [handleNext]);

  const selectSlide = (index: number) => {
    setCurrentIdx(index);
  };

  const activeSlide = slides[currentIdx];

  return (
    <div 
      className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden bg-slate-50 py-12 lg:py-0"
    >
      {/* 1. Full-Bleed Background Slideshow */}
      <div className="absolute inset-0 w-full h-full z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={activeSlide.img}
              alt={language === "en" ? activeSlide.titleEn : activeSlide.titleKo}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Soft left-to-right gradient on desktop to secure text contrast, leaving the rest completely transparent */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/10 to-transparent hidden lg:block" />
        
        {/* Balanced overall overlay on mobile for strong contrast */}
        <div className="absolute inset-0 bg-white/25 lg:hidden" />
      </div>

      {/* 2. Main Content Layout Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6 sm:py-12">
          
          {/* Left Column: Premium Text Content and Slide Controls */}
          <div className="col-span-1 lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 lg:space-y-8 bg-white/60 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-6 sm:p-10 lg:p-0 rounded-3xl border border-white/30 lg:border-none shadow-lg lg:shadow-none max-w-xl mx-auto lg:mx-0">
            
            {/* Premium Corporate Badge */}
            <div className="inline-flex">
               <span className="text-[10px] sm:text-xs font-bold tracking-widest px-4 py-1.5 rounded-full border shadow-sm font-mono uppercase bg-indigo-50/95 text-indigo-700 border-indigo-200/80">
                ACTIVE INGREDIENT TOTAL DISTRIBUTION
              </span>
            </div>

            {/* Main Display Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {t("최상위 화장품 원료 파트너, 에스티트레이딩", "Top-Tier Cosmetics Partner, ST Trading")}
            </h1>

            {/* Detailed Paragraph Descriptor */}
            <p className="text-xs sm:text-sm md:text-base text-slate-700 font-semibold leading-relaxed max-w-lg">
              {t(
                "글로벌 총판 네트워크와 철저한 ISO 검증 시스템을 바탕으로 고순도 색소, 염료, 유효 진정 활성 성분을 유통합니다.",
                "Based on our global distribution network and thorough ISO verification system, we distribute high-purity pigments, dyes, and effective soothing active ingredients."
              )}
            </p>

            {/* Page indicator dots aligned left on desktop */}
            <div className="flex items-center space-x-3.5 pt-2">
              {slides.map((slide, index) => {
                const isActive = index === currentIdx;
                return (
                  <button
                    key={slide.id}
                     onClick={() => selectSlide(index)}
                    className="w-7 h-7 rounded-full flex items-center justify-center focus:outline-none cursor-pointer bg-transparent border-none group relative"
                    title={`Go to slide ${index + 1}`}
                  >
                    {isActive && (
                      <motion.span 
                        layoutId="activeDotRing"
                        className="absolute inset-0 rounded-full border-2 border-indigo-600"
                        transition={{ type: "spring", stiffness: 300, damping: 28 }}
                      />
                    )}
                    <span className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      isActive 
                        ? "bg-indigo-600 scale-110" 
                        : "bg-slate-500 group-hover:bg-indigo-600"
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Desktop Navigation Shortcut row */}
            <div className="hidden lg:flex items-center space-x-4 pt-4 w-full">
              <button
                onClick={() => onViewChange("company", "greeting")}
                className="flex-1 bg-white hover:bg-slate-50 text-slate-800 font-bold py-3.5 px-6 rounded-xl border border-slate-200/80 shadow-sm transition-all duration-200 flex items-center justify-center space-x-2 text-sm hover:shadow-md cursor-pointer"
              >
                <Award className="w-4 h-4 text-indigo-600" />
                <span>{t("인사말", "CEO Greeting")}</span>
              </button>
              <button
                onClick={() => onViewChange("product", "all")}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-sm transition-all duration-200 flex items-center justify-center space-x-2 text-sm hover:shadow-md cursor-pointer"
              >
                <Compass className="w-4 h-4 text-white" />
                <span>{t("원료도감", "Ingredient Catalog")}</span>
              </button>
              <button
                onClick={() => onViewChange("inquiry")}
                className="flex-1 bg-white hover:bg-slate-50 text-slate-800 font-bold py-3.5 px-6 rounded-xl border border-slate-200/80 shadow-sm transition-all duration-200 flex items-center justify-center space-x-2 text-sm hover:shadow-md cursor-pointer"
              >
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>{t("견적의뢰", "Request Quote")}</span>
              </button>
            </div>

          </div>

          {/* Right Column: Kept completely empty to allow the beautiful cosmetic bottles and raw materials in the background to be fully seen */}
          <div className="hidden lg:block lg:col-span-5 h-full min-h-[300px]" />

        </div>

        {/* Mobile Navigation Shortcut row */}
        <div className="lg:hidden w-full pt-4 max-w-md mx-auto">
          <div className="grid grid-cols-3 gap-3 w-full">
            <button
              onClick={() => onViewChange("company", "greeting")}
              className="bg-white/80 backdrop-blur-md active:bg-white border border-white/60 shadow-md rounded-2xl p-4 text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-1"
            >
              <Award className="w-5 h-5 text-indigo-600" />
              <span className="block text-[11px] font-extrabold text-slate-800">
                {t("인사말", "CEO Greeting")}
              </span>
            </button>

            <button
               onClick={() => onViewChange("product", "all")}
              className="bg-white/80 backdrop-blur-md active:bg-white border border-white/60 shadow-md rounded-2xl p-4 text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-1"
            >
              <Compass className="w-5 h-5 text-indigo-600" />
              <span className="block text-[11px] font-extrabold text-slate-800">
                {t("원료도감", "Ingredient Catalog")}
              </span>
            </button>

            <button
              onClick={() => onViewChange("inquiry")}
              className="bg-white/80 backdrop-blur-md active:bg-white border border-white/60 shadow-md rounded-2xl p-4 text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-1"
            >
              <FileText className="w-5 h-5 text-indigo-600" />
              <span className="block text-[11px] font-extrabold text-slate-800">
                {t("견적의뢰", "Request Quote")}
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
