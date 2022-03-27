import { useState } from "react"
import CartContextProvider from "./components/store/CartContextProvider";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const cartShowHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartContextProvider>
      {cartIsShown && <Cart onCartHide={hideCartHandler} />}
      <Header onCartClick={cartShowHandler} />
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;
