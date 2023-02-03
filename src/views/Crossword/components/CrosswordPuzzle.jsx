import {Fragment, useEffect, useState, useRef} from 'react';
import { Dialog, Transition } from '@headlessui/react'

import './crossword.css';
import './crossword.js';

import Congratulation from '../../../components/Congratulation/CongratulationView';
import Failed from '../../../components/Congratulation/Failed'

export default function CrosswordPuzzle(props) {

    const [gameStarted, setGameStarted] = useState(false);    
    const style  =  { background:  `linear-gradient(to left,  ${props.color} 0%,${props.color1} 100%)`, };
    const [failed, setFailed ] = useState(false);

    const handleFailed = () => {
        setFailed(true)
    } 

    useEffect(() => {
            placeResults()
             // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const selectWord = () => {
        const inputString = document.querySelector('#inputstring')

        const scoreValue = document.querySelector('#scoreValue')
        const bgMusic = document.getElementById("bgMusic")
        const countdown = document.querySelector('#countdown')
        const spaceKeyImg = document.querySelector('#spacekey')
        const scoreText = document.querySelector('#scoreText')

        spaceKeyImg.style.filter = "brightness(50%)"
        let correct = false

        window.data.forEach((object) => {
            if (object.result === inputString.innerHTML.toLowerCase() && !window.solved.includes(inputString.innerHTML.toLowerCase())) {
                correct = true
                new Audio("audio/correct.mp3").play()
                scoreValue.innerHTML = Number(scoreValue.innerHTML) + (object.result.length * 10)
                scoreText.style.color = "lime"
                scoreText.animate(
                    [{ color: "lime" }, { color: "white" }],
                    { duration: 3000, easing: "linear", fill: "forwards" }
                )
                object.occupied.forEach((cellNo) => {
                    let blocksArray = getBlocksAtCellNo(cellNo)
                    if (blocksArray.length === 1) {
                        blocksArray[0].style.transform = "scale(1)"
                    } else if (blocksArray.length === 2) {
                        if (blocksArray[0].style.transform === "scale(1)") {
                            blocksArray[0].style.transform = "scale(1)"
                        } else {
                            blocksArray[1].style.transform = "scale(1)"
                        }
                    }
                })
                window.solved.push(object.result)

                if (window.solved.length === 7) {
                    // bgMusic.pause()
                    new Audio("audio/Celebration.mp3").play()
                    clearInterval(window.countdownID)
                    scoreValue.innerHTML = Number(scoreValue.innerHTML) + Number(countdown.innerHTML) + 1000
                    setOpen(true);

                    setTimeout(() => {
                        new Audio("audio/Celebration.mp3").stop()
                        setOpen(false);
                        // Update server
                    },5000)
                }
            }
        })
        !correct && new Audio("audio/wrong.mp3").play()
        inputString.innerHTML = ""
    }

    const deleteChar = () => {
       
        const inputString = document.querySelector('#inputstring')
        const backspaceKeyImg = document.querySelector('#backspacekey')

        inputString.innerHTML = inputString.innerHTML.slice(0, inputString.innerHTML.length - 1)
        backspaceKeyImg.style.filter = "brightness(50%)"
        new Audio("audio/backspace.mp3").play()
    }
    
    useEffect(() => {
        document.addEventListener("keydown", async (e) => {
            
             const inputString = document.querySelector('#inputstring')
             const alphaKeys = document.querySelectorAll('.alphabetickey')

            if (window.keysAllowed && window.sample.includes(e.key.toLowerCase()) && inputString.innerHTML.length !== 6 && !e.repeat) {
                inputString.innerHTML = inputString.innerHTML + e.key.toLowerCase()
                alphaKeys[window.sample.indexOf(e.key.toLowerCase())].querySelector("img").style.filter = "brightness(50%)"
                new Audio("audio/keyPress.mp3").play()
            }

            if (e.key === "Escape" && window.keysAllowed) {
                // alert('Are you sure you want to quite')
                gameOver()
            }

            if (window.keysAllowed && e.code === "Enter" && !e.repeat && inputString.innerHTML.length >= 3) {
                selectWord();
            }

            if (e.key === "Backspace" && window.keysAllowed && inputString.innerHTML.length > 0 && !e.repeat) {
                deleteChar()
            }

            if (e.key === "Space" && window.keysAllowed && (window.solved.length === 8 || window.skips !== 3)) {
                alert('Are you sure you want to start')

                window.solved.length !== 8 && window.skips++
                window.solved = []
                inputString.innerHTML = ""
                clearInterval(window.countdownID)
                window.keysAllowed = false
                // body.style.filter = "blur(200px)"
                // body.style.backdropFilter = "blur(200px)"
                await new Promise(resolve => setTimeout(resolve, 500))
                window.data = []
                placeResults()
                // body.style.filter = "blur(0px)"
                // body.style.backdropFilter = "blur(0px)"
                await new Promise(resolve => setTimeout(resolve, 500))
                triggerCountdown()
                // bgMusic.play()
                window.keysAllowed = true
            }
        })
    }, [])

    const handleKeySelectA = () => {
        console.log(window.sample)
        const inputString = document.querySelector('#inputstring');
        var arr = window.sample.toString();
        inputString.innerHTML += arr[0]
    }   

    const handleKeySelectB = () => {
        console.log(window.sample)
        const inputString = document.querySelector('#inputstring');
        var arr = window.sample.toString();
        inputString.innerHTML += arr[1]
    }   

    const handleKeySelectC = () => {
        console.log(window.sample)
        const inputString = document.querySelector('#inputstring');
        var arr = window.sample.toString();
        inputString.innerHTML += arr[2]
    }   

    const handleKeySelectD = () => {
        console.log(window.sample)
        const inputString = document.querySelector('#inputstring');
        var arr = window.sample.toString();
        inputString.innerHTML += arr[3]
    }   

    const handleKeySelectE = () => {
        console.log(window.sample)
        const inputString = document.querySelector('#inputstring');
        var arr = window.sample.toString();
        inputString.innerHTML += arr[4]
    }   

    const handleKeySelectF = () => {
        console.log(window.sample)
        const inputString = document.querySelector('#inputstring');
        var arr = window.sample.toString();
        inputString.innerHTML += arr[5]
    }   

    const startGame = () => {
        setGameStarted(true)
        new Promise(resolve => setTimeout(resolve, 500))
        // new Audio("audio/bgMusic.mp3").play()
        // inputString.innerHTML = ""
        triggerCountdown()
        document.querySelectorAll(".alphabetickey span").forEach(elem => elem.style.opacity = "1")
        window.keysAllowed = true
    }

    const triggerCountdown = () => {
        clearInterval(window.countdownID)

        const countdown = document.querySelector('#countdown')
        countdown.innerHTML = 300
        window.countdownID = setInterval(() => {
            countdown.innerHTML = Number(countdown.innerHTML) - 1
            countdown.innerHTML === "0" && gameOver()
        }, 1000)
    }
    
    const gameOver = () => {
        new Audio("game over.wav").play()
        const inputString = document.querySelector('#inputstring')
       
        inputString.innerHTML = ""
        blocks().forEach(block => block.style.transform = "scale(1)")
        clearInterval(window.countdownID)
        window.keysAllowed = false
        setFailed(true)
    }

    const placeResults = () => {
        window.data = []
        blocks().forEach(block => block.remove())
        
        const cells = document.querySelectorAll('.cell')
        cells.forEach(cell => cell.style.opacity = "1")
        let results = getResults()
            console.log(results)
        placeFirstResult(results)

        let remaining = results.slice(1)
        for (let i = 0; i < 15; i++) {

            if (window.data.length === 10) {
                break
            }

            let placements = []
            Array.from(remaining[0]).forEach((alphabetA, indexA) => {
                window.data.forEach((object) => {
                    Array.from(object.result).forEach((alphabetB, indexB) => {
                        if (alphabetA === alphabetB) {
                            let intersectCellNo = object.occupied[indexB]
                            let direction = invertDirection(object.direction)
                            let firstAlphabetCellNo = direction === 'horizontal' ? intersectCellNo - indexA : intersectCellNo - (indexA * 10)
                            placements.push({ result: remaining[0], direction, firstAlphabetCellNo })
                        }
                    })
                })
            })
    
            let validPlacement = false
            for (let i = 0; i < placements.length; i++) {
                let X = cellNoToX(placements[i].firstAlphabetCellNo)
                let Y = cellNoToY(placements[i].firstAlphabetCellNo)
                delete placements[i].firstAlphabetCellNo
                placements[i].occupied = placeResult(remaining[0], placements[i].direction, X, Y)
    
                let outOfGrid = false
                blocks().forEach((block) => {
                    if (marginLeft(block) < 0 || marginLeft(block) > 450 || marginTop(block) < 0 || marginTop(block) > 450) {
                        outOfGrid = true
                    }
                })
    
                let test = true
                if (!outOfGrid) {
                    let gridWords = getGridWords()
                    gridWords.forEach((word) => {
                        if (!results.slice(0, window.data.length + 1).includes(word)) {
                            test = false
                        }
                    })
    
                    if (new Set(gridWords).size !== gridWords.length || gridWords.length !== results.slice(0, window.data.length + 1).length) {
                        test = false
                    }
                }
                if (test && !outOfGrid) {
                    validPlacement = true
                    window.data.push(placements[i])
                    remaining.shift()
                    break
                } else {
                    for (let j = 0; j < remaining[0].length; j++) {
                        const container = document.querySelector('#container')
                        container.lastChild.remove()
                    }
                }
            }
            if (!validPlacement) {
                results.push(results.splice(results.indexOf(remaining[0]), 1)[0])
                remaining.push(remaining.shift())
            }
        }
        
        arrangeWords()
        cells.forEach((cell, cellNo) => {
            if (!window.data.find(object => object.occupied.includes(cellNo))) {
                cell.style.opacity = "0"
            }
        })
    }

    const getResults = () => {

        const alphaKeys = document.querySelectorAll('.alphabetickey')

        let results;
        let alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
        
        do {
            window.sample = ''
            results = []
    
            let toBeSelectedFrom = [...alphabets]
    
            for (let i = 0; i < 6; i++) {
                let randomAlphabet = toBeSelectedFrom[Math.floor(Math.random() * toBeSelectedFrom.length)]
                window.sample = window.sample + randomAlphabet
                toBeSelectedFrom.splice(toBeSelectedFrom.indexOf(randomAlphabet), 1)
            }
    
            window.sample =  window.sample.split("").sort().join("")
    
            alphaKeys.forEach((elem, i) => {
                elem.querySelector("b").innerHTML = window.sample[i].toUpperCase()
            })
    
            window.dictionary.forEach((word) => {
                let test = true
    
                alphabets.forEach((alphabet) => {
                    if (word.includes(alphabet) && !window.sample.includes(alphabet)) {
                        test = false
                    }
                })
    
                if (test) {
                    if (word.length > 2 && word.length < 7) {
                        results.push(word)
                    }
                }
            })
        } while (results.length <= 15 || results.filter((result) => result.length >= 5).length > 3);
    
        results.sort((a, b) => b.length - a.length)
        results = results.slice(0, 25)
        return results
    }

    const placeFirstResult = (results) => {
        let X = 150
        let Y = 150
        let direction = ["horizontal", "vertical"][Math.floor(Math.random() * 2)]
       
        window.data.push({
            result: results[0],
            direction: direction,
            occupied: placeResult(results[0], direction, X, Y)
        })
    }

    const placeResult = (result, direction, X, Y) => {
        let html = ""
        let occupied = []
        let cellNo = coordsToCellNo(X, Y)
        for (let i = 0; i < result.length; i++) {
            occupied.push(direction === "horizontal" ? cellNo + i : cellNo + (i * 10))
            let style = `margin-left: ${direction === "horizontal" ? X + (i * 50) : X}px; margin-top: ${direction === "vertical" ? Y + (i * 50) : Y}px; transform: scale(0);`
            html += `<div class="wordblock" style="${style}">${result[i].toUpperCase()}</div>`
        }

        const container = document.querySelector('#container')
        container.insertAdjacentHTML("beforeend", html)

        return occupied
    }
     
    const coordsToCellNo = (X, Y) => {
        return ((Y / 50) * 10) + (X / 50)
    }
    
    const cellNoToX = (cellNo) => {
        return (cellNo % 10) * 50
    }
    
    const cellNoToY = (cellNo) => {
        return Math.trunc(cellNo / 10) * 50
    }
    
    const marginLeft = (block) => {
        return Number(block.style.marginLeft.split("px")[0])
    }
    
    const marginTop = (block) => {
        return Number(block.style.marginTop.split("px")[0])
    }
    
    const invertDirection = (direction) => {
        return direction === "horizontal" ? "vertical" : "horizontal"
    }
    
    const blocks = () => {
        return document.querySelectorAll(".wordblock")
    }

    const getGridWords = () => {
        let gridWords = []
        for (let row = 0; row <= 9; row++) {
            let word = "" 
            for (let column = 0; column <= 9; column++) {
                if (getBlocksAtCellNo((row * 10) + column).length) {
                    word = word + getBlocksAtCellNo((row * 10) + column)[0].innerHTML
                    if (word.length > 1 && column === 9) {
                        gridWords.push(word.toLowerCase())
                    }
                } else {
                    word.length > 1 && gridWords.push(word.toLowerCase())
                    word = ""
                }
            }
        }
    
        for (let column = 0; column <= 9; column++) {
            let word = ""
            for (let row = 0; row <= 9; row++) {
                if (getBlocksAtCellNo((row * 10) + column).length) {
                    word = word + getBlocksAtCellNo((row * 10) + column)[0].innerHTML
                    if (word.length > 1 && row === 9) {
                        gridWords.push(word.toLowerCase())
                    }
                } else {
                    word.length > 1 && gridWords.push(word.toLowerCase())
                    word = ""
                }
            }
        }
        return gridWords
    }

    const getBlocksAtCellNo = (cellNo) => {
        let blocksFound = []
        blocks().forEach((block) => {
            if (marginLeft(block) === cellNoToX(cellNo) && marginTop(block) === cellNoToY(cellNo)) {
                blocksFound.push(block)
            }
        })
        return blocksFound
    }
    
    const arrangeWords = (data) => {
      
        let minX = +Infinity
        let maxX = -Infinity
        let minY = +Infinity
        let maxY = -Infinity


        blocks().forEach((block) => {
            minX = Math.min(minX, marginLeft(block))
            maxX = Math.max(maxX, marginLeft(block))
            minY = Math.min(minY, marginTop(block))
            maxY = Math.max(maxY, marginTop(block))
        })

        let emptyColumnOnLS = minX / 50
        let emptyColumnOnRS = (450 - maxX) / 50

        window.data.forEach((object) => {
            object.occupied = object.occupied.map(cellNo => cellNo + Math.trunc((emptyColumnOnRS - emptyColumnOnLS) / 2))
        })

        blocks().forEach((block) => {
            block.style.marginLeft = `${marginLeft(block) + (Math.trunc((emptyColumnOnRS - emptyColumnOnLS) / 2) * 50)}px`
        })

        let emptyRowOnUS = minY / 50
        let emptyRowOnBS = (450 - maxY) / 50

        window.data.forEach((object) => {
            object.occupied = object.occupied.map(cellNo => cellNo + (Math.trunc((emptyRowOnBS - emptyRowOnUS) / 2) * 10))
        })

        blocks().forEach((block) => {
            block.style.marginTop = `${marginTop(block) + (Math.trunc((emptyRowOnBS - emptyRowOnUS) / 2) * 50)}px`
        })

    }


    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)
 
     const handleShow = (e) => {
         e.preventDefault();
         setOpen(true);
     }

   return <div className="min-h-screen bg-cover bg-no-repeat bg-fixed bg-center" style={{ backgroundImage: `url('https://absa7kzimnaf.blob.core.windows.net/newcontainer/${props.background}')` }}>
           <div className="grid h-screen place-items-center overflow-auto" >
                <div>
                    <div id="container">
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                        <div className="cell" style={style}></div>
                    </div>
                </div>

                <div className="max-w-lg rounded overflow-hidden shadow-lg">
                    <div className="">
                        <div className="">
                            <div id="inputinfo">

                                {gameStarted ?
                                    <div id="inputstring"  style={style} ></div>
                                    :
                                    <div id="inputstring"  style={style} onClick={startGame} > CLICK TO START</div>
                                }
                                <div id="alphabetickeys">
                                    <div className="alphabetickey" onClick={handleKeySelectA}>
                                        <img src="img/alphabet key.jpg" alt="" /> 
                                        <span><b>A</b></span>
                                    </div>
                                    <div className="alphabetickey" onClick={handleKeySelectB}>
                                        <img src="img/alphabet key.jpg" alt="" />
                                        <span><b>A</b></span>
                                    </div>
                                    <div className="alphabetickey" onClick={handleKeySelectC}>
                                        <img src="img/alphabet key.jpg" alt="" />
                                        <span><b>A</b></span>
                                    </div>
                                    <div className="alphabetickey" onClick={handleKeySelectD}>
                                        <img src="img/alphabet key.jpg" alt="" />
                                        <span><b>A</b></span>
                                    </div>
                                    <div className="alphabetickey" onClick={handleKeySelectE}>
                                        <img src="img/alphabet key.jpg" alt="" />
                                        <span><b>A</b></span>
                                    </div>
                                    <div className="alphabetickey" onClick={handleKeySelectF}>
                                        <img src="img/alphabet key.jpg" alt="" />
                                        <span><b>A</b></span>
                                    </div>
                                </div>
                                <div id="otherkeys">
                                    <div id="spacekey" onClick={selectWord}>
                                        <img src="img/space key.jpg" alt="" />
                                        <span><b>Enter</b></span>
                                    </div>
                                    <div id="backspacekey" onClick={deleteChar}>
                                        <img src="img/backspace key.jpg" alt="" />
                                        <span><b>Backspace</b></span>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div id="timer">
                                <div id="clock" style={style}>
                                    <div id="countdown"  >300</div>
                                </div>
                            </div>

                            <div id="levels">
                                <div id="level" style={style} >Level 1</div>
                            </div>

                            <div id="score">
                                <span id="scoreText"  >SCORE: <span id="scoreValue">0</span></span>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
         
            
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
                    <div className="fixed inset-0 bg-dark bg-opacity-75 transition-opacity" />
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
                            <Congratulation message={'Congratulations on your success!'} title={'Level Up!'}/>
                            </div>
                        </Dialog.Panel>
                        </Transition.Child>
                    </div>
                    </div>
                </Dialog>
           </Transition.Root>

           <Transition.Root show={failed} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
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
                                <Failed message={'It looks like you need more practice, try again!'} title={'Sorry!'}/>
                            </div>
                        </Dialog.Panel>
                        </Transition.Child>
                    </div>
                    </div>
                </Dialog>
           </Transition.Root>
   </div> 
}