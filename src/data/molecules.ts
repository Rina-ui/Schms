
import type { Atom, Bond } from "../types/chemistry";

export interface MoleculeTemplate {
    name: string;
    formula: string;
    atoms: Atom[];
    bonds: Bond[];
}

export const waterTemplate: MoleculeTemplate = {
    name: "Eau",
    formula: "H2O",

    atoms: [
        {
            id: "oxygen",
            symbol: "O",
            position: [0, 0, 0]
        },
        {
            id: "hydrogen-1",
            symbol: "H",
            position: [-1.03, 0.79, 0]
        },
        {
            id: "hydrogen-2",
            symbol: "H",
            position: [1.03, 0.79, 0]
        }
    ],

    bonds: [
        {
            id: "bond-1",
            atomA: "oxygen",
            atomB: "hydrogen-1"
        },
        {
            id: "bond-2",
            atomA: "oxygen",
            atomB: "hydrogen-2"
        }
    ]
};
