import axios from "axios"
import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import url from "../url"

const HangLeader = () => {
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
            const arr = rep.sort((a, b) => b.hangmanScore - a.hangmanScore)
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
            <h3>Hangman Leader Board</h3>
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
                        <p>{user?.hangmanScore}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default HangLeader