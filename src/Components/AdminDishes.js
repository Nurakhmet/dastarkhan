import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css' ;
import React, { useState, useEffect,useContext } from 'react';
import { Component } from 'react';
import { render } from '@testing-library/react';
import UserContext from './UserContext';
import {Link} from "react-router-dom";



function AdminDishes({newRestaurantAddedId}) {

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {});
    });

    const [dishs, setDishs]= useState({id:0, dishName:"",price:"",imageUrl:"", restaurants:""});
    const [change,setChange] = useState(0);

    const handleDishesDataChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        setDishs((prevalue) => {
            return {
                ...prevalue,
                [name]: value
            }

        })

    }

    async function editDishes(data){

        const bearer = "Bearer "+ localStorage.getItem('jwtToken');

        const response = await fetch("http://localhost:8000/api/saveDishes", {

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

    const [data, setData] = useState([]);
    const [dataRest, setDataRest] = useState([]);
    async function loadData() {
        const bearer = "Bearer "+ localStorage.getItem('jwtToken');
        let response = await fetch("http://localhost:8000/api/allDishes",{
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


    async function loadRestaurants() {
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
        setDataRest(Data);
    }

    const user = useContext(UserContext);

    let jwt = localStorage.getItem('jwtToken');
    if(jwt != null){

    }

    const handleNameChange = event =>{
        setDishName(event.target.value);
    }

    const handlePriceChange = event =>{
        setPrice(event.target.value);
    }

    const handleUrlChange = event =>{
        setUrl(event.target.value);
    }

    const handleRestaurantChange = event =>{
        setRestaurants(event.target.value);
    }



    const handleSubmit = event =>{


        const inputData = {dishName,price,imageUrl}
        console.log("input" + restaurants);
        addDishes(inputData, restaurants);
        setDishName("");
        setPrice(0);
        setUrl("");
        setRestaurants(0);

        event.preventDefault();


    }

    const [dishName,setDishName] = useState("");
    const [imageUrl,setUrl] = useState("");
    const [price,setPrice] = useState("");
    const [restaurants, setRestaurants] = useState(0);
    const [restName,setRestName] = useState("");
    const [message, setMessage] = useState("");
    const [newId, setNewId] = useState(0);

    async function addDishes(data,restaurants){
        const bearer = "Bearer "+ localStorage.getItem('jwtToken');
        const response = await fetch("http://localhost:8000/api/addDish/"+restaurants, {
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

    async function deleteDishes(data){
        const bearer = "Bearer "+ localStorage.getItem('jwtToken');
        console.log(data);
        const response = await fetch("http://localhost:8000/api/deleteDishes/"+data.id, {
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

    useEffect(() => {
        loadData();
        loadRestaurants();
    }, [change]);
    //
    const dish = data?.map(dishes=>(
        <tr>
            <td>{dishes.id}</td>
            <td>{dishes.dishName}</td>
            <td>{dishes.price}</td>
            <td>{dishes.restaurants.restName}</td>
            <td>
                <a className="waves-effect waves-light btn modal-trigger" style = {{backgroundColor:"#2D4059", color: "#FFD460"}} onClick={()=>setDishs(dishes)}  href="#modal2">Edit</a>

                <button className="waves-effect waves-light ml-1 btn red" onClick={() => deleteDishes(dishes)} type="button"
                        name="action">DELETE
                </button>

            </td>
        </tr>
    ));


    console.log("list rest",dataRest);




    return(<div>
            <div className="row">
                <div className="col-6">
                    <h1>Dishes</h1>
                </div>
                <div className="col-6">
                    <a className="waves-effect waves-light btn right modal-trigger" style = {{backgroundColor:"#2D4059", color: "#FFD460"}}  href="#modal1">Add Dish</a>

                    <div id="modal1" className="modal">
                        <div className="modal-content">
                            <div className="row">
                                <div className="col-6 offset-3">
                                    <h4>Add Dish</h4>

                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Dish Name</label>
                                            <input type="text" className="form-control" value={dishName} onChange={handleNameChange} id="exampleInputEmail1"
                                                   aria-describedby="emailHelp"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword1">Price</label>
                                            <input type="number" className="form-control" value={price} onChange={handlePriceChange} id="exampleInputPassword1"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword2">URL</label>
                                            <input type="text" className="form-control" value={imageUrl} onChange={handleUrlChange} id="exampleInputPassword2"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword3">Restaurants</label>
                                                <select className="form-control" id="exampleInputPassword3" onChange={handleRestaurantChange}>
                                                    {dataRest?.map(rest => (
                                                        <option value={rest.id}>{rest.restName}</option>
                                                    ))}
                                                    {/*<option value="client" className="white-text" style={{color:"white"}}>Client</option>*/}
                                                    {/*<option value="driver">Driver</option>*/}
                                                    {/*<option value="restaurant">Restaurant</option>*/}
                                                </select>

                                        </div>

                                        <button className="waves-effect modal-close waves-light btn-small mt-5" style = {{backgroundColor:"#2D4059", color: "#FFD460"}} ><i
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
                                <input type="text" className="form-control" name="dishName" value={dishs.dishName}
                                       onChange={handleDishesDataChange} id="exampleInputEmail1"
                                       aria-describedby="emailHelp"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Description</label>
                                <input type="text" className="form-control" name="price" value={dishs.price}
                                       onChange={handleDishesDataChange} id="exampleInputPassword1"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword2">URL</label>
                                <input type="text" className="form-control" name="imageUrl" value={dishs.imageUrl}
                                       onChange={handleDishesDataChange} id="exampleInputPassword2"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword3">URL</label>
                                <select className="form-control" id="exampleInputPassword3"
                                        onChange={handleRestaurantChange}>
                                    {dataRest?.map(rest => (
                                        <option name={dishs.restaurants.restName} value={dishs.restaurants.id}>{dishs.restaurants.restName}</option>
                                    ))}
                                    {/*<option value="client" className="white-text" style={{color:"white"}}>Client</option>*/}
                                    {/*<option value="driver">Driver</option>*/}
                                    {/*<option value="restaurant">Restaurant</option>*/}
                                </select>
                            </div>

                            {/*<button className="waves-effect modal-close waves-light btn-small"*/}
                            {/*        ><i*/}
                            {/*    className="material-icons right">add</i>Save*/}
                            {/*</button>*/}
                        </div>
                        <div className="modal-footer">
                            <a href="#!" className="waves-effect modal-close waves-light btn" style={{backgroundColor: "#2D4059", color: "#FFD460"}}
                               onClick={() => editDishes(dishs)}>EDIT</a>
                        </div>
                    </div>


                </div>
            </div>

            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Restaurant</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {dish}
                </tbody>
            </table>

        </div>
    )
}

export default  AdminDishes;

