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
import axios from "axios";
import url from "../url"
import { Spinner } from "react-bootstrap";

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
    const id = localStorage.getItem("id")
    const token = localStorage.getItem("token")
    const [question, setQuestion] = useState([])
    const [num, setNum] = useState(0)
    const [spin, setSpin] = useState(true)
    const { state } = useLocation()
    const navigate = useNavigate()
    const names = state?.names
    const tribe = state?.tribe
    const [playerNum, setPlayerNum] = useState(0)
    const [score, setScore] = useState([])

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

    const getQuestions = async () => {
        const res = await axios.get(`${url}/quiz/get/all`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            validateStatus: () => true
        })
        const rep = await res.data
        if (res.status !== 200) {
            navigate("/bible/select")
            return
        }
        const arr = []
        const selected = []
        let ansArr = []
        let ansSel = []
        let noOfQuest;
        switch (names.length) {
            case 1:
                noOfQuest = 5
                break;
            case 2:
                noOfQuest = 10
                break;
            case 3:
                noOfQuest = 15
                break;
            case 4:
                noOfQuest = 20
                break;
            default:
                break;
        }
        while (arr.length < noOfQuest) {
            const num = Math.floor(Math.random() * rep.length)
            if (!selected.includes(num)) {
                selected.push(num)
                while (ansArr.length < 4) {
                    const ansNum = Math.floor(Math.random() * 4)
                    if (!ansSel.includes(ansNum)) {
                        ansSel.push(ansNum)
                        ansArr.push(rep[num].answer[ansNum])
                    }
                }
                rep[num].answer = ansArr
                arr.push(rep[num])
                ansArr = []
                ansSel = []
            }
        }
        setQuestion(arr)
        setSpin(false)
        setTimeout(() => {
            startTimer()
        }, 1000)
    }

    useEffect(() => {
        if (!names || !id) {
            navigate("/bible/select")
            return
        }
        const arr = []
        for (let i = 0; i < names.length; i++) {
            arr.push(0)
        }
        setScore(arr)
        getQuestions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const checkAnswer = (e, value) => {
        if (click) {
            return
        }
        const target = e.target
        if (value) {
            target.classList.toggle("correct")
            const arr = [...score]
            arr[playerNum] = arr[playerNum] + 1
            setScore(arr)
        } else {
            target.classList.toggle("wrong")
        }
        clearInterval(timer)
        setClick(true)
        document.getElementById("learnMore").style.visibility = "visible"
    }

    const showModal = (id) => {
        console.log(document.getElementById(id));
        document.getElementById(id).classList.toggle("showLearn")
    }

    const nextQuest = async () => {
        if (num >= question.length - 1) {
            for (let i = 0; i < names.length; i++) {
                const body = {
                    playerName: names[i],
                    tribe: tribe[i],
                    score: score[i]
                }
                await axios.post(`${url}/score/create`, body, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    validateStatus: () => true
                })
            }
            showModal("quizScoreModal")
            return
        }
        setNum(num + 1)
        if (playerNum >= names.length - 1) {
            setPlayerNum(0)
        } else {
            setPlayerNum(playerNum + 1)
        }
        const answers = document.getElementsByClassName("answer")
        Array.from(answers).forEach((ans) => {
            ans.classList.remove("correct", "wrong")
        })
        const theTimer = document.getElementById("quizTimer")
        theTimer.innerHTML = "60"
        document.getElementById("learnMore").style.visibility = "hidden"
        startTimer()
        setClick(false)
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
        <div>
            <div className="mainGame">
                <div>
                    <p>Timer:  <span id="quizTimer">60</span></p>
                    <h1>Question {num + 1}</h1>
                    <p>{names[playerNum]} - {question[num]?.question}?</p>
                    <img src={images[tribe[playerNum]]} alt="" />
                    <div className="theAnswer">
                        {
                            question[num]?.answer?.map((ans, i) => (
                                <p key={i}>{i + 1}. <p className="answer" onClick={(e) => checkAnswer(e, ans?.correct)}>{ans?.value}</p></p>
                            ))
                        }
                    </div>
                    <div className="learnButton">
                        <button onClick={() => showModal("learnModal")} id="learnMore" className="learnMore">Learn more</button>
                        <button onClick={nextQuest} className="nextQuest">Next question</button>
                    </div>
                </div>
            </div>
            <div id="learnModal" className="learnModal">
                <img onClick={() => showModal("learnModal")} src={cancel} alt="" />
                <p>{question[num]?.learnMore}</p>
            </div>
            <div className="quizScoreModal" id="quizScoreModal">
                <img onClick={() => showModal("quizScoreModal")} src={cancel} alt="" />
                <div>
                    {
                        score.map((sc, i) => (
                            <p key={i}>{names[i]} scored {sc}</p>
                        ))
                    }
                    <button onClick={() => navigate("/quiz/leader")}>Leaderboard</button>
                </div>
                <div>
                    <p>Subscribe to play multiple times a day and premium access to all other games and features</p>
                    <button>Subscribe</button>
                </div>
            </div>
        </div>

    )
}

export default Game