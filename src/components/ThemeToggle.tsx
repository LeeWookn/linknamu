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
      className="fixed right-4 top-4 rounded-full border border-gray-200 bg-white p-2 text-xl shadow-sm transition hover:scale-105 dark:border-gray-700 dark:bg-gray-800"
    >
      {/* 하이드레이션 전에는 아이콘을 숨겨 깜빡임 방지 */}
      <span className={dark === null ? "invisible" : ""}>{dark ? "☀️" : "🌙"}</span>
    </button>
  );
}
