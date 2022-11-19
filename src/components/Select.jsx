import "./Select.css"
import word from "../img/wordd.avif"
import bible from "../img/bible.jpg"
import hang from "../img/hangman.jpg"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import url from "../url"

const Select = () => {
    const navigate = useNavigate()
    const id = localStorage.getItem("id")
    const [user, setUser] = useState({})

    useEffect(() => {
        if (id) {
            (async () => {
                const res = await axios.get(`${url}/user/get/${id}`)
                const rep = await res.data
                setUser(rep)
            })()
        }
    }, [id])
    return (
        <div className="selectMain">
            <div className="firstDiv">
                {
                    user.username ? (
                        <p>Welcome back {user.username}</p>
                    ) : (
                        <>
                            <p onClick={() => navigate("/login", { state: { reg: true } })}>Register</p>
                            <p onClick={() => navigate("/login")}>Login</p>
                        </>
                    )
                }
            </div>
            <div className="innerMain">
                <div onClick={() => navigate("/wordle")}>
                    <img src={word} alt="" />
                    <p>Wordle game</p>
                </div>

                <div>
                    <img src={bible} alt="" />
                    <p>Bible trivial</p>
                </div>

                <div>
                    <img src={hang} alt="" />
                    <p>Hangman</p>
                </div>
            </div>
        </div>
    )
}

export default Select