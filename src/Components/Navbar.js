import React, { useState,useContext,useEffect } from 'react';
// import './../bootstrap/css/bootstrap.min.css';
import UserContext from './UserContext';
// import Logout from "./Logout";
import Profile from "./Profile";
import {Redirect, Route, Switch} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";
import Main from "./Main";
import Tools from "./Tools";
import Restaurants from "./Restaurants";
import Contacts from "./Contacts";

import RestaurantsPage from "./RestaurantsPage";
import ModerTools from "./ModerTools";
import Cart from "./Cart";
import RestDishes from "./RestDishes";





function Navbar({currentUser}){
    const {user,login,logout,profile} = useContext(UserContext);



    // const onAdd = (dishes) => {
    //     const exist = cartItems.find(x => x.id === dishes.id);
    //     if(exist){
    //         setCartItems(cartItems.map(x => x.id === dishes.id ? {...exist, qty: exist.qty + 1} : x
    //
    //         )
    //         );
    //     } else {
    //         setCartItems([...cartItems, {...dishes, qty: 1}])
    //     }
    // }
    useEffect(()=>{
        profile();
    },[]);

    return(
        <div>

            <div className="navbar navbar-expand-lg" style={{fontFamily: "Montserrat"}}>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a href={`/`} className="nav-link" style ={{fontSize: '30px', fontFamily: "Montserrat",color: "#2D4059"}}> <strong>Dastarkhan</strong> </a>
                            </li>
                        </ul>

                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" style={{color: "#2D4059"}} href={`/`}> <strong>Dishes</strong></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" style={{color: "#2D4059"}} href={`/restaurantsPage`}> <strong>Restaurants</strong></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" style={{color: "#2D4059"}} href={`/contacts`}> <strong>Contacts</strong></a>
                            </li>
                        </ul>
                        <ul className="navbar-nav right">
                            {user.roles[0].role == "ROLE_ADMIN" ?
                            <li className="nav-item">
                                {user.auth?<a className="nav-link" style={{color: "#2D4059"}} href={`/tools`}> <strong>Tools</strong></a>:""}
                            </li>
                                :
                                ""
                            }
                            {user.roles[0].role == "ROLE_MODER" ?
                                <li className="nav-item">
                                    {user.auth?<a className="nav-link" style={{color: "#2D4059"}} href={`/modertools`}> <strong>ModerTools</strong></a>:""}
                                </li>
                                :
                                ""
                            }
                            <li className="nav-item">
                                {user.auth?<a className="nav-link" style={{color: "#2D4059"}}  href={`/profile`}> <strong>{user.fullName}</strong></a>:<a className="nav-link" style={{color: "#2D4059"}} href={`/register`}>
                                    <strong>Register</strong>
                                    </a>}
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" style={{color: "#2D4059"}} href={`/cart`}> <strong>Cart</strong> </a>
                            </li>
                            <li className="nav-item">
                                {user.auth?<Logout/>:<a className="nav-link" style={{color: "#2D4059"}} href={`/login`}> <strong>Login</strong> </a>}
                            </li>
                        </ul>
                </div>
            </div>
            <Switch>
                <Route path = "/contacts">
                    <Contacts  />
                </Route>
                <Route path = "/tools">
                    <Tools/>
                </Route>
                <Route path = "/modertools">
                    <ModerTools/>
                </Route>
                <Route path = "/restaurantsPage">
                    <RestaurantsPage/>
                </Route>
                <Route path = "/register">
                    <Register  />
                </Route>
                <Route path = "/restdishes/:restId">
                    <RestDishes/>
                </Route>
                <Route path = "/login">
                    {user.auth?<Redirect to = "/profile"/>:<Login/> }
                </Route>
                <Route path = "/profile">
                    <Profile/>
                </Route>

                <Route path = "/cart">
                    <Cart/>
                </Route>
                <Route path = "/">
                    <Main/>
                </Route>

            </Switch>
            <div className="row" style={{height: "50px"}}></div>
        </div>
    )

}
export default Navbar;