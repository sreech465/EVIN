import * as actionTypes from './actionTypes';
const initialState = {
  data: [],
  error: '',
  status: false,
};

export const LoginReducer = (state = initialState, action) => {
  // console.log(action);

  switch (action.type) {
    case actionTypes.LOGIN_SUCESS:
      return {
        ...state,

        status: true,
        data: action.payload,
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,

        status: false,
        error: '',
      };
    default:
      return state;
  }
};






