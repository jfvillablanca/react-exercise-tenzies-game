import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Die from "./Die.jsx";

export default function Game() {
    const getRandomRoll = () => Math.ceil(Math.random() * 6);

    const getNewDiceSet = () => {
        return Array.from({ length: 10 }, () => ({
            id: nanoid(),
            val: getRandomRoll(),
            isFrozen: false,
        }));
    };

    const [dieValues, setDieValues] = useState(getNewDiceSet());
    const [lowestRollCount, setLowestRollCount] = useState(Infinity);
    const [rolls, setRolls] = useState(0);

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
        setRolls((prevRolls) => prevRolls + 1);
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
        setRolls(0);
        setDieValues(getNewDiceSet());
    };

    useEffect(() => {
        if (checkDieFaceEquality()) {
            setLowestRollCount((prevLowestRoll) =>
                prevLowestRoll > rolls ? rolls : prevLowestRoll
            );
        }
    }, [dieValues]);

    return (
        <div className='game'>
            {checkDieFaceEquality() && <Confetti />}
            <h1>Tenzies</h1>
            <section>
                Roll until all dice are the same. Click each die to freeze it at
                its current value between rolls.
                {lowestRollCount !== Infinity && (
                    <h3>High Score: {lowestRollCount} turns</h3>
                )}
            </section>
            <div>{dice}</div>
            <button
                onClick={checkDieFaceEquality() ? resetGame : rollTheDice}
                className={checkDieFaceEquality() ? "reset" : ""}
            >
                {checkDieFaceEquality()
                    ? `Score: ${rolls} | Reset?`
                    : rolls > 0
                    ? `Rolls: ${rolls}`
                    : `Roll`}
            </button>
        </div>
    );
}
