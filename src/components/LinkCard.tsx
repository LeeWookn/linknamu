"use client";

import type { LinkItem } from "@/data/profile";

function recordClick(id: string) {
  const body = JSON.stringify({ id });
  // 페이지가 이동해도 요청이 유실되지 않도록 sendBeacon 우선 사용
  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    navigator.sendBeacon("/api/click", new Blob([body], { type: "application/json" }));
  } else {
    fetch("/api/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  }
}

export default function LinkCard({ link }: { link: LinkItem }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => recordClick(link.id)}
      className="flex min-h-[3.75rem] w-full flex-col items-center justify-center rounded-2xl border border-white/70 bg-white/45 px-6 py-4 text-center shadow-[0_6px_24px_-12px_rgba(150,85,45,0.35)] backdrop-blur-md transition duration-300 ease-out hover:-translate-y-px hover:bg-white/65 hover:shadow-[0_10px_28px_-12px_rgba(150,85,45,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_6px_24px_-12px_rgba(0,0,0,0.6)] dark:hover:bg-white/[0.1]"
    >
      <span className="text-[15px] font-semibold tracking-tight">{link.title}</span>
      {link.description && (
        <span className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
          {link.description}
        </span>
      )}
    </a>
  );
}
