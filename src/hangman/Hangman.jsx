import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import url from "../url"
import { HangmanDrawing } from "./HangmanDrawing"
import { HangmanWord } from "./HangmanWord"
import { Keyboard } from "./Keyboard"
import words from "./wordList.json"
import "./Hangman.css"
import Result from "./Result"
import { useNavigate } from "react-router-dom"
import { Spinner } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuestion, faUserGraduate, faPlus } from '@fortawesome/fontawesome-free-solid'
import THeHeader from "../components/TheHeader"
import cancel from "../img/cancel.svg"
import hang from "../img/hangman.gif"

let timer = null

function getWord() {
    return words[Math.floor(Math.random() * words.length)]
}

function Hangman() {
    const [wordToGuess, setWordToGuess] = useState(getWord)
    const [guessedLetters, setGuessedLetters] = useState([])
    const [user, setUser] = useState({})
    const [spin, setSpin] = useState(true)
    const id = localStorage.getItem("id")
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    console.log(wordToGuess);

    const startInt = () => {
        timer = setInterval(() => {
            document.getElementById("hangSec").innerHTML = Number(document.getElementById("hangSec").innerHTML) + 1
        }, 1000)
    }

    const startGame = () => {
        document.getElementById("hangStart").style.display = "none"
        document.getElementById("hangBigDiv").style.display = "none"
        setTimeout(() => {
            startInt()
        }, 1000)
    }

    useEffect(() => {
        if (id) {
            (async () => {
                try {
                    const res = await axios.get(`${url}/user/get/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        validateStatus: () => true
                    })
                    const rep = await res.data
                    if (res.status !== 200) {
                        setSpin(false)
                        navigate("/login")
                        return
                    }
                    if (rep.playedHang && !rep.paid) {
                        navigate("/")
                        return
                    }
                    if (rep.playedHang && Date.now() > new Date(user.expiryDate).getTime()) {
                        navigate("/")
                        return
                    }

                    setUser(rep)
                    setSpin(false)
                } catch (error) {
                    setSpin(false)
                }
            })()
        } else {
            setSpin(false)
            navigate("/login")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const incorrectLetters = guessedLetters.filter(
        letter => !wordToGuess.includes(letter)
    )

    const isLoser = incorrectLetters.length >= 6
    const isWinner = wordToGuess
        .split("")
        .every(letter => guessedLetters.includes(letter))

    if (isWinner) {
        clearInterval(timer)
        new Audio(require("../sound/battle_horn.mp3")).play()
    }

    (async () => {
        if (isLoser) {
            clearInterval(timer)
            await axios.put(`${url}/user/update/${id}`, { playedHang: true }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }
    })()

    const addGuessedLetter = useCallback(
        (letter) => {
            new Audio(require("../sound/keyPress.mp3")).play()
            if (guessedLetters.includes(letter) || isLoser || isWinner) return
            setGuessedLetters(currentLetters => [...currentLetters, letter])
        },
        [guessedLetters, isWinner, isLoser]
    )

    useEffect(() => {
        const handler = (e) => {
            const key = e.key
            if (!key.match(/^[a-z]$/)) return

            e.preventDefault()
            addGuessedLetter(key)
        }

        document.addEventListener("keypress", handler)

        return () => {
            document.removeEventListener("keypress", handler)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [guessedLetters])

    useEffect(() => {
        const handler = (e) => {
            const key = e.key
            if (key !== "Enter") return

            e.preventDefault()
            setGuessedLetters([])
            setWordToGuess(getWord())
        }

        document.addEventListener("keypress", handler)

        return () => {
            document.removeEventListener("keypress", handler)
        }
    }, [])

    const showHowToPlay = () => {
        document.getElementById("howToPlayHang").classList.toggle("showHowToPlay")
    }

    if (spin) {
        return (
            <div style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Spinner animation="border" color="#3d1152" />
            </div>
        )
    }


    return (
        <div style={{
            backgroundColor: user.tribe ? user.tribe[1] : "#3d1152",
            minHeight: "100vh"
        }}>
            <THeHeader />
            <div
                style={{
                    maxWidth: "800px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "2rem",
                    margin: "0 auto",
                    alignItems: "center",
                    paddingBottom: "20px",
                }}
            >
                <div style={{ fontSize: "2rem", textAlign: "center", color: "white" }}>
                    {isWinner && <Result time={document.getElementById("hangSec").innerHTML} trial={incorrectLetters} user={user} />}
                    {isLoser && "Nice Try - Refresh to try again"}
                </div>
                <div className="secDiv">
                    <p id="hangSec">0</p>
                    <p>s</p>
                </div>
                <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
                <HangmanWord
                    reveal={isLoser}
                    guessedLetters={guessedLetters}
                    wordToGuess={wordToGuess}
                />
                <div style={{ alignSelf: "stretch" }}>
                    <Keyboard
                        disabled={isWinner || isLoser}
                        activeLetters={guessedLetters.filter(letter =>
                            wordToGuess.includes(letter)
                        )}
                        inactiveLetters={incorrectLetters}
                        addGuessedLetter={addGuessedLetter}
                    />
                </div>
            </div>
            <div id="hangBigDiv" className="hangBigDiv"></div>
            <button onClick={startGame} id="hangStart" className="hangBtn">Press to start</button>
            <div className="fab-container">
                <div className="fab shadow">
                    <div className="fab-content">
                        <FontAwesomeIcon icon={faPlus} className="text-white" />
                    </div>
                </div>
                <div className="sub-button shadow" onClick={() => navigate("/hangman/leader")}>
                    <FontAwesomeIcon icon={faUserGraduate} className="text-white" />
                </div>
                <div onClick={showHowToPlay} className="sub-button shadow">
                    <FontAwesomeIcon icon={faQuestion} className="text-white" />
                </div>
            </div>

            <div id="howToPlayHang" className="howToPlayHang">
                <img className="howToPlayHangImg" onClick={showHowToPlay} src={cancel} alt="" />
                <h1>How to play </h1>
                <h4>
                    Hangman is a simple word guessing game. Player try to figure out an unknown word by guessing letters. If too many letters which do not appear in the word are guessed, the player is hanged (and loses).
                </h4>
                <img src={hang} alt="" />
            </div>
        </div>
    )
}

export default Hangman
