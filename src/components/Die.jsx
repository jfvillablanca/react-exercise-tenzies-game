export default function Die({ value, handleClick }) {
    return (
        <div
            className={`die ${value.fixedVal && "frozen"}`}
            onClick={() => handleClick(value.key)}
        >
            {value.val}
        </div>
    );
}
