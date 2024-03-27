  import React, { useState,useEffect  } from "react";
  import { Link, useNavigate } from 'react-router-dom';
  import axios from 'axios';
  import insta from 'C:/Users/sondes/trekventures/frontend/src/assets/insta.png';
  import Facebook from 'C:/Users/sondes/trekventures/frontend/src/assets/facebook.png';
  import google from 'C:/Users/sondes/trekventures/frontend/src/assets/google.png';
  
  export default function Connecter({ setUserLoggedIn }) {
   
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    axios.defaults.withCredentials = true;
  
  
    const handleSubmit = () => { 
      axios.post("http://localhost:8081/login2", {
        email: email,
        password: password,
      }).then((response) => {
        
        if (response.data.message) {
          alert(response.data.message);
          setMessage(response.data.message);
        } 
      })
      .catch(error => {
        console.log(error)
        console.error('Erreur lors de la connection', error);
        setMessage('Une erreur s\'est produite lors de la connection.');
      });
    };


    useEffect(() => {
      axios.get("http://localhost:8081/login").then((response) => {
        if (response.data.loggedIn == true) {
          console.log(response)
        }

      });
    

    }, []);
  
  
    return (
      <div className="login-container">
        <div className="login-form">
          <h2>Connexion</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-groupe">
              <input
                type="email"
                id="emai"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="E-mail"
                required
              />
            </div>
            <div className="form-groupe">
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Mot de passe"
                required
              />
            </div>
            <button type="submit">Se connecter</button>
          </form>
          <p className="message">{message}</p>
          <p>Nouveau ici ? <Link to="/Inscrire">S'inscrire</Link></p>
          <p>Mot de passe oublier? <Link to="/ForgetPass">Mot de passe oublier? </Link></p>
          <p>Se connecter autrement :</p>
          <div className="connect">
            <img src={google} id="icon" alt="Google" />
            <img src={Facebook} id="icon" alt="Facebook" />
            <img src={insta} id="icon" alt="Instagram" />
          </div>
        </div>
      </div>
    );
  }
  