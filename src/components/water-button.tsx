"use client";

import { useState, useEffect, useCallback } from "react";
import { Droplets, Check, Loader2 } from "lucide-react";

interface WateringLog {
  id: number;
  plant_slug: string;
  watered_at: string;
  notes: string | null;
}

export function WaterButton({ slug }: { slug: string }) {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [lastWatered, setLastWatered] = useState<string | null>(null);

  const fetchLast = useCallback(async () => {
    try {
      const res = await fetch(`/api/water?slug=${slug}`);
      if (!res.ok) return;
      const data = (await res.json()) as { logs: WateringLog[] };
      if (data.logs.length > 0) {
        setLastWatered(data.logs[0].watered_at);
      }
    } catch {
      // API not available (local dev / static preview)
    }
  }, [slug]);

  useEffect(() => {
    fetchLast();
  }, [fetchLast]);

  const handleWater = async () => {
    setState("loading");
    try {
      const res = await fetch("/api/water", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      if (res.ok) {
        setState("done");
        await fetchLast();
        setTimeout(() => setState("idle"), 2000);
      } else {
        setState("idle");
      }
    } catch {
      setState("idle");
    }
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso + "Z");
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleWater}
        disabled={state !== "idle"}
        className="inline-flex items-center justify-center gap-2 border border-water/40 bg-water/5 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-water hover:bg-water/10 transition-colors disabled:opacity-50 cursor-pointer"
      >
        {state === "loading" && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
        {state === "done" && <Check className="h-3.5 w-3.5" />}
        {state === "idle" && <Droplets className="h-3.5 w-3.5" />}
        {state === "done" ? "Logged" : "I just watered this"}
      </button>
      {lastWatered && (
        <p className="font-mono text-[10px] text-ink-light tracking-wide text-center">
          Last watered: {formatDate(lastWatered)}
        </p>
      )}
    </div>
  );
}
