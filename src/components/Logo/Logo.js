import React from "react";
import subLogo from "../../assets/Images/subLogo.png";
import classes from "./Logo.css";
const logo = (props) => (
  <div className={classes.Logo} style={{height: props.height}}>
    <img src={subLogo} alt="Subify" />
  </div>
);

export default logo;
