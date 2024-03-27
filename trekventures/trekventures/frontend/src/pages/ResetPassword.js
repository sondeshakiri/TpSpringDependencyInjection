import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


export default function ResetPassword() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('t');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetClick = () => {
    if (token!="")
   { axios.post(`http://localhost:8081/reset-password/${token}`, {
      email: email,
      password: password, })
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.log(error)
        console.error('Erreur lors de la réinitialisation du mot de passe', error);
        setMessage('Une erreur s\'est produite lors de la réinitialisation du mot de passe.');
      });
   }
   else {
    console.log(token)
    setMessage('teken non.');
   }
  };

  return (
    <div className='contenue'>
    <div className="container-Reset">
      <h2>Réinitialisation de mot de passe</h2>
      <div className="forme-group">
        
        <input
          type="email"
          className="input"
          placeholder="Entrez votre e-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="input"
          placeholder="Entrez votre nouveau mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
         
      </div>
      <button className="button" onClick={handleResetClick}>Réinitialiser le mot de passe</button>
      <p className="message">{message}</p>
    </div>
    </div>
  );
}
