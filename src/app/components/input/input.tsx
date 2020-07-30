import React from 'react';
import './input.scss';

function InputField(props: any) {
  return (
      <div className={`text-input ${props.className}`} >
        <label htmlFor={props.id}>{props.label}</label>
        <input {...props} className={props.errormsg ? 'error' : 'has-content'} />
      </div>
  );
}

export default InputField;
