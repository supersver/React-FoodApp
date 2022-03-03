import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "../Layout/HeadCartBtn.module.css";
import CartContext from "../store/CartContext";

const HeadCartBtn = (props) => {
  const [btnIsFocused, setBtnIsFocused] = useState(false);

  /* By using useContext here,
  the header cart button component will be a re evaluated
  by react whenever the context changes. */
  const CartCntxt = useContext(CartContext);

  // Object de-structuring
  const { items } = CartCntxt;

  /* The reduce() method is a built-in method in the end it is a method which allows us 
  to transform an array of data into a single value and into a single number in this case. */
  const cartItemNumber = items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnIsFocused ? classes.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsFocused(true);

    const timer = setTimeout(() => {
      setBtnIsFocused(false);
    }, 300);

    return () => {
      // Clearing the timer
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartItemNumber}</span>
    </button>
  );
};

export default HeadCartBtn;
