import "./Sword.css"
import cancel from "../img/cancel.svg"
import edit from "../img/Edit.svg"
import del from "../img/Delete.svg"
import bigdel from "../img/bigdel.svg"
import { useEffect } from "react"
import { OverlayTrigger, Spinner, Tooltip } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import url from "../url"

const Sword = () => {
    const id = localStorage.getItem("id")
    const token = localStorage.getItem("token")
    const [studies, setStudies] = useState([])
    const [fit, setFit] = useState([])
    const [spin, setSpin] = useState(true)
    const [content, setContent] = useState({})
    const [delId, setDelId] = useState("")
    const navigate = useNavigate()

    const getItems = async () => {
        try {
            const res = await axios.get(`${url}/sword/get/all/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }, { validateStatus: () => true })
            if (res.status !== 200) {

            }
            const rep = await res.data
            setStudies(rep)
            setFit(rep)
            setSpin(false)
        } catch (error) {
            navigate("/login")
        }

    }

    useEffect(() => {
        if (!id) {
            navigate("/login")
        }
        window.scrollTo(0, 0)
        getItems()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const showModal = (id, value) => {
        setContent(value)
        setDelId(value)
        document.getElementById(id).classList.toggle("show")
    }

    const filterItem = (e) => {
        const value = e.target.value
        const newArr = fit.filter((fi) => fi.topic.toLowerCase().includes(value.toLowerCase()))
        setStudies(newArr)
    }

    const deleteStudy = async () => {
        const res = await axios.delete(`${url}/sword/delete/${delId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }, { validateStatus: () => true })
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
            <h1>My sword and shield</h1>
            <div className="swordSearch">
                <input onChange={filterItem} placeholder="Type to search" type="text" />
                <p onClick={() => navigate("/watchman/create")}>Add new</p>
            </div>
            {
                studies.length < 1 ? (
                    <p className="empty">You have no study yet, create one</p>
                ) : (
                    <div className="swordMain">
                        {
                            studies.map((study, i) => (
                                <div key={i}>
                                    <div className="swordBtn" id="swordBtn">
                                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="edit">Edit</Tooltip>}>
                                            <img onClick={() => navigate("/watchman/create", { state: { study: study } })} style={{ marginRight: "20px" }} src={edit} alt="" />
                                        </OverlayTrigger>
                                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="delete">Delete</Tooltip>}>
                                            <img onClick={() => showModal("delDiv", study._id)} src={del} alt="" />
                                        </OverlayTrigger>
                                    </div>
                                    <div onClick={() => navigate(`/watchman/${study?._id}`)} className="innerSword">
                                        <h4>{study?.topic}</h4>
                                    </div>
                                    <div className="verses">
                                        {
                                            study?.scripture?.map((script, i) => (
                                                <p key={i} onClick={() => showModal("chapter", script)} >{script?.verse}</p>
                                            ))
                                        }
                                    </div>
                                    <p onClick={() => navigate(`/watchman/${study?._id}`)} className="theNote">{study?.note}</p>
                                </div>
                            ))
                        }
                    </div>
                )
            }

            <div id="chapter" className="chapter">
                <div>
                    <h5>{content?.verse}</h5>
                    <img onClick={() => showModal("chapter")} src={cancel} alt="" />
                </div>
                <p>{content?.verseContent}</p>
            </div>
            <div id="delDiv" className="delDiv">
                <div className="firstDel">
                    <img src={bigdel} alt="" />
                    <div>
                        <h5>Delete study</h5>
                        <p>Are you sure you want to delete this study? This action cannot be undone.</p>
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

export default Sword