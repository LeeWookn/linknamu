import { NextResponse } from "next/server";
import { links } from "@/data/profile";
import { getClicksCollection } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const validIds = new Set(links.map((l) => l.id));

/** 링크 클릭 기록: POST /api/click  body: { id: string } */
export async function POST(request: Request) {
  let id: unknown;
  try {
    ({ id } = await request.json());
  } catch {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }

  if (typeof id !== "string" || !validIds.has(id)) {
    return NextResponse.json({ error: "알 수 없는 링크" }, { status: 400 });
  }

  const clicks = await getClicksCollection();
  if (!clicks) {
    return NextResponse.json({ ok: false, reason: "MONGODB_URI 미설정" }, { status: 503 });
  }

  await clicks.updateOne({ _id: id }, { $inc: { count: 1 } }, { upsert: true });
  return NextResponse.json({ ok: true });
}

/** 링크별 클릭 수 조회: GET /api/click */
export async function GET() {
  const clicks = await getClicksCollection();
  if (!clicks) {
    return NextResponse.json({ ok: false, reason: "MONGODB_URI 미설정" }, { status: 503 });
  }

  const docs = await clicks.find({}).toArray();
  const counts = Object.fromEntries(links.map((l) => [l.id, 0]));
  for (const doc of docs) counts[doc._id] = doc.count;
  return NextResponse.json({ ok: true, counts });
}
