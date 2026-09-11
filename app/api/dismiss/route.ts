import { redis, DISMISSED_SET_KEY } from "@/lib/redis";

export async function POST(request: Request) {
  const { id } = await request.json();

  if (typeof id !== "string" || id.length === 0) {
    return Response.json({ error: "Missing frog id" }, { status: 400 });
  }

  await redis.sadd(DISMISSED_SET_KEY, id);

  return Response.json({ ok: true });
}
