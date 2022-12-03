import * as actionTypes from './actionTypes';
const initialState={
  EquipmentDetails:''
}
export const EquipmentDetailsReducer = (state = initialState, action) => {

  
    switch (action.type) {
      case actionTypes.EQUIPMENT_DETAILS_SUCESS:
        return {
          ...state,
  
    
          EquipmentDetails: action.payload,
        };
    
      default:
        return state;
    }
  };