import axios from 'axios';
import {trackerApi} from '../../Api/tracker';
import {LOGIN_FAILURE, LOGIN_SUCESS} from './actionTypes';
import DeviceInfo from 'react-native-device-info';
import APIRequest, {adminbaseurl, apiBaseUrl} from '../../Api/ApiCalls';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import {
  EQUIPMENT_SUCESS,
  PROCESS_SUCESS,
} from '../EquipmentAndProcess/actionTypes';
import EquipmentDetail from '../../screens/EquipmentDetail';

export const LoginAction = (username, password) => {
  //console.log(username, password, 'action');
  return async dispatch => {
    var data = new FormData();
    data.append('username', username);
    data.append('password', password);
    data.append('device_id', DeviceInfo.getUniqueId());

    await APIRequest.vmPostRequest(apiBaseUrl + 'login/', '', data)
      .then(async result => {
        console.log(result, 'kiki', result.status);
        if (result.status === 200) {
          result.json().then(async loginSuccess => {
            dispatch({type: LOGIN_SUCESS, payload: loginSuccess});
            const asyncStorage = JSON.stringify(loginSuccess);
            // console.log(result,"Actioooooooon-----------------")

            await AsyncStorage.setItem('LoginResponse', asyncStorage);
          });
        } else if (result.status === 400) {
          console.log('400 error');
        } else if (result.status === 500) {
        }
      })
      .catch(error => {});
  };
};

export const ReSolveAuth = call => {
  return async dispatch => {
    const token1 = JSON.parse(await AsyncStorage.getItem('LoginResponse'));

    if (token1) {
      dispatch({type: LOGIN_SUCESS, payload: token1});

      call();
    }
  };
};

export const getProcesslineData = (access_token, nxtPage, searchQuery) => {
  console.log(access_token, nxtPage, searchQuery);
  return async dispatch => {
    let headers = {
      Authorization: 'Bearer ' + access_token,
    };

    console.log('coming', nxtPage, access_token, searchQuery);

    await APIRequest.vmGetRequest(
      adminbaseurl +
        // `end_user/process_line/?primary_product=All&org_location=&query=${searchQuery}&page=${nxtPage}&sort_by=id&installed_by=`,
        `end_user/process_line/?primary_product=All&org_location=&query=${searchQuery}&page=1&sort_by=id&installed_by=`,
      headers,
    )
      .then(result => {
        console.log(result, 'process-action-response');

        if (result.status == 200) {
          dispatch({type: PROCESS_SUCESS, payload: [result.data, nxtPage]});
        } else if (result.status === 401) {
        } else if (result.status === 500) {
        }
      })
      .catch(error => {
        // console.log('-------- processlines error ------- ' + error);
      });
  };
};

export const getEquipmentData = (access_token, nxtPage, searchQuery) => {
  console.log(access_token, nxtPage, searchQuery);
  return async dispatch => {
    let headers = {
      Authorization: 'Bearer ' + access_token,
    };

    console.log('coming', nxtPage, access_token, searchQuery);

    await APIRequest.vmGetRequest(
      adminbaseurl +
        `tagged_equipment_list/?search=${searchQuery}&page=${nxtPage}&ordering=-status&user_template__org_location__name=&user_template__name=&system=&supplier_id=&user_template__primary_product_ref__unique_name=&equipment_select=&user_template__installed_by=`,
      headers,
    )
      .then(result => {
        // console.log(result.data.results,'Equip_data')
        console.log(result, 'Equipment-action-response', result.data.results);
        if (result.status === 200) {
          dispatch({
            type: EQUIPMENT_SUCESS,
            payload: [result.data.results, nxtPage],
          });
        } else if (result.status === 401) {
        } else if (result.status === 500) {
        }
      })
      .catch(error => {
        console.log('-------- Equpmet error ------- ' + error);
      });
  };
};

export const Logout = () => {
  return async dispatch => {
    AsyncStorage.removeItem('LoginResponse');
    dispatch({type: LOGIN_SUCESS, payload: ''});
    // navigation.navigate('Login')
  };
};

// export const Process_more_action = data => ({
//   type: 'PROCESS_MORE',
//   Payload:data
// })

// [15:55] Nagendra Babu Lakide
// primary_product_details.primary_product_image

// [15:55] Nagendra Babu Lakide
// primary_product_details.name

// [15:56] Nagendra Babu Lakide
// name

// [15:56] Nagendra Babu Lakide
// line_capacity

// [15:56] Nagendra Babu Lakide
// capacity_uom_name
//   [15:58] Nagendra Babu Lakide
// org_location

// [15:58] Nagendra Babu Lakide
// org_location_name

// [16:03] Nagendra Babu Lakide
// tagged_equipment_name

// [16:06] Nagendra Babu Lakide
// serial no:

// equipment_id

// [16:09] Nagendra Babu Lakide
// equipment_rating==1

// [16:09] Nagendra Babu Lakide
// #B72136

// [16:09] Nagendra Babu Lakide
// equipment_rating==2

// [16:09] Nagendra Babu Lakide
// #FFC107

// [16:10] Nagendra Babu Lakide
// equipment_rating==3

// [16:10] Nagendra Babu Lakide
// #229A16
