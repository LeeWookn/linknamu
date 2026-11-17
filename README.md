# 🌳 링크나무

내 모든 링크를 한 페이지에 모아두고, 하나의 URL로 공유하는 Link in Bio 서비스입니다.

## 시작하기

```bash
npm install
cp .env.example .env.local   # MONGODB_URI 입력 (없어도 페이지는 동작, 클릭 집계만 비활성)
npm run dev
```

http://localhost:3000 에서 확인하세요.

## 내 정보 수정

`src/data/profile.ts` 에서 이름·소개·프로필 사진·링크 목록을 수정합니다.
프로필 사진은 `public/` 폴더에 넣고 `image` 경로를 바꾸면 됩니다.

## 구조

```
src/
├─ app/
│  ├─ layout.tsx          # 다크모드 초기 스크립트, 메타데이터
│  ├─ page.tsx            # 메인 페이지
│  └─ api/click/route.ts  # 클릭 수 기록(POST) / 조회(GET)
├─ components/
│  ├─ ProfileHeader.tsx   # 원형 프로필 사진 · 이름 · 한 줄 소개
│  ├─ LinkCard.tsx        # 링크 카드 (클릭 시 집계)
│  └─ ThemeToggle.tsx     # 다크모드 토글
├─ data/profile.ts        # 프로필 · 링크 데이터
└─ lib/mongodb.ts         # MongoDB 연결
```

## 클릭 수 확인

`GET /api/click` → `{ "ok": true, "counts": { "github": 3, ... } }`

## 배포 (Vercel)

Vercel 프로젝트 설정의 Environment Variables에 `MONGODB_URI` (선택: `MONGODB_DB`)를 등록하세요.
