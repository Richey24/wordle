import "./Select.css"
import "./Difficult.css"
import { useNavigate } from "react-router-dom"
import { Fragment, useRef, useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import url from "../url"
import { Spinner } from "react-bootstrap"
import THeHeader from "./TheHeader"
import { Dialog, Transition } from "@headlessui/react"

const Difficult = () => {
    const navigate = useNavigate()
    const id = localStorage.getItem("id")
    const token = localStorage.getItem("token")
    const [user, setUser] = useState({})
    const [spin, setSpin] = useState(true)

    const [subModal, setSubModal] = useState(false)
    const cancelButtonRef = useRef(null)

    useEffect(() => {
        if (id) {
            (async () => {
                try {
                    const res = await axios.get(`${url}/user/get/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        validateStatus: () => true
                    })
                    const rep = await res.data
                    if (res.status !== 200) {
                        setSpin(false)
                        return
                    }
                    if (token !== rep.mainToken) {
                        localStorage.clear()
                        setSpin(false)
                        return
                    }
                    setUser(rep)
                    setSpin(false)
                } catch (error) {
                    setSpin(false)
                }
            })()
        } else {
            setSpin(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const showModal = (id) => {
        document.getElementById(id).classList.toggle("selectShow")
    }

    const navi = (num) => {
        if (num !== 5 && !id) {
            navigate("/login")
            return
        }
        if (num !== 5 && !user.paid) {
            setSubModal(true)
            return
        }
        if (Date.now() > new Date(user.expiryDate).getTime()) {
            setSubModal(true)
            return
        }
        navigate("/word", { state: { numb: num } })
    }

    const playSound = (val) => {
        console.log("sad");
        switch (val) {
            case "easy":
                new Audio(require("../sound/single.mp3")).play()
                break;
            case "normal":
                new Audio(require("../sound/swinging.mp3")).play()
                break;
            case "hard":
                new Audio(require("../sound/swish.mp3")).play()
                break;
            case "very":
                new Audio(require("../sound/whiff.mp3")).play()
                break;

            default:
                break;
        }
    }

    if (spin) {
        return (
            <div style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Spinner animation="border" color="#3d1152" />
            </div>
        )
    }

    return (
        <div>
            <THeHeader />
            <div style={{ backgroundColor: user.tribe ? user.tribe[1] : "" }} className="selectMain">
                <div style={{ columnGap: "300px" }} className="innerMain">
                    <button onMouseEnter={() => playSound("easy")} className="normal" onClick={() => navi(5)}>
                        Easy
                    </button>

                    <button onMouseEnter={() => playSound("normal")} className="hard" onClick={() => navi(8)}>
                        Normal
                    </button>

                    <button onMouseEnter={() => playSound("hard")} className="veryHard" onClick={() => navi(11)}>
                        Hard
                    </button>

                    <button onMouseEnter={() => playSound("very")} className="impossible" onClick={() => navi(14)}>
                        Very Hard
                    </button>
                </div>
                <div id="swordSub" className="selectSub">
                    <p>You have to subscribe to gain premium access to all difficulty level in the game</p>
                    <button>Subscribe</button>
                    <button onClick={() => showModal("swordSub")}>Cancel</button>
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
                                                    <p>You have to subscribe to gain premium access to all difficulty level in the game.</p>
                                                </div>
                                                <div className="mt-2">
                                                    <button onClick={() => navigate("/subscription")} class="block w-full bg-purple-600 hover:bg-purple-400 text-white font-bold py-2 px-4 border-b-4 border-purple-700 hover:border-purple-500 rounded">
                                                        Subscribe
                                                    </button>
                                                    <button onClick={() => setSubModal(false)} class="mt-1 block w-full bg-purple-600 hover:bg-purple-400 text-white font-bold py-2 px-4 border-b-4 border-purple-700 hover:border-purple-500 rounded">
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
        </div>
    )
}

export default Difficult