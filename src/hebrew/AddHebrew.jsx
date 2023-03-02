import { useState } from "react"
import { Spinner } from "react-bootstrap"
import { useLocation, useNavigate } from "react-router-dom"
import "./AddHebrew.css"
import upload from "../img/upload.svg"

const AddHebrew = () => {
    const [spin, setSpin] = useState(false)
    const [err, setErr] = useState(false)
    const [theImg, setTheImg] = useState("")
    const { state } = useLocation()
    const list = state?.list
    const navigate = useNavigate()

    const submitForm = async (e) => {

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
                    <label htmlFor="paleoHebrewText">New Word</label>
                    <br />
                    <input defaultValue={list?.paleoHebrewText} type="text" name="paleoHebrewText" id="paleoHebrewText" placeholder="Enter the paleoHebrewText" />
                    <br />
                    <br />
                    <input defaultValue={list?.english} type="text" name="english" id="english" placeholder="Enter the english word" />
                    <br />
                    <br />
                    <input defaultValue={list?.level} type="text" name="hebrewLevel" id="hebrewLevel" placeholder="Enter the level" />
                    <br />
                    <br />
                    <h6>Upload the correct image</h6>
                    <label className="correctHebrewImg" htmlFor="correctImg"><img src={theImg ? theImg : upload} alt="" /></label>
                    <input onChange={uploadImage} type="file" name="correctImg" id="correctImg" hidden />
                    <br />
                    <div className="addQuestBtn">
                        <button className="createQuest" type="submit">{spin ? (<Spinner animation="border" color="#3d1152" />
                        ) : list ? "Edit word" : "Create word"} </button>
                        <button onClick={() => navigate("/admin/hebrew")}>Cancel</button>
                    </div>
                    {err && <p style={{ color: "red" }}>Something went wrong, try again</p>}
                </form>
            </div>
        </div>
    )
}

export default AddHebrew