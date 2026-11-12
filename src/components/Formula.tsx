export default function Formula({ value }: { value: string }) {
    const parts = value.split(/(\d+)/);
    return (
        <>
            {parts.map((part, i) =>
                i % 2 === 1 ? <sub key={i}>{part}</sub> : <span key={i}>{part}</span>
            )}
        </>
    );
}