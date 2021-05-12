import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css' ;
import React, { useState, useEffect,useContext } from 'react';
// import Carousel from 'react-bootstrap/Carousel';
import { Component } from 'react';
import { render } from '@testing-library/react';
import UserContext from './UserContext';

function Footer(params) {

    const user = useContext(UserContext);
    let jwt = localStorage.getItem('jwtToken');
    if(jwt != null){

    }


    return<div style={{backgroundColor: "#2D4059", color: "white", height: "125px"}}>
        <div className="container">
            <h2>Footer</h2>
            <h2>Bir</h2>
            <p className="pb-2 center" >Copyright {"\u00A9"} dastarkhan.kz 2021</p>
        </div>
    </div>
}

export default  Footer;

