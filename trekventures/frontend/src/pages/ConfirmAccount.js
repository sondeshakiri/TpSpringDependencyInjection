import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link} from 'react-router-dom';

const ConfirmAccount = () => {
  const location = useLocation();
  const Navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('t');
  const [confirmationStatus, setConfirmationStatus] = useState('pending');

  useEffect(() => {
    if (token !="") {
        console.log(token) 
        confirmAccount(token);
    } else {
        console.log(token)
      setConfirmationStatus('error');
    }
  }, [token]);

  const confirmAccount = async (token) => {
    try {
      const response = await axios.get(`http://localhost:8081/confirm/${token}`);
      if (response.status === 200) {
        setConfirmationStatus('success');
  
      }
    } 
    catch (error) {
      setConfirmationStatus('error');
      console.error('Erreur lors de la confirmation du compte', error);
    }
  };

  return (
    <div className="confirm-account">
      {confirmationStatus === 'pending' && (
        <div>
          <p>Confirmation en cours...</p>
        </div>
      )}
      {confirmationStatus === 'success' && (
        <div>
          <p>Votre compte a été confirmé avec succès !</p>
          {/* Vous pouvez ajouter des liens de redirection ou d'autres actions ici */}
        </div>
      )}
      {confirmationStatus === 'error' && (
        <div>
          <p>Une erreur est survenue lors de la confirmation du compte.</p>
        </div>
      )}
     <Link to="/Connecter">Connecter Vous</Link>
    </div>
  );
};

export default ConfirmAccount;
