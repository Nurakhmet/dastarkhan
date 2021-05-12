import React, {useEffect, useState} from 'react';
import UserContext from "./UserContext";

const UserProvider = ({children}) =>{

    const [user, setUser] = useState({id:0,email: "", fullName:"", address:"", avatar:"", roles: [{}], auth: false});

    useEffect(()=>{
        profile();
    },[]);

    const login = (id,email, fullName, address,phoneNumber, avatar, roles) =>{

        setUser((user)=>({
            id:id,
            email: email,
            fullName: fullName,
            address: address,
            phoneNumber: phoneNumber,
            avatar: avatar,
            roles: roles,
            auth: true
        }));


    }
    async function profile(){

        const bearer = "Bearer "+localStorage.getItem('jwtToken');

        if(localStorage.getItem('jwtToken') != null){
            const response = await fetch("http://localhost:8000/api/profile", {
                method:'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": bearer
                }
            });

            if(response.status==200){
                let res = await response.json();

                login(res.id,res.email,res.fullName,res.address, res.phoneNumber, res.avatar, res.roles);

            }
        }
    }
    const logout = () =>{
        setUser((user)=>({
            email: "",
            fullName: "",
            address: "",
            phoneNumber: "",
            avatar: "",
            roles:[{}],
            auth: false
        }));
    }

    return (
        <UserContext.Provider value = {{user, login, logout,profile}}>
            {children}
        </UserContext.Provider>
    );

}

export default UserProvider;