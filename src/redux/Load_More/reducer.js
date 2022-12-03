import { PROCESS_MORE } from "../login_credentials/actionTypes"


export const  ProcessLoad=(state={no:null},action)=>{

    // console.log(action)
  
    switch(action.type){
      case PROCESS_MORE:
        return{
          ...state,
          
          no:action.payload
        }
        default:
          return state
    }
  
  }