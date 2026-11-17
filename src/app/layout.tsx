import type { Metadata, Viewport } from "next";
// Pretendard 동적 서브셋: 화면에 쓰인 글자 묶음만 내려받아 모바일에서도 가볍게 로드
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `${profile.name} | 링크나무`,
  description: profile.bio,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// 첫 렌더 전에 테마를 적용해 화면 깜빡임(FOUC) 방지
const themeScript = `
(function () {
  try {
    var saved = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className="min-h-screen bg-[#fdf8f2] font-sans text-stone-800 antialiased dark:bg-[#1a1613] dark:text-stone-100"
      >
        {/* 배경: 크림 → 연살구 그라데이션 + 은은한 빛 번짐 (글래스 카드 뒤에 비칠 색감) */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#fdf8f2] via-[#fcefe3] to-[#f9dfcc] dark:from-[#1a1613] dark:via-[#211a16] dark:to-[#2b201a]" />
          <div className="absolute -left-24 top-[-6rem] h-80 w-80 rounded-full bg-[#ffd9b8] opacity-60 blur-3xl dark:bg-[#7a4a2e] dark:opacity-25" />
          <div className="absolute -right-20 top-1/3 h-72 w-72 rounded-full bg-[#ffc9b0] opacity-50 blur-3xl dark:bg-[#6b3a2a] dark:opacity-20" />
          <div className="absolute bottom-[-5rem] left-1/4 h-72 w-72 rounded-full bg-[#ffe6c7] opacity-60 blur-3xl dark:bg-[#5a4030] dark:opacity-20" />
        </div>
        {children}
      </body>
    </html>
  );
}
