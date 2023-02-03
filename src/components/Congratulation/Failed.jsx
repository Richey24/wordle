import style from './style.module.css';
import { useEffect } from 'react';

import { useWindowSize } from '@react-hook/window-size'
import Confetti from 'react-confetti'

export default function CongratulationView(props)  {

    const { width, height } = useWindowSize()
     
    return<div>
            <div style={{textAlign: 'center'}}>
                <div class="grid place-items-center">
                    <img src="img/cancel.png" alt="Cancel Icon" width="200px" hieght="200px" />
                </div>
                <br />
                <h1>{props.title}</h1>  
                <h2>{props.message}</h2>
                <button className={style.submitBtn} type="submit" >Continue</button>
            </div>   
    </div>
}



  