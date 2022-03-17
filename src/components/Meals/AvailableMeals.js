import { useEffect, useState } from "react";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import classes from "../Meals/AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [databaseError, setDatabaseError] = useState(null);

  useEffect(() => {
    // Grabing data from database
    const fetchMeals = async () => {
      const response = await fetch(
        "https://food-orderapp-bb01f-default-rtdb.firebaseio.com/meals.json"
      );
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error("Something went wrong!!");
      }

      // transforming object to array
      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setLoading(false);
    };

    fetchMeals().catch((error) => {
      setLoading(false);
      setDatabaseError(error.message);
    });
  }, []);

  if (loading) {
    return (
      <section className={classes.LoadingText}>
        <p>Loading...</p>
      </section>
    );
  }

  if (databaseError) {
    return (
      <section className={classes.ErrorText}>
        <p>{databaseError}</p>
      </section>
    );
  }

  const mealList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
// Showing menu list
// Parent file is Meals.js
