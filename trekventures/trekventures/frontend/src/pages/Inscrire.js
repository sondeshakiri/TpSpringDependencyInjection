import React, { useEffect, useState }  from "react";
import insta from 'C:/Users/sondes/trekventures/frontend/src/assets/insta.png';
import Facebook from 'C:/Users/sondes/trekventures/frontend/src/assets/facebook.png';
import google from 'C:/Users/sondes/trekventures/frontend/src/assets/google.png';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Inscrire(){

 
  const [values,setValues]=useState(
    {
      email:'',
      name:'',
      surname:'',
      password:''
    }
  )
 
  const navigate=useNavigate();
  const [message, setMessage] = useState('');


  const handleInput=(event)=>{
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });

    
    console.log(values)
       
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8081/signup', values);
      if (response.data.message){
        alert(response.data.message)
      }

    } catch (error) {
      console.error('Erreur lors de l\'inscription', error);
    }
  };
  
 

 

  
 
      
    //affichage
        return (
          <div className="sign-up-container">
            <div className="sign-up-form">
              <h2>Inscription</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                <div className="form-group">
                  <input 
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleInput}
                    placeholder="E-mail"
                    required
                  />
                </div>
                  
                  <input 
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleInput}
                    placeholder="nom"
                    required
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="text"
                    id="surname"
                    name="surname"
                    onChange={handleInput}
                    placeholder="Prénom"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <input 
                    type="password"
                    id="password"
                    name="password"
                    onChange={handleInput}
                    placeholder="Mot de passe"
                    required
                  />
                </div>
                  {message && <p>{message}</p>}
                  
                <button type="submit" >S'inscrire</button>
                
                <h5>-------------inscrire autrement ?-------------</h5>
                <div className="connect">
                <img src={google} id="icon"></img>
                   <img src={Facebook} id="icon"></img>
                   <img src={insta} id="icon"></img>

                </div>
      
             
     
              </form>
            </div>
          </div>
        );
      };
      
    
      





