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
      className="flex min-h-[3.5rem] w-full flex-col items-center justify-center rounded-xl border-2 border-gray-900 bg-white px-5 py-3 text-center transition hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] dark:border-gray-100 dark:bg-gray-800"
    >
      <span className="font-semibold">{link.title}</span>
      {link.description && (
        <span className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
          {link.description}
        </span>
      )}
    </a>
  );
}
