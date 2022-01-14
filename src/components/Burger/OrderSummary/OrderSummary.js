import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  //TODO: Change to func compo

  render() {
    const igSummary = Object.keys(this.props.ingredients).map(
      (igKey => {
        return <li key={igKey}>
          <span style={{ textTransform: 'capitalize' }}>
            {igKey}
          </span>: {this.props.ingredients[igKey]}
        </li>
      })
    );

    return (
      <Aux>
        <h1>Bon Appetite!</h1>
        <h3>Your Order:</h3>
        <p>A delicious burger with the following fillers:</p>
        <ul>
          {igSummary}
        </ul>
        <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType="Success" clicked={this.props.orderContinued}>Continue</Button>
        <Button btnType="Failure" clicked={this.props.orderCancelled}>Cancel</Button>
      </Aux>
    );
  }
}

export default OrderSummary;