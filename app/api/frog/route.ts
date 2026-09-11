import { redis, DISMISSED_SET_KEY } from "@/lib/redis";
import { fetchRandomFrogCandidates } from "@/lib/frog";

const MAX_ATTEMPTS = 5;

export async function GET() {
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const candidates = await fetchRandomFrogCandidates();
    if (candidates.length === 0) continue;

    const dismissedFlags = await redis.smismember(
      DISMISSED_SET_KEY,
      candidates.map((frog) => frog.id)
    );

    const frog = candidates.find((_, index) => !dismissedFlags[index]);
    if (frog) return Response.json(frog);
  }

  return Response.json(
    { error: "Couldn't find a fresh frog, try again." },
    { status: 503 }
  );
}
