import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let clientPromise: Promise<MongoClient> | undefined;

declare global {
  // 개발 모드 핫리로드 시 연결이 계속 늘어나지 않도록 전역에 캐시
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

/** MONGODB_URI가 없으면 null을 반환합니다 (로컬에서 DB 없이도 페이지는 동작). */
export function getMongoClient(): Promise<MongoClient> | null {
  if (!uri) return null;

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = new MongoClient(uri).connect();
    }
    return global._mongoClientPromise;
  }

  if (!clientPromise) clientPromise = new MongoClient(uri).connect();
  return clientPromise;
}

export async function getClicksCollection() {
  const client = getMongoClient();
  if (!client) return null;
  const db = (await client).db(process.env.MONGODB_DB ?? "linknamu");
  return db.collection<{ _id: string; count: number }>("clicks");
}
