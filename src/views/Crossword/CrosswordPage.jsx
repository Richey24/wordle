import CrosswordPuzzle from "./components/CrosswordPuzzle.jsx"
import Header from '../../components/TheHeader.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faToolbox, faPlus, faHome, faUserGraduate } from '@fortawesome/fontawesome-free-solid'
import { Link } from "react-router-dom";
import '../../assets/css/fab.css';
import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useNavigate  } from "react-router-dom";

// Should be Props
const bgImages = [
    { img: 'bg-boogle.jpg'},
    { img: 'bg-levi-1.jpg'},
    { img: 'bg-asher.jpg'},
    { img: 'bg-benjamin.jpg'},
    { img: 'bg-dan.jpg'},
    { img: 'bg-ephraim.jpg'},
    { img: 'bg-gad.jpg'},
    { img: 'bg-issachar.jpg'},
    { img: 'bg-joseph.jpg'},
    { img: 'bg-judah.jpg'},
    { img: 'bg-manasseh.jpg'},
    { img: 'bg-naftali.jpg'},
    { img: 'bg-reuben.jpg'},
    { img: 'bg-simeon.jpg'},
    { img: 'bg-zebulun.jpg'},
    { img: 'bg-0.jpg'},
    { img: 'bg-1.jpg'},
    { img: 'bg-2.jpg'},
    { img: 'bg-3.jpg'},
    { img: 'bg-4.jpg'},
    { img: 'bg-5.jpg'},
    { img: 'bg-6.jpg'},
    { img: 'bg-7.jpg'},
    { img: 'bg-8.jpg'}
]

const puzzleColor = [
    { color: '#2596be', type: "flat-color" },
    { color: '#e28743', type: "flat-color" },
    { color: '#e28743', type: "flat-color" },
    { color: '#eab676', type: 'flat-color'},
    { color: '#76b5c5', type: 'flat-color'},
    { color: '#bea925', type: 'flat-color'},
    { color: '#cf2f74', type: 'flat-color'},
    { color: '#f62459', type: 'flat-color'},
    { color: '#825e5c', type: 'flat-color'},
    { color: '#16453e', type: 'flat-color'},
    { color: '#006992', type: 'flat-color'},
    { color: '#2e3131', type: 'flat-color'},
    { color: '#16a085', type: 'flat-color'},
    { color: '#16a085', type: 'flat-color'},
]

export default function Puzzle() {

    const navigate = useNavigate()
    const [background, setBackground ] = useState(() => {

    //   const settings = JSON.parse(localStorage.getItem('settings'));
    //   const background = settings.background;

    //   if (background.transitionmode === true) {
    //        const image =  randomSelectImage()
    //        return image;
    //   }
       
       const saved = localStorage.getItem("image-backround");
       const initialValue = saved;
       return initialValue || "";
   });

   const [color, setColor ] = useState(() => {
       const saved = localStorage.getItem("crossword-color");
       const initialValue = saved;
       return initialValue || "";
   });



   const selectBackground = (url) => {
       setBackground(url)
   }

   const randomSelectImage = () => {

   }
  
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

    return<div>
        <div className="min-h-full">
             
             <Header />

             <CrosswordPuzzle background={background} color={color}   />

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
                                    Background Setting
                                    </Dialog.Title>

                                    <div class="mg-5">
                                      <div class="flex justify-center">
                                            <div class="form-check form-switch">
                                                <input class="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                                <label class="form-check-label inline-block text-gray-800" for="flexSwitchCheckDefault">Default switch checkbox input</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-5">
                                        <div class="grid grid-cols-6 gap-1">
                                        {
                                            bgImages.map((job, index )=> (
                                            <div  key={index}>
                                                <img onClick={() => selectBackground(job.img)} class="cursor-pointer hover:bg-sky-700 squared-full h-20 w-20 shadow-lg" src={'bg/'+job.img} alt="" />
                                            </div>
                                            ))
                                        }
                                        </div>
                                    </div>

                                    <div className="mt-5">
                                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                        Color Setting
                                        </Dialog.Title>
                                        <div class="grid grid-cols-6 gap-1 mt-5">
                                        {
                                                puzzleColor.map( (clr, index )=> (
                                                    <div onClick={() => setColor(clr.color)} key={index} class="shadow-lg bg-blue-500 h-10 w-10 rounded-full ml-2 cursor-pointer" style={{ backgroundColor: clr.color }}>
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
                        <div className="sub-button shadow">
                        <Link to="/">
                            <FontAwesomeIcon icon={faHome} className="text-white" />
                        </Link>
                        </div>
             </div>
        </div>
    </div>
}