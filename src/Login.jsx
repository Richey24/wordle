import { useState } from "react"
import "./Login.css"

const Login = () => {
    const [reg, setReg] = useState(false)
    return (
        <div className="loginMainDiv">
            <div className="loginDiv">
                <h1>{reg ? "Register" : "Login to"} your account</h1>
                <form>
                    {reg && (<div>
                        <label htmlFor="name">Full Name</label>
                        <br />
                        <input type="text" id="name" placeholder="Enter your name" name="name" />
                    </div>)}
                    {reg && (<div>
                        <label htmlFor="username">Username</label>
                        <br />
                        <input type="text" id="username" placeholder="Pick a username" name="username" />
                    </div>)}
                    <div>
                        <label htmlFor="email">Email</label>
                        <br />
                        <input type="text" id="email" placeholder="Enter your email" name="email" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <br />
                        <input type="password" id="password" placeholder="Enter your password" name="password" />
                    </div>
                    {reg && (<div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <br />
                        <input type="password" id="confirmPassword" placeholder="Confirm your password" name="confirmPassword" />
                    </div>)}
                    <button>{reg ? "Register" : "Login"}</button>
                </form>
                {!reg && (<p>Don't have an account? <span onClick={() => setReg(!reg)}>Register</span></p>)}
                {reg && (<p>Already registered? <span onClick={() => setReg(!reg)}>Login</span></p>)}
            </div>
        </div>
    )
}

export default Login