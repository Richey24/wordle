import "./AddQuest.css"
import axios from "axios"
import url from "../url"
import { useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"
import { Spinner } from "react-bootstrap"

const AddQuest = () => {

    const navigate = useNavigate()
    const { state } = useLocation()
    const list = state?.list
    const [spin, setSpin] = useState(false)
    const [err, setErr] = useState(false)
    const token = localStorage.getItem("token")

    const submitForm = async (e) => {
        setErr(false)
        e.preventDefault()
        setSpin(true)
        const body = {
            question: e.target.question.value,
            answer: [
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
            ],
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
                navigate("/question/list")
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
            navigate("/question/list")
        } else {
            setErr(true)
        }
    }

    return (
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
                <button className="createQuest" type="submit">{spin ? (<Spinner animation="border" color="#3d1152" />
                ) : list ? "Edit" : "Create"} question</button>
                {err && <p style={{ color: "red" }}>Something went wrong, try again</p>}
            </form>
        </div>
    )
}

export default AddQuest