import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
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
        if (!id) {
            navigate("/login")
        }
        getUser()
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
        <div style={{ backgroundColor: user.tribe ? user.tribe[1] : "" }} className="mainNum">
            <p className="homeBtnNum" onClick={() => navigate("/")}>Home</p>
            <p className="chooseNum">Choose the number of players</p>
            <div>
                <div onClick={() => navigate("/bible/names", { state: { count: [1] } })}>
                    <h2>1</h2>
                    <p>player</p>
                </div>
                <div onClick={() => navigate("/bible/names", { state: { count: [1, 2] } })}>
                    <h2>2</h2>
                    <p>players</p>
                </div>
                <div onClick={() => navigate("/bible/names", { state: { count: [1, 2, 3] } })}>
                    <h2>3</h2>
                    <p>players</p>
                </div>
                <div onClick={() => navigate("/bible/names", { state: { count: [1, 2, 3, 4] } })}>
                    <h2>4</h2>
                    <p>players</p>
                </div>
            </div>
        </div>
    )
}

export default SelectNum