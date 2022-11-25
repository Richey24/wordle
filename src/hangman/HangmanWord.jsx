
export function HangmanWord({
    guessedLetters,
    wordToGuess,
    reveal = false,
}) {
    return (
        <div
            style={{
                display: "flex",
                gap: ".25em",
                fontSize: "6rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                fontFamily: "monospace",
            }}
        >
            {wordToGuess.split("").map((letter, index) => (
                <span style={{ borderBottom: ".1em solid white" }} key={index}>
                    <span
                        style={{
                            visibility:
                                guessedLetters.includes(letter) || reveal
                                    ? "visible"
                                    : "hidden",
                            color:
                                !guessedLetters.includes(letter) && reveal ? "red" : "white",
                        }}
                    >
                        {letter}
                    </span>
                </span>
            ))}
        </div>
    )
}
