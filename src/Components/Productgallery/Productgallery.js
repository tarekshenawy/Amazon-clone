import React from 'react';
import './Productgallery.css';
import products from '../Images/Products';
import Product from '../Product/Product';

export default function Productgallery() {
  return (
    <div  className='product_gallery'>
       {
        products.map((el,index)=>{
            return(
                <Product key={index} image={el.image} title={el.title} price={el.price} id={el.id}/>
            )
        })
       }
        

    </div>
  )
}
