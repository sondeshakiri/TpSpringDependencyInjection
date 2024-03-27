import backend from "C:/Users/sondes/trekventures/frontend/src/assets/backend.jpg";

export default function FirstComponent(){
    return(
        <div className="firstcomponet">
           
          <img src={backend} className="image1"></img>
          
            <div className="overlay">
                <h1> Contact Us </h1>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
                et dolore magna aliqua.<br></br> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                </p>
                <a href="#sectionA">
                <button type="submit" >Envoyer</button>
                </a>
            
            </div>

        </div>
    )
}