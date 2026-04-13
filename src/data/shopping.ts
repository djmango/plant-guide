export interface ShoppingItem {
  id: string;
  name: string;
  category: "self-watering-pots" | "ceramic-terracotta" | "soil" | "supplies";
  forPlants: string[];
  price: string;
  quantity: number;
  note?: string;
}

export const shoppingCategories = [
  { id: "self-watering-pots", label: "Self-Watering Pots", icon: "droplets" },
  { id: "ceramic-terracotta", label: "Ceramic & Terracotta Pots", icon: "flower" },
  { id: "soil", label: "Soil & Amendments", icon: "layers" },
  { id: "supplies", label: "Supplies", icon: "wrench" },
] as const;

export const shoppingItems: ShoppingItem[] = [
  {
    id: "sw-set-1",
    name: 'White self-watering 8/10/12" set',
    category: "self-watering-pots",
    forPlants: ["Boston Fern (8\")", "Neanthe Bella Palm (10\")", "Kentia Palm (12\")"],
    price: "$25–30",
    quantity: 1,
    note: "White, set of 3 sizes",
  },
  {
    id: "sw-set-2",
    name: 'White self-watering 10/12" set',
    category: "self-watering-pots",
    forPlants: [
      "Ficus Benjamina (10\")",
      "Ficus Moclame (12\")",
    ],
    price: "$18–25",
    quantity: 1,
    note: "White, 2 pots from set",
  },
  {
    id: "ceramic-16",
    name: 'Off-white ceramic 16" w/ saucer',
    category: "ceramic-terracotta",
    forPlants: ["Fiddle Leaf Fig Tree"],
    price: "$60–80",
    quantity: 1,
  },
  {
    id: "ceramic-14-black",
    name: 'Black ceramic 14" w/ linocut leaf pattern + 3-leg wood stand',
    category: "ceramic-terracotta",
    forPlants: ["Fiddle Leaf Fig Bush"],
    price: "$50–70",
    quantity: 1,
    note: "African ink art style leaf cutouts, elevated on wood legs",
  },
  {
    id: "ceramic-8-red",
    name: '8" red ceramic w/ tiger-eye pattern',
    category: "ceramic-terracotta",
    forPlants: ["Goldfish Plant"],
    price: "$15–25",
    quantity: 1,
  },
  {
    id: "ceramic-8-portuguese",
    name: '8" blue & white Portuguese tile-style ceramic',
    category: "ceramic-terracotta",
    forPlants: ["String of Bananas"],
    price: "$15–25",
    quantity: 1,
    note: "Blue painted floral lines on white",
  },
  {
    id: "terra-12",
    name: 'Deroma terracotta 12" w/ saucer',
    category: "ceramic-terracotta",
    forPlants: ["Firestick"],
    price: "$15–25",
    quantity: 1,
  },
  {
    id: "foxfarm",
    name: "FoxFarm Ocean Forest 1.5 cu ft",
    category: "soil",
    forPlants: [
      "Fiddle Leaf Fig Tree",
      "Fiddle Leaf Fig Bush",
      "Goldfish Plant",
      "Boston Fern",
      "Ficus Benjamina",
      "Ficus Moclame",
      "Kentia Palm",
      "Neanthe Bella Palm",
    ],
    price: "$18–22",
    quantity: 1,
  },
  {
    id: "cactus-mix",
    name: "Cactus/succulent mix 8 qt",
    category: "soil",
    forPlants: ["Firestick", "String of Bananas"],
    price: "$8–12",
    quantity: 1,
  },
  {
    id: "perlite",
    name: "Perlite 8 qt",
    category: "soil",
    forPlants: ["All plants"],
    price: "$5–8",
    quantity: 1,
  },
  {
    id: "mesh-screens",
    name: "Mesh drainage screens (20–50 pack)",
    category: "supplies",
    forPlants: ["All pots"],
    price: "$5–6",
    quantity: 1,
  },
  {
    id: "caddies",
    name: "Rolling plant caddies",
    category: "supplies",
    forPlants: ["Fiddle Leaf Fig Tree", "Fiddle Leaf Fig Bush"],
    price: "$25–40",
    quantity: 2,
  },
  {
    id: "moisture-meter",
    name: "Moisture meter",
    category: "supplies",
    forPlants: ["All plants"],
    price: "$8–12",
    quantity: 1,
  },
];

export const totalEstimate = "$270–380";
