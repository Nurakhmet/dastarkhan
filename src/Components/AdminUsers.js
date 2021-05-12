import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css' ;
import React, { useState, useEffect,useContext } from 'react';
import { Component } from 'react';
import { render } from '@testing-library/react';
import UserContext from './UserContext';
import {Link} from "react-router-dom";


// function RestDetails(props){
//     return(
//         <div id="modal2" className="modal">
//             <div className="modal-content">
//                 <div className="row">
//                     <div className="col-6 offset-3">
//                         <h4>Edit Restaurant</h4>
//
//                         <EditCard
//                             restName={props.restName}
//                             description={props.description}
//                             imageUrl={props.imageUrl}
//                             handleSubmit={props.handleSubmit}
//                             handleNameChange={props.handleNameChange}
//                             handleDescriptionChange={props.handleDescriptionChange}
//                             handleUrlChange={props.handleUrlChange}
//
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//
//     )
// }

// function EditCard(props) {
//     return (
//         <div className="row">
//             {/*<form>*/}
//             {/*    <div className="input-field">*/}
//             {/*        <input value={props.name} onChange={props.handleNameChange}*/}
//             {/*               name="cardName" type="text" className="validate"/>*/}
//             {/*    </div>*/}
//             {/*</form>*/}
//             <form>
//                 <div className="form-group">
//                     <label htmlFor="exampleInputEmail1">Restaurant Name</label>
//                     <input type="text" className="form-control" value={props.restName} onChange={props.handleNameChange} id="exampleInputEmail1"
//                            aria-describedby="emailHelp"/>
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="exampleInputPassword1">Description</label>
//                     <input type="text" className="form-control" value={props.description} onChange={props.handleDescriptionChange} id="exampleInputPassword1"/>
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="exampleInputPassword2">URL</label>
//                     <input type="text" className="form-control" value={props.imageUrl} onChange={props.handleUrlChange} id="exampleInputPassword2"/>
//                 </div>
//
//                 <button className="waves-effect modal-close waves-light btn-small" style = {{backgroundColor:"#2D4059", color: "#FFD460"}} ><i
//                     className="material-icons right">add</i>Save
//                 </button>
//             </form>
//
//         </div>
//     )
// }


function AdminUsers({newRestaurantAddedId}) {
    // const {user,login,logout,profile} = useContext(UserContext);
    const [user, setUser]= useState({id:0, email:"",fullName:"",address:"", phoneNumber:"",avatar: ""});
    const [change,setChange] = useState(0);

    const [users,setUsers] = useState([]);
    async function getAllUsers(){
        const bearer = "Bearer "+ localStorage.getItem('jwtToken');
        const response = await fetch("http://localhost:8000/api/allUsers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization":bearer,
            },
        });

        if(response.status==200){
            let Users = await response.json();
            console.log(Users);
            setUsers(Users);
        }else{

            console.log("404 ITEM NOT FOUND");

        }
    }

    // const user = useContext(UserContext);

    let jwt = localStorage.getItem('jwtToken');
    if(jwt != null){

    }

    const handleUserDataChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        setUser((prevalue) => {

            return {
                ...prevalue,
                [name]: value
            }

        })

    }

    async function editUser(data){

        const bearer = "Bearer "+ localStorage.getItem('jwtToken');

        const response = await fetch("http://localhost:8000/api/saveUser", {

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


    const [restName,setRestName] = useState("");
    const [imageUrl,setUrl] = useState("");
    const [description,setDescription] = useState("");
    const [message, setMessage] = useState("");
    const [newId, setNewId] = useState(0);


    useEffect(() => {
        // profile();
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {});
        getAllUsers();
    }, [change]);
    //
    const rest = users.map(user=>(
        <tr>
            <td>{user.id}</td>
            <td>{user.email}</td>
            <td>{user.fullName}</td>
            <td>{user.phoneNumber}</td>
            <td>{user.address}</td>
            <td>
                <a className="waves-effect waves-light btn modal-trigger" style = {{backgroundColor:"#2D4059", color: "#FFD460"}} href="#modal1"
                   onClick={() => setUser(user)}>Edit</a>
            </td>
        </tr>
    ));






    return(<div>
            <div className="row">
                <div className="col-6">
                    <h1>Users</h1>
                </div>
                <div className="col-6">
                    {/*<a className="waves-effect waves-light btn right modal-trigger" style = {{backgroundColor:"#2D4059", color: "#FFD460"}}  href="#modal1">Add new</a>*/}

                    {/*<div id="modal1" className="modal">*/}
                    {/*    <div className="modal-content">*/}
                    {/*        <div className="row">*/}
                    {/*            <div className="col-6 offset-3">*/}
                    {/*                <h4>Add Restaurant</h4>*/}

                    {/*                <form onSubmit={handleSubmit}>*/}
                    {/*                    <div className="form-group">*/}
                    {/*                        <label htmlFor="exampleInputEmail1">Restaurant Name</label>*/}
                    {/*                        <input type="text" className="form-control" value={restName} onChange={handleNameChange} id="exampleInputEmail1"*/}
                    {/*                               aria-describedby="emailHelp"/>*/}
                    {/*                    </div>*/}
                    {/*                    <div className="form-group">*/}
                    {/*                        <label htmlFor="exampleInputPassword1">Description</label>*/}
                    {/*                        <input type="text" className="form-control" value={description} onChange={handleDescriptionChange} id="exampleInputPassword1"/>*/}
                    {/*                    </div>*/}
                    {/*                    <div className="form-group">*/}
                    {/*                        <label htmlFor="exampleInputPassword2">URL</label>*/}
                    {/*                        <input type="text" className="form-control" value={imageUrl} onChange={handleUrlChange} id="exampleInputPassword2"/>*/}
                    {/*                    </div>*/}

                    {/*                    <button className="waves-effect modal-close waves-light btn-small" style = {{backgroundColor:"#2D4059", color: "#FFD460"}} ><i*/}
                    {/*                        className="material-icons right">add</i>Add New*/}
                    {/*                    </button>*/}
                    {/*                </form>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div id="modal1" className="modal">
                        <div className="modal-content">
                            <div className="input-field">
                                <input name="email" value={user.email} onChange={handleUserDataChange}/>
                            </div>
                            <div className="input-field">
                                <input name="fullName" value={user.fullName} onChange={handleUserDataChange}/>
                            </div>
                            <div className="input-field">
                                <input name="phoneNumber" value={user.phoneNumber} onChange={handleUserDataChange}/>
                            </div>
                            <div className="input-field">
                                <input name="address" value={user.address} onChange={handleUserDataChange}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <a href="#!" className="waves-effect modal-close waves-light btn"
                               onClick={() => editUser(user)}>Edit</a>
                        </div>
                    </div>


                </div>
            </div>

            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Full Name</th>
                    <th>Phone Number</th>
                    <th>Address</th>
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

export default  AdminUsers;

