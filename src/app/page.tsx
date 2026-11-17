import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import ThemeToggle from "@/components/ThemeToggle";
import { links, profile } from "@/data/profile";

// 레이아웃은 wireframe.png 기준:
// 원형 프로필 사진 → 이름 → 한 줄 소개 → 링크 카드 목록(세로) → 하단 구분선
export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center px-6 py-16">
      <ThemeToggle />

      <ProfileHeader profile={profile} />

      <ul className="mt-10 flex w-full max-w-[16rem] flex-col gap-7">
        {links.map((link) => (
          <li key={link.id}>
            <LinkCard link={link} />
          </li>
        ))}
      </ul>

      <hr className="mt-8 w-16 border-gray-900 dark:border-gray-100" />
    </main>
  );
}
