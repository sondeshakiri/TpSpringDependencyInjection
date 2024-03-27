import img2 from "C:/Users/sondes/trekventures/frontend/src/assets/img2.jpg";
import back3 from "C:/Users/sondes/trekventures/frontend/src/assets/back3.jpg";
import Button from '@mui/material/Button';
export default function FirstComponent(){
    return(
        <div className="firstcomponet">
           
          <img src={img2} className="image2"></img>
          
            <div className="overlay">
                <h1> Créez des souvenirs<br></br> éternels avec nos <br></br> circuits personnalisés.</h1><br></br>
                <button>explorer</button>
            </div>

        </div>
    )
}