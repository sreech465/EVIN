import * as actionTypes from './actionTypes';
const initialState={
  ProjectList:''
}
export const ProjectListReducer = (state = initialState, action) => {

  
    switch (action.type) {
      case actionTypes.PROJECT_LIST_SUCCESS:
        return {
          ...state,
  
    
          ProjectList: action.payload,
        };
    
      default:
        return state;
    }
  };