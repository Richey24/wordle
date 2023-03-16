import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CongratulationView from '../components/Congratulation/CongratulationView'
import THeHeader from '../components/TheHeader'
import "./Alphabet.css"

const Alphabet = () => {
    const [alphabets, setAlphabets] = useState([['𐤁', '𐤀', '𐤃', '𐤄', '𐤂'], ['𐤈', '𐤉', '𐤅', '𐤇', '𐤆'], ['𐤌', '𐤋', '𐤎', '𐤊', '𐤍', '𐤏'], ['𐤒', '𐤓', '𐤕', '𐤐', '𐤔', '𐤑']])
    const [ans, setAns] = useState([])
    const [num, setNum] = useState(0)
    const [check, setCheck] = useState(alphabets[num])
    const [won, setWon] = useState(false)
    const navigate = useNavigate()

    const checkWin = () => {
        setTimeout(() => {
            let theAns = ""
            Array.from(document.getElementById("mainAlphaDiv").children).forEach((alp) => {
                theAns += alp.innerHTML
            })
            console.log(theAns, check.sort().join(""));
            if (theAns === check.sort().join("")) {
                setWon(true)
                const sound = new Audio(require("../sound/Celebration.mp3"))
                sound.play()
                setTimeout(() => {
                    sound.pause()
                }, 3000)
            }
        }, 100)
    }

    const clicked = (i) => {
        setAns([...ans, alphabets[num][i]])
        const arr = [...alphabets[num]]
        arr.splice(i, 1)
        const mainArr = [...alphabets]
        mainArr.splice(num, 1)
        mainArr.splice(num, 0, arr)
        setAlphabets(mainArr)
        if (ans.length >= alphabets[num].length - 1) {
            checkWin()
        }
    }

    const erased = (i) => {
        if (won) {
            return
        }
        const arr = [...ans]
        const mainArr = [...alphabets[num]]
        mainArr.splice(i, 0, arr[i])
        arr.splice(i, 1)
        setAns(arr)
        const otherArr = [...alphabets]
        otherArr.splice(num, 1)
        otherArr.splice(num, 0, mainArr)
        setAlphabets(otherArr)
    }

    const nextWord = () => {
        if (num >= alphabets.length - 1) {
            navigate(0)
            return
        }
        setCheck(alphabets[num + 1])
        setNum(num + 1)
        setAns([])
        setWon(false)
    }

    return (
        <div>
            <THeHeader />
            <h1 className='alphaHead'>Arrange the word in the right order</h1>
            <div className='alphabetDiv'>
                <div className='mainAlphaDiv' id='mainAlphaDiv'>
                    {
                        ans?.map((an, i) => (
                            <div onClick={() => erased(i)}>{an}</div>
                        ))
                    }
                </div>
                <div className='mainAlphaDiv'>
                    {
                        alphabets[num]?.map((alphabet, i) => (
                            <div onClick={() => clicked(i)}>{alphabet}</div>
                        ))
                    }
                </div>
            </div>
            {won && <div className='congratDiv'>
                <CongratulationView played={{ paid: true }} alpha={true} nextWord={nextWord} />
            </div>}
        </div>
    )
}

export default Alphabet