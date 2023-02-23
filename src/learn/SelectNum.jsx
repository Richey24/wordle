import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import THeHeader from "../components/TheHeader"
import url from "../url"
import "./SelectNum.css"

const SelectNum = () => {
    const navigate = useNavigate()
    const id = localStorage.getItem("id")
    const token = localStorage.getItem("token")
    const [spin, setSpin] = useState(true)
    const [user, setUser] = useState({})

    const getUser = async () => {
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
                navigate("/login")
                return
            }
            if (rep.playedTrivial && !rep.paid) {
                navigate("/")
                return
            }
            if (rep.playedTrivial && Date.now() > new Date(user.expiryDate).getTime()) {
                navigate("/")
                return
            }
            setUser(rep)
            setSpin(false)
        } catch (error) {
            setSpin(false)
            navigate("/login")
        }
    }

    useEffect(() => {
        if (!id) {
            navigate("/login")
        }
        getUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const playSound = (val) => {
        switch (val) {
            case "1":
                new Audio(require("../sound/single.mp3")).play()
                break;
            case "2":
                new Audio(require("../sound/swinging.mp3")).play()
                break;
            case "3":
                new Audio(require("../sound/swish.mp3")).play()
                break;
            case "4":
                new Audio(require("../sound/whiff.mp3")).play()
                break;

            default:
                break;
        }
    }

    const showTheNum = () => {
        document.getElementById("theSelectNumDiv").classList.toggle("theNumShow")
    }

    const theNav = (arr) => {
        if (arr.length > 1 && !user.paid) {
            showTheNum()
            return
        }
        if (arr.length > 1 && Date.now() > new Date(user.expiryDate).getTime()) {
            showTheNum()
            return
        }
        navigate("/bible/names", { state: { count: arr } })
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
        <div>
            <div style={{ backgroundColor: user.tribe ? user.tribe[1] : "" }} className="mainNum">
                <THeHeader />
                <p className="chooseNum">Choose the number of players</p>
                <div>
                    <div onMouseEnter={() => playSound("1")} onClick={() => theNav([1])}>
                        <h2>1</h2>
                        <p>player</p>
                    </div>
                    <div onMouseEnter={() => playSound("2")} onClick={() => theNav([1, 2])}>
                        <h2>2</h2>
                        <p>players</p>
                    </div>
                    <div onMouseEnter={() => playSound("3")} onClick={() => theNav([1, 2, 3])}>
                        <h2>3</h2>
                        <p>players</p>
                    </div>
                    <div onMouseEnter={() => playSound("4")} onClick={() => theNav([1, 2, 3, 4])}>
                        <h2>4</h2>
                        <p>players</p>
                    </div>
                </div>
            </div>
            <div id="theSelectNumDiv" className="theSelectNumDiv">
                <p>You need to subscribe to access more than one player</p>
                <button onClick={() => navigate("/subscribe")}>Subscribe</button>
                <button onClick={showTheNum}>Cancel</button>
            </div>
        </div>
    )
}

export default SelectNum