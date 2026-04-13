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
      // API not available
    }
  }, [slug]);

  useEffect(() => {
    fetchLast();
  }, [fetchLast]);

  const finishAnimation = () => {
    setState("done");
    setTimeout(() => {
      setState("idle");
    }, 2500);
  };

  const handleWater = async () => {
    setState("loading");
    try {
      const res = await fetch("/api/water", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      if (res.ok) {
        await fetchLast();
      }
    } catch {
      // API not available (local dev) - still play the animation
    }
    finishAnimation();
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
        className="group relative inline-flex items-center justify-center gap-2 overflow-hidden border border-water/40 bg-water/5 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-water transition-all duration-300 ease-out hover:bg-water/10 hover:border-water/60 hover:shadow-[0_0_12px_rgba(37,99,235,0.15)] active:scale-[0.97] disabled:pointer-events-none cursor-pointer"
      >
        <span className="relative inline-flex items-center justify-center w-3.5 h-3.5">
          <Droplets
            className={`h-3.5 w-3.5 absolute transition-all duration-300 ${
              state === "idle"
                ? "opacity-100 scale-100"
                : "opacity-0 scale-75"
            }`}
          />
          <Loader2
            className={`h-3.5 w-3.5 absolute animate-spin transition-all duration-300 ${
              state === "loading"
                ? "opacity-100 scale-100"
                : "opacity-0 scale-75"
            }`}
          />
          <Check
            className={`h-3.5 w-3.5 absolute transition-all duration-300 ${
              state === "done"
                ? "opacity-100 scale-100"
                : "opacity-0 scale-75"
            }`}
          />
        </span>

        <span className="relative overflow-hidden h-[1.4em]">
          <span
            className={`block leading-[1.4em] transition-all duration-300 ${
              state === "done"
                ? "-translate-y-full opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            I just watered this
          </span>
          <span
            className={`block leading-[1.4em] transition-all duration-300 text-botanical ${
              state === "done"
                ? "-translate-y-full opacity-100"
                : "translate-y-0 opacity-0"
            }`}
          >
            Thank you! :)
          </span>
        </span>
      </button>

      <p
        className={`font-mono text-[10px] text-ink-light tracking-wide text-center transition-all duration-500 ${
          lastWatered
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-1"
        }`}
      >
        {lastWatered ? `Last watered: ${formatDate(lastWatered)}` : "\u00A0"}
      </p>
    </div>
  );
}
