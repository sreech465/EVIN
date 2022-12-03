import { Platform } from 'react-native';
import APIRequest, {adminbaseurl, apiBaseUrl} from '../../Api/ApiCalls';
import {PROJECT_DETAIL_SUCCESS} from './actionTypes';

export const SparePart = (access_token,data, sucess) => {
  console.log(access_token,sucess ,data,"spareeee part apii action")
 
  return async dispatch => {
 
    
    let headers1 = {
      'Authorization': 'Bearer ' + access_token
  }
  let headers = {
  
  
      'Authorization': 'Bearer ' + access_token,'Content-Type': 'application/json'
  };
   await APIRequest.vmPutRequest(
      adminbaseurl + 'end_user/rfq_spare_part/',
     Platform.OS==='android'?headers:headers1,
    // headers1,
    // headers,
      JSON.stringify(data),
  

   
  )
      .then(result => {
          // console.log('Email: '+JSON.stringify(result))
          console.log("--------hai",result)
          //setLoading(false);
          if (result.status == 200) {
            sucess()
              // callback(mailPayload);
          } 
          else if (result.status == 500) {
              // callbackError();

          } 
      })
      .catch(error => {
          //setLoading(false);
          console.log('-------- Installtion Date error ------- ' + error);
      });

 
  };
};
