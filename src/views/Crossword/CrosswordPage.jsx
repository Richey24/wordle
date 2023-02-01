import CrosswordPuzzle from "./components/CrosswordPuzzle.jsx"
import Header from '../../components/TheHeader.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faToolbox, faPlus, faHome, faUserGraduate } from '@fortawesome/fontawesome-free-solid'
import { Link } from "react-router-dom";
import '../../assets/css/fab.css';
import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useNavigate  } from "react-router-dom";

// Should be Props
const bgImages = [
    { img: 'bg-boogle.jpg',   thumb: 'bg-boogle-thumbnail.jpg'},
    { img: 'bg-levi-1.jpg',   thumb: 'bg-levi-thumbnail.jpg'},
    { img: 'bg-asher.jpg',    thumb:  'bg-asher-thumbnail.jpg'},
    { img: 'bg-benjamin.jpg', thumb:  'bg-benjamin-thumbnail.jpg'},
    { img: 'bg-dan.jpg',      thumb:  'bg-dan-thumbnail.jpg'},
    { img: 'bg-ephraim.jpg',  thumb:  'bg-ephram-thumbnail.jpg'},
    { img: 'bg-gad.jpg',      thumb:  'bg-gad-thumbnail.jpg'},
    { img: 'bg-issachar.jpg', thumb:  'bg-issachar-thumbnail.jpg'},
    { img: 'bg-joseph.jpg',   thumb:  'bg-josepth-thumbnail.jpg'},
    { img: 'bg-judah.jpg',    thumb:  'bg-judah-thumbnail.jpg'},
    { img: 'bg-manasseh.jpg', thumb:  'bg-manasseh-thumbnail.jpg'},
    { img: 'bg-naftali.jpg',  thumb:  'bg-naftali-thumbnail.jpg'},
    { img: 'bg-reuben.jpg',   thumb:  'bg-reuben-thumbnail.jpg'},
    { img: 'bg-simeon.jpg',   thumb:  'bg-simeon-thumbnail.jpg'},
    { img: 'bg-zebulun.jpg',  thumb:  'bg-zebulun-thumbnail.jpg'},
    { img: 'bg-0.jpg',  thumb: 'bg-thumbnail-0.jpg'},
    { img: 'bg-1.jpg',  thumb: 'bg-thumbnail-1.jpg'},
    { img: 'bg-2.jpg',  thumb: 'bg-thumbnail-2.jpg'},
    { img: 'bg-3.jpg',  thumb: 'bg-thumbnail-3.jpg'},
    { img: 'bg-4.jpg',  thumb: 'bg-thumbnail-4.jpg'},
    { img: 'bg-5.jpg',  thumb: 'bg-thumbnail-5.jpg'},
    { img: 'bg-6.jpg',  thumb: 'bg-thumbnail-6.jpg'},
    { img: 'bg-7.jpg',  thumb: 'bg-thumbnail-7.jpg'},
    { img: 'bg-8.jpg',  thumb: 'bg-thumbnail-8.jpg'},
    { img: 'bg-9.jpg',  thumb: 'bg-thumbnail-9.jpg'},
    { img: 'bg-10.jpg', thumb: 'bg-thumbnail-10.jpg'},
    { img: 'bg-angel-01.jpg', thumb: 'bg-angel-thumbnail-01.jpg'},
    { img: 'bg-angel-02.jpg', thumb: 'bg-angel-thumbnail-02.jpg'},
]

// Should be Props
const bgRandomImages = [
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

export default function Puzzle() {
    
    const randomSelectImage = () => {
        const random = Math.floor(Math.random() * bgRandomImages.length);
        return bgRandomImages[random].img;
   }

    const navigate = useNavigate()
    const [background, setBackground ] = useState(() => {
        const saved = localStorage.getItem("image-backround");

        const transition = localStorage.getItem("transition-mode");
        if ( transition === 'true' ) {
            return randomSelectImage()
        }
        // return randomSelectImage()
        const initialValue = saved;
        return initialValue || "";
    });

   const [transition, setTransition] = useState(() => {
     const initialValue  =  localStorage.getItem("transition-mode");
     return initialValue || "";
   });
   
   const handleChange = () => {
        setTransition(!transition);
   };

   const [color, setColor ] = useState(() => {
       const saved = localStorage.getItem("crossword-color");
       const initialValue = saved;
       return initialValue || "";
   });

   const [color1, setColor1 ] = useState(() => {
    const saved = localStorage.getItem("crossword-color2");
    const initialValue = saved;
    return initialValue || "";
});

  const handleColor = (c1, c2) => {
    setColor(c1)
    setColor1(c2)
  }

 
  
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

    return<div>
        <div className="min-h-full">
             
             <Header />
             <CrosswordPuzzle background={background} color={color} color1={color1}   />
            
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
                                    { !transition &&
                                        <div class="grid grid-cols-6 gap-1">
                                        {
                                            bgImages.map((job, index )=> (
                                            <div  key={index}>
                                                <img onClick={() => setBackground(job.img)} class="cursor-pointer hover:bg-sky-700 squared-full h-20 w-20 shadow-lg" src={'thumbnails/'+job.thumb} alt="" />
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
                                                    puzzleColorGradient.map( (clr, index )=> (
                                                        <div onClick={() => handleColor(clr.color1, clr.color2)} key={index} class="shadow-lg bg-blue-500 h-10 w-10 ml-1 cursor-pointer" style={{background: `linear-gradient(to left,  ${clr.color1} 0%,${clr.color2} 100%)`}}>
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
                <div className="sub-button shadow">
                <Link to="/">
                    <FontAwesomeIcon icon={faHome} className="text-white" />
                </Link>
                </div>
             </div>

        </div>
    </div>
}