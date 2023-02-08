import "./Select.css"
import "./Difficult.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import url from "../url"
import { Spinner } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/fontawesome-free-solid'
import THeHeader from "./TheHeader"

const Difficult = () => {
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

    const navi = (num) => {
        if (num !== 5 && !id) {
            navigate("/login")
            return
        }
        if (num !== 5 && !user.paid) {
            showModal("swordSub")
            return
        }
        navigate("/word", { state: { numb: num } })
    }

    const playSound = (val) => {
        console.log("sad");
        switch (val) {
            case "easy":
                new Audio(require("../sound/single.mp3")).play()
                break;
            case "normal":
                new Audio(require("../sound/swinging.mp3")).play()
                break;
            case "hard":
                new Audio(require("../sound/swish.mp3")).play()
                break;
            case "very":
                new Audio(require("../sound/whiff.mp3")).play()
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
        <div style={{ backgroundColor: user.tribe ? user.tribe[1] : "" }} className="selectMain">
            <THeHeader />
            <div style={{ columnGap: "300px" }} className="innerMain">
                <button onMouseEnter={() => playSound("easy")} className="normal" onClick={() => navi(5)}>
                    Easy
                </button>

                <button onMouseEnter={() => playSound("normal")} className="hard" onClick={() => navi(8)}>
                    Normal
                </button>

                <button onMouseEnter={() => playSound("hard")} className="veryHard" onClick={() => navi(11)}>
                    Hard
                </button>

                <button onMouseEnter={() => playSound("very")} className="impossible" onClick={() => navi(14)}>
                    Very Hard
                </button>
            </div>
            <div id="swordSub" className="swordSub">
                <p>You have to subscribe to gain premium access to all difficulty level in the game</p>
                <button>Subscribe</button>
                <button onClick={() => showModal("swordSub")}>Cancel</button>
            </div>
        </div>
    )
}

export default Difficult