import { colorOf } from "../data/lab";
import Formula from "./Formula";

interface Props {
    tubes: (string | null)[];
    selected: number;
    reacting: boolean;
    onSelect: (index: number) => void;
}

export default function Bench({ tubes, selected, reacting, onSelect }: Props) {
    return (
        <div className={`bench-scene ${reacting ? "reacting" : ""}`}>
            <span className="deco deco-left">🔬</span>
            <span className="deco deco-right">🥽</span>

            <div className="bench">
                {tubes.map((content, i) => (
                    <div
                        key={i}
                        className={`tubewrap ${selected === i ? "sel" : ""}`}
                        onClick={() => onSelect(i)}
                    >
                        <div className="tube">
                            <div
                                className="liquid"
                                style={{
                                    height: content ? "60%" : "0%",
                                    background: content ? colorOf(content) : "transparent",
                                    boxShadow: content ? `0 0 18px ${colorOf(content)}` : "none",
                                }}
                            />
                            {content &&
                                [0, 1, 2, 3, 4].map(n => (
                                    <span
                                        key={n}
                                        className="bubble"
                                        style={{ left: 10 + n * 9, animationDelay: `${n * 0.25}s` }}
                                    />
                                ))}
                            <span className="glare" />
                        </div>
                        <div className="tube-label">
                            {content ? <Formula value={content} /> : `Tube ${i + 1}`}
                        </div>
                    </div>
                ))}
            </div>

            <div className="tabletop" />

            {reacting && (
                <>
                    <div className="flash" />
                    {[0, 1, 2, 3].map(n => (
                        <span key={n} className="puff" style={{ left: `${38 + n * 8}%`, animationDelay: `${n * 0.2}s` }} />
                    ))}
                </>
            )}
        </div>
    );
}