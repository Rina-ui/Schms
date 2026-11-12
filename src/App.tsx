import { useState } from "react";
import { reagents, missions, colorOf, type Reaction } from "./data/lab";
import { findReaction, atomTable, isBalanced, isSimplest } from "./engine/chemistry";
import Formula from "./components/Formula";
import Bench from "./components/Bench";
import BalancePanel from "./components/BalancePanel";
import "./App.css";

export default function App() {
  const [tubes, setTubes] = useState<(string | null)[]>([null, null]);
  const [selected, setSelected] = useState(0);
  const [xp, setXp] = useState(0);
  const [missionIndex, setMissionIndex] = useState(0);
  const [message, setMessage] = useState("Touche un tube, puis un flacon pour le verser.");
  const [reaction, setReaction] = useState<Reaction | null>(null);
  const [reacting, setReacting] = useState(false);
  const [coefs, setCoefs] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);

  const mission = missions[missionIndex];
  const level = 1 + Math.floor(xp / 50);

  function pour(symbol: string) {
    setTubes(prev => prev.map((t, i) => (i === selected ? symbol : t)));
    setSelected(selected === 0 ? 1 : 0);
    setReaction(null);
    setFeedback(null);
    setMessage("");
  }

  function clearTubes() {
    setTubes([null, null]);
    setSelected(0);
    setReaction(null);
    setFeedback(null);
    setMessage("Tubes vidés.");
  }

  function mix() {
    const [a, b] = tubes;
    if (!a || !b) {
      setMessage("Remplis les deux tubes d’abord.");
      return;
    }
    const found = findReaction(a, b);
    if (!found) {
      setMessage("Aucune réaction visible. Essaie une autre combinaison !");
      return;
    }
    setReacting(true);
    setMessage("Ça réagit !");
    setTimeout(() => {
      setTubes([found.products[0], null]);
      setSelected(1);
      setReaction(found);
      setCoefs(Array(found.reactants.length + found.products.length).fill(1));
      setFeedback(null);
      setReacting(false);
      setMessage("Une réaction s’est produite. Note l’équation dans ton cahier !");
    }, 1300);
  }

  function changeCoef(index: number, delta: number) {
    setCoefs(prev =>
        prev.map((c, i) => (i === index ? Math.max(1, Math.min(9, c + delta)) : c))
    );
  }

  function check() {
    if (!reaction) return;

    if (!isBalanced(atomTable(reaction, coefs))) {
      setFeedback({ ok: false, text: "Pas encore équilibrée : regarde les ✗ dans le tableau." });
      return;
    }
    if (!isSimplest(reaction, coefs)) {
      setFeedback({ ok: false, text: "Équilibrée, mais on peut simplifier : cherche les plus petits coefficients." });
      return;
    }

    let gain = 20;
    if (mission && mission.product === reaction.products[0]) {
      gain += 30;
      setMissionIndex(i => i + 1);
    }
    setXp(x => x + gain);
    setFeedback({ ok: true, text: `Bravo ! Équation équilibrée. +${gain} XP` });
  }

  const showNotebook = reaction && !reacting;

  return (
      <main className="app">
        <header className="labsign">
          <div>
            <h1>⚗ SCHMS</h1>
            <small>Laboratoire de chimie</small>
          </div>
          <div className="xp">⭐ {xp} XP · Niv. {level}</div>
        </header>

        <div className={`stage ${showNotebook ? "with-notebook" : ""}`}>
          <div className="room">
            <div className="chalkboard">
              <span className="chalk-title">Mission {missionIndex + 1}</span>
              {mission ? mission.title : "Bravo, toutes les missions sont terminées !"}
            </div>

            <div className="shelf">
              <div className="bottles">
                {Object.entries(reagents).map(([symbol, r]) => (
                    <button
                        key={symbol}
                        className="bottle"
                        style={{ ["--c" as string]: colorOf(symbol) }}
                        onClick={() => pour(symbol)}
                        title={r.name}
                    >
                      <span className="cork" />
                      <span className="neck" />
                      <span className="glass">
                    <span className="label"><Formula value={symbol} /></span>
                  </span>
                      <small>{r.name}</small>
                    </button>
                ))}
              </div>
              <div className="plank" />
            </div>

            <Bench tubes={tubes} selected={selected} reacting={reacting} onSelect={setSelected} />

            <div className="row">
              <button className="btn" onClick={mix} disabled={reacting}>Mélanger</button>
              <button className="btn alt" onClick={clearTubes} disabled={reacting}>Vider</button>
            </div>
            <p className="msg">{message}</p>
          </div>

          {showNotebook && (
              <aside className="side">
                <BalancePanel
                    reaction={reaction}
                    coefs={coefs}
                    feedback={feedback}
                    onChange={changeCoef}
                    onCheck={check}
                />
              </aside>
          )}
        </div>
      </main>
  );
}