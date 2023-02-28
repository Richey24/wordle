import { Fragment, useRef, useState } from "react"
import "./Login.css"
import lock from "./img/Lock.svg"
import mail from "./img/Artwork.svg"
import axios from "axios"
import url from "./url"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { Alert, Spinner } from "react-bootstrap"
import THeHeader from "./components/TheHeader"
import { Dialog, Transition } from "@headlessui/react"

const Login = () => {
    const [reg, setReg] = useState("login")
    const [showErr, setShowErr] = useState(false)
    const [err, setErr] = useState("")
    const [spin, setSpin] = useState(false)
    const navigate = useNavigate()
    const loc = useLocation()
    const regi = loc.state?.reg

    const [subModal, setSubModal] = useState(false)
    const [freeModal, setFreeModal] = useState(false)
    const cancelButtonRef = useRef(null)


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
        if (!user.email.includes("@")) {
            user.username = user.email
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
                    if (rep.confirmed) {
                        localStorage.setItem('id', rep._id)
                        localStorage.setItem('token', rep.mainToken)
                        if (rep.customerID && Date.now() > new Date(rep.expiryDate).getTime()) {
                            setSubModal(true)
                            return
                        }
                        if (!rep.customerID && Date.now() > new Date(rep.expiryDate).getTime()) {
                            setFreeModal(true)
                            return
                        }
                        navigate('/')
                    } else {
                        navigate("/verify")
                    }
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
            <div>
                <THeHeader />
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
            </div>
        )
    }

    if (reg === "sent") {
        return (
            <div>
                <THeHeader />
                <div className="loginMainDiv">
                    <div style={{ position: "relative", height: "600px" }} className="loginDiv">
                        <div className="lockImage">
                            <img src={mail} alt="" />
                        </div>
                        <h1>Check your mail</h1>
                        <p>We have sent an instructions to recover your password to your mail</p>
                        <p style={{ position: "absolute", bottom: "45px", left: "7%" }}>Did not receive email? Check your spam folder or <span>resend verification link</span></p>
                        <p style={{ position: "absolute", bottom: "10px", left: "40%" }} onClick={() => { setShowErr(false); setReg("login") }} className="forgotPass"><span>Back to login page</span></p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <THeHeader />
            <div className="loginMainDiv">
                <div className="loginDiv">
                    <h1>Login your account</h1>
                    {showErr && <Alert variant="danger">{err}</Alert>}
                    <form onSubmit={submitForm}>
                        <div>
                            <label htmlFor="email">Email/Username</label>
                            <br />
                            <input required type="text" id="email" placeholder="Enter your email or username" name="email" />
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
                    <p onClick={() => navigate("/")} className="forgotPass goHome"><span>Home</span></p>
                </div>
            </div>

            <Transition.Root show={subModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setSubModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-dark bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <div>
                                                <p>Your subscription has expired, kindly renew your subscription to have unlimited access.</p>
                                            </div>
                                            <div className="mt-2">
                                                <button onClick={() => navigate("/user-account")} class="block w-full bg-purple-600 hover:bg-purple-400 text-white font-bold py-2 px-4 border-b-4 border-purple-700 hover:border-purple-500 rounded">
                                                    Manage Subscription
                                                </button>
                                                <button onClick={() => navigate("/")} class="mt-1 block w-full bg-purple-600 hover:bg-purple-400 text-white font-bold py-2 px-4 border-b-4 border-purple-700 hover:border-purple-500 rounded">
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <Transition.Root show={freeModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setSubModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-dark bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <div>
                                                <p>Your free subscription has expired, kindly subscribe to have unlimited access.</p>
                                            </div>
                                            <div className="mt-2">
                                                <button onClick={() => navigate("/subscription")} class="block w-full bg-purple-600 hover:bg-purple-400 text-white font-bold py-2 px-4 border-b-4 border-purple-700 hover:border-purple-500 rounded">
                                                    Subscribe
                                                </button>
                                                <button onClick={() => navigate("/")} class="mt-1 block w-full bg-purple-600 hover:bg-purple-400 text-white font-bold py-2 px-4 border-b-4 border-purple-700 hover:border-purple-500 rounded">
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    )
}

export default Login