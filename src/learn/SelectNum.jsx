import { useNavigate } from "react-router-dom"
import "./SelectNum.css"

const SelectNum = () => {
    const navigate = useNavigate()
    return (
        <div className="mainNum">
            <p>Choose the number of players</p>
            <div>
                <div onClick={() => navigate("/bible/names", { state: { count: [1] } })}>
                    <h2>1</h2>
                    <p>player</p>
                </div>
                <div onClick={() => navigate("/bible/names", { state: { count: [1, 2] } })}>
                    <h2>2</h2>
                    <p>players</p>
                </div>
                <div onClick={() => navigate("/bible/names", { state: { count: [1, 2, 3] } })}>
                    <h2>3</h2>
                    <p>players</p>
                </div>
                <div onClick={() => navigate("/bible/names", { state: { count: [1, 2, 3, 4] } })}>
                    <h2>4</h2>
                    <p>players</p>
                </div>
            </div>
        </div>
    )
}

export default SelectNum