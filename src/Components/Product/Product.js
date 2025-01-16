import React, { useContext } from 'react';
import './Product.css'
import rating_icon from "../Images/rating.png"
import { Amazoncontext } from '../Context/Context';

export default function Product({image,title,price,id}) {
  const {dispatch}=useContext(Amazoncontext)

  function Addtobasket(id){
    dispatch({
      type:"Add_TO_CART",
      item:{
        id:id,
        title:title,
        image:image,
        price:price
      }
    })

  }

  return (

    <div className='product_details'>

        <strong>{title}</strong>
        <p><span>{price} $</span></p>
        <img src={rating_icon} alt='' className='rating_icon'></img>
        <div>
            <img src={image} alt='' className='product_image'></img>
        </div>
        <button onClick={()=>Addtobasket(id)} >Add to basket</button>

        
    </div>
  )
}
