import "./Verify"
import mail from "../img/Artwork.svg"
import { useNavigate } from "react-router-dom"

const Verify = () => {
    const navigate = useNavigate()
    return (
        <div className="loginMainDiv">
            <div style={{ position: "relative", height: "600px" }} className="loginDiv">
                <div className="lockImage">
                    <img src={mail} alt="" />
                </div>
                <h1>Check your mail</h1>
                <p>We have sent an confirmation email</p>
                <p style={{ position: "absolute", bottom: "45px", left: "7%" }}>Did not receive email? <b>Check your spam folder</b> or <span>resend verification link</span></p>
                <p style={{ textAlign: "center", marginTop: "60px" }} onClick={() => navigate("/login")} className="forgotPass"><span>Back to login page</span></p>
            </div>

        </div>
    )
}

export default Verify