import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import {formReducer} from "./reducers/formReducer/formReducer";
import {createLogger} from 'redux-logger';

const rootReducer = combineReducers({
  form: formReducer,
});

const loggerMiddleware = createLogger();

// Подключаем compose для объединения миддлвар и DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer, 
  composeEnhancers(
    applyMiddleware(
      loggerMiddleware, // логируем экшены
    ) 
  ),
);
