import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
  { label: "Bacon", type: "bacon" }
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    <h4>
      Price:{" "}
      <strong>
        {props.totalPrice.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, "$1,")}
      </strong>{" "}
      (in INR)
    </h4>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        deleted={() => props.ingredientRemoved(ctrl.type)}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchased}
      onClick={props.ordered}
    >
      Order Now
    </button>
  </div>
);

export default buildControls;
