import { useState } from "react";
import Die from "./Die.jsx";

export default function Game() {
    const keys = Array.from({ length: 10 }, (_, i) => i + 1);
    const dice = keys.map((keyValue) => (
        <Die key={keyValue} value={keyValue} />
    const getRandomRoll = () => Math.ceil(Math.random() * 6);

    const [dieValues, setDieValues] = useState(
        Array.from({ length: 10 }, (_, i) => ({
            key: i,
            val: getRandomRoll(),
            fixedVal: false,
        }))
    );

    ));
    return (
        <div className='game'>
            <h1>Tenzies</h1>
            <section>
                Roll until all dice are the same. Click each die to freeze it at
                its current value between rolls.
            </section>
            <div>{dice}</div>
            <button>Roll</button>
        </div>
    );
}
