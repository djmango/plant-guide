"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { plants } from "@/data/plants";
import { Droplets, Check, Loader2, History } from "lucide-react";

interface WateringLog {
  id: number;
  plant_slug: string;
  watered_at: string;
  notes: string | null;
}

function parseWaterFrequencyDays(freq: string): number {
  const match = freq.match(/(\d+)(?:\s*[–-]\s*(\d+))?/);
  if (!match) return 7;
  if (match[2]) return Math.round((parseInt(match[1]) + parseInt(match[2])) / 2);
  return parseInt(match[1]);
}

function daysSince(iso: string): number {
  const d = new Date(iso + "Z");
  const now = new Date();
  return Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
}

function statusColor(daysSinceWater: number | null, expectedDays: number): string {
  if (daysSinceWater === null) return "text-ink-light";
  const ratio = daysSinceWater / expectedDays;
  if (ratio <= 0.7) return "text-botanical";
  if (ratio <= 1.0) return "text-terra";
  return "text-danger";
}

function statusBg(daysSinceWater: number | null, expectedDays: number): string {
  if (daysSinceWater === null) return "bg-ink/5";
  const ratio = daysSinceWater / expectedDays;
  if (ratio <= 0.7) return "bg-botanical/5";
  if (ratio <= 1.0) return "bg-terra/5";
  return "bg-danger/5";
}

export default function TrackerPage() {
  const [logs, setLogs] = useState<WateringLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [wateringSlug, setWateringSlug] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState<string | null>(null);

  const fetchLogs = useCallback(async () => {
    try {
      const res = await fetch("/api/water");
      if (!res.ok) return;
      const data = (await res.json()) as { logs: WateringLog[] };
      setLogs(data.logs);
    } catch {
      // API not available
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const handleWater = async (slug: string) => {
    setWateringSlug(slug);
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
      // API not available
    } finally {
      setTimeout(() => setWateringSlug(null), 1000);
    }
  };

  const getLastWatered = (slug: string): WateringLog | undefined => {
    return logs.find((l) => l.plant_slug === slug);
  };

  const getPlantHistory = (slug: string): WateringLog[] => {
    return logs.filter((l) => l.plant_slug === slug);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-light">
          Watering Tracker
        </h1>
        <p className="mt-2 text-sm text-ink-light">
          Tap to log watering. Color indicates time since last watered relative
          to each plant&apos;s schedule.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-5 w-5 animate-spin text-ink-light" />
        </div>
      ) : (
        <div className="border border-ink/10 divide-y divide-ink/10">
          {plants.map((plant) => {
            const last = getLastWatered(plant.slug);
            const days = last ? daysSince(last.watered_at) : null;
            const expectedDays = parseWaterFrequencyDays(plant.waterFrequency);
            const history = getPlantHistory(plant.slug);
            const isWatering = wateringSlug === plant.slug;
            const isShowingHistory = showHistory === plant.slug;

            return (
              <div key={plant.slug}>
                <div
                  className={`flex items-center gap-4 px-4 py-3 transition-colors ${statusBg(days, expectedDays)}`}
                >
                  <Link
                    href={`/plants/${plant.slug}`}
                    className="shrink-0 w-10 h-10 border border-ink/10 bg-paper flex items-center justify-center overflow-hidden"
                  >
                    <img
                      src={plant.imageUrl}
                      alt={plant.name}
                      className="h-full w-full object-contain"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/plants/${plant.slug}`}
                      className="text-sm text-ink hover:underline truncate block"
                    >
                      {plant.name}
                    </Link>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span
                        className={`font-mono text-[10px] uppercase tracking-wider ${statusColor(days, expectedDays)}`}
                      >
                        {days === null
                          ? "No data"
                          : days === 0
                            ? "Watered today"
                            : days === 1
                              ? "1 day ago"
                              : `${days} days ago`}
                      </span>
                      <span className="font-mono text-[9px] text-ink-light">
                        / {plant.waterFrequency}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() =>
                        setShowHistory(isShowingHistory ? null : plant.slug)
                      }
                      className="p-2 text-ink-light hover:text-ink transition-colors cursor-pointer"
                      title="History"
                    >
                      <History className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleWater(plant.slug)}
                      disabled={isWatering}
                      className="inline-flex items-center gap-1.5 border border-water/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-water hover:bg-water/10 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {isWatering ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <Droplets className="h-3 w-3" />
                      )}
                      {isWatering ? "Done" : "Water"}
                    </button>
                  </div>
                </div>

                {isShowingHistory && (
                  <div className="px-4 py-3 bg-paper-dark/50 border-t border-ink/5">
                    {history.length === 0 ? (
                      <p className="font-mono text-[10px] text-ink-light">
                        No watering history yet.
                      </p>
                    ) : (
                      <div className="space-y-1">
                        <p className="font-mono text-[10px] uppercase tracking-wider text-ink-light mb-2">
                          Recent waterings
                        </p>
                        {history.slice(0, 10).map((log) => (
                          <div
                            key={log.id}
                            className="flex items-center gap-3 font-mono text-[10px]"
                          >
                            <span className="text-ink-light w-28 shrink-0">
                              {new Date(log.watered_at + "Z").toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                  hour: "numeric",
                                  minute: "2-digit",
                                }
                              )}
                            </span>
                            {log.notes && (
                              <span className="text-ink truncate">
                                {log.notes}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
