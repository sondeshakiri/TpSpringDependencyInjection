import Button from '@mui/material/Button';
import axios from 'axios';
import { useState } from 'react';

export default function ForgetPass() {
  const [email, setEmail] = useState('');

  const handleSaveClick = () => {
    axios.post("http://localhost:8081/pass", { email: email })  
      .then((response) => {
        if (response.data.message) {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de mail", error);
      });
  };

  return (
    <div className="forgetpass">
      <h3>Mot de Passe Oublié</h3>
      <p>Entrez vos détails pour recevoir un e-mail</p>
      <div className='emailEnter'>
        <input
          type="email"
          id="email"  // Correction de la typo ici
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="E-mail"
          required
        />
        <Button variant="contained" onClick={handleSaveClick}>Envoyer</Button>
      </div>
    </div>
  );
}
