import React, { useContext } from 'react';
import './Amazoncheckout.css';
import cart_image from '../Images/cart_image.jpg';
import Checkoutproducts from '../Checkoutproducts/Checkoutproducts';
import { Amazoncontext } from '../Context/Context';
import Subtotal from '../Subtotal/Subtotal';

export default function Amzzoncheckout() {
  const {basket,user}=useContext(Amazoncontext);

  return (
    <div className='checkout_page'>

      <div className='chekout_left'>

        <img src={cart_image} alt='cart_image' className='cart_image'></img>
        <h4>hello , { user ? ` i am  ${user.email}`:""} </h4>

        <h3>Your shopping Cart</h3>
        {
          basket.length > 0 ?  basket.map((item,index)=>{
  
            return(
      
              <Checkoutproducts
              key={index}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
              hiddenButton= {false}
              quantity={item.quantity}
              
              />
              )
      
      
           
         
      
        }) :"There is no products"
        }


                </div>


      <div className='checkout_right'>
        <Subtotal/>
   
      
      </div>
    </div>
  )
}
