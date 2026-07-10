import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MessageSquare, Compass, Info, Check, Sparkles } from "lucide-react";
import { PRODUCTS } from "../data/products";
import { Product, ProductCategory } from "../types";
import { useLanguage } from "../contexts/LanguageContext";

interface ProductSectionProps {
  onSelectProduct: (productName: string) => void;
  selectedCategory: ProductCategory | "all";
  setSelectedCategory: (category: ProductCategory | "all") => void;
  onViewChange?: (view: string, subView?: string) => void;
}

export default function ProductSection({
  onSelectProduct,
  selectedCategory,
  setSelectedCategory,
  onViewChange
}: ProductSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { language, t } = useLanguage();

  const categories: { id: ProductCategory | "all"; label: string; desc: string }[] = [
    { id: "all", label: t("전체보기", "All Raw Materials"), desc: t("에스티트레이딩의 모든 고품질 원료", "All high-quality cosmetic raw materials distributed by ST Trading") },
    { id: "dye", label: t("염료 / DYE", "Dyes (DYE)"), desc: t("선명하고 수용성이 뛰어난 화장품용 산성 염료", "Vibrant, highly water-soluble acid dyes for cosmetics") },
    { id: "color", label: t("색소 / COLOR", "Colorants (COLOR)"), desc: t("스킨 베이스 조정을 위한 고안정성 철산화물 무기 안료", "High-stability inorganic pigments and iron oxides for skin base makeup") },
    { id: "humectant", label: t("보습제 / HUMECTANT", "Humectants (HUMECTANT)"), desc: t("피부 수분 유지력을 극대화하는 바이오 보습 성분", "Bio-active moisturizing ingredients maximizing skin water retention") },
    { id: "active", label: t("ACTIVE (기능성)", "Active Ingredients"), desc: t("미백, 주름개선 식약처 고시 검증 유효 원료", "Certified active cosmetic ingredients for whitening, anti-wrinkle, and soothing") }
  ];

  const translateApp = (app: string) => {
    switch (app) {
      case "염모제": return t("염모제", "Hair Dye");
      case "스킨케어": return t("스킨케어", "Skin Care");
      case "메이크업": return t("메이크업", "Makeup");
      case "헤어케어": return t("헤어케어", "Hair Care");
      case "두피케어": return t("두피케어", "Scalp Care");
      case "제품안정화": return t("제품안정화", "Stabilization");
      default: return app;
    }
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
      const cleanQuery = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !cleanQuery ||
        p.name.toLowerCase().includes(cleanQuery) ||
        p.englishName.toLowerCase().includes(cleanQuery) ||
        p.description.toLowerCase().includes(cleanQuery) ||
        p.origin.toLowerCase().includes(cleanQuery);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleInquiryRequest = (productName: string) => {
    onSelectProduct(productName);
    if (onViewChange) {
      onViewChange("inquiry");
    } else {
      const element = document.getElementById("inquiry");
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <section id="product" className="py-24 bg-slate-50 text-slate-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-3.5 py-1.5 rounded-full">
            OUR PRODUCTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-4 animate-fade-in">
            {t("엄선된 화장품 원료 라인업", "Premium Cosmetic Ingredients Catalog")}
          </h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-indigo-600 to-sky-500 mx-auto mt-5 rounded-full" />
          <p className="text-slate-500 text-sm mt-4">
            {t(
              "모든 원료는 고순도 정밀 가공을 거쳐 국제 표준 규격(ISO) 및 식약처 기준을 100% 만족합니다.",
              "All ingredients undergo high-purity precision processing and are 100% compliant with international ISO and global cosmetics regulatory standards."
            )}
          </p>
        </div>

        {/* Filter and Search Controls */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm mb-12 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-150 cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/15"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 border border-slate-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:max-w-xs">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder={t("원료명, 영문명, 원산지 검색...", "Search ingredient, INCI, origin...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs font-medium pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
            />
          </div>

        </div>

        {/* Active Category Description Notice */}
        <div className="mb-8 pl-4 border-l-4 border-indigo-600">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
            {selectedCategory === "all" ? "ALL CATEGORIES" : categories.find((c) => c.id === selectedCategory)?.label}
          </p>
          <p className="text-sm font-semibold text-slate-700 mt-1">
            {categories.find((c) => c.id === selectedCategory)?.desc}
          </p>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                {/* Header background decoration */}
                <div className={`h-2.5 w-full ${
                  p.category === "dye" ? "bg-pink-500" :
                  p.category === "color" ? "bg-amber-600" :
                  p.category === "humectant" ? "bg-sky-500" : "bg-emerald-500"
                }`} />

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category Label */}
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-500 mb-3.5">
                      {p.category === "dye" ? t("염료 (Dye)", "Dye") :
                       p.category === "color" ? t("색소 (Color)", "Colorant") :
                       p.category === "humectant" ? t("보습제", "Humectant") : t("기능성 원료", "Active Ingredient")}
                    </span>

                    <h4 className="text-base font-extrabold text-slate-800 leading-snug group-hover:text-indigo-600 transition-colors">
                      {p.name}
                    </h4>
                    <p className="text-xs font-mono text-slate-400 font-medium mt-1 select-all">
                      {p.englishName}
                    </p>
                    {p.casNumber && (
                      <div className="mt-1.5">
                        <span className="inline-flex items-center text-[10px] font-mono font-medium text-indigo-600 bg-indigo-50/70 border border-indigo-100/50 rounded px-2 py-0.5 select-all">
                          CAS No. {p.casNumber}
                        </span>
                      </div>
                    )}

                    {/* Description (Translating key descriptions roughly or showing the custom descriptors) */}
                    <p className="text-slate-500 text-xs mt-4 leading-relaxed line-clamp-3">
                      {p.description}
                    </p>
                  </div>

                  <div className="mt-6 space-y-4 pt-4 border-t border-slate-100">
                    {/* Row 1: Origin & Specifications */}
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <p className="text-[10px] text-slate-400 font-medium font-sans">{t("원산지", "Origin")}</p>
                        <p className="font-semibold text-slate-700 mt-0.5">{p.origin}</p>
                      </div>
                      {p.specification && (
                        <div>
                          <p className="text-[10px] text-slate-400 font-medium font-sans">{t("규격/순도", "Purity Specs")}</p>
                          <p className="font-mono font-semibold text-slate-700 mt-0.5">{p.specification}</p>
                        </div>
                      )}
                    </div>

                    {/* Row 2: Applications & Packing (Aligned) */}
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <p className="text-[10px] text-slate-400 font-medium font-sans mb-1.5">{t("권장 적용 제형", "Applications")}</p>
                        <div className="flex flex-wrap gap-1">
                          {p.applications.map((app, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-600"
                            >
                              {translateApp(app)}
                            </span>
                          ))}
                        </div>
                      </div>
                      {p.packing && (
                        <div>
                          <p className="text-[10px] text-slate-400 font-medium font-sans mb-1.5">{t("패킹 단위", "Packaging")}</p>
                          <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">
                            {p.packing}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-5 pb-5 pt-0">
                  <button
                    onClick={() => handleInquiryRequest(`${p.name} (${p.englishName})`)}
                    className="w-full py-2.5 bg-slate-50 hover:bg-indigo-600 hover:text-white text-slate-700 text-xs font-bold rounded-xl border border-slate-100 transition-all duration-200 flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{t("이 원료 견적문의", "Get Quote for This")}</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-16 text-center shadow-inner max-w-xl mx-auto">
            <Compass className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h4 className="text-sm font-bold text-slate-800">{t("검색 조건과 일치하는 원료가 없습니다.", "No ingredients match your criteria.")}</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              {t(
                "원료명을 다시 확인하시거나, 전체보기 필터에서 카테고리를 변경해 보세요. 원하시는 특정 원료가 있다면 견적문의 폼에 직접 입력해 주시면 감사하겠습니다.",
                "Please verify spelling, or switch category tabs. If you require a specific chemical not cataloged, please submit a direct sourcing inquiry."
              )}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-6 px-4.5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors shadow-md cursor-pointer"
            >
              {t("필터 및 검색 초기화", "Reset Filter & Search")}
            </button>
          </div>
        )}

        {/* Suggestion notice */}
        <div className="bg-indigo-50/60 border border-indigo-100/50 rounded-2xl p-5.5 mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-white rounded-lg text-indigo-600 border border-indigo-100/50 shadow-sm shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-indigo-900">{t("찾으시는 원료가 라인업에 없으신가요?", "Looking for something not listed?")}</p>
              <p className="text-[11px] text-indigo-700/80 mt-1 leading-relaxed">
                {t(
                  "에스티트레이딩은 글로벌 소싱망을 통해 본 목록 외에도 약 1,200여 종 이상의 화장품 화학 원료 및 천연 추출물 수입 공급이 가능합니다.",
                  "ST Trading can import and supply over 1,200 specialized cosmetics raw chemicals, dyes, and organic natural extracts through our global manufacturer pipeline."
                )}
              </p>
            </div>
          </div>
          <button
            onClick={() => handleInquiryRequest("직접 입력 (기타 원료 소싱)")}
            className="px-4.5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shrink-0 cursor-pointer shadow-md shadow-indigo-600/10"
          >
            {t("기타 원료 소싱 문의", "Custom Sourcing Quote")}
          </button>
        </div>

      </div>
    </section>
  );
}
