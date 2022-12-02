import "./Result.css"
import cancel from "../img/cancel.svg"
import arrow from "../img/arrowblack.svg"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"

const Result = ({ noOfTry, time, num, setNum, reset }) => {
    // eslint-disable-next-line no-unused-vars
    const [cookie, setCookie] = useCookies(["playedBible", "playedWord"])
    const navigate = useNavigate()
    const hideModal = () => {
        document.getElementById("resultDiv").style.display = "none"
    }
    const nextRound = () => {
        if (num === 1) {
            document.getElementById("hint").style.display = "none"
            hideModal()
            document.getElementById("startGame").style.display = "block"
            document.getElementById("bigDiv").style.display = "block"
            const date = new Date()
            const theDate = date.setDate(date.getDate() + 1)
            setCookie("playedBible", true, { expires: new Date(theDate) })
            navigate("/")
            return
        }
        if (num >= 7) {
            const date = new Date()
            const theDate = date.setDate(date.getDate() + 1)
            setCookie("playedWord", true, { expires: new Date(theDate) })
            navigate("/")
        }
        document.getElementById("hint").style.display = "none"
        hideModal()
        setNum(num + 1)
        document.getElementById("startGame").style.display = "block"
        document.getElementById("bigDiv").style.display = "block"
    }
    return (
        <div id="resultDiv" className="resultDiv">
            <img onClick={hideModal} src={cancel} alt="cancel" className="cancel" />
            <h2>You Win</h2>
            <p>You completed {num !== 1 ? `stage ${noOfTry[1]}` : "it"} using {(noOfTry[1] + 1) - (noOfTry[0] / noOfTry[1])} trials in {time} seconds</p>
            <p className="score">and your total score is {((noOfTry[0] / noOfTry[1]) / time).toFixed(2)}</p>
            <button onClick={nextRound} className="next">{num === 1 ? "Play again " : "Next stage "}<img className="arrow" src={arrow} alt="" /></button>
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