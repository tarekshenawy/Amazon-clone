import React from 'react'
import AmazonPayment from '../Components/Amazonpayment/AmazonPayment'
import { Elements } from '@stripe/react-stripe-js'

export default function Payment({stripe}) {
  return (
    <div>
      <Elements stripe={stripe}>
      <AmazonPayment/>

      </Elements>
        
    </div>
  )
}
