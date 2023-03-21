import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import url from "../url"
import empty from "../img/empty.png"
import "./ToBeDel.css"
import { Spinner } from "react-bootstrap"

const ToBeDel = () => {
    const [items, setItems] = useState([])
    const [questions, setQuestions] = useState([])
    const [user, setUser] = useState({})
    const [words, setWords] = useState([])
    const [spin, setSpin] = useState(true)
    const id = sessionStorage.getItem("id")
    const token = sessionStorage.getItem("token")
    const navigate = useNavigate()

    const getItems = async () => {
        const res = await axios.get(`${url}/sword/get/all/deleted/${true}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            validateStatus: () => true
        })
        const rep = await res.data
        const res1 = await axios.get(`${url}/quiz/get/all`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            validateStatus: () => true
        })
        const res2 = await axios.get(`${url}/hebrew/get/all`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            validateStatus: () => true
        })
        const rep2 = await res2.data
        const newArr1 = rep2.filter((re) => re.toBeDeleted === true)
        if (res.status !== 200 || res1.status !== 200 || res2.status !== 200) {
            navigate("/admin/login")
        }
        const rep1 = await res1.data
        const newArr = rep1.filter((re) => re.toBeDeleted === true)
        setItems(rep)
        setWords(newArr1)
        setQuestions(newArr)
        setSpin(false)
    }

    const getUser = async () => {
        const res = await axios.get(`${url}/user/get/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            validateStatus: () => true
        })
        if (res.status !== 200) {
            navigate("/admin/login")
            return
        }
        const rep = await res.data
        setUser(rep)
        if (token !== rep.mainToken) {
            sessionStorage.clear()
            navigate("/admin/login")
            return
        }
        if (!rep.superAdmin) {
            navigate("/admin")
        }
    }

    useEffect(() => {
        getItems()
        getUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const cancelDel = async (id) => {
        const res = await axios.put(`${url}/sword/update/${id}`, { toBeDeleted: false }, {
            validateStatus: () => true,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (res.status === 200) {
            getItems()
        }
    }

    const delItem = async (id) => {
        const res = await axios.delete(`${url}/sword/delete/${id}`, {
            validateStatus: () => true,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (res.status === 200) {
            getItems()
        }
    }

    const cancelQuest = async (id) => {
        const res = await axios.put(`${url}/quiz/update/${id}`, { toBeDeleted: false }, {
            validateStatus: () => true,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (res.status === 200) {
            getItems()
        }
    }
    const cancelWord = async (id) => {
        const res = await axios.put(`${url}/hebrew/update/${id}`, { toBeDeleted: false }, {
            validateStatus: () => true,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (res.status === 200) {
            getItems()
        }
    }

    const delQuest = async (id) => {
        const res = await axios.delete(`${url}/quiz/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            validateStatus: () => true
        })
        if (res.status === 200) {
            getItems()
        }
    }
    const delWord = async (id) => {
        const res = await axios.delete(`${url}/hebrew/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            validateStatus: () => true
        })
        if (res.status === 200) {
            getItems()
        }
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

    if (items.length < 1 && questions.length < 1 && words.length < 1) {
        return (
            <div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "20px", height: "90vh" }}>
                    <img style={{ width: "200px", height: "200px" }} src={empty} alt="" />
                    <h3 style={{ textAlign: "center" }}>No study, word or question to be deleted</h3>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="adminDel">
                <h3>Studies, Words and Questions marked to be deleted</h3>
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
                {
                    questions.map((item, i) => (
                        <div key={i}>
                            <p>{item?.question}</p>
                            <div>
                                <p onClick={() => delQuest(item?._id)}>Confirm delete</p>
                                <p onClick={() => cancelQuest(item?._id)}>Cancel</p>
                            </div>
                        </div>
                    ))
                }
                {
                    words.map((item, i) => (
                        <div key={i}>
                            <p>{item?.paleoHebrewText} {item?.english}</p>
                            <div>
                                <p onClick={() => delWord(item?._id)}>Confirm delete</p>
                                <p onClick={() => cancelWord(item?._id)}>Cancel</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ToBeDel