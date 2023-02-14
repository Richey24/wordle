import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import url from "../url"
import "./Audit.css"
import THeHeader from "./TheHeader"

const Audit = () => {
    const [items, setItems] = useState([])
    const token = sessionStorage.getItem("token")
    const getItems = async () => {
        const res = await axios.get(`${url}/audit/get/all`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            validateStatus: () => true
        })
        const rep = await res.data
        setItems(rep)
    }
    useEffect(() => {
        getItems()
    }, [])
    return (
        <div>
            <THeHeader admin={true} />
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