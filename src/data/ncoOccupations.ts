// Curated subset of India's National Classification of Occupations (NCO).
// Codes and titles are taken directly from the official Ministry of Labour &
// Employment occupation code list. Keyword lists are our own illustrative
// additions (not official text) used to match resumes against each occupation.
// This is a Phase 1 demo subset, not the full national taxonomy.

export interface NcoOccupation {
  code: string;
  title: string;
  keywords: string[];
}

export const ncoOccupations: NcoOccupation[] = [
  { code: "330", title: "Book-keepers and Accounts Clerks", keywords: ["bookkeeping", "ledger", "accounts", "MS Excel", "data entry", "invoicing"] },
  { code: "331", title: "Cashiers", keywords: ["cash handling", "billing", "POS", "customer service", "reconciliation"] },
  { code: "352", title: "Receptionists", keywords: ["front desk", "telephone handling", "scheduling", "customer service", "visitor management"] },
  { code: "103", title: "System Analysts and Programmers", keywords: ["programming", "software development", "system design", "coding", "debugging"] },
  { code: "341", title: "Automatic Data Processing Machine Operators", keywords: ["data entry", "computer operation", "typing", "MS Office", "record keeping"] },
  { code: "320", title: "Stenographers and Steno Typists", keywords: ["shorthand", "typing", "dictation", "correspondence"] },
  { code: "120", title: "Accountants and Auditors", keywords: ["accounting", "auditing", "tax", "financial statements", "GST", "tally"] },
  { code: "400", title: "Merchants and Shop Keepers, Wholesale Trade", keywords: ["wholesale", "inventory management", "vendor relations", "retail management"] },
  { code: "401", title: "Merchants and Shop Keepers, Retail Trade", keywords: ["retail management", "inventory", "sales", "customer service", "billing"] },
  { code: "430", title: "Salesmen, Shop Assistants and Demonstrators", keywords: ["retail sales", "customer service", "product demonstration", "upselling"] },
  { code: "410", title: "Sales Supervisors", keywords: ["sales team management", "targets", "retail supervision", "reporting"] },
  { code: "530", title: "Ayaha, Nurse, Maids", keywords: ["childcare", "patient care", "household work", "elderly care"] },
  { code: "531", title: "Domestic Servants", keywords: ["housekeeping", "cooking", "cleaning", "household management"] },
  { code: "084", title: "Nurses", keywords: ["patient care", "nursing", "first aid", "medical assistance", "vitals monitoring"] },
  { code: "088", title: "Physio-Therapists and Occupational Therapists", keywords: ["physiotherapy", "rehabilitation", "patient assessment", "exercise therapy"] },
  { code: "986", title: "Tram Car & Motor Vehicle Drivers", keywords: ["driving", "vehicle operation", "route navigation", "traffic rules", "vehicle maintenance"] },
  { code: "988", title: "Cycle Rickshaw Drivers & Rickshaw Pullers", keywords: ["driving", "local transport", "navigation"] },
  { code: "381", title: "Messengers and Dispatch Riders", keywords: ["delivery", "courier", "dispatch", "route planning", "time management"] },
  { code: "971", title: "Loaders & Unloaders", keywords: ["warehouse", "loading", "logistics", "material handling"] },
  { code: "380", title: "Postmen", keywords: ["mail delivery", "route delivery", "sorting", "record keeping"] },
  { code: "811", title: "Carpenters", keywords: ["carpentry", "woodworking", "furniture making", "measuring", "tools"] },
  { code: "852", title: "Electricians, Electrical Fitters & Related Workers", keywords: ["wiring", "electrical repair", "installation", "circuit testing", "safety compliance"] },
  { code: "871", title: "Plumbers & Pipe Fitters", keywords: ["plumbing", "pipefitting", "repair", "installation", "leak detection"] },
  { code: "951", title: "Bricklayers, Stone, Masons & Tile Setters", keywords: ["masonry", "construction", "tiling", "measurement", "material estimation"] },
  { code: "791", title: "Tailors and Dress Makers", keywords: ["tailoring", "stitching", "garment making", "pattern cutting", "measurement"] },
  { code: "843", title: "Motor Vehicle Mechanics", keywords: ["vehicle repair", "mechanics", "automotive", "diagnostics", "maintenance"] },
  { code: "855", title: "Radio & Television Mechanics and Repairmen", keywords: ["electronics repair", "troubleshooting", "circuit diagnosis"] },
  { code: "573", title: "Protection Force, Home Guards and Security Workers", keywords: ["security", "surveillance", "guarding", "access control", "incident reporting"] },
  { code: "574", title: "Watchmen, Chowkidars & Gate Keepers", keywords: ["security", "gatekeeping", "monitoring", "night duty"] },
  { code: "520", title: "Cooks and Cook-Bearers", keywords: ["cooking", "food preparation", "catering", "kitchen management", "hygiene"] },
  { code: "153", title: "Teachers, Primary", keywords: ["primary teaching", "classroom management", "lesson planning", "child education"] },
  { code: "151", title: "Teachers, Higher Secondary & High School", keywords: ["secondary teaching", "subject expertise", "lesson planning", "student assessment"] },
  { code: "540", title: "Caretakers, Buildings and Caretakers, Monuments", keywords: ["facility maintenance", "cleaning", "upkeep", "security rounds"] },
  { code: "854", title: "Electrical & Electronic Equipment Assemblers", keywords: ["assembly", "quality checking", "electronics", "wiring", "soldering"] },
  { code: "872", title: "Welders and Flame Cutters", keywords: ["welding", "metal cutting", "fabrication", "safety equipment use"] },
  { code: "873", title: "Sheet Metal Workers", keywords: ["sheet metal fabrication", "cutting", "bending", "measurement"] },
  { code: "630", title: "Agricultural Labourers", keywords: ["farming", "crop cultivation", "harvesting", "irrigation"] },
  { code: "653", title: "Cattle Breeders", keywords: ["animal husbandry", "livestock management", "dairy farming"] },
  { code: "561", title: "Barbers", keywords: ["hair cutting", "grooming", "customer service"] },
  { code: "560", title: "Hair Dressers, Beauticians, Manicurists, Make-up Men, Bath Attendants", keywords: ["beauty services", "grooming", "customer service", "hygiene practices"] },
  { code: "111", title: "Economic Investigators and Related Workers", keywords: ["data collection", "surveys", "field research", "reporting"] },
];
