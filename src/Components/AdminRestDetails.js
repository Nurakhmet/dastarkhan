import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css' ;
import React, { useState, useEffect,useContext } from 'react';
import { Component } from 'react';
import { render } from '@testing-library/react';
import UserContext from './UserContext';
import {Link, useParams} from "react-router-dom";


function AdminRestDetails(params) {
    let {restId} = useParams();

    console.log(restId);

    const [id, setId] = useState(restId);




    const [data, setData] = useState([]);


    useEffect(() => {
        getRestaurant(restId);
    }, []);




    const user = useContext(UserContext);

    let jwt = localStorage.getItem('jwtToken');
    if(jwt != null){

    }

    const handleNameChange = event =>{
        setRestName(event.target.value);
    }

    const handleDescriptionChange = event =>{
        setDescription(event.target.value);
    }

    const handleUrlChange = event =>{
        setUrl(event.target.value);
    }



    const handleSubmit = event =>{


        const inputData = {restName,description,imageUrl}
        saveRestaurant(inputData);
        setRestName("");
        setDescription("");
        setUrl("");


        event.preventDefault();


    }

    const [restName,setRestName] = useState("");
    // setRestName(data.restName);
    const [imageUrl,setUrl] = useState("");
    // setUrl(data.imageUrl)
    const [description,setDescription] = useState("");
    // setDescription(data.description)
    const [message, setMessage] = useState("");
    const [newId, setNewId] = useState(0);

    async function saveRestaurant(data){
        const bearer = "Bearer "+ localStorage.getItem('jwtToken');
        const response = await fetch("http://localhost:8000/api/saveRestaurants", {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Authorization" : bearer,
                "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",

            body: JSON.stringify(data)
        });
        let messData = await response.json();
        console.log(data);
        setMessage(messData.id? "Data Saved" : "Error");
    }

    async function getRestaurant(RestId) {
        const bearer = "Bearer "+ localStorage.getItem('jwtToken');
        let response = await fetch("http://localhost:8000/api/getRestaurants/"+RestId,{
            headers: {
            "Authorization" : bearer,
                "Content-Type": "application/json"
        }}
            );
        if(response.status==200){
            let data1 = await response.json();
            // setData(data1);
            setRestName(data1.restName);
            setDescription(data1.description);
            setUrl(data1.imageUrl);
            // change();
        }else{
            // setMsg("404 ITEM NOT FOUND");
        }
    }


    return(<div>
            <div className="row">
                <div className="col-9">
                    <h4>Edit Restaurant</h4>

                        <form onSubmit={handleSubmit}>

                            <div className="form-group">
                                <label style={{color: "black"}} htmlFor="exampleInputEmail1">Restaurant Name</label>
                                <input type="text" className="form-control" value={restName} onChange={handleNameChange} id="exampleInputEmail1"
                                       aria-describedby="emailHelp"/>
                            </div>
                            <div className="form-group">
                                <label style={{color: "black"}}  htmlFor="exampleInputPassword1">Description</label>
                                <input type="text" className="form-control" value={description} onChange={handleDescriptionChange} id="exampleInputPassword1"/>
                            </div>
                            <div className="form-group">
                                <label style={{color: "black"}}  htmlFor="exampleInputPassword2">URL</label>
                                <input type="text" className="form-control" value={imageUrl} onChange={handleUrlChange} id="exampleInputPassword2"/>
                            </div>

                            <button className="waves-effect modal-close waves-light btn-small right" style = {{backgroundColor:"#2D4059", color: "#FFD460"}} ><i
                                className="material-icons right">add</i>Save
                            </button>
                        </form>

                </div>
            </div>

            {/*<table>*/}
            {/*    <thead>*/}
            {/*    <tr>*/}
            {/*        <th>ID</th>*/}
            {/*        <th>Name</th>*/}
            {/*        <th>Description</th>*/}
            {/*        <th>Actions</th>*/}
            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>*/}
            {/*    {rest}*/}
            {/*    </tbody>*/}
            {/*</table>*/}

        </div>
    )

}

export default  AdminRestDetails;

