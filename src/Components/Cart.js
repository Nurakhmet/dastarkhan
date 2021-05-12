import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css' ;
import React, { useState, useEffect,useContext } from 'react';
import UserContext from './UserContext';


export const Cart = () => {

    // const totalPrice = props.cart.reduce((acc, curr) => acc + curr.price, 0);

    const user = useContext(UserContext);
    let jwt = localStorage.getItem('jwtToken');
    if(jwt != null){

    }

    // console.log(props.cart);




    return<div className="container">
        <div className="mt-2" style={{backgroundColor: "#F07B3F", borderRadius: "20px"}}>
            {/*<h1>Carts</h1>*/}
            {/*<h3><span>items in cart : {props.cart.length}</span></h3>*/}
            {/*<h3><span>total price : {totalPrice}</span></h3>*/}
            {/*{props.cart === 0 && <div>Cart is empty</div>}*/}
            {/*{props.cart.map((item) => (*/}
            {/*    <div key={item.id} className="row">*/}
            {/*        <div>{item.dishName}</div>*/}
            {/*        <div>{item.price}</div>*/}
            {/*    </div>*/}
            {/*) )}*/}
        </div>
    </div>
}

export default  Cart;

