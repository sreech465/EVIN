
import APIRequest, {adminbaseurl, apiBaseUrl} from '../../Api/ApiCalls';
import { PROJECT_LIST_SUCCESS } from './actionTypes';

export const ProjectListAction=(access_token)=>{
    return async dispatch => {
 
  

      let headers = {
        Authorization: 'Bearer ' + access_token,
      }; 

  
      await APIRequest.vmGetRequest(
        adminbaseurl
        +'/my_project_list/?search=&page=1&ordering=id&project_status=&solution_org=',
    
        headers,
      )
        .then(result => 
          {
           
         
          if (result.status === 200) {
            dispatch({type: PROJECT_LIST_SUCCESS, payload:result});
      
          }
           else if (result.status === 401) {
          } else if (result.status === 500) {
          }
        }
        )
        .catch(error => {
          console.log('-------- projectList error ------- ' + error);
        });
    };
  }