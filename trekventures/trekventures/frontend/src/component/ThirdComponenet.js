
import React from 'react';
import ImageSlider from './ImagesSlider';
import nick from "C:/Users/sondes/trekventures/frontend/src/assets/nick.jpg";
import bck3 from "C:/Users/sondes/trekventures/frontend/src/assets/back3.jpg";
import img2 from "C:/Users/sondes/trekventures/frontend/src/assets/img2.jpg";
import signin from "C:/Users/sondes/trekventures/frontend/src/assets/signin.jpg";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';




export default function ThirdComponenet(){
    const images = [
        nick,
        bck3,
        img2,
        // Ajoutez d'autres URL d'images ici
      ];
    return(
        <div className="special-offer">
            <h5> Á Ne Pas Rater</h5>
            <h1>offres special </h1>
            <ImageSlider images={images} />
            <div className='justified'>
            
            <img src={signin} className='signin'></img>
            <div className='autre'>

            <h4>Pas encore membre?</h4>
            <p>Rejoignez-nous! nos membres peuvent accéder à des économies <br></br>allant jusqu'à 50 % et gagner des Trop Coins lors de la réservation.</p>
            <Link to="/Connecter">
             <Button variant="outlined" >
             Connecter
            </Button>
            </Link>
            <Link to="/Inscrire">
            <Button variant="contained" endIcon={<SendIcon />}>
            s'inscrire
            </Button>
            
            </Link>
            </div>
            </div>
        
        </div>
    )
}





