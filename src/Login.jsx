import { useState } from "react"
import "./Login.css"
import lock from "./img/Lock.svg"
import mail from "./img/Artwork.svg"
import axios from "axios"
import url from "./url"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { Alert, Spinner } from "react-bootstrap"

const Login = () => {
    const [reg, setReg] = useState("login")
    const [showErr, setShowErr] = useState(false)
    const [err, setErr] = useState("")
    const [spin, setSpin] = useState(false)
    const navigate = useNavigate()
    const loc = useLocation()
    const regi = loc.state?.reg

    useEffect(() => {
        if (regi) {
            setReg("register")
        }
    }, [regi])

    const submitForm = async (e) => {
        setSpin(true)
        e.preventDefault()
        setShowErr(false)
        const user = {
            email: e.target.email?.value,
            password: e.target.password?.value,
        }

        if (reg === "login") {
            const res = await axios.post(`${url}/user/login`, user, { validateStatus: () => true })
            switch (res.status) {
                case 400:
                    setErr("Fill all required filled and try again")
                    setShowErr(true)
                    break
                case 404:
                    setErr("No user found with this email")
                    setShowErr(true)
                    break;
                case 401:
                    setErr("Incorrect password")
                    setShowErr(true)
                    break;
                case 500:
                    setErr("Something went wrong, try again")
                    setShowErr(true)
                    break;
                case 200:
                    const rep = await res.data
                    localStorage.setItem('id', rep._id)
                    localStorage.setItem('token', rep.mainToken)
                    navigate('/')
                    break;
                default:
                    break;
            }
        }
        setSpin(false)
    }

    const recoverPass = async (e) => {
        setSpin(true)
        e.preventDefault()
        const email = e.target.email?.value
        const res = await axios.post(`${url}/user/reset/send`, { email: email }, { validateStatus: () => true })
        switch (res.status) {
            case 400:
                setErr("Fill all required filled and try again")
                setShowErr(true)
                break;
            case 404:
                setErr("No user found with this email")
                setShowErr(true)
                break;
            case 500:
                setErr("Something went wrong, try again")
                setShowErr(true)
                break;
            case 200:
                setReg("sent")
                break;
            default:
                break;
        }
        setSpin(false)
    }

    if (reg === "forgot") {
        return (
            <div className="loginMainDiv">
                <div className="loginDiv">
                    <h1>Forgot your Password?</h1>
                    <p>That’s okay, It happens! Enter your email and we’ll send you instructions</p>
                    {showErr && <Alert variant="danger">{err}</Alert>}
                    <div className="lockImage">
                        <img src={lock} alt="" />
                    </div>
                    <form onSubmit={recoverPass}>
                        <div>
                            <label htmlFor="email">Email</label>
                            <br />
                            <input required type="text" id="email" placeholder="Enter your email" name="email" />
                        </div>
                        {
                            spin ? (
                                <button><Spinner animation="border" color="white" /></button>
                            ) :
                                (
                                    <button type="submit">Send instruction</button>
                                )
                        }
                    </form>
                    <p onClick={() => { setShowErr(false); setReg("login") }} className="forgotPass"><span>Back to login page</span></p>
                </div>
            </div>
        )
    }

    if (reg === "sent") {
        return (
            <div className="loginMainDiv">
                <div style={{ position: "relative" }} className="loginDiv">
                    <div className="lockImage">
                        <img src={mail} alt="" />
                    </div>
                    <h1>Check your mail</h1>
                    <p>We have sent an instructions to recover your password to your mail</p>
                    <p style={{ position: "absolute", bottom: "45px", left: "7%" }}>Did not receive email? Check your spam folder or <span>resend verification link</span></p>
                    <p style={{ position: "absolute", bottom: "10px", left: "40%" }} onClick={() => { setShowErr(false); setReg("login") }} className="forgotPass"><span>Back to login page</span></p>
                </div>
            </div>
        )
    }

    return (
        <div className="loginMainDiv">
            <div className="loginDiv">
                <h1>Login your account</h1>
                {showErr && <Alert variant="danger">{err}</Alert>}
                <form onSubmit={submitForm}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <br />
                        <input required type="text" id="email" placeholder="Enter your email" name="email" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <br />
                        <input required type="password" id="password" placeholder="Enter your password" name="password" />
                    </div>
                    {
                        spin ? (
                            <button><Spinner animation="border" color="white" /></button>
                        ) :
                            (
                                <button type="submit">Login</button>
                            )
                    }
                </form>
                <p>Don't have an account? <span onClick={() => { setShowErr(false); navigate("/register") }}>Register</span></p>
                <p onClick={() => { setShowErr(false); setReg("forgot") }} className="forgotPass"><span>Forgot password</span></p>
                <p onClick={() => navigate("/")} className="forgotPass"><span>Home</span></p>
            </div>
        </div>
    )
}

export default Login