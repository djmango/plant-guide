"use client";

import { useState, useEffect, useCallback } from "react";
import { Droplets, Check, Loader2 } from "lucide-react";

interface WateringLog {
  id: number;
  plant_slug: string;
  watered_at: string;
  notes: string | null;
}

function parseWaterFrequencyDays(freq: string): number {
  const match = freq.match(/(\d+)(?:\s*[–-]\s*(\d+))?/);
  if (!match) return 7;
  if (match[2])
    return Math.round((parseInt(match[1]) + parseInt(match[2])) / 2);
  return parseInt(match[1]);
}

function nextWaterLabel(daysSinceWater: number, expectedDays: number): string {
  const daysUntil = expectedDays - daysSinceWater;
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + daysUntil);

  const date = dueDate.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
  });

  if (daysUntil < 0) return `overdue ${date}`;
  if (daysUntil === 0) return `today ${date}`;
  if (daysUntil === 1) return `tomorrow ${date}`;

  const weekEnd = new Date();
  weekEnd.setDate(weekEnd.getDate() + (6 - weekEnd.getDay()));
  weekEnd.setHours(23, 59, 59, 999);

  const weekLabel = dueDate <= weekEnd ? "this" : "next";
  const weekday = dueDate.toLocaleDateString("en-US", { weekday: "short" });
  return `${weekLabel} ${weekday} ${date}`;
}

export function WaterButton({
  slug,
  waterFrequency,
}: {
  slug: string;
  waterFrequency: string;
}) {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [logs, setLogs] = useState<WateringLog[]>([]);

  const fetchLogs = useCallback(async () => {
    try {
      const res = await fetch(`/api/water?slug=${slug}`);
      if (!res.ok) return;
      const data = (await res.json()) as { logs: WateringLog[] };
      setLogs(data.logs);
    } catch {
      // API not available
    }
  }, [slug]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

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
        await fetchLogs();
      }
    } catch {
      // API not available - still play the animation
    }
    finishAnimation();
  };

  const lastLog = logs.length > 0 ? logs[0] : null;
  const daysSince = lastLog
    ? Math.floor(
        (new Date().getTime() - new Date(lastLog.watered_at + "Z").getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : null;
  const expectedDays = parseWaterFrequencyDays(waterFrequency);

  const formatRelative = (days: number) => {
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    return `${days} days ago`;
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Button */}
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

      {/* Status + Next water */}
      {daysSince !== null && (
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[10px] text-ink-light tracking-wide">
            Last watered: {formatRelative(daysSince)}
          </span>
          <span
            className={`font-mono text-[10px] tracking-wide ${
              expectedDays - daysSince <= 0
                ? "text-danger"
                : expectedDays - daysSince <= 2
                  ? "text-terra"
                  : "text-botanical"
            }`}
          >
            Next: {nextWaterLabel(daysSince, expectedDays)}
          </span>
        </div>
      )}

      {/* History */}
      {logs.length > 0 && (
        <div className="border-t border-ink/10 pt-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-light mb-2">
            Watering History
          </p>
          <div className="space-y-1">
            {logs.slice(0, 8).map((log) => (
              <p key={log.id} className="font-mono text-[10px] text-ink-light">
                {new Date(log.watered_at + "Z").toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
