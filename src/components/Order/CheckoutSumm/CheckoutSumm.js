import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSumm.css';


const checkoutSumm = (props) => {
  return (
    <div className={classes.CheckoutSumm}>
      <h1>Bon Appetit Monsieur!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients}/>
      </div>
      <Button
        btnType="Failure"
        clicked={props.checkoutCancelled}>CANCEL</Button>
      <Button btnType="Success"
        clicked={props.checkoutContinued}>CONTINUE</Button>
    </div>
  );
};

export default checkoutSumm;