import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import url from "../url"
import "./ToBeDel.css"

const ToBeDel = () => {
    const [items, setItems] = useState([])
    const id = sessionStorage.getItem("id")
    const navigate = useNavigate()

    const getItems = async () => {
        const res = await axios.get(`${url}/sword/get/all/deleted/${true}`, { validateStatus: () => true })
        const rep = await res.data
        setItems(rep)
    }

    const getUsers = async () => {
        const res = await axios.get(`${url}/user/get/${id}`, { validateStatus: () => true })
        const rep = await res.data
        if (!rep.superAdmin) {
            navigate("/admin")
        }
    }

    useEffect(() => {
        getItems()
        getUsers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const cancelDel = async (id) => {
        const res = await axios.put(`${url}/sword/update/${id}`, { toBeDeleted: false }, { validateStatus: () => true })
        if (res.status === 200) {
            getItems()
        }
    }

    const delItem = async (id) => {
        const res = await axios.delete(`${url}/sword/delete/${id}`, { validateStatus: () => true })
        if (res.status === 200) {
            getItems()
        }
    }

    if (items.length < 1) {
        return (
            <p style={{ textAlign: "center" }}>No study to be deleted</p>
        )
    }

    return (
        <div className="adminDel">
            {
                items.map((item, i) => (
                    <div key={i}>
                        <p>{item?.topic}</p>
                        <div>
                            <p onClick={() => delItem(item?._id)}>Confirm delete</p>
                            <p onClick={() => cancelDel(item?._id)}>Cancel</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ToBeDel