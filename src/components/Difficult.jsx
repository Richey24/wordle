import "./Select.css"
import "./Difficult.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import url from "../url"
import { Spinner } from "react-bootstrap"

const Difficult = () => {
    const navigate = useNavigate()
    const id = localStorage.getItem("id")
    const [user, setUser] = useState({})
    const [spin, setSpin] = useState(true)

    useEffect(() => {
        if (id) {
            (async () => {
                const res = await axios.get(`${url}/user/get/${id}`)
                const rep = await res.data
                setUser(rep)
                setSpin(false)
            })()
        } else {
            setSpin(false)
        }
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
            <div style={{ columnGap: "200px" }} className="innerMain">
                <button className="normal" onClick={() => navigate("/word", { state: { numb: 5 } })}>
                    Easy
                </button>

                <button className="hard" onClick={() => navigate("/word", { state: { numb: 8 } })}>
                    Normal
                </button>

                <button className="veryHard" onClick={() => navigate("/word", { state: { numb: 11 } })}>
                    Hard
                </button>

                <button className="impossible" onClick={() => navigate("/word", { state: { numb: 14 } })}>
                    Very Hard
                </button>
            </div>
        </div>
    )
}

export default Difficult