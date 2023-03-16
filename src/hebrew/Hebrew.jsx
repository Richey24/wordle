import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { OverlayTrigger, Spinner, Tooltip } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import url from "../url"
import edit from "../img/Edit.svg"
import del from "../img/Delete.svg"
import bigdel from "../img/bigdel.svg"
import empty from "../img/empty.png"
import "./Hebrew.css"

const Hebrew = () => {
    const id = sessionStorage.getItem("id")
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [spin, setSpin] = useState(false)
    const [lists, setLists] = useState([])
    const [fit, setFit] = useState([])
    const [delId, setDelId] = useState("")
    const token = sessionStorage.getItem("token")
    const { deck } = useParams()

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

    const getItems = async () => {
        const res = await axios.get(`${url}/hebrew/get/deck/${deck}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            validateStatus: () => true
        })
        const rep = await res.data
        console.log(rep);
        const newArr = rep.filter((re) => re.toBeDeleted !== true)
        setFit(newArr)
        setLists(newArr)
        setSpin(false)
    }

    useEffect(() => {
        // getUser()
        getItems()
    }, [])


    const showModal = (id, value) => {
        document.getElementById(id).classList.toggle("showDelModal")
        setDelId(value)
    }

    const filterItem = (e) => {
        const value = e.target.value
        const newArr = fit.filter((fi) => fi.english.toLowerCase().includes(value.toLowerCase()))
        setLists(newArr)
    }

    const deleteStudy = async () => {
        const res = await axios.put(`${url}/hebrew/update/${delId._id}`, { toBeDeleted: true }, {
            validateStatus: () => true,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const date = new Date().toLocaleString()
        const text = `${user.username} marked hebrew word ${delId.paleoHebrewText} to be deleted on ${date}`
        await axios.post(`${url}/audit/add`, { audit: text }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (res.status === 200) {
            showModal("delDiv")
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

    return (
        <div className="swordDiv">
            <h1>Deck {deck} List</h1>
            <div id="hebrewSearch" className="swordSearch">
                <input onChange={filterItem} placeholder="Type to search" type="text" />
                <p onClick={() => navigate(`/admin/add/hebrew/${deck}`)}>Add new word</p>
            </div>
            {
                lists.length < 1 ? (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "20px" }}>
                        <img src={empty} alt="" />
                        <p className="empty">You have not create any hebrew word, create one</p>
                    </div>
                ) : (
                    <div className="hebrewMain">
                        {
                            lists.reverse().map((list, i) => (
                                <div key={i}>
                                    <div className="hebrewBtn" id="hebrewBtn">
                                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="edit">Edit</Tooltip>}>
                                            <img onClick={() => navigate(`/admin/add/hebrew/${deck}`, { state: { list: list } })} style={{ marginRight: "20px" }} src={edit} alt="" />
                                        </OverlayTrigger>
                                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="delete">Delete</Tooltip>}>
                                            <img onClick={() => showModal("delDiv", list)} src={del} alt="" />
                                        </OverlayTrigger>
                                    </div>
                                    <div className="hebrewImageDiv">
                                        <img className="hebrewImage" src={`https://absa7kzimnaf.blob.core.windows.net/newcontainer/${list.correctImage}`} alt="" />
                                        <div style={{ marginTop: "20px" }}>
                                            <h6>Hebrew word</h6>
                                            <h6>English meaning</h6>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }

            <div id="delDiv" className="delDiv">
                <div className="firstDel">
                    <img src={bigdel} alt="" />
                    <div>
                        <h5>Delete question</h5>
                        <p>Are you sure you want to delete this question? This action cannot be undone.</p>
                    </div>
                </div>
                <div className="secondDel">
                    <p onClick={() => showModal("delDiv")} className="delCan">Cancel</p>
                    <p onClick={deleteStudy} className="delDel">Delete</p>
                </div>
            </div>
        </div>
    )
}

export default Hebrew