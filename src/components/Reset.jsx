import { useState } from "react"
import "../Login.css"
import lock from "../img/Lock.svg"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import url from "../url"
import { Alert, Spinner } from "react-bootstrap"

const Reset = () => {
    const [success, setSuccess] = useState(false)
    const [showErr, setShowErr] = useState(false)
    const [spin, setSpin] = useState(false)
    const [err, setErr] = useState("")
    const { token } = useParams()
    const navigate = useNavigate()

    const resetPass = async (e) => {
        setSpin(true)
        e.preventDefault()
        setShowErr(false)
        const userPass = {
            password: e.target.password.value,
            confirmPass: e.target.confirmPass.value
        }
        if (userPass.password.length < 8) {
            setErr('Password must be at least 8 characters')
            setShowErr(true)
            setSpin(false)
            return
        }
        if (userPass.password !== userPass.confirmPass) {
            setErr("Confirm password must the same as password")
            setShowErr(true)
            setSpin(false)
            return
        }
        const res = await axios.post(`${url}/user/reset/password`, userPass, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            validateStatus: () => true
        })
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
        setSpin(false)
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
                {showErr && <Alert variant="danger">{err}</Alert>}
                <form onSubmit={resetPass}>
                    <div>
                        <label htmlFor="password">Password</label>
                        <br />
                        <input required type="password" id="password" placeholder="********" name="password" />
                        <label style={{ marginTop: "1rem" }} htmlFor="confirmPass">Confirm Password</label>
                        <br />
                        <input required type="password" id="confirmPass" placeholder="********" name="confirmPass" />
                    </div>
                    {
                        spin ? (
                            <button><Spinner animation="border" color="white" /></button>
                        ) :
                            (
                                <button type="submit">Reset Password</button>
                            )
                    }
                </form>
            </div>
        </div>
    )
}

export default Reset