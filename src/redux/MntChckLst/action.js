import APIRequest, {adminbaseurl, apiBaseUrl} from '../../Api/ApiCalls';
import {CHCKLST_DETAILS_SUCESS, SAVE_ANSWER,COMPLETE_ANSWER,UPLOAD_DOC} from './actionTypes';
import axios from 'axios';
export const MntCheckLst = (
  access_token,
  id,
  org_id,
  setInput,
  setchkLstNo,
  setchkLstNoMax,
  setFull,
) => {
  return async dispatch => {
    //console.log(id,"id comingggggg")
    dispatch({type: CHCKLST_DETAILS_SUCESS, payload: ''});

    let headers = {
      Authorization: 'Bearer ' + access_token,
    };

    await APIRequest.vmGetRequest(
      adminbaseurl +
        `end_user/maintenance_checklist_entry/?checklist_id=${id}&org_id=${org_id}` +
        `end_user/tag_equipment/?id=${id}`,

      headers,
    )
      .then(result => {
        // console.log(result.data,"result comibgggg")
        var x = 0;
        var i = 0;
        if (result.status === 200) {
          if (result.data.completed) {
            setInput(
              result.data.field_entries[result.data.field_entries.length]
                .input_value,
            );
            dispatch({type: CHCKLST_DETAILS_SUCESS, payload: result.data});
          } else {
            result.data.field_entries.map((item, index) => {
              console.log(item.complete_status, 'result comibgggg');
              if (item.complete_status == false && x == 0) {
                x = index + 1;
              } else {
                i = i + 1;
              }
            });

            if (x != 0) {
              setInput(result.data.field_entries[x - 1].input_value);
              setchkLstNo(x - 1);
              setchkLstNoMax(x - 1);
            } else {
              setFull(1);
              setInput(result.data.equipment_rating);
              setchkLstNo(result.data.field_entries.length - 1);
              setchkLstNoMax(result.data.field_entries.length - 1);
            }

            dispatch({type: CHCKLST_DETAILS_SUCESS, payload: result.data});
          }
        } else if (result.status === 401) {
        } else if (result.status === 500) {
        }
      })
      .catch(error => {
        console.log('-------- Equipment error ------- ' + error);
      });
  };
};

const appendItem = (chkLstNo, input,check, dispatch) => new Promise((resolve, reject) => {
  // do anything here
  dispatch({type: SAVE_ANSWER, payload: [chkLstNo, input,check]});
  resolve();
})

// export const SaveAnswer = (access_token, datas, chkLstNo, input,check,goBack) => {
//   return async dispatch => {
//     console.log('Save answer woking');
//     dispatch();

//     // call()
//   };
// };

export const SaveAnswer1 = (access_token, chkLstNo, input,check,goBack) => {
  // console.log('hjkhgh',getState())
    return (dispatch, getState) => {
      appendItem(chkLstNo, input,check, dispatch).then(async() => {
          //console.log('bhjgbjhf',getState().MntChkReducer.CheckLstDetails.field_entries[3])
          let headers = {
            'Authorization': 'Bearer ' + access_token,'Content-Type': 'application/json'
          };
      
          // var data1 = {"id":502,"equipment_rating":"3","remarks":"dfsf  dsfsf","completed":false,"field_entries":[{"id":1104,"input_value":"srikant","fm_notes":"dsfs","fm_file_urls":[],"complete_status":true},{"id":1105,"input_value":"test1","fm_notes":"fsdf","fm_file_urls":[],"complete_status":true}]}
      
          await APIRequest.vmPutRequest(
            adminbaseurl + 'end_user/maintenance_checklist_entry/',
            headers,
            JSON.stringify(getState().MntChkReducer.CheckLstDetails)
          )
      
            .then(result => {
            
              // console.log(result, 'response check comibgggg');
      
              if (result.status === 200) {
                if(check){
                  goBack()
                }
        
              } else if (result.status === 401) {
              } else if (result.status === 500) {
              }
            })
            .catch(error => {
              console.log('-------- Equipment error ------- ' + error);
            });
        })
    }
  }


  const appendItem1 = (chkLstNo, input,check, dispatch) => new Promise((resolve, reject) => {
    // do anything here
    console.log('ghjjh',check,input)
    if(check==1){
     
      dispatch({type: COMPLETE_ANSWER, payload: [chkLstNo, input,check]});
      resolve();
    }
    else{
      dispatch({type: SAVE_ANSWER, payload: [chkLstNo, input,check]});
      resolve();
    }
   
 
  })
  

export const ComplteAnswer = (access_token, chkLstNo, input,check,setInput,setchkLstNo,setchkLstNoMax,setFull,goBack) => {
    // console.log('hjkhgh',getState())
      return (dispatch, getState) => {
        appendItem1(chkLstNo, input,check, dispatch).then(async() => {
            // console.log('bhjgbjhf',getState().MntChkReducer.CheckLstDetails)
            let headers = {
              'Authorization': 'Bearer ' + access_token,'Content-Type': 'application/json'
            };
            var chkData=getState().MntChkReducer.CheckLstDetails
            // var data1 = {"id":502,"equipment_rating":"3","remarks":"dfsf  dsfsf","completed":false,"field_entries":[{"id":1104,"input_value":"srikant","fm_notes":"dsfs","fm_file_urls":[],"complete_status":true},{"id":1105,"input_value":"test1","fm_notes":"fsdf","fm_file_urls":[],"complete_status":true}]}
            if(check==0){

              var x=0
              var i=0
              console.log('step1')
              chkData.field_entries.map((item1, index) => {
                console.log('step2')

                if (item1.complete_status == false && x == 0) {
                  x = index + 1;
                } else {
                  i = i + 1;
                }
              });
              if (x != 0) {
                console.log('xxxxxxxx', x);
                setInput(chkData.field_entries[x - 1].input_value);
                setchkLstNo(x - 1);
              } else {
                console.log('step3')

                setFull(1);
                setInput(chkData.equipment_rating);
                setchkLstNo(chkData.field_entries.length - 1);
                setchkLstNoMax(chkData.field_entries.length - 1);
              }
            }
            

            await APIRequest.vmPutRequest(
              adminbaseurl + 'end_user/maintenance_checklist_entry/',
              headers,
              JSON.stringify(chkData)
            )
        
              .then(result => {
              
                // console.log(result, 'response check comibgggg');
        
                if (result.status === 200) {
                  if(check){
                    goBack()
                  }
          
                } else if (result.status === 401) {
                } else if (result.status === 500) {
                }
              })
              .catch(error => {
                console.log('-------- Equipment error ------- ' + error);
              });
          })
      }
    }

 
export const UploadDocuments = (access_token, chkLstNo, input) => {
  // console.log('hjkhgh',getState())
    return async(dispatch, getState) => {

          console.log('bhjgbjhf',input)
          let headers = {
            'Authorization': 'Bearer ' + access_token,'Content-Type': 'application/json'
          };
        
          

          await APIRequest.vmPutRequest(
            adminbaseurl + 'end_user/checklist_field_entry_file/',
            headers,
            JSON.stringify(input)
          )
      
            .then(result => {

            
              // console.log(result, 'response check comibgggg');
      
              if (result.status === 200) {
                result.json().then(response => {
                  console.log(response, 'response check comibgggg');
                 
                  dispatch({type: UPLOAD_DOC, payload: [chkLstNo, response]});
                })
              
        
              } else if (result.status === 401) {
              } else if (result.status === 500) {
              }
            })
            .catch(error => {
              console.log('-------- Equipment error ------- ' + error);
            });
      
    }
  }