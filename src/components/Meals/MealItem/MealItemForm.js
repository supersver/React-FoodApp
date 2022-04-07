import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "../MealItem/MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const inputAmountRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = inputAmountRef.current.value;
    const numberAmount = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      numberAmount < 1 ||
      numberAmount > 5
    ) {
      setAmountIsValid(false);
      return; 
    }
    
    props.onAddToCart(numberAmount);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={inputAmountRef}
        label="Quantity -"
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
        />
      <button>Add</button>
      {!amountIsValid && <p>Enter valid details!!</p>}
    </form>
  );
};

export default MealItemForm;

// Menu list
