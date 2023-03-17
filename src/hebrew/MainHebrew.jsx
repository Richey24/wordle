import "./MainHebrew.css"
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import url from "../url";
import CongratulationView from "../components/Congratulation/CongratulationView";
import FailedDiv from "../components/Congratulation/Failed";
import THeHeader from "../components/TheHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUserGraduate } from "@fortawesome/fontawesome-free-solid";
import { Dialog, Transition } from "@headlessui/react";
import { useRef } from "react";

let interval = null
const MainHebrew = () => {
    const { state } = useLocation()
    const { deck } = useParams()
    const [lists, setLists] = useState([])
    const [num, setNum] = useState(0)
    const [won, setWon] = useState(false)
    const [failed, setFailed] = useState(false)
    const [images, setImages] = useState([])
    const [score, setScore] = useState(0)
    const [count, setCount] = useState(0)
    const navigate = useNavigate()
    const [subModal, setSubModal] = useState(false)
    const cancelButtonRef = useRef(null)
    const id = localStorage.getItem("id")
    const token = localStorage.getItem("token")

    const getItems = async () => {
        const res = await axios.get(`${url}/hebrew/get/all`, {
            validateStatus: () => true
        })
        const rep = await res.data
        const newArr = rep.slice((deck - 1) * 25, deck * 25).filter((re) => re.toBeDeleted !== true)
        if (newArr.length < 4) {
            navigate("/deck")
        } else {
            let imgArr = [];
            while (imgArr.length < 3) {
                let rand = Math.floor(Math.random() * newArr.length)
                let randImg = newArr[rand].correctImage
                if (!imgArr.includes(randImg) && randImg !== newArr[0].correctImage) {
                    imgArr.push(randImg)
                }
            }
            const ran = Math.floor(Math.random() * 4)
            imgArr.splice(ran, 0, newArr[0].correctImage)
            setImages(imgArr);
            setLists(newArr)
        }

    }

    useEffect(() => {
        if (!state) {
            navigate("/deck")
        }
        getItems()
        window.scrollTo(0, document.body.scrollHeight)
        const timer = document.getElementById("hebTime")
        interval = setInterval(() => {
            if (Number(timer.innerHTML) <= 0) {
                const card = document.querySelector(".card__inner");
                card.classList.toggle('is-flipped');
                setFailed(true)
                clearInterval(interval)
                return
            }
            timer.innerHTML = Number(timer.innerHTML) - 1
        }, 1000);
        return () => {
            clearInterval(interval)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const flipCard = (val) => {
        if (failed || won) {
            return
        }
        const card = document.querySelector(".card__inner");
        const timer = document.getElementById("hebTime")
        card.classList.toggle('is-flipped');
        if (val === lists[num].correctImage) {
            const sound = new Audio(require("../sound/Celebration.mp3"))
            sound.play()
            setTimeout(() => {
                sound.pause()
            }, 3000)
            setCount(count + 1)
            setWon(true)
            setScore(score + Number(timer.innerHTML))
        } else {
            setFailed(true)
            new Audio(require("../sound/wrong.mp3")).play()
        }
        clearInterval(interval)
    }

    const nextCard = async () => {
        if (num >= lists.length - 1) {
            setWon(false)
            setFailed(false)
            setSubModal(true)
            const body = { hebrewScore: score }
            await axios.put(`${url}/user/update/${id}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return
        }
        const card = document.querySelector(".card__inner");
        card.classList.toggle('is-flipped');
        const timer = document.getElementById("hebTime")
        timer.innerHTML = 60
        interval = setInterval(() => {
            if (Number(timer.innerHTML <= 0)) {
                const card = document.querySelector(".card__inner");
                card.classList.toggle('is-flipped');
                setFailed(true)
                clearInterval(interval)
                return
            }
            timer.innerHTML = Number(timer.innerHTML) - 1
        }, 1000);
        let imgArr = [];
        while (imgArr.length < 3) {
            let rand = Math.floor(Math.random() * lists.length)
            let randImg = lists[rand].correctImage
            if (!imgArr.includes(randImg) && randImg !== lists[num + 1].correctImage) {
                imgArr.push(randImg)
            }
        }
        const ran = Math.floor(Math.random() * 4)
        imgArr.splice(ran, 0, lists[num + 1].correctImage)
        setImages(imgArr);
        setTimeout(() => {
            setNum(num + 1)
        }, 1000)
        setWon(false)
        setFailed(false)
    }

    const checkWin = () => {
        if (count >= lists.length) {
            navigate("/deck")
        } else {
            navigate(0)
        }
    }

    return (
        <div style={{ paddingBottom: "20px" }}>
            <THeHeader />
            <div class="hebrewMainDiv">
                <div class="hebrewFirst">
                    <div className="hebrewCard" onClick={() => flipCard(images[0])} ><img src={`https://absa7kzimnaf.blob.core.windows.net/newcontainer/${images[0]}`} alt="" /></div>
                    <div style={{ backgroundImage: state }} className="hebrewTimer">
                        <span>Timer</span>
                        <div style={{ display: "flex" }}><p id="hebTime">60</p>s</div>
                    </div>
                    <div className="hebrewCard" onClick={() => flipCard(images[1])} ><img src={`https://absa7kzimnaf.blob.core.windows.net/newcontainer/${images[1]}`} alt="" /></div>
                </div>
                <div class="mainCard">
                    <div class="card__inner">
                        <div style={{ backgroundImage: state }} class="card__face card__face--front">
                            <h2>{lists[num]?.paleoHebrewText}</h2>
                        </div>
                        <div class="card__face card__face--back">
                            <div class="card__content">
                                <div style={{ backgroundImage: state }} class="card__header">
                                    <img src={`https://absa7kzimnaf.blob.core.windows.net/newcontainer/${lists[num]?.correctImage}`} alt="" class="pp" />
                                </div>
                                <div class="card__body">
                                    <h3 style={{ textTransform: "capitalize" }}>{lists[num]?.english}</h3>
                                    <h3>{lists[num]?.paleoHebrewText}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hebrewLast">
                    <div style={{ backgroundImage: state }} className="hebrewScore" id="hebrewScore">
                        <span>Score</span>
                        {score}
                    </div>
                    <div className="hebrewCard" onClick={() => flipCard(images[2])} ><img src={`https://absa7kzimnaf.blob.core.windows.net/newcontainer/${images[2]}`} alt="" /></div>
                    <div style={{ backgroundImage: state }} className="mobileScore" id="mobileScore">
                        <span>Score</span>
                        {score}
                    </div>
                    <div className="hebrewCard" onClick={() => flipCard(images[3])} ><img src={`https://absa7kzimnaf.blob.core.windows.net/newcontainer/${images[3]}`} alt="" /></div>
                </div>
            </div>
            {won && <div className="congratHeb">
                <CongratulationView played={{ paid: true }} alpha={true} heb={true} nextWord={nextCard} />
            </div>}
            {failed && <div style={{ zIndex: "1000" }} className="congratHeb">
                <FailedDiv nextWord={nextCard} />
            </div>}
            <div style={{ position: "fixed" }} className="fab-container">
                <div className="fab shadow">
                    <div className="fab-content">
                        <FontAwesomeIcon icon={faPlus} className="text-white" />
                    </div>
                </div>
                <div className="sub-button shadow" onClick={() => navigate("/hebrew/leader")}>
                    <FontAwesomeIcon icon={faUserGraduate} className="text-white" />
                </div>
            </div>

            <Transition.Root show={subModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setSubModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-dark bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <div>
                                                <p>You answered {count} of {lists.length} correctly</p>
                                            </div>
                                            <div className="mt-2">
                                                <button onClick={checkWin} class="block w-full bg-purple-600 hover:bg-purple-400 text-white font-bold py-2 px-4 border-b-4 border-purple-700 hover:border-purple-500 rounded">
                                                    {count >= lists.length ? "Next Deck" : "Try Again"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    )
}

export default MainHebrew