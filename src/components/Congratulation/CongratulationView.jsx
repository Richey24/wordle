import style from './style.module.css';
import { useEffect } from 'react';

import { useWindowSize } from '@react-hook/window-size'
import Confetti from 'react-confetti'

export default function CongratulationView(props)  {

    const { width, height } = useWindowSize()
     
    return<div>
             <Confetti width={width} height={height} />
            <div style={{textAlign: 'center'}}>
                <div className={style.checkmarkCircle} >
                    <div className={style.background}></div>
                    <div className={`${style.checkmark} ${style.draw}` }></div>
                </div>
                <h1>Level Up!</h1>  
                <h2>{props.message}</h2>
                <button className={style.submitBtn} type="submit" >Continue</button>
            </div>   
    </div>
}



  