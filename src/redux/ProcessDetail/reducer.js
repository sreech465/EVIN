import * as actionTypes from './actionTypes';
const initialState={
  ProcessDetails:''
}
export const ProcessDetailsReducer = (state = initialState, action) => {

  
    switch (action.type) {
      case actionTypes.PROCESS_DETAILS_SUCESS:
        return {
          ...state,
  
    
          ProcessDetails: action.payload,
        };
    
      default:
        return state;
    }
  };