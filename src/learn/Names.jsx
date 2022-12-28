import { useEffect } from "react"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "./Names.css"
import drop from "../img/drop.svg"

const Names = () => {
    const [arr, setArr] = useState([1])
    const [tribe, setTribe] = useState(["Asher"])
    const { state } = useLocation()
    const navigate = useNavigate()
    const count = state?.count

    useEffect(() => {
        if (!count) {
            navigate("/bible/select")
            return
        }
        setArr(count)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const submitForm = (e) => {
        e.preventDefault()
        const names = []
        const playersName = document.getElementsByClassName("playerName")
        Array.from(playersName).forEach((theName) => {
            names.push(theName.value)
        })
        navigate("/bible/game")
    }

    const selectTribe = (value) => {
        document.getElementById(value).classList.toggle("show")
    }

    const getTribe = (value) => {
        setTribe(value)
        selectTribe()
    }

    return (
        <div className="mainNames">
            <form onSubmit={submitForm}>
                <h4>Enter player(s) name</h4>
                {
                    arr.map((ar, i) => (
                        <div key={i} >
                            <input required className="playerName" placeholder={`Enter player ${ar} name`} type="text" />
                            <div className='tribeDiv'>
                                <label>Select player {ar} tribe</label>
                                <p onClick={() => selectTribe(`tribe${i}`)} className='tribeMain'>{tribe[0]} <img src={drop} alt="" /></p>
                                <ul id={`tribe${i}`} className='tribeList'>
                                    <li onClick={() => getTribe(["Asher"])}>Asher</li>
                                    <li onClick={() => getTribe(["Dan"])}>Dan</li>
                                    <li onClick={() => getTribe(["Ephraim"])}>Ephraim</li>
                                    <li onClick={() => getTribe(["Gad"])}>Gad</li>
                                    <li onClick={() => getTribe(["Issachar"])}>Issachar</li>
                                    <li onClick={() => getTribe(["Manasseh"])}>Manasseh</li>
                                    <li onClick={() => getTribe(["Naphtali"])}>Naphtali</li>
                                    <li onClick={() => getTribe(["Reuben"])}>Reuben</li>
                                    <li onClick={() => getTribe(["Simeon"])}>Simeon</li>
                                    <li onClick={() => getTribe(["Zebulun"])}>Zebulun</li>
                                    <li onClick={() => getTribe(["Judah"])}>Judah</li>
                                    <li onClick={() => getTribe(["Benjamin"])}>Benjamin</li>
                                </ul>
                            </div>
                        </div>
                    ))
                }
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Names