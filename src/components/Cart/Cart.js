import { React, useContext } from "react";
import CartContext from "../store/CartContext";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import classes from "../Cart/Cart.module.css";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const haveItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    // Remove items inside (modal) cart
    //  Logic is in CartContextProvider.js
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    // Add items inside (modal) cart
    //  Logic is in CartContextProvider.js
    cartCtx.addItem(item);
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

  return (
    <Modal onCartHide={props.onCartHide}>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCartHide}>
          Close
        </button>
        {haveItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
