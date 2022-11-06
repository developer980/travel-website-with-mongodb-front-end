import logo from './logo.svg';
import './App.css';
import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import Sign_up from './pages/Sign_up/Sign_up';
import Form from './pages/Post/form';
import Booking from './pages/Booking/booking';

function App() {
  return (
    <Routes>
      <Route exact path = "/" element = {<Home/>}/>
      <Route path = "/sign_up" element = {<Sign_up/>}/>
      <Route path = "/shop" element = {<Shop/>}/>
      <Route path = "/form" element = {<Form/>}/>
      <Route path = "/booking_page" element = {<Booking/>}/>
    </Routes>
  );
}

export default App;
