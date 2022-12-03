
import APIRequest, {adminbaseurl, apiBaseUrl} from '../../Api/ApiCalls';
import { CHECKLIST_SUCESS } from './actionTypes';

export const CheckList=(access_token,checkListid,orgId)=>{
    return async dispatch => {
      //console.log(id,"id comingggggg")

      let headers = {
        Authorization: 'Bearer ' + access_token,
      }; 
    //   http://52.139.224.15:9191/end_user/maintenance_checklist_entry/?checklist_id=12&org_id=74
      await APIRequest.vmGetRequest(
        adminbaseurl
     
       +`end_user/maintenance_checklist_entry/?checklist_id=12&org_id=74`,
        headers,
      )
        .then(result => 
          {
            //console.log(result,"result comibgggg")
          if (result.status === 200) {
            dispatch({type: CHECKLIST_SUCESS, payload: result});
            //console.log("equipmenttttttttttttttttttttt")
          }
           else if (result.status === 401) {
          } else if (result.status === 500) {
          }
        }
        )
        .catch(error => {
          console.log('-------- CheckList  error ------- ' + error);
        });
    };
  }