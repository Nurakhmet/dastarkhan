import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css' ;
import React, { useState, useEffect,useContext } from 'react';
// import Carousel from 'react-bootstrap/Carousel';
import { Component } from 'react';
import { render } from '@testing-library/react';
import UserContext from './UserContext';
import Restaurants from "./Restaurants";
import {Link} from "react-router-dom";

function AllSeacrhCards({search}) {
    const [dataSearch, setDataSearch] = useState([]);
    const [errorSearch, setErrorSearch] = useState("");
    console.log("GEtSearch", search)

    async function loadSearchData() {
        const bearer = "Bearer "+ localStorage.getItem('jwtToken');
        let response = await fetch("http://localhost:8000/api/getRestaurantss/"+search, {
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


    const cards1 = dataSearch.map((restaurants,idx)=>(
        <div className="col-4" key={idx}>
            <div className="card" style={{backgroundColor: "#F07B3F", borderRadius: "20px"}}>
                <div className="card-content">
                    <div className="row">
                        <div className="col">
                            <img src={restaurants.imageUrl} style={{height: "140px", width: "140px", borderRadius: "20px"}}/>
                        </div>
                        <div className="col">
                            <h1 className="card-title"> <strong>{restaurants.restName}</strong></h1>
                        </div>
                    </div>
                    {/*<Link className="blue-text text-darken-3" style={{fontWeight:"bold"}} to={`/details/${props.card.id}`}>DETAILS*/}
                    {/*    <i className="material-icons right" style={{color:"black"}}>more_vert</i></Link>*/}
                    <p>{restaurants.description}</p>
                </div>
                <div className="card-footer">
                    <Link className="waves-effect waves-light btn-small right"
                          style={{backgroundColor: "#2D4059", color: "#FFD460"}} to={`/restdishes/${restaurants.id}`}  ><i
                        className="material-icons right">local_dining</i> <strong>Dishes</strong></Link>
                    {/*<button className="waves-effect waves-light btn-small right"*/}
                    {/*        style={{backgroundColor: "#2D4059", color: "#FFD460"}} type="submit"><i*/}
                    {/*    className="material-icons right">local_dining</i> <strong>Dishes</strong></button>*/}
                </div>
            </div>
        </div>
    ));



    return (<div>
            {dataSearch.length!=0? <div className="mt-3"> <h3>Search result for: "{search}"</h3><div className="row mt-1">{cards1}</div></div>:<div className="col-12"><h3>A <strong> <i>{errorSearch}</i> </strong>is not found</h3></div>}
        </div>
    );
}

function RestaurantsPage(params) {

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.carousel');
        var instances = M.Carousel.init(elems, {fullWidth: true,
            indicators: true, duration: 20, dist: 0});
    });

    const [search, setSearch] = useState("");


    const user = useContext(UserContext);
    // const [newId, setNewId] = useState(0);
    let jwt = localStorage.getItem('jwtToken');
    if(jwt != null){

    }
    const handleSearchChange = event =>{
        setSearch(event.target.value);
    }
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

    useEffect(() => {
        loadData();

    }, []);

    const rest = data?.map((restaurants,idx)=>(
            <div className="col-4" key={idx}>
                <div className="card" style={{backgroundColor: "#F07B3F", borderRadius: "20px"}}>
                    <div className="card-content">
                        <div className="row">
                            <div className="col">
                                <img src={restaurants.imageUrl} style={{height: "140px", width: "140px", borderRadius: "20px"}}/>
                            </div>
                            <div className="col">
                                <h1 className="card-title"> <strong>{restaurants.restName}</strong></h1>
                            </div>
                        </div>

                        <p>{restaurants.description}</p>
                    </div>
                    <div className="card-footer">
                        <Link className="waves-effect waves-light btn-small right"
                              style={{backgroundColor: "#2D4059", color: "#FFD460"}} to={`/restdishes/${restaurants.id}`}  ><i
                            className="material-icons right">local_dining</i> <strong>Dishes</strong></Link>

                    </div>
                </div>
            </div>
    ));



    return <div className = "container">
        <div className = "row mt-3">

            <div className="carousel carousel-slider center">
                <div className="carousel-fixed-item center">
                    {/*<a className="btn waves-effect white grey-text darken-text-2">button</a>*/}
                </div>
                <div className="carousel-item white-text" href="#one!">
                    <img src="http://instantmeal.000webhostapp.com/assets/img/carousel/carousel1.jpg" alt=""/>
                    <h2>First Panel</h2>
                    <p className="white-text">This is your first panel</p>
                </div>
                <div className="carousel-item amber white-text" href="#two!">
                    <img src="https://happyintlv.net/imagecache/c_crop,h_400,w_1000/wp-content/uploads/2017/05/Grande-article-eat-tlv.png" alt=""/>
                    <h2>Second Panel</h2>
                    <p className="white-text">This is your second panel</p>
                </div>
                <div className="carousel-item green white-text" href="#three!">
                    <img src="https://procudan.com/Admin/Public/GetImage.ashx?width=1600&crop=5&Compression=75&DoNotUpscale=true&image=%2FFiles%2FImages%2FProcudan+Kampagner%2F2020+04+Innovationspartnerskab+for+sundere+mad%2FiStock-650607142_1000_400.jpg" alt=""/>
                    <h2>Third Panel</h2>
                    <p className="white-text">This is your third panel</p>
                </div>
                <div className="carousel-item blue white-text" href="#four!">
                    <img src="https://im.whatshot.in/img/2019/Nov/header-1000x400-1573737476.jpg" alt=""/>
                    <h2>Fourth Panel</h2>
                    <p className="white-text">This is your fourth panel</p>
                </div>
            </div>

            <br/>
            <div className = "col-12 mt-3" style = {{paddingLeft:'0px',paddingRight:'0px'}}>
                <form>
                    <div className="row">
                        <div className="row"></div>
                        <div className="input-field col s12">

                            <i className="material-icons prefix">search</i>
                            <textarea id="icon_prefix2" onChange={handleSearchChange} className="materialize-textarea"></textarea>
                            <label htmlFor="icon_prefix2">Search</label>
                        </div>
                    </div>
                </form>
                {search !== "" ? <AllSeacrhCards search={search}/> :
                    <div className="row">{rest}</div>
                }
            </div>
        </div>
    </div>
}

export default  RestaurantsPage;

