import React, {  useRef, useState } from 'react';
import './Sign.css';
import amazon_logo from "../Images/amzon_logo2.png"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

export default function Sign() {
    const [isLogin,setIsLogin]=useState(true);

    const navigate = useNavigate()
    let emailref = useRef();
    let passwordref = useRef();

    async function handleuser(e){
        e.preventDefault();
        
        if(isLogin){

                // //////////////////////// sign in with user 

             try{
                await signInWithEmailAndPassword(auth,emailref.current.value,passwordref.current.value);
                navigate("/")
                toast.success("Login Success")
            }
            catch(error)
            
            {
                toast.error(error.message)

            }
         

        }else{
              // ////////////////////////////// create a new user

               try{
                await createUserWithEmailAndPassword(auth,emailref.current.value,passwordref.current.value)
                navigate("/")
              toast.success("Login Success")
            }
            catch(error){
                toast.error(error.message)
    
            }

        
           
        }

    }
  return (
    <div className='amazon_sign'>
       <Link to="/">
       <img src={amazon_logo} style={{width:"200px",display:"block",margin:"auto",cursor:"pointer"}} alt='logo'></img>
       </Link> 
        <form onSubmit={handleuser}>
            <h1>{isLogin === true ? "Sign in" : "Sign up"}</h1>

            <label htmlFor='email'><strong>Email</strong></label>
            <input type='email' placeholder='enter email' id="email" ref={emailref}></input>

            <label htmlFor='password'><strong>Password</strong></label>
            <input type='password' placeholder='enter email' id="password" ref={passwordref}></input>

            <button type='submit'>{isLogin === true ? "Sign in" : "Sign up"}</button>

            <div className='checkbox'>

            <input type='checkbox'></input>
            <p>By countinuing , you agree to amazon clone</p>
        
            </div>
           
            </form>

            <button className='register' onClick={()=>setIsLogin(!isLogin)}> {isLogin === true ? "Create your Amazon Account" : "Sign in"} </button>
        
      
      
    </div>
  )
}
