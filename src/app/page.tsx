import { plants } from "@/data/plants";
import { PlantCard } from "@/components/plant-card";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="grid grid-cols-2 gap-[1px] bg-ink/10 border border-ink/10 sm:grid-cols-3 lg:grid-cols-5">
        {plants.map((plant) => (
          <div key={plant.slug} className="bg-paper">
            <PlantCard plant={plant} />
          </div>
        ))}
      </div>
    </div>
  );
}
