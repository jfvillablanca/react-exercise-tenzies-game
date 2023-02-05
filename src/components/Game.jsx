import Die from "./Die.jsx";

export default function Game() {
    const keys = Array.from({ length: 10 }, (_, i) => i + 1);
    const dice = keys.map((keyValue) => (
        <Die key={keyValue} value={keyValue} />
    ));
    return <div className='game'>{dice}</div>;
}
