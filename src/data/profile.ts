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
  bio: "풀스택 개발자 : 요즘에는 AI 개발에 관심이 많아요",
  image: "/profile.jpg",
};

// TODO: 더미 링크입니다. 실제 주소로 교체하세요.
// id는 클릭 수 집계 키로 사용되므로 한 번 정하면 바꾸지 마세요.
export const links: LinkItem[] = [
  { id: "github", title: "🌴 깃허브", url: "https://github.com/LeeWookn" },
  { id: "blog", title: "☕️ 블로그", url: "https://blog.naver.com/pataya98" },
  { id: "email", title: "✉️ 이메일", url: "mailto:pataya98@naver.com" },
];
