import "./Result.css"
import cancel from "../img/cancel.svg"
import arrow from "../img/arrowblack.svg"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import url from "../url"

const Result = ({ noOfTry, time, num, setNum, user }) => {
    const id = localStorage.getItem("id")
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const hideModal = () => {
        document.getElementById("resultDiv").style.display = "none"
    }
    const showModal = (id) => {
        document.getElementById(id).classList.toggle("showBlock")
    }
    const nextRound = async () => {

        if (num === 1) {
            document.getElementById("hint").style.display = "none"
            hideModal()
            document.getElementById("startGame").style.display = "block"
            document.getElementById("bigDiv").style.display = "block"
            if (id) {
                const res = await axios.get(`${url}/user/get/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const rep = await res.data
                const body = {
                    dailyBQS: Number(rep.dailyBQS) + Number((((noOfTry[0] / noOfTry[1]) / time) * 300).toFixed(2)),
                    playedBible: true
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
            return
        }
        if (id) {
            const res = await axios.get(`${url}/user/get/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const rep = await res.data
            const body = {
                dailyWQS: Number(rep.dailyWQS) + Number((((noOfTry[0] / noOfTry[1]) / time) * 300).toFixed(2))
            }
            await axios.put(`${url}/user/update/${id}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }
        if (!user.paid) {
            hideModal()
            showModal("swordSub")
        }
        document.getElementById("hint").style.display = "none"
        hideModal()
        setNum(num + 1)
        document.getElementById("startGame").style.display = "block"
        document.getElementById("bigDiv").style.display = "block"
    }

    return (
        <div>
            <div id="swordSub" className="swordSub">
                <p>You can only play up to stage 5 for the free plan, subscribe to play up to 15 stages</p>
                <button class="block w-full bg-purple-600 hover:bg-purple-400 text-white font-bold py-2 px-4 border-b-4 border-purple-700 hover:border-purple-500 rounded" onClick={() => navigate("/subscription")}>Subscribe</button>
                <button class="block w-full bg-purple-600 hover:bg-purple-400 text-white font-bold py-2 px-4 border-b-4 border-purple-700 hover:border-purple-500 rounded" onClick={() => navigate("/")}>Cancel</button>
            </div>
            <div id="resultDiv" className="resultDiv">
                <img onClick={nextRound} src={cancel} alt="cancel" className="cancel" />
                <h2>You Win</h2>
                <p>You completed {num !== 1 ? `stage ${noOfTry[1]}` : "it"} using {(noOfTry[1] + 1) - (noOfTry[0] / noOfTry[1])} trials in {time} seconds</p>
                <p className="score">and your total score is {(((noOfTry[0] / noOfTry[1]) / time) * 300).toFixed(2)}</p>
                <button onClick={nextRound} className="nextX">{num === 1 ? "Play again " : "Next stage "}<img className="arrow" src={arrow} alt="" /></button>
                <div className="authDiv">
                    <p>Link your stats to all your devices and compete with others on the leaderboard</p>
                    {!id && <button onClick={() => navigate("/login")}>Log in or create a free account</button>}
                </div>
                <div style={{ paddingTop: "40px" }} className="authDiv">
                    <button>Play bible trivial</button>
                </div>
            </div>
        </div>
    )
}

export default Result