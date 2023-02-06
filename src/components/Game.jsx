import { useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Die from "./Die.jsx";

export default function Game() {
    const getRandomRoll = () => Math.ceil(Math.random() * 6);

    const [dieValues, setDieValues] = useState(
        Array.from({ length: 10 }, () => ({
            id: nanoid(),
            val: getRandomRoll(),
            isFrozen: false,
        }))
    );

    const freezeDieRoll = (id) => {
        setDieValues((prevDieValues) => {
            return prevDieValues.map((prevDieValue) =>
                prevDieValue.id === id
                    ? { ...prevDieValue, isFrozen: !prevDieValue.isFrozen }
                    : prevDieValue
            );
        });
    };

    const dice = dieValues.map((value) => (
        <Die
            key={value.id}
            value={value}
            handleClick={() => freezeDieRoll(value.id)}
        />
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

    const checkDieFaceEquality = () => {
        return dieValues.every(
            (dieValue) =>
                dieValue.val === dieValues[0].val &&
                dieValue.isFrozen === dieValues[0].isFrozen
        );
    };

    const resetGame = () => {
        setDieValues(
            Array.from({ length: 10 }, () => ({
                id: nanoid(),
                val: getRandomRoll(),
                isFrozen: false,
            }))
        );
    };

    return (
        <div className='game'>
            {checkDieFaceEquality() && <Confetti />}
            <h1>Tenzies</h1>
            <section>
                Roll until all dice are the same. Click each die to freeze it at
                its current value between rolls.
            </section>
            <div>{dice}</div>
            <button onClick={checkDieFaceEquality() ? resetGame : rollTheDice}>
                {checkDieFaceEquality() ? `Reset Game` : `Roll`}
            </button>
        </div>
    );
}
