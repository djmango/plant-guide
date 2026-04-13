import Link from "next/link";
import { plants } from "@/data/plants";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";

interface SoilRecipe {
  id: string;
  name: string;
  ingredients: { name: string; ratio: number; color: string }[];
  plants: string[];
}

const recipes: SoilRecipe[] = [
  {
    id: "foxfarm-70-30",
    name: "FoxFarm Ocean Forest + Perlite",
    ingredients: [
      { name: "FoxFarm Ocean Forest", ratio: 70, color: "bg-terra" },
      { name: "Perlite", ratio: 30, color: "bg-paper-dark border border-ink/20" },
    ],
    plants: plants
      .filter((p) => p.soilMix === "foxfarm-70-30")
      .map((p) => p.name),
  },
  {
    id: "foxfarm-80-20",
    name: "FoxFarm Ocean Forest + Light Perlite",
    ingredients: [
      { name: "FoxFarm Ocean Forest", ratio: 80, color: "bg-terra" },
      { name: "Perlite", ratio: 20, color: "bg-paper-dark border border-ink/20" },
    ],
    plants: plants
      .filter((p) => p.soilMix === "foxfarm-80-20")
      .map((p) => p.name),
  },
  {
    id: "cactus-succulent",
    name: "Cactus/Succulent Mix + Perlite",
    ingredients: [
      { name: "Cactus/succulent mix", ratio: 55, color: "bg-terra/70" },
      { name: "Perlite", ratio: 45, color: "bg-paper-dark border border-ink/20" },
    ],
    plants: plants
      .filter((p) => p.soilMix === "cactus-succulent")
      .map((p) => p.name),
  },
];

export default function SoilPage() {
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
        Mixing Recipes
      </div>
      <h1 className="text-3xl font-light tracking-tight text-ink">
        Soil Guide
      </h1>
      <p className="mt-2 text-sm text-ink-light">
        Three soil mixes cover all 10 plants. Mix in a bucket or tub before
        repotting day.
      </p>

      <Separator className="my-8 bg-ink/10" />

      <div className="space-y-8">
        {recipes.map((recipe, idx) => (
          <div key={recipe.id} className="border border-ink/10">
            {/* Header */}
            <div className="border-b border-ink/10 bg-paper-dark px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 border border-ink text-ink font-mono text-xs font-medium">
                  {idx + 1}
                </span>
                <h2 className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink">
                  {recipe.name}
                </h2>
              </div>
            </div>

            <div className="px-5 py-5">
              {/* Ratio bar */}
              <div className="flex h-8 overflow-hidden border border-ink/20 mb-4">
                {recipe.ingredients.map((ing) => (
                  <div
                    key={ing.name}
                    className={`${ing.color} flex items-center justify-center`}
                    style={{ width: `${ing.ratio}%` }}
                  >
                    <span className="font-mono text-[10px] text-white mix-blend-difference">
                      {ing.ratio}%
                    </span>
                  </div>
                ))}
              </div>

              {/* Ingredients */}
              <div className="space-y-1.5 mb-4">
                {recipe.ingredients.map((ing) => (
                  <div
                    key={ing.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-3 h-3 ${ing.color} shrink-0`}
                      />
                      <span className="text-sm text-ink">{ing.name}</span>
                    </div>
                    <span className="font-mono text-[11px] text-ink-light">
                      {ing.ratio}%
                    </span>
                  </div>
                ))}
              </div>

              {/* Plants using this mix */}
              <div className="border-t border-ink/10 pt-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-light mb-2">
                  Used by
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {recipe.plants.map((name) => (
                    <span
                      key={name}
                      className="border border-ink/15 px-2 py-0.5 font-mono text-[10px] text-ink-light"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
