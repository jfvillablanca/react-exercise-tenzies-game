import { useState } from "react";
import Die from "./Die.jsx";

export default function Game() {
    const getRandomRoll = () => Math.ceil(Math.random() * 6);

    const [dieValues, setDieValues] = useState(
        Array.from({ length: 10 }, (_, i) => ({
            key: i,
            val: getRandomRoll(),
            fixedVal: false,
        }))
    );

    const freezeDieRoll = (key) => {
        console.log(key);
        setDieValues((prevDieValues) => {
            return prevDieValues.map((prevDieValue) =>
                prevDieValue.key === key
                    ? { ...prevDieValue, fixedVal: !prevDieValue.fixedVal }
                    : prevDieValue
            );
        });
    };

    const dice = dieValues.map((value) => (
        <Die key={value.key} value={value} handleClick={freezeDieRoll} />
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
