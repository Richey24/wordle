import "./QuestionList.css"
import edit from "../img/Edit.svg"
import del from "../img/Delete.svg"
import bigdel from "../img/bigdel.svg"
import { useEffect } from "react"
import { OverlayTrigger, Spinner, Tooltip } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import url from "../url"


const QuestionList = () => {
    const navigate = useNavigate()
    const id = localStorage.getItem("id")
    const [spin, setSpin] = useState(true)
    const [lists, setLists] = useState([])
    const [fit, setFit] = useState([])
    const [delId, setDelId] = useState("")
    const [user, setUser] = useState({})

    const getItems = async () => {
        const res = await axios.get(`${url}/quiz/get/all`, { validateStatus: () => true })
        const rep = await res.data
        const newArr = rep.filter((re) => re.toBeDeleted !== true)
        setFit(newArr)
        setLists(newArr)
        setSpin(false)
    }

    const getUser = async () => {
        const res = await axios.get(`${url}/user/get/${id}`, { validateStatus: () => true })
        const rep = await res.data
        setUser(rep)
    }

    useEffect(() => {
        if (!id) {
            // navigate("/admin/login")
        }
        getItems()
        getUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const showModal = (id, value) => {
        document.getElementById(id).classList.toggle("show")
        setDelId(value)
    }

    const filterItem = (e) => {
        const value = e.target.value
        const newArr = fit.filter((fi) => fi.question.toLowerCase().includes(value.toLowerCase()))
        setLists(newArr)
    }

    const deleteStudy = async () => {
        const res = await axios.put(`${url}/quiz/update/${delId._id}`, { toBeDeleted: true }, { validateStatus: () => true })
        const date = new Date().toLocaleString()
        const text = `${user.username} marked bible trivial question ${delId.question} to be deleted on ${date}`
        await axios.post(`${url}/audit/add`, { audit: text })
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
            <h1>Questions list</h1>
            <div className="swordSearch">
                <input onChange={filterItem} placeholder="Type to search" type="text" />
                <p onClick={() => navigate("/question/add")}>Add new question</p>
            </div>
            {
                lists.length < 1 ? (
                    <p className="empty">You have no question yet, create one</p>
                ) : (
                    <div className="swordMain">
                        {
                            lists.map((list, i) => (
                                <div key={i}>
                                    <div className="swordBtn" id="swordBtn">
                                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="edit">Edit</Tooltip>}>
                                            <img onClick={() => navigate("/question/add", { state: { list: list } })} style={{ marginRight: "20px" }} src={edit} alt="" />
                                        </OverlayTrigger>
                                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="delete">Delete</Tooltip>}>
                                            <img onClick={() => showModal("delDiv", list)} src={del} alt="" />
                                        </OverlayTrigger>
                                    </div>
                                    <div className="innerSword">
                                        <h4>{list?.question}</h4>
                                    </div>
                                    <div className="verses">
                                        {
                                            list?.answer?.map((ans, i) => (
                                                <p style={{ backgroundColor: ans?.correct ? "green" : "red", border: "none", color: "white" }} key={i}>{ans?.value}</p>
                                            ))
                                        }
                                    </div>
                                    <p className="theNote">{list.learnMore}</p>
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

export default QuestionList