import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../../redux/reducers/formReducer/formSelector';
import {formReducer} from '../../redux/reducers/formReducer/formReducer';
import * as types from '../../redux/actions';

function Form() {
  const inputValue = useSelector(selectors.formSelector);
  const dispatch = useDispatch();
  
  const changeInputValue = (e) => {
    dispatch(types.actionInputValue(e.target.value))
  }

  return(
    <>
      <h1 className="heading">Write down something</h1>
      <fieldset className="form">
        <input type="text" id="super-duper-input" name="super-duper-input" 
          value={inputValue} onChange={changeInputValue}
          className="form__input"
        />
      </fieldset>
      <br></br>
      <div>You wrote down is: <b>{inputValue}</b></div>
    </>
  );
}

export default Form;