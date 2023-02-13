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
    const [active, setActive] = useState("none")

    const getUsers = async () => {
        const res = await axios.get(`${url}/user/find/all`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            validateStatus: () => true
        })
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
            },
            validateStatus: () => true
        })
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

    const deleteUser = async (user) => {
        if (!use.superAdmin) {
            return
        }
        await axios.delete(`${url}/user/delete/${user._id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        getUsers()
    }

    const submitForm = async (e, user) => {
        e.preventDefault()
        // if (!user.paid) {
        //     //     return
        //     // }
        const val = e.target.role.value
        switch (val) {
            case "user":
                await axios.put(`${url}/user/update/${user._id}`, { superAdmin: false, admin: false }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                break;
            case "admin":
                await axios.put(`${url}/user/update/${user._id}`, { superAdmin: false, admin: true }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                break;
            case "super admin":
                if (!use.superAdmin) {
                    return
                }
                await axios.put(`${url}/user/update/${user._id}`, { superAdmin: true, admin: true }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                break;

            default:
                break;
        }
        getUsers()
    }

    const showFilter = () => {
        document.getElementById("filterList").classList.toggle("showFilter")
    }

    const theFilter = (val) => {
        showFilter()
        switch (val) {
            case "user":
                if (active === "user") {
                    setActive("")
                    setUsers(fil)
                } else {
                    const arr = fil.filter((fi) => !fi.admin && !fi.superAdmin)
                    setUsers(arr)
                    setActive("user")
                }
                break;
            case "admin":
                if (active === "admin") {
                    setActive("")
                    setUsers(fil)
                } else {
                    const arr = fil.filter((fi) => fi.admin && !fi.superAdmin)
                    setUsers(arr)
                    setActive("admin")
                }
                break;
            case "superAdmin":
                if (active === "superAdmin") {
                    setActive("")
                    setUsers(fil)
                } else {
                    const arr = fil.filter((fi) => fi.superAdmin)
                    setUsers(arr)
                    setActive("superAdmin")
                }
                break;

            default:
                break;
        }
    }

    return (
        <div className="adminDiv">
            <h2>{use?.superAdmin ? "Super admin" : "Admin"} dashboard</h2>
            <div className="inputDiv">
                <div>
                    <input onChange={filterUser} type="text" placeholder="Search user" />
                    <div>
                        <p onClick={showFilter}>Filter</p>
                        <ul id="filterList">
                            <li onClick={() => theFilter("user")} className={active === "user" ? "filterActive" : ""}>User</li>
                            <li onClick={() => theFilter("admin")} className={active === "admin" ? "filterActive" : ""}>Admin</li>
                            <li onClick={() => theFilter("superAdmin")} className={active === "superAdmin" ? "filterActive" : ""}>Super admin</li>
                        </ul>
                    </div>
                </div>
                <p onClick={() => navigate("/audit")}>Audit</p>
                <p onClick={() => navigate("/question/list")}>Bible trivial</p>
                <p>Hebrew game</p>
                {use?.superAdmin && <p onClick={() => navigate("/delete")}>To Be Deleted</p>}
            </div>
            <div>
                {
                    users.map((user, i) => (
                        <div key={i} className="adminInner">
                            <p>{user?.name} ~ {user?.username}</p>
                            <form onSubmit={(e) => submitForm(e, user)}>

                                <select name="role" id="role">
                                    <option value="user">User</option>
                                    <option selected={!user?.superAdmin && user?.admin && true} value="admin">Admin</option>
                                    {use?.superAdmin && <option selected={user?.superAdmin && true} value="super admin">Super admin</option>}
                                </select>
                                <button type="submit">Change</button>
                                {use?.superAdmin && <p onClick={() => deleteUser(user)}>Delete</p>}
                            </form>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Admin