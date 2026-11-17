/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 외부 프로필 이미지 허용
    remotePatterns: [{ protocol: "https", hostname: "placehold.co" }],
  },
};

export default nextConfig;
