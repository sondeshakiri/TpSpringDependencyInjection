import * as React from 'react';
import FirstComponent from "../component/FirstComponent";
import SecondComponent from '../component/SecondComponent';
import ThirdComponent from '../component/ThirdComponenet';
import FourthComponent from '../component/FourthComponent';
import FifthComponent from '../component/FifthComponent';

export default function Home(){
    return(
        <div  >
            <div>
            <FirstComponent/>
            </div>
            
            <div>
            <SecondComponent/>
            </div>
            <div>
            <ThirdComponent/>
            </div>
            <div>
            <FourthComponent/>
            </div>
            <div>
            <FifthComponent/>
            </div>
            <div>
            <FourthComponent/>
            </div>

        
        </div>
    )
}