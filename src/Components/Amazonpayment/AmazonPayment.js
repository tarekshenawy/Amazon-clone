import React, { useContext,useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Amazonpayment.css'
import Checkoutproducts from '../Checkoutproducts/Checkoutproducts';
import { Amazoncontext } from '../Context/Context';
import CurrencyFormat from 'react-currency-format';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from '../Axios/axios';
import { getbaskettotal } from '../Context/reducer';
import { doc,setDoc } from 'firebase/firestore';
import { db } from '../../firebase';



export default function AmazonPayment() {
    const {user,basket,dispatch}=useContext(Amazoncontext);
    const [clientSecret, setClientSecret] = useState();
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    ////////////////////// get the clientsecret key 
    useEffect(() => {

                        const getClientSecret = async () => {
                try{
                  const response = await axios({
                    method: "post",
                    url:`/payments/create?total=${getbaskettotal(basket) * 100}`,
                  });
           
                  setClientSecret(response.data.clientSecret);
                  return response;

                }catch(error){
                  alert(error.message)
                }

                }
                                     
               getClientSecret()

      },[basket]);
      
      /////////////////////////////

   
      const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
    
        try {
          const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: elements.getElement(CardElement),
            },
       
           });
   
    
          // تحقق من وجود paymentIntent
          if (payload.paymentIntent) {
            
            const ref = doc(db, "users", user?.uid, "orders",payload.paymentIntent.id);
            setDoc(ref, {
              basket: basket,
              amount: payload.paymentIntent.amount,
              created: payload.paymentIntent.created,
            });
           
            setSucceeded(true);
            setError(null);
            setProcessing(false);
      
            dispatch({
              type: "EMPTY_BASKET",
            });
      
            navigate("/orders");
            alert("Payment successful!");

          } else {
            console.error("Payment Intent not found in response:", payload);
            setError("Payment failed. Please try again.");
            setProcessing(false);
          }
        } 


        catch (error) 
        {
          console.error("Error during payment:", error);
          setError(error.message);
          setProcessing(false);
        }
      };
      

      ////////////////////////////////////
      const handleChange = (e) => {
        setDisabled(e.empty);
        setError(error ? error.message : "");
      };

  return (

    <div className='payment_page'>

        <h2 className='payment_title'> Chekout({basket.length} itmes) </h2>

{/* delivery address section  */}

        <div className='delivery_address'>

            <h3>Delivery Address : </h3>
            <div>
                <p>  {user ? user.email : "No user found"}</p>
            </div> 
        </div>

        <hr></hr>
{/* products payment section to show product in basket */}

        <div className='products_payment'>

            <h3>Review items and delivery : </h3>

            <div className='products_payment_details'>
            {
            basket.map((item,index)=>{
              return(
        
              <Checkoutproducts
              key={index}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
              quantity={item.quantity}
              hiddenButton
              
              />
              )
          
            })
          }

            </div>
       
        </div>

        <hr></hr>
{/*  payment box to complete purchase process */}

        <div className='payment_box'>

            <h3>Payment Method : </h3>

                <form onSubmit={handleSubmit}>

                    <CardElement onChange={handleChange}/>

                <h2>
                <CurrencyFormat renderText={(value)=>(
                           <>
                           <p>
                               Subtotal({basket.length} items) : {value}
                           </p>
                           </>
                 )}
                 decimalScale={2}
                 value={getbaskettotal(basket)}
                 displayType='text'
                 thousandSeparator={true}
                 prefix='$'
                 
                 >
                       </CurrencyFormat>
                </h2>

                <button type='submit'  disabled = {processing || disabled || succeeded}>
                 <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
             
                    {error && <div>{error}</div>}
                 
                </form>

        </div>

        {/* /////////////////////////////////////////////// */}
    </div>
  )
}
