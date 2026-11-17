"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "밝은 화면으로 전환" : "어두운 화면으로 전환"}
      className="fixed right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/45 text-lg shadow-[0_4px_16px_-8px_rgba(150,85,45,0.4)] backdrop-blur-md transition duration-300 hover:bg-white/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 dark:border-white/10 dark:bg-white/[0.06] dark:hover:bg-white/[0.1]"
    >
      {/* 하이드레이션 전에는 아이콘을 숨겨 깜빡임 방지 */}
      <span className={dark === null ? "invisible" : ""}>{dark ? "☀️" : "🌙"}</span>
    </button>
  );
}
