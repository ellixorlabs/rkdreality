import {createElement} from "react";
import type {LucideIcon} from "lucide-react";
import {
  Armchair,
  Baby,
  Bike,
  Building2,
  Car,
  Cctv,
  CircleDot,
  CloudRain,
  CookingPot,
  Droplets,
  Dumbbell,
  Fence,
  Flower2,
  Footprints,
  Goal,
  Landmark,
  Library,
  MapPinned,
  PawPrint,
  PlugZap,
  Recycle,
  Road,
  ShieldCheck,
  Signpost,
  Store,
  StretchHorizontal,
  Trees,
  Trophy,
  UtilityPole,
  Waves,
} from "lucide-react";
import type {FeatureItem} from "@/sanity/types";
import {CUSTOM_FEATURE_ICONS} from "@/components/site/feature-icons";

export const FACILITY_CATALOG: {value: string; label: string}[] = [
  {value: "sewage", label: "Underground sewage system"},
  {value: "drainage", label: "Underground drainage"},
  {value: "tank", label: "Overhead water tank"},
  {value: "sump", label: "Underground sump"},
  {value: "borewell", label: "Borewells"},
  {value: "water-supply", label: "24x7 water supply"},
  {value: "rain", label: "Rainwater harvesting"},
  {value: "road", label: "Internal asphalted / concrete roads"},
  {value: "approach-road", label: "Wide approach road"},
  {value: "lighting", label: "Street lighting"},
  {value: "electricity", label: "Electricity connection"},
  {value: "cabling", label: "Underground electrical cabling"},
  {value: "gate", label: "Gated community / compound wall"},
  {value: "security", label: "Security cabin / 24x7 security"},
  {value: "cctv", label: "CCTV surveillance"},
  {value: "demarcation", label: "Site demarcation with number plates"},
  {value: "storm-drain", label: "Storm water drains"},
  {value: "stp", label: "Sewage treatment plant (STP)"},
  {value: "waste", label: "Solid waste management"},
  {value: "parking", label: "Visitor parking"},
  {value: "ev", label: "EV charging point"},
];

export const AMENITY_CATALOG: {value: string; label: string}[] = [
  {value: "natural-pool", label: "Natural swimming pool"},
  {value: "pool", label: "Swimming pool"},
  {value: "park", label: "Children's park / play area"},
  {value: "gym", label: "Outdoor gym equipment"},
  {value: "indoor-gym", label: "Indoor gym"},
  {value: "trees", label: "Greenery / plenty of trees"},
  {value: "garden", label: "Landscaped gardens"},
  {value: "bench", label: "Benches around the park"},
  {value: "walk", label: "Walking / jogging track"},
  {value: "cycle", label: "Cycling track"},
  {value: "cricket", label: "Cricket pitch"},
  {value: "badminton", label: "Badminton court"},
  {value: "tennis", label: "Tennis court"},
  {value: "basketball", label: "Basketball court"},
  {value: "football", label: "Football / multipurpose ground"},
  {value: "clubhouse", label: "Clubhouse"},
  {value: "community-hall", label: "Community hall"},
  {value: "party-lawn", label: "Party lawn"},
  {value: "amphitheatre", label: "Amphitheatre"},
  {value: "yoga", label: "Yoga / meditation deck"},
  {value: "temple", label: "Temple / shrine"},
  {value: "senior", label: "Senior citizen sit-out"},
  {value: "pet", label: "Pet park"},
  {value: "bbq", label: "Barbecue / picnic area"},
  {value: "store", label: "Cafe / convenience store"},
  {value: "library", label: "Library / reading room"},
  {value: "indoor-games", label: "Indoor games room"},
];

const FEATURE_ICONS: Record<string, LucideIcon> = {
  sewage: Waves,
  drainage: Waves,
  tank: Droplets,
  sump: Droplets,
  borewell: Droplets,
  "water-supply": Droplets,
  rain: CloudRain,
  road: Road,
  "approach-road": Road,
  lighting: UtilityPole,
  electricity: UtilityPole,
  cabling: PlugZap,
  gate: Fence,
  security: ShieldCheck,
  cctv: Cctv,
  demarcation: Signpost,
  "storm-drain": Waves,
  stp: Recycle,
  waste: Recycle,
  parking: Car,
  ev: PlugZap,
  "natural-pool": Waves,
  pool: Waves,
  park: Baby,
  gym: Dumbbell,
  "indoor-gym": Dumbbell,
  trees: Trees,
  garden: Flower2,
  bench: Armchair,
  walk: Footprints,
  cycle: Bike,
  cricket: CircleDot,
  badminton: Trophy,
  tennis: Trophy,
  basketball: CircleDot,
  football: Goal,
  clubhouse: Building2,
  "community-hall": Landmark,
  "party-lawn": Flower2,
  amphitheatre: Landmark,
  yoga: StretchHorizontal,
  temple: Landmark,
  senior: Armchair,
  pet: PawPrint,
  bbq: CookingPot,
  store: Store,
  library: Library,
  "indoor-games": Trophy,
};

const ALL_CATALOG = [...FACILITY_CATALOG, ...AMENITY_CATALOG];

const LABEL_HINTS: [RegExp, string][] = [
  [/natural\s*swim|natural\s*pool/i, "natural-pool"],
  [/swim|pool/i, "pool"],
  [/sewage treatment|stp/i, "stp"],
  [/sewage/i, "sewage"],
  [/storm/i, "storm-drain"],
  [/drain/i, "drainage"],
  [/sump/i, "sump"],
  [/tank|overhead/i, "tank"],
  [/bore/i, "borewell"],
  [/rain|harvest/i, "rain"],
  [/water/i, "water-supply"],
  [/approach/i, "approach-road"],
  [/road|asphalt|concrete|tar/i, "road"],
  [/cctv/i, "cctv"],
  [/ev |charg/i, "ev"],
  [/waste|garbage/i, "waste"],
  [/demarc|number plate|survey/i, "demarcation"],
  [/electric|power|eb |cable/i, "electricity"],
  [/light|street lamp/i, "lighting"],
  [/gate|compound|boundary/i, "gate"],
  [/secur|guard/i, "security"],
  [/park(ing)?/i, "parking"],
  [/child|play area|playpark/i, "park"],
  [/indoor gym/i, "indoor-gym"],
  [/gym|fitness/i, "gym"],
  [/landscap|garden/i, "garden"],
  [/tree|green/i, "trees"],
  [/bench|sit-out|sit out/i, "bench"],
  [/cricket/i, "cricket"],
  [/badminton/i, "badminton"],
  [/tennis/i, "tennis"],
  [/basket/i, "basketball"],
  [/football|soccer|ground/i, "football"],
  [/cycle/i, "cycle"],
  [/walk|jog|track/i, "walk"],
  [/club/i, "clubhouse"],
  [/community/i, "community-hall"],
  [/party/i, "party-lawn"],
  [/amphi/i, "amphitheatre"],
  [/yoga|meditat/i, "yoga"],
  [/temple|shrine/i, "temple"],
  [/senior/i, "senior"],
  [/pet/i, "pet"],
  [/bbq|barbe|picnic/i, "bbq"],
  [/cafe|store|shop/i, "store"],
  [/library|read/i, "library"],
  [/indoor game/i, "indoor-games"],
];

export function FeatureGlyph({
  icon,
  className,
}: {
  icon?: string;
  className?: string;
}) {
  const Custom = icon ? CUSTOM_FEATURE_ICONS[icon] : undefined;
  if (Custom) return createElement(Custom, {className});
  const Lucide = FEATURE_ICONS[icon ?? ""] ?? MapPinned;
  return createElement(Lucide, {className});
}

export function resolveCatalogItems(
  keys: string[] | undefined,
  catalog: {value: string; label: string}[]
): FeatureItem[] {
  if (!keys?.length) return [];
  const byValue = new Map(catalog.map((item) => [item.value, item]));
  return keys
    .map((key) => byValue.get(key))
    .filter((item): item is {value: string; label: string} => Boolean(item))
    .map((item) => ({icon: item.value, label: item.label}));
}

export function guessFeatureIcon(label: string): string {
  for (const [re, icon] of LABEL_HINTS) {
    if (re.test(label)) return icon;
  }
  return "trees";
}

export function fromLegacyLabels(labels?: string[]): FeatureItem[] {
  if (!labels?.length) return [];
  return labels
    .map((label) => label.trim())
    .filter(Boolean)
    .map((label) => {
      const match = ALL_CATALOG.find(
        (item) => item.label.toLowerCase() === label.toLowerCase()
      );
      if (match) return {icon: match.value, label: match.label};
      return {icon: guessFeatureIcon(label), label};
    });
}

export function fromLegacyObjects(
  items?: {icon?: string; label?: string}[]
): FeatureItem[] {
  if (!items?.length) return [];
  return items
    .filter((item) => item.label)
    .map((item) => {
      const byValue = ALL_CATALOG.find((c) => c.value === item.icon);
      if (byValue) return {icon: byValue.value, label: byValue.label};
      return {
        icon: guessFeatureIcon(item.label ?? ""),
        label: item.label ?? "",
      };
    });
}
