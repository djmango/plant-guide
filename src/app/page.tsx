"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { plants } from "@/data/plants";
import { Check } from "lucide-react";

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
  if (daysSinceWater === null) return "";
  const daysUntil = expectedDays - daysSinceWater;

  if (daysUntil <= 0) return "Overdue!";
  if (daysUntil === 1) return "Tomorrow";

  const next = new Date();
  next.setDate(next.getDate() + daysUntil);

  if (daysUntil <= 6)
    return next.toLocaleDateString("en-US", { weekday: "long" });
  return next.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function statusBorderColor(
  daysSinceWater: number | null,
  expectedDays: number
): string {
  if (daysSinceWater === null) return "border-ink/10";
  const ratio = daysSinceWater / expectedDays;
  if (ratio <= 0.7) return "border-botanical/30";
  if (ratio <= 1.0) return "border-terra/40";
  return "border-danger/50";
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

export default function Home() {
  const [logs, setLogs] = useState<WateringLog[]>([]);
  const [wateringSlug, setWateringSlug] = useState<string | null>(null);

  const fetchLogs = useCallback(async () => {
    try {
      const res = await fetch("/api/water");
      if (!res.ok) return;
      const data = (await res.json()) as { logs: WateringLog[] };
      setLogs(data.logs);
    } catch {
      // API not available
    }
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const handleWater = async (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (wateringSlug) return;
    setWateringSlug(slug);
    try {
      await fetch("/api/water", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      await fetchLogs();
    } catch {
      // API not available
    }
    setTimeout(() => setWateringSlug(null), 2000);
  };

  const getLastWatered = (slug: string): WateringLog | undefined => {
    return logs.find((l) => l.plant_slug === slug);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 overflow-hidden">
      <div className="grid grid-cols-2 gap-[1px] bg-ink/10 border border-ink/10 sm:grid-cols-3 lg:grid-cols-5">
        {plants.map((plant) => {
          const last = getLastWatered(plant.slug);
          const days = last ? daysSince(last.watered_at) : null;
          const expectedDays = parseWaterFrequencyDays(plant.waterFrequency);
          const isWatering = wateringSlug === plant.slug;
          const nextLabel = nextWaterLabel(days, expectedDays);

          return (
            <div key={plant.slug} className="bg-paper min-w-0">
              <Link
                href={`/plants/${plant.slug}`}
                className={`group block overflow-hidden border-l-2 ${statusBorderColor(days, expectedDays)} transition-colors`}
              >
                <div className="relative aspect-[5/6] bg-paper">
                  <div className="absolute inset-0 flex items-end justify-center p-3 pt-4">
                    <img
                      src={plant.imageUrl}
                      alt={plant.name}
                      className={`h-full w-full object-contain object-bottom transition-all duration-500 ease-out will-change-transform ${
                        isWatering
                          ? "scale-95 opacity-30"
                          : "group-hover:scale-[1.04]"
                      }`}
                    />
                  </div>

                  {/* Watering animation overlay */}
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-all duration-500 ${
                      isWatering ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <img
                      src="/images/watering-can.webp"
                      alt=""
                      className={`w-2/3 object-contain transition-all duration-700 ${
                        isWatering
                          ? "translate-y-0 opacity-100"
                          : "-translate-y-4 opacity-0"
                      }`}
                    />
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

                  {/* Water button */}
                  <button
                    onClick={(e) => handleWater(plant.slug, e)}
                    disabled={!!wateringSlug}
                    className={`absolute top-2 right-2 p-1.5 sm:p-2 rounded-full transition-all duration-300 cursor-pointer ${
                      isWatering
                        ? "bg-botanical/20 scale-110"
                        : "bg-paper/80 hover:bg-water/10 sm:opacity-0 sm:group-hover:opacity-100"
                    }`}
                    title="Log watering"
                  >
                    {isWatering ? (
                      <Check className="h-6 w-6 text-botanical" />
                    ) : (
                      <img
                        src="/images/watering-can.webp"
                        alt="Water"
                        className="h-7 w-7 sm:h-8 sm:w-8 object-contain opacity-60 hover:opacity-100 transition-opacity"
                      />
                    )}
                  </button>
                </div>

                <div className="border-t border-ink/10 px-2 py-2 sm:px-3 sm:py-2.5">
                  <p className="text-xs sm:text-sm font-normal text-ink leading-tight truncate">
                    {plant.name}
                  </p>
                  <p className="mt-0.5 font-mono text-[9px] sm:text-[10px] text-ink-light italic truncate">
                    {plant.scientificName}
                  </p>
                  {days !== null && (
                    <div className="mt-1 flex items-baseline gap-1.5">
                      <span
                        className={`font-mono text-[9px] sm:text-[10px] uppercase tracking-wider ${statusTextColor(days, expectedDays)}`}
                      >
                        {days === 0
                          ? "Today"
                          : days === 1
                            ? "1d ago"
                            : `${days}d ago`}
                      </span>
                      {nextLabel && (
                        <span className="font-mono text-[8px] sm:text-[9px] text-ink-light truncate">
                          / {nextLabel}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
