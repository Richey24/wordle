import "./Select.css"
import word from "../img/white-wordle.png"
import bible from "../img/white-bible.png"
import shield from "../img/white-shield.png"
import biblequest from "../img/white-quiz.png"
import hang from "../img/white-hang.png"
import judah from "../img/judah.png"
import asher from "../img/asher.png"
import benjamin from "../img/benjamin.png"
import gad from "../img/gad.png"
import reuben from "../img/reuben.png"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import url from "../url"
import { Spinner } from "react-bootstrap"
import Header from './TheHeader.jsx';

const Select = () => {
    const navigate = useNavigate()
    const id = localStorage.getItem("id")
    const token = localStorage.getItem("token")
    const [user, setUser] = useState({})
    const [soundOn, setSoundOn] = useState(true)
    const [spin, setSpin] = useState(true)



    useEffect(() => {

        let settings = localStorage.getItem("Settings")

        if (settings == undefined) {
            const settings = {
                sound: true
            }
            localStorage.setItem("Settings", JSON.stringify(settings))
        } else {
            const localStorageSettings = localStorage.getItem("Settings")
            let settings = JSON.parse(localStorageSettings)

            setSoundOn(settings.sound)
        }


    }, [])


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
                        return
                    }
                    if (token !== rep.mainToken) {
                        localStorage.clear()
                        setSpin(false)
                        return
                    }
                    console.log(rep);
                    setUser(rep)
                    setSpin(false)
                } catch (error) {
                    setSpin(false)

                }
            })()
        } else {
            setSpin(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const showModal = (id) => {
        document.getElementById(id).classList.toggle("selectShow")
    }

    const showAbout = () => {
        showModal("aboutDiv")
        setTimeout(() => {
            showModal("aboutDiv")
        }, 5000)
    }

    const navBible = () => {
        if (Object.keys(user).length === 0) {
            navigate("/login")
            return
        }
        if (user.playedBible) {
            if (!user.paid) {
                showModal("swordSub")
                return
            } else if (Date.now() > new Date(user.expiryDate).getTime()) {
                showModal("swordSub")
                return
            }
        }
        navigate("/word", { state: { numb: 1 } })
    }

    const navHang = () => {
        if (Object.keys(user).length === 0) {
            navigate("/login")
            return
        }
        if (user.playedHang) {
            if (!user.paid) {
                showModal("swordSub")
                return
            } else if (Date.now() > new Date(user.expiryDate).getTime()) {
                showModal("swordSub")
                return
            }
        }
        navigate("/hangman")
    }

    const navTrivial = () => {
        if (Object.keys(user).length === 0) {
            navigate("/login")
            return
        }
        if (user.playedTrivial) {
            if (!user.paid) {
                showModal("swordSub")
                return
            } else if (Date.now() > new Date(user.expiryDate).getTime()) {
                showModal("swordSub")
                return
            }
        }
        navigate("/bible/select")
    }

    const navCross = () => {
        if (Object.keys(user).length === 0) {
            navigate("/login")
            return
        }
        if (user.playedCross) {
            if (!user.paid) {
                showModal("swordSub")
                return
            } else if (Date.now() > new Date(user.expiryDate).getTime()) {
                showModal("swordSub")
                return
            }
        }
        navigate("/crossword")
    }

    const playSound = async (val) => {
        if (soundOn) {
            switch (val) {
                case "word":
                    new Audio(require("../sound/hit-low-gravity.mp3")).play()
                    break;
                case "quest":
                    new Audio(require("../sound/battle_horn.mp3")).play()
                    break;
                case "cross":
                    new Audio(require("../sound/cross.mp3")).play()
                    break;
                case "learn":
                    new Audio(require("../sound/small-page.mp3")).play()
                    break;
                case "hang":
                    new Audio(require("../sound/geo.mp3")).play()
                    break;
                case "sword":
                    new Audio(require("../sound/ES_SwordIn.mp3")).play()
                    break;
                case "shield":
                    new Audio(require("../sound/shield-guard.mp3")).play()
                    break;
                case "hebrew":
                    new Audio(require("../sound/sheath.mp3")).play()
                    break;
                default:
                    break;
            }
        }

    }

    const soundClick = () => {



        const localStorageSettings = localStorage.getItem("Settings")
        let settings = JSON.parse(localStorageSettings)

        //
        setSoundOn(!soundOn)

        //set sound
        settings.sound = !soundOn



        //set Local Storage for sound
        localStorage.setItem("Settings", JSON.stringify(settings))
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
            <Header showAbout={showAbout} soundClick={soundClick} soundOn={soundOn} />
            <div style={{ backgroundColor: user.tribe ? user.tribe[1] : "" }} className="selectMain" id="selectMain">
                <div className="innerMain">
                    <div onMouseEnter={() => playSound("word")} onClick={() => navigate("/select")}>
                        <img src={word} alt="" />
                        <p>Word quest</p>
                    </div>

                    <div onMouseEnter={() => playSound("quest")} onClick={navBible}>
                        <img src={biblequest} alt="" />
                        <p>Bible quest</p>
                    </div>

                    <div onMouseEnter={() => playSound("cross")} onClick={navCross}>
                        <img src={word} alt="" />
                        <p>Bible Crossword</p>
                    </div>

                    <div onMouseEnter={() => playSound("learn")} onClick={navTrivial}>
                        <img src={bible} alt="" />
                        <p>Bible learning game</p>
                    </div>

                    <div onMouseEnter={() => playSound("hang")} onClick={navHang}>
                        <img src={hang} alt="" />
                        <p>Hangman</p>
                    </div>
                    <div onMouseEnter={() => playSound("hebrew")} onClick={() => showModal("comingSoon")}>
                        <img src={bible} alt="" />
                        <p>Hebrew language game</p>
                    </div>
                    <div onMouseEnter={() => playSound("sword")} onClick={() => navigate("/shield")}>
                        <img src={shield} alt="" />
                        <p>Watchman Sword & Shield</p>
                    </div>

                    <div onMouseEnter={() => playSound("shield")} onClick={() => navigate("/watchman")}>
                        <img src={shield} alt="" />
                        <p>My Sword & Shield</p>
                    </div>
                </div>
                <div id="swordSub" className="selectSub">
                    <p>You have use your free daily pass, kindly subscribe to have unlimited access</p>
                    <button onClick={() => navigate("/subscription")}>Subscribe</button>
                    <button onClick={() => showModal("swordSub")}>Cancel</button>
                </div>
                <div style={{ height: "170px" }} id="comingSoon" className="selectSub">
                    <p style={{ fontWeight: "600" }}>Will be added soon...</p>
                    <button onClick={() => showModal("comingSoon")}>Cancel</button>
                </div>
                <div id="aboutDiv" className="aboutSub">
                    <h6 style={{ display: "flex", justifyContent: "center", columnGap: "10px", flexWrap: "wrap" }}><p>ISRAEL BIBLE CAMP</p>  © 2023 All Rights Reserved </h6>
                    <h6>Special thanks to the following:</h6>
                    <h6>Bishop Nathanyel of IUIC</h6>
                    <h6>Naqam of WFI, thanks for the wake-up call.</h6>
                    <h6>Our development team working from 3 continents.</h6>
                    <p><img src={judah} alt="" /> <span>I. B. Israel</span></p>
                    <p><img src={asher} alt="" /> <span>L. Silva</span></p>
                    <p><img src={benjamin} alt="" /> <span>J. Ellis</span></p>
                    <p><img src={gad} alt="" /> <span>R. Uahomo</span></p>
                    <p><img src={reuben} alt="" /> <span>L. Francis</span></p>
                </div>
            </div>
        </div>
    )
}

export default Select