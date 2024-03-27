
import carte from "C:/Users/sondes/trekventures/frontend/src/assets/carte.jpg";

export default function ThirdCompContact(){
    return(
        <div className="map">
            <div className="mapcont">
            <h2> trouvez-nous sur google maps </h2>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
                et dolore magna aliqua.<br></br> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                </p>
            </div>
            
            <img src={carte} className="imag"></img>
        </div>
    )
}