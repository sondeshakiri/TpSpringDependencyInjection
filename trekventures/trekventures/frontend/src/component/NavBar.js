import logo1 from "C:/Users/sondes/trekventures/frontend/src/assets/logo1.jpg";
import more from "C:/Users/sondes/trekventures/frontend/src/assets/more.png";
import profil from "C:/Users/sondes/trekventures/frontend/src/assets/profil.png";
import { NavLink } from "react-router-dom";

export default function NavBar(userLoggedIn){
    console.log(userLoggedIn)
  
    return(
        <div className="navbar">
            <div className="leftside">
            <img src={logo1} id="logo"></img>
            
                <a><NavLink to="/">Home</NavLink></a>
                <a><NavLink to="/">Reservation</NavLink></a>
                <a><NavLink to="/">Estimer</NavLink></a>
                <a><NavLink to="/ContactUs">Contact</NavLink></a>
                <a><NavLink to="/">Avis</NavLink></a>
            </div>
                <div className="rightside">
                
                    <a><NavLink to="/Inscrire">Inscrire</NavLink></a>
                    <a><NavLink to ="/Connecter">connecter</NavLink></a>
                  
                    {userLoggedIn &&
                    (
                        <a>
                        <NavLink to="/Profil">
                        <img src={profil} id="im" alt="Profil" />
                        </NavLink>
                        </a>
                    )}
                   
               
                    <a ><img src={more} id="im"></img></a>
                    

            
                </div>
        
            
            

           
        </div>
    )
}