import type { ElementSymbol } from "../data/elements";

export interface Atom {
    id: string;
    symbol: ElementSymbol;
    position: [number, number, number];
}

export interface Bond {
    id: string;
    atomA: string;
    atomB: string;
}