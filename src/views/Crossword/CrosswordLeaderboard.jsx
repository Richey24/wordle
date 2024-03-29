import axios from 'axios';
import Header from '../../components/TheHeader.jsx';
import Leader from '../../components/TheLeaderboard.jsx';

import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToolbox, faPlus } from '@fortawesome/fontawesome-free-solid'
import cancel from "../../img/cancel.svg"
import url from "../../url"


const bgVideos = [
    { vid: 'vid-0.mp4' },
    { vid: 'vid-1.mp4' },
    { vid: 'vid-2.mp4' },
    { vid: 'vid-3.mp4' },
    { vid: 'vid-4.mp4' },
    { vid: 'vid-5.mp4' },
    { vid: 'vid-6.mp4' },
    { vid: 'vid-7.mp4' },
    { vid: 'vid-8.mp4' },
    { vid: 'vid-9.mp4' },
    { vid: 'vid-10.mp4' },
    { vid: 'vid-11.mp4' },
    { vid: 'vid-12.mp4' },
    { vid: 'vid-13.mp4' },
    { vid: 'vid-14.mp4' },
    { vid: 'vid-15.mp4' },
    { vid: 'vid-16.mp4' },
    { vid: 'vid-17.mp4' },
    { vid: 'vid-18.mp4' },
    { vid: 'vid-19.mp4' },
    { vid: 'vid-20.mp4' },
    { vid: 'vid-21.mp4' },
    { vid: 'vid-22.mp4' },
    { vid: 'vid-23.mp4' },
    { vid: 'vid-24.mp4' },
    { vid: 'vid-25.mp4' },
    { vid: 'vid-26.mp4' },
    { vid: 'vid-27.mp4' },
    { vid: 'vid-28.mp4' },
    { vid: 'vid-29.mp4' },
    { vid: 'vid-30.mp4' },
    { vid: 'vid-31.mp4' },
    { vid: 'vid-32.mp4' },
    { vid: 'vid-33.mp4' },
    { vid: 'vid-34.mp4' },
    { vid: 'vid-35.mp4' },
    { vid: 'vid-36.mp4' },
    { vid: 'vid-37.mp4' },
]

export default function CrosswordLeaderboard() {

    const [open, setOpen] = useState(false)
    const  cancelButtonRef = useRef(null)
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [bground, setBackground] = useState(() => {
        // getting stored value
        return localStorage.getItem("video-backround");
    });

    const handleShow = (e) => {
        e.preventDefault();
        setOpen(true);
    }

    const selectVideoBg = (param) => {
        setBackground(param)
    }
    const token = localStorage.getItem("token")

    useEffect(() => {
       fetchLeaderboardInformation()
    }, [])

    useEffect(() => {
        // storing input name
        localStorage.setItem("video-backround", bground);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bground]);

    const fetchLeaderboardInformation = async () => {
        await axios.get(`${url}/api/leaderboard`, { headers: { Authorization: `Bearer ${token}` }, validateStatus: () => true })
        .then( res => {
            let leaderData = res.data
            setLeaderboardData(leaderData.leadboard)
        })
    }

    return <div>
        <div className="min-h-full">
            <Header />
            <Leader users={leaderboardData} bground={bground} />

            {/*Fab Component  */}
            <div className="fab-container">
                <div className="fab shadow">
                    <div className="fab-content">
                        <FontAwesomeIcon icon={faPlus} className="text-white" />
                    </div>
                </div>
                <div className="sub-button shadow">
                    <a onClick={handleShow} href="/" target="_blank">
                        <FontAwesomeIcon icon={faToolbox} className="text-white" />
                    </a>
                </div>
            </div>
            {/* End Fab Component */}

            {/* Modal */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
                                        <div className="">
                                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                                    <img style={{ marginLeft: "95%", cursor: "pointer" }} onClick={() => setOpen(false)} src={cancel} alt="" />
                                                    Background Setting
                                                </Dialog.Title>

                                                {/* <div className="mt-5">
                                                    <div class="mx-auto max-w-7xl">
                                                        <div class="relative isolate overflow-hidden bg-gray-900 shadow-2xl">
                                                            <div class="relative mt-10 h-30 lg:mt-8">
                                                                <video className="" src={`https://absa7kzimnaf.blob.core.windows.net/newcontainer/${bground}`} autoPlay muted loop />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> */}

                                                <div className="">
                                                    <div class="grid grid-cols-6 gap-1">
                                                        {
                                                            bgVideos.map((vid, index) => (
                                                                <div key={index}>
                                                                    <video  preload="none" onClick={() => selectVideoBg(vid.vid)} src={`https://absa7kzimnaf.blob.core.windows.net/newcontainer/${vid.vid}`} className="cursor-pointer hover:bg-sky-700 squared-full h-20 w-20 shadow-lg" autoPlay muted loop />
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}>
                                            Close
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            {/* End Modal */}

        </div>
    </div>
}
