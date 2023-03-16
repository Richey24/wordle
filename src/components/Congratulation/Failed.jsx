import style from './style.module.css';
import { useEffect } from 'react';
import cancel from "../../img/cancel.png"

import { useWindowSize } from '@react-hook/window-size'
import Confetti from 'react-confetti'

export default function FailedDiv(props) {

    const { width, height } = useWindowSize()

    return <div>
        <div style={{ textAlign: 'center', zIndex: "3000", position: "relative" }}>
            <div class="grid place-items-center">
                <img src={cancel} alt="Cancel Icon" width="150px" hieght="150px" />
            </div>
            <h1>{props.title}</h1>
            <h2>{props.message}</h2>
            <button onClick={props.nextWord} className={style.submitBtn} style={{ backgroundColor: "#F15249", border: "none" }} type="submit" >Continue</button>
        </div>
    </div>
}



