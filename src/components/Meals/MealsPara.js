import classes from './MealsPara.module.css';

const MealsPara = () => {
  return (
    <section className={classes.para}>
      <h2>Delicious Food, Delivered To You</h2>
      <p>
        Choose your favorite fast food from our broad selection of available meals
        and enjoy a delicious lunch or dinner at home.
      </p>
      <p>
        All our meals are cooked with high-quality ingredients, just-in-time and
        of course by experienced chefs!
      </p>
    </section>
  );
};

export default MealsPara;
// This is just a component for rendering some paragraphs
// Parent file is Meals.js