import React, { createContext, useContext, useState } from "react";

export type Language = "ko" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (koVal: string, enVal: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem("st_trading_lang");
      return (saved === "en" || saved === "ko") ? saved : "ko";
    } catch (e) {
      return "ko";
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("st_trading_lang", lang);
    } catch (e) {
      // Ignore storage errors in sandbox environments
    }
  };

  // Helper function to pick the value based on language
  const t = (koVal: string, enVal: string): string => {
    return language === "en" ? enVal : koVal;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
