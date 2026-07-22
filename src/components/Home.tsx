import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, FileText, Compass } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

// Define main slides using local static assets for instant 0-lag rendering with multi-tier fallbacks
const GITHUB_RAW_BASE = "https://raw.githubusercontent.com/st-trading/sttrading4/main/public/images";

const slides = [
  {
    id: 1,
    img: "/images/첫째.jpg",
    fallbackImg: "/images/slide1.jpg",
    rawUrl: `${GITHUB_RAW_BASE}/%EC%B2%AB%EC%A7%B8.jpg`,
    unsplashFallback: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=2000&q=80",
    titleKo: "최상위 화장품 원료 파트너,\n에스티트레이딩",
    titleEn: "Top-Tier Cosmetics Ingredients Partner, ST Trading",
    descKo: "글로벌 총판 네트워크와 철저한 ISO 검증 시스템을 바탕으로 고순도 색소, 염료, 유효 진정 활성 성분을 유통합니다.",
    descEn: "We distribute high-purity pigments, dyes, and active soothing ingredients based on a global distribution network and strict ISO verification system."
  },
  {
    id: 2,
    img: "/images/slide2.jpg",
    fallbackImg: "/images/slide2.webp",
    rawUrl: `${GITHUB_RAW_BASE}/kate-glotova-ZkZkWq8cxHo-unsplash.jpg`,
    unsplashFallback: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=2000&q=80",
    titleKo: "엄격한 규격 관리 기반의 고순도 유효 성분",
    titleEn: "High-Purity Active Ingredients under Strict Standard Control",
    descKo: "엄격한 정밀 규격 분석을 통해 원료의 안전성과 생리 활성 효능을 극대화하여 신뢰성 높은 성분을 유통합니다.",
    descEn: "We maximize and distribute cosmetic safety and physiological efficacy through rigorous analytical standard control and quality testing."
  },
  {
    id: 3,
    img: "/images/slide3.jpg",
    fallbackImg: "/images/slide3.webp",
    rawUrl: `${GITHUB_RAW_BASE}/maria-lupan-CD8_3hYj-Vc-unsplash.jpg`,
    unsplashFallback: "https://images.unsplash.com/photo-1608248597260-22c60814fefd?auto=format&fit=crop&w=2000&q=80",
    titleKo: "혁신적인 처방과 맞춤형 원료 솔루션",
    titleEn: "Innovative Formulations & Customized Ingredient Solutions",
    descKo: "고객사의 아이디어를 실현하는 독자적이고 트렌디한 처방 솔루션과 최적화된 맞춤형 원료 매칭 가이드를 제공합니다.",
    descEn: "We provide trendy, unique formulation solutions and optimized custom ingredient matching guides to bring our clients' ideas to life."
  },  {
    id: 4,
    img: "/images/slide4.jpg",
    fallbackImg: "/images/slide4.webp",
    rawUrl: `${GITHUB_RAW_BASE}/chuttersnap-lQOkpEkMRfk-unsplash.jpg`,
    unsplashFallback: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2000&q=80",
    titleKo: "지속 가능한 100% 비건 및 친환경 원료",
    titleEn: "Sustainable 100% Vegan & Eco-Friendly Raw Materials",
    descKo: "환경을 생각하는 식물성 비건 인증 원료 성분으로 클린뷰티의 미래를 선도합니다.",
    descEn: "Leading the future of clean beauty with eco-friendly plant-based vegan certified ingredients."
  }
];

interface HomeProps {
  onViewChange: (view: string, subView?: string) => void;
}

export default function Home({ onViewChange }: HomeProps) {
  const { t, language } = useLanguage();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [hasChangedSlide, setHasChangedSlide] = useState(false);
  
  const SLIDE_DURATION = 8000; // 8 seconds per slide transition as requested

  // Preload all slide images immediately on mount so transitions are instant without lag
  useEffect(() => {
    slides.forEach((slide) => {
      const img1 = new Image();
      img1.src = slide.img;
      const img2 = new Image();
      img2.src = slide.fallbackImg;
      const img3 = new Image();
      img3.src = slide.rawUrl;
    });
  }, []);

  const handleNext = useCallback(() => {
    setHasChangedSlide(true);
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
    setHasChangedSlide(true);
    setCurrentIdx(index);
  };

  const activeSlide = slides[currentIdx];

  return (
    <div 
      className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden py-12 lg:py-0"
    >
      {/* 1. Full-Bleed Background Slideshow with instant initial load & smooth hardware-accelerated zoom-out */}
      <div 
        className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-slate-900 bg-cover bg-center"
        style={{
          backgroundImage: `url("${slides[0].img}"), url("${slides[0].fallbackImg}")`,
        }}
      >
        {slides.map((slide, index) => {
          const isActive = index === currentIdx;
          const isInitialSlide = index === 0 && !hasChangedSlide;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full overflow-hidden ${
                isActive ? "z-10 opacity-100" : "z-0 opacity-0 pointer-events-none"
              }`}
              style={{
                transition: isInitialSlide
                  ? "none"
                  : isActive 
                    ? "opacity 1000ms ease-in-out, transform 8000ms cubic-bezier(0.25, 1, 0.5, 1)"
                    : "opacity 1000ms ease-in-out, transform 0ms",
                transform: isActive ? "scale(1.0) translateZ(0)" : "scale(1.08) translateZ(0)",
                willChange: "opacity, transform",
                backfaceVisibility: "hidden",
              }}
            >
              <img
                src={slide.img}
                alt={language === "en" ? slide.titleEn : slide.titleKo}
                className="w-full h-full object-cover object-center lg:object-right"
                loading={index === 0 ? "eager" : "lazy"}
                decoding={index === 0 ? "sync" : "async"}
                style={{
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden",
                }}
                onError={(e) => {
                  const target = e.currentTarget;
                  const currentSrc = target.src;
                  
                  // 1. Try local JPG if local webp fails
                  if (currentSrc.endsWith(".webp")) {
                    target.src = slide.fallbackImg;
                  }
                  // 2. Try raw GitHub CDN URL if local relative path fails
                  else if (!currentSrc.includes("raw.githubusercontent.com") && !currentSrc.includes("unsplash.com")) {
                    target.src = slide.rawUrl;
                  }
                  // 3. Fallback to Unsplash CDN if GitHub raw CDN fails
                  else if (!currentSrc.includes("unsplash.com")) {
                    target.src = slide.unsplashFallback;
                  }
                }}
              />
              {/* Soft dark gradient overlay for crisp white text legibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/55 pointer-events-none" />
            </div>
          );
        })}
      </div>

      {/* 2. Main Content Layout Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-between min-h-[82vh] py-8 sm:py-12">
        
        {/* Top/Middle: Main Hero Text Area */}
        <div className="w-full flex flex-col items-center text-center max-w-4xl mx-auto pt-14 sm:pt-20 lg:pt-28 space-y-5">
          
          {/* Dynamic Text Area with smooth cross-fade animation */}
          <div className="w-full min-h-[140px] sm:min-h-[170px] flex flex-col justify-center text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="space-y-4 sm:space-y-5"
              >
                {/* Main Display Headline */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight whitespace-pre-line break-keep [text-shadow:_0_2px_12px_rgba(0,0,0,0.6)]">
                  {language === "en" ? activeSlide.titleEn : activeSlide.titleKo}
                </h1>

                {/* Detailed Paragraph Descriptor */}
                <p className="text-base sm:text-lg lg:text-xl text-white/95 font-medium leading-relaxed max-w-3xl mx-auto break-keep [text-shadow:_0_1px_8px_rgba(0,0,0,0.6)]">
                  {language === "en" ? activeSlide.descEn : activeSlide.descKo}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom Section: Centered Slide Indicators and Action Shortcut Buttons */}
        <div className="w-full flex flex-col items-center space-y-4 pt-8 pb-2">
          
          {/* Slide Indicator Dots (Centered horizontally above the buttons) */}
          <div className="flex items-center justify-center space-x-3">
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
                      className="absolute inset-0 rounded-full border-2 border-indigo-600 bg-white/40 backdrop-blur-xs"
                      transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    />
                  )}
                  <span className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    isActive 
                      ? "bg-indigo-600 scale-110" 
                      : "bg-slate-400 group-hover:bg-indigo-600"
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Navigation Shortcut Row (Centered horizontally at bottom of picture) */}
          <div className="flex items-center justify-center space-x-2.5 sm:space-x-4 w-full max-w-lg mx-auto">
            <button
              onClick={() => onViewChange("company", "greeting")}
              className="flex-1 bg-white/90 hover:bg-white text-slate-900 font-bold py-3 px-3 sm:px-5 rounded-xl border border-white/80 shadow-md backdrop-blur-sm transition-all duration-200 flex items-center justify-center space-x-1.5 text-xs sm:text-sm hover:shadow-lg cursor-pointer"
            >
              <Award className="w-4 h-4 text-indigo-600 flex-shrink-0" />
              <span className="whitespace-nowrap">{t("인사말", "CEO Greeting")}</span>
            </button>
            
            <button
              onClick={() => onViewChange("product", "all")}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-3 sm:px-5 rounded-xl shadow-md transition-all duration-200 flex items-center justify-center space-x-1.5 text-xs sm:text-sm hover:shadow-lg cursor-pointer"
            >
              <Compass className="w-4 h-4 text-white flex-shrink-0" />
              <span className="whitespace-nowrap">{t("원료도감", "Ingredient Catalog")}</span>
            </button>

            <button
              onClick={() => onViewChange("inquiry")}
              className="flex-1 bg-white/90 hover:bg-white text-slate-900 font-bold py-3 px-3 sm:px-5 rounded-xl border border-white/80 shadow-md backdrop-blur-sm transition-all duration-200 flex items-center justify-center space-x-1.5 text-xs sm:text-sm hover:shadow-lg cursor-pointer"
            >
              <FileText className="w-4 h-4 text-indigo-600 flex-shrink-0" />
              <span className="whitespace-nowrap">{t("견적의뢰", "Request Quote")}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
