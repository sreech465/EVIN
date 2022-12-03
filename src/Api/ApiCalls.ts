import axios from 'axios';
// export const apiBaseUrl = 'http://52.139.224.15:9191/account/'; //Development
// export const adminbaseurl = 'http://52.139.224.15:9191/';

// export const apiBaseUrl = 'http://52.139.224.15:8181/account/'; // Staging
// export const adminbaseurl = 'http://52.139.224.15:8181/';

export const apiBaseUrl = 'http://52.139.224.15:81/account/'; //UAT
export const adminbaseurl = 'http://52.139.224.15:81/';









// export const apiBaseUrl ='http://52.139.224.15:9191/account/'  
// export const adminbaseurl = 'http://52.139.224.15:9191/'



// export const apiBaseUrl = 'http://104.215.251.151:81/account/'; // Production
// export const adminbaseurl = 'http://104.215.251.151:81/';

//export const apiBaseUrl = 'https://api.enabling.win/account/'; //Domain Production
//export const adminbaseurl = 'https://api.enabling.win/';

export default class APIRequest {
  static vmPostRequest(path, headers, params) {
    return fetch(path, {
      method: 'POST',
      headers: headers,
      body: params,
    });
  }
  static vmDelRequest(path, headers, params) {
    return fetch(path, {
      method: 'DELETE',
      headers: headers,
      body: params,
    });
  }
  static vmPutRequest(path, headers, params) {
    return fetch(path, {
      method: 'PUT',
      headers: headers,
      body: params,
    });
  }
  static vmPutRequestAxios(path, headers, params) {
    return axios({
      method: 'PUT',
      url: path,
      headers: headers,
      data: params,
    });
  }
  static vmGetRequest(path, headers) {
    return axios({
      method: 'get',
      url: path,
      headers: headers,
    });
  }
  static vmDeleteRequestAxios(path, headers) {
    return axios({
      method: 'DELETE',
      url: path,
      headers: headers,
    });
  }
}


