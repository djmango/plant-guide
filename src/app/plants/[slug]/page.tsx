import { plants, getPlantBySlug } from "@/data/plants";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Sun,
  Droplets,
  Thermometer,
  Wind,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { WaterButton } from "@/components/water-button";
import { PlantQRCode } from "@/components/qr-code";

export function generateStaticParams() {
  return plants.map((plant) => ({ slug: plant.slug }));
}

export default async function PlantPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const plant = getPlantBySlug(slug);
  if (!plant) return notFound();

  const isToxic = plant.tags.includes("toxic");

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-light hover:text-ink transition-colors mb-8"
      >
        <ArrowLeft className="h-3 w-3" />
        Back to catalog
      </Link>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Image */}
        <div className="border border-ink/10 bg-paper-dark/30 aspect-square flex items-center justify-center">
          <img
            src={plant.imageUrl}
            alt={plant.name}
            className="h-full w-full object-contain p-6"
          />
        </div>

        {/* Info */}
        <div>
          <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-light">
            Plant No. {String(plants.indexOf(plant) + 1).padStart(2, "0")}
          </div>
          <h1 className="text-3xl font-light tracking-tight text-ink">
            {plant.name}
          </h1>
          <p className="mt-1 font-mono text-xs italic text-ink-light">
            {plant.scientificName}
          </p>
          <p className="mt-3 text-sm text-ink-light leading-relaxed">
            {plant.description}
          </p>

          {isToxic && (
            <div className="mt-4 flex items-start gap-2 border border-danger/30 bg-danger/5 px-3 py-2">
              <AlertTriangle className="h-4 w-4 text-danger shrink-0 mt-0.5" />
              <p className="font-mono text-[11px] text-danger leading-relaxed">
                Toxic sap — always wear gloves when handling. Keep away from
                pets.
              </p>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className="font-mono text-[10px] uppercase tracking-wider rounded-none"
            >
              <Sun className="h-3 w-3 mr-1" />
              {plant.light}
            </Badge>
            <Badge
              variant="outline"
              className="font-mono text-[10px] uppercase tracking-wider rounded-none"
            >
              <Droplets className="h-3 w-3 mr-1" />
              {plant.waterFrequency}
            </Badge>
            <Badge
              variant="outline"
              className="font-mono text-[10px] uppercase tracking-wider rounded-none"
            >
              <Wind className="h-3 w-3 mr-1" />
              {plant.humidity}
            </Badge>
            <Badge
              variant="outline"
              className="font-mono text-[10px] uppercase tracking-wider rounded-none"
            >
              <Thermometer className="h-3 w-3 mr-1" />
              {plant.temp}
            </Badge>
          </div>
        </div>
      </div>

      <Separator className="my-10 bg-ink/10" />

      {/* Specs Table */}
      <div className="border border-ink/10">
        <div className="border-b border-ink/10 bg-paper-dark px-4 py-2">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink">
            Specifications
          </h2>
        </div>
        <div className="divide-y divide-ink/10">
          {[
            { label: "Current Pot", value: plant.currentPot },
            { label: "New Pot", value: plant.newPot },
            { label: "Pot Type", value: plant.potType },
            { label: "Soil", value: plant.soil },
            { label: "Watering", value: plant.water },
            { label: "Light", value: plant.light },
            { label: "Humidity", value: plant.humidity },
            { label: "Temperature", value: plant.temp },
          ].map((spec) => (
            <div
              key={spec.label}
              className="grid grid-cols-[140px_1fr] sm:grid-cols-[180px_1fr]"
            >
              <div className="px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-light bg-paper-dark/50">
                {spec.label}
              </div>
              <div className="px-4 py-2.5 text-sm text-ink">{spec.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="mt-8 border border-ink/10 px-5 py-4">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink mb-3">
          Care Notes
        </h2>
        <p className="text-sm text-ink leading-relaxed">{plant.notes}</p>
      </div>

      {/* Watering + QR */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-ink/10 px-5 py-5">
        <WaterButton slug={plant.slug} />
        <PlantQRCode slug={plant.slug} name={plant.name} />
      </div>
    </div>
  );
}
