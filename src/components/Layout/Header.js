import { Fragment } from "react/cjs/react.production.min";
import classes from "./Header.module.css";
import mealImg from "../../components/assets/meals3.jpg";
import HeadCartBtn from "./HeadCartBtn";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Food App</h1>
        <HeadCartBtn onClick={props.onCartClick} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealImg} alt="Food table pic" />
      </div>
    </Fragment>
  );
};

export default Header;
