import axios from "axios"
import { Fragment, useEffect, useRef } from "react"
import { useState } from "react"
import { OverlayTrigger, Spinner, Tooltip } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import url from "../url"
import edit from "../img/Edit.svg"
import del from "../img/Delete.svg"
import bigdel from "../img/bigdel.svg"
import empty from "../img/empty.png"
import "./Hebrew.css"
import { Dialog, Transition } from "@headlessui/react"

const Hebrew = () => {
    const id = sessionStorage.getItem("id")
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [spin, setSpin] = useState(false)
    const [lists, setLists] = useState([])
    const [fit, setFit] = useState([])
    const [delId, setDelId] = useState("")
    const token = sessionStorage.getItem("token")
    const { deck } = useParams()
    const [subModal, setSubModal] = useState(false)
    const cancelButtonRef = useRef(null)

    const getUser = async () => {
        const res = await axios.get(`${url}/user/get/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            validateStatus: () => true
        })
        const rep = await res.data
        setUser(rep)
    }

    const getItems = async () => {
        const res = await axios.get(`${url}/hebrew/get/all`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            validateStatus: () => true
        })
        const rep = await res.data
        const newArr = rep.slice((deck - 1) * 25, deck * 25).filter((re) => re.toBeDeleted !== true).reverse()
        console.log(newArr);
        setFit(newArr)
        setLists(newArr)
        setSpin(false)
    }

    useEffect(() => {
        getUser()
        getItems()
    }, [])


    const showModal = (id, value) => {
        document.getElementById(id).classList.toggle("showDelModal")
        setDelId(value)
    }

    const filterItem = (e) => {
        const value = e.target.value
        const newArr = fit.filter((fi) => fi.english.toLowerCase().includes(value.toLowerCase()))
        setLists(newArr)
    }

    const deleteStudy = async () => {
        const res = await axios.put(`${url}/hebrew/update/${delId._id}`, { toBeDeleted: true }, {
            validateStatus: () => true,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const date = new Date().toLocaleString()
        const text = `${user.username} marked hebrew word ${delId.paleoHebrewText} to be deleted on ${date}`
        await axios.post(`${url}/audit/add`, { audit: text }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (res.status === 200) {
            showModal("delDiv")
            getItems()
        }
    }

    const nav = () => {
        if (lists.length >= 25) {
            setSubModal(true)
            return
        }
        navigate(`/admin/add/hebrew/${deck}`)
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
        <div className="swordDiv">
            <h1>Deck {deck} List</h1>
            <div id="hebrewSearch" className="swordSearch">
                <input onChange={filterItem} placeholder="Type to search" type="text" />
                <p onClick={nav}>Add new word</p>
            </div>
            {
                lists.length < 1 ? (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "20px" }}>
                        <img src={empty} alt="" />
                        <p className="empty">You have not create any hebrew word, create one</p>
                    </div>
                ) : (
                    <div className="hebrewMain">
                        {
                            lists.map((list, i) => (
                                <div key={i}>
                                    <div className="hebrewBtn" id="hebrewBtn">
                                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="edit">Edit</Tooltip>}>
                                            <img onClick={() => navigate(`/admin/add/hebrew/${deck}`, { state: { list: list } })} style={{ marginRight: "20px" }} src={edit} alt="" />
                                        </OverlayTrigger>
                                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="delete">Delete</Tooltip>}>
                                            <img onClick={() => showModal("delDiv", list)} src={del} alt="" />
                                        </OverlayTrigger>
                                    </div>
                                    <div className="hebrewImageDiv">
                                        <img className="hebrewImage" src={`https://absa7kzimnaf.blob.core.windows.net/newcontainer/${list.correctImage}`} alt="" />
                                        <div style={{ marginTop: "20px" }}>
                                            <h6>{list.paleoHebrewText}</h6>
                                            <h6>{list.english}</h6>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }

            <div id="delDiv" className="delDiv">
                <div className="firstDel">
                    <img src={bigdel} alt="" />
                    <div>
                        <h5>Delete question</h5>
                        <p>Are you sure you want to delete this question? This action cannot be undone.</p>
                    </div>
                </div>
                <div className="secondDel">
                    <p onClick={() => showModal("delDiv")} className="delCan">Cancel</p>
                    <p onClick={deleteStudy} className="delDel">Delete</p>
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
                                                <p>Each deck holds a maximum of 25 cards, add your new word in another card</p>
                                            </div>
                                            <div className="mt-2">
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
    )
}

export default Hebrew