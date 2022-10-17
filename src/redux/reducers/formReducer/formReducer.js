import * as types from '../../actions';

const initialState = {
  inputValue: "",
}

export const formReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.INPUT_VALUE:
      return {
        ...state,
        inputValue: action.payload
      }
      
    default: 
      return state  
  }
}

