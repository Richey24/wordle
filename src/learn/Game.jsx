import { useEffect, useState } from "react"
import "./Game.css"

let timer;
const Game = () => {
    const [click, setClick] = useState(false)

    const startTimer = () => {
        const theTimer = document.getElementById("quizTimer")
        timer = setInterval(() => {
            if (Number(theTimer.innerHTML) < 1) {
                clearInterval(timer)
                setClick(true)
                document.getElementById("learnMore").style.visibility = "visible"
                return
            }
            theTimer.innerHTML = Number(theTimer.innerHTML) - 1
        }, 1000)
    }

    useEffect(() => {
        startTimer()
    }, [])

    const checkAnswer = (e, value) => {
        if (click) {
            return
        }
        const target = e.target
        console.log(target);
        console.log(value);
        if (value) {
            target.style.backgroundColor = "green"
        } else {
            target.style.backgroundColor = "red"
        }
        clearInterval(timer)
        setClick(true)
        document.getElementById("learnMore").style.visibility = "visible"
    }
    return (
        <div className="mainGame">
            <div>
                <span id="quizTimer">60</span>
                <h1>Question 1</h1>
                <p>Who was the first son of Jacob?</p>
                <div className="theAnswer">
                    <p>A. <span onClick={(e) => checkAnswer(e, false)}>Joseph</span></p>
                    <p>B. <span onClick={(e) => checkAnswer(e, true)}>Reuben</span></p>
                    <p>C. <span onClick={(e) => checkAnswer(e, false)}>Dan</span></p>
                    <p>D. <span onClick={(e) => checkAnswer(e, false)}>Asher</span></p>
                </div>
                <div className="learnButton">
                    <button id="learnMore" className="learnMore">Learn more</button>
                    <button className="nextQuest">Next question</button>
                </div>
            </div>
        </div>
    )
}

export default Game