import { useEffect } from "react"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "./Names.css"
import drop from "../img/drop.svg"
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
import url from "../url"
import axios from "axios"
import { Spinner } from "react-bootstrap"


const Names = () => {
    const [arr, setArr] = useState([1])
    const [tribe, setTribe] = useState(["asher", "asher", "asher", "asher"])
    const id = localStorage.getItem("id")
    const token = localStorage.getItem("token")
    const [spin, setSpin] = useState(true)
    const [user, setUser] = useState({})
    const { state } = useLocation()
    const navigate = useNavigate()
    const count = state?.count

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
            if (token !== rep.mainToken) {
                localStorage.clear()
                setSpin(false)
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
        if (!count) {
            navigate("/bible/select")
            return
        }
        if (!id) {
            navigate("/login")
        }
        setArr(count)
        getUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const submitForm = (e) => {
        e.preventDefault()
        const names = []
        const playersName = document.getElementsByClassName("playerName")
        Array.from(playersName).forEach((theName) => {
            names.push(theName.value.toLowerCase())
        })
        const newArr = [...tribe]
        newArr.length = arr.length
        navigate("/bible/game", { state: { names: names, tribe: newArr } })
    }

    const selectTribe = (value) => {
        document.getElementById(value).classList.toggle("show")
    }

    const getTribe = (value, id, i) => {
        const newArr = [...tribe]
        newArr[i] = value[0].toLowerCase()
        setTribe(newArr)
        selectTribe(id)
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
        <div style={{ backgroundColor: user.tribe ? user.tribe[1] : "" }} className="mainNames">
            <form onSubmit={submitForm}>
                <h4>Enter player(s) name</h4>
                {
                    arr.map((ar, i) => (
                        <div key={i} >
                            <input required className="playerName" placeholder={`Enter player ${ar} name`} type="text" />
                            <div className='tribeDiv'>
                                <label>Select player {ar} tribe</label>
                                <p style={{ textTransform: "capitalize" }} onClick={() => selectTribe(`tribe${ar}`)} className='tribeMain'>{tribe[i]} <img src={drop} alt="" /></p>
                                <ul id={`tribe${ar}`} className='tribeList'>
                                    <li onClick={() => getTribe(["Asher", "rgb(111, 111, 21)"], `tribe${ar}`, i)}>Asher <img src={asher} alt="" /></li>
                                    <li onClick={() => getTribe(["Dan", "rgb(250, 100, 125)"], `tribe${ar}`, i)}>Dan <img src={dan} alt="" /></li>
                                    <li onClick={() => getTribe(["Ephraim", "rgb(58, 58, 241)"], `tribe${ar}`, i)}>Ephraim <img src={ephraim} alt="" /></li>
                                    <li onClick={() => getTribe(["Gad", "rgb(142, 200, 239)"], `tribe${ar}`, i)}>Gad <img src={gad} alt="" /></li>
                                    <li onClick={() => getTribe(["Issachar", "rgb(12, 57, 11)"], `tribe${ar}`, i)}>Issachar <img src={issachar} alt="" /></li>
                                    <li onClick={() => getTribe(["Joseph", "rgb(12, 571, 31)"], `tribe${ar}`, i)}>Joseph <img src={joseph} alt="" /></li>
                                    <li onClick={() => getTribe(["Manasseh", "rgb(237, 31, 237)"], `tribe${ar}`, i)}>Manasseh <img src={manasseh} alt="" /></li>
                                    <li onClick={() => getTribe(["Naphtali", "lightgreen"], `tribe${ar}`, i)}>Naphtali <img src={naftali} alt="" /></li>
                                    <li onClick={() => getTribe(["Reuben", "orangered"], `tribe${ar}`, i)}>Reuben <img src={reuben} alt="" /></li>
                                    <li onClick={() => getTribe(["Simeon", "black"], `tribe${ar}`, i)}>Simeon <img src={simeon} alt="" /></li>
                                    <li onClick={() => getTribe(["Zebulun", "rgb(79, 7, 7)"], `tribe${ar}`, i)}>Zebulun <img src={zebulun} alt="" /></li>
                                    <li onClick={() => getTribe(["Zebulun", "rgb(79, 7, 7)"], `tribe${ar}`, i)}>Levi <img src={levi} alt="" /></li>
                                    <li onClick={() => getTribe(["Judah", "purple"], `tribe${ar}`, i)}>Judah <img src={judah} alt="" /></li>
                                    <li onClick={() => getTribe(["Benjamin", "rgb(249, 213, 115)"], `tribe${ar}`, i)}>Benjamin <img src={benjamin} alt="" /></li>
                                </ul>
                            </div>
                        </div>
                    ))
                }
                <button type="submit">Submit</button>
                <button style={{ backgroundColor: "tomato" }} onClick={() => navigate("/bible/select")} type="submit">Cancel</button>
            </form>
        </div>
    )
}

export default Names