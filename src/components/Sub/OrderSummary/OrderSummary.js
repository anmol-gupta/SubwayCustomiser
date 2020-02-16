import React, {Component} from "react";
import Aux from "../../../hoc/Aux";
import Button from '../../UI/Button/Button'
class OrderSummary extends Component {
  componentDidUpdate() {
    console.log('Order Summary Update');
  }
   render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}> 
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
          {this.props.ingredients[igKey]}
        </li>
      );
    });
    return (
      <Aux>
      <h3>Your Order</h3>
      <h5>A delicious sub with following ingredients: </h5>
      <ul>
          {ingredientSummary}
      </ul>
      <p><strong>Total Price: {this.props.price}</strong></p>
      <p>Continue to Checkout</p>
      <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
      <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
    </Aux>
    )
  }
}

export default OrderSummary;
