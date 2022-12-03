import APIRequest, {adminbaseurl, apiBaseUrl} from '../../Api/ApiCalls';
import {EQUIPMENT_DETAILS_SUCESS} from './actionTypes';

export const EquipmentAllDetail = (access_token, id) => {
  return async dispatch => {
    dispatch({type: EQUIPMENT_DETAILS_SUCESS, payload: ''});

    let headers = {
      Authorization: 'Bearer ' + access_token,
    };

    await APIRequest.vmGetRequest(
      adminbaseurl + `end_user/tag_equipment/?id=${id}`,

      headers,
    )
      .then(result => {
        if (result.status === 200) {
          console.log(result);
          dispatch({type: EQUIPMENT_DETAILS_SUCESS, payload: result});
        } else if (result.status === 401) {
        } else if (result.status === 500) {
        }
      })
      .catch(error => {
        console.log('-------- Equipment error ------- ' + error);
      });
  };
};

export const ScanQrCode = (access_token, value, sucess, fail) => {
  return async dispatch => {
    console.log('id comingggggg');
    dispatch({type: EQUIPMENT_DETAILS_SUCESS, payload: ''});

    let headers = {
      Authorization: 'Bearer ' + access_token,
    };

    APIRequest.vmGetRequest(
      adminbaseurl + 'end_user/tag_equipment/?scan_code=' + value,
      headers,
    )
      .then(result => {
        if (result.status === 200) {
          console.log(result.data, 'location');
          // setLoading(false)
          if (result.data.length > 0) {
            dispatch({type: EQUIPMENT_DETAILS_SUCESS, payload: result});
            sucess();
          } else {
            fail('You do not have required data for scaned equipment.');
          }
        } else if (result.status === 401) {
          fail('Authentication credentials were not provided.');
          // Bugsnag.notify('Authentication credentials were not provided.');
        } else if (result.status === 500) {
          // setTitle('red')
          // callToast()
          // setLoading(false);
          // setFail(true)
          // setshow(false)
          fail('Something went wrong.');
          // Bugsnag.notify('Something went wrong.');
        }
      })
      .catch(error => {
        // setLoading(false);
        console.log('-------- locations error ------- ' + error);
      });
  };
};
