import React from 'react';

import classes2 from './MenuBtnPro.css';


const menuBtn = (props) => {
  return (
    <div className={classes2.MenuBtnPro} onClick={props.clicked}>
      {/* {props.children} */}
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default menuBtn;