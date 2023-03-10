export default function Die({ value, handleClick }) {
    return (
        <div
            className={`die ${value.isFrozen && "frozen"}`}
            onClick={handleClick}
        >
            {value.val}
        </div>
    );
}
