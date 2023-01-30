import style from './style.css';
import { useEffect } from 'react';

import { useWindowSize } from '@react-hook/window-size'
import Confetti from 'react-confetti'

export default function CongratulationView()  {

    const { width, height } = useWindowSize()
     
    return<div>
             <Confetti width={width} height={height} />
            <div style={{textAlign: 'center'}}>
                <div className="checkmark-circle">
                    <div className="background"></div>
                    <div className="checkmark draw"></div>
                </div>
                <h1>Congratulations!</h1>
                <p>You are all set. Well done!</p>
                <button className="submit-btn" type="submit" >Continue</button>
            </div>   
    </div>
}



  