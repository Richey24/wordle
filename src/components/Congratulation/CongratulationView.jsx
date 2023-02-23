import style from './style.module.css';
import { useEffect } from 'react';

import { useWindowSize } from '@react-hook/window-size'
import Confetti from 'react-confetti'
import {  useNavigate } from "react-router-dom"
export default function CongratulationView(props)  {

    const { width, height } = useWindowSize()

    const navigate = useNavigate();

    const backToHome = () => {
        navigate(0)
    }

   if (props.played.paid === false) {
    return(
    <div>
        <Confetti width={width} height={height} />
        <div style={{textAlign: 'center'}}>
            <div className={style.checkmarkCircle} >
                <div className={style.background}></div>
                <div className={`${style.checkmark} ${style.draw}` }></div>
            </div>
            <h1>Level Up!</h1>  
            <h2>{props.message}</h2>
             {props.played.gamePlay === true && <button onClick={backToHome} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
               Home
            </button>} 
             <hr /> 
             {props.played.gamePlay === true && <div>Please subscribe if you want to continue playing</div>}    
             {/* Add Link to the subscription page  */}
        </div>
    </div>)
   } else {
    return (
    <div>
        <Confetti width={width} height={height} />
        <div style={{textAlign: 'center'}}>
            <div className={style.checkmarkCircle} >
                <div className={style.background}></div>
                <div className={`${style.checkmark} ${style.draw}` }></div>
            </div>
            <h1>Level Up!</h1>  
            <h2>{props.message}</h2>
            <button onClick={() => window.location.reload(true)} className={style.submitBtn} type="submit" >Continue</button>             
        </div>
    </div>)
   }
 
}



  