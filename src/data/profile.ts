export type LinkItem = {
  id: string;
  title: string;
  url: string;
  description?: string;
};

export type Profile = {
  name: string;
  bio: string;
  image: string;
};

// TODO: 보여 주기용 더미 값입니다. 실제 내용으로 교체하세요.
export const profile: Profile = {
  name: "이우근",
  bio: "세계최강 바이브코더",
  image: "/profile.svg", // public/ 폴더에 사진을 넣고 경로를 바꾸세요
};

// TODO: 더미 링크입니다. 실제 주소로 교체하세요.
// id는 클릭 수 집계 키로 사용되므로 한 번 정하면 바꾸지 마세요.
export const links: LinkItem[] = [
  { id: "github", title: "GitHub", url: "https://github.com" },
  { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com" },
  { id: "blog", title: "Blog", url: "https://example.com" },
];
