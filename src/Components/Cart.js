import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css' ;
import React, { useState, useEffect,useContext } from 'react';
import UserContext from './UserContext';
import { ToastContainer, toast, Slide, Zoom, Flip, Bounce  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Cart = (props) => {
    const {user,login,logout,profile} = useContext(UserContext);
    const { setCart, cart, addToCart, removeFromCart, clearCart, setQuantity, onRemove } = props;
    const basket = localStorage.getItem('cart');
    const [orderName, setOrderName]= useState("");
    const handleOrderNameChange = event=>{
        setOrderName(event.target.value);
    }
    const notify = () => toast.info('Cart is cleared!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const notifyInc = () => toast.success('Increased!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const notifyDec = () => toast.error('Decreased!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });




    // const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
    // const taxPrice = itemsPrice * 0.14;
    // const shippingPrice = itemsPrice > 2000 ? 0 : 20;
    const getTotalSum = () => {
        return cart.reduce((sum, {price, quantity}) => sum + price * quantity,0);
    }

    let jwt = localStorage.getItem('jwtToken');
    if(jwt != null){

    }
    useEffect(()=>{
        profile();
    },[basket]);

    const handleSubmit = event=>{
        const sum = getTotalSum();
        const tr = true;
        const data={orderName: orderName, price: sum,isActive: true, users:user, dishes:cart};
        console.log(data);
        addOrder(data);

        event.preventDefault();
    }

    async function addOrder(data){

        const bearer = "Bearer "+ localStorage.getItem('jwtToken');

        const response = await fetch("http://localhost:8000/api/addOrder", {
            method: "POST",
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
            setOrderName("");
            setCart([]);
        }
    }




    return<div className="container">
        <div className="mt-2" style={{backgroundColor: "#F07B3F", borderRadius: "20px"}}>

                <h1 className="ml-3 pt-2"><span>{cart.length === 0 ? <h1>Cart is empty</h1> : <h1>Cart</h1>}</span></h1>

            <div className="row">
                <div className="col ml-4 mt-2">
                    <h3 className=""> Total Price: ${getTotalSum()}</h3>
                </div>
                <div className="col">
                    <button className="waves-effect waves-light mr-4 right btn-small" style={{backgroundColor: "#2D4059", color: "#FFD460"}}
                            onClick={() => { clearCart(); notify();}}><i className="material-icons right">clear_all</i>
                        <strong> Clear Cart </strong> </button>
                    <ToastContainer
                        position="top-right"
                        transition={Flip}
                        autoClose={2000}
                        hideProgressBar
                        newestOnTop
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover/>
                </div>

            </div>
                </div>
            <div className="row mt-2">
            {cart.map((item) => (

                <div className="col-4" key={item.id}>
                    <div className="card" style={{backgroundColor: "#F07B3F", borderRadius: "20px"}}>
                        <div className="card-content">
                            <div className="row">
                                <div className="col">
                                    <img src={item.imageUrl}
                                         style={{height: "140px", width: "140px", borderRadius: "20px"}}/>
                                </div>
                                <div className="col">
                                    <h1 className="card-title"><strong>{item.dishName}</strong></h1>
                                </div>
                            </div>
                            <h3 className="card-title"><strong>Restaurant: {item.restaurants.restName}</strong></h3>

                            <p> {item.quantity} x ${item.price} </p>

                            <input type="number" style={{ color: "white"}}  value={item.quantity} onChange={(e) => setQuantity(item, parseInt(e.target.value))} />

                        </div>
                        <div className="card-footer">

                            <button className="waves-effect waves-light mb-2 btn-small left"
                                    style={{width:"145px", backgroundColor: "red", color: "#FFD460"}}
                                    onClick={() => { onRemove(item); notifyDec();}}>
                                <i className="material-icons right">remove</i> <strong>Decrease</strong></button>
                            <ToastContainer
                                position="top-right"
                                transition={Flip}
                                autoClose={2000}
                                hideProgressBar
                                newestOnTop
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover/>
                            <button className="waves-effect waves-light mb-2 btn-small right"
                                    style={{width:"145px",backgroundColor: "green", color: "#FFD460"}}
                                    onClick={() => { addToCart(item); notifyInc();}}
                                    >
                                <i className="material-icons right">add</i> <strong> Increase</strong></button>
                            <ToastContainer
                                position="top-right"
                                transition={Flip}
                                autoClose={2000}
                                hideProgressBar
                                newestOnTop
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover/>
                        </div>
                    </div>
                </div>
            ) )}

            </div>
        <div className="row">
                <div className="col-10">
                    <div className="input-field">
                        <label htmlFor="first_name">Comment</label>
                        <input id="first_name" type="text" className="validate" value={orderName} onChange={handleOrderNameChange}/>

                    </div>
                </div>
                <div className="col-2">
                    <button type="submit" className="waves-effect waves-light mt-4 btn-small right"
                            style={{width: "155px", backgroundColor: "#2D4059", color: "#FFD460"}}
                            onClick={handleSubmit}>
                        <i className="material-icons right">shopping_cart</i><strong>purchase</strong>
                    </button>

                </div>
            </div>
    </div>
}

export default  Cart;
