

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; // Correction ici : import de 'redux-thunk' au lieu de 'thunk'
import productReducers from '../Reducer/PdtsReducer';
import authReducer from '../Reducer/AuthReducer';

const rootReducer = combineReducers({
  products: productReducers,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

