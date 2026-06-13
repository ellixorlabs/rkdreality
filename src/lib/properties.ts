export type PropertyStatus = "Available" | "Few Plots Left" | "Sold Out";
export type PropertyType =
  | "Residential Plots"
  | "Commercial Land"
  | "Joint Venture"
  | "Farm Land";

export interface Property {
  id: string;
  title: string;
  location: string;
  city: "Bangalore" | "Mysore" | "Nelamangala";
  type: PropertyType;
  priceLabel: string;
  priceFrom: number; // in lakhs, for filtering
  sizeLabel: string;
  status: PropertyStatus;
  image: string;
  rera: string;
  highlights: string[];
  appreciation: string;
  gallery?: string[];
}

export const properties: Property[] = [
  {
    id: "rkd-bangalore-site-1",
    title: "Banglore Site 1",
    location: "Bangalore",
    city: "Bangalore",
    type: "Residential Plots",
    priceLabel: "₹42.0 L onwards",
    priceFrom: 42.0,
    sizeLabel: "1,200 – 2,400 sq.ft",
    status: "Available",
    image: "https://i.imageupload.app/baeafab2bc626fafbbe1.jpeg",
    gallery: [
      "https://i.imageupload.app/baeafab2bc626fafbbe1.jpeg",
      "https://i.imageupload.app/7a4e909e5fd836b446ed.jpeg",
      "https://i.imageupload.app/d12f072b760608106891.jpeg",
      "https://i.imageupload.app/657311af243a007d9bbb.jpeg",
      "https://i.imageupload.app/3a7453d79aca172506b1.jpeg",
      "https://i.imageupload.app/cf9ba7d7860154e95385.jpeg",
    ],
    rera: "PRM/KA/RERA/1251/512/PR/2024",
    highlights: ["BMRDA Approved", "Clear Title", "On-Ground Photos"],
    appreciation: "~13% p.a. corridor growth",
  },
  {
    id: "rkd-greenmeadows",
    title: "Green Meadows Enclave",
    location: "Off Nelamangala–Tumkur Road",
    city: "Nelamangala",
    type: "Residential Plots",
    priceLabel: "₹38.5 L onwards",
    priceFrom: 38.5,
    sizeLabel: "1,200 – 2,400 sq.ft",
    status: "Few Plots Left",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80",
    rera: "PRM/KA/RERA/1251/446/PR/2024",
    highlights: ["BMRDA Approved", "Clear Title", "Gated Layout"],
    appreciation: "~14% p.a. corridor growth",
  },
  {
    id: "rkd-mysore-heights",
    title: "Cauvery Heights",
    location: "Ring Road, Hootagalli",
    city: "Mysore",
    type: "Residential Plots",
    priceLabel: "₹29.0 L onwards",
    priceFrom: 29.0,
    sizeLabel: "1,200 – 1,800 sq.ft",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?auto=format&fit=crop&w=1400&q=80",
    rera: "PRM/KA/RERA/1252/309/PR/2024",
    highlights: ["DTCP Approved", "Title Insured", "Near Infosys Campus"],
    appreciation: "~11% p.a. steady demand",
  },
  {
    id: "rkd-techpark-commercial",
    title: "Whitefield Commercial Frontage",
    location: "ITPL Main Road",
    city: "Bangalore",
    type: "Commercial Land",
    priceLabel: "₹2.4 Cr onwards",
    priceFrom: 240,
    sizeLabel: "4,000 – 12,000 sq.ft",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80",
    rera: "PRM/KA/RERA/1251/472/PR/2023",
    highlights: ["Highway Facing", "High Footfall", "Encumbrance-Free"],
    appreciation: "Prime rental yield zone",
  },
  {
    id: "rkd-devanahalli-jv",
    title: "Devanahalli Aero JV",
    location: "Near Kempegowda Int'l Airport",
    city: "Bangalore",
    type: "Joint Venture",
    priceLabel: "Investor partnership",
    priceFrom: 500,
    sizeLabel: "3.5 acre parcel",
    status: "Few Plots Left",
    image:
      "https://images.unsplash.com/photo-1444858345149-8ab2f3387dcf?auto=format&fit=crop&w=1400&q=80",
    rera: "PRM/KA/RERA/1251/498/PR/2024",
    highlights: ["Airport Corridor", "Revenue Share", "Phased Returns"],
    appreciation: "Airport-led appreciation",
  },
  {
    id: "rkd-srirangapatna-farm",
    title: "Cauvery Bank Farm Plots",
    location: "Srirangapatna Belt",
    city: "Mysore",
    type: "Farm Land",
    priceLabel: "₹18.0 L onwards",
    priceFrom: 18.0,
    sizeLabel: "0.25 – 1 acre",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=1400&q=80",
    rera: "PRM/KA/RERA/1253/118/PR/2024",
    highlights: ["River-Fed Soil", "Clear Patta", "Managed Farming"],
    appreciation: "~9% p.a. + yield",
  },
  {
    id: "rkd-nelamangala-industrial",
    title: "Dabaspete Industrial Plots",
    location: "NH-48, Dabaspete",
    city: "Nelamangala",
    type: "Commercial Land",
    priceLabel: "₹62.0 L onwards",
    priceFrom: 62.0,
    sizeLabel: "5,000 – 20,000 sq.ft",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1400&q=80",
    rera: "PRM/KA/RERA/1251/501/PR/2024",
    highlights: ["KIADB Belt", "Logistics Hub", "Wide Frontage"],
    appreciation: "Warehousing demand surge",
  },
];

export const propertyTypes: PropertyType[] = [
  "Residential Plots",
  "Commercial Land",
  "Joint Venture",
  "Farm Land",
];

export const cities = ["Bangalore", "Mysore", "Nelamangala"] as const;
