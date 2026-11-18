import LinkList from "@/components/LinkList";
import ProfileHeader from "@/components/ProfileHeader";
import ThemeToggle from "@/components/ThemeToggle";
import { links, profile } from "@/data/profile";

// 레이아웃은 wireframe.png 기준:
// 원형 프로필 사진 → 이름 → 한 줄 소개 → 링크 카드 목록(세로) → 하단 구분선
export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center px-7 pb-16 pt-20 sm:pt-24">
      <ThemeToggle />

      <ProfileHeader profile={profile} />

      <LinkList links={links} />

      <hr className="mt-14 w-10 border-stone-400/40 dark:border-stone-500/40" />
    </main>
  );
}
