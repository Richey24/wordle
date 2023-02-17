import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { Spinner } from "react-bootstrap"
import url from "../url"
import { DashboardNavbar } from "../widgets/layout"
import "./Audit.css"

const Audit = () => {
    const [items, setItems] = useState([])
    const [spin, setSpin] = useState(true)
    const [user, setUser] = useState({})
    const token = sessionStorage.getItem("token")
    const id = sessionStorage.getItem("id")
    const getItems = async () => {
        const res = await axios.get(`${url}/audit/get/all`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            validateStatus: () => true
        })
        const rep = await res.data
        setItems(rep)
        setSpin(false)
    }
    const getUser = async () => {
        const res = await axios.get(`${url}/user/get/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            validateStatus: () => true
        })
        const rep = await res.data
        setUser(rep)
    }
    useEffect(() => {
        getItems()
        getUser()
    }, [])

    const clearAudit = async () => {
        await axios.delete(`${url}/audit/delete`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            validateStatus: () => true
        })
        getItems()
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
            <DashboardNavbar />
            <h1 style={{ textAlign: "center" }}>Audit</h1>
            {user.superAdmin && <p onClick={clearAudit} className="clearAudit">Clear</p>}
            <div className="auditMain">
                {
                    items.map((item, i) => (
                        <p key={i}>{item?.audit}</p>
                    ))
                }
            </div>
        </div>
    )
}

export default Audit