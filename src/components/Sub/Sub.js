import React from "react";
import classes from "./Sub.css";
import SubIngredient from "../Sub/SubIngredients/SubIngredient";
const sub = props => {
  let transfomedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <SubIngredient type={igKey} key={igKey + i} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  console.log(transfomedIngredients);
  if(transfomedIngredients.length === 0) {
      transfomedIngredients = <h3>Please start adding ingredients!!</h3>
  }
  return (
    <div className={classes.Sub}>
      <SubIngredient type="Bread-Top" />
      {transfomedIngredients}
      <SubIngredient type="Bread-Bottom" />
    </div>
  );
};

export default sub;
