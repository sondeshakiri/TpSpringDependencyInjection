import './CSS/App.css';
import NavBar from './component/NavBar';
import Home from './pages/Home';
import {Routes,Route} from 'react-router-dom';
import Inscrire  from './pages/Inscrire';
import Connecter from './pages/Connecter';
import { useState } from 'react';
import ContactUs from './pages/ContactUs';
import Footer from './component/Footer';

import UserProfil from './pages/UserProfil';
import ForgetPass from './pages/ForgetPass';
import ResetPassword from './pages/ResetPassword';
import ConfirmAccount from './pages/ConfirmAccount';
import SerchPage from './pages/SerchPage';


function App() {
  
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  console.log(userLoggedIn)
  return (
    <div className="App">
      
      
      <NavBar userLoggedIn={userLoggedIn}/>

      <Routes>
        <Route path='/' element={<Home/>}/> 
        <Route path='/Inscrire' element={<Inscrire/>}/> 
        <Route path='/Connecter' element={<Connecter userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />}/> 
        <Route path='/ContactUs' element={<ContactUs/>}/>
        <Route path='/Profil'  element={<UserProfil/>}/>
        <Route path='ForgetPass' element={<ForgetPass/>}/>
        <Route path='/ResetPassword' element={<ResetPassword/>}/>
        <Route path='/ConfirmAccount' element={<ConfirmAccount/>} />
         <Route path='/SerchPage' element={<SerchPage/>}/>
      </Routes>
     
      <Footer></Footer>

    </div>
  );
}

export default App;
