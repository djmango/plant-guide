export interface RepottingStep {
  number: number;
  title: string;
  instruction: string;
  icon: string;
  warning?: string;
  plantNotes?: string[];
}

export const repottingSteps: RepottingStep[] = [
  {
    number: 1,
    title: "Water the day before",
    instruction:
      "Water all plants the day before so rootballs slide out easier.",
    icon: "droplets",
  },
  {
    number: 2,
    title: "Mix your soils",
    instruction:
      "Mix soils in a bucket or tub — FoxFarm + perlite for tropicals, cactus mix + perlite for succulents.",
    icon: "beaker",
    plantNotes: [
      "70/30 FoxFarm/perlite → Fiddle Leafs, Goldfish Plant, Ficus Benjamina, Ficus Moclame, Kentia Palm, Neanthe Bella Palm",
      "80/20 FoxFarm/perlite → Boston Fern",
      "50–70/30–50 cactus/perlite → Firestick, String of Bananas",
    ],
  },
  {
    number: 3,
    title: "Prepare self-watering pots",
    instruction:
      "Set up white self-watering pots — place wick, add soil to the bottom.",
    icon: "container",
    plantNotes: [
      "Boston Fern, Ficus Benjamina, Ficus Moclame, Kentia Palm, Neanthe Bella Palm → YES fill reservoir after",
    ],
  },
  {
    number: 4,
    title: "Remove from nursery pot",
    instruction:
      "Tip each plant out of its nursery pot. Squeeze the sides gently to loosen.",
    icon: "hand",
  },
  {
    number: 5,
    title: "Loosen the roots",
    instruction:
      "Gently loosen and tease apart the roots. Break up any tightly bound sections.",
    icon: "scissors",
  },
  {
    number: 6,
    title: "Place in new pot",
    instruction:
      "Place plant in new pot, fill around edges with soil, press lightly to settle.",
    icon: "arrow-down-to-line",
  },
  {
    number: 7,
    title: "Water everything in",
    instruction: "Water thoroughly to settle the soil around the roots.",
    icon: "droplets",
  },
  {
    number: 8,
    title: "Fill reservoirs",
    instruction:
      "For white self-watering pots: fill the reservoir after the initial top-watering.",
    icon: "gauge",
    plantNotes: [
      "Reservoir plants: Boston Fern, Ficus Benjamina, Ficus Moclame, Kentia Palm, Neanthe Bella Palm",
    ],
  },
  {
    number: 9,
    title: "Drain ceramic pots",
    instruction:
      "For ceramic/terracotta: water from top until it runs into the saucer. Empty saucer after 30 min.",
    icon: "cup-soda",
    plantNotes: [
      "Fiddle Leaf Fig Tree, Fiddle Leaf Fig Bush, Goldfish Plant, Firestick, String of Bananas",
    ],
  },
  {
    number: 10,
    title: "Place & don't move",
    instruction:
      "Put each plant in its final spot. Don't move the Ficus Benjamina again after placing it.",
    icon: "map-pin",
    warning:
      "Wear gloves for the Firestick — toxic sap burns skin and eyes.",
  },
];
