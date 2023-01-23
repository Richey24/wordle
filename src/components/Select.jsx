import "./Select.css"
import word from "../img/white-wordle.png"
import bible from "../img/white-bible.png"
import shield from "../img/white-shield.png"
import biblequest from "../img/white-quiz.png"
import hang from "../img/white-hang.png"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import url from "../url"
import { Spinner } from "react-bootstrap"

const Select = () => {
    const navigate = useNavigate()
    const id = localStorage.getItem("id")
    const token = localStorage.getItem("token")
    const [user, setUser] = useState({})
    const [spin, setSpin] = useState(true)

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
        document.getElementById(id).classList.toggle("show")
    }

    const navBible = () => {
        if (Object.keys(user).length === 0) {
            navigate("/login")
        }
        if (user.playedBible) {
            showModal("swordSub")
            return
        }
        navigate("/word", { state: { numb: 1 } })
    }

    const navHang = () => {
        if (Object.keys(user).length === 0) {
            navigate("/login")
        }
        if (user.playedHang) {
            showModal("swordSub")
            return
        }
        navigate("/hangman")
    }

    const navTrivial = () => {
        if (Object.keys(user).length === 0) {
            navigate("/login")
        }
        if (user.playedTrivial) {
            showModal("swordSub")
            return
        }
        navigate("/bible/select")
    }

    const navCross = () => {
        navigate("/crossword")
    }

    const playSound = async (val) => {
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
            default:
                break;
        }
    }

    const logOut = () => {
        localStorage.clear()
        navigate(0)
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
        <div style={{ backgroundColor: user.tribe ? user.tribe[1] : "" }} className="selectMain" id="selectMain">
            <div className="firstDiv">
                {
                    user.username ? (
                        <p>Shalom {user.username} <span onClick={logOut}>Logout</span></p>
                    ) : (
                        <>
                            <p onClick={() => navigate("/register")}>Register</p>
                            <p onClick={() => navigate("/login")}>Login</p>
                        </>
                    )
                }
            </div>
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
                <div onMouseEnter={() => playSound("sword")} onClick={() => navigate("/shield")}>
                    <img src={shield} alt="" />
                    <p>Watchman Sword & Shield</p>
                </div>

                <div onMouseEnter={() => playSound("shield")} onClick={() => navigate("/watchman")}>
                    <img src={shield} alt="" />
                    <p>My Sword & Shield</p>
                </div>
            </div>
            <div id="swordSub" className="swordSub">
                <p>You have use your free daily pass, kindly subscribe to have unlimited access</p>
                <button>Subscribe</button>
                <button onClick={() => showModal("swordSub")}>Cancel</button>
            </div>
        </div>
    )
}

export default Select