import Image from "next/image";
import type { Profile } from "@/data/profile";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <header className="flex flex-col items-center text-center">
      {/* 흰 테두리 + 따뜻한 색 그림자로 살짝 떠 보이게 */}
      <div className="rounded-full bg-white/70 p-1 shadow-[0_18px_40px_-14px_rgba(150,85,45,0.45)] ring-1 ring-white/80 dark:bg-white/10 dark:shadow-[0_18px_40px_-14px_rgba(0,0,0,0.7)] dark:ring-white/10">
        <Image
          src={profile.image}
          alt={`${profile.name} 프로필 사진`}
          width={128}
          height={128}
          priority
          className="h-28 w-28 rounded-full object-cover sm:h-32 sm:w-32"
        />
      </div>
      <h1 className="mt-6 text-2xl font-bold tracking-tight">{profile.name}</h1>
      <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-stone-500 dark:text-stone-400">
        {profile.bio}
      </p>
    </header>
  );
}
