import React, { useState, useMemo } from "react";
import { Search, MessageSquare, Compass, Info, X, ChevronRight, Check, Sparkles, Building2 } from "lucide-react";
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
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const { language, t } = useLanguage();

  const categories: { id: ProductCategory | "all"; labelKo: string; labelEn: string; descKo: string; descEn: string }[] = [
    {
      id: "all",
      labelKo: "전체보기",
      labelEn: "ALL PRODUCTS",
      descKo: "에스티트레이딩의 모든 고품질 화장품 원료 라인업",
      descEn: "All high-quality cosmetic raw materials supplied by ST Trading"
    },
    {
      id: "dye",
      labelKo: "염료 (DYE)",
      labelEn: "DYES",
      descKo: "선명한 발색과 지속력이 뛰어난 화장품용 산화 및 직접 염료",
      descEn: "Oxidation & direct dyes for cosmetics with vivid color and longevity"
    },
    {
      id: "color",
      labelKo: "색소 (COLOR)",
      labelEn: "COLORANTS",
      descKo: "안정성이 뛰어난 타르 색소 및 조색 안료",
      descEn: "High-stability tar colorants and tone-adjusting pigments"
    },
    {
      id: "humectant",
      labelKo: "보습제 (HUMECTANT)",
      labelEn: "HUMECTANTS",
      descKo: "피부 및 모발 수분 유지를 돕는 바이오 보습 성분",
      descEn: "Bio-active moisturizing ingredients maximizing moisture retention"
    },
    {
      id: "active",
      labelKo: "기능성 원료 (ACTIVE)",
      labelEn: "ACTIVE INGREDIENTS",
      descKo: "주름개선, 항산화, 진정 등 검증된 유효 기능성 성분",
      descEn: "Proven active ingredients for anti-aging, antioxidants & soothing"
    }
  ];

  const translateApp = (app: string) => {
    switch (app) {
      case "염모제": return t("염모제", "Hair Dye");
      case "스킨케어": return t("스킨케어", "Skin Care");
      case "메이크업": return t("메이크업", "Makeup");
      case "헤어케어": return t("헤어케어", "Hair Care");
      case "두피케어": return t("두피케어", "Scalp Care");
      case "제품안정화": return t("제품안정화", "Stabilization");
      case "COLORANTS": return t("색조 및 헤어 조색", "Colorants & Hair Dye");
      case "안티에이징": return t("안티에이징", "Anti-Aging");
      case "펌제": return t("펌제", "Perm Formula");
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
        (p.casNumber && p.casNumber.includes(cleanQuery));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleInquiryRequest = (productName: string) => {
    setSelectedProductForModal(null);
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

  const getCategoryLabel = (cat: ProductCategory) => {
    switch (cat) {
      case "dye": return t("염료", "Dye");
      case "color": return t("색소", "Color");
      case "humectant": return t("보습제", "Humectant");
      case "active": return t("기능성원료", "Active");
      default: return "";
    }
  };

  return (
    <section id="product" className="py-20 bg-slate-50 text-slate-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-100">
            OUR PRODUCTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-4">
            {t("취급 원료 리스트", "Cosmetic Ingredients Catalog")}
          </h2>
          <div className="h-1.5 w-16 bg-indigo-900 mx-auto mt-4 rounded-full" />
          <p className="text-slate-500 text-sm mt-3">
            {t(
              "원하시는 원료명을 클릭하시면 CAS No., 규격, 포장 단위 및 상세 기능 정보를 확인하실 수 있습니다.",
              "Click any raw material row to view CAS No., specification, packaging, and application details."
            )}
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-indigo-950 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {language === "en" ? cat.labelEn : cat.labelKo}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:max-w-xs">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder={t("원료명, INCI, CAS No. 검색...", "Search product, INCI, CAS No...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs font-medium pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
            />
          </div>

        </div>

        {/* Current Category Info Bar */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-900 inline-block" />
            {selectedCategory === "all"
              ? t("전체 원료 목록", "All Cosmetic Raw Materials")
              : categories.find((c) => c.id === selectedCategory)?.[language === "en" ? "labelEn" : "labelKo"]}
          </h3>
          <span className="text-xs font-semibold text-slate-500">
            {t(`총 ${filteredProducts.length}개 항목`, `Total ${filteredProducts.length} items`)}
          </span>
        </div>

        {/* Table View Matching User Reference Image */}
        {filteredProducts.length > 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-t-4 border-t-indigo-900">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100/90 text-slate-700 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                    <th scope="col" className="py-3.5 px-4 sm:px-6 w-1/4">PRODUCT NAME</th>
                    <th scope="col" className="py-3.5 px-4 sm:px-6 w-1/4">INCI NAME</th>
                    <th scope="col" className="py-3.5 px-4 sm:px-6 w-1/3">APPLICATION</th>
                    <th scope="col" className="py-3.5 px-4 sm:px-6 w-1/6">MANUFACTURER</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/80 text-sm">
                  {filteredProducts.map((p) => (
                    <tr
                      key={p.id}
                      onClick={() => setSelectedProductForModal(p)}
                      className="hover:bg-indigo-50/50 transition-colors cursor-pointer group"
                    >
                      {/* Product Name */}
                      <td className="py-4 px-4 sm:px-6 align-middle">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 text-sm group-hover:text-indigo-700 transition-colors">
                            {p.name}
                          </span>
                          {p.casNumber && (
                            <span className="text-[10px] font-mono text-indigo-600 font-semibold mt-0.5">
                              CAS: {p.casNumber}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* INCI Name */}
                      <td className="py-4 px-4 sm:px-6 align-middle">
                        <span className="text-slate-600 text-xs font-medium font-sans leading-relaxed block">
                          {p.englishName}
                        </span>
                      </td>

                      {/* Application / Function Description */}
                      <td className="py-4 px-4 sm:px-6 align-middle">
                        <div className="text-slate-600 text-xs leading-relaxed">
                          <div className="flex flex-wrap gap-1 mb-1">
                            {p.applications.map((app, idx) => (
                              <span
                                key={idx}
                                className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100/60"
                              >
                                {translateApp(app)}
                              </span>
                            ))}
                          </div>
                          <p className="text-slate-500 line-clamp-1 text-[11px] mt-0.5">
                            {p.description}
                          </p>
                        </div>
                      </td>

                      {/* Manufacturer: Changed all to 중국 as requested */}
                      <td className="py-4 px-4 sm:px-6 align-middle">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-800 text-xs">
                            {t("중국", "China")}
                          </span>
                          <span className="text-xs text-indigo-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline-flex items-center gap-0.5">
                            {t("상세보기", "View")}
                            <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
            <Compass className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-bold text-slate-800">
              {t("검색 조건과 일치하는 원료가 없습니다.", "No ingredients match your criteria.")}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {t("원료명이나 CAS 번호를 다시 확인하시거나 전체보기 필터를 선택해 주세요.", "Check spelling or select All Products.")}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 px-4 py-2 bg-indigo-900 text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-indigo-800 transition-colors"
            >
              {t("초기화", "Reset")}
            </button>
          </div>
        )}

        {/* Custom Sourcing Banner */}
        <div className="bg-indigo-900 text-white rounded-2xl p-6 mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-white/10 rounded-xl shrink-0">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <p className="text-sm font-bold">{t("원하시는 특정 원료가 있으신가요?", "Looking for specific cosmetic chemicals?")}</p>
              <p className="text-xs text-indigo-200 mt-0.5">
                {t(
                  "에스티트레이딩은 본 목록 외에도 약 1,200여 종 이상의 화장품 유효 원료 수입 맞춤 공급이 가능합니다.",
                  "ST Trading provides custom sourcing for over 1,200 additional cosmetic raw materials upon request."
                )}
              </p>
            </div>
          </div>
          <button
            onClick={() => handleInquiryRequest("기타 맞춤 원료 수입 소싱 문의")}
            className="px-5 py-2.5 bg-white text-indigo-900 hover:bg-amber-300 hover:text-indigo-950 text-xs font-extrabold rounded-xl shrink-0 cursor-pointer transition-colors shadow-sm"
          >
            {t("원료 소싱 견적 문의", "Custom Sourcing Quote")}
          </button>
        </div>

      </div>

      {/* Product Detail Modal */}
      {selectedProductForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-indigo-900 text-white px-6 py-4 flex items-center justify-between border-b border-indigo-800 shrink-0">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded bg-indigo-800 text-amber-300 text-[10px] font-bold uppercase">
                  {getCategoryLabel(selectedProductForModal.category)}
                </span>
                <span className="text-xs text-indigo-200 font-medium">원료 상세 사양서</span>
              </div>
              <button
                onClick={() => setSelectedProductForModal(null)}
                className="text-indigo-200 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Product Title */}
              <div>
                <h3 className="text-2xl font-black text-slate-900 leading-tight">
                  {selectedProductForModal.name}
                </h3>
                <p className="text-sm font-mono font-medium text-indigo-600 mt-1 select-all">
                  INCI / English: {selectedProductForModal.englishName}
                </p>
              </div>

              {/* Data Grid Table */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 font-bold block mb-1 uppercase tracking-wider text-[10px]">
                    PRODUCT NAME (제품명)
                  </span>
                  <span className="font-bold text-slate-800">{selectedProductForModal.name}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-bold block mb-1 uppercase tracking-wider text-[10px]">
                    INCI NAME (성분명)
                  </span>
                  <span className="font-semibold text-slate-800">{selectedProductForModal.englishName}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-bold block mb-1 uppercase tracking-wider text-[10px]">
                    MANUFACTURER (제조사/제조국)
                  </span>
                  <span className="font-bold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 inline-block">
                    {t("중국 (China)", "China")}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 font-bold block mb-1 uppercase tracking-wider text-[10px]">
                    CAS NUMBER
                  </span>
                  <span className="font-mono font-bold text-slate-800 select-all">
                    {selectedProductForModal.casNumber || "N/A"}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 font-bold block mb-1 uppercase tracking-wider text-[10px]">
                    PACKING (포장 단위)
                  </span>
                  <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 inline-block">
                    {selectedProductForModal.packing || "25KG"}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 font-bold block mb-1 uppercase tracking-wider text-[10px]">
                    SPECIFICATION (순도/규격)
                  </span>
                  <span className="font-semibold text-slate-800">
                    {selectedProductForModal.specification || "Cosmetic Grade (순도 ≥ 99.0%)"}
                  </span>
                </div>
              </div>

              {/* Recommended Applications */}
              <div>
                <span className="text-slate-500 font-bold text-xs block mb-2 uppercase tracking-wider">
                  RECOMMENDED APPLICATION (추천 적용 제형)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProductForModal.applications.map((app, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-bold px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100"
                    >
                      {translateApp(app)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <span className="text-slate-500 font-bold text-xs block mb-2 uppercase tracking-wider">
                  DESCRIPTION & FEATURES (원료 특성 및 설명)
                </span>
                <p className="text-slate-700 text-xs leading-relaxed bg-white p-4 rounded-xl border border-slate-200">
                  {selectedProductForModal.description}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                {t("샘플 신청 및 MOQ 단가 문의 가능합니다.", "Sample requests and MOQ price quotes available.")}
              </span>
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedProductForModal(null)}
                  className="w-1/2 sm:w-auto px-4 py-2.5 border border-slate-300 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  {t("닫기", "Close")}
                </button>
                <button
                  onClick={() => handleInquiryRequest(`${selectedProductForModal.name} (${selectedProductForModal.englishName})`)}
                  className="w-1/2 sm:w-auto px-5 py-2.5 bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-bold rounded-xl transition-colors shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{t("이 원료 견적 문의하기", "Get Quote for This")}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
