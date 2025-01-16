import React, { useContext } from 'react'
import CurrencyFormat from 'react-currency-format'
import { Amazoncontext } from '../Context/Context';
import { Link } from 'react-router-dom';
import { getbaskettotal } from '../Context/reducer';
import './Subtotal.css'



export default function Subtotal() {
    const {basket}=useContext(Amazoncontext);

  

  return (
    <div className='subtotal'>
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

        <div className='gift'>
          <input type='checkbox'></input>
          <p>This order contains a gift </p>
        </div>

        <button className='proceed_checkout'>
           <Link to="/payment" style={{textDecoration:"none",color:"#fff"}}>Proceed to checkout</Link> 
            </button>
        
      

       
    </div>
  )
}
