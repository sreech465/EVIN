import * as actionTypes from './actionTypes';
const initialState={
  ProjectDetails:''
}
export const ProjectDetailReducer = (state = initialState, action) => {

   

  
    switch (action.type) {
      case actionTypes.PROJECT_DETAIL_SUCCESS:
        return {
          ...state,
  
    
          ProjectDetails: action.payload,
        };
    
      default:
        return state;
    }
  };