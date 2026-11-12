import { reactions, type Reaction } from "../data/lab";

export interface AtomRow {
    element: string;
    left: number;
    right: number;
}

// "Fe2O3" -> { Fe: 2, O: 3 }
export function parseFormula(formula: string): Record<string, number> {
    const result: Record<string, number> = {};
    const regex = /([A-Z][a-z]?)(\d*)/g;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(formula)) !== null) {
        const count = match[2] ? parseInt(match[2], 10) : 1;
        result[match[1]] = (result[match[1]] ?? 0) + count;
    }
    return result;
}

export function findReaction(a: string, b: string): Reaction | undefined {
    const key = [a, b].sort().join("|");
    return reactions.find(r => [...r.reactants].sort().join("|") === key);
}

export function atomTable(reaction: Reaction, coefs: number[]): AtomRow[] {
    const species = [...reaction.reactants, ...reaction.products];
    const elements = new Set<string>();
    species.forEach(s => Object.keys(parseFormula(s)).forEach(e => elements.add(e)));

    return [...elements].map(element => {
        let left = 0;
        let right = 0;
        species.forEach((s, i) => {
            const n = (parseFormula(s)[element] ?? 0) * coefs[i];
            if (i < reaction.reactants.length) left += n;
            else right += n;
        });
        return { element, left, right };
    });
}

export function isBalanced(rows: AtomRow[]): boolean {
    return rows.every(r => r.left === r.right);
}

export function isSimplest(reaction: Reaction, coefs: number[]): boolean {
    return reaction.coefficients.every((c, i) => c === coefs[i]);
}