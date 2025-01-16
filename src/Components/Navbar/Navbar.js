import React, { useContext } from 'react';
import './Navbar.css'
import logo from '../Images/amazon_logo.png';
import search_icon from "../Images/search_icon.png";
import Cart_icon from "../Images/cart_icon.png"
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { Amazoncontext } from '../Context/Context';
import { toast } from 'react-toastify';

export default function Navbar() {
const {user,basket}=useContext(Amazoncontext)

   async function logoutfrompage(){
    try{
        await signOut(auth)

    }
    catch(error){
   toast(error.message)

    }
       
    }
  return (
    <nav>
        <div className='nav_logo'>
           <Link to="/"> <img src={logo} alt='logo'></img></Link>
        </div>
        <div className='nav_search'>
            <input type='text' placeholder='search'></input>
            <img src={search_icon} alt='search_icon' ></img>
        </div>
        <div className='nav_options'>
            <p>Hi <span className='user_email'>{user ? user.email : "Guest"}</span></p>
            <Link to={!user && "/login"} style={{textDecoration:"none",color:"#fff"}}>
            <h3 onClick={logoutfrompage}>{user ? "Log out" : " Sign in"}</h3>
            </Link>
        </div>
        <div className='nav_options'>
            <p>Return</p>
           <Link to="/orders" style={{textDecoration:"none",color:"#fff"}}>
           <h3>& Orders</h3>
           </Link> 
        </div>
        <div className='nav_options'>
            <p>your</p>
            <h3>Prime</h3>
        </div>
        <div className='nav_cart'>
            <Link to="/checkout" ><img src={Cart_icon} alt='cart_icon'></img></Link>
            <h3 style={{color:"#fff"}}>{basket.length}</h3>
        </div>
    </nav>
  )
}
