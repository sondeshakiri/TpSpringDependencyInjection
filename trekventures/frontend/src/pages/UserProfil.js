
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import cookie from 'js-cookie'; // Importez la bibliothèque js-cookie
import { useLocation } from 'react-router-dom';

function UserProfil() {
  const location = useLocation();
  const [uData, setUserData] = useState(null);
  const [editable, setEditable] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedSurname, setEditedSurname] = useState('');
  const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
  const userEmailCookie = cookie.get('userEmail'); // Utilisez js-cookie pour obtenir la valeur du cookie




useEffect(() => {
  if (userEmailCookie) {
    const encodedEmail = decodeURIComponent(userEmailCookie);
    axios.get(`http://localhost:8081/info`, {
      headers: { Cookie: `userEmail=${encodedEmail}` },
      withCredentials: true 
    })
      .then(response => {
        console.log("Données de l'utilisateur récupérées :", response.data);
        const userData = response.data;
        setUserData( userData);
        setEditedName(uData.name);
        setEditedSurname(uData.surname);
        setEditedPhoneNumber(uData.phoneNumber)
        if (response.data.message)
        {alert(response.data.message)}
        
      })
      .catch(error => {
       
        
        console.error("Erreur lors de la récupération des données de l'utilisateur :", error);
      });
  }
}, [userEmailCookie]);

// ...

 
  const handleEditClick = () => {
    setEditable(true);
  };

  const handleSaveClick = () => {
    const updatedData = {
      name: editedName,
      surname: editedSurname,
      phoneNumber:editedPhoneNumber
      
    };

    axios.put(`http://localhost:8081/update-profile?email=${uData.email}`, updatedData, { withCredentials: true })
    .then(response => {
      alert(response.data.message);
      console.log("Données mises à jour avec succès :", response.data);
      
      setUserData(prevData => ({
        ...prevData,
        name: updatedData.name,
        surname: updatedData.surname,
        phoneNumber: updatedData.phoneNumber
      }));
      setEditable(false);
    })
    .catch(error => {
      console.error("Erreur lors de la mise à jour des données :", error);
    });
  

  
  };

  if (!uData) {
    return<div>
       <p>Chargement en cours...</p>
    </div>;
  }

  return (
    <div className="user-profile">
      <h2>Profil de l'utilisateur</h2>
      <div className="profile-info">
        <div className="profile-image">
          <img src="https://image.noelshack.com/fichiers/2023/32/4/1691663857-photo.jpg" alt="Photo de profil" />
        </div>
        <div className="profile-details">
          <p><strong>Email :</strong> {uData.email}</p>
          <p><strong>Nom :</strong> {editable ? <input type="text" value={editedName} onChange={e => setEditedName(e.target.value)} /> : uData.name}</p>
          <p><strong>Prénom :</strong> {editable ? <input type="text" value={editedSurname} onChange={e => setEditedSurname(e.target.value)} /> : uData.surname}</p>
          
          <p><strong>Téléphone :</strong>{editable ? <input type="text" value={editedPhoneNumber} onChange={e => setEditedPhoneNumber(e.target.value)} /> : uData.phoneNumber} </p>
        </div>
      </div>
      {editable ? (
        <Button variant="contained" onClick={handleSaveClick}>Sauvegarder</Button>
      ) : (
        <Button variant="contained" onClick={handleEditClick}>Modifier</Button>
      )}
    </div>
  );
}

export default UserProfil;

 