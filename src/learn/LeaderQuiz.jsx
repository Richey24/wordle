import axios from "axios"
import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import url from "../url"
import "../components/Leader.css"
import benjamin from "../img/benjamin.png"
import dan from "../img/dan.png"
import ephraim from "../img/ephraim.png"
import gad from "../img/gad.png"
import issachar from "../img/issachar.png"
import joseph from "../img/joseph.png"
import judah from "../img/judah.png"
import levi from "../img/levi.png"
import manasseh from "../img/manasseh.png"
import naftali from "../img/naftali.png"
import reuben from "../img/reuben.png"
import simeon from "../img/simeon.png"
import zebulun from "../img/zebulun.png"
import asher from "../img/asher.png"

const images = {
    benjamin: benjamin,
    dan: dan,
    ephraim: ephraim,
    gad: gad,
    issachar: issachar,
    joseph: joseph,
    judah: judah,
    levi: levi,
    manasseh: manasseh,
    naftali: naftali,
    reuben: reuben,
    simeon: simeon,
    zebulun: zebulun,
    asher: asher
}

const LeaderQuiz = () => {
    const [users, setUsers] = useState([])
    const [spin, setSpin] = useState(true)
    const token = localStorage.getItem("token")

    useEffect(() => {
        (async () => {
            const res = await axios.get(`${url}/score/get/all`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }, { validateStatus: () => true })
            const rep = await res.data
            if (res.status !== 200) {
                setSpin(false)
                return
            }
            const arr = rep.sort((a, b) => b.score - a.score)
            setUsers(arr)
            setSpin(false)
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div style={{ backgroundImage: `url(${images[users[0]?.tribe?.toLowerCase()]})` }} className="mainTable">
            <h3>Bible Trivial Leader Board</h3>
            <div className="firstTable">
                <p>Username</p>
                <p>Tribe</p>
                <p>Score</p>
            </div>
            {
                users.map((user, i) => (
                    <div key={i} className="secondTable">
                        <p>{user?.playerName}</p>
                        <p>{user?.tribe}</p>
                        <p>{user?.score}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default LeaderQuiz