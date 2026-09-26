"use client";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { strings, type Lang } from "./strings";

interface LangCtx {
  lang: Lang;
  toggle: () => void;
  t: typeof strings.mk;
}

const Ctx = createContext<LangCtx>({ lang: "mk", toggle: () => {}, t: strings.mk });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("mk");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("mv-lang") as Lang | null;
      if (saved && saved in strings) setLang(saved);
    } catch {}
  }, []);

  const toggle = () =>
    setLang((l) => {
      const next: Lang = l === "mk" ? "en" : "mk";
      try { localStorage.setItem("mv-lang", next); } catch {}
      return next;
    });

  return (
    <Ctx.Provider value={{ lang, toggle, t: strings[lang] }}>
      {children}
    </Ctx.Provider>
  );
}

export const useLang = () => useContext(Ctx);
