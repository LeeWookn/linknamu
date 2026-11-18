import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let clientPromise: Promise<MongoClient> | undefined;

declare global {
  // 개발 모드 핫리로드 시 연결이 계속 늘어나지 않도록 전역에 캐시
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function connect(uri: string): Promise<MongoClient> {
  // DB에 닿지 않을 때 요청이 30초씩 붙잡히지 않도록 짧게 포기
  const promise = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 }).connect();
  // 연결에 실패한 Promise를 캐시에 남겨 두면 서버 재시작 전까지 계속 실패하므로 비워서 다음 요청에 재시도
  promise.catch(() => {
    if (global._mongoClientPromise === promise) global._mongoClientPromise = undefined;
    if (clientPromise === promise) clientPromise = undefined;
  });
  return promise;
}

/** MONGODB_URI가 없으면 null을 반환합니다 (로컬에서 DB 없이도 페이지는 동작). */
export function getMongoClient(): Promise<MongoClient> | null {
  if (!uri) return null;

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) global._mongoClientPromise = connect(uri);
    return global._mongoClientPromise;
  }

  if (!clientPromise) clientPromise = connect(uri);
  return clientPromise;
}

export async function getClicksCollection() {
  const client = getMongoClient();
  if (!client) return null;
  const db = (await client).db(process.env.MONGODB_DB ?? "linknamu");
  return db.collection<{ _id: string; count: number }>("clicks");
}
