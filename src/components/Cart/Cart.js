import { React, Fragment, useContext, useState } from "react";
import CartContext from "../store/CartContext";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import Checkout from "./Checkout";
import classes from "../Cart/Cart.module.css";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const haveItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    //  Logic is in CartContextProvider.js
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    //  Logic is in CartContextProvider.js
    cartCtx.addItem(item);
  };

  const OrderHandler = () => {
    setIsCheckout(true);
  };

  const ModalButtons = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCartHide}>
        Close
      </button>
      {haveItems && (
        <button className={classes.button} onClick={OrderHandler}>
          Order
        </button>
      )}
    </div>
  );

  // Sending data to database
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://food-orderapp-bb01f-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.emptyCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          /* Bind pre-configure as a function for future execution and basically
          allows you to pre-configure the argument that function will receive
          when it's being executed. */
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onSubmit={submitOrderHandler} onCancel={props.onCartHide} />
      )}
      {!isCheckout && ModalButtons}
    </Fragment>
  );

  const submittingCartData = <p>Placing Order...</p>;

  const submittedCartData = 
  <Fragment>
  <p>Order Placed!!</p>
  <div className={classes.actions}>
  <button className={classes.button} onClick={props.onCartHide} >Close</button>
  </div>
  </Fragment>

  return (
    <Modal onCartHide={props.onCartHide}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && submittingCartData}
      {!isSubmitting && didSubmit && submittedCartData}
    </Modal>
  );
};

export default Cart;
