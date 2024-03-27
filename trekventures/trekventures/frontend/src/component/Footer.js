
import logo1 from "C:/Users/sondes/trekventures/frontend/src/assets/logo1.jpg";
import React from 'react';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-section">
        
          <img src={logo1} alt="Logo" />
          <p>
            Bienvenue sur notre site ! Nous sommes une entreprise dédiée à fournir des produits et services de haute qualité.
          </p>
          <a href="/Inscrire">
          <button >Inscription</button>
          </a>
        </div>
        <div className="footer-section">
          <h3>Liens importants</h3>
          <div className="links">
          <ul>
            <li><a href="/">Accueil</a></li>
            <li><a href="/about">À propos</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
          <ul>
            <li><a href="/">Accueil</a></li>
            <li><a href="/about">À propos</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
          </div>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email : contact@example.com</p>
          <p>Téléphone : +1 123 456 7890</p>
          <p>Adresse : 123, Rue du Commerce, 75001 Paris, France</p>
        </div>
        
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 Mon Entreprise. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
