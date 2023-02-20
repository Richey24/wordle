import axios from "axios";
import { useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import THeHeader from "./components/TheHeader";
import url from "./url";


const AdminLogin = () => {
    const [spin, setSpin] = useState(false)
    const [showErr, setShowErr] = useState(false)
    const [err, setErr] = useState("")
    const navigate = useNavigate()

    const submitForm = async (e) => {
        setSpin(true)
        e.preventDefault()
        setShowErr(false)
        const user = {
            email: e.target.email?.value,
            password: e.target.password?.value,
        }
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
                if (rep.admin) {
                    sessionStorage.setItem('id', rep._id)
                    sessionStorage.setItem('token', rep.mainToken)
                    navigate('/admin')
                } else {
                    setErr("You are not an admin")
                    setShowErr(true)
                }
                break;
            default:
                break;
        }
        setSpin(false)
    }

    return (
        <div>
            <THeHeader />
            <div className="loginMainDiv">
                <div className="loginDiv">
                    <h1>Admin login</h1>
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
                </div>
            </div>
        </div>
    )
}

export default AdminLogin