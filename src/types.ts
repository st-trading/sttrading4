export type ProductCategory = "dye" | "color" | "humectant" | "active";

export interface Product {
  id: string;
  name: string; // Product name (Korean)
  englishName: string; // Product name (English / INCI)
  category: ProductCategory;
  description: string; // Features and properties
  applications: string[]; // Cosmetics types it can be used for (e.g. Skin, Makeup, Hair)
  origin: string; // Country of origin / Supplier brand
  specification?: string; // Standard specification (e.g., 99% purity)
  casNumber?: string; // Chemical Abstracts Service registry number
  packing?: string; // Packaging size (e.g., 25KG)
}

export interface CEOMessage {
  title: string;
  subtitle: string;
  content: string[];
  signature: string;
}

export interface HistoryItem {
  year: string;
  events: {
    month: string;
    description: string;
  }[];
}

export interface Inquiry {
  id?: string;
  companyName: string; // 회사명
  name: string; // 이름
  email: string; // 이메일
  productName: string; // 제품명
  message: string; // 문의사항
  status: "pending" | "reviewing" | "completed"; // 상태
  createdAt: string; // 생성일시 (ISO)
  userId?: string; // 유저 UID (Optional)
  adminResponse?: string; // 관리자 답변 / 메모
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  isAdmin: boolean;
}
