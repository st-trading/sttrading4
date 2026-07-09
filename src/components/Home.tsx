import React from "react";
import { motion } from "motion/react";
import { MapPin, Phone, Mail, Award, ArrowRight, HelpCircle, FileText, Compass } from "lucide-react";

interface HomeProps {
  onViewChange: (view: string, subView?: string) => void;
}

export default function Home({ onViewChange }: HomeProps) {
  const handleCopyAddress = () => {
    navigator.clipboard.writeText("경기도 안양시 만안구 덕천로152번길 25, 안양ISBIZ타워 729A호");
    alert("도로명 주소가 클립보드에 복사되었습니다.");
  };

  return (
    <div className="py-12 bg-slate-950 text-white min-h-[75vh] flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="space-y-10">
          
          {/* Main Photo Banner Frame */}
          <div className="relative group rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl flex flex-col justify-between min-h-[400px] lg:min-h-[500px]">
            {/* Aspect ratio frame containing our high quality generated raw materials image */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src="/src/assets/images/cosmetics_raw_materials_banner_1783564904793.jpg"
                alt="Cosmetics Raw Materials - ST Trading"
                className="w-full h-full object-cover opacity-85 group-hover:scale-101 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Radial overlay to blend text */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            </div>

            {/* Top Badge */}
            <div className="relative z-10 p-6 flex justify-end items-start">
              <span className="text-[10px] font-bold text-slate-300 font-mono bg-slate-900/80 px-2.5 py-1 rounded border border-slate-700/50">
                ST-TR-2026
              </span>
            </div>

            {/* Bottom Brand Caption Overlap */}
            <div className="relative z-10 p-8 sm:p-12 pt-24">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">
                  ACTIVE INGREDIENT TOTAL DISTRIBUTION
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mt-3 text-white leading-tight">
                최상위 화장품 원료 파트너, <br />
                <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                  에스티트레이딩
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-4 max-w-2xl leading-relaxed">
                글로벌 총판 네트워크와 철저한 ISO 검증 시스템을 바탕으로 고순도 색소, 염료, 유효 진정 활성 성분을 유통합니다.
              </p>
            </div>
          </div>

          {/* Quick Portals Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-4">
            <button
              onClick={() => onViewChange("company", "greeting")}
              className="bg-slate-900 hover:bg-indigo-950/20 border border-slate-800 hover:border-indigo-500/30 rounded-2xl p-5 text-center transition-all cursor-pointer group"
            >
              <Award className="w-6 h-6 mx-auto text-indigo-400 group-hover:scale-110 transition-transform mb-2.5" />
              <span className="block text-xs font-bold text-slate-200">인사말</span>
            </button>

            <button
              onClick={() => onViewChange("product", "all")}
              className="bg-slate-900 hover:bg-sky-950/20 border border-slate-800 hover:border-sky-500/30 rounded-2xl p-5 text-center transition-all cursor-pointer group"
            >
              <Compass className="w-6 h-6 mx-auto text-sky-400 group-hover:scale-110 transition-transform mb-2.5" />
              <span className="block text-xs font-bold text-slate-200">원료도감</span>
            </button>

            <button
              onClick={() => onViewChange("inquiry")}
              className="bg-slate-900 hover:bg-emerald-950/20 border border-slate-800 hover:border-emerald-500/30 rounded-2xl p-5 text-center transition-all cursor-pointer group"
            >
              <FileText className="w-6 h-6 mx-auto text-emerald-400 group-hover:scale-110 transition-transform mb-2.5" />
              <span className="block text-xs font-bold text-slate-200">견적의뢰</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
