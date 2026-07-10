import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Award, Copy, Check, ExternalLink } from "lucide-react";
import { CEO_MESSAGE, COMPANY_HISTORY } from "../data/products";

interface CompanyProps {
  activeTab: string;
  onSubViewChange: (tab: string) => void;
}

export default function Company({ activeTab = "greeting", onSubViewChange }: CompanyProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText("경기도 안양시 만안구 덕천로152번길 25, 안양ISBIZ타워 729A호");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: "greeting", label: "CEO 인사말" },
    { id: "history", label: "회사 연혁" },
    { id: "location", label: "오시는 길" }
  ];

  return (
    <section id="company" className="py-16 bg-white text-slate-900 min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-3.5 py-1.5 rounded-full">
            ABOUT ST TRADING
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-4">
            에스티트레이딩 소개
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
              className="bg-slate-50 rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-100 shadow-sm"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Left Decorator */}
                <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-6">
                    <Award className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 tracking-tight leading-snug whitespace-pre-line">
                    {CEO_MESSAGE.title}
                  </h3>
                  <p className="text-sm font-semibold text-indigo-600 mt-4">
                    CEO MESSAGE
                  </p>
                </div>

                {/* Right content paragraphs */}
                <div className="lg:col-span-8 flex flex-col space-y-6">
                  <p className="text-base text-indigo-900/90 font-semibold leading-relaxed whitespace-pre-line border-l-4 border-indigo-500 pl-4 py-1">
                    {CEO_MESSAGE.subtitle}
                  </p>
                  
                  <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                    {CEO_MESSAGE.content.map((para, index) => (
                      <p key={index}>{para}</p>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-slate-200/80 flex justify-end">
                    <div className="text-right">
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">ST TRADING CO., LTD.</p>
                      <p className="text-sm font-bold text-slate-800 mt-1">{CEO_MESSAGE.signature}</p>
                    </div>
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
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">회사 연혁</h3>
                <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                  신뢰를 바탕으로 견고하게 성장해 온 에스티트레이딩의 주요 성과와 역사를 소개합니다.
                </p>
              </div>

              <div className="lg:col-span-8 relative border-l-2 border-slate-100 pl-8 ml-4 sm:ml-6 space-y-12">
                {COMPANY_HISTORY.map((item, yearIdx) => (
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
                            {event.month}월
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
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">오시는 길</h3>
                </div>
                
                {/* Action buttons for map */}
                <div className="mt-4 lg:mt-0 flex flex-wrap gap-2.5">
                  <button
                    onClick={handleCopyAddress}
                    className="inline-flex items-center space-x-1.5 px-4.5 py-2.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>{copied ? "주소 복사 완료" : "도로명 주소 복사"}</span>
                  </button>
                  
                  <a
                    href="https://map.naver.com/v5/search/%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EC%95%88%EC%96%91%EC%8B%9C%20%EB%A7%8C%EC%95%88%EA%B5%AC%20%EB%8D%95%EC%B2%9C%EB%A1%9C152%EB%B2%88%EA%B8%B8%2025/address/14125867.756286242,4495574.630044569"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-4.5 py-2.5 bg-green-500 hover:bg-green-600 text-white text-xs font-bold rounded-xl shadow-md shadow-green-500/10 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>네이버 지도에서 보기</span>
                  </a>
                </div>
              </div>

              {/* Premium Map Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                
                {/* Visual map preview block */}
                <div className="lg:col-span-8 rounded-3xl overflow-hidden border border-slate-200/80 shadow-md h-[400px] relative bg-slate-50 flex flex-col">
                  
                  {/* Interactive clean SVG Map representing ISBIZ Tower location */}
                  <div className="flex-1 relative overflow-hidden bg-slate-100/90 flex items-center justify-center p-4">
                    
                    {/* Clean SVG visual road layout */}
                    <svg className="absolute inset-0 w-full h-full text-slate-300" xmlns="http://www.w3.org/2000/svg">
                      {/* Background grid */}
                      <defs>
                        <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f1f5f9" strokeWidth="1"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#map-grid)" />

                      {/* Rivers / Greenery representation */}
                      <path d="M-10,340 C150,330 300,280 500,290 C600,295 700,320 900,340 L900,410 L-10,410 Z" fill="#e2f1e4" opacity="0.8" />
                      <text x="350" y="370" fill="#8fba97" className="text-[11px] font-bold tracking-wider font-sans">안양천 (Anyang Stream)</text>

                      {/* High speed/major roads */}
                      <line x1="120" y1="-10" x2="120" y2="420" stroke="#cbd5e1" strokeWidth="24" />
                      <line x1="120" y1="-10" x2="120" y2="420" stroke="#f8fafc" strokeWidth="16" />
                      
                      {/* Secondary roads */}
                      <line x1="-10" y1="180" x2="910" y2="180" stroke="#cbd5e1" strokeWidth="20" />
                      <line x1="-10" y1="180" x2="910" y2="180" stroke="#f8fafc" strokeWidth="12" />

                      {/* 덕천로 152번길 */}
                      <line x1="450" y1="180" x2="450" y2="340" stroke="#94a3b8" strokeWidth="16" />
                      <line x1="450" y1="180" x2="450" y2="340" stroke="#f1f5f9" strokeWidth="10" />

                      {/* Labels for roads */}
                      <text x="110" y="80" fill="#94a3b8" transform="rotate(-90 110 80)" className="text-[10px] font-bold tracking-wide font-sans">덕천로 (Deokcheon-ro)</text>
                      <text x="250" y="174" fill="#94a3b8" className="text-[10px] font-bold tracking-wide font-sans">덕천로 152번길</text>

                      {/* Metro Stations */}
                      <g transform="translate(120, 40)">
                        <rect x="-40" y="-12" width="80" height="24" rx="6" fill="#1e3a8a" />
                        <text x="0" y="4" fill="#ffffff" textAnchor="middle" className="text-[10px] font-bold font-sans">명학역 (1호선)</text>
                      </g>
                      <line x1="120" y1="40" x2="450" y2="240" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 4" />

                      {/* Target Landmark Anchor: 안양ISBIZ타워 */}
                      <g transform="translate(450, 240)">
                        {/* Pulsing ring */}
                        <circle r="22" fill="#6366f1" className="animate-ping opacity-25" />
                        <circle r="12" fill="#6366f1" opacity="0.15" />
                        <circle r="6" fill="#4f46e5" />
                      </g>
                    </svg>

                    {/* Highly readable map popover card over the exact point */}
                    <div className="absolute top-[160px] left-[50%] -translate-x-1/2 bg-white rounded-2xl p-4 shadow-xl border border-indigo-100 flex flex-col items-center max-w-[240px] text-center z-10">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mb-2">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <h5 className="text-xs font-extrabold text-slate-800 leading-none">안양ISBIZ타워</h5>
                      <p className="text-[10px] text-indigo-600 font-bold mt-1">729A호 에스티트레이딩</p>
                      <p className="text-[9px] text-slate-400 mt-1 leading-snug">안양시 만안구 덕천로152번길 25</p>
                    </div>
                  </div>

                  {/* Bottom info bar */}
                  <div className="bg-slate-900 text-white px-6 py-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                      <span className="font-semibold text-slate-200">주소: 경기도 안양시 만안구 덕천로152번길 25, 안양ISBIZ타워 729A호</span>
                    </div>
                    <button
                      onClick={handleCopyAddress}
                      className="text-[11px] font-bold text-sky-400 hover:text-sky-300 flex items-center space-x-1 cursor-pointer"
                    >
                      <span>주소 복사하기</span>
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Side Column: Direction details & info */}
                <div className="lg:col-span-4 flex flex-col justify-between bg-slate-50 border border-slate-200/60 rounded-3xl p-6 sm:p-8">
                  <div className="space-y-6">
                    <h4 className="text-base font-extrabold text-slate-800 border-b border-slate-200 pb-3">대중교통 안내</h4>
                    
                    <div className="space-y-5">
                      <div className="flex items-start space-x-3.5">
                        <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          1
                        </div>
                        <div>
                          <p className="text-xs font-extrabold text-slate-800">지하철 (1호선 명학역)</p>
                          <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                            <strong>명학역 2번 출구</strong>에서 도보 약 10분 소요 (직진 후 안양천 다리 전 덕천로 방향 우회전).
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3.5">
                        <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          B
                        </div>
                        <div>
                          <p className="text-xs font-extrabold text-slate-800">버스 정류장 안내</p>
                          <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                            <strong>안양ISBIZ타워 정류장</strong> 하차 후 도보 1분 (지붕 있는 큰 건물동 엘리베이터 이용 A동 7층).
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3.5">
                        <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          P
                        </div>
                        <div>
                          <p className="text-xs font-extrabold text-slate-800">자차 및 주차 안내</p>
                          <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                            안양ISBIZ타워 지상 및 지하 주차장 2시간 무료 지원 (방문 후 프론트에서 등록 요청).
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-200 mt-6 text-[11px] text-slate-400 space-y-1">
                    <p className="font-semibold">• 방문 일정 사전에 조율 요청 드립니다.</p>
                    <p>• 고객센터: 031-5196-6151 | sttrading@naver.com</p>
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
