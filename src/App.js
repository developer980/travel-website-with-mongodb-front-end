import logo from './logo.svg';
import './App.css';
import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
// import Sign_up from './pages/Sign_up/Sign_up';
import Form from './pages/log_in/form';
import Booking from './pages/Booking/booking';
import { useSelector } from 'react-redux';
import Verification from './pages/verification/verification';
import Form1 from './pages/log_in/form1';
import Favourites from './pages/favourites/favourites';
import Password_recovery from './pages/log_in/password_recovery';
import New_password_form from './pages/log_in/new_password_form';



function App() {
  // const { token } = useSelector(state => state.date)
  // console.log("token: " + token)
  return (
    <Routes>
      <Route exact path = "/" element = {<Home/>}/>
      <Route path = "/shop" element = {<Shop/>}/>
      <Route path = "/form" element = {<Form/>}/>
      <Route path="/booking_page" element={<Booking />} />
      <Route path="/confirm_:token" element={<Verification />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/log_in" element={<Form1/>} />
      <Route path="/password_recovery" element={<Password_recovery/>} />
      <Route path="/resetPasswordfor_:token" element={<New_password_form/>} />
    </Routes>
  );
}

export default App;
