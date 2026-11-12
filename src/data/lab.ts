export interface Reagent {
    name: string;
    color: string;
}

export interface Reaction {
    reactants: string[];
    products: string[];
    coefficients: number[]; // réactifs puis produits, forme la plus simple
}

export interface Mission {
    title: string;
    product: string;
}

export const reagents: Record<string, Reagent> = {
    H2: { name: "Dihydrogène", color: "#7cc7ff" },
    // O: { name: "Oxygène", color: "#fff3ff" },
    O2: { name: "Dioxygène", color: "#ff9a9a" },
    N2: { name: "Diazote", color: "#9b8cff" },
    Cl2: { name: "Dichlore", color: "#b6e86a" },
    C: { name: "Carbone", color: "#555555" },
    S: { name: "Soufre", color: "#f5e04a" },
    Fe: { name: "Fer", color: "#9a9aa8" },
    Cu: { name: "Cuivre", color: "#d9803f" },
    Zn: { name: "Zinc", color: "#8fa8b8" },
    Al: { name: "Aluminium", color: "#c5ccd6" },
    Mg: { name: "Magnésium", color: "#d0d0d0" },
    Ca: { name: "Calcium", color: "#d9d2c0" },
    Na: { name: "Sodium", color: "#e8c85a" },
    K: { name: "Potassium", color: "#c79bf2" },
    Li: { name: "Lithium", color: "#f08ab0" },
};

export const productColors: Record<string, string> = {
    H2O: "#4aa8ff",
    Fe2O3: "#b5532e",
    NaCl: "#f2f2f2",
    CO2: "#c9d6df",
    MgO: "#f5f5f0",
    NH3: "#c8f0e0",
    CaO: "#f1ece0",
    Al2O3: "#e6e9ee",
    KCl: "#f4f4f4",
    CuO: "#2b2b2b",
    SO2: "#f0e68c",
    ZnO: "#f7f7f0",
    Li2O: "#f0f0f0",
    ZnS: "#e9e6c9",
    AlCl3: "#e8f0d0",
    HCl: "#d8f5a8",
    FeS: "#3a3a3a",
    Na2O: "#f3e9d2",
    MgCl2: "#eef5f5",
    CaCl2: "#f5f5f5",
    H2S: "#e8d84a",
    CH4: "#bfe3ff",
};

export const reactions: Reaction[] = [
    // avec le dioxygène
    { reactants: ["H2", "O2"], products: ["H2O"], coefficients: [2, 1, 2] },
    { reactants: ["Fe", "O2"], products: ["Fe2O3"], coefficients: [4, 3, 2] },
    { reactants: ["C", "O2"], products: ["CO2"], coefficients: [1, 1, 1] },
    { reactants: ["Mg", "O2"], products: ["MgO"], coefficients: [2, 1, 2] },
    { reactants: ["Ca", "O2"], products: ["CaO"], coefficients: [2, 1, 2] },
    { reactants: ["Al", "O2"], products: ["Al2O3"], coefficients: [4, 3, 2] },
    { reactants: ["Cu", "O2"], products: ["CuO"], coefficients: [2, 1, 2] },
    { reactants: ["S", "O2"], products: ["SO2"], coefficients: [1, 1, 1] },
    { reactants: ["Zn", "O2"], products: ["ZnO"], coefficients: [2, 1, 2] },
    { reactants: ["Li", "O2"], products: ["Li2O"], coefficients: [4, 1, 2] },
    { reactants: ["Na", "O2"], products: ["Na2O"], coefficients: [4, 1, 2] },

    // avec l'oxygene

    // avec le dichlore
    { reactants: ["Na", "Cl2"], products: ["NaCl"], coefficients: [2, 1, 2] },
    { reactants: ["K", "Cl2"], products: ["KCl"], coefficients: [2, 1, 2] },
    { reactants: ["Al", "Cl2"], products: ["AlCl3"], coefficients: [2, 3, 2] },
    { reactants: ["Mg", "Cl2"], products: ["MgCl2"], coefficients: [1, 1, 1] },
    { reactants: ["Ca", "Cl2"], products: ["CaCl2"], coefficients: [1, 1, 1] },
    { reactants: ["H2", "Cl2"], products: ["HCl"], coefficients: [1, 1, 2] },

    // autres synthèses
    { reactants: ["N2", "H2"], products: ["NH3"], coefficients: [1, 3, 2] },
    { reactants: ["C", "H2"], products: ["CH4"], coefficients: [1, 2, 1] },
    { reactants: ["H2", "S"], products: ["H2S"], coefficients: [1, 1, 1] },
    { reactants: ["Fe", "S"], products: ["FeS"], coefficients: [1, 1, 1] },
    { reactants: ["Zn", "S"], products: ["ZnS"], coefficients: [1, 1, 1] },
];

export const missions: Mission[] = [
    { title: "Fabrique de l’eau (H₂O)", product: "H2O" },
    { title: "Fais rouiller le fer (Fe₂O₃)", product: "Fe2O3" },
    { title: "Fabrique du sel de table (NaCl)", product: "NaCl" },
    { title: "Fais brûler le soufre (SO₂)", product: "SO2" },
    { title: "Synthétise l’ammoniac (NH₃)", product: "NH3" },
    { title: "Fabrique du méthane (CH₄)", product: "CH4" },
    { title: "Fabrique de la chaux vive (CaO)", product: "CaO" },
    { title: "Oxyde l’aluminium (Al₂O₃)", product: "Al2O3" },
    { title: "Fabrique du chlorure d’hydrogène (HCl)", product: "HCl" },
    { title: "Oxyde le cuivre (CuO)", product: "CuO" },
];

export function colorOf(species: string): string {
    return productColors[species] ?? reagents[species]?.color ?? "#888888";
}