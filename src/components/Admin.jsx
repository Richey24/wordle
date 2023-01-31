import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import url from "../url"
import "./Admin.css"

const Admin = () => {
    const id = sessionStorage.getItem("id")
    const token = sessionStorage.getItem("token")
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [use, setUser] = useState({})
    const [fil, setFil] = useState([])

    const getUsers = async () => {
        const res = await axios.get(`${url}/user/find/all`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }, { validateStatus: () => true })
        if (res.status !== 200) {
            navigate("/admin/login")
        }
        const rep = await res.data
        setUsers(rep)
        setFil(rep)
    }

    const getUser = async () => {
        const res = await axios.get(`${url}/user/get/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }, { validateStatus: () => true })
        const rep = await res.data
        if (token !== rep.mainToken) {
            sessionStorage.clear()
            navigate("/admin/login")
        }
        setUser(rep)
    }

    useEffect(() => {
        if (!id) {
            navigate("/admin/login")
        }
        getUsers()
        getUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const filterUser = (e) => {
        const word = e.target.value
        const arr = fil.filter((fi) => fi.name.toLowerCase().includes(word.toLowerCase()))
        setUsers(arr)
    }

    const makeAdmin = async (user, value) => {
        // if (!user.paid) {
        //     return
        // }
        await axios.put(`${url}/user/update/${user._id}`, { admin: value }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        getUsers()
    }
    const makeSuperAdmin = async (user, value) => {
        // if (!user.paid) {
        //     return
        // }
        await axios.put(`${url}/user/update/${user._id}`, { superAdmin: value }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        getUsers()
    }

    return (
        <div className="adminDiv">
            <h2>Admin dashboard</h2>
            <div className="inputDiv">
                <input onChange={filterUser} type="text" placeholder="Search user" />
                <p onClick={() => navigate("/audit")}>Audit</p>
                <p onClick={() => navigate("/question/list")}>Bible trivial</p>
                {use?.superAdmin && <p onClick={() => navigate("/delete")}>To Be Deleted</p>}
            </div>
            <div>
                {
                    users.map((user, i) => (
                        <div key={i} className="adminInner">
                            <p>{user?.name}</p>
                            <div>
                                <button onClick={() => makeAdmin(user, user?.admin ? false : true)}>{user?.admin ? "Remove admin" : "Make admin"}</button>
                                {use?.superAdmin && <button style={{ marginLeft: "20px" }} onClick={() => makeSuperAdmin(user, user?.superAdmin ? false : true)}>{user?.superAdmin ? "Remove super admin" : "Make super admin"}</button>}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Admin