import { NextResponse } from "next/server";
import { links } from "@/data/profile";
import { getClicksCollection } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const linkIds = links.map((l) => l.id);
const validIds = new Set(linkIds);

function dbUnavailable(reason: string, error?: unknown) {
  if (error) console.error("[api/click]", error);
  return NextResponse.json({ ok: false, reason }, { status: 503 });
}

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

  try {
    const clicks = await getClicksCollection();
    if (!clicks) return dbUnavailable("MONGODB_URI 미설정");

    await clicks.updateOne({ _id: id }, { $inc: { count: 1 } }, { upsert: true });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return dbUnavailable("DB 연결 실패", error);
  }
}

/** 링크별 클릭 수 조회: GET /api/click  →  { ok: true, counts: { [id]: number } } */
export async function GET() {
  try {
    const clicks = await getClicksCollection();
    if (!clicks) return dbUnavailable("MONGODB_URI 미설정");

    const docs = await clicks.find({ _id: { $in: linkIds } }).toArray();
    const counts: Record<string, number> = Object.fromEntries(links.map((l) => [l.id, 0]));
    for (const doc of docs) counts[doc._id] = doc.count;
    return NextResponse.json({ ok: true, counts });
  } catch (error) {
    return dbUnavailable("DB 연결 실패", error);
  }
}
