import { useEffect } from "react"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "./Names.css"

const Names = () => {
    const [arr, setArr] = useState([1])
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
    return (
        <div className="mainNames">
            <form onSubmit={submitForm}>
                <h4>Enter player(s) name</h4>
                {
                    arr.map((ar, i) => (
                        <input required className="playerName" key={i} placeholder={`Enter player ${ar} name`} type="text" />
                    ))
                }
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Names