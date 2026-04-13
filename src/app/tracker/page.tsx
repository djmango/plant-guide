"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { plants } from "@/data/plants";
import { Loader2 } from "lucide-react";

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

function daysSince(iso: string): number {
  const d = new Date(iso + "Z");
  const now = new Date();
  return Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
}

function nextWaterLabel(
  daysSinceWater: number | null,
  expectedDays: number
): string {
  if (daysSinceWater === null) return "No data";
  const daysUntil = expectedDays - daysSinceWater;

  if (daysUntil <= 0) return "Overdue!";
  if (daysUntil === 1) return "Tomorrow";

  const next = new Date();
  next.setDate(next.getDate() + daysUntil);

  if (daysUntil <= 6)
    return next.toLocaleDateString("en-US", { weekday: "long" });
  return next.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function statusColor(
  daysSinceWater: number | null,
  expectedDays: number
): string {
  if (daysSinceWater === null) return "border-ink/10";
  const ratio = daysSinceWater / expectedDays;
  if (ratio <= 0.7) return "border-botanical/30";
  if (ratio <= 1.0) return "border-terra/30";
  return "border-danger/40";
}

function statusTextColor(
  daysSinceWater: number | null,
  expectedDays: number
): string {
  if (daysSinceWater === null) return "text-ink-light";
  const ratio = daysSinceWater / expectedDays;
  if (ratio <= 0.7) return "text-botanical";
  if (ratio <= 1.0) return "text-terra";
  return "text-danger";
}

export default function TrackerPage() {
  const [logs, setLogs] = useState<WateringLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [wateringSlug, setWateringSlug] = useState<string | null>(null);
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

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
    if (wateringSlug) return;
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
    }
    setTimeout(() => setWateringSlug(null), 2000);
  };

  const getLastWatered = (slug: string): WateringLog | undefined => {
    return logs.find((l) => l.plant_slug === slug);
  };

  const getPlantHistory = (slug: string): WateringLog[] => {
    return logs.filter((l) => l.plant_slug === slug);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-light">
          Watering Tracker
        </h1>
        <p className="mt-2 text-sm text-ink-light">
          Tap plant to water. Tap name for history.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-5 w-5 animate-spin text-ink-light" />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-[1px] bg-ink/10 border border-ink/10 sm:grid-cols-3 lg:grid-cols-5">
          {plants.map((plant) => {
            const last = getLastWatered(plant.slug);
            const days = last ? daysSince(last.watered_at) : null;
            const expectedDays = parseWaterFrequencyDays(
              plant.waterFrequency
            );
            const history = getPlantHistory(plant.slug);
            const isWatering = wateringSlug === plant.slug;
            const isExpanded = expandedSlug === plant.slug;

            return (
              <div key={plant.slug} className="bg-paper min-w-0">
                <div
                  className={`border-l-2 ${statusColor(days, expectedDays)} transition-colors`}
                >
                  {/* Image area - tap to water */}
                  <button
                    onClick={() => handleWater(plant.slug)}
                    disabled={!!wateringSlug}
                    className="relative w-full aspect-[5/6] overflow-hidden bg-paper cursor-pointer group"
                  >
                    <div className="absolute inset-0 flex items-end justify-center p-3 pt-4">
                      <img
                        src={plant.imageUrl}
                        alt={plant.name}
                        className={`h-full w-full object-contain object-bottom transition-all duration-700 ${
                          isWatering
                            ? "scale-95 opacity-30"
                            : "group-hover:scale-[1.03]"
                        }`}
                      />
                    </div>

                    {/* Watering can animation overlay */}
                    <div
                      className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-all duration-500 ${
                        isWatering
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <img
                        src="/images/watering-can.webp"
                        alt=""
                        className={`w-2/3 object-contain transition-all duration-700 ${
                          isWatering
                            ? "translate-y-0 rotate-0 opacity-100"
                            : "-translate-y-4 rotate-12 opacity-0"
                        }`}
                      />
                      {/* Water drops */}
                      <div
                        className={`flex gap-1 mt-1 transition-all duration-500 delay-300 ${
                          isWatering ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <span className="block w-1 h-1 rounded-full bg-water animate-bounce [animation-delay:0ms]" />
                        <span className="block w-1.5 h-1.5 rounded-full bg-water animate-bounce [animation-delay:150ms]" />
                        <span className="block w-1 h-1 rounded-full bg-water animate-bounce [animation-delay:300ms]" />
                      </div>
                    </div>

                    {/* Hover hint */}
                    {!isWatering && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <img
                          src="/images/watering-can.webp"
                          alt=""
                          className="w-1/3 object-contain opacity-30"
                        />
                      </div>
                    )}
                  </button>

                  {/* Info area */}
                  <div className="border-t border-ink/10 px-2 py-2 sm:px-3 sm:py-2.5">
                    <button
                      onClick={() =>
                        setExpandedSlug(isExpanded ? null : plant.slug)
                      }
                      className="w-full text-left cursor-pointer"
                    >
                      <p className="text-xs sm:text-sm font-normal text-ink leading-tight truncate">
                        {plant.name}
                      </p>
                      <div className="mt-1 flex flex-col gap-0.5">
                        <span
                          className={`font-mono text-[9px] sm:text-[10px] uppercase tracking-wider ${statusTextColor(days, expectedDays)}`}
                        >
                          {days === null
                            ? "No data"
                            : days === 0
                              ? "Watered today"
                              : days === 1
                                ? "1 day ago"
                                : `${days} days ago`}
                        </span>
                        <span className="font-mono text-[9px] sm:text-[10px] text-ink-light">
                          Next: {nextWaterLabel(days, expectedDays)}
                        </span>
                      </div>
                    </button>

                    {/* Expanded history */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-out ${
                        isExpanded ? "max-h-48 mt-2" : "max-h-0"
                      }`}
                    >
                      <div className="border-t border-ink/5 pt-2 space-y-1">
                        <Link
                          href={`/plants/${plant.slug}`}
                          className="block font-mono text-[9px] uppercase tracking-wider text-ink-light hover:text-ink transition-colors mb-1.5"
                        >
                          View details
                        </Link>
                        {history.length === 0 ? (
                          <p className="font-mono text-[9px] text-ink-light">
                            No history yet.
                          </p>
                        ) : (
                          history.slice(0, 5).map((log) => (
                            <p
                              key={log.id}
                              className="font-mono text-[9px] text-ink-light truncate"
                            >
                              {new Date(
                                log.watered_at + "Z"
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                              })}
                            </p>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
