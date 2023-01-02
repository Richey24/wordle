import axios from "axios"
import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import url from "../url"
import "./Leader.css"

const Leader = () => {
    const [users, setUsers] = useState([])
    const [spin, setSpin] = useState(true)
    const token = localStorage.getItem("token")

    useEffect(() => {
        (async () => {
            const res = await axios.get(`${url}/user/find/all`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }, { validateStatus: () => true })
            const rep = await res.data
            if (res.status !== 200) {
                setSpin(false)
                return
            }
            console.log(rep);
            const arr = rep.sort((a, b) => b.wordQuestScore - a.wordQuestScore)
            setUsers(arr)
            setSpin(false)
        })()
    }, [])

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
        <div className="mainTable">
            <h3>Word Quest Leader Board</h3>
            <div className="firstTable">
                <p>Username</p>
                <p>Tribe</p>
                <p>Score</p>
            </div>
            {
                users.map((user) => (
                    <div className="secondTable">
                        <p>{user?.username}</p>
                        <p>{user?.tribe[0]}</p>
                        <p>{user?.wordQuestScore}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default Leader