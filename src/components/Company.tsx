import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Award, Copy, Check, ExternalLink } from "lucide-react";
import { CEO_MESSAGE, CEO_MESSAGE_EN, COMPANY_HISTORY, COMPANY_HISTORY_EN } from "../data/products";
import { useLanguage } from "../contexts/LanguageContext";

interface CompanyProps {
  activeTab: string;
  onSubViewChange: (tab: string) => void;
}

export default function Company({ activeTab = "greeting", onSubViewChange }: CompanyProps) {
  const [copied, setCopied] = useState(false);
  const { language, t } = useLanguage();

  const googleMapUrl = language === "en"
    ? "https://www.google.com/maps/search/?api=1&query=Anyang+ISBIZ+Tower+729A"
    : "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("경기도 안양시 만안구 덕천로152번길 25 안양IS비즈타워");

  const handleCopyAddress = () => {
    const addr = language === "en"
      ? "Suite 729A, Anyang ISBIZ Tower, 25 Deokcheon-ro 152beon-gil, Manan-gu, Anyang-si, Gyeonggi-do, Republic of Korea"
      : "경기도 안양시 만안구 덕천로152번길 25, 안양ISBIZ타워 729A호";
    navigator.clipboard.writeText(addr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: "greeting", label: t("CEO 인사말", "CEO Greeting") },
    { id: "history", label: t("회사 연혁", "Company History") },
    { id: "location", label: t("오시는 길", "Location") }
  ];

  const currentCEOMessage = language === "en" ? CEO_MESSAGE_EN : CEO_MESSAGE;
  const currentHistory = language === "en" ? COMPANY_HISTORY_EN : COMPANY_HISTORY;

  return (
    <section id="company" className="py-16 bg-white text-slate-900 min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-3.5 py-1.5 rounded-full">
            ABOUT ST TRADING
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-4">
            {t("에스티트레이딩 소개", "Introduction to ST Trading")}
          </h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-indigo-600 to-sky-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Horizontal Sub-tabs Navigation */}
        <div className="flex justify-center border-b border-slate-100 mb-12">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onSubViewChange(tab.id)}
                className={`pb-4 px-3 text-sm font-bold tracking-wide border-b-2 transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "greeting" && (
            <motion.div
              key="greeting"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="bg-slate-50/80 rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/60 shadow-xs"
            >
              <div className="space-y-8">
                {/* Header Row: Title & Subtitle Aligned */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start pb-6 border-b border-slate-200/60">
                  {/* Left Title + Icon on Left */}
                  <div className="lg:col-span-7 flex items-start space-x-4">
                    <div className="p-3.5 rounded-2xl bg-indigo-100 text-indigo-600 shrink-0 mt-1 shadow-xs">
                      <Award className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight leading-snug whitespace-pre-line break-keep">
                        {currentCEOMessage.title}
                      </h3>
                      <p className="text-xs font-bold text-indigo-600 tracking-wider uppercase mt-2">
                        CEO MESSAGE & LOGISTICS
                      </p>
                    </div>
                  </div>

                  {/* Right Subtitle */}
                  <div className="lg:col-span-5 pt-1">
                    <p className="text-sm sm:text-base text-indigo-900/90 font-semibold leading-relaxed whitespace-pre-line break-keep border-l-4 border-indigo-500 pl-4 py-1">
                      {currentCEOMessage.subtitle}
                    </p>
                  </div>
                </div>

                {/* Upper row: Warehouse Photo (Left) & CEO Paragraphs (Right) aligned top-to-bottom */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
                  {/* Left: Warehouse Photo matching paragraph block height */}
                  <div className="lg:col-span-5 flex flex-col">
                    <div className="w-full h-full min-h-[300px] rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm bg-white">
                      <img 
                        src="/images/창고사진.jpg" 
                        loading="eager"
                        decoding="async"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/warehouse.jpg";
                        }}
                        alt="에스티트레이딩 원료 물류 보관 창고" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Right: CEO Message Content (Paragraphs 1 ~ 5) */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-4 sm:space-y-5 text-slate-600 text-sm sm:text-[15px] leading-relaxed">
                    {currentCEOMessage.content.map((para, index) => (
                      <p key={index} className="break-keep">{para}</p>
                    ))}
                  </div>
                </div>

                {/* Bottom row: Signature placed below the photo & text block on the right */}
                <div className="pt-4 border-t border-slate-200/60 flex justify-end text-right">
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">ST TRADING CO., LTD.</p>
                    <p className="text-base sm:text-lg font-bold text-slate-800 mt-1">{currentCEOMessage.signature}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "history" && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
            >
              <div className="lg:col-span-4 lg:sticky lg:top-24">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">STORY & HISTORY</span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  {t("회사 연혁", "Company History")}
                </h3>
                <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                  {t(
                    "신뢰를 바탕으로 견고하게 성장해 온 에스티트레이딩의 주요 성과와 역사를 소개합니다.",
                    "We introduce the main achievements and history of ST Trading, which has grown solidly based on mutual trust."
                  )}
                </p>
              </div>

              <div className="lg:col-span-8 relative border-l-2 border-slate-100 pl-8 ml-4 sm:ml-6 space-y-12">
                {currentHistory.map((item, yearIdx) => (
                  <div key={yearIdx} className="relative">
                    {/* Year Marker Circle */}
                    <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-indigo-600 border-4 border-white flex items-center justify-center shadow-sm" />
                    
                    <h4 className="text-2xl font-extrabold text-indigo-600 tracking-tight mb-6">
                      {item.year}
                    </h4>

                    <div className="space-y-5">
                      {item.events.map((event, eventIdx) => (
                        <div key={eventIdx} className="flex items-start space-x-4 bg-slate-50/50 hover:bg-slate-50 p-4 rounded-xl border border-transparent hover:border-slate-100 transition-all duration-200">
                          <span className="font-mono text-sm font-bold text-slate-400 bg-white border border-slate-200 rounded px-2 py-0.5 shadow-sm">
                            {event.month}{t("월", "")}
                          </span>
                          <p className="text-sm font-semibold text-slate-700 leading-relaxed pt-0.5">
                            {event.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "location" && (
            <motion.div
              key="location"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-10"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">LOCATION</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    {t("오시는 길", "Our Location")}
                  </h3>
                </div>
                
                {/* Action buttons for map */}
                <div className="mt-4 lg:mt-0 flex flex-wrap gap-2.5">
                  <button
                    onClick={handleCopyAddress}
                    className="inline-flex items-center space-x-1.5 px-4.5 py-2.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>{copied ? t("주소 복사 완료", "Address Copied!") : t("도로명 주소 복사", "Copy Street Address")}</span>
                  </button>
                  
                  <a
                    href="https://map.naver.com/v5/search/%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EC%95%88%EC%96%91%EC%8B%9C%20%EB%A7%8C%EC%95%88%EA%B5%AC%20%EB%8D%95%EC%B2%9C%EB%A1%9C152%EB%B2%88%EA%B8%B8%2025/address/14125867.756286242,4495574.630044569"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-4.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-500/10 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{t("네이버 지도에서 보기", "View on Naver Map")}</span>
                  </a>

                  <a
                    href={googleMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-4.5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-600/10 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{t("구글 지도에서 보기", "View on Google Maps")}</span>
                  </a>
                </div>
              </div>

              {/* Premium Map Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                
                {/* Visual map preview block */}
                <div className="lg:col-span-8 rounded-3xl overflow-hidden border border-slate-200/80 shadow-md h-[400px] relative bg-slate-50 flex flex-col">
                  
                  {/* Google Map Container with interactive zoom/pan & redirect click */}
                  <div className="flex-1 relative overflow-hidden bg-slate-100 flex items-center justify-center min-h-[300px]">
                    <iframe
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(
                        language === "en"
                          ? "Suite 729A, Anyang ISBIZ Tower, 25 Deokcheon-ro 152beon-gil, Manan-gu, Anyang-si"
                          : "경기도 안양시 만안구 덕천로152번길 25 안양IS비즈타워"
                      )}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                      className="w-full h-full border-0 absolute inset-0"
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      title="Google Map"
                    />
                    
                    {/* Hover and Click Overlay to redirect to Google Maps */}
                    <a
                      href={googleMapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-slate-900/0 hover:bg-slate-900/20 transition-all duration-300 flex items-center justify-center group z-10"
                    >
                      <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-white/95 backdrop-blur-sm px-4.5 py-2.5 rounded-2xl shadow-lg border border-slate-100 flex items-center space-x-2 text-xs font-bold text-slate-800 pointer-events-none">
                        <MapPin className="w-4 h-4 text-indigo-600 animate-bounce" />
                        <span>{t("구글 지도에서 크게 보기", "Open in Google Maps")}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </a>
                  </div>

                  {/* Bottom info bar */}
                  <div className="bg-slate-900 text-white px-6 py-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                      <span className="font-semibold text-slate-200">
                        {t(
                          "주소: 경기도 안양시 만안구 덕천로152번길 25, 안양ISBIZ타워 729A호",
                          "Address: Suite 729A, Anyang ISBIZ Tower, 25 Deokcheon-ro 152beon-gil, Manan-gu, Anyang-si, Gyeonggi-do"
                        )}
                      </span>
                    </div>
                    <button
                      onClick={handleCopyAddress}
                      className="text-[11px] font-bold text-sky-400 hover:text-sky-300 flex items-center space-x-1 cursor-pointer"
                    >
                      <span>{t("주소 복사하기", "Copy Address")}</span>
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Side Column: Direction details & info */}
                <div className="lg:col-span-4 flex flex-col justify-between bg-slate-50 border border-slate-200/60 rounded-3xl p-6 sm:p-8">
                  <div className="space-y-6">
                    <h4 className="text-base font-extrabold text-slate-800 border-b border-slate-200 pb-3">
                      {t("대중교통 안내", "Public Transit Guide")}
                    </h4>
                    
                    <div className="space-y-5">
                      <div className="flex items-start space-x-3.5">
                        <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          1
                        </div>
                        <div>
                          <p className="text-xs font-extrabold text-slate-800">{t("지하철 (1호선 명학역)", "Subway (Line 1 Myeonghak Stn)")}</p>
                          <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                            {t(
                              "명학역 2번 출구에서 도보 약 10분 소요 (직진 후 안양천 다리 전 덕천로 방향 우회전).",
                              "Take Exit 2 of Myeonghak Station, walk about 10 minutes straight, and turn right toward Deokcheon-ro right before the Anyangcheon Stream bridge."
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3.5">
                        <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          B
                        </div>
                        <div>
                          <p className="text-xs font-extrabold text-slate-800">{t("버스 정류장 안내", "Bus Stop Guide")}</p>
                          <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                            {t(
                              "안양ISBIZ타워 정류장 하차 후 도보 1분 (지붕 있는 큰 건물동 엘리베이터 이용 A동 7층).",
                              "Get off at 'Anyang ISBIZ Tower' bus stop, and walk for 1 minute (Take the elevator in the main building to the 7th floor of Building A)."
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3.5">
                        <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          P
                        </div>
                        <div>
                          <p className="text-xs font-extrabold text-slate-800">{t("자차 및 주차 안내", "Car & Parking Guide")}</p>
                          <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                            {t(
                              "안양ISBIZ타워 지상 및 지하 주차장 2시간 무료 지원 (방문 후 프론트에서 등록 요청).",
                              "Free parking for up to 2 hours is supported in both the ground and underground parking levels of Anyang ISBIZ Tower (Request register at reception)."
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-200 mt-6 text-[11px] text-slate-400 space-y-1">
                    <p className="font-semibold">{t("• 방문 일정 사전에 조율 요청 드립니다.", "• Please coordinate your visit with us in advance.")}</p>
                    <p>• {t("고객센터", "Support")}: 031-5196-6151 | sttrading@naver.com</p>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
