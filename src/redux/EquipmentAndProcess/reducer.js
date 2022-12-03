import { act } from 'react-test-renderer';
import * as actionTypes from './actionTypes';
const initialState={
    ProcessLineData:[],
    EquipmentData:[],
    c1:1, 
    c2:1
}


export const ProcessAndEquipmentReducer = (state = initialState, action) => {



  
    switch (action.type) {
    
      case actionTypes.EQUIPMENT_SUCESS:
      
        
        return {
          ...state,
          EquipmentData: action.payload[1]>1? [...state.EquipmentData,...action.payload[0]]:action.payload[0]
          ,c2: action.payload[1]+1
        };

      case actionTypes.PROCESS_SUCESS:
        return {
          ...state,
          ProcessLineData: action.payload[1]>1? [...state.ProcessLineData,...action.payload[0]]:action.payload[0]
     ,c1: action.payload[1]+1
  
   
  
       
        };
      default:
        return state;
    }
  };

  // Return {
  //   EquipmentData: action.payload[1]>1? […state.EquipmentData, action.payload[0]],
  //   C2: action.payload[1]
  //   }
  // return {equipmentallData:[…state.equipmentallData, newData]}