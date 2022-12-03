
import APIRequest, {adminbaseurl, apiBaseUrl} from '../../Api/ApiCalls';






  export const ForgotPassword1 = (username,hai,redirect) => {
    // console.log(username, 'action');
    return async dispatch => {
      var data = new FormData();
      data.append('email', username);
      // redirect()
      // data.append('email', 'esrikanth937@gmail.com');
    
  
      await APIRequest.vmPostRequest(apiBaseUrl + '/forgot_password/', '', data)
        .then(async result => {
          // console.log(JSON.parse(result))
          result.json().then(async loginSuccess => {

            console.log(loginSuccess)
                    
            if (loginSuccess.flag==='success'){
              console.log(loginSuccess)
            hai(loginSuccess.message)
            redirect()

        
         
          } else if (loginSuccess.flag ==='info') {
            hai(loginSuccess.message)
  
          } else if (result.status === 500) {
          }
          
         
            
           // console.log(result,"Actioooooooon-----------------")


          });
        // const emailSent=JSON.parse(result._bodyInit).flag==='success'
        // console.log(emailSent,"emailsent")
     
       
          // if (result.status===200) {
          //   if (true){
          //   hai()
          //   redirect()

        
         
          // } else if (result.status === 400) {
          //   console.log("400 error")
          // } else if (result.status === 500) {
          // }
        })
        .catch(error => {});
    };
  };
 
  


