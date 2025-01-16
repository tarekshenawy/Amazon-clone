import React, { useContext } from 'react'
import { Amazoncontext } from '../Context/Context';
import './Checkoutproducts.css'
import rating_icon from "../Images/rating.png"

export default function Checkoutproducts({key,id,price,image,title, hiddenButton,quantity}) {
    const {dispatch}=useContext(Amazoncontext)

    function removeitem(id){
        dispatch({
          type:"Remove_From_CART",
          id:id,
        })
      }

  return (
    <div>

        <div  className='checkout_product' key={key}>

        <div>
            <img src={image} alt='' className='product_image'></img>
        </div>

      <div className='checkout_product_details'>

            <strong>{title}</strong>
            <p>{price * quantity} $</p>

            <img src={rating_icon} alt='' className='checkout_rating'></img>
          {
            hiddenButton ? "": <button className='checkout_button' onClick={()=>removeitem(id)}>Remove from basket</button>
          }

          <h3 className="product_quantity" > Q : {quantity}</h3>
          
      </div>




</div> 

   

     
 
            

  

         
    </div>
  )
}
