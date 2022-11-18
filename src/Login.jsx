import { useState } from "react"
import "./Login.css"
import lock from "./img/Lock.svg"
import mail from "./img/Artwork.svg"
import axios from "axios"
import url from "./url"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [reg, setReg] = useState("login")
    const [showErr, setShowErr] = useState(false)
    const [err, setErr] = useState("")
    const navigate = useNavigate()

    const submitForm = async (e) => {
        e.preventDefault()
        setShowErr(false)
        const user = {
            name: e.target.name?.value || "",
            username: e.target.username?.value || "",
            email: e.target.email?.value,
            password: e.target.password?.value,
            confirmPass: e.target.confirmPassword?.value || ""
        }

        console.log(user);

        if (reg === "register") {
            if (user.password !== user.confirmPass) {
                setErr("Confirm password is not the same as password")
                setShowErr(true)
                return
            }
            const res = await axios.post(`${url}/user/register`, user, { validateStatus: () => true })
            switch (res.status) {
                case 400:
                    setErr("Fill all required filled and try again")
                    setShowErr(true)
                    break;
                case 419:
                    setErr("This email is already registered, login or recover your password")
                    setShowErr(true)
                    break;
                case 203:
                    setErr("This username is already taken, try another username")
                    setShowErr(true)
                    break;
                case 500:
                    setErr("Something went wrong, try again")
                    setShowErr(true)
                    break;
                case 200:
                    const rep = await res.data
                    console.log(rep);
                    navigate('/home')
                    break;
                default:
                    break;
            }
            return
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
                    console.log(rep);
                    navigate('/home')
                    break;
                default:
                    break;
            }
        }

    }

    const recoverPass = async (e) => {
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
    }

    if (reg === "forgot") {
        return (
            <div className="loginMainDiv">
                <div className="loginDiv">
                    <h1>Forgot your Password?</h1>
                    <p>That’s okay, It happens! Enter your email and we’ll send you instructions</p>
                    {showErr && <h6>{err}</h6>}
                    <div className="lockImage">
                        <img src={lock} alt="" />
                    </div>
                    <form onSubmit={recoverPass}>
                        <div>
                            <label htmlFor="email">Email</label>
                            <br />
                            <input required type="text" id="email" placeholder="Enter your email" name="email" />
                        </div>
                        <button type="submit">Send instruction</button>
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
                <h1>{reg ? "Register" : "Login to"} your account</h1>
                {showErr && <h6>{err}</h6>}
                <form onSubmit={submitForm}>
                    {reg === "register" && (<div>
                        <label htmlFor="name">Full Name</label>
                        <br />
                        <input required type="text" id="name" placeholder="Enter your name" name="name" />
                    </div>)}
                    {reg === "register" && (<div>
                        <label htmlFor="username">Username</label>
                        <br />
                        <input required type="text" id="username" placeholder="Pick a username" name="username" />
                    </div>)}
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
                    {reg === "register" && (<div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <br />
                        <input required type="password" id="confirmPassword" placeholder="Confirm your password" name="confirmPassword" />
                    </div>)}
                    <button type="submit">{reg === "register" ? "Register" : "Login"}</button>
                </form>
                {reg === "login" && (<p>Don't have an account? <span onClick={() => { setShowErr(false); setReg("register") }}>Register</span></p>)}
                {reg === "register" && (<p>Already registered? <span onClick={() => { setShowErr(false); setReg("login") }}>Login</span></p>)}
                {reg === "login" && <p onClick={() => { setShowErr(false); setReg("forgot") }} className="forgotPass"><span>Forgot password</span></p>}
            </div>
        </div>
    )
}

export default Login