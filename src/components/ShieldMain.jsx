import "./SwordMain.css"
import cancel from "../img/cancel.svg"
import bigdel from "../img/bigdel.svg"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import url from "../url"
import { Spinner } from "react-bootstrap"

const ShieldMain = () => {
    const id = localStorage.getItem("id")
    const [study, setStudy] = useState({})
    const [spin, setSpin] = useState(true)
    const [content, setContent] = useState({})
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const { idd } = useParams()
    const token = localStorage.getItem("token")

    const getStudy = async () => {
        try {
            const res = await axios.get(`${url}/sword/get/one/${idd}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                validateStatus: () => true
            })
            if (res.status !== 200) {
                navigate("/shield")
            }
            const rep = await res.data
            setStudy(rep)
            setSpin(false)
        } catch (error) {
            navigate("/shield")
        }
    }

    const getUser = async () => {
        const res = await axios.get(`${url}/user/get/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }, { validateStatus: () => true })
        const rep = await res.data
        setUser(rep)
    }

    useEffect(() => {
        if (!id) {
            navigate("/login")
        }
        getUser()
        getStudy()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const showModal = (id, value) => {
        setContent(value)
        document.getElementById(id).classList.toggle("show")
    }

    const deleteStudy = async () => {
        const res = await axios.put(`${url}/sword/update/${idd}`, { toBeDeleted: true }, {
            validateStatus: () => true,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const date = new Date().toLocaleString()
        const text = `${user.username} marked ${study.topic} to be deleted on ${date}`
        await axios.post(`${url}/audit/add`, { audit: text }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (res.status === 200) {
            navigate("/shield")
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
        <div className="theMain">
            <div className="mainFirst">
                <h4>Topic: {study?.topic}</h4>
                {user?.admin && <div>
                    <p onClick={() => navigate("/shield/create", { state: { study: study } })} className="mainEdit">Edit</p>
                    <p onClick={() => showModal("delDivX")} className="mainDel">Delete</p>
                </div>}
            </div>
            <h4 className="vers">Verses</h4>
            <div className="mainSecond">
                {
                    study?.scripture?.map((script, i) => (
                        <div key={i}>
                            <p className="mainVerse">{script?.verse}</p>
                            <div className="verseContentX"><p>{script?.verseContent}</p><span onClick={() => showModal("chapterx", script)}>see all{">>"}</span></div>
                        </div>
                    ))
                }
            </div>
            <div className="mainThird">
                <h3>Note</h3>
                <p>{study?.note}</p>
            </div>
            <div id="chapterx" className="chapterx">
                <div>
                    <h5>{content?.verse}</h5>
                    <img onClick={() => showModal("chapterx")} src={cancel} alt="" />
                </div>
                <p>{content?.verseContent}</p>
            </div>
            <div id="delDivX" className="delDivX">
                <div className="firstDel">
                    <img src={bigdel} alt="" />
                    <div>
                        <h5>Delete study</h5>
                        <p>Are you sure you want to delete this study? This action cannot be undone.</p>
                    </div>
                </div>
                <div className="secondDel">
                    <p onClick={() => showModal("delDivX")} className="delCan">Cancel</p>
                    <p onClick={deleteStudy} className="delDel">Delete</p>
                </div>
            </div>
        </div>
    )
}

export default ShieldMain