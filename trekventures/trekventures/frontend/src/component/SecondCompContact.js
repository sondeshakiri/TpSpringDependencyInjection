import phone from "C:/Users/sondes/trekventures/frontend/src/assets/phone.png";
import mail from "C:/Users/sondes/trekventures/frontend/src/assets/mail.png";
import phone1 from "C:/Users/sondes/trekventures/frontend/src/assets/phone1.png";
import Location from "C:/Users/sondes/trekventures/frontend/src/assets/location.png";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
export default function SecondCompContact(){
    return (
        <div className="componentcontainer">
         <div className="information">
               <ul>
                  <li className="info">
                  <img src={phone} id="im"></img>
                    <div className="infotext">
                    <h5>Numero telephone</h5>
                    <p> +216 54 171 573</p>
                    </div>
                  </li>

                  <li className="info">
                  <img src={mail} id="im"></img>
                    <div className="infotext">
                    <h5>Email</h5>
                    <p> +216 54 171 573</p>
                    </div>
                  </li>

                  <li className="info">
                  <img src={phone1} id="im"></img>
                    <div className="infotext">
                    <h5>Numero Fax</h5>
                    <p> +216 54 171 573</p>
                    </div>
                  </li>

                  <li className="info">
                  <img src={Location} id="im"></img>
                    <div className="infotext">
                    <h5>Location</h5>
                    <p> +216 54 171 573</p>
                    </div>
                  </li>

                  
               </ul>
         </div>


        <div className="contactform" id="sectionA">
          <div className="contact">
            <h2>Envoyer Un message</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
                et dolore magna aliqua.
                </p>
            <form >
              <div className="Firstform">
              <div className="form">
                <input 
                  type="text"
                  id="firstName"
                  name="firstName"
                  
                  placeholder="Prénom"
                  required
                />
              </div>
              <div className="form">
                <input 
                  type="text"
                  id="lastName"
                  name="lastName"
             
                  placeholder="Nom"
                  required
                />
              </div>
              </div>
              

              <div className="Firstform">
              <div className="form">
                <input 
                     type="email"
                  id="email"
                  name="email"
                  
                  placeholder="E-mail"
                  required
                />
              </div>
              <div className="form">
                <input 
                  type="number"
                  id="password"
                  name="password"
                  
                  placeholder="Numéro téléphone"
                  required
                />
              </div>
              </div>
              <div className="form">
                <textarea
                  type="Text"
                  id="message"
                  name="message"
                  
                  placeholder="Message"
                  required
                  rows={5}
                  cols={48}
                  
                />
              </div>

              <Button variant="contained" endIcon={<SendIcon />}>
               Envoyer
                </Button>
              
              
    
           
   
            </form>
          </div>
        
        </div>
        
        </div>
      );
}