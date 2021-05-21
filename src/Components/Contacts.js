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
            <div className="ml-4 pt-4">
                <h1>Contacts</h1>
            </div>
            <div className="row pb-3">
                <div className="col-5">
                    <h5 className="ml-4">Tel: 870141111167</h5>
                    <h5 className="ml-4">Fax: 877123412345</h5>
                </div>
                <div className="col-7">
                    {/*<div style={{position:"relative",overflow:"hidden"}}>*/}
                        <div>
                        <iframe src="https://yandex.kz/map-widget/v1/-/CCU4nZQ7OA" style={{position:"relative",width:"95%", height:"400px",allowFullScreen:"true"}}/>
                    </div>

                </div>
            </div>
        </div>
    </div>
}

export default  Contacts;

