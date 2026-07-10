import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Clock, CheckCircle, RefreshCw, Trash2, Edit3, MessageSquare, Filter, Search, Lock, AlertTriangle, ChevronDown } from "lucide-react";
import { db, auth } from "../lib/firebase";
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { Inquiry } from "../types";

interface AdminPortalProps {
  isAdminDemo: boolean;
}

export default function AdminPortal({ isAdminDemo }: AdminPortalProps) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Filtering & Search
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Active editing state for replies
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Check if current user is authorized
  const isAuthorized = user?.email === "ehlolhan@gmail.com" || isAdminDemo;

  const fetchAllInquiries = async () => {
    if (!isAuthorized) return;
    setLoading(true);
    try {
      const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const list: Inquiry[] = [];
      querySnapshot.forEach((docSnapshot) => {
        list.push({ id: docSnapshot.id, ...docSnapshot.data() } as Inquiry);
      });
      setInquiries(list);
    } catch (err) {
      console.error("Error fetching all inquiries for admin:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      fetchAllInquiries();
    }
  }, [user, isAdminDemo]);

  const handleStatusUpdate = async (id: string, newStatus: "pending" | "reviewing" | "completed") => {
    setUpdatingId(id);
    try {
      const docRef = doc(db, "inquiries", id);
      await updateDoc(docRef, { status: newStatus });
      
      // Update local state
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
      );
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("상태 수정 권한이 없거나 전산 처리 오류입니다.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSendReply = async (id: string) => {
    if (!replyText.trim()) return;
    setUpdatingId(id);
    try {
      const docRef = doc(db, "inquiries", id);
      await updateDoc(docRef, {
        adminResponse: replyText.trim(),
        status: "completed" // Automatically transition to completed on reply!
      });

      // Update local state
      setInquiries((prev) =>
        prev.map((inq) =>
          inq.id === id
            ? { ...inq, adminResponse: replyText.trim(), status: "completed" }
            : inq
        )
      );
      setReplyingToId(null);
      setReplyText("");
    } catch (err) {
      console.error("Failed to update admin response:", err);
      alert("답변 등록 권한이 없거나 전산 처리 오류입니다.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!window.confirm("이 문의 내역을 데이터베이스에서 영구적으로 삭제하시겠습니까?")) return;
    setUpdatingId(id);
    try {
      const docRef = doc(db, "inquiries", id);
      await deleteDoc(docRef);
      
      // Update local state
      setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    } catch (err) {
      console.error("Failed to delete inquiry:", err);
      alert("삭제 권한이 없거나 전산 오류입니다.");
    } finally {
      setUpdatingId(null);
    }
  };

  // Filter & Search computation
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = filterStatus === "all" || inq.status === filterStatus;
    const cleanQuery = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !cleanQuery ||
      inq.companyName.toLowerCase().includes(cleanQuery) ||
      inq.name.toLowerCase().includes(cleanQuery) ||
      inq.email.toLowerCase().includes(cleanQuery) ||
      inq.productName.toLowerCase().includes(cleanQuery) ||
      inq.message.toLowerCase().includes(cleanQuery);
    return matchesStatus && matchesSearch;
  });

  // Access Denied Screen if unauthorized
  if (!isAuthorized) {
    return (
      <section id="admin" className="py-24 bg-slate-900 text-white min-h-[60vh] flex items-center justify-center scroll-mt-20">
        <div className="max-w-md w-full mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 mx-auto mb-6">
            <Lock className="w-8 h-8 animate-pulse" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-100">관리자 전용 접근 제한</h3>
          <p className="text-xs text-slate-400 mt-3 leading-relaxed">
            이 영역은 에스티트레이딩의 내부 정보 보안 및 고객 정보 조회를 위한 비공개 관리자 대시보드입니다.
            현재 계정으로는 조회가 제한되어 있습니다.
          </p>

          <div className="bg-slate-800/80 rounded-2xl p-4.5 border border-slate-700 text-left text-xs text-slate-300 mt-6 space-y-2">
            <p className="font-bold flex items-center space-x-1.5 text-amber-400">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>체험 및 평가 안내</span>
            </p>
            <p className="leading-relaxed">
              본 대시보드와 Firestore의 양방향 연동 기능을 테스트하시려면 GNB 상단 우측 또는 모바일 메뉴의 <strong>[ADMIN DEMO]</strong> 스위치를 켜주세요.
              스위치를 켜는 즉시 데이터베이스의 전산 데이터를 실시간으로 열람 및 관리하실 수 있습니다.
            </p>
          </div>

          <div className="mt-8 border-t border-slate-800 pt-6 flex flex-col items-center">
            <span className="text-[10px] text-slate-500 uppercase font-mono">AUTHORIZED ADMINISTRATOR</span>
            <span className="text-xs text-slate-300 font-bold mt-1">ehlolhan@gmail.com</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="admin" className="py-24 bg-slate-900 text-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Dashboard panel */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-8 mb-12 gap-4">
          <div>
            <div className="flex items-center space-x-2.5">
              <Shield className="w-5 h-5 text-amber-500" />
              <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
                ESTRADING REAL-TIME SYSTEM
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-3">
              원료 견적문의 통합 관리 대시보드
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Firestore 데이터베이스와 연동되어 고객사의 신규 견적 요청을 실시간으로 취합하고 관리합니다.
            </p>
          </div>

          <button
            onClick={fetchAllInquiries}
            disabled={loading}
            className="self-start md:self-auto inline-flex items-center space-x-1.5 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>전체 목록 동기화</span>
          </button>
        </div>

        {/* Dashboard Quick Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-10">
          <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-5">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">전체 접수 건수</p>
            <p className="text-2xl font-extrabold text-slate-100 mt-2">{inquiries.length}건</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-5">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">대기중 건수</p>
            <p className="text-2xl font-extrabold text-slate-100 mt-2">
              {inquiries.filter((i) => i.status === "pending").length}건
            </p>
          </div>
          <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-5">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">검토중 건수</p>
            <p className="text-2xl font-extrabold text-amber-400 mt-2">
              {inquiries.filter((i) => i.status === "reviewing").length}건
            </p>
          </div>
          <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-5">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">답변완료 건수</p>
            <p className="text-2xl font-extrabold text-emerald-400 mt-2">
              {inquiries.filter((i) => i.status === "completed").length}건
            </p>
          </div>
        </div>

        {/* Controls: Search & Status Filters */}
        <div className="bg-slate-800/40 rounded-2xl p-5 border border-slate-800/80 mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "전체 건" },
              { id: "pending", label: "대기중 (Pending)" },
              { id: "reviewing", label: "검토중 (Reviewing)" },
              { id: "completed", label: "완료됨 (Completed)" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer ${
                  filterStatus === tab.id
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                    : "bg-slate-800/80 text-slate-400 hover:bg-slate-700/80 hover:text-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:max-w-xs">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="회사명, 고객명, 이메일, 제품명 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs font-semibold pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

        </div>

        {/* Inquiries table/list */}
        {loading ? (
          <div className="py-24 text-center text-slate-400 text-xs flex flex-col items-center justify-center space-y-3">
            <RefreshCw className="w-8 h-8 animate-spin text-amber-500" />
            <span>서버 및 Firestore 데이터 동기화 중입니다...</span>
          </div>
        ) : filteredInquiries.length > 0 ? (
          <div className="space-y-6">
            {filteredInquiries.map((inq) => (
              <div
                key={inq.id}
                className={`bg-slate-850 rounded-2xl border border-slate-800 shadow-sm p-6 relative overflow-hidden transition-all duration-150 ${
                  updatingId === inq.id ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                {/* Status indicator pill top-right */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 mb-4 gap-3">
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase border ${
                      inq.status === "completed"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : inq.status === "reviewing"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        : "bg-slate-600/10 text-slate-300 border-slate-600/20"
                    }`}>
                      <Clock className="w-3 h-3 mr-1" />
                      {inq.status === "completed" ? "답변완료" : inq.status === "reviewing" ? "검토중" : "대기중"}
                    </span>
                    <span className="font-mono text-[10px] text-slate-500">
                      접수시간: {new Date(inq.createdAt).toLocaleString("ko-KR")}
                    </span>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center space-x-2">
                    <select
                      value={inq.status}
                      onChange={(e) => handleStatusUpdate(inq.id!, e.target.value as any)}
                      className="bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-400"
                    >
                      <option value="pending">대기중 지정</option>
                      <option value="reviewing">검토중 지정</option>
                      <option value="completed">완료됨 지정</option>
                    </select>

                    <button
                      onClick={() => {
                        setReplyingToId(inq.id!);
                        setReplyText(inq.adminResponse || "");
                      }}
                      className="p-1.5 hover:bg-slate-800 hover:text-amber-400 rounded-lg text-slate-400 transition-colors cursor-pointer"
                      title="답변 작성 / 수정"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDeleteInquiry(inq.id!)}
                      className="p-1.5 hover:bg-slate-850 hover:text-rose-400 rounded-lg text-slate-400 transition-colors cursor-pointer"
                      title="문의 삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Customer Details info block */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 bg-slate-900/40 p-4 rounded-xl border border-slate-800">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold font-sans">회사명</p>
                    <p className="text-xs font-extrabold text-slate-200 mt-1">{inq.companyName}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold font-sans">의뢰 고객명</p>
                    <p className="text-xs font-extrabold text-slate-200 mt-1">{inq.name}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold font-sans">이메일 주소</p>
                    <p className="text-xs font-extrabold text-slate-200 mt-1 select-all font-mono">{inq.email}</p>
                  </div>
                </div>

                {/* Requested Product and Message */}
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-semibold font-sans">문의 요청 제품</p>
                    <p className="text-xs font-extrabold text-amber-400 mt-1 font-mono">{inq.productName}</p>
                  </div>
                  
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-semibold font-sans">상세 요구 사항</p>
                    <p className="text-xs text-slate-300 mt-1.5 whitespace-pre-line leading-relaxed bg-slate-900/10 p-3 rounded-lg border border-slate-800/40 select-text">
                      {inq.message}
                    </p>
                  </div>

                  {/* Reply block presentation */}
                  {inq.adminResponse ? (
                    <div className="bg-indigo-950/20 border border-indigo-900/40 rounded-xl p-4 mt-4">
                      <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest flex items-center space-x-1.5">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>작성 완료된 피드백 / 답변</span>
                      </p>
                      <p className="text-xs text-slate-200 font-semibold mt-2 whitespace-pre-line leading-relaxed pl-3 border-l-2 border-indigo-500">
                        {inq.adminResponse}
                      </p>
                    </div>
                  ) : (
                    <div className="bg-slate-900/20 border border-dashed border-slate-800 rounded-xl p-4 mt-4 text-center">
                      <p className="text-[11px] text-slate-500 italic">아직 작성된 관리자 답변 피드백이 없습니다.</p>
                      <button
                        onClick={() => {
                          setReplyingToId(inq.id!);
                          setReplyText("");
                        }}
                        className="mt-2.5 text-[10px] font-bold text-amber-400 hover:text-amber-300 uppercase cursor-pointer"
                      >
                        + 신규 답변 피드백 작성하기
                      </button>
                    </div>
                  )}
                </div>

                {/* Replying overlay card/dialog inside the item */}
                <AnimatePresence>
                  {replyingToId === inq.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 border-t border-slate-850 pt-5 space-y-4"
                    >
                      <div className="flex flex-col">
                        <label className="text-[11px] font-bold text-amber-400 uppercase tracking-wide mb-2.5">
                          답변/메모 편집기 (고객사의 Inquiry 내역에 즉시 노출됩니다)
                        </label>
                        <textarea
                          rows={4}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="고객사에 보낼 단가 정보, COA 첨부 확인 여부, 연락 피드백 등을 상세히 기재해 주세요."
                          className="w-full text-xs font-semibold px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-amber-400 resize-none text-white leading-relaxed shadow-inner"
                        />
                      </div>
                      
                      <div className="flex items-center justify-end space-x-2.5">
                        <button
                          onClick={() => {
                            setReplyingToId(null);
                            setReplyText("");
                          }}
                          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          작성 취소
                        </button>
                        <button
                          onClick={() => handleSendReply(inq.id!)}
                          className="px-4.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-md shadow-amber-500/10"
                        >
                          답변 등록 및 완료
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-850 border border-slate-800 rounded-3xl p-20 text-center text-slate-500 max-w-xl mx-auto shadow-inner">
            <Shield className="w-12 h-12 text-slate-700 mx-auto mb-4" />
            <h4 className="text-sm font-bold text-slate-300">표시할 문의 내역이 없습니다.</h4>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              선택한 카테고리 필터 또는 검색 조건과 부합하는 Inquiry 내역이 Firestore 데이터베이스에 존재하지 않습니다.
              상태 필터를 변경하거나 다른 검색어를 입력해 보세요.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
