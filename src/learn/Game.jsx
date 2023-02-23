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
import bible from "../img/Bible-Trivia.png"
import axios from "axios";
import url from "../url"
import { Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faQuestion, faUserGraduate } from "@fortawesome/fontawesome-free-solid";
import THeHeader from "../components/TheHeader";

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
    const [user, setUser] = useState({})

    const startTimer = () => {
        const theTimer = document.getElementById("quizTimer")
        timer = setInterval(async () => {
            if (Number(theTimer.innerHTML) < 1) {
                clearInterval(timer)
                setClick(true)
                document.getElementById("learnMore").style.visibility = "visible"
                return
            }
            theTimer.innerHTML = Number(theTimer.innerHTML) - 1
        }, 1000)
    }

    const getUser = async () => {
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
            if (rep.playedTrivial && !rep.paid) {
                navigate("/")
                return
            }
            if (rep.playedTrivial && Date.now() > new Date(user.expiryDate).getTime()) {
                navigate("/")
                return
            }
            setUser(rep)
            setSpin(false)
        } catch (error) {
            setSpin(false)
            navigate("/login")
        }
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
            navigate("/login")
            return
        }
        const arr = []
        const selected = []
        let ansArr = []
        let ansSel = []
        let noOfQuest;
        switch (names.length) {
            case 1:
                noOfQuest = 10
                break;
            case 2:
                noOfQuest = 20
                break;
            case 3:
                noOfQuest = 30
                break;
            case 4:
                noOfQuest = 40
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
            navigate("/login")
            return
        }
        const arr = []
        for (let i = 0; i < names.length; i++) {
            arr.push(0)
        }
        setScore(arr)
        getUser()
        getQuestions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const checkAnswer = async (e, value) => {
        if (click) {
            return
        }
        const target = e.target
        if (value) {
            await new Audio(require("../sound/interface.mp3")).play()
            await new Promise(resolve => setTimeout(resolve, 1000))
            target.classList.toggle("correct")
            const arr = [...score]
            arr[playerNum] = arr[playerNum] + Number(document.getElementById("quizTimer").innerHTML)
            setScore(arr)
        } else {
            new Audio(require("../sound/ES_Knife.mp3")).play()
            await new Promise(resolve => setTimeout(resolve, 1000))
            target.classList.toggle("wrong")
            document.getElementById("true").style.border = "4px solid green"
        }
        clearInterval(timer)
        setClick(true)
        document.getElementById("learnMore").style.visibility = "visible"
    }

    const showModal = async (id) => {
        if (id === "learnModal") {
            await new Audio(require("../sound/big-paper.mp3")).play()
            await new Promise(resolve => setTimeout(resolve, 500))
        } else {
            await new Audio(require("../sound/battle_horn.mp3")).play()
            await new Promise(resolve => setTimeout(resolve, 500))
        }
        document.getElementById(id).classList.toggle("showLearn")
    }

    const showHowToPlay = () => {
        document.getElementById("howToPlayTrivial").classList.toggle("showHowToPlay")
    }

    const nextQuest = async () => {
        document.getElementById("learnModal").classList.remove("showLearn")
        document.getElementById("true").style.border = "none"
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
            await axios.put(`${url}/user/update/${id}`, { playedTrivial: true }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                validateStatus: () => true
            })
            showModal("quizScoreModal")
            return
        }
        await new Audio(require("../sound/small-page.mp3")).play()
        await new Promise(resolve => setTimeout(resolve, 1000))
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
            <THeHeader />
            <div style={{ backgroundColor: user.tribe ? user.tribe[1] : "" }} className="mainGame">
                <div>
                    <p>Timer:  <span id="quizTimer">60</span></p>
                    <h1>Question {num + 1}</h1>
                    <p>{names[playerNum]} - {question[num]?.question}?</p>
                    <img src={images[tribe[playerNum]]} alt="" />
                    <div className="theAnswer">
                        {
                            question[num]?.answer?.map((ans, i) => (
                                <p key={i}>{i + 1}. <p className="answer" id={`${ans?.correct}`} onClick={(e) => checkAnswer(e, ans?.correct)}>{ans?.value}</p></p>
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
                <pre style={{ whiteSpace: "pre-wrap" }}>{question[num]?.learnMore}</pre>
            </div>
            <div className="quizScoreModal" id="quizScoreModal">
                <img onClick={() => { showModal("quizScoreModal"); navigate(0) }} src={cancel} alt="" />
                <div>
                    {
                        score.map((sc, i) => (
                            <p key={i}>{names[i]} scored {sc}</p>
                        ))
                    }
                    <button onClick={() => navigate("/quiz/leader")}>Leaderboard</button>
                </div>
                {!user.paid && <div>
                    <p>Subscribe to play multiple times a day and gain premium access to all other games and features</p>
                    <button class="block w-full bg-purple-600 hover:bg-purple-400 text-white font-bold py-2 px-4 border-b-4 border-purple-700 hover:border-purple-500 rounded">Subscribe</button>
                </div>}
            </div>
            <div style={{ position: "fixed" }} className="fab-container">
                <div className="fab shadow">
                    <div className="fab-content">
                        <FontAwesomeIcon icon={faPlus} className="text-white" />
                    </div>
                </div>
                <div className="sub-button shadow" onClick={() => navigate("/quiz/leader")}>
                    <FontAwesomeIcon icon={faUserGraduate} className="text-white" />
                </div>
                <div onClick={showHowToPlay} className="sub-button shadow">
                    <FontAwesomeIcon icon={faQuestion} className="text-white" />
                </div>
            </div>
            <div id="howToPlayTrivial" className="howToPlayTrivial">
                <img className="howToPlayHangImg" onClick={showHowToPlay} src={cancel} alt="" />
                <h1>How to play</h1>
                <h4>
                    Bible Learning game is a fun and entertaining way to increase your knowledge of the Truth of the Bible.  It provides for play from 1 to 4 players where each player is asked 10 questions and receives scores based upon how quickly each answers correctly.
                </h4>
                <img className="gameHowImg" src={bible} alt="" />
            </div>
        </div>

    )
}

export default Game