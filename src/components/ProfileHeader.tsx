import Image from "next/image";
import type { Profile } from "@/data/profile";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <header className="flex flex-col items-center text-center">
      <Image
        src={profile.image}
        alt={`${profile.name} 프로필 사진`}
        width={192}
        height={192}
        priority
        className="h-48 w-48 rounded-full border-2 border-gray-900 object-cover dark:border-gray-100"
      />
      <h1 className="mt-8 text-xl font-bold">{profile.name}</h1>
      <p className="mt-2 text-base text-gray-600 dark:text-gray-400">{profile.bio}</p>
    </header>
  );
}
