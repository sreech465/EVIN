
import APIRequest, {adminbaseurl, apiBaseUrl} from '../../Api/ApiCalls';
import {  PROJECT_DETAIL_SUCCESS } from './actionTypes';

export const ProjectDetail=(access_token,id,start)=>{
    return async dispatch => {
      // console.log(id,"id comingggggg")
      dispatch({type: PROJECT_DETAIL_SUCCESS, payload: []});
    

      let headers = {
        Authorization: 'Bearer ' + access_token,
      }; 
  
      await APIRequest.vmGetRequest(
        adminbaseurl
        // +`end_user/tag_equipment/?id=${id}`,
       + `my_project_details/${id}/`,
      // +`end_user/tag_equipment/?id=5d29a5573e8245bc995a21df53b31c65`,
        headers,
      )
        .then(result => 
          {
           // console.log(result,"result comibgggg")
          if (result.status === 200) {

            dispatch({type: PROJECT_DETAIL_SUCCESS, payload: result});
            start()
            //console.log("equipmenttttttttttttttttttttt")
          }
           else if (result.status === 401) {
          } else if (result.status === 500) {
          }
        }
        )
        .catch(error => {
          console.log('-------- Project Detail error ------- ' + error);
        });
    };
  }