import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import url from "../url"
import { useEffect } from "react"
import { useState } from "react"

const VerifyUser = () => {
    const { id } = useParams()
    const [err, setErr] = useState(false)
    const navigate = useNavigate()

    const verifyUser = async () => {
        const res = await axios.post(`${url}/user/confirm/${id}`, {}, { validateStatus: () => true })
        if (res.status !== 200) {
            setErr(true)
            return
        }
        setTimeout(() => {
            navigate("/login")
        }, 1500)
    }
    useEffect(() => {
        verifyUser()
    })
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", padding: "20px" }}>
            {
                err ?
                    (
                        <p>Something went wrong, try again</p>
                    ) :
                    (
                        <p>Your account have been confirmed, redirecting to the login page...</p>
                    )
            }
        </div>
    )
}

export default VerifyUser