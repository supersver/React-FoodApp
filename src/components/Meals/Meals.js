import { Fragment } from "react/cjs/react.production.min";
import AvailableMeals from "./AvailableMeals";
import MealsPara from "./MealsPara";

const Meals = () => {
  return (
    <Fragment>
      <MealsPara />
      <AvailableMeals />
    </Fragment>
  );
};

export default Meals;
