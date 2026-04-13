import Link from "next/link";
import { plants } from "@/data/plants";
import { Separator } from "@/components/ui/separator";
import {
  Droplets,
  ArrowLeft,
  GlassWater,
  Timer,
} from "lucide-react";

export default function WateringPage() {
  const topPourPlants = plants.filter((p) => p.waterMethod === "top-pour");
  const reservoirPlants = plants.filter((p) => p.waterMethod === "reservoir");

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-light hover:text-ink transition-colors mb-8"
      >
        <ArrowLeft className="h-3 w-3" />
        Back to catalog
      </Link>

      <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-light">
        Reference Card
      </div>
      <h1 className="text-3xl font-light tracking-tight text-ink">
        Watering Schedule
      </h1>
      <p className="mt-2 text-sm text-ink-light">
        Quick-reference for watering method, frequency, and dry-out rules.
      </p>

      <Separator className="my-8 bg-ink/10" />

      {/* Full schedule table */}
      <div className="border border-ink/10 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-ink/10 bg-paper-dark/50">
              <th className="px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-light font-medium">
                Plant
              </th>
              <th className="px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-light font-medium">
                Method
              </th>
              <th className="px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-light font-medium">
                Frequency
              </th>
              <th className="px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-light font-medium">
                Let Dry?
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10">
            {plants.map((plant) => (
              <tr key={plant.slug} className="hover:bg-paper-dark/30 transition-colors">
                <td className="px-4 py-2.5">
                  <Link
                    href={`/plants/${plant.slug}`}
                    className="text-sm text-ink hover:text-botanical transition-colors"
                  >
                    {plant.name}
                  </Link>
                </td>
                <td className="px-4 py-2.5">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-light">
                    {plant.waterMethod === "reservoir" ? (
                      <GlassWater className="h-3 w-3 text-water" />
                    ) : (
                      <Droplets className="h-3 w-3 text-water" />
                    )}
                    {plant.waterMethod === "reservoir"
                      ? "Reservoir"
                      : "Top pour"}
                  </span>
                </td>
                <td className="px-4 py-2.5 font-mono text-[11px] text-ink">
                  {plant.waterFrequency}
                </td>
                <td className="px-4 py-2.5 font-mono text-[11px] text-ink-light">
                  {plant.letDry}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Separator className="my-10 bg-ink/10" />

      {/* Method groups */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Top Pour */}
        <div className="border border-ink/10">
          <div className="border-b border-ink/10 bg-paper-dark px-4 py-3 flex items-center gap-2">
            <Droplets className="h-4 w-4 text-water" />
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink">
              Top Pour
            </h2>
          </div>
          <div className="px-4 py-3">
            <p className="text-xs text-ink-light leading-relaxed mb-3">
              Pour water from above until it runs out the drainage hole into the
              saucer. Empty saucer after 30 minutes.
            </p>
            <div className="space-y-2">
              {topPourPlants.map((plant) => (
                <div
                  key={plant.slug}
                  className="flex items-center justify-between"
                >
                  <Link
                    href={`/plants/${plant.slug}`}
                    className="text-sm text-ink hover:text-botanical transition-colors"
                  >
                    {plant.name}
                  </Link>
                  <div className="flex items-center gap-1.5">
                    <Timer className="h-3 w-3 text-ink-light" />
                    <span className="font-mono text-[10px] text-ink-light">
                      {plant.waterFrequency}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reservoir */}
        <div className="border border-ink/10">
          <div className="border-b border-ink/10 bg-paper-dark px-4 py-3 flex items-center gap-2">
            <GlassWater className="h-4 w-4 text-water" />
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink">
              Self-Watering Reservoir
            </h2>
          </div>
          <div className="px-4 py-3">
            <p className="text-xs text-ink-light leading-relaxed mb-3">
              Refill the reservoir when the indicator shows empty. The wick
              draws water up to the roots as needed.
            </p>
            <div className="space-y-2">
              {reservoirPlants.map((plant) => (
                <div
                  key={plant.slug}
                  className="flex items-center justify-between"
                >
                  <Link
                    href={`/plants/${plant.slug}`}
                    className="text-sm text-ink hover:text-botanical transition-colors"
                  >
                    {plant.name}
                  </Link>
                  <div className="flex items-center gap-1.5">
                    <Timer className="h-3 w-3 text-ink-light" />
                    <span className="font-mono text-[10px] text-ink-light">
                      {plant.waterFrequency}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
