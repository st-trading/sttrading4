import React from "react";
import { motion } from "framer-motion";
import { Award, FileText, Compass } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const bannerImg = "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&auto=format&fit=crop";
const bgImg = "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop";

interface HomeProps {
  onViewChange: (view: string, subView?: string) => void;
}

export default function Home({ onViewChange }: HomeProps) {
  const { t } = useLanguage();

  return (
    <div 
      className="py-16 min-h-[80vh] flex flex-col justify-center relative bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* Very light overlay to preserve the soft, dreamy high-key light of the uploaded image without blocking it */}
      <div className="absolute inset-0 bg-white/20 z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        <div className="space-y-12">
          
          {/* Main Photo Banner Frame */}
          <div className="relative group rounded-3xl overflow-hidden border border-slate-200/60 bg-white/50 shadow-xl shadow-slate-200/40 flex flex-col justify-between min-h-[420px] lg:min-h-[520px]">
            {/* Aspect ratio frame containing our high quality generated raw materials image */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={bannerImg}
                alt="Cosmetics Raw Materials - ST Trading"
                className="w-full h-full object-cover opacity-90 group-hover:scale-[1.01] transition-transform duration-[1.5s] ease-out"
                referrerPolicy="no-referrer"
              />
              {/* Soft white gradient overlay to blend description beautifully with background */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
            </div>

            {/* Top Badge */}
            <div className="relative z-10 p-6 flex justify-end items-start">
              <span className="text-[10px] font-bold text-slate-500 font-mono bg-white/95 px-3 py-1 rounded-full border border-slate-200/80 shadow-sm">
                ST-TR-2026
              </span>
            </div>

            {/* Bottom Brand Caption Overlap */}
            <div className="relative z-10 p-8 sm:p-12 pt-24 bg-gradient-to-t from-white/95 via-white/80 to-transparent">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
                <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase">
                  {t("최상위 활성원료 유통 유니온", "ACTIVE INGREDIENT TOTAL DISTRIBUTION")}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mt-3 text-slate-900 leading-tight animate-fade-in">
                {t("최상위 화장품 원료 파트너,", "Premier Cosmetic Ingredients Partner,")}<br />
                <span className="bg-gradient-to-r from-indigo-600 to-sky-600 bg-clip-text text-transparent">
                  {t("에스티트레이딩", "ST Trading")}
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-4 max-w-2xl leading-relaxed font-medium">
                {t(
                  "글로벌 총판 네트워크와 철저한 ISO 검증 시스템을 바탕으로 고순도 색소, 염료, 유효 진정 활성 성분을 유통합니다.",
                  "We distribute high-purity dyes, colorants, and active soothing ingredients based on a robust global master distributor network and certified ISO verification systems."
                )}
              </p>
            </div>
          </div>

          {/* Quick Portals Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-2">
            <button
              onClick={() => onViewChange("company", "greeting")}
              className="bg-white/80 backdrop-blur-md hover:bg-white border border-slate-200/80 hover:border-indigo-200 shadow-sm hover:shadow-md rounded-2xl p-6 text-center transition-all duration-300 cursor-pointer group"
            >
              <Award className="w-6 h-6 mx-auto text-indigo-600 group-hover:scale-110 transition-transform mb-2.5 duration-300" />
              <span className="block text-xs font-bold text-slate-700 group-hover:text-indigo-600 transition-colors duration-300">
                {t("인사말", "CEO Greeting")}
              </span>
            </button>

            <button
              onClick={() => onViewChange("product", "all")}
              className="bg-white/80 backdrop-blur-md hover:bg-white border border-slate-200/80 hover:border-indigo-200 shadow-sm hover:shadow-md rounded-2xl p-6 text-center transition-all duration-300 cursor-pointer group"
            >
              <Compass className="w-6 h-6 mx-auto text-indigo-600 group-hover:scale-110 transition-transform mb-2.5 duration-300" />
              <span className="block text-xs font-bold text-slate-700 group-hover:text-indigo-600 transition-colors duration-300">
                {t("원료도감", "Ingredient Catalog")}
              </span>
            </button>

            <button
              onClick={() => onViewChange("inquiry")}
              className="bg-white/80 backdrop-blur-md hover:bg-white border border-slate-200/80 hover:border-indigo-200 shadow-sm hover:shadow-md rounded-2xl p-6 text-center transition-all duration-300 cursor-pointer group"
            >
              <FileText className="w-6 h-6 mx-auto text-indigo-600 group-hover:scale-110 transition-transform mb-2.5 duration-300" />
              <span className="block text-xs font-bold text-slate-700 group-hover:text-indigo-600 transition-colors duration-300">
                {t("견적의뢰", "Request Quote")}
              </span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
