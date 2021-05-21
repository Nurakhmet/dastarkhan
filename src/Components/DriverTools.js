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
import DriverActiveOrders from "./DriverActiveOrders";
import DriverHistoryOrders from "./DriverHistoryOrders";

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
                            <a className="nav-link" style={{color: "#2D4059"}} href={`/drivertools/activeorder`}> <strong>Active Orders</strong></a>
                        </th>
                    </tr>
                    <tr>
                        <th scope="row">
                            <a className="nav-link" style={{color: "#2D4059"}} href={`/drivertools/orderhistory`}> <strong>Orders History</strong></a>
                        </th>
                    </tr>
                    </tbody>
                </table>

            </div>
            <div className="col-9">
                <div className="container">
                    <Switch>
                        <Route path="/drivertools/activeorder">
                            <DriverActiveOrders/>
                        </Route>
                        <Route path="/drivertools/orderhistory">
                            <DriverHistoryOrders/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    </div>
}

export default  Tools;

