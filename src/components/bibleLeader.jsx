import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { Spinner } from "react-bootstrap"
import url from "../url"
import "./Leader.css"

const BibleLeader = () => {
    const [users, setUsers] = useState([])
    const [spin, setSpin] = useState(true)

    useEffect(() => {
        (async () => {
            const res = await axios.get(`${url}/user/find/all`, { validateStatus: () => true })
            const rep = await res.data
            if (res.status !== 200) {
                setSpin(false)
                return
            }
            console.log(rep);
            const arr = rep.sort((a, b) => b.bibleQuestScore - a.bibleQuestScore)
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
            <h3>Bible Quest Leader Board</h3>
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
                        <p>{user?.bibleQuestScore}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default BibleLeader