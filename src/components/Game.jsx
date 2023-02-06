import { useState } from "react";
import { nanoid } from "nanoid";
import Die from "./Die.jsx";

export default function Game() {
    const getRandomRoll = () => Math.ceil(Math.random() * 6);

    const [dieValues, setDieValues] = useState(
        Array.from({ length: 10 }, () => ({
            key: nanoid(),
            val: getRandomRoll(),
            isFrozen: false,
        }))
    );

    const freezeDieRoll = (key) => {
        console.log(key);
        setDieValues((prevDieValues) => {
            return prevDieValues.map((prevDieValue) =>
                prevDieValue.key === key
                    ? { ...prevDieValue, isFrozen: !prevDieValue.isFrozen }
                    : prevDieValue
            );
        });
    };

    const dice = dieValues.map((value) => (
        <Die key={value.key} value={value} handleClick={freezeDieRoll} />
    ));

    const rollTheDice = () => {
        setDieValues((prevDieValues) => {
            return prevDieValues.map((prevDieValue) =>
                prevDieValue.isFrozen
                    ? { ...prevDieValue, val: prevDieValue.val }
                    : { ...prevDieValue, val: getRandomRoll() }
            );
        });
    };

    return (
        <div className='game'>
            <h1>Tenzies</h1>
            <section>
                Roll until all dice are the same. Click each die to freeze it at
                its current value between rolls.
            </section>
            <div>{dice}</div>
            <button onClick={rollTheDice}>Roll</button>
        </div>
    );
}
