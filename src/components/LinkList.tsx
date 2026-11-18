"use client";

import { useEffect, useState } from "react";
import type { LinkItem } from "@/data/profile";
import LinkCard from "@/components/LinkCard";

type CountsResponse = { ok: true; counts: Record<string, number> } | { ok: false };

export default function LinkList({ links }: { links: LinkItem[] }) {
  // 데이터를 받기 전에는 모두 0회로 표시
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    // 페이지가 열릴 때 모든 링크의 클릭 수를 한 번에 조회
    fetch("/api/click", { cache: "no-store", signal: controller.signal })
      .then((res) => res.json() as Promise<CountsResponse>)
      .then((data) => {
        if (data.ok) {
          setCounts(data.counts);
          setLoaded(true);
        }
      })
      .catch(() => {
        // DB에 닿지 않으면 0회 표시를 유지
      });
    return () => controller.abort();
  }, []);

  const handleClick = (id: string) => {
    // 실제 값을 받은 뒤에만 화면 숫자를 올림 (조회 실패 시 0 → 1 같은 틀린 숫자 방지)
    if (loaded) setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  return (
    <ul className="mt-12 flex w-full flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard link={link} count={counts[link.id] ?? 0} onClick={handleClick} />
        </li>
      ))}
    </ul>
  );
}
