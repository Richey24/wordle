import "./AddQuest.css"
import axios from "axios"
import url from "../url"
import { useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"
import { Spinner } from "react-bootstrap"
import TheHeader from "../components/TheHeader"

const AddQuest = () => {

    const navigate = useNavigate()
    const { state } = useLocation()
    const list = state?.list
    const [spin, setSpin] = useState(false)
    const [err, setErr] = useState(false)
    const token = sessionStorage.getItem("token")

    // document.addEventListener("keydown", (e) => {
    //     if (e.key === "Backspace") {
    //         new Audio(require("../sound/backspace.mp3")).play()
    //     } else {
    //         new Audio(require("../sound/keyPress.mp3")).play()
    //     }
    // })

    const submitForm = async (e) => {
        setErr(false)
        e.preventDefault()
        setSpin(true)
        const arr = [
            {
                value: e.target.correctAnswer.value,
                correct: true,
            },
            {
                value: e.target.wrongAnswer1.value,
                correct: false,
            },
            {
                value: e.target.wrongAnswer2.value,
                correct: false,
            },
            {
                value: e.target.wrongAnswer3.value,
                correct: false,
            },
        ]

        const body = {
            question: e.target.question.value,
            answer: arr,
            learnMore: e.target.learnMore.value
        }
        if (list) {
            const res = await axios.put(`${url}/quiz/update/${list._id}`, body, {
                validateStatus: () => true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setSpin(false)
            if (res.status === 200) {
                navigate("/admin/trivial")
            } else {
                setErr(true)
            }
            return
        }
        const res = await axios.post(`${url}/quiz/create`, body, {
            validateStatus: () => true,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setSpin(false)
        if (res.status === 200) {
            navigate("/admin/trivial")
        } else {
            setErr(true)
        }
    }

    return (
        <div>
            <TheHeader admin={true} />
            <div className="questMain">
                <h2>{list ? "Edit your question" : "Create a new question"}</h2>
                <form onSubmit={submitForm} className="questForm">
                    <label htmlFor="question">Question</label>
                    <br />
                    <input defaultValue={list?.question} type="text" name="question" id="question" placeholder="Enter the question" />
                    <h6>Answers</h6>
                    <input defaultValue={list?.answer[0]?.value} type="text" name="correctAnswer" id="correctAnswer" placeholder="Enter the correct answer" />
                    <br />
                    <br />
                    <input defaultValue={list?.answer[1]?.value} type="text" name="wrongAnswer1" id="wrongAnswer1" placeholder="Enter a wrong answer" />
                    <br />
                    <br />
                    <input defaultValue={list?.answer[2]?.value} type="text" name="wrongAnswer2" id="wrongAnswer2" placeholder="Enter a wrong answer" />
                    <br />
                    <br />
                    <input defaultValue={list?.answer[3]?.value} type="text" name="wrongAnswer3" id="wrongAnswer3" placeholder="Enter a wrong answer" />
                    <br />
                    <br />
                    <br />
                    <label htmlFor="learnMore">Enter the learn more content</label>
                    <br />
                    <textarea defaultValue={list?.learnMore} className="learnMoreArea" name="learnMore" id="learnMore"></textarea>
                    <br />
                    <div className="addQuestBtn">
                        <button className="createQuest" type="submit">{spin ? (<Spinner animation="border" color="#3d1152" />
                        ) : list ? "Edit question" : "Create question"} </button>
                        <button onClick={() => navigate("/admin/trivial")}>Cancel</button>
                    </div>
                    {err && <p style={{ color: "red" }}>Something went wrong, try again</p>}
                </form>
            </div>
        </div>
    )
}

export default AddQuest