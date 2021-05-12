import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css' ;
import React, { useState, useEffect,useContext } from 'react';
// import Carousel from 'react-bootstrap/Carousel';
import { Component } from 'react';
import { render } from '@testing-library/react';
import UserContext from './UserContext';
import {Link} from "react-router-dom";

function Restaurants(props) {



    const user = useContext(UserContext);

    let jwt = localStorage.getItem('jwtToken');
    if(jwt != null){

    }



    return(
        // <div className="col-4">
            <div className="card">
                <div className="card-content">
                    {/*<span className="card-title">{props.restaurants.restName}</span>*/}
                    {/*<Link className="blue-text text-darken-3" style={{fontWeight:"bold"}} to={`/details/${props.card.id}`}>DETAILS*/}
                    {/*    <i className="material-icons right" style={{color:"black"}}>more_vert</i></Link>*/}
                    <h1>{props.restaurant.id}</h1>
                    <h1>{props.restaurant.restName}</h1>
                </div>
            </div>
        // </div>
    )
    // <div className="col-4">
    //                     <div style={{backgroundColor: "#F07B3F", borderRadius: "20px"}}>
    //                         <h1 className="center">Restaurant</h1>
    //                         <p>Image</p>
    //                         <p>Description</p>
    //                         <button className="waves-effect waves-light btn-small"
    //                                 style={{backgroundColor: "#2D4059", color: "#FFD460"}} type="submit"><i
    //                             className="material-icons right">login</i> <strong>Dishes</strong></button>
    //                     </div>
    //                 </div>
}

export default  Restaurants;

