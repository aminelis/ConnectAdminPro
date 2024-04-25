import { SET_TOKEN, ADD_USER, UPDATE_USER, FETCH_USER, DELETE_USER } from '../constants/constants';

const initialState = {
  user: null,
  token: null
};
let updatedUsers;
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case ADD_USER:
        return {
          ...state,
          user: [...state.user, action.payload],
        };
    case UPDATE_USER:
      return {
        ...state,
        user: state.user.map(u => u.id === action.payload.id ? action.payload : u)
      };
    case FETCH_USER:
      return {
        ...state,
        user: action.payload
      };
      case DELETE_USER:
      updatedUsers = state.user.filter(u => u.id !== action.payload);
      return {
        ...state,
        user: updatedUsers,
      };
    default:
      return state;
  }
};

export default authReducer;
