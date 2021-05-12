import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css' ;
import React, { useState, useEffect,useContext } from 'react';
import { Component } from 'react';
import { render } from '@testing-library/react';
import UserContext from './UserContext';
import {Link} from "react-router-dom";


function AdminRestaurants({newRestaurantAddedId}) {

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {});
    });

    const [resto, setResto]= useState({id:0, restName:"",description:"",imageUrl:""});
    const [data, setData] = useState([]);
    async function loadData() {
        const bearer = "Bearer "+ localStorage.getItem('jwtToken');
        let response = await fetch("http://localhost:8000/api/allRestaurants",{
                method: "GET",
                headers: {
                    "Authorization" : bearer,
                    "Content-Type" : "application/json"
                }
            }
        );
        let Data = await response.json();
        console.log(Data);
        setData(Data);
    }
    const [change,setChange] = useState(0);
    const handleRestoDataChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        setResto((prevalue) => {

            return {
                ...prevalue,
                [name]: value
            }

        })

    }

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
        addRestaurant(inputData);
        setRestName("");

        event.preventDefault();


    }

    const [restName,setRestName] = useState("");
    const [imageUrl,setUrl] = useState("");
    const [description,setDescription] = useState("");
    const [message, setMessage] = useState("");
    const [newId, setNewId] = useState(0);

    async function addRestaurant(data){
        const bearer = "Bearer "+ localStorage.getItem('jwtToken');
        const response = await fetch("http://localhost:8000/api/addRestaurants", {
            method: "POST",
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
        setMessage(messData.id? "Data Added : " : "Error");
        console.log(messData);
        setNewId(messData.id);
        setChange(change+1);
    }

    async function deleteRestaurants(data){
        const bearer = "Bearer "+ localStorage.getItem('jwtToken');
        console.log(data);
        const response = await fetch("http://localhost:8000/api/deleteRestaurants/"+data.id, {
            method: "DELETE",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Authorization":bearer,
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
        });
        if(response.status==200){
            setChange(change+1);
        }
    }

    async function editRestaurant(data){

        const bearer = "Bearer "+ localStorage.getItem('jwtToken');

        const response = await fetch("http://localhost:8000/api/saveRestaurants", {

            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Authorization":bearer,
                "Content-Type": "application/json",

            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        });

        if(response.status==200){
            setChange(change+1);

        }



    }

    useEffect(() => {
        loadData();
    }, [change]);
    //
    const rest = data?.map(restaurants=>(
        <tr>
            <td>{restaurants.id}</td>
            <td>{restaurants.restName}</td>
            <td>{restaurants.description}</td>
            <td>

                <a className="waves-effect waves-light btn modal-trigger" style = {{backgroundColor:"#2D4059", color: "#FFD460"}} onClick={()=>setResto(restaurants)}  href="#modal2">Edit</a>

                <button className="waves-effect waves-light ml-1 btn red" onClick={() => deleteRestaurants(restaurants)} type="button"
                        name="action">DELETE
                </button>
            </td>
        </tr>
    ));






    return(<div>
            <div className="row">
                <div className="col-6">
                    <h1>Restaurants</h1>
                </div>
                <div className="col-6">
                    <a className="waves-effect waves-light btn right modal-trigger" style = {{backgroundColor:"#2D4059", color: "#FFD460"}}  href="#modal1">Add new</a>

                    <div id="modal1" className="modal">
                        <div className="modal-content">
                            <div className="row">
                                <div className="col-6 offset-3">
                                    <h4>Add Restaurant</h4>

                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Restaurant Name</label>
                                            <input type="text" className="form-control" value={restName} onChange={handleNameChange} id="exampleInputEmail1"
                                                   aria-describedby="emailHelp"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword1">Description</label>
                                            <input type="text" className="form-control" value={description} onChange={handleDescriptionChange} id="exampleInputPassword1"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword2">URL</label>
                                            <input type="text" className="form-control" value={imageUrl} onChange={handleUrlChange} id="exampleInputPassword2"/>
                                        </div>

                                        <button className="waves-effect modal-close waves-light btn-small" style = {{backgroundColor:"#2D4059", color: "#FFD460"}} ><i
                                            className="material-icons right">add</i>Add New
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="modal2" className="modal">
                        <div className="modal-content">
                            <h4>Edit Restaurant</h4>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Restaurant Name</label>
                                <input type="text" className="form-control" name="restName" value={resto.restName}
                                       onChange={handleRestoDataChange} id="exampleInputEmail1"
                                       aria-describedby="emailHelp"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Description</label>
                                <input type="text" className="form-control" name="description" value={resto.description}
                                       onChange={handleRestoDataChange} id="exampleInputPassword1"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword2">URL</label>
                                <input type="text" className="form-control" name="imageUrl" value={resto.imageUrl}
                                       onChange={handleRestoDataChange} id="exampleInputPassword2"/>
                            </div>

                            {/*<button className="waves-effect modal-close waves-light btn-small"*/}
                            {/*        ><i*/}
                            {/*    className="material-icons right">add</i>Save*/}
                            {/*</button>*/}
                        </div>
                        <div className="modal-footer">
                            <a href="#!" className="waves-effect modal-close waves-light btn" style={{backgroundColor: "#2D4059", color: "#FFD460"}}
                               onClick={() => editRestaurant(resto)}>EDIT</a>
                        </div>
                    </div>


                </div>
            </div>

            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {rest}
                </tbody>
            </table>

        </div>
    )

}

export default  AdminRestaurants;

