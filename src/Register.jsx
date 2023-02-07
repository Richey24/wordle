import axios from 'axios'
import React from 'react'
import "./Register.css"
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
import { useEffect } from 'react'

const Register = () => {
    const [spin, setSpin] = useState(false)
    const [showErr, setShowErr] = useState(false)
    const [err, setErr] = useState("")
    const [num, setNum] = useState(1)
    const [first, setFirst] = useState({})
    const [tribe, setTribe] = useState(["Asher", "rgb(111, 111, 21)"])
    const [church, setChurch] = useState("Non-Affiliated (NA)")
    const [country, setCountry] = useState([])
    const [fil, setFIl] = useState([])
    const [count, setCount] = useState(0)
    const navigate = useNavigate()

    const getCount = async () => {
        const res = await axios.get("https://restcountries.com/v3.1/all")
        const rep = await res.data
        const arr = rep.sort((a, b) => a.name.common.localeCompare(b.name.common))
        setCountry(arr)
        setFIl(arr)
    }

    useEffect(() => {
        getCount()
    }, [])

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
            superAdmin: false,
            church: church,
            country: [country[count]?.name?.common, country[count]?.flags.svg]
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
                navigate('/verify', { state: { email: rep.email } })
                break;
            default:
                break;
        }
        setSpin(false)
    }

    const firstStage = (e) => {
        e.preventDefault()
        const user = {
            name: e.target.name?.value || "",
            username: e.target.username?.value || "",
            email: e.target.email?.value,
        }
        if (!user.email.includes("@")) {
            setErr("Invalid email")
            setShowErr(true)
            return
        }
        setFirst(user)
        setShowErr(false)
        setNum(2)
    }

    const selectTribe = () => {
        document.getElementById("tribe").classList.toggle("showDrop")
    }

    const selectChurch = () => {
        document.getElementById("church").classList.toggle("showDrop")
    }
    const selectCountry = () => {
        document.getElementById("country").classList.toggle("showDrop")
    }

    const getTribe = (value) => {
        setTribe(value)
        selectTribe()
    }

    const getChurch = (value) => {
        setChurch(value)
        selectChurch()
    }
    const getCountry = (value) => {
        setCount(value)
        selectCountry()
    }

    const filterCountry = (e) => {
        const val = e.target.value
        const arr = fil.filter((fi) => fi.name.common.toLowerCase().includes(val.toLowerCase()))
        setCountry(arr)
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
                        <div className='tribeDiv'>
                            <label>Select your country</label>
                            <p id='countryMain' onClick={selectCountry} className='tribeMain'><img className='countryMainImg' src={country[count]?.flags.svg} alt="" /> {country[count]?.name?.common} <img src={drop} alt="" /></p>
                            <ul id='country' className='tribeList'>
                                <input onChange={filterCountry} placeholder='Search country' type="text" />
                                {
                                    country.map((county, i) => (
                                        <li onClick={() => getCountry(i)}><img src={county?.flags.svg} alt="" /> {county?.name.common}</li>
                                    ))
                                }
                            </ul>
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
                                    <label>Select your school / church affiliation</label>
                                    <p id='churchMain' onClick={selectChurch} className='tribeMain'>{church} <img src={drop} alt="" /></p>
                                    <ul id='church' className='tribeList'>
                                        <li onClick={() => getChurch("Non-Affiliated (NA)")}>Non-Affiliated (NA) </li>
                                        <li onClick={() => getChurch("1WEST (Messianic, Harlem-School Influenced) CAMPS")}>1WEST1 (Messianic, Harlem-School Influenced) CAMPS </li>
                                        <li onClick={() => getChurch("Ambassadors of Christ (AOC)")}>Ambassadors of Christ (AOC)</li>
                                        <li onClick={() => getChurch("Army of Israel (AOI) ")}>Army of Israel (AOI) </li>
                                        <li onClick={() => getChurch("Believers of The Way")}>Believers of The Way</li>
                                        <li onClick={() => getChurch("Church of God and Saints of Christ (COGASOC)")}>Church of God and Saints of Christ (COGASOC)</li>
                                        <li onClick={() => getChurch("Future World of Israel (FWOI)")}>Future World of Israel (FWOI)</li>
                                        <li onClick={() => getChurch("Gathering of Christ Church (GOCC)")}>Gathering of Christ Church (GOCC)</li>
                                        <li onClick={() => getChurch("Great MillStone Israelites (GMS)")}>Great MillStone Israelites (GMS)</li>
                                        <li onClick={() => getChurch("House of Israel (HOI)")}>House of Israel (HOI)</li>
                                        <li onClick={() => getChurch("Israel United in Christ (IUIC)")}>Israel United in Christ (IUIC)</li>
                                        <li onClick={() => getChurch("Israelite Church of God in Jesus Christ (ICGJC)")}>Israelite Church of God in Jesus Christ (ICGJC)</li>
                                        <li onClick={() => getChurch("Israelite School of Biblical & Practical Knowledge (ISBPK)")}>Israelite School of Biblical & Practical Knowledge (ISBPK)</li>
                                        <li onClick={() => getChurch("Israelite School of Knowledge (ISOK)")}>Israelite School of Knowledge (ISOK)</li>
                                        <li onClick={() => getChurch("Israelite School of Universal Practical Knowledge (ISUPK)")}>Israelite School of Universal Practical Knowledge (ISUPK)</li>
                                        <li onClick={() => getChurch("Lions of Israel / We Got Next (LOI)")}>Lions of Israel / We Got Next (LOI)</li>
                                        <li onClick={() => getChurch("Nation of Yahweh (NOY)")}>Nation of Yahweh (NOY)</li>
                                        <li onClick={() => getChurch("Onebody Israelites)")}>Onebody Israelites</li>
                                        <li onClick={() => getChurch("Sons of Thunder (SOT)")}>Sons of Thunder (SOT)</li>
                                        <li onClick={() => getChurch("Shut ‘Em Down Crew / RAM Squad (RAM)")}>Shut ‘Em Down Crew / RAM Squad (RAM)</li>
                                        <li onClick={() => getChurch("Sicarii")}>Sicarii</li>
                                        <li onClick={() => getChurch("TANAKH-Only (TO)")}>TANAKH-Only (TO)</li>
                                        <li onClick={() => getChurch("Thee Light of Zion (TLOZ)")}>Thee Light of Zion (TLOZ)</li>
                                        <li onClick={() => getChurch("True Nation Israelite (TNI)")}>True Nation Israelite (TNI)</li>
                                        <li onClick={() => getChurch("United Kingdom of Israel (UKIOC)")}>United Kingdom of Israel (UKIOC)</li>
                                        <li onClick={() => getChurch("We Got Next (WGN )")}>We Got Next (WGN )</li>
                                        <li onClick={() => getChurch("Watchmen For Israel (WFI)")}>Watchmen For Israel (WFI)</li>
                                        <li onClick={() => getChurch("Yahawashi’s Servants in Y’Sharael (YSIY)")}>Yahawashi’s Servants in Y’Sharael (YSIY)</li>
                                        <li onClick={() => getChurch("Others")}>Others</li>
                                    </ul>
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
                <p onClick={() => navigate("/")} className="forgotPass goHome"><span>Home</span></p>
            </div>
        </div>
    )
}

export default Register