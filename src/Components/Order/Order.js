import React from "react";
import moment from "moment";
import Checkoutproducts from "../Checkoutproducts/Checkoutproducts";
import CurrencyFormat from "react-currency-format";
import './Order.css'


const Order = ({ order }) => {
  return (
    <div className="order">
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM DD YYYY h:mma")}</p>
      <p className="order-id">
        <small style={{color:"black",fontWeight:"bold"}}>{order.id}</small>
      </p>
      {order.data.basket?.map((item) => (
        <Checkoutproducts
          key={item.id}
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          quantity={item.quantity}
          hiddenButton
        />
      ))}
      <CurrencyFormat
        renderText={(value) => (
          <>
            <h3 className="order-total">Order Total: {value}</h3>
          </>
        )}
        decimalScale={2}
        value={order.data.amount * 100}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
        <hr style={{marginTop:"10px"}}></hr>
    </div>
  
  );
};

export default Order;