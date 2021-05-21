import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css' ;
import React, { useState, useEffect ,useContext} from 'react';
import UserContext from './UserContext';
// import {Alert} from "react-bootstrap";

function Profile(params) {

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.materialboxed');
        var instances = M.Materialbox.init(elems, {});
    });

    let jwt = localStorage.getItem('jwtToken');
    const {user,login,logout,profile} = useContext(UserContext);
    const [id, setId] = useState(user.id);
    const [fullName, setFullName] = useState(user.fullName);
    const [address, setAddress] = useState(user.address);
    const [avatar, setAvatar] = useState(user.avatar);
    // const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [message,setMessage] = useState("");
    const [success,setSuccess] = useState("");
    const [succes,setSucces] = useState("");
    useEffect(()=>{
        profile();

        //   getUser(user.email);
    },[]);

    M.updateTextFields();

    const handleNameChange = event =>{
        login(user.id,user.email,event.target.value,user.address,user.avatar);
        // console.log(fullName);
    }
    const handleAddressChange = event =>{
        login(user.id,user.email,user.fullName,event.target.value,user.avatar);

    }

    const handleAvatarChange = event =>{
        login(user.id,user.email,user.fullName,user.address,event.target.value);

    }




    const handlePasswordChange = event =>{
        setPassword(event.target.value);
    }
    const handleNewPasswordChange = event =>{
        setNewPassword(event.target.value);
    }
    const handleRePasswordChange = event =>{
        setRePassword(event.target.value);

    }

    async function setData(data) {
        setId(user.id);
        setFullName(user.fullName);
        setAddress(user.address);
        setAvatar(user.avatar);
        //setPassword(user.password);
        console.log(fullName);
        console.log(password);
        console.log(address);
    }
    async function getUser(email) {

        let response = await fetch("http://localhost:8000/api/getUser/"+email, {
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer " +  jwt,
            }
        });
        if(response.status==200){
            let data = await response.json();
            console.log(data);
            setData(data);

        }else{
            console.log("empty");

        }
    }
    const handlePasswordSubmit = event =>{
        const inputDate = {newPassword:newPassword,password:password,email:user.email}
        var correct = false;
        if(newPassword == rePassword){
            correct = true;
        }else{
            correct = false;
        }
        if(!correct){
            setMessage("not Equal");
            setNewPassword("");
            setRePassword("");
        }else{
            //setMessage("Equal !!");
            saveUserPassword(inputDate);
        }

        event.preventDefault();
        console.log(newPassword)
        console.log(message);
    }
    const handleSubmit = event =>{
        console.log(fullName);
        const inputData = {
            id:user.id,
            email:user.email,
            fullName:user.fullName,
            address:user.address,
            avatar:user.avatar
        };
        // login(id,user.email,fullName);
        console.log(inputData);
        saveUser(inputData);

        event.preventDefault();

    }
    async function saveUserPassword(data){
        console.log(data);
        const response = await fetch("http://localhost:8000/api/updatePassword", {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer " +  jwt,
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        });
        let messData = await response.text();
        if(messData == "Password saved !"){
            setMessage("");
            setSuccess("messData");

            setPassword("");
            setNewPassword("");
            setRePassword("");
            setSucces("");
        }else{
            setSuccess("");
            setMessage(messData);
            setPassword("");
            setNewPassword("");
            setRePassword("");
            setSucces("");
        }
        // console.log(JSON.stringify(messData));

        console.log(messData);
    }
    async function saveUser(data){
        console.log(data);
        const response = await fetch("http://localhost:8000/api/updateProfile", {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer " +  jwt,
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        });
        let messData = await response.text();
        setSuccess("");
        setSucces("Profile successfully updated");

    }
    return <div>
        <div className="container">
            <div class="row" style = {{marginTop:'40px'}}>
                    {/*<div class="row">*/}
                    {/*    <blockquote><h5>Update Profile Data</h5></blockquote>*/}
                    {/*</div>*/}
                    <form onSubmit = {handleSubmit} className="col-6 offset-3" style={{backgroundColor: "#F07B3F", borderRadius: "20px"}}>
                        {/*<div className = "row">*/}
                        {/*    <Alert variant={success}>*/}
                        {/*        {succes}*/}
                        {/*    </Alert>*/}
                        {/*</div>*/}
                        <div className="row px-4 pt-4 pb-2 mb-2">
                            <h5 className="m-auto" style={{color: "white"}}>Update Profile</h5>
                        </div>


                        <div className="row px-2">
                            <div className="col s12">
                                <img className="materialboxed" src={user.avatar} width="150" height="150"/>
                            </div>
                        </div>


                        <div class="row px-2">
                            <div class="input-field col s12">
                                <i class="material-icons prefix" style = {{color:"#2D4059"}}>email</i>
                                <input id="icon_prefix_email" style={{color: 'gray'}} type="text" class="white-text validate"  value = {user.email} readOnly/>
                                <label  class="active" for="icon_prefix_email">Email</label>
                            </div>
                        </div>
                        <div class="row px-2">
                            <div class="input-field col s12">
                                <i class="material-icons prefix" style = {{color:"#2D4059"}}>account_circle</i>
                                <input id="icon_prefix_name" type="text" class="white-text validate" value = {user.fullName} onChange = {handleNameChange}/>
                                <label  class="active" for="icon_prefix_name">Full Name</label>
                            </div>
                        </div>
                        <div className="row px-2">
                            <div className="input-field col s12">
                                <i className="material-icons prefix" style={{color: "#2D4059"}}>home</i>
                                <input id="icon_prefix_home" type="text" className="white-text validate"
                                       value={user.address} onChange={handleAddressChange}/>
                                <label className="active" htmlFor="icon_prefix_home">Address</label>
                            </div>
                        </div>

                        <div className="row px-2">
                            <div className="input-field col s12">
                                <i className="material-icons prefix" style={{color: "#2D4059"}}>insert_photo</i>
                                <input id="icon_prefix_url" type="text" className="white-text validate"
                                       value={user.avatar} onChange={handleAvatarChange}/>
                                <label className="active" htmlFor="icon_prefix_url">Avatar URL</label>
                            </div>
                        </div>


                        <div class="row px-4">
                            <button className="btn-small waves-effect waves-light" style = {{backgroundColor:"#2D4059", color: "#FFD460"}} type="submit" > <strong>UPDATE PROFILE</strong>< i class="material-icons right">refresh</i></button>
                        </div>
                    </form>

                    <form onSubmit = {handlePasswordSubmit} className="col-6 offset-3 mt-5" style={{backgroundColor: "#F07B3F", borderRadius: "20px"}}>
                        {/*<div className = "row">*/}
                        {/*    <Alert variant={success}>*/}
                        {/*        {success}*/}
                        {/*    </Alert>*/}
                        {/*</div>*/}
                        <div className="row px-4 pt-4 pb-2 mb-2">
                            <h5 className="m-auto" style={{color: "white"}}>Update Password</h5>
                        </div>
                        <div class="row px-2" style = {{marginBottom:'0px'}}>
                            <div class="input-field col s12">
                                <i class="material-icons prefix" style = {{color:"#2D4059"}}>lock</i>
                                <input id="icon_prefix_password" type="password" class="white-text validate" value = {password} onChange = {handlePasswordChange}/>
                                <label for="icon_prefix_password">Old Password</label>
                            </div>
                        </div>
                        <div class="row px-2"  style = {{marginBottom:'0px'}}>
                            <div class="input-field col s12">
                                <i class="material-icons prefix" style = {{color:"#2D4059"}}>lock</i>
                                <input id="icon_prefix" type="password" class="white-text validate" value = {newPassword} onChange = {handleNewPasswordChange}/>
                                <label for="icon_prefix">New password</label>
                            </div>
                        </div>
                        <div class="row px-2">
                            <div class="input-field col s12">
                                <i class="material-icons prefix" style = {{color:"#2D4059"}}>lock</i>
                                <input id="icon_prefix_repeat" type="password" class="white-text validate" value = {rePassword} onChange = {handleRePasswordChange}/>
                                <label for="icon_prefix_repeat">Repeat new password</label>
                            </div>
                        </div>

                        <div class="row px-4">
                            <button className="btn-small waves-effect waves-light" style = {{backgroundColor:"#2D4059", color: "#FFD460"}} type="submit" > <strong>UPDATE PASSWORD</strong>  <i class="material-icons right">refresh</i></button>
                        </div>
                    </form>
            </div>
        </div>
    </div>
}

export default Profile;