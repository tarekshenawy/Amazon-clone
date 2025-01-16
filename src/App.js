import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Checkout from "./Pages/Checkout" ;
import { Amazoncontext } from "./Components/Context/Context";
import { useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Navbar from "./Components/Navbar/Navbar";
import Payment from "./Pages/Payment";
import Orders from './Components/OrdersPage/Orders'
import { loadStripe } from "@stripe/stripe-js";
import Amazonhome from "./Pages/Amazonhome";
import { ToastContainer } from "react-toastify";







function App() {
  const {dispatch} = useContext(Amazoncontext);

  const stripePromise = loadStripe(
    "pk_test_51QcPtFQ7XxNd1VvYO7xODSBuXP97McgoJFwzE3qECU8AMubGIUjjTKRx25LYU0ywYi1cbCyhK5jqKuONvyJi4oPl009GDbQNkU"
  );


  ////////////////////////////////// find user or not when start project
  useEffect(()=>{
    onAuthStateChanged(auth,(authuser)=>{
      if(authuser){
        dispatch({
          type:"USER_FOUND",
          user:authuser,
        })
      }else{
        dispatch({
          type:"USER_FOUND",
          user:null,
        })

      }
      

    })
  },[dispatch])


  ///////////////////////////////////


  return (
    <div >
      <ToastContainer/>
        
      <Routes>
        <Route path="/" element={<Amazonhome/>}></Route>
        <Route path="*" element={<h2>Page not found</h2>}></Route>
        <Route path="/login" element={<Login/>} ></Route>
        <Route path="/checkout" element={
          <>
           <Navbar/>
           <Checkout/>
          </>
         }></Route>
         
         <Route path="/payment" element={
          <>
          <Navbar/>
         
          <Payment stripe={stripePromise}/>

       

          </>
         
          }></Route>

          <Route path="/orders" element={
            <>
            <Navbar/>
              <Orders/>
            </>
          
            }></Route>
      


      </Routes>
 
    
    </div>
  );
}

export default App;
