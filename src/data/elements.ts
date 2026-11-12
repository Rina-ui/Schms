
export const elements = {
    H: {
        symbol: "H",
        name: "Hydrogène",
        color: "#FFFFFF",
        radius: 0.38,
        valence: 1
    },

    O: {
        symbol: "O",
        name: "Oxygène",
        color: "#EF4444",
        radius: 0.55,
        valence: 2
    }
} as const;

export type ElementSymbol = keyof typeof elements;
