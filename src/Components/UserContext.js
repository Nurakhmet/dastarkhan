import React from 'react';

const UserContext = React.createContext({
    email: "nura7kz@gmail.com",
    fullName:"Nurakhmet Matanov",
    auth: false,
    jwtToken: ""
});

export default UserContext;