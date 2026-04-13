import Link from "next/link";
import type { Plant } from "@/data/plants";

export function PlantCard({ plant }: { plant: Plant }) {
  return (
    <Link
      href={`/plants/${plant.slug}`}
      className="group block border border-ink/10 hover:border-ink/30 transition-colors"
    >
      <div className="aspect-[5/6] overflow-hidden bg-paper flex items-end justify-center p-3 pt-4">
        <img
          src={plant.imageUrl}
          alt={plant.name}
          className="max-h-full max-w-full object-contain object-bottom transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.04]"
        />
      </div>
      <div className="border-t border-ink/10 px-3 py-2.5">
        <p className="text-sm font-normal text-ink leading-tight">
          {plant.name}
        </p>
        <p className="mt-0.5 font-mono text-[10px] text-ink-light italic">
          {plant.scientificName}
        </p>
      </div>
    </Link>
  );
}
