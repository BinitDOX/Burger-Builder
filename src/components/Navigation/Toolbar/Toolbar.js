import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import MenuBtn from '../../MenuBtn/MenuBtn';

import classes from './Toolbar.css'


const toolbar = (props) => (
  <header className={classes.Toolbar} style={{height: props.height}}>
    <MenuBtn clicked={props.mClicked}>MENU</MenuBtn>
    <div className={classes.Logo}>
        <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavItems isAuth={props.isAuth}/>
    </nav>
  </header>
);

export default toolbar;