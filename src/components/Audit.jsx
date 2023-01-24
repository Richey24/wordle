import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import url from "../url"
import "./Audit.css"

const Audit = () => {
    const [items, setItems] = useState([])
    const getItems = async () => {
        const res = await axios.get(`${url}/audit/get/all`)
        const rep = await res.data
        setItems(rep)
    }
    useEffect(() => {
        getItems()
    }, [])
    return (
        <div className="auditMain">
            {
                items.map((item, i) => (
                    <p key={i}>{item?.audit}</p>
                ))
            }
        </div>
    )
}

export default Audit