import { useEffect, useState } from "react"
import "./Game.css"
import cancel from "../img/cancel.svg"
import { useLocation, useNavigate } from "react-router-dom";
import benjamin from "../img/benjamin.png"
import dan from "../img/dan.png"
import ephraim from "../img/ephraim.png"
import gad from "../img/gad.png"
import issachar from "../img/issachar.png"
import joseph from "../img/joseph.png"
import judah from "../img/judah.png"
import levi from "../img/levi.png"
import manasseh from "../img/manasseh.png"
import naftali from "../img/naftali.png"
import reuben from "../img/reuben.png"
import simeon from "../img/simeon.png"
import zebulun from "../img/zebulun.png"
import asher from "../img/asher.png"

let timer;
const images = {
    benjamin: benjamin,
    dan: dan,
    ephraim: ephraim,
    gad: gad,
    issachar: issachar,
    joseph: joseph,
    judah: judah,
    levi: levi,
    manasseh: manasseh,
    naftali: naftali,
    reuben: reuben,
    simeon: simeon,
    zebulun: zebulun,
    asher: asher
}
const Game = () => {
    const [click, setClick] = useState(false)
    const { state } = useLocation()
    const navigate = useNavigate()
    const names = state?.names
    const tribe = state?.tribe
    console.log(names);
    console.log(tribe);

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
        if (!names) {
            navigate("/bible/select")
            return
        }
        startTimer()
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const showModal = () => {
        document.getElementById("learnModal").classList.toggle("showLearn")
    }

    return (
        <div>
            <div className="mainGame">
                <div>
                    <span id="quizTimer">60</span>
                    <h1>Question 1</h1>
                    <p>Who was the first son of Jacob?</p>
                    <img src={images[tribe[0]]} alt="" />
                    <div className="theAnswer">
                        <p>A. <p onClick={(e) => checkAnswer(e, false)}>Joseph</p></p>
                        <p>B. <p onClick={(e) => checkAnswer(e, true)}>Reuben</p></p>
                        <p>C. <p onClick={(e) => checkAnswer(e, false)}>Dan</p></p>
                        <p>D. <p onClick={(e) => checkAnswer(e, false)}>Asher</p></p>
                    </div>
                    <div className="learnButton">
                        <button onClick={() => showModal()} id="learnMore" className="learnMore">Learn more</button>
                        <button className="nextQuest">Next question</button>
                    </div>
                </div>
            </div>
            <div id="learnModal" className="learnModal">
                <img onClick={showModal} src={cancel} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus nisi rem omnis aliquam, culpa sapiente magni error officiis architecto quos atque, deserunt ullam laborum maxime, nam expedita. Quae, sequi accusamus? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus dolore quasi dignissimos fugiat praesentium, atque vitae deserunt maiores. Tenetur illum quod, aliquam enim quisquam explicabo quo perferendis ad sit id! Lorem ipsum dolor sit amet consectetur adipisicing elit. A blanditiis deleniti, esse architecto tempore nobis, ipsum nemo, cupiditate consequuntur voluptatem eveniet maxime libero quaerat error aperiam fuga sequi rem laudantium? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse saepe a tempore, facere aperiam impedit. Laboriosam fuga ullam totam, delectus iure, sequi quo repellat ex quas consectetur nihil perspiciatis sapiente.</p>
            </div>
        </div>

    )
}

export default Game