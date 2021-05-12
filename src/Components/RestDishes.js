import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css' ;
import React, { useState, useEffect,useContext } from 'react';
// import Carousel from 'react-bootstrap/Carousel';
import { Component } from 'react';
import { render } from '@testing-library/react';
import UserContext from './UserContext';
import Restaurants from "./Restaurants";
import {Link, useParams} from "react-router-dom";


function AllSeacrhCards({search}) {
    const [dataSearch, setDataSearch] = useState([]);
    const [errorSearch, setErrorSearch] = useState("");
    console.log("GEtSearch", search)

    async function loadSearchData() {
        const bearer = "Bearer "+ localStorage.getItem('jwtToken');
        let response = await fetch("http://localhost:8000/api/getDishess/"+search, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization":bearer,
            },
        });
        let DataSearch = await response.json();
        console.log(DataSearch);
        // setDataSearch(DataSearch);
        if (DataSearch.length != 0){
            setDataSearch(DataSearch);
        }else{
            setErrorSearch(search)
        }
    }

    useEffect(() => {
        loadSearchData();
    }, [search]);


    const cards1 = dataSearch.map((dishes,idx)=>(
        <div className="col-4" key={idx}>
            <div className="card" style={{backgroundColor: "#F07B3F", borderRadius: "20px"}}>
                    <div className="card-content">
                        <div className="row">
                            <div className="col">
                                <img src={dishes.imageUrl}
                                     style={{height: "140px", width: "140px", borderRadius: "20px"}}/>
                            </div>
                            <div className="col">
                                <h1 className="card-title"><strong>{dishes.dishName}</strong></h1>
                                <input type="hidden" value={dishes.id}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <h3 className="card-title"><strong>{dishes.restaurants.restName}</strong></h3>
                            </div>
                        </div>
                        <p>${dishes.price}</p>

                    </div>
                    <div className="card-footer">
                        <button className="waves-effect waves-light mb-2 btn-small right"
                                style={{backgroundColor: "#2D4059", color: "#FFD460"}} type="submit">
                            <i className="material-icons right">add_shopping_cart</i> <strong>Add to cart</strong></button>
                    </div>
            </div>
        </div>
    ));


    return (<div>
            {dataSearch.length!=0? <div className="mt-3"> <h3>Search result for: "{search}"</h3><div className="row mt-1">{cards1}</div></div>:<div className="col-12"><h3>A <strong> <i>{errorSearch}</i> </strong>is not found</h3></div>}
        </div>
    );
}

function RestDishes(params) {
    let {restId} = useParams();
    console.log(restId);



    const user = useContext(UserContext);
    // const [newId, setNewId] = useState(0);
    let jwt = localStorage.getItem('jwtToken');
    if(jwt != null){

    }

    const [data, setData] = useState([]);
    async function loadData(restId) {
        const bearer = "Bearer "+ localStorage.getItem('jwtToken');
        let response = await fetch("http://localhost:8000/api/allDishesRest/"+restId,{
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

    useEffect(() => {
        loadData(restId);
    }, []);

    const dish = data?.map((dishes,idx)=>(
        <div className="col-4" key={idx}>
            <div className="card" style={{backgroundColor: "#F07B3F", borderRadius: "20px"}}>
                    <div className="card-content">
                        <div className="row">
                            <div className="col">
                                <img src={dishes.imageUrl}
                                     style={{height: "140px", width: "140px", borderRadius: "20px"}}/>
                            </div>
                            <div className="col">
                                <h1 className="card-title"><strong>{dishes.dishName}</strong></h1>
                                <input type="hidden" value={dishes.id}/>
                            </div>
                        </div>
                                <h3 className="card-title"><strong>Restaurant: {dishes.restaurants.restName}</strong></h3>
                        <p>${dishes.price}</p>

                    </div>
                    <div className="card-footer">
                        <button className="waves-effect waves-light btn-small mb-2 right"
                                style={{backgroundColor: "#2D4059", color: "#FFD460"}} type="submit">
                            <i className="material-icons right">add_shopping_cart</i> <strong>Add to cart</strong></button>
                    </div>
            </div>
        </div>
    ));


    return <div className = "container">
        <div className = "row mt-3">
            <div className = "col-12 mt-3" style = {{paddingLeft:'0px',paddingRight:'0px'}}>
                <form>
                    <div className="row">
                        <div className="row"></div>
                        <div className="input-field col s12">
                            <i className="material-icons prefix">search</i>
                            <textarea id="icon_prefix2" className="materialize-textarea"></textarea>
                            <label htmlFor="icon_prefix2">Search</label>

                        </div>
                    </div>
                </form>
                <div className="row">
                    {dish}
                </div>
            </div>
        </div>
    </div>
}

export default  RestDishes;

