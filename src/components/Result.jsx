import "./Result.css"
import cancel from "../img/cancel.svg"
import arrow from "../img/arrowblack.svg"
import { useNavigate } from "react-router-dom"

const Result = ({ noOfTry, time, num, setNum }) => {
    const navigate = useNavigate()
    const hideModal = () => {
        document.getElementById("resultDiv").style.display = "none"
    }
    const nextRound = () => {
        hideModal()
        setNum(num + 1)
        document.getElementById("startGame").style.display = "block"
        document.getElementById("bigDiv").style.display = "block"
    }
    return (
        <div id="resultDiv" className="resultDiv">
            <img onClick={hideModal} src={cancel} alt="cancel" className="cancel" />
            <h2>You Win</h2>
            <p>You completed stage {noOfTry[1]} using {(noOfTry[1] + 1) - (noOfTry[0] / noOfTry[1])} trials in {time} seconds</p>
            <p className="score">and your total score is {((noOfTry[0] / noOfTry[1]) / time).toFixed(2)}</p>
            <button onClick={nextRound} className="next">Next stage <img className="arrow" src={arrow} alt="" /></button>
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