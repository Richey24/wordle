import "./MainHebrew.css"
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import axios from "axios";
import url from "../url";
import CongratulationView from "../components/Congratulation/CongratulationView";
import FailedDiv from "../components/Congratulation/Failed";

let interval = null
const MainHebrew = () => {
    const { state } = useLocation()
    const { deck } = useParams()
    const [lists, setLists] = useState([])
    const [num, setNum] = useState(0)
    const [won, setWon] = useState(false)
    const [failed, setFailed] = useState(false)
    const [images, setImages] = useState([])
    const navigate = useNavigate()

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
        getItems()
        const timer = document.getElementById("hebTime")
        interval = setInterval(() => {
            if (Number(timer.innerHTML <= 0)) {
                const card = document.querySelector(".card__inner");
                card.classList.toggle('is-flipped');
                clearInterval(interval)
                return
            }
            timer.innerHTML = Number(timer.innerHTML) - 1
        }, 1000);
        return () => {
            clearInterval(interval)
        }
    }, [])

    const flipCard = (val) => {
        if (failed || won) {
            return
        }
        const score = document.getElementById("hebrewScore")
        const card = document.querySelector(".card__inner");
        card.classList.toggle('is-flipped');
        if (val === lists[num].correctImage) {
            const sound = new Audio(require("../sound/Celebration.mp3"))
            sound.play()
            setTimeout(() => {
                sound.pause()
            }, 3000)
            setWon(true)
            score.innerHTML = Number(score.innerHTML) + 100
        } else {
            setFailed(true)
            new Audio(require("../sound/wrong.mp3")).play()
        }
        clearInterval(interval)
    }

    const nextCard = () => {
        const card = document.querySelector(".card__inner");
        card.classList.toggle('is-flipped');
        const timer = document.getElementById("hebTime")
        timer.innerHTML = 60
        let imgArr = [];
        while (imgArr.length < 3) {
            let rand = Math.floor(Math.random() * lists.length)
            let randImg = lists[rand].correctImage
            if (!imgArr.includes(randImg) && randImg !== lists[0].correctImage) {
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

    return (
        <div>
            <div class="hebrewMainDiv">
                <div class="hebrewFirst">
                    <div className="hebrewCard" onClick={() => flipCard(images[0])} ><img src={`https://absa7kzimnaf.blob.core.windows.net/newcontainer/${images[0]}`} alt="" /></div>
                    <div style={{ backgroundImage: state }} className="hebrewTimer">
                        <p id="hebTime">60</p>s
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
                        0
                    </div>
                    <div className="hebrewCard" onClick={() => flipCard(images[2])} ><img src={`https://absa7kzimnaf.blob.core.windows.net/newcontainer/${images[2]}`} alt="" /></div>
                    <div style={{ backgroundImage: state }} className="mobileScore" id="hebrewScore">
                        0
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
        </div>
    )
}

export default MainHebrew