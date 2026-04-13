export interface Plant {
  slug: string;
  name: string;
  scientificName: string;
  description: string;
  imageUrl: string;
  currentPot: string;
  newPot: string;
  potType: string;
  soil: string;
  soilMix: string;
  water: string;
  waterFrequency: string;
  waterMethod: "top-pour" | "reservoir";
  letDry: string;
  light: string;
  humidity: string;
  temp: string;
  notes: string;
  tags: string[];
}

export const plants: Plant[] = [
  {
    slug: "fiddle-leaf-fig-tree",
    name: "Fiddle Leaf Fig Tree",
    scientificName: "Ficus lyrata",
    description:
      "Big violin-shaped leaves on a tall single trunk. The statement piece.",
    imageUrl: "/images/plants/fiddle-leaf-fig-tree.webp",
    currentPot: '14" nursery',
    newPot: 'Off-white ceramic 16" w/ saucer',
    potType: "Glazed ceramic, off-white",
    soil: "FoxFarm Ocean Forest + perlite (70/30)",
    soilMix: "foxfarm-70-30",
    water:
      "Every 10 days — let top 2\" dry, then drench until water runs out the bottom",
    waterFrequency: "Every 10 days",
    waterMethod: "top-pour",
    letDry: 'Top 2" dry',
    light: "Bright indirect",
    humidity: "50–65%",
    temp: "60–80°F",
    notes:
      "Don't move it around. Rotate ¼ turn monthly for even growth. Wipe leaves with damp cloth monthly — dust blocks light.",
    tags: ["ficus", "statement", "bright-light"],
  },
  {
    slug: "fiddle-leaf-fig-bush",
    name: "Fiddle Leaf Fig Bush",
    scientificName: "Ficus lyrata",
    description:
      "Same big leaves but shorter and bushier — multiple stems instead of one trunk.",
    imageUrl: "/images/plants/fiddle-leaf-fig-bush.webp",
    currentPot: '12"',
    newPot: 'Black ceramic 14" w/ linocut leaf pattern on 3-leg wood stand',
    potType: "Black glazed ceramic on elevated wood stand",
    soil: "FoxFarm Ocean Forest + perlite (70/30)",
    soilMix: "foxfarm-70-30",
    water:
      'Every 8 days — top 2" dry then drench. Smaller pot dries faster than the tree.',
    waterFrequency: "Every 8 days",
    waterMethod: "top-pour",
    letDry: 'Top 2" dry',
    light: "Bright indirect",
    humidity: "50–65%",
    temp: "60–80°F",
    notes:
      "Same care as the tree form. May need water a couple days sooner due to smaller pot.",
    tags: ["ficus", "bushy", "bright-light"],
  },
  {
    slug: "goldfish-plant",
    name: "Goldfish Plant",
    scientificName: "Nematanthus gregarius",
    description:
      "Glossy dark green leaves with bright orange flowers that look like tiny leaping goldfish.",
    imageUrl: "/images/plants/goldfish-plant.webp",
    currentPot: '6"',
    newPot: '8" red ceramic w/ tiger-eye pattern',
    potType: "Glazed ceramic, red with tiger-eye pattern",
    soil: "FoxFarm Ocean Forest + perlite (70/30)",
    soilMix: "foxfarm-70-30",
    water:
      'Every 7–10 days — let top 1" dry between waterings. Likes consistent moisture but not soggy.',
    waterFrequency: "Every 7–10 days",
    waterMethod: "top-pour",
    letDry: 'Top 1" dry',
    light: "Bright indirect",
    humidity: "50–70%",
    temp: "60–80°F",
    notes:
      "Blooms best with bright light. Can trail or climb. Pinch stems to encourage bushier growth and more flowers. Reduce watering slightly in winter.",
    tags: ["flowering", "trailing", "bright-light"],
  },
  {
    slug: "boston-fern",
    name: "Boston Fern",
    scientificName: "Nephrolepis exaltata",
    description:
      "Fluffy, feathery fronds arching out in all directions. Very lush and full.",
    imageUrl: "/images/plants/boston-fern.webp",
    currentPot: '6"',
    newPot: '8" white self-watering (YES fill reservoir)',
    potType: "White self-watering plastic",
    soil: "FoxFarm Ocean Forest + light perlite (80/20)",
    soilMix: "foxfarm-80-20",
    water:
      "Refill reservoir every 5–7 days when indicator shows empty. Thirstiest plant you own. Mist fronds regularly.",
    waterFrequency: "Every 5–7 days",
    waterMethod: "reservoir",
    letDry: "Never let dry",
    light: "Medium indirect — no direct sun",
    humidity: "60–80%",
    temp: "60–75°F",
    notes:
      "Bathroom with a window is ideal. Will shed fronds if too dry. Loves humidity more than any other plant on this list.",
    tags: ["fern", "humidity-lover", "thirsty"],
  },
  {
    slug: "euphorbia-firestick",
    name: "Euphorbia Firestick",
    scientificName: "Euphorbia tirucalli",
    description:
      "Green pencil-thin sticks with red-orange tips at the top. Looks like a coral reef. No real leaves.",
    imageUrl: "/images/plants/euphorbia-firestick.webp",
    currentPot: '5 gal (~10–11")',
    newPot: 'Deroma terracotta 12" w/ saucer',
    potType: "Unglazed terracotta",
    soil: "Cactus/succulent mix + lots of extra perlite (50/50)",
    soilMix: "cactus-succulent",
    water: "Every 21 days — let it go bone dry. Desert plant, less is more.",
    waterFrequency: "Every 21 days",
    waterMethod: "top-pour",
    letDry: "Bone dry",
    light: "Full sun — brightest spot you have",
    humidity: "30–50%",
    temp: "50–85°F",
    notes:
      "TOXIC SAP — always wear gloves when handling. The white milky sap burns skin and eyes. Keep away from pets. Terracotta pot helps it dry out faster which is what it wants.",
    tags: ["succulent", "toxic", "full-sun", "drought-tolerant"],
  },
  {
    slug: "ficus-benjamina",
    name: "Ficus Benjamina",
    scientificName: "Ficus benjamina",
    description:
      'Small oval glossy leaves, graceful drooping branches. The classic "weeping fig."',
    imageUrl: "/images/plants/ficus-benjamina.webp",
    currentPot: '8"',
    newPot: '10" white self-watering (YES fill reservoir)',
    potType: "White self-watering plastic",
    soil: "FoxFarm Ocean Forest + perlite (70/30)",
    soilMix: "foxfarm-70-30",
    water:
      "Refill reservoir every 7–10 days when indicator shows empty.",
    waterFrequency: "Every 7–10 days",
    waterMethod: "reservoir",
    letDry: "No",
    light: "Bright indirect, tolerates some direct",
    humidity: "50–60%",
    temp: "60–80°F",
    notes:
      "HATES being moved — will drop leaves for weeks after relocation. Pick a spot and commit. Leaf drop after bringing it home is normal and temporary.",
    tags: ["ficus", "sensitive", "bright-light"],
  },
  {
    slug: "ficus-moclame",
    name: "Ficus Moclame",
    scientificName: "Ficus microcarpa 'Moclame'",
    description:
      "Similar to Benjamina but with thicker, rounder, darker leaves and a more upright shape.",
    imageUrl: "/images/plants/ficus-moclame.webp",
    currentPot: '10"',
    newPot: '12" white self-watering (YES fill reservoir)',
    potType: "White self-watering plastic",
    soil: "FoxFarm Ocean Forest + perlite (70/30)",
    soilMix: "foxfarm-70-30",
    water:
      "Refill reservoir every 7–10 days when indicator shows empty.",
    waterFrequency: "Every 7–10 days",
    waterMethod: "reservoir",
    letDry: "No",
    light: "Bright indirect",
    humidity: "40–60%",
    temp: "60–80°F",
    notes:
      "More forgiving than Benjamina. Rotate ¼ turn every 2 weeks for even growth. Tolerates some neglect.",
    tags: ["ficus", "forgiving", "bright-light"],
  },
  {
    slug: "kentia-palm",
    name: "Kentia Palm",
    scientificName: "Howea forsteriana",
    description:
      "Tall elegant palm fronds arching outward, thin dark green leaflets. 4–5 feet tall.",
    imageUrl: "/images/plants/kentia-palm.webp",
    currentPot: '10"',
    newPot: '12" white self-watering (YES fill reservoir)',
    potType: "White self-watering plastic",
    soil: "FoxFarm Ocean Forest + perlite (70/30)",
    soilMix: "foxfarm-70-30",
    water:
      "Refill reservoir every 10–14 days when indicator shows empty.",
    waterFrequency: "Every 10–14 days",
    waterMethod: "reservoir",
    letDry: "No",
    light: "Low to bright indirect — most forgiving for light",
    humidity: "50–60%",
    temp: "55–80°F",
    notes:
      "Brown leaf tips = humidity too low. Mist occasionally or place a pebble tray with water nearby. Slow grower — don't expect fast changes.",
    tags: ["palm", "low-light", "forgiving"],
  },
  {
    slug: "neanthe-bella-palm",
    name: "Neanthe Bella Palm",
    scientificName: "Chamaedorea elegans",
    description:
      "Much smaller/shorter palm than the Kentia. Delicate thin fronds, bushy clump.",
    imageUrl: "/images/plants/neanthe-bella-palm.webp",
    currentPot: '8"',
    newPot: '10" white self-watering (YES fill reservoir)',
    potType: "White self-watering plastic",
    soil: "FoxFarm Ocean Forest + perlite (70/30)",
    soilMix: "foxfarm-70-30",
    water:
      "Refill reservoir every 7–10 days when indicator shows empty. Don't let this one fully dry out.",
    waterFrequency: "Every 7–10 days",
    waterMethod: "reservoir",
    letDry: "No",
    light: "Low to medium indirect",
    humidity: "50–60%",
    temp: "65–80°F",
    notes:
      'Great low-light plant. Also called "parlor palm." Very easy to care for.',
    tags: ["palm", "low-light", "easy"],
  },
  {
    slug: "string-of-bananas",
    name: "String of Bananas",
    scientificName: "Curio radicans",
    description:
      "Trailing vines with small banana-shaped leaves. Chunkier than String of Hearts.",
    imageUrl: "/images/plants/string-of-bananas.webp",
    currentPot: '6"',
    newPot: '8" blue & white Portuguese tile-style ceramic',
    potType: "Blue and white painted ceramic, Portuguese tile style",
    soil: "Cactus/succulent mix + extra perlite",
    soilMix: "cactus-succulent",
    water:
      "Every 12 days — let it dry out completely between waterings. Succulent, overwatering is the enemy.",
    waterFrequency: "Every 12 days",
    waterMethod: "top-pour",
    letDry: "Completely dry",
    light: "Bright indirect to some direct sun",
    humidity: "40–50%",
    temp: "50–80°F",
    notes:
      "Place on a high ledge so it trails down. Very easy to propagate — just snip a vine and stick it in soil.",
    tags: ["trailing", "succulent", "easy"],
  },
];

export function getPlantBySlug(slug: string): Plant | undefined {
  return plants.find((p) => p.slug === slug);
}
