import * as actionTypes from './actionTypes';
const initialState = {
  CheckLstDetails: '',
};
export const MntChkReducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.CHCKLST_DETAILS_SUCESS:
      return {
        ...state,

        CheckLstDetails: action.payload,
      };
    case actionTypes.SAVE_ANSWER:
      console.log('jknhkniuhug')
      return {
        ...state,
     
        CheckLstDetails: {...state.CheckLstDetails,
          field_entries: state.CheckLstDetails.field_entries.map((item,index)=>{
                  if(index==action.payload[0]){
                 
                    return {...item,
                      input_value:action.payload[1],
                      complete_status:action.payload[1]?true:false

                    }
                  }
                  return item
        })}
        
      };

      case actionTypes.COMPLETE_ANSWER:
      
        return {
          ...state,
         
          CheckLstDetails: {...state.CheckLstDetails,
            completed:true,
            equipment_rating:action.payload[1]
          }  
        };

        case actionTypes.UPLOAD_DOC:
          console.log('jknhkniuhug',action.payload)
          return {
            ...state,
         
            CheckLstDetails: {...state.CheckLstDetails,
              field_entries: state.CheckLstDetails.field_entries.map((item,index)=>{
                      if(index==action.payload[0]){
                     
                        return {...item,
                          fm_file_urls:[...item.fm_file_urls,action.payload[1]],
                          
    
                        }
                      }
                      return item
            })}
            
          };
    default:
      return state;
  }
};
