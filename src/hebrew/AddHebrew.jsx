import { useState } from "react"
import { Spinner } from "react-bootstrap"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import "./AddHebrew.css"
import upload from "../img/upload.svg"
import axios from "axios"
import url from "../url"
import { useEffect } from "react"

const AddHebrew = () => {
    const [spin, setSpin] = useState(false)
    const [err, setErr] = useState(false)
    const [theErr, setTheErr] = useState("Something went wrong, try again")
    const { state } = useLocation()
    const [theImg, setTheImg] = useState("")
    const list = state?.list
    const navigate = useNavigate()
    const { deck } = useParams()

    useEffect(() => {
        if (list) {
            setTheImg(`https://absa7kzimnaf.blob.core.windows.net/newcontainer/${list.correctImage}`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const submitForm = async (e) => {
        setSpin(true)
        setErr(false)
        e.preventDefault()
        const token = sessionStorage.getItem("token")
        const data = new FormData()
        if (!list.correctImage && !e.target.correctImg.files[0]) {
            setTheErr("An Image Is Required")
            setErr(true)
            return
        }
        if (e.target.paleoHebrewText.value === list.paleoHebrewText && e.target.english.value === list.english && !e.target.correctImg.files[0]) {
            setTheErr("No Changes Was Made")
            setErr(true)
            return
        }
        if (e.target.correctImg.files[0]) {
            data.append("hebrew", e.target.correctImg.files[0], "hebrew")
        }
        data.append("paleoHebrewText", e.target.paleoHebrewText.value)
        data.append("english", e.target.english.value)
        data.append("deck", deck)
        if (list) {
            await axios.put(`${url}/hebrew/update/${list._id}`, data, { headers: { Authorization: `Bearer ${token}` }, validateStatus: () => true })
        } else {
            await axios.post(`${url}/hebrew/create`, data, { headers: { Authorization: `Bearer ${token}` }, validateStatus: () => true })
        }
        navigate(`/admin/hebrew/${deck}`)
    }

    const uploadImage = (e) => {
        const img = e.target.files[0]
        const url = URL.createObjectURL(img)
        setTheImg(url)
    }

    return (
        <div>
            <div className="questMain">
                <h2>{list ? "Edit word" : "Create a new word"}</h2>
                <form onSubmit={submitForm} className="questForm">
                    <label htmlFor="paleoHebrewText">Enter the Paleo-Hebrew Text</label>
                    <br />
                    <input required defaultValue={list?.paleoHebrewText} type="text" name="paleoHebrewText" id="paleoHebrewText" placeholder="Enter the Paleo-Hebrew Text" />
                    <br />
                    <br />
                    <label htmlFor="paleoHebrewText">Enter the english word</label>
                    <br />
                    <input required defaultValue={list?.english} type="text" name="english" id="english" placeholder="Enter the english word" />
                    <br />
                    <br />
                    {/* <input required defaultValue={list?.level} type="text" name="hebrewLevel" id="hebrewLevel" placeholder="Enter the level" />
                    <br />
                    <br /> */}
                    <h6>Upload the correct image</h6>
                    <label className="correctHebrewImg" htmlFor="correctImg"><img src={theImg ? theImg : upload} alt="" /></label>
                    <input accept="image" required={list ? false : true} onChange={uploadImage} type="file" name="correctImg" id="correctImg" hidden />
                    <br />
                    <div className="addQuestBtn">
                        <button className="createQuest" type="submit">{spin ? (<Spinner animation="border" color="#3d1152" />
                        ) : list ? "Edit word" : "Create word"} </button>
                        <button onClick={() => navigate(`/admin/hebrew/${deck}`)}>Cancel</button>
                    </div>
                    {err && <p style={{ color: "red" }}>{theErr}</p>}
                </form>
            </div>
        </div>
    )
}

export default AddHebrew