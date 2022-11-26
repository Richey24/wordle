import { useEffect, useState } from "react"
import "./Wordle.css"
import fiveLetters from "../utils/five"
import sixLetters from "../utils/six"
import sevenLetters from "../utils/seven.js"
import eightLetters from "../utils/eight.js"
import nineLetters from "../utils/nine.js"
import tenLetters from "../utils/ten.js"
import elevenLetters from "../utils/eleven.js"
import twelveLetters from "../utils/twelve.js"
import thirteenLetters from "../utils/thirteen.js"
import fourteenLetters from "../utils/fourteen.js"
import fifteenLetters from "../utils/fifteen.js"
import fiveDict from "../utils/fiveDict.js"
import sixDict from "../utils/sixdict.js"
import sevenDict from "../utils/sevendict.js"
import eightDict from "../utils/eightdict.js"
import nineDict from "../utils/nineDict.js"
import tenDict from "../utils/tenDict.js"
import elevenDict from "../utils/elevenDict.js"
import twelveDict from "../utils/twelveDict.js"
import thirteenDict from "../utils/thirteenDict.js"
import fourDict from "../utils/fourDict.js"
import fifteenDict from "../utils/fifteenDict"
import Result from "./Result"

let timer = null

const Wordle = () => {

    const [trials, setTry] = useState([])
    const [time, setTime] = useState(0)
    const [num, setNum] = useState(5)
    const [firstLet, setFirstLet] = useState("")
    const [hint, setHint] = useState("")
    const [count, setCount] = useState(0)
    const [word, setWord] = useState([])

    const startInt = () => {
        timer = setInterval(() => {
            document.getElementById("sec").innerHTML = Number(document.getElementById("sec").innerHTML) + 1
        }, 1000)
    }

    const startGame = () => {
        document.getElementById("startGame").style.display = "none"
        document.getElementById("bigDiv").style.display = "none"
        setTimeout(() => {
            startInt()
        }, 1000)
    }

    useEffect(() => {

        if (num > 15) {
            setNum(5)
        }

        let dictionary = [...fiveDict, ...fiveLetters].map((letter) => letter.toLowerCase().trim())
        const FLIP_ANIMATION_DURATION = 500
        const DANCE_ANIMATION_DURATION = 500
        const keyboard = document.querySelector("[data-keyboard]")
        const alertContainer = document.querySelector("[data-alert-container]")
        const guessGrid = document.querySelector("[data-guess-grid]")

        // startInt()

        const reset = () => {
            document.getElementById("sec").innerHTML = 0
            clearInterval(timer)
            document.getElementById("startGame").style.display = "block"
            document.getElementById("bigDiv").style.display = "block"
            const keys = [...document.getElementsByClassName("key")]
            if (keys.length >= 1) {
                for (let i = 0; i < keys.length; i++) {
                    const element = keys[i];
                    element.classList.remove("correct")
                    element.classList.remove("wrong")
                    element.classList.remove("wrong-location")
                }
            }
        }

        // const noOfWord = document.getElementById("noOfWord")
        let WORD_LENGTH = Number(num)
        let targetWord = fiveLetters[Math.floor(Math.random() * fiveLetters.length)];
        const myGuessGrid = document.getElementById("guessGrid")
        const value = num
        myGuessGrid.style.gridTemplateColumns = `repeat(${value}, 2.7em)`
        myGuessGrid.style.gridTemplateRows = `repeat(${Number(value) + 1}, 2.7em)`
        guessGrid.innerHTML = ""
        for (let index = 0; index < value * Number(value) + Number(value); index++) {
            myGuessGrid.innerHTML += `<div class="tile"></div>`
        }
        WORD_LENGTH = Number(num)
        switch (WORD_LENGTH) {
            case 5:
                targetWord = fiveLetters[Math.floor(Math.random() * fiveLetters.length)].toLowerCase().trim()
                setWord(fiveLetters)
                dictionary = [...fiveDict, ...fiveLetters].map((letter) => letter.toLowerCase().trim())
                reset()
                startInteraction()
                break;
            case 6:
                targetWord = sixLetters[Math.floor(Math.random() * sixLetters.length)].toLowerCase().trim()
                setWord(sixLetters)
                dictionary = [...sixDict, ...sixLetters].map((letter) => letter.toLowerCase().trim())
                reset()
                startInteraction()
                break;
            case 7:
                targetWord = sevenLetters[Math.floor(Math.random() * sevenLetters.length)].toLowerCase().trim()
                setWord(sevenLetters)
                dictionary = [...sevenDict, ...sevenLetters].map((letter) => letter.toLowerCase().trim())
                reset()
                startInteraction()
                break;
            case 8:
                targetWord = eightLetters[Math.floor(Math.random() * eightLetters.length)].toLowerCase().trim()
                setWord(eightLetters)
                dictionary = [...eightDict, ...eightLetters].map((letter) => letter.toLowerCase().trim())
                reset()
                startInteraction()
                break;
            case 9:
                targetWord = nineLetters[Math.floor(Math.random() * nineLetters.length)].toLowerCase().trim()
                setWord(nineLetters)
                dictionary = [...nineDict, ...nineLetters].map((letter) => letter.toLowerCase().trim())
                reset()
                startInteraction()
                break;
            case 10:
                targetWord = tenLetters[Math.floor(Math.random() * tenLetters.length)].toLowerCase().trim()
                setWord(tenLetters)
                dictionary = [...tenDict, ...tenLetters].map((letter) => letter.toLowerCase().trim())
                reset()
                startInteraction()
                break;
            case 11:
                targetWord = elevenLetters[Math.floor(Math.random() * elevenLetters.length)].toLowerCase().trim()
                setWord(elevenLetters)
                dictionary = [...elevenDict, ...elevenLetters].map((letter) => letter.toLowerCase().trim())
                reset()
                startInteraction()
                break;
            case 12:
                targetWord = twelveLetters[Math.floor(Math.random() * twelveLetters.length)].toLowerCase().trim()
                setWord(twelveLetters)
                dictionary = [...twelveDict, ...twelveLetters].map((letter) => letter.toLowerCase().trim())
                reset()
                startInteraction()
                break;
            case 13:
                targetWord = thirteenLetters[Math.floor(Math.random() * thirteenLetters.length)].toLowerCase().trim()
                setWord(thirteenLetters)
                dictionary = [...thirteenDict, ...thirteenLetters].map((letter) => letter.toLowerCase().trim())
                reset()
                startInteraction()
                break;
            case 14:
                targetWord = fourteenLetters[Math.floor(Math.random() * fourteenLetters.length)].toLowerCase().trim()
                setWord(fourteenLetters)
                dictionary = [...fourDict, ...fourteenLetters].map((letter) => letter.toLowerCase().trim())
                reset()
                startInteraction()
                break;
            case 15:
                targetWord = fifteenLetters[Math.floor(Math.random() * fifteenLetters.length)]?.toLowerCase().trim()
                setWord(fifteenLetters)
                dictionary = [...fifteenDict, ...fifteenLetters].map((letter) => letter.toLowerCase().trim())
                reset()
                startInteraction()
                break;

            default:
                targetWord = [...fiveDict, ...fiveLetters].map((letter) => letter.toLowerCase().trim())
                break;
        }
        console.log(targetWord);
        setFirstLet(targetWord[0])
        setCount(0)

        function startInteraction() {
            document.addEventListener("click", handleMouseClick)
            document.addEventListener("keydown", handleKeyPress)
        }

        startInteraction()

        function stopInteraction() {
            document.removeEventListener("click", handleMouseClick)
            document.removeEventListener("keydown", handleKeyPress)
        }

        function handleMouseClick(e) {
            if (e.target.matches("[data-key]")) {
                pressKey(e.target.dataset.key)
                return
            }

            if (e.target.matches("[data-enter]")) {
                submitGuess()
                return
            }

            if (e.target.matches("[data-delete]")) {
                deleteKey()
                return
            }
        }

        function handleKeyPress(e) {
            if (e.key === "Enter") {
                submitGuess()
                return
            }

            if (e.key === "Backspace" || e.key === "Delete") {
                deleteKey()
                return
            }

            if (e.key.match(/^[a-z]$/)) {
                pressKey(e.key)
                return
            }
        }

        function pressKey(key) {
            const activeTiles = getActiveTiles()
            if (activeTiles.length >= WORD_LENGTH) return
            const nextTile = guessGrid.querySelector(":not([data-letter])")
            nextTile.dataset.letter = key.toLowerCase()
            nextTile.textContent = key
            nextTile.dataset.state = "active"
        }

        function deleteKey() {
            const activeTiles = getActiveTiles()
            const lastTile = activeTiles[activeTiles.length - 1]
            if (lastTile == null) return
            lastTile.textContent = ""
            delete lastTile.dataset.state
            delete lastTile.dataset.letter
        }

        function submitGuess() {
            const activeTiles = [...getActiveTiles()]
            if (activeTiles.length !== WORD_LENGTH) {
                showAlert("Not enough letters")
                shakeTiles(activeTiles)
                return
            }

            const guess = activeTiles.reduce((word, tile) => {
                return word + tile.dataset.letter
            }, "")

            if (!dictionary.includes(guess)) {
                showAlert("Not in word list")
                shakeTiles(activeTiles)
                return
            }

            stopInteraction()
            setCount(count + 1)
            activeTiles.forEach((...params) => flipTile(...params, guess))
        }

        function flipTile(tile, index, array, guess) {
            const letter = tile.dataset.letter
            const key = keyboard.querySelector(`[data-key="${letter}"i]`)
            setTimeout(() => {
                tile.classList.add("flip")
            }, (index * FLIP_ANIMATION_DURATION) / 2)

            tile.addEventListener(
                "transitionend",
                () => {
                    tile.classList.remove("flip")
                    if (targetWord[index] === letter) {
                        tile.dataset.state = "correct"
                        key.classList.add("correct")
                    } else if (targetWord.includes(letter)) {
                        tile.dataset.state = "wrong-location"
                        key.classList.add("wrong-location")
                    } else {
                        tile.dataset.state = "wrong"
                        key.classList.add("wrong")
                    }

                    if (index === array.length - 1) {
                        tile.addEventListener(
                            "transitionend",
                            () => {
                                startInteraction()
                                checkWinLose(guess, array)
                            },
                            { once: true }
                        )
                    }
                },
                { once: true }
            )
        }

        function getActiveTiles() {
            return guessGrid.querySelectorAll('[data-state="active"]')
        }

        function showAlert(message, duration = 1000) {
            const alert = document.createElement("div")
            alert.textContent = message
            alert.classList.add("alert")
            alertContainer.prepend(alert)
            if (duration == null) return

            setTimeout(() => {
                alert.classList.add("hide")
                alert.addEventListener("transitionend", () => {
                    alert.remove()
                })
            }, duration)
        }

        function shakeTiles(tiles) {
            tiles.forEach(tile => {
                tile.classList.add("shake")
                tile.addEventListener(
                    "animationend",
                    () => {
                        tile.classList.remove("shake")
                    },
                    { once: true }
                )
            })
        }

        function checkWinLose(guess, tiles) {
            const remainingTiles = guessGrid.querySelectorAll(":not([data-letter])")
            if (guess === targetWord) {
                clearInterval(timer)
                setTime(document.getElementById("sec").innerHTML)
                setTry([remainingTiles.length, WORD_LENGTH])
                document.getElementById("resultDiv").style.display = "block"
                danceTiles(tiles)
                stopInteraction()
                return
            }

            if (remainingTiles.length === 0) {
                showAlert(targetWord.toUpperCase(), null)
                stopInteraction()
            }
        }

        function danceTiles(tiles) {
            tiles.forEach((tile, index) => {
                setTimeout(() => {
                    tile.classList.add("dance")
                    tile.addEventListener(
                        "animationend",
                        () => {
                            tile.classList.remove("dance")
                        },
                        { once: true }
                    )
                }, (index * DANCE_ANIMATION_DURATION) / 5)
            })
        }



    }, [num])

    const showHint = () => {
        if (count < 1) {
            const filterWord = word.filter((theWord) => theWord.startsWith(firstLet))
            setHint(`Don't know where to start? try ${filterWord[Math.floor(Math.random() * filterWord.length)]}`)
        } else {
            setHint(`Still can't get the word? try ${word[Math.floor(Math.random() * word.length)]}`)
        }
        document.getElementById("hint").style.display = "block"
    }

    return (
        <div className="wordleMain">
            <p onClick={showHint} className="hint">Hint</p>
            <div className="myTimer">
                <p id="sec">0</p>
                <p>s</p>
            </div>
            <p id="hint" className="theHint">{hint}</p>
            {/* <label class="wordLabel" htmlFor="noOfWord">Select Difficulty</label>
            <select name="noOfWord" id="noOfWord" class="noOfWord">
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
            </select> */}
            <div class="alert-container" data-alert-container></div>
            <div class="boxWrapper">
                <div id="guessGrid" data-guess-grid class="guess-grid">
                    <div class="tile"></div>
                    <div class="tile"></div>
                    <div class="tile"></div>
                    <div class="tile"></div>
                    <div class="tile"></div>
                    <div class="tile"></div>
                    <div class="tile"></div>
                    <div class="tile"></div>
                    <div class="tile"></div>
                    <div class="tile"></div>
                    <div class="tile"></div>
                    <div class="tile"></div>
                    <div class="tile"></div>
                    <div class="tile"></div>
                    <div class="tile"></div>
                    <div class="tile"></div>
                    <div class="tile"></div>
                    <div class="tile"></div>
                    <div class="tile"></div>
                    <div class="tile"></div>
                    <div class="tile"></div>
                    <div class="tile"></div>
                    <div class="tile"></div>
                    <div class="tile"></div>
                    <div class="tile"></div>
                    <div class="tile"></div>
                    <div class="tile"></div>
                    <div class="tile"></div>
                    <div class="tile"></div>
                    <div class="tile"></div>
                </div>
                <div data-keyboard class="keyboard">
                    <button class="key" data-key="Q">Q</button>
                    <button class="key" data-key="W">W</button>
                    <button class="key" data-key="E">E</button>
                    <button class="key" data-key="R">R</button>
                    <button class="key" data-key="T">T</button>
                    <button class="key" data-key="Y">Y</button>
                    <button class="key" data-key="U">U</button>
                    <button class="key" data-key="I">I</button>
                    <button class="key" data-key="O">O</button>
                    <button class="key" data-key="P">P</button>
                    <div class="space"></div>
                    <button class="key" data-key="A">A</button>
                    <button class="key" data-key="S">S</button>
                    <button class="key" data-key="D">D</button>
                    <button class="key" data-key="F">F</button>
                    <button class="key" data-key="G">G</button>
                    <button class="key" data-key="H">H</button>
                    <button class="key" data-key="J">J</button>
                    <button class="key" data-key="K">K</button>
                    <button class="key" data-key="L">L</button>
                    <div class="space"></div>
                    <button data-enter class="key large">Enter</button>
                    <button class="key" data-key="Z">Z</button>
                    <button class="key" data-key="X">X</button>
                    <button class="key" data-key="C">C</button>
                    <button class="key" data-key="V">V</button>
                    <button class="key" data-key="B">B</button>
                    <button class="key" data-key="N">N</button>
                    <button class="key" data-key="M">M</button>
                    <button data-delete class="key large">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                            <path fill="var(--color-tone-1)"
                                d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>
            <div id="bigDiv" className="bigDiv">
            </div>
            <button onClick={startGame} id="startGame" className="startBtn">Press to start</button>
            <Result num={num} setNum={setNum} time={time} noOfTry={trials} />
        </div>
    )
}

export default Wordle