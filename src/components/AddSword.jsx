import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { Spinner } from "react-bootstrap"
import { useLocation, useNavigate } from "react-router-dom"
import url from "../url"
import "./AddSword.css"

const AddSword = () => {
    const id = localStorage.getItem("id")
    const { state } = useLocation()
    const study = state?.study
    const navigate = useNavigate()
    const [spin, setSpin] = useState(false)
    const [err, setErr] = useState(false)
    const [arr, setArr] = useState(['a'])

    useEffect(() => {
        if (!id) {
            navigate("/")
        }
        if (study) {
            setArr(study.scripture)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const submitSword = async (e) => {
        setSpin(true)
        e.preventDefault()
        const body = {
            topic: e.target.topic.value,
            scripture: [],
            note: e.target.note.value,
            userId: id,
            admin: false
        }
        const theVerses = document.getElementsByClassName("theVerse")
        Array.from(theVerses).forEach((theVerse) => {
            body.scripture.push({
                verse: theVerse.children.verse.value,
                verseContent: theVerse.children.verseContent.value
            })
        })

        if (study) {
            const res = await axios.put(`${url}/sword/update/${study._id}`, body, { validateStatus: () => true })
            switch (res.status) {
                case 500:
                    setErr(true)
                    break;
                case 200:
                    navigate("/watchman")
                    break
                default:
                    setErr(true)
                    break;
            }
            setSpin(false)
            return
        }

        const res = await axios.post(`${url}/sword/create`, body, { validateStatus: () => true })
        switch (res.status) {
            case 500:
                setErr(true)
                break;
            case 200:
                navigate("/watchman")
                break
            default:
                setErr(true)
                break;
        }
        setSpin(false)
    }

    const addAnother = () => {
        setArr([...arr, "b"])
    }

    return (
        <div className="addMain">
            <h2>{study ? "Edit your study" : "Create a new study"}</h2>
            <form className="addForm" onSubmit={submitSword}>
                <label htmlFor="topic">Topic</label>
                <br />
                <input defaultValue={study?.topic} placeholder="Enter the topic of your new study" required className="topic" type="text" id="topic" name="topic" />
                <h6 htmlFor="">Precepts</h6>
                {
                    arr.map((ar, i) => (
                        <div key={i} className="theVerse">
                            <hr />
                            <label htmlFor="">Precept</label>
                            <br />
                            <input defaultValue={study ? ar?.verse : ''} placeholder="Enter a bible precept" className="topic" type="text" name="verse" />
                            <br />
                            <br />
                            <label htmlFor="">Precept content</label>
                            <br />
                            <textarea defaultValue={study ? ar?.verseContent : ''} placeholder="Enter the precept content" className="verseContent" name="verseContent"></textarea>
                        </div>
                    ))
                }
                <p onClick={addAnother} className="another">Add another precept</p>
                <br />
                <br />
                <label htmlFor="">Note</label>
                <br />
                <textarea defaultValue={study?.note} placeholder="Enter study note" className="note" name="note"></textarea>
                <br />
                <button className="createStudy">{spin ? (<Spinner animation="border" color="#3d1152" />
                ) : study ? "Edit study" : "Create study"}</button>
                {err && <p style={{ color: "red" }}>Something went wrong, try again</p>}
            </form>
        </div>
    )
}

export default AddSword