import React, { useState,useContext,useEffect} from 'react';
// import './../bootstrap/css/bootstrap.min.css';
import UserContext from './UserContext';
// import Logout from "./Logout";
import Profile from "./Profile";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";
import Main from "./Main";
import Tools from "./Tools";
import Restaurants from "./Restaurants";
import Contacts from "./Contacts";

import RestaurantsPage from "./RestaurantsPage";
import ModerTools from "./ModerTools";
import Cart from "./Cart";
import RestDishes from "./RestDishes";
import DriverTools from "./DriverTools";
import M from "materialize-css";






function Navbar({currentUser}){

    const cartFromLocal = JSON.parse(localStorage.getItem('cart') || '[]');
    const {user,login,logout,profile} = useContext(UserContext);
    const [cart, setCart] = useState(cartFromLocal);

    const addToCart = (product) =>{
        console.log("added to cart");
        let newCart = [...cart];
        let itemInCart = newCart.find(item => product.dishName === item.dishName);

        if (itemInCart){
            itemInCart.quantity++;
        }else{
            itemInCart = {...product,quantity: 1};
            newCart.push(itemInCart)

        }
        setCart(newCart);
    }

    const removeFromCart = (productToRemove) =>{
        console.log("removed from cart");
        setCart([cart.filter((product) => product !== productToRemove)]);
    }

    const onRemove = (product) => {
        const exist = cart.find((x) => x.id === product.id);
        if (exist.quantity === 1) {
            setCart(cart.filter((x) => x.id !== product.id));
        } else {
            setCart(
                cart.map((x) =>
                    x.id === product.id ? { ...exist, quantity: exist.quantity - 1 } : x
                )
            );
        }
    };

    const clearCart = () => {
        console.log("clear the cart");
        setCart([]);
    }

    const getCartTotal = () => {
        console.log("total cart");

        return cart.reduce((sum, {quantity}) => sum + quantity, 0);
    }

    const setQuantity = (product, amount) => {
        console.log("total cart");

        const newCart = [...cart];
        newCart.find(item => item.dishName === product.dishName).quantity = amount;
        setCart(newCart);
    }



    useEffect(()=>{
        profile();
        localStorage.setItem('cart', JSON.stringify(cart));
    },[cart]);

    return(
        <div>

            <div className="navbar navbar-expand-lg" style={{fontFamily: "Montserrat"}}>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a href={`/`} className="nav-link" style ={{fontSize: '30px', fontFamily: "Montserrat",color: "#2D4059"}}> <strong>Dastarkhan</strong> </a>
                            </li>
                        </ul>

                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" style={{color: "#2D4059"}} href={`/`}> <strong>Dishes</strong></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" style={{color: "#2D4059"}} href={`/restaurantsPage`}> <strong>Restaurants</strong></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" style={{color: "#2D4059"}} href={`/contacts`}> <strong>Contacts</strong></a>
                            </li>
                        </ul>
                        <ul className="navbar-nav right">
                            {user.roles[0].role == "ROLE_ADMIN" ?
                            <li className="nav-item">
                                {user.auth?<a className="nav-link" style={{color: "#2D4059"}} href={`/tools`}> <strong>Tools</strong></a>:""}
                            </li>
                                :
                                ""
                            }
                            {user.roles[0].role == "ROLE_MODER" ?
                                <li className="nav-item">
                                    {user.auth?<a className="nav-link" style={{color: "#2D4059"}} href={`/modertools`}> <strong>ModerTools</strong></a>:""}
                                </li>
                                :
                                ""
                            }
                            {user.roles[0].role == "ROLE_DRIVER" ?
                                <li className="nav-item">
                                    {user.auth?<a className="nav-link" style={{color: "#2D4059"}} href={`/drivertools`}> <strong>DriverTools</strong></a>:""}
                                </li>
                                :
                                ""
                            }
                            <li className="nav-item">
                                {user.auth?<a className="nav-link" style={{color: "#2D4059"}}  href={`/profile`}> <strong>{user.fullName}</strong></a>:<a className="nav-link" style={{color: "#2D4059"}} href={`/register`}>
                                    <strong>Register</strong>
                                    </a>}
                            </li>
                            {/*<li className="nav-item">*/}
                            {/*    <a className="nav-link" style={{color: "#2D4059"}} href={`/cart`}> <strong>Cart {cartItems.length}</strong> </a>*/}
                            {/*</li>*/}
                            <li className="nav-item">
                                {user.auth?<Logout/>:<a className="nav-link" style={{color: "#2d4059"}} href={`/login`}> <strong>Login</strong> </a>}
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" style={{color: "#2D4059"}} to={`/cart`}> <strong>Cart <span style={{color: "white",backgroundColor: "#2d4059", borderRadius: "20px", padding: "10px"}} >{getCartTotal()}</span></strong> </Link>
                            </li>
                        </ul>
                </div>
            </div>
            <Switch>
                <Route path = "/contacts">
                    <Contacts  />
                </Route>
                <Route path = "/tools">
                    <Tools/>
                </Route>
                <Route path = "/modertools">
                    <ModerTools/>
                </Route>
                <Route path = "/drivertools">
                    <DriverTools/>
                </Route>
                <Route path = "/restaurantsPage">
                    <RestaurantsPage/>
                </Route>
                <Route path = "/register">
                    <Register  />
                </Route>
                <Route path = "/restdishes/:restId">
                    <RestDishes addToCart={addToCart}/>
                </Route>
                <Route path = "/login">
                    {user.auth?<Redirect to = "/profile"/>:<Login/> }
                </Route>
                <Route path = "/profile">
                    <Profile/>
                </Route>

                <Route path = "/cart">
                    <Cart setCart={setCart} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} setQuantity={setQuantity} onRemove={onRemove}/>
                </Route>
                <Route path = "/">
                    <Main addToCart={addToCart}/>
                </Route>

            </Switch>
            <div className="row" style={{height: "50px"}}></div>
        </div>
    )

}
export default Navbar;