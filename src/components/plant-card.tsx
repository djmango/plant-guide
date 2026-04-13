import Link from "next/link";
import type { Plant } from "@/data/plants";

export function PlantCard({ plant }: { plant: Plant }) {
  return (
    <Link
      href={`/plants/${plant.slug}`}
      className="group block overflow-hidden border border-ink/10 hover:border-ink/30 transition-colors"
    >
      <div className="relative aspect-[5/6] bg-paper">
        <div className="absolute inset-0 flex items-end justify-center p-3 pt-4">
          <img
            src={plant.imageUrl}
            alt={plant.name}
            className="h-full w-full object-contain object-bottom transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.04]"
          />
        </div>
      </div>
      <div className="border-t border-ink/10 px-2 py-2 sm:px-3 sm:py-2.5">
        <p className="text-xs sm:text-sm font-normal text-ink leading-tight truncate">
          {plant.name}
        </p>
        <p className="mt-0.5 font-mono text-[9px] sm:text-[10px] text-ink-light italic truncate">
          {plant.scientificName}
        </p>
      </div>
    </Link>
  );
}
