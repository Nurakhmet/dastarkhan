import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css' ;
import React, { useState, useEffect,useContext } from 'react';

import { Component } from 'react';
import { render } from '@testing-library/react';
import UserContext from './UserContext';
import {Redirect, Route, Switch} from "react-router-dom";
import Contacts from "./Contacts";
import Restaurants from "./Restaurants";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import Main from "./Main";
import AdminRestaurants from "./AdminRestaurants";
import AdminRestDetails from "./AdminRestDetails";
import AdminDishes from "./AdminDishes";
import AdminUsers from "./AdminUsers";
import AdminOrders from "./AdminOrders";

function Tools(params) {


    const user = useContext(UserContext);
    let jwt = localStorage.getItem('jwtToken');
    if(jwt != null){

    }


    return <div className = "container">
        <div className="row mt-4">
            <div className="col-3">
                <table className="table">
                    <tbody>
                    {/*<tr>*/}
                    {/*    <th scope="row">*/}
                    {/*        <a className="nav-link" style={{color: "#2D4059"}} href={`/tools`}> <strong>Tools</strong></a>*/}
                    {/*    </th>*/}
                    {/*</tr>*/}
                    <tr>
                        <th scope="row">
                            <a className="nav-link" style={{color: "#2D4059"}} href={`/tools/users`}> <strong>Users</strong></a>
                        </th>
                    </tr>
                    <tr>
                        <th scope="row">
                            <a className="nav-link" style={{color: "#2D4059"}} href={`/tools/restaurants`}> <strong>Restaurants</strong></a>
                        </th>
                    </tr>
                    <tr>
                        <th scope="row">
                            <a className="nav-link" style={{color: "#2D4059"}} href={`/tools/dishes`}> <strong>Dishes</strong></a>
                        </th>
                    </tr>
                    <tr>
                        <th scope="row">
                            <a className="nav-link" style={{color: "#2D4059"}} href={`/tools/orders`}> <strong>Orders</strong></a>
                        </th>
                    </tr>
                    </tbody>
                </table>

            </div>
            <div className="col-9">
                <div className="container">
                    <Switch>

                            <Route path="/tools/users">
                                <AdminUsers/>
                            </Route>
                        <Route path = "/tools/restaurants/details/:restId">
                            <AdminRestDetails/>
                        </Route>




                            <div>

                            <Route path="/tools/restaurants">
                                <AdminRestaurants/>
                            </Route>
                            <Route path="/tools/dishes">
                                <AdminDishes/>
                            </Route>
                                <Route path="/tools/orders">
                                    <AdminOrders/>
                                </Route>
                                {/*<Route path = "/tools/restaurants/details/:restId">*/}
                                {/*    <AdminRestDetails/>*/}
                                {/*</Route>*/}
                            </div>


                        <Route path = "/tools/dishes">
                            <div><h1>Dishes</h1></div>
                        </Route>
                        <Route path="/tools">
                            <div>
                                Tools page
                            </div>
                        </Route>
                        {/*<Route path = "/edit/:cardId">*/}
                        {/*    <Edit/>*/}
                        {/*</Route>*/}
                        {/*<Route path = "/tools">*/}
                        {/*    <Tools/>*/}
                        {/*</Route>*/}
                    </Switch>
                </div>
            </div>
        </div>
    </div>
}

export default  Tools;

