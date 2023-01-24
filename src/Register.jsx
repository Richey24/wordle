import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Alert, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import url from './url'
import drop from "./img/drop.svg"
import benjamin from "./img/benjamin.png"
import dan from "./img/dan.png"
import ephraim from "./img/ephraim.png"
import gad from "./img/gad.png"
import issachar from "./img/issachar.png"
import joseph from "./img/joseph.png"
import judah from "./img/judah.png"
import levi from "./img/levi.png"
import manasseh from "./img/manasseh.png"
import naftali from "./img/naftali.png"
import reuben from "./img/reuben.png"
import simeon from "./img/simeon.png"
import zebulun from "./img/zebulun.png"
import asher from "./img/asher.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/fontawesome-free-solid'

const Register = () => {
    const [spin, setSpin] = useState(false)
    const [showErr, setShowErr] = useState(false)
    const [err, setErr] = useState("")
    const [num, setNum] = useState(1)
    const [first, setFirst] = useState({})
    const [tribe, setTribe] = useState(["Asher", "rgb(111, 111, 21)"])
    const navigate = useNavigate()

    const submitForm = async (e) => {
        setSpin(true)
        e.preventDefault()
        setShowErr(false)
        const user = {
            name: first.name,
            username: first.username,
            email: first.email,
            tribe: tribe,
            admin: false,
            password: e.target.password?.value,
            confirmPass: e.target.confirmPassword?.value || "",
            dailyWQS: 0,
            dailyBQS: 0,
            dailyHS: 0,
            paid: false,
            playedTrivial: false,
            playedBible: false,
            playedHang: false,
            superAdmin: false
        }
        if (user.password.length < 8) {
            setErr('Password must be at least 8 characters')
            setShowErr(true)
            setSpin(false)
            return
        }
        if (user.password !== user.confirmPass) {
            setErr("Confirm password is not the same as password")
            setShowErr(true)
            setSpin(false)
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
                localStorage.setItem('id', rep._id)
                localStorage.setItem('token', rep.mainToken)
                navigate('/')
                break;
            default:
                break;
        }
        setSpin(false)
    }

    const firstStage = (e) => {
        e.preventDefault()
        setShowErr(false)
        const user = {
            name: e.target.name?.value || "",
            username: e.target.username?.value || "",
            email: e.target.email?.value,
        }
        setFirst(user)
        setNum(2)
    }

    const selectTribe = () => {
        document.getElementById("tribe").classList.toggle("show")
    }

    const getTribe = (value) => {
        setTribe(value)
        selectTribe()
    }

    return (
        <div className="loginMainDiv">
            <div className="homeBtnLog" onClick={() => navigate("/")}>
                <FontAwesomeIcon size="2x" icon={faHome} className="text-white" />
            </div>
            <div className="loginDiv">
                <h1>Register your account</h1>
                {showErr && <Alert variant="danger">{err}</Alert>}
                {num === 1 && (<>
                    <form onSubmit={firstStage}>
                        <div>
                            <label htmlFor="name">Full Name</label>
                            <br />
                            <input required type="text" id="name" placeholder="Enter your name" name="name" />
                        </div>
                        <div>
                            <label htmlFor="username">Username</label>
                            <br />
                            <input required type="text" id="username" placeholder="Pick a username" name="username" />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <br />
                            <input required type="text" id="email" placeholder="Enter your email" name="email" />
                        </div>
                        <button type='submit'>Next</button>
                    </form>
                </>)}
                {
                    num === 2 && (
                        <>
                            <form onSubmit={submitForm}>
                                <div>
                                    <label htmlFor="password">Password</label>
                                    <br />
                                    <input required type="password" id="password" placeholder="Enter your password" name="password" />
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <br />
                                    <input required type="password" id="confirmPassword" placeholder="Confirm your password" name="confirmPassword" />
                                </div>
                                <div className='tribeDiv'>
                                    <label>Select your tribe</label>
                                    <p onClick={selectTribe} className='tribeMain'>{tribe[0]} <img src={drop} alt="" /></p>
                                    <ul id='tribe' className='tribeList'>
                                        <li onClick={() => getTribe(["Asher", "rgb(111, 111, 21)"])}>Asher <img src={asher} alt="" /></li>
                                        <li onClick={() => getTribe(["Dan", "rgb(250, 100, 125)"])}>Dan <img src={dan} alt="" /></li>
                                        <li onClick={() => getTribe(["Ephraim", "rgb(58, 58, 241)"])}>Ephraim <img src={ephraim} alt="" /></li>
                                        <li onClick={() => getTribe(["Gad", "rgb(142, 200, 239)"])}>Gad <img src={gad} alt="" /></li>
                                        <li onClick={() => getTribe(["Issachar", "rgb(12, 57, 11)"])}>Issachar <img src={issachar} alt="" /></li>
                                        <li onClick={() => getTribe(["Joseph", "rgb(12, 571, 31)"])}>Joseph <img src={joseph} alt="" /></li>
                                        <li onClick={() => getTribe(["Manasseh", "rgb(237, 31, 237)"])}>Manasseh <img src={manasseh} alt="" /></li>
                                        <li onClick={() => getTribe(["Naphtali", "lightgreen"])}>Naphtali <img src={naftali} alt="" /></li>
                                        <li onClick={() => getTribe(["Reuben", "orangered"])}>Reuben <img src={reuben} alt="" /></li>
                                        <li onClick={() => getTribe(["Simeon", "black"])}>Simeon <img src={simeon} alt="" /></li>
                                        <li onClick={() => getTribe(["Zebulun", "rgb(79, 7, 7)"])}>Zebulun <img src={zebulun} alt="" /></li>
                                        <li onClick={() => getTribe(["Zebulun", "rgb(79, 7, 7)"])}>Levi <img src={levi} alt="" /></li>
                                        <li onClick={() => getTribe(["Judah", "purple"])}>Judah <img src={judah} alt="" /></li>
                                        <li onClick={() => getTribe(["Benjamin", "rgb(249, 213, 115)"])}>Benjamin <img src={benjamin} alt="" /></li>
                                    </ul>
                                </div>
                                {
                                    spin ? (
                                        <button><Spinner animation="border" color="white" /></button>
                                    ) :
                                        (
                                            <button type="submit">Register</button>
                                        )
                                }
                            </form>
                        </>
                    )
                }

                <p>Already have an account? <span onClick={() => { setShowErr(false); navigate("/login") }}>Login</span></p>
                {num === 2 && <p onClick={() => setNum(1)}><span>Back</span></p>}
                <p onClick={() => navigate("/")} className="forgotPass"><span>Home</span></p>
            </div>
        </div>
    )
}

export default Register