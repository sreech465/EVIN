import APIRequest, {adminbaseurl} from '../../Api/ApiCalls';
import {PROCESS_DETAILS_SUCESS} from './actionTypes';

export const ProcessAllDetail = (access_token, id) => {
  return async dispatch => {
    let headers = {
      Authorization: 'Bearer ' + access_token,
    };

    await APIRequest.vmGetRequest(
      adminbaseurl + `end_user/process_line/?line_id=${id}`,

      headers,
    )
      .then(result => {
        console.log(result);

        if (result.status === 200) {
          dispatch({type: PROCESS_DETAILS_SUCESS, payload: result});
        } else if (result.status === 401) {
        } else if (result.status === 500) {
        }
      })
      .catch(error => {
        console.log('-------- Equipment error ------- ' + error);
      });
  };
};
