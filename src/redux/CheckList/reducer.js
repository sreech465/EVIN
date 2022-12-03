import * as actionTypes from './actionTypes';
const initialState = {
  CheckListDetails: '',
};
export const CheckListReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHECKLIST_SUCESS:
      return {
        ...state,

        CheckListDetails: action.payload,
      };

    default:
      return state;
  }
};
