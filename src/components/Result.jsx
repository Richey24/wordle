import "./Result.css"
import cancel from "../img/cancel.svg"

const Result = ({ noOfTry, time }) => {
    const hideModal = () => {
        document.getElementById("resultDiv").style.display = "none"
    }
    return (
        <div id="resultDiv" className="resultDiv">
            <img onClick={hideModal} src={cancel} alt="cancel" className="cancel" />
            <h2>You Win</h2>
            <p>You used {(noOfTry[1] + 1) - (noOfTry[0] / noOfTry[1])} trials</p>
            <p>And {time} seconds</p>
        </div>
    )
}

export default Result