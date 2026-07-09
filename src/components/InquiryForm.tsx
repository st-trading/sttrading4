import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle, HelpCircle, FileText, Calendar, Lock, AlertCircle, RefreshCw, LogIn, Clock } from "lucide-react";
import { db, auth, googleProvider } from "../lib/firebase";
import { collection, addDoc, query, where, getDocs, orderBy } from "firebase/firestore";
import { signInWithPopup, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { Inquiry } from "../types";
import { PRODUCTS } from "../data/products";

interface InquiryFormProps {
  selectedProduct: string;
  setSelectedProduct: (product: string) => void;
}

export default function InquiryForm({ selectedProduct, setSelectedProduct }: InquiryFormProps) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  
  // Form State
  const [companyName, setCompanyName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [productName, setProductName] = useState("");
  const [message, setMessage] = useState("");
  
  // Status and Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  // Previous Inquiries State for Logged-In User
  const [userInquiries, setUserInquiries] = useState<Inquiry[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Sync auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setEmail(currentUser.email || "");
        setName(currentUser.displayName || "");
      }
    });
    return () => unsubscribe();
  }, []);

  // Update product field when selectedProduct from prop changes
  useEffect(() => {
    if (selectedProduct) {
      setProductName(selectedProduct);
    }
  }, [selectedProduct]);

  // Fetch inquiries history for logged-in user
  const fetchUserInquiries = async () => {
    if (!user) return;
    setLoadingHistory(true);
    try {
      const q = query(
        collection(db, "inquiries"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const list: Inquiry[] = [];
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() } as Inquiry);
      });
      setUserInquiries(list);
    } catch (err) {
      console.error("Error fetching inquiries:", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserInquiries();
    } else {
      setUserInquiries([]);
    }
  }, [user, submitSuccess]);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Google sign-in failed:", err);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    
    // Strict client-side validation
    if (!companyName.trim()) return setErrorMessage("회사명을 입력해 주세요.");
    if (!name.trim()) return setErrorMessage("이름을 입력해 주세요.");
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return setErrorMessage("올바른 이메일 형식을 입력해 주세요.");
    }
    if (!productName.trim()) return setErrorMessage("제품명을 선택하거나 입력해 주세요.");
    if (!message.trim()) return setErrorMessage("문의사항을 상세히 입력해 주세요.");

    setIsSubmitting(true);
    
    try {
      const newInquiry: Omit<Inquiry, "id"> = {
        companyName: companyName.trim(),
        name: name.trim(),
        email: email.trim(),
        productName: productName.trim(),
        message: message.trim(),
        status: "pending",
        createdAt: new Date().toISOString(),
        ...(user ? { userId: user.uid } : {})
      };

      // Add to Firestore database
      await addDoc(collection(db, "inquiries"), newInquiry);
      
      setSubmitSuccess(true);
      
      // Clear inputs (except email & name if logged in)
      setCompanyName("");
      setMessage("");
      setSelectedProduct("");
      if (!user) {
        setName("");
        setEmail("");
      }

      // Automatically dismiss success popup after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);

    } catch (err) {
      console.error("Inquiry submission failed:", err);
      setErrorMessage("문의 제출 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="inquiry" className="py-24 bg-white text-slate-900 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-3.5 py-1.5 rounded-full">
            CS CENTER & INQUIRY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-4">
            제품 사양 및 견적 문의
          </h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-indigo-600 to-sky-500 mx-auto mt-5 rounded-full" />
          <p className="text-slate-500 text-sm mt-4 leading-relaxed">
            원하시는 화장품 원료의 상세 규격 및 공급 단가, 샘플 요청 등에 대해 친절히 상담해 드립니다.
            아래 필수 양식을 기입하여 제출해 주시면 전문 담당자가 메일로 신속히 답변 드리겠습니다.
          </p>
        </div>

        {/* Auth incentive notice banner */}
        {!user && (
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 shrink-0 mt-0.5">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">로그인 후 문의하여 간편하게 관리하세요</p>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  구글 계정으로 3초 만에 로그인하시면, 본 페이지 하단에서 문의 상태 변화(대기중, 검토중, 답변완료)를 실시간으로 확인하실 수 있습니다.
                </p>
              </div>
            </div>
            <button
              onClick={handleGoogleLogin}
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer shrink-0"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>로그인하기</span>
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Inquiry Form */}
          <div className="lg:col-span-8 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/60 shadow-sm relative overflow-hidden">
            
            {/* Background glowing light decoration */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl" />

            <form onSubmit={handleFormSubmit} className="space-y-5 relative z-10">
              
              {/* Error Message Alert */}
              {errorMessage && (
                <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 flex items-center space-x-2.5 text-rose-700 text-xs font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Form Input fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* 회사명 */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    회사명 <span className="text-indigo-600 font-extrabold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="예: (주)에스티뷰티"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full text-xs font-semibold px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors shadow-inner"
                  />
                </div>

                {/* 이름 */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    담당자 이름 <span className="text-indigo-600 font-extrabold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="예: 홍길동 팀장"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs font-semibold px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors shadow-inner"
                  />
                </div>
              </div>

              {/* 이메일 */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  이메일 주소 <span className="text-indigo-600 font-extrabold">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="예: contact@yourcompany.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs font-semibold px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors shadow-inner"
                />
              </div>

              {/* 제품명 (Dropdown + Autocomplete support) */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  문의 대상 제품명 <span className="text-indigo-600 font-extrabold">*</span>
                </label>
                <div className="relative">
                  <select
                    onChange={(e) => setProductName(e.target.value)}
                    value={PRODUCTS.some((p) => `${p.name} (${p.englishName})` === productName) ? productName : "custom"}
                    className="w-full text-xs font-bold px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors shadow-sm mb-3"
                  >
                    <option value="" disabled>-- 문의할 원료를 선택해 주세요 --</option>
                    {PRODUCTS.map((p) => (
                      <option key={p.id} value={`${p.name} (${p.englishName})`}>
                        [{p.category.toUpperCase()}] {p.name}
                      </option>
                    ))}
                    <option value="custom">직접 입력 / 기타 원료 문의</option>
                  </select>

                  {/* Fallback free text input if custom selected or not in standard list */}
                  {(!PRODUCTS.some((p) => `${p.name} (${p.englishName})` === productName) || productName === "custom") && (
                    <input
                      type="text"
                      required
                      placeholder="제품명을 직접 입력해 주세요 (예: 시어버터 원료 소싱)"
                      value={productName === "custom" ? "" : productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="w-full text-xs font-semibold px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors shadow-inner"
                    />
                  )}
                </div>
              </div>

              {/* 문의사항 */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  상세 문의사항 <span className="text-indigo-600 font-extrabold">*</span>
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="원하시는 수량(MOQ), 원산지 희망 여부, 샘플 발송 주소, 성적서(COA) 필요 유무 등 상세 세부 요건을 기입해 주시면 더욱 신속한 견적 안내가 가능합니다."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-xs font-semibold px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors shadow-inner resize-none leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 text-xs font-bold tracking-wider text-white rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg cursor-pointer ${
                  isSubmitting ? "bg-slate-400 cursor-not-allowed" : "bg-gradient-to-r from-slate-900 to-indigo-900 hover:from-slate-800 hover:to-indigo-800 hover:shadow-indigo-900/10"
                }`}
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "문의 전송 중..." : "견적 및 상담 문의 접수하기"}</span>
              </button>

            </form>
          </div>

          {/* Quick Notice Card Side */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-indigo-950 text-white rounded-3xl p-6.5 border border-indigo-900 shadow-md">
              <h4 className="text-xs font-bold tracking-widest text-indigo-400 uppercase mb-4">INQUIRY GUIDE</h4>
              <p className="text-sm font-extrabold text-slate-100">원료 상담 프로세스</p>
              
              <div className="mt-6 space-y-5">
                <div className="flex items-start space-x-3 text-xs text-slate-300">
                  <span className="font-mono font-bold text-indigo-400 mt-0.5">01</span>
                  <p><strong>온라인 폼 접수</strong>: 전산으로 실시간 등록되며 담당 매니저가 자동 지정됩니다.</p>
                </div>
                <div className="flex items-start space-x-3 text-xs text-slate-300">
                  <span className="font-mono font-bold text-indigo-400 mt-0.5">02</span>
                  <p><strong>규격 및 단가 협의</strong>: 당사의 글로벌 유통 구조를 통해 최적의 단가와 샘플 발송 유무를 검토합니다.</p>
                </div>
                <div className="flex items-start space-x-3 text-xs text-slate-300">
                  <span className="font-mono font-bold text-indigo-400 mt-0.5">03</span>
                  <p><strong>이메일 피드백</strong>: 접수 24시간 내(영업일 기준) COA 서류와 견적서(Quotation)를 메일로 송부합니다.</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 text-xs text-slate-500 leading-relaxed">
              <h5 className="font-bold text-slate-800 mb-2.5">개인정보 보호 정책 안내</h5>
              <p>
                에스티트레이딩은 원료 공급 협의를 위한 용도로만 신청인명, 회사명, 연락 메일 주소를 보유 및 수집합니다.
                의뢰하신 상담 사항은 제3자에게 절대 공유되지 않으며, 암호화 처리되어 사내 데이터베이스에 안전하게 영구 보호됩니다.
              </p>
            </div>
          </div>

        </div>

        {/* User Submission History Section (data persistence verification!) */}
        {user && (
          <div className="mt-16 border-t border-slate-100 pt-16">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">나의 문의 내역 및 관리</h3>
                <p className="text-xs text-slate-500 mt-1">계정에 보관된 문의 진행 현황을 실시간으로 확인하실 수 있습니다.</p>
              </div>
              <button
                onClick={fetchUserInquiries}
                disabled={loadingHistory}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-xl border border-slate-200 transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingHistory ? "animate-spin" : ""}`} />
                <span>새로고침</span>
              </button>
            </div>

            {loadingHistory ? (
              <div className="py-12 text-center text-slate-400 text-xs flex items-center justify-center space-x-2">
                <RefreshCw className="w-4 h-4 animate-spin text-indigo-600" />
                <span>문의 이력을 불러오는 중입니다...</span>
              </div>
            ) : userInquiries.length > 0 ? (
              <div className="bg-slate-50 rounded-2xl border border-slate-200/80 overflow-hidden shadow-inner">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                        <th className="px-6 py-4">접수 일자</th>
                        <th className="px-6 py-4">회사명</th>
                        <th className="px-6 py-4">요청 원료명</th>
                        <th className="px-6 py-4">상태</th>
                        <th className="px-6 py-4 text-right">피드백 메모</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/60 text-xs">
                      {userInquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-slate-100/50 transition-colors">
                          <td className="px-6 py-4 font-mono text-slate-400 whitespace-nowrap">
                            {new Date(inq.createdAt).toLocaleDateString("ko-KR", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </td>
                          <td className="px-6 py-4 font-semibold text-slate-700">{inq.companyName}</td>
                          <td className="px-6 py-4 text-slate-600 font-medium truncate max-w-[200px]">{inq.productName}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                              inq.status === "completed"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : inq.status === "reviewing"
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : "bg-slate-100 text-slate-600 border-slate-200"
                            }`}>
                              <Clock className="w-3 h-3 mr-1" />
                              {inq.status === "completed" ? "답변완료" : inq.status === "reviewing" ? "검토중" : "대기중"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right text-[11px] font-medium text-slate-500 max-w-[300px]">
                            {inq.adminResponse ? (
                              <span className="text-indigo-600 font-bold whitespace-pre-line bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100/60 inline-block text-left">
                                {inq.adminResponse}
                              </span>
                            ) : (
                              <span className="italic text-slate-400">검토 후 답변이 곧 작성됩니다.</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-10 text-center text-xs text-slate-400 shadow-inner">
                <FileText className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                <p className="font-bold">아직 제출하신 문의 내역이 없습니다.</p>
                <p className="text-[11px] mt-1 text-slate-400">위의 입력 폼을 통해 첫 화장품 원료 상담 문의를 제출해 보세요!</p>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Success Modal Toast Popup */}
      <AnimatePresence>
        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-2xl flex items-start space-x-4 max-w-sm"
          >
            <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5 animate-bounce" />
            <div>
              <h4 className="text-sm font-bold text-slate-200">문의가 성공적으로 접수되었습니다!</h4>
              <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                에스티트레이딩 CS 데이터베이스에 전산 등록이 완수되었습니다. 24시간 이내에 기재해 주신 메일로 상세 세부 정보서 및 수입 가능 견적을 송부해 드리겠습니다.
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="mt-3.5 text-[10px] font-bold text-indigo-400 hover:text-indigo-300 uppercase cursor-pointer"
              >
                닫기
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
