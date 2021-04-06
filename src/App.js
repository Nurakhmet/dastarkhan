import React, {useContext} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import UserProvider from "./Components/UserProvider";
import Navbar from './Components/Navbar';
import UserContext from "./Components/UserContext";


function App() {
  let jwt = localStorage.getItem('jwtToken');
  const {user,login,logout,profile} = useContext(UserContext);
  return (
    <div>
        <UserProvider >
          <Router>
            <Navbar currentUser = {user}/>
          </Router>
        </UserProvider>
    </div>
  );
}

export default App;
