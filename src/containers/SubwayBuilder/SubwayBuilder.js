import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Sub from "../../components/Sub/Sub";
import BuildControls from "../../components/Sub/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Sub/OrderSummary/OrderSummary";
import axios from "../../axios-orders";

const INGREDIENT_PRICES = {
  salad: 50,
  meat: 60,
  bacon: 80,
  cheese: 25
};

class SubwayBuilder extends Component {
  state = {
    ingredient: null,
    totalPrice: 10,
    purchasable: false,
    purchasing: false
  };

  componentDidMount() {
    axios.get( 'https://subway-customiser.firebaseio.com/ingredients.json' )
            .then( response => {
                this.setState( { ingredient: response.data } );
            } )
            .catch( error => {
                console.log(error);
            } );
  }

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredient[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredient
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredient: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredient[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredient
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice - priceDeduction;
    this.setState({
      totalPrice: newPrice,
      ingredient: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  puchaseContinueHandler = () => {
    const order = {
      ingredients: this.state.ingredient,
      price: this.state.totalPrice
    };
    axios
      .post("/orders.json", order)
      .then(resolve => console.log(resolve))
      .catch(reject => console.log(reject));
  };

  render() {
    let orderSummary = null;
    let sub = null;
    if (this.state.ingredient) {
      sub = (
        <Aux>
          <Sub ingredients={this.state.ingredient} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            totalPrice={this.state.totalPrice}
            ingredientRemoved={this.removeIngredientHandler}
            purchased={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredient}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinue={this.puchaseContinueHandler}
          price={this.state.totalPrice}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {sub}
      </Aux>
    );
  }
}

export default SubwayBuilder;
