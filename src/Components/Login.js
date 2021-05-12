import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css' ;
import React, { useState,useContext } from 'react';
import UserContext from './UserContext';


function Login() {

    const {user,login,logout,profile} = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message,setMessage] = useState("");

    const handleEmailChange = event =>{
        setEmail(event.target.value);
    }

    const handlePasswordChange = event =>{
        setPassword(event.target.value);
    }

    const handleSubmit = event =>{
        const inputData = {email, password};
        console.log(inputData);
        auth(inputData);

        event.preventDefault();
    }

    async function auth(data){
        debugger;
        const response = await fetch("http://localhost:8000/auth", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        });

        if(response.status==200){
            let jwt = await response.json();
            console.log(jwt);
            localStorage.setItem('jwtToken', jwt.jwtToken);
            profile();
            //user.auth(true);
            console.log(user);

        }else{
            setMessage("Wrong password or email,please again enter!");
            setEmail("");
            setPassword("");
        }

    }



    async function test(){
        let jwt = localStorage.getItem('jwtToken');
        console.log(jwt);
        alert(jwt);
    }
    return (
        <div>
            <div className="row" style = {{marginTop:'60px'}}>
                <form className="col-6 offset-3" onSubmit = {handleSubmit} style={{backgroundColor: "#F07B3F", borderRadius: "20px"}}>
                    <div className="row px-4 py-4">
                        <h5 className="m-auto" style={{color: "white"}}>Sign In</h5>
                    </div>

                    <div className="row px-2">
                        <div className="input-field col s12">
                            <i className="material-icons prefix" style = {{color:"#2D4059"}}>email</i>
                            <input id="icon_prefix_emal" type="text" className="white-text validate" value = {email} onChange = {handleEmailChange}/>
                            <label htmlFor="icon_prefix_emal">Email</label>
                        </div>
                    </div>
                    <div className="row px-2">
                        <div className="input-field col s12">
                            <i className="material-icons prefix" style = {{color:"#2D4059"}} >lock</i>
                            <input id="icon_prefix" type="password" className="white-text validate" value = {password} onChange = {handlePasswordChange}/>
                            <label htmlFor="icon_prefix">Password</label>
                        </div>
                    </div>
                    {/*<div className="row px-2">*/}
                    {/*    <form action="#" style = {{marginLeft:'18px'}}>*/}
                    {/*        <p>*/}
                    {/*            <label>*/}
                    {/*                <input type="checkbox" />*/}
                    {/*                <span>Remember me</span>*/}
                    {/*            </label>*/}
                    {/*        </p>*/}
                    {/*    </form>*/}
                    {/*</div>*/}
                    <div className="row px-4">
                        <button className="waves-effect waves-light btn-small" style = {{backgroundColor:"#2D4059", color: "#FFD460"}} type="submit" ><i class="material-icons right">login</i> <strong>Sign In</strong> </button>
                    </div>
                    {/*<div className = "form-group">*/}
                    {/*    <button className = "btn btn-danger" type = "button" onClick={test}>TEST</button>*/}
                    {/*</div>*/}
                </form>
            </div>
        </div>
    )
}

export default Login;