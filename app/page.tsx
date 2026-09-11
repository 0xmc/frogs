"use client";

import { useCallback, useEffect, useState } from "react";

type Frog = {
  id: string;
  imageUrl: string;
  title: string;
  permalink: string;
};

type LoadState = "loading" | "ready" | "error";

export default function Home() {
  const [frog, setFrog] = useState<Frog | null>(null);
  const [state, setState] = useState<LoadState>("loading");
  const [busy, setBusy] = useState(false);

  const loadFrog = useCallback(async () => {
    setState("loading");
    setFrog(null);
    try {
      const res = await fetch("/api/frog", { cache: "no-store" });
      if (!res.ok) throw new Error("frog fetch failed");
      const data: Frog = await res.json();
      setFrog(data);
      setState("ready");
    } catch {
      setState("error");
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch on mount
    loadFrog();
  }, [loadFrog]);

  async function handleCute() {
    loadFrog();
  }

  async function handleNotCute() {
    if (!frog) return;
    setBusy(true);
    try {
      await fetch("/api/dismiss", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: frog.id }),
      });
    } finally {
      setBusy(false);
      loadFrog();
    }
  }

  return (
    <main className="flex flex-col items-center justify-center flex-1 gap-6 p-6 text-center">
      <h1 className="text-3xl font-bold">man i love frogs</h1>

      <div className="w-full max-w-md aspect-square rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center overflow-hidden">
        {state === "loading" && <p className="text-sm opacity-70">finding a frog…</p>}
        {state === "error" && (
          <div className="flex flex-col items-center gap-3 p-4">
            <p className="text-sm opacity-70">couldn&apos;t find a frog. reddit might be rate-limiting.</p>
            <button
              onClick={loadFrog}
              className="rounded-full px-4 py-2 text-sm font-medium bg-black/80 text-white dark:bg-white/80 dark:text-black"
            >
              try again
            </button>
          </div>
        )}
        {state === "ready" && frog && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={frog.imageUrl}
            alt={frog.title}
            className="w-full h-full object-contain"
          />
        )}
      </div>

      {state === "ready" && frog && (
        <>
          <a
            href={frog.permalink}
            target="_blank"
            rel="noreferrer"
            className="text-sm opacity-60 hover:opacity-100 max-w-md truncate"
          >
            {frog.title}
          </a>

          <div className="flex gap-4">
            <button
              onClick={handleNotCute}
              disabled={busy}
              className="rounded-full px-6 py-3 text-lg font-medium border border-black/20 dark:border-white/20 disabled:opacity-50"
            >
              👎 not cute
            </button>
            <button
              onClick={handleCute}
              disabled={busy}
              className="rounded-full px-6 py-3 text-lg font-medium bg-green-600 text-white disabled:opacity-50"
            >
              🐸 cute
            </button>
          </div>
        </>
      )}
    </main>
  );
}
