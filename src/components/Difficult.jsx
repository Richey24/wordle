import "./Select.css"
import "./Difficult.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import url from "../url"

const Difficult = () => {
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
                <button className="normal" onClick={() => navigate("/wordle")}>
                    Normal
                </button>

                <button className="hard" onClick={() => navigate("/wordle")}>
                    Hard
                </button>

                <button className="veryHard" onClick={() => navigate("/wordle")}>
                    Very hard
                </button>

                <button className="impossible" onClick={() => navigate("/wordle")}>
                    Impossible
                </button>
            </div>
        </div>
    )
}

export default Difficult