import { Fragment } from "react/cjs/react.production.min";
import ReactDOM from "react-dom";
import classes from "../UI/Modal.module.css";

const Background = (props) => {
  // Side background of modal
  return <div className={classes.backdrop} onClick={props.onCartHide} />;
};

const Overlay = (props) => {
  // This is a modal
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

// Getting id from index.html
const portel = document.getElementById("overlay");

const Modal = (props) => {
  return (
    <Fragment>
      {/* creating portels */}
      {ReactDOM.createPortal(<Background onCartHide={props.onCartHide} />, portel)}
      {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, portel)}
    </Fragment>
  );
};

export default Modal;
// This modal is for Cart.js
