import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css' ;

import React, { useState, useEffect } from 'react';

function Register(params) {

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems, {});
    });

    const [email, setEmail] = useState("");
    const [fullName,setFullname] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");
    const [address,setAddress] = useState("");
    const [option,setOption] = useState("client");
    // const [type, setType] = useState(["Client", "Driver", "Restaurant"])
    // const OptType = type.map(OptType => OptType)
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [message,setMessage] = useState("");
    const [success,setSuccess] = useState("");

    // const handleAddrTypeChange = (e) => console.log((type[e.target.value]))

    const handleEmailChange = event =>{
        setEmail(event.target.value);
    }
    const handleFullNameChange = event =>{
        setFullname(event.target.value);
    }
    const handlePhoneNumberChange = event =>{
        setPhoneNumber(event.target.value);
    }
    const handleAddressChange = event =>{
        setAddress(event.target.value);
    }

    const handleOptionChange = event =>{
        setOption(event.target.value);
    }
    const handlePasswordChange = event =>{
        setPassword(event.target.value);
    }
    const handleRePasswordChange = event =>{
        setRePassword(event.target.value);
    }

    const handleSubmit = event =>{
        debugger;
        const inputData = {email, password,fullName,phoneNumber,address};
        console.log(inputData);
        if(password == rePassword){
            if (option === "client") {
                setMessage("");
                addUser(inputData);
                setSuccess("Registration was successfully!");
                setFullname("");
                setEmail("");
                setAddress("");
                setPassword("");
                setRePassword("");
            }else if(option === "driver"){
                setMessage("");
                addUserD(inputData);
                setSuccess("Registration was successfully!");
                setFullname("");
                setEmail("");
                setAddress("");
                setPassword("");
                setRePassword("");
            }else if(option === "restaurant"){
                setMessage("");
                addUserR(inputData);
                setSuccess("Registration was successfully!");
                setFullname("");
                setEmail("");
                setAddress("");
                setPassword("");
                setRePassword("");
            }
        }else{
            setSuccess("");
            setMessage("Password isn't same!");
            setRePassword("");
            setPassword("");
        }

        event.preventDefault();
    }

    async function addUser(data){
        let jwt = localStorage.getItem('jwtToken');
        const response = await fetch("http://localhost:8000/api/register", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                //     "Authorization":"Bearer " +  jwt,
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        });
    }

    async function addUserD(data){
        debugger;
        let jwt = localStorage.getItem('jwtToken');
        const response = await fetch("http://localhost:8000/api/register/driver", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                //     "Authorization":"Bearer " +  jwt,
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        });
    }

    async function addUserR(data){
        let jwt = localStorage.getItem('jwtToken');
        const response = await fetch("http://localhost:8000/api/register/restaurant", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                //     "Authorization":"Bearer " +  jwt,
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        });
    }
    return <div>
        <div className="row" style = {{marginTop:'60px'}}>
            <form onSubmit = {handleSubmit} className="col-6 offset-3" style={{backgroundColor: "#F07B3F", borderRadius: "20px"}}>
                <div className="row px-4 py-4">
                    <h5 className="m-auto" style={{color: "white"}}>Create new Account</h5>
                </div>
                <div className = "row px-2">
                    <div className = "alert alert-danger" role="alert" hidden = {message == ""}>
                        {message}
                    </div>
                    <div className = "alert alert-success" role="alert" hidden = {success == ""}>
                        {success}
                    </div>
                </div>
                <div className="row px-2">
                    <div className="input-field col s12">
                        <i className="material-icons prefix" style = {{color:"#2D4059"}}>account_circle</i>
                        <input id="icon_prefix_name" type="text" class="white-text validate" value = {fullName} onChange = {handleFullNameChange}/>
                        <label htmlFor="icon_prefix_name">Full Name</label>
                    </div>
                </div>
                <div className="row px-2">
                    <div className="input-field col s12">
                        <i className="material-icons prefix" style = {{color:"#2D4059"}}>email</i>
                        <input id="icon_prefix_email" type="text" className="white-text validate" value = {email} onChange = {handleEmailChange}/>
                        <label htmlFor="icon_prefix_email">Email</label>
                    </div>
                </div>
                <div className="row px-2">
                    <div className="input-field col s12">
                        <i className="material-icons prefix" style={{color: "#2D4059"}}>phone_iphone</i>
                        <input id="icon_prefix_phone" type="text" value = {phoneNumber} className="white-text validate"
                               onChange={handlePhoneNumberChange}/>
                        <label htmlFor="icon_prefix_phone">Phone Number</label>
                    </div>
                </div>
                <div className="row px-2">
                    <div className="input-field col s12">
                        <i className="material-icons prefix" style={{color: "#2D4059"}}>location_on</i>
                        <input id="icon_prefix_address" type="text" value={address} className="white-text validate"
                               onChange={handleAddressChange}/>
                        <label htmlFor="icon_prefix_address">Address</label>
                    </div>
                </div>
                <div className="row px-2">
                    <div className="input-field col s12">
                        <i className="material-icons prefix" style = {{color:"#2D4059"}}>lock</i>
                        <input id="icon_prefix_password" type="password" className="white-text validate" value = {password} onChange = {handlePasswordChange}/>
                        <label htmlFor="icon_prefix_password">Password</label>
                    </div>
                </div>
                <div className="row px-2">
                    <div className="input-field col s12">
                        <i className="material-icons prefix" style = {{color:"#2D4059"}}>lock</i>
                        <input id="icon_prefix" type="password" className="white-text validate" value = {rePassword} onChange = {handleRePasswordChange}/>
                        <label htmlFor="icon_prefix">Re-write password</label>
                    </div>
                </div>

                <div className="row px-2">
                    <div className="input-field col s12">
                        <i className="material-icons prefix">account_circle</i>
                        <select id="icon_prefix" onChange={handleOptionChange}>
                            <option value="client" className="white-text" style={{color:"white"}}>Client</option>
                            <option value="driver">Driver</option>
                            <option value="restaurant">Restaurant</option>
                        </select>
                        <label style={{color:"white"}}>Roles</label>
                    </div>
                </div>

                <div className="row px-4">
                    <button className="btn-small waves-effect waves-light" style = {{backgroundColor:"#2D4059", color: "#FFD460"}} type="submit" > <strong>Sign Up</strong> <i class="material-icons right">send</i></button>
                </div>
            </form>
        </div>
    </div>
}

export default Register;