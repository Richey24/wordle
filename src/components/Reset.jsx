import { useState } from "react"
import "../Login.css"
import lock from "../img/Lock.svg"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import url from "../url"

const Reset = () => {
    const [success, setSuccess] = useState(false)
    const [showErr, setShowErr] = useState(false)
    const [err, setErr] = useState("")
    const { id } = useParams()
    const navigate = useNavigate()

    const resetPass = async (e) => {
        e.preventDefault()
        setShowErr(false)
        const userPass = {
            password: e.target.password.value,
            confirmPass: e.target.confirmPass.value
        }
        if (userPass.password.length < 8) {
            setErr('Password must be at least 8 characters')
            setShowErr(true)
            return
        }
        if (userPass.password !== userPass.confirmPass) {
            setErr("Confirm password must the same as password")
            setShowErr(true)
            return
        }
        const res = await axios.post(`${url}/user/reset/password/${id}`, userPass)
        switch (res.status) {
            case 400:
                setErr("Fill all required filled and try again")
                setShowErr(true)
                break
            case 404:
                setErr("No user found")
                setShowErr(true)
                break;
            case 500:
                setErr("Something went wrong, try again")
                setShowErr(true)
                break;
            case 200:
                setSuccess(true)
                break;
            default:
                break;
        }
    }

    if (success) {
        return (
            <div className="loginMainDiv">
                <div style={{ position: "relative" }} className="loginDiv">
                    <div className="lockImage">
                        <img src={lock} alt="" />
                    </div>
                    <h1>Password Reset successfully</h1>
                    <p>You can now go ahead and log in</p>
                    <button onClick={() => navigate("/login")}>Login</button>
                </div>
            </div>
        )
    }

    return (
        <div className="loginMainDiv">
            <div className="loginDiv">
                <h1>Create new password</h1>
                <p>Your new password must be different from previous used passwords</p>
                {showErr && <h6>{err}</h6>}
                <form onSubmit={resetPass}>
                    <div>
                        <label htmlFor="password">Password</label>
                        <br />
                        <input required type="password" id="password" placeholder="********" name="password" />
                        <label style={{ marginTop: "1rem" }} htmlFor="confirmPass">Confirm Password</label>
                        <br />
                        <input required type="password" id="confirmPass" placeholder="********" name="confirmPass" />
                    </div>
                    <button type="submit">Reset Password</button>
                </form>
            </div>
        </div>
    )
}

export default Reset