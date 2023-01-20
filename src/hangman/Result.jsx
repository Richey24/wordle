import React from 'react'
import "./Result.css"
import cancel from "../img/cancel.svg"
import arrow from "../img/arrowblack.svg"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import url from '../url'

const Result = ({ time, trial, user }) => {
    const navigate = useNavigate()
    const id = localStorage.getItem("id")
    const token = localStorage.getItem("token")

    const hideModal = async () => {
        if (id) {
            const res = await axios.get(`${url}/user/get/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const rep = await res.data
            const body = {
                hangmanScore: Number(rep.hangmanScore) + Number(((6 - trial.length) / time).toFixed(2)),
                playedHang: true
            }
            await axios.put(`${url}/user/update/${id}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }
        if (user.paid) {
            navigate(0)
        } else {
            navigate("/")
        }
    }

    const nextRound = async () => {
        if (id) {
            const res = await axios.get(`${url}/user/get/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const rep = await res.data
            const body = {
                dailyHS: Number(rep.dailyHS) + Number(((6 - trial.length) / time).toFixed(2)),
                playedHang: true
            }
            await axios.put(`${url}/user/update/${id}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }
        if (user.paid) {
            navigate(0)
        } else {
            navigate("/")
        }
    }
    return (
        <div id="hangResultDiv" className="hangResultDiv">
            <img onClick={hideModal} src={cancel} alt="cancel" className="cancel" />
            <h2>You Win</h2>
            <p>You completed this round within {time} seconds</p>
            <p className="score">and your total score is {((6 - trial.length) / time).toFixed(2)}</p>
            <button onClick={nextRound} className="next">Play again <img className="arrow" src={arrow} alt="" /></button>
            <div className="authDiv">
                <p>Link your stats to all your devices and compete with others on the leaderboard</p>
                <button onClick={() => navigate("/login")}>Log in or create a free account</button>
            </div>
            <div style={{ paddingTop: "40px" }} className="authDiv">
                <button>Play bible trivial</button>
            </div>
        </div>
    )
}

export default Result