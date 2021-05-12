import React, {useContext, useState} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import UserProvider from "./Components/UserProvider";
import Navbar from './Components/Navbar';
import UserContext from "./Components/UserContext";
import './bootstrap/css/bootstrap.min.css';
import Footer from "./Components/Footer";



function App() {
  let jwt = localStorage.getItem('jwtToken');
  const {user,login,logout,profile} = useContext(UserContext);


  return (
          <div style={{backgroundColor: "#FFC93C", color: "#2D4059", fontFamily: "Montserrat", fontSize: "14pt"}}>
              <div className="container">

                  <UserProvider>

                      <Router>
                          <Navbar currentUser={user}/>
                      </Router>

                  </UserProvider>
              </div>
              <Footer/>
          </div>
  );
}

export default App;
