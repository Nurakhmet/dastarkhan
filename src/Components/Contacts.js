import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css' ;
import React, { useState, useEffect,useContext } from 'react';
// import Carousel from 'react-bootstrap/Carousel';
import { Component } from 'react';
import { render } from '@testing-library/react';
import UserContext from './UserContext';

function Contacts(params) {


    const user = useContext(UserContext);
    let jwt = localStorage.getItem('jwtToken');
    if(jwt != null){

    }


    return<div className="container">
        <div className="mt-2" style={{backgroundColor: "#F07B3F", borderRadius: "20px"}}>
            <h1>Contacts</h1>
        </div>
    </div>
}

export default  Contacts;

