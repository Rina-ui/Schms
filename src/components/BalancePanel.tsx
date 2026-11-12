import type { Reaction } from "../data/lab";
import { atomTable } from "../engine/chemistry";
import Formula from "./Formula";

interface Props {
    reaction: Reaction;
    coefs: number[];
    feedback: { ok: boolean; text: string } | null;
    onChange: (index: number, delta: number) => void;
    onCheck: () => void;
}

export default function BalancePanel({ reaction, coefs, feedback, onChange, onCheck }: Props) {
    const species = [...reaction.reactants, ...reaction.products];
    const rows = atomTable(reaction, coefs);

    return (
        <section className="card">
            <b>Équilibre l’équation</b>

            <div className="equation">
                {species.map((s, i) => (
                    <span key={i} className="species">
            {i === reaction.reactants.length && <span className="arrow">→</span>}
                        {i > 0 && i !== reaction.reactants.length && <span>+</span>}
                        <button onClick={() => onChange(i, -1)}>−</button>
            <strong className="coef">{coefs[i]}</strong>
            <button onClick={() => onChange(i, 1)}>+</button>
            <Formula value={s} />
          </span>
                ))}
            </div>

            <table>
                <thead>
                <tr><th>Atome</th><th>Réactifs</th><th>Produits</th><th></th></tr>
                </thead>
                <tbody>
                {rows.map(r => (
                    <tr key={r.element}>
                        <td>{r.element}</td>
                        <td>{r.left}</td>
                        <td>{r.right}</td>
                        <td className={r.left === r.right ? "ok" : "no"}>
                            {r.left === r.right ? "✓" : "✗"}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="row">
                <button className="btn" onClick={onCheck}>Valider</button>
            </div>

            {feedback && (
                <p className={`msg ${feedback.ok ? "ok" : "no"}`}>{feedback.text}</p>
            )}
        </section>
    );
}