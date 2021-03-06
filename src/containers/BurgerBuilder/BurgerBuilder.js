import React, { Component } from "react";
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';


export class BurgerBuilder extends Component {
  state = {
    ordering: false,
  }

  componentDidMount(){
    this.props.onInitIngredients();
  }

  updateOrderState(ingredients) {
    const sum = Object.keys(ingredients).map(
      (igKey) => {
        return ingredients[igKey]
      }
    ).reduce((sum, el) => {
      return sum + el;
    }, 0);
    return sum > 0 
  }

  orderHandler = (order) => {
    if(this.props.isAuth){
      this.setState({ ordering: order });
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  }

  orderContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }


  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? <p>Loading failed!</p> : <Spinner />
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            orderable={this.updateOrderState(this.props.ings)}
            ordered={this.orderHandler.bind(this, true)}
            isAuth={this.props.isAuth}
            price={this.props.price} />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
          orderCancelled={this.orderHandler.bind(this, false)}
          orderContinued={this.orderContinueHandler} />
      );
    }

    return (
      <Aux>
        <Modal show={this.state.ordering} modalClosed={this.orderHandler.bind(this, false)}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.remIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));