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
            <div className="firstDiv">
                {
                    user.username ? (
                        <p>Welcome back {user.username}</p>
                    ) : (
                        <>
                            <p onClick={() => navigate("/register")}>Register</p>
                            <p onClick={() => navigate("/login")}>Login</p>
                        </>
                    )
                }
            </div>
            <div className="innerMain">
                <div onClick={() => navigate("/select")}>
                    <img src={word} alt="" />
                    <p>Word quest</p>
                </div>

                <div onClick={() => navigate("/word", { state: { numb: 1 } })}>
                    <img src={biblequest} alt="" />
                    <p>Bible quest</p>
                </div>

                <div onClick={() => navigate("/bible/select")}>
                    <img src={bible} alt="" />
                    <p>Bible learning game</p>
                </div>

                <div onClick={() => navigate("/hangman")}>
                    <img src={hang} alt="" />
                    <p>Hangman</p>
                </div>
                <div onClick={() => navigate("/shield")}>
                    <img src={shield} alt="" />
                    <p>Watchman Sword&Shield</p>
                </div>

                <div onClick={() => navigate("/watchman")}>
                    <img src={shield} alt="" />
                    <p>My Sword&Shield</p>
                </div>
            </div>
        </div>
    )
}

export default Select