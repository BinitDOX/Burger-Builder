import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

import classes from './SideDrawer.css';


const sideDrawer = (props) => {
  let attchedClasses = [classes.SideDrawer, classes.Close];
  if (props.opened) {
    attchedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <BackDrop show={props.opened} clicked={props.closed}/>
      <div className={attchedClasses.join(' ')} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavItems isAuth={props.isAuth}/>
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;