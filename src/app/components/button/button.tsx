import React, { Fragment } from 'react';
import './button.scss';

function Button(props: any) {
  function handleClick() {
    if (props.onClick) {
      props.onClick();
    }
  }
  return (
    <Fragment>
      <button {...props} className={`button ${props.className ? props.className : ''}`} onClick={handleClick}></button>
    </Fragment>
  );
}
export default Button;
