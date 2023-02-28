import CrosswordPuzzle from "./components/CrosswordPuzzle.jsx"
import Header from '../../components/TheHeader.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToolbox, faPlus, faUserGraduate, faQuestion } from '@fortawesome/fontawesome-free-solid'
import '../../assets/css/fab.css';
import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useNavigate, Prompt } from "react-router-dom";

import axios from 'axios';
import url from "../../url"

import cancel from "../../img/cancel.svg"
import cross from "../../img/crossword.jpg"




// Should be Props
const bgImages = [
    { img: 'bg-boogle.jpg', thumb: 'bg-boogle-thumbnail.jpg' },
    { img: 'bg-levi.jpg', thumb: 'bg-levi-thumbnail.jpg' },
    { img: 'bg-asher.jpg', thumb: 'bg-asher-thumbnail.jpg' },
    { img: 'bg-benjamin.jpg', thumb: 'bg-benjamin-thumbnail.jpg' },
    { img: 'bg-dan.jpg', thumb: 'bg-dan-thumbnail.jpg' },
    { img: 'bg-ephraim.jpg', thumb: 'bg-ephram-thumbnail.jpg' },
    { img: 'bg-gad.jpg', thumb: 'bg-gad-thumbnail.jpg' },
    { img: 'bg-issachar.jpg', thumb: 'bg-issachar-thumbnail.jpg' },
    { img: 'bg-joseph.jpg', thumb: 'bg-josepth-thumbnail.jpg' },
    { img: 'bg-judah.jpg', thumb: 'bg-judah-thumbnail.jpg' },
    { img: 'bg-manasseh.jpg', thumb: 'bg-manasseh-thumbnail.jpg' },
    { img: 'bg-naftali.jpg', thumb: 'bg-naftali-thumbnail.jpg' },
    { img: 'bg-reuben.jpg', thumb: 'bg-reuben-thumbnail.jpg' },
    { img: 'bg-simeon.jpg', thumb: 'bg-simeon-thumbnail.jpg' },
    { img: 'bg-zebulun.jpg', thumb: 'bg-zebulun-thumbnail.jpg' },
    { img: 'bg-0.jpg', thumb: 'bg-thumbnail-0.jpg' },
    { img: 'bg-1.jpg', thumb: 'bg-thumbnail-1.jpg' },
    { img: 'bg-2.jpg', thumb: 'bg-thumbnail-2.jpg' },
    { img: 'bg-3.jpg', thumb: 'bg-thumbnail-3.jpg' },
    { img: 'bg-4.jpg', thumb: 'bg-thumbnail-4.jpg' },
    { img: 'bg-5.jpg', thumb: 'bg-thumbnail-5.jpg' },
    { img: 'bg-6.jpg', thumb: 'bg-thumbnail-6.jpg' },
    { img: 'bg-7.jpg', thumb: 'bg-thumbnail-7.jpg' },
    { img: 'bg-8.jpg', thumb: 'bg-thumbnail-8.jpg' },
    { img: 'bg-9.jpg', thumb: 'bg-thumbnail-9.jpg' },
    { img: 'bg-10.jpg', thumb: 'bg-thumbnail-10.jpg' },
    { img: 'bg-11.jpg', thumb: 'bg-thumbnail-11.jpg' },
    { img: 'bg-12.jpg', thumb: 'bg-thumbnail-12.jpg' },
    { img: 'bg-13.jpeg', thumb: 'bg-thumbnail-13.jpg' },
    { img: 'bg-14.jpg', thumb: 'bg-thumbnail-14.jpg' },
    { img: 'bg-15.jpg', thumb: 'bg-thumbnail-15.jpg' },
    { img: 'bg-16.jpg', thumb: 'bg-thumbnail-16.jpg' },
    { img: 'bg-17.jpg', thumb: 'bg-thumbnail-17.jpg' },
    { img: 'bg-18.jpg', thumb: 'bg-thumbnail-18.jpg' },
    { img: 'bg-19.jpg', thumb: 'bg-thumbnail-19.jpg' },
    { img: 'bg-20.jpg', thumb: 'bg-thumbnail-20.jpg' },
    { img: 'bg-21.jpg', thumb: 'bg-thumbnail-21.jpg' },
    { img: 'bg-22.jpg', thumb: 'bg-thumbnail-22.jpg' },
    { img: 'bg-23.jpg', thumb: 'bg-thumbnail-23.jpg' },
    { img: 'bg-24.jpg', thumb: 'bg-thumbnail-24.jpg' },
    { img: 'bg-25.jpg', thumb: 'bg-thumbnail-25.jpg' },
    { img: 'bg-26.jpg', thumb: 'bg-thumbnail-26.jpg' },
    { img: 'bg-27.jpg', thumb: 'bg-thumbnail-27.jpg' },
    { img: 'bg-28.jpg', thumb: 'bg-thumbnail-28.jpg' },
    { img: 'bg-29.jpg', thumb: 'bg-thumbnail-29.jpg' },
    { img: 'bg-30.jpg', thumb: 'bg-thumbnail-30.jpg' },
    { img: 'bg-31.jpg', thumb: 'bg-thumbnail-31.jpg' },
    { img: 'bg-32.jpg', thumb: 'bg-thumbnail-32.jpg' },
    { img: 'bg-33.jpg', thumb: 'bg-thumbnail-33.jpg' },
    { img: 'bg-34.jpg', thumb: 'bg-thumbnail-34.jpg' },
    { img: 'bg-35.jpg', thumb: 'bg-thumbnail-35.jpg' },
    { img: 'bg-36.jpg', thumb: 'bg-thumbnail-36.jpg' },
    { img: 'bg-37.jpg', thumb: 'bg-thumbnail-37.jpg' },
    { img: 'bg-38.jpg', thumb: 'bg-thumbnail-38.jpg' },
    { img: 'bg-39.jpg', thumb: 'bg-thumbnail-39.jpg' },
    { img: 'bg-40.jpg', thumb: 'bg-thumbnail-40.jpg' },
    { img: 'bg-41.jpg', thumb: 'bg-thumbnail-41.jpg' },
    { img: 'bg-42.jpg', thumb: 'bg-thumbnail-42.jpg' },
    { img: 'bg-43.jpg', thumb: 'bg-thumbnail-43.jpg' },
    { img: 'bg-44.jpg', thumb: 'bg-thumbnail-44.jpg' },
    { img: 'bg-45.jpg', thumb: 'bg-thumbnail-45.jpg' },
    { img: 'bg-46.jpg', thumb: 'bg-thumbnail-46.jpg' },
    { img: 'bg-47.jpg', thumb: 'bg-thumbnail-47.jpg' },
    { img: 'bg-48.jpg', thumb: 'bg-thumbnail-48.jpg' },
    { img: 'bg-49.jpg', thumb: 'bg-thumbnail-49.jpg' },
    { img: 'bg-50.jpg', thumb: 'bg-thumbnail-50.jpg' },
    { img: "thumb-31.jpg", thumb: "thumb-31.jpg" },
    { img: "thumb-34.jpg", thumb: "thumb-34.jpg" },
    { img: "thumb-35.jpg", thumb: "thumb-35.jpg" },
    { img: "thumb-36.jpg", thumb: "thumb-36.jpg" },
    { img: "thumb-37.jpg", thumb: "thumb-37.jpg" },
    { img: "thumb-38.jpg", thumb: "thumb-38.jpg" },
    { img: "thumb-39.jpg", thumb: "thumb-39.jpg" },
    { img: "thumb-40.jpg", thumb: "thumb-40.jpg" },
    { img: 'bg-51.jpg', thumb: 'bg-thumbnail-51.jpg' },
    { img: 'bg-52.jpg', thumb: 'bg-thumbnail-52.jpg' },
    { img: 'bg-53.jpg', thumb: 'bg-thumbnail-53.jpg' },
    { img: 'bg-54.jpg', thumb: 'bg-thumbnail-54.jpg' },
    { img: 'bg-55.jpg', thumb: 'bg-thumbnail-55.jpg' },
    { img: 'bg-56.jpg', thumb: 'bg-thumbnail-56.jpg' },
    { img: 'bg-59.jpg', thumb: 'bg-thumbnail-57.jpg' },
    { img: 'bg-58.jpg', thumb: 'bg-thumbnail-58.jpg' },
    { img: 'bg-68.jpg', thumb: 'bg-thumbnail-60.jpg' },
    { img: 'bg-71.jpg', thumb: 'bg-71.jpg' },
    { img: 'bg-72.jpg', thumb: 'bg-72.jpg' },
    { img: 'bg-73.jpg', thumb: 'bg-73.jpg' },
    { img: 'bg-74.jpg', thumb: 'bg-74.jpg' },
    { img: 'bg-75.jpg', thumb: 'bg-75.jpg' },
    { img: 'bg-76.jpg', thumb: 'bg-76.jpg' },
    { img: 'bg-77.jpg', thumb: 'bg-77.jpg' },
    { img: 'bg-78.jpg', thumb: 'bg-78.jpg' },
    { img: 'bg-79.jpg', thumb: 'bg-79.jpg' },

]

// Should be Props
const bgRandomImages = [
    { img: 'bg-0.jpg', thumb: 'bg-thumbnail-0.jpg' },
    { img: 'bg-1.jpg', thumb: 'bg-thumbnail-1.jpg' },
    { img: 'bg-2.jpg', thumb: 'bg-thumbnail-2.jpg' },
    { img: 'bg-3.jpg', thumb: 'bg-thumbnail-3.jpg' },
    { img: 'bg-4.jpg', thumb: 'bg-thumbnail-4.jpg' },
    { img: 'bg-5.jpg', thumb: 'bg-thumbnail-5.jpg' },
    { img: 'bg-6.jpg', thumb: 'bg-thumbnail-6.jpg' },
    { img: 'bg-7.jpg', thumb: 'bg-thumbnail-7.jpg' },
    { img: 'bg-8.jpg', thumb: 'bg-thumbnail-8.jpg' },
    { img: 'bg-9.jpg', thumb: 'bg-thumbnail-9.jpg' },
    { img: 'bg-10.jpg', thumb: 'bg-thumbnail-10.jpg' },
    { img: 'bg-11.jpg', thumb: 'bg-thumbnail-11.jpg' },
    { img: 'bg-12.jpg', thumb: 'bg-thumbnail-12.jpg' },
    { img: 'bg-13.jpg', thumb: 'bg-thumbnail-13.jpg' },
    { img: 'bg-14.jpg', thumb: 'bg-thumbnail-14.jpg' },
    { img: 'bg-15.jpg', thumb: 'bg-thumbnail-15.jpg' },
    { img: 'bg-16.jpg', thumb: 'bg-thumbnail-16.jpg' },
    { img: 'bg-17.jpg', thumb: 'bg-thumbnail-17.jpg' },
    { img: 'bg-18.jpg', thumb: 'bg-thumbnail-18.jpg' },
    { img: 'bg-19.jpg', thumb: 'bg-thumbnail-19.jpg' },
    { img: 'bg-20.jpg', thumb: 'bg-thumbnail-20.jpg' },
    { img: 'bg-21.jpg', thumb: 'bg-thumbnail-21.jpg' },
    { img: 'bg-22.jpg', thumb: 'bg-thumbnail-22.jpg' },
    { img: 'bg-23.jpg', thumb: 'bg-thumbnail-23.jpg' },
    { img: 'bg-24.jpg', thumb: 'bg-thumbnail-24.jpg' },
    { img: 'bg-25.jpg', thumb: 'bg-thumbnail-25.jpg' },
    { img: 'bg-26.jpg', thumb: 'bg-thumbnail-26.jpg' },
    { img: 'bg-27.jpg', thumb: 'bg-thumbnail-27.jpg' },
    { img: 'bg-28.jpg', thumb: 'bg-thumbnail-28.jpg' },
    { img: 'bg-29.jpg', thumb: 'bg-thumbnail-29.jpg' },
    { img: 'bg-30.jpg', thumb: 'bg-thumbnail-30.jpg' },
    { img: 'bg-31.jpg', thumb: 'bg-thumbnail-31.jpg' },
    { img: 'bg-32.jpg', thumb: 'bg-thumbnail-32.jpg' },
    { img: 'bg-33.jpg', thumb: 'bg-thumbnail-33.jpg' },
    { img: 'bg-34.jpg', thumb: 'bg-thumbnail-34.jpg' },
    { img: 'bg-35.jpg', thumb: 'bg-thumbnail-35.jpg' },
    { img: 'bg-36.jpg', thumb: 'bg-thumbnail-36.jpg' },
    { img: 'bg-37.jpg', thumb: 'bg-thumbnail-37.jpg' },
    { img: 'bg-38.jpg', thumb: 'bg-thumbnail-38.jpg' },
    { img: 'bg-39.jpg', thumb: 'bg-thumbnail-39.jpg' },
    { img: 'bg-40.jpg', thumb: 'bg-thumbnail-40.jpg' },
    { img: 'bg-41.jpg', thumb: 'bg-thumbnail-41.jpg' },
    { img: 'bg-42.jpg', thumb: 'bg-thumbnail-42.jpg' },
    { img: 'bg-43.jpg', thumb: 'bg-thumbnail-43.jpg' },
    { img: 'bg-44.jpg', thumb: 'bg-thumbnail-44.jpg' },
    { img: 'bg-45.jpg', thumb: 'bg-thumbnail-45.jpg' },
    { img: 'bg-46.jpg', thumb: 'bg-thumbnail-46.jpg' },
    { img: 'bg-47.jpg', thumb: 'bg-thumbnail-47.jpg' },
    { img: 'bg-48.jpg', thumb: 'bg-thumbnail-48.jpg' },
    { img: 'bg-49.jpg', thumb: 'bg-thumbnail-49.jpg' },
    { img: 'bg-50.jpg', thumb: 'bg-thumbnail-50.jpg' },
    { img: 'bg-51.jpg', thumb: 'bg-thumbnail-51.jpg' },
    { img: 'bg-52.jpg', thumb: 'bg-thumbnail-52.jpg' },
    { img: 'bg-53.jpg', thumb: 'bg-thumbnail-53.jpg' },
    { img: 'bg-54.jpg', thumb: 'bg-thumbnail-54.jpg' },
    { img: 'bg-55.jpg', thumb: 'bg-thumbnail-55.jpg' },
    { img: 'bg-56.jpg', thumb: 'bg-thumbnail-56.jpg' },
    { img: 'bg-57.jpg', thumb: 'bg-thumbnail-57.jpg' },
    { img: 'bg-58.jpg', thumb: 'bg-thumbnail-58.jpg' },
    { img: 'bg-59.jpg', thumb: 'bg-thumbnail-59.jpg' },
    { img: 'bg-60.jpg', thumb: 'bg-thumbnail-60.jpg' },
    { img: 'bg-61.jpg', thumb: 'bg-thumbnail-61.jpg' },
    { img: 'bg-62.jpg', thumb: 'bg-thumbnail-62.jpg' },
    { img: 'bg-63.jpg', thumb: 'bg-thumbnail-63.jpg' },
    { img: 'bg-63.jpg', thumb: 'bg-thumbnail-64.jpg' },

]

const puzzleColorGradient = [
    { color1: '#f12711', color2: '#f5af19' },
    { color1: '#845EC2', color2: '#D65DB1' },
    { color1: '#FF6F91', color2: '#FF9671' },
    { color1: '#FFC75F', color2: '#F9F871' },
    { color1: '#4B597A', color2: '#2F4858' },
    { color1: '#6967A9', color2: '#1B6299' },
    { color1: '#D26F9D', color2: '#A36AAA' },
    { color1: '#FF8597', color2: '#C55065' },
    { color1: '#FF9671', color2: '#FFBDCD' },
    { color1: '#FFF5EE', color2: '#E5DBCE' },
    { color1: '#57B7FF', color2: '#E5DBCE' },
    { color1: '#7D6592', color2: '#6170A4' },
    { color1: '#2F7BAE', color2: '#6170A4' },
    { color1: '#008D9B', color2: '#009281' },
    { color1: '#FFC96A', color2: '#F9F871' },
    { color1: '#00C9AD', color2: '#FEFEDF' },
    { color1: '#EFA10D', color2: '#92A31E' },
    { color1: '#3C954E', color2: '#007E6D' },
    { color1: '#006370', color2: '#2F4858' },
    { color1: '#EF4F0D', color2: '#E42C5B' },
    { color1: '#B43D87', color2: '#734F92' },
    { color1: '#3C517D', color2: '#3C517D' },
    { color1: '#EF4F0D', color2: '#FA1B4F' },
    { color1: '#EC0085', color2: '#C334B4' },
    { color1: '#7B55D5', color2: '#0068DF' },
    { color1: '#EF4F0D', color2: '#FFC07A' },
    { color1: '#E24300', color2: '#890000' },
    { color1: '#00B292', color2: '#008F9A' },
    { color1: '#006A84', color2: '#2F4858' },
    { color1: '#5DEF0D', color2: '#006789' },
    { color1: '#00F4FF', color2: '#00BBFF' },
    { color1: '#00DD5E', color2: '#00C692' },
    { color1: '#E19D56', color2: '#A66A24' },
]

export default function CrosswordPage() {

    const [gamelevels, setGameLevels] = useState(false);

    const randomSelectImage = () => {
        const random = Math.floor(Math.random() * bgRandomImages.length);
        return bgRandomImages[random].img;
    }

    const navigate = useNavigate()
    const [background, setBackground] = useState(() => {
        const initialValue = localStorage.getItem("image-backround");

        const transition = localStorage.getItem("transition-mode");

        if (transition === 'true') {
            return randomSelectImage()
        }
        // return randomSelectImage()
        return initialValue
    });


    const [transition, setTransition] = useState(() => {

        const initialValue = localStorage.getItem("transition-mode");
        console.log('initial value: ' + initialValue)

        const random = Math.floor(Math.random() * bgRandomImages.length);
        console.log(random)

        return initialValue ? true : '';

    });

    useEffect(() => {
        return
    })

    const handleChange = () => {
        setTransition(!transition);
    };

    const [colorOne, setColorOne] = useState(() => {
        // getting stored value
        const saved = localStorage.getItem("colorOne");
        const initialValue = JSON.parse(saved);
        return initialValue || "";
    });

    const [colorTwo, setColorTwo] = useState(() => {
        // getting stored value
        const saved = localStorage.getItem("colorTwo");
        const initialValue = JSON.parse(saved);
        return initialValue || "";
    })

    const handleColor = async (c1, c2) => {
        let params = [c1, c2]
        setColorOne(params)
    }

    const getUserLevels = async () => {
        const token = localStorage.getItem("token")

        await axios.get(`${url}/api/user/gamedata`, { headers: { Authorization: `Bearer ${token}` }, validateStatus: () => true })
            .then(res => {
                console.log(res)
                const data = res.data
                if (data) {
                    setGameLevels(data.game_level)
                }
            })
            .catch(err => {
                console.log(err)
                navigate('/')
            })

    }

    useEffect(() => {
        localStorage.setItem("colorOne", JSON.stringify(colorOne));
    }, [colorOne])


    useEffect(() => {
        getUserLevels()
    }, [gamelevels])


    useEffect(() => {
        localStorage.setItem("transition-mode", transition);
    }, [transition])

    useEffect(() => {
        // storing input name
        localStorage.setItem("image-backround", background);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [background]);

    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)

    const handleShow = (e) => {
        e.preventDefault();
        setOpen(true);
    }

    const showHowToPlay = () => {
        document.getElementById("howToPlayCross").classList.toggle("showHowToPlay")
    }

    return <div>
        <div className="min-h-full">
            <Header />
            <CrosswordPuzzle background={background} color={colorOne[0]} color1={colorOne[1]} level={gamelevels} />
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
                                            <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                                                <img onClick={() => setOpen(false)} style={{ marginLeft: "90%", cursor: "pointer" }} src={cancel} alt="" />
                                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                                    Game Settings
                                                </Dialog.Title>

                                                <div class="mt-5">
                                                    <label class="relative inline-flex cursor-pointer">

                                                        <input
                                                            type="checkbox"
                                                            class="sr-only peer"
                                                            checked={transition}
                                                            onChange={handleChange} />

                                                        <div class="w-12 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                        <span class="ml-3 text-sm font-medium">Enable Backround Image Transition Mode</span>
                                                    </label>
                                                </div>
                                                <div className="mt-4">
                                                    {!transition &&
                                                        <div class="grid grid-cols-6 gap-1">
                                                            {
                                                                bgImages.map((job, index) => (
                                                                    <div key={index}>
                                                                        <img onClick={() => setBackground(job.img)} class="cursor-pointer hover:bg-sky-700 squared-full h-20 w-20 shadow-lg" src={'thumbnails/' + job.thumb} alt="" />
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    }
                                                </div>

                                                <div className="mt-5">
                                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                                        Color Setting
                                                    </Dialog.Title>
                                                    <div>

                                                        <div class="grid grid-cols-10 gap-1 mt-2">
                                                            {
                                                                puzzleColorGradient.map((clr, index) => (
                                                                    <div onClick={() => handleColor(clr.color1, clr.color2)} key={index} class="shadow-lg bg-blue-500 h-10 w-10 ml-1 cursor-pointer" style={{ background: `linear-gradient(to left,  ${clr.color1} 0%,${clr.color2} 100%)` }}>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
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
                <div className="sub-button shadow" onClick={() => navigate("/crossword/leader")}>
                    <FontAwesomeIcon icon={faUserGraduate} className="text-white" />
                </div>
                <div className="sub-button shadow" onClick={showHowToPlay}>
                    <FontAwesomeIcon icon={faQuestion} className="text-white" />
                </div>
            </div>
        </div>
        <div id="howToPlayCross" className="howToPlayCross">
            <img className="howToPlayHangImg" onClick={showHowToPlay} src={cancel} alt="" />
            <h1>How to play</h1>
            <h4>
                Crossword puzzles are enjoyable and relaxing and can increase vocabulary and enhance problem solving skills. The goal of the crossword puzzle is to find and enter words using only the letters provided. Game play is timed so faster completion result in a higher final score.
            </h4>
            <img className="crossImg" src={cross} alt="" />
        </div>
    </div>
}