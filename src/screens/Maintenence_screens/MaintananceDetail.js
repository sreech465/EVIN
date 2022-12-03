import React, {Component, useState, useEffect} from 'react';
import {Button, Platform, TextInput} from 'react-native';
import {ActivityIndicator} from 'react-native';
import moment from 'moment';
import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  // Button
  StatusBar,
  FlatList,
} from 'react-native';
import * as OpenAnything from 'react-native-openanything';
import WebView from 'react-native-webview';
import {useSelector, useDispatch} from 'react-redux';
import {heightToDp, widthToDp} from '../../responsive';
import {appStyle, bdRad, styles} from '../../styles/styles';
import BottomSaveComponent from '../components/BottomSaveComponent';
import MaintenanceTop from '../components/MaintenenceTop';
import DocumentPicker from 'react-native-document-picker';
import {Overlay} from 'react-native-elements';
import Icon3 from 'react-native-vector-icons/dist/Feather';
import ImagePicker from 'react-native-image-crop-picker';
import Icon2 from 'react-native-vector-icons/dist/Entypo';
import {readFile as read, writeFile as write} from 'react-native-fs';

import {EquipmentAllDetail} from '../../redux/EquipmentDetail/action';
import {
  getEquipmentData,
  getProcesslineData,
} from '../../redux/login_credentials/action';
import CheckList2 from './CheckList2';
import {
  MntCheckLst,
  SaveAnswer,
  SaveAnswer1,
  ComplteAnswer,
  UploadDocuments,
} from '../../redux/MntChckLst/action';
import {AddFile, AddImage, Back, Doc, Img, Mp4, Pdf, Pptx, Xlsx} from '../../Icon/Icon';
import {ScrollView} from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';




const CloseImage = require('../Assets/close2x.png');

const MaintenanceDetails = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [chkLstNo, setchkLstNo] = useState(0);
  const [chkLstNoMax, setchkLstNoMax] = useState(0);
  const [full, setFull] = useState(0);
  const [popshow, setpopshow] = useState(false);

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState('');
  const [webView, showWebView] = useState(true);
  const [Alert, setShowAlert] = useState(false);

  const [input, setInput] = useState(
    MntReduxState && MntReduxState.field_entries[chkLstNo].input_value,
  );
  const [remark, setRemark] = useState(MntReduxState && MntReduxState.remarks);
  const ReduxState = useSelector(
    state => state.EquipmentDetails.EquipmentDetails,
  );
  const MntReduxState = useSelector(
    state => state.MntChkReducer.CheckLstDetails,
  );
  useEffect(()=>{
    console.log("jii",MntReduxState.field_entries,"mimic")
  },[])

  const access_token = useSelector(
    state => state.LoginReducer.data.access_token,
  );
  const P_E_Reducer = useSelector(state => state.ProcessAndEquipmentReducer);
  const {
    equip_mnt_checklist,
    supplier_equipment_name,
    model_name,
    equipment_id,
  } = ReduxState && ReduxState.data.length && ReduxState.data[0];
  console.log(webView, file);
  useEffect(() => {
    dispatch(
      MntCheckLst(
        access_token,
        equip_mnt_checklist && equip_mnt_checklist[route.params?.index].id,
        route.params?.org_id,
        item => {
          setInput(item);
          // console.log(item,'whatttttt a itemmm.......')
        },
        item => setchkLstNo(item),
        item => setchkLstNoMax(item),
        item => setFull(item),
      ),
    );
  }, []);

  if (MntReduxState) {
    console.log('gdgdgd', MntReduxState.field_entries[chkLstNo]);
  }

  const saveAnswer = async item => {
    dispatch(SaveAnswer1(access_token, chkLstNo, input, 0, () => {}));
    setInput(MntReduxState.field_entries[item].input_value);
    setchkLstNo(item);
    if (chkLstNoMax < item) {
      setchkLstNoMax(item);
    }
  };

  

  const fileOpening = (format, fileName) => {
    const extension = format.split('.').pop();
    console.log(extension)
    navigation.navigate('FileViewer',{url:format,name:fileName.file_name,extension:extension})



  };

  const openCamera = () => {
    console.log('hi nikhil');
    ImagePicker.openCamera({
      cropping: true,
      hideBottomControls: true,
      width: 1000,
      height: 1000,
      includeBase64: true,
      multiple: false,
      compressImageQuality: 0.3,
    }).then(response => {
      console.log(response,'res----------camera');
      var data = {
        field_entry_id: MntReduxState.field_entries[chkLstNo].id,
        file_size: response.size,
        fm_file: 'data:image/jpeg;base64,' + response.data,
        fm_file_ext: 'jpeg',
        // name: 'android-photo',
        name:response.modificationDate
      };
      dispatch(UploadDocuments(access_token, chkLstNo, data));
      setpopshow(false);
    });
  };
  const uploadDocuments = async () => {
    try {
      await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      }).then(res => {
        // console.log('URI : ', res);

        read(res[0].uri, 'base64').then(contents => {
          var fileExt = res[0].name.split('.').pop();
          var data = {
            field_entry_id: MntReduxState.field_entries[chkLstNo].id,
            file_size: res[0].size,
            fm_file: 'data:application/' + fileExt + ';base64,' + contents,
            fm_file_ext: fileExt,
            name: res[0].name,
          };
          dispatch(UploadDocuments(access_token, chkLstNo, data));
          setpopshow(false);
        });
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Canceled from single doc picker');
      } else {
        console.log('Canceled from single doc picker', JSON.stringify(err));
      }
    }
  };
  const renderXls = link => {
    OpenAnything.Web(link);
  };
  const renderIos = link => {
    console.log('ios', link);
    navigation.navigate('FileView', {url: link});
    // OpenAnything.Web(link);
  };

  const renderInstruction = data => {

    return (
      <>
        <Text style={{color: '#919EAB'}}>Instructions</Text>

        {
          data.oem_instructions!==null && data.oem_instructions!=''?
          <>
          


            <View style={{ marginTop: heightToDp('0')}}>

          
            <Text style={[appStyle.BoxHeading, {fontWeight: '400'}]}>
              {data.oem_instructions}
            </Text>
     
        </View>
        </>

          :<Text>---</Text>
        }
    
        <View style={{ marginTop: heightToDp('0.5')}}>
          {data.reference_files.length > 0 ? (
            <FlatList
              data={data.reference_files}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(items, index) => String(index)}
              renderItem={({item, index}) => {
                const extension = item.document_url.split('.').pop();
                console.log(item.document_url,"q-------------ex")
                 

                return (
                  <TouchableOpacity
                    style={[
                      appStyle.borderShadow,
                      {
                        alignItems: 'center',
                        width: widthToDp('27'),
                        height: heightToDp('14'),
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: heightToDp('1'),
                        borderRadius: 15,
                        padding: widthToDp('5'),
                      },
                    ]}
                    onPress={
                      // ()=>OpenAnything(item.document_url)
                      // console.log('hai')
                      ()=>OpenAnything.Web(item.document_url)
                      // ()=>OpenAnything.Web('https://www.google.co.in/?client=safari&channel=mac_bm')
                      
                    
                      // () => fileOpening(item.document_url, item)
             
                    }>
                    {
                     
                      extension==='pdf' || extension.includes('.pdf') === 'pdf' ? (
                        <Pdf />
                      ) : extension==='doc' || extension.includes('.doc') === 'doc' ? (
                        <Doc />
                      ) : extension==='doc' || extension.includes('.xlsx')  === 'xlsx' ? (
                        <Xlsx />
                      ) : extension==='pptx' || extension.includes('.pptx') === 'pptx' ? (
                        <Pptx />
                      ) : extension==='mp4' || extension.includes('.mp4')  === 'mp4' ? (
                        <Mp4 />
                      ) : (
                        <Img />
                      )
                    }

                    <Text
                      numberOfLines={1}
                      style={[
                        appStyle.BoxHeading,
                        {
                          fontWeight: '400',
                          fontSize: 13,
                          borderStyle: 'dotted',
                        },
                      ]}>
                      {item.file_name && item.file_name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              numColumns={3}
            />
          ) : null}
        </View>
        <Text
          style={[
            appStyle.H6,
            {color: 'black', marginTop: heightToDp('0'),marginBottom:heightToDp(
              0.2
            )},
          ]}>
          {data.field_name}
        </Text>
      </>
    );
  };
  const renderFoter = () => {
    return (
      <TouchableOpacity
        onPress={() => setpopshow(true)}
        style={[
          appStyle.borderShadow,
          {
            alignItems: 'center',
            width: widthToDp('24'),
            height: heightToDp('12'),
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            margin: heightToDp('1'),
            borderRadius: 15,
            padding: 10,
          },
        ]}>
        <Image
          source={require('../Assets/addImage512w.png')}
          style={[
            appStyle.centrailView,
            {width: widthToDp('8'), height: heightToDp('4')},
          ]}
        />
      </TouchableOpacity>
    );
  };
  const renderUpload = data => {
    //  console.log('hdhdhd',item.field_name, item.reference_files[0].document_url,item);
    return (
      <View style={{marginTop: heightToDp('1'),marginHorizontal:widthToDp('3')}}>
        <Text style={{color: '#919EAB'}}>Upload files / images</Text>

        <View style={{flex: 0.5, marginTop: heightToDp('0.5')}}>
          {data.fm_file_urls.length > 0 ? (
            <FlatList
              data={data.fm_file_urls}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(items, index) => String(index)}
              // ListFooterComponent={renderFoter()}
              renderItem={({item, index}) => {
                const extension = item.url.split('.').pop();

                return (
                  <TouchableOpacity
                    style={[
                      appStyle.borderShadow,
                      {
                        alignItems: 'center',
                        width: widthToDp('27'),
                        height: heightToDp('14'),
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: heightToDp('1'),
                        borderRadius: 15,
                        padding: 10,
                      },
                    ]}
                    onPress={
                   
                      () => fileOpening(item.url, item)
                    }>
                  
                    {extension === 'pdf' ? (
                      <Pdf />
                    ) : extension === 'doc' ? (
                      <Doc />
                    ) : extension === 'xlsx' ? (
                      <Xlsx />
                    ) : extension === 'pptx' ? (
                      <Pptx />
                    ) : extension === 'mp4' ? (
                      <Mp4 />
                    ) : (
                      <Img />
                    )}

                    <Text
                      numberOfLines={1}
                      style={[
                        appStyle.BoxHeading,
                        {
                          fontWeight: '400',
                          fontSize: 13,
                          borderStyle: 'dotted',
                        },
                      ]}>
                      {item.name && item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              numColumns={3}
            />
          ) : null}
          {renderFoter()}
        </View>
      </View>
    );
  };

  const updateAnswer = item => {
    setInput(MntReduxState.field_entries[item].input_value);
    setchkLstNo(item);
    if (chkLstNoMax < item) {
      setchkLstNoMax(item);
    }
  };
  const goBacks = () => {
    navigation.goBack();
    //  dispatch(getProcesslineData(access_token));
    dispatch(EquipmentAllDetail(access_token, route.params?.EqId));
    dispatch(getEquipmentData(access_token, 1, ''));
  };
  const complete = item => {
    dispatch(
      ComplteAnswer(
        access_token,
        chkLstNo,
        input,
        item,
        x => setInput(x),
        x => setchkLstNo(x),
        x => setchkLstNoMax(x),
        x => setFull(x),
        () => goBacks(),
      ),
    );
  };

  const goBack = () => {
    setchkLstNo(MntReduxState.field_entries.length - 1);
    setchkLstNoMax(MntReduxState.field_entries.length - 1);

    setInput(
      MntReduxState.field_entries[MntReduxState.field_entries.length - 1]
        .input_value,
    );
    setFull(0);
  };

  const renderTextInput = item => {
    return (
      <View style={{margin: widthToDp('3'), flex: 1}}>
        {renderInstruction(item)}
        <TextInput
          multiline={true}
          value={input}
          onChangeText={text => setInput(text)}
          style={{
            borderWidth: 0.5,
            borderColor: 'rgba(145, 158, 171, 0.32)',
            height: heightToDp('25'),
            borderRadius: 20,
            padding: 10,
            textAlignVertical: 'top',
            paddingVertical: 10,
          }}
        />
      </View>
    );
  };
  const renderNumberInput = item => {
    return (
      <View style={{margin: widthToDp('3'), flex: 1}}>
        {renderInstruction(item)}
        <View
          style={{
            borderWidth: 0.3,
            borderColor: 'gray',
            height: heightToDp('7'),
            borderRadius: 20,
            padding: 10,
            textAlignVertical: 'top',
            paddingVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TextInput
            placeholder="Enter"
            keyboardType="numeric"
            value={input}
            onChangeText={text => setInput(text)}
            style={{
              height: heightToDp('6'),

              width: '78%',
            }}
          />
          <Text style={{color: 'grey'}}>{item.uom}</Text>
        </View>
      </View>
    );
  };
  const renderDropdown = item => {
    var data = item.list_options.split(',');
    return (
      <View style={{marginHorizontal: 15, marginTop: heightToDp('0')}}>
        {renderInstruction(item)}
        {/* <Options /> */}

        {data.map((item, index) => {
          return (
            
            <TouchableOpacity
              onPress={() => setInput(item)}
              style={[
                appStyle.borderShadow,
                {
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  height: heightToDp('8'),
                  marginTop: index==0?heightToDp('0.5'):heightToDp('1.5'),
                  marginBottom:index==data.length-1?heightToDp('1'):null,
                  width: '100%',
                  borderRadius: 22,
                },
              ]}>
              <View
                style={{flex: 1, backgroundColor: 'white', borderRadius: 20}}>
                <View
                  style={[
                    appStyle.centrailView,
                    {
                      // width: '40%',
                      // height: '45%',
                      width:'45%',
                      height:'45%',
                      borderRadius: widthToDp('70'),
                      borderColor: 'gray',
                      borderWidth: 1,
                    },
                  ]}>
                  {item == input && (
                    <Image
                      source={require('../Assets/tick1x.png')}
                      style={[
                        {
                          resizeMode: 'contain',
                          marginLeft: 'auto',
                          marginRight: 'auto',
                          marginTop: 'auto',
                          marginBottom: 'auto',
                        },
                      ]}
                    />
                  )}
                </View>
              </View>
              <View style={{flex: 4}}>
                <Text
                  style={[
                    appStyle.SubTitle1,
                    {marginTop: 'auto', marginBottom: 'auto'},
                  ]}>
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}

      
      </View>
    );
  };
  const renderDate = item => {
    var x;
    if (input != '' && input && input != null && input != undefined) {
      var x = moment(input).format('YYYY-MM-DD');
    } else {
      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      x = year + '-0' + month + '-' + date;
    }

    return (
      <View style={{margin: widthToDp('3'), flex: 1}}>
        {renderInstruction(item)}
        <TouchableOpacity
          onPress={() => setOpen(true)}
          style={[
            appStyle.borderShadow,
            {
              flexDirection: 'row',
              backgroundColor: 'white',
              height: heightToDp('8'),
           
              width: '100%',
              borderRadius: 22,
              marginVertical: heightToDp('1'),
              alignItems: 'center',
            },
          ]}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              marginLeft: widthToDp('6'),
            }}>
            <Icon name="calendar-today" size={30} color="black" />
          </View>
          <View style={{flex: 4}}>
            <Text
              style={[
                appStyle.SubTitle1,
                {marginTop: 'auto', marginBottom: 'auto'},
              ]}>
              {input ? moment(input).format('YYYY-MM-DD') : 'Select Date'}
            </Text>
          </View>
        </TouchableOpacity>
        <DatePicker
          modal
          mode="date"
          open={open}
          date={new Date(x)}
          onConfirm={date => {
            console.log(date, 'ddddd', x, input);
            setInput(date);
            setOpen(false);
          }}
          onCancel={date => {
            setOpen(false);
            console.log(date, 'ddddd', x, input);
          }}
        />
      </View>
    );
  };

  const renderBool = item => {
    return (
      <View style={{flex: 1, margin: heightToDp('1')}}>
        {renderInstruction(item)}
        <TouchableOpacity
          onPress={() => setInput('Yes')}
          style={[
            appStyle.borderShadow,
            {
              flexDirection: 'row',
              backgroundColor: 'white',
              height: heightToDp('8'),
              marginTop: heightToDp('2'),
              width: '100%',
              borderRadius: 22,
              marginVertical: heightToDp('1'),
            },
          ]}>
          <View style={{flex: 1, backgroundColor: 'white', borderRadius: 20}}>
            <View
              style={[
                appStyle.centrailView,
                {
                  width: '40%',
                  height: '40%',
                  borderRadius: 50,
                  borderColor: 'gray',
                  borderWidth: 1,
                },
              ]}>
              {input == 'Yes' && (
                <Image
                  source={require('../Assets/tick1x.png')}
                  style={[
                    {
                      resizeMode: 'contain',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      marginTop: 'auto',
                      marginBottom: 'auto',
                    },
                  ]}
                />
              )}
            </View>
          </View>
          <View style={{flex: 4}}>
            <Text
              style={[
                appStyle.SubTitle1,
                {marginTop: 'auto', marginBottom: 'auto'},
              ]}>
              Yes
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setInput('No')}
          style={[
            appStyle.borderShadow,
            {
              flexDirection: 'row',
              backgroundColor: 'white',
              height: heightToDp('8'),
              marginTop: heightToDp('2'),
              width: '100%',
              borderRadius: 22,
              marginVertical: heightToDp('1'),
            },
          ]}>
          <View style={{flex: 1, backgroundColor: 'white', borderRadius: 20}}>
            <View
              style={[
                appStyle.centrailView,
                {
                  width: '40%',
                  height: '40%',
                  borderRadius: 50,
                  borderColor: 'gray',
                  borderWidth: 1,
                },
              ]}>
              {input == 'No' && (
                <Image
                  source={require('../Assets/tick1x.png')}
                  style={[
                    {
                      resizeMode: 'contain',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      marginTop: 'auto',
                      marginBottom: 'auto',
                    },
                  ]}
                />
              )}
            </View>
          </View>
          <View style={{flex: 4}}>
            <Text
              style={[
                appStyle.SubTitle1,
                {marginTop: 'auto', marginBottom: 'auto'},
              ]}>
              No
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const renderFeedBack = item => {
    return (
      <View style={{flex: 1, margin: heightToDp('2')}}>
        <View style={{flex: 1}}>
          <Text
            style={[
              appStyle.H6,
              {color: 'black', marginVertical: heightToDp('2')},
            ]}>
            {'How would you rate the equipment?'}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setInput(1)}
          style={[
            appStyle.borderShadow,
            {
              flexDirection: 'row',
              backgroundColor: '#E9FCD4',
              height: heightToDp('8'),
              marginTop: heightToDp('2'),
              width: '100%',
              borderRadius: 22,
              marginVertical: heightToDp('1'),
            },
          ]}>
          <View style={{flex: 1, backgroundColor: '#E9FCD4', borderRadius: 20}}>
            <View
              style={[
                appStyle.centrailView,
                {
                  width: '40%',
                  height: '40%',
                  borderRadius: 50,
                  borderColor: 'gray',
                  borderWidth: 1,
                  backgroundColor: 'white',
                },
              ]}>
              {input == 1 && (
                <Image
                  source={require('../Assets/tick1x.png')}
                  style={[
                    {
                      resizeMode: 'contain',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      marginTop: 'auto',
                      marginBottom: 'auto',
                    },
                  ]}
                />
              )}
            </View>
          </View>
          <View style={{flex: 4}}>
            <Text
              style={[
                appStyle.SubTitle1,
                {marginTop: 'auto', marginBottom: 'auto', color: '#229A16'},
              ]}>
              Performing well
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setInput(2)}
          style={[
            appStyle.borderShadow,
            {
              flexDirection: 'row',
              backgroundColor: '#FFF7CD',
              height: heightToDp('8'),
              marginTop: heightToDp('2'),
              width: '100%',
              borderRadius: 22,
              marginVertical: heightToDp('1'),
            },
          ]}>
          <View style={{flex: 1, backgroundColor: '#FFF7CD', borderRadius: 20}}>
            <View
              style={[
                appStyle.centrailView,
                {
                  width: '40%',
                  height: '40%',
                  borderRadius: 50,
                  borderColor: 'gray',
                  borderWidth: 1,
                  backgroundColor: 'white',
                },
              ]}>
              {input == 2 && (
                <Image
                  source={require('../Assets/tick1x.png')}
                  style={[
                    {
                      resizeMode: 'contain',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      marginTop: 'auto',
                      marginBottom: 'auto',
                    },
                  ]}
                />
              )}
            </View>
          </View>
          <View style={{flex: 4}}>
            <Text
              style={[
                appStyle.SubTitle1,
                {marginTop: 'auto', marginBottom: 'auto', color: '#DD9C1D'},
              ]}>
              Minor Concern
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setInput(3)}
          style={[
            appStyle.borderShadow,
            {
              flexDirection: 'row',
              backgroundColor: '#FFE7D9',
              height: heightToDp('8'),
              marginTop: heightToDp('2'),
              width: '100%',
              borderRadius: 22,
              marginVertical: heightToDp('1'),
            },
          ]}>
          <View style={{flex: 1, backgroundColor: '#FFE7D9', borderRadius: 20}}>
            <View
              style={[
                appStyle.centrailView,
                {
                  width: '40%',
                  height: '40%',
                  borderRadius: 50,
                  borderColor: 'gray',
                  borderWidth: 1,
                  backgroundColor: 'white',
                },
              ]}>
              {input == 3 && (
                <Image
                  source={require('../Assets/tick1x.png')}
                  style={[
                    {
                      resizeMode: 'contain',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      marginTop: 'auto',
                      marginBottom: 'auto',
                    },
                  ]}
                />
              )}
            </View>
          </View>
          <View style={{flex: 4}}>
            <Text
              style={[
                appStyle.SubTitle1,
                {marginTop: 'auto', marginBottom: 'auto', color: '#B72136'},
              ]}>
              Major Concern
            </Text>
          </View>
        </TouchableOpacity>
        <Text
          style={[
            appStyle.H6,
            {color: 'black', marginVertical: heightToDp('2')},
          ]}>
          {'Additional Remarks'}
        </Text>
        {Alert && (
          <Text style={{color: 'red', marginBottom: heightToDp('2')}}>
            {'Enter remarks'}
          </Text>
        )}
        <TextInput
          multiline={true}
          value={remark}
          onChangeText={text => setRemark(text)}
          style={{
            borderWidth: 0.3,
            borderColor: 'gray',
            height: heightToDp('25'),
            borderRadius: 20,
            padding: 10,
            textAlignVertical: 'top',
            paddingVertical: 10,
          }}
        />
      </View>
    );
  };

  const renderQuestion = () => {
    console.log("+-----+",MntReduxState.field_entries[chkLstNo].input_type,"render Questions")
    if (MntReduxState.field_entries[chkLstNo].input_type == 1) {
      return renderTextInput(MntReduxState.field_entries[chkLstNo]);
    } else if (MntReduxState.field_entries[chkLstNo].input_type == 2) {
      return renderNumberInput(MntReduxState.field_entries[chkLstNo]);
    } else if (MntReduxState.field_entries[chkLstNo].input_type == 3) {
      return renderDropdown(MntReduxState.field_entries[chkLstNo]);
    } else if (MntReduxState.field_entries[chkLstNo].input_type == 4) {
      return renderDate(MntReduxState.field_entries[chkLstNo]);
    } else if (MntReduxState.field_entries[chkLstNo].input_type == 5) {
      return renderBool(MntReduxState.field_entries[chkLstNo]);
    }
  };
  return (
    <View style={component.container}>
      {MntReduxState != '' ? (
        <MaintenanceTop
          data={MntReduxState}
          Eqname={route.params?.Eqname}
          dsrc={route.params?.dsrc}
          full={full}
          steps={chkLstNo}
          maxsteps={chkLstNoMax}
          totalSteps={MntReduxState.field_entries.length}
          updateChkLst={item => setchkLstNo(item)}
        />
      ) : (
        <View style={{minHeight: heightToDp('24')}}>
          <ActivityIndicator size="large" color='#132D4B' />
        </View>
      )}
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderTopRightRadius: bdRad,
          borderTopLeftRadius: bdRad,
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            marginHorizontal: widthToDp('4'),
            borderTopRightRadius: widthToDp('7'),
            borderTopLeftRadius: widthToDp('7'),
            marginTop: widthToDp('4'),
          }}
          //Part 2
        >
          {MntReduxState &&
          MntReduxState.field_entries &&
          MntReduxState.field_entries.length > 0 ? (
            <>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{marginBottom: heightToDp('12')}}>
                  {full == 1 ? (
                    <>{renderFeedBack()}</>
                  ) : (
                    <>
                      {renderQuestion()}
                      {MntReduxState.field_entries[chkLstNo]
                        .field_description &&
                        Alert && (
                          <Text style={{color: 'red', margin: widthToDp('3')}}>
                            {'The above field is required and need to fill'}
                          </Text>
                        )}
                      {renderUpload(MntReduxState.field_entries[chkLstNo])}
                    </>
                  )}
                </View>
              </ScrollView>
              <BottomSaveComponent
                full={full}
                input={input}
                remark={remark}
                navigation={navigation}
                steps={chkLstNo}
                goBack={() => goBack()}
                complete={item => complete(item)}
                totalSteps={MntReduxState.field_entries.length}
                saveAnswer={item => saveAnswer(item)}
                updateChkLst={item => updateAnswer(item)}
                showAlert={item => setShowAlert(item)}
              />
            </>
          ) : (
            <View
              style={{
                flex: 1,
                margin: heightToDp('3'),
                justifyContent: 'center',
              }}>
              <ActivityIndicator size="large" color="#132D4B" />
            </View>
          )}
        </View>
      </View>
      <Overlay
        animationType="slide"
        onRequestClose={() => {
          setpopshow(false);
        }}
        isVisible={popshow}
        // isVisible={true}
        windowBackgroundColor={'rgba(0, 0, 0, 0.6)'}
        containerStyle={{
          marginBottom: 200,
          borderRadius: 10,
        }}
        fullScreen
        transparent
        overlayStyle={[
          {
            padding: 0,
            marginTop: heightToDp('100'),
            width: '100%',
            height: '55.00%', //Platform.OS==='ios'?'15.88%':'13.88%',
            borderRadius: 10,
            overflow: 'hidden',
            elevation: 10,
          },
        ]}>
        {/* <ScrollView bounces={false}> */}
        <View style={{marginTop: heightToDp('4'),marginBottom:heightToDp('0'),marginHorizontal:widthToDp('6')}}>

          <View style={{flexDirection:'row'}} >
          <Text style={[appStyle.H5Text,{marginBottom:heightToDp('1'),fontSize:widthToDp('4.5')}]} >Take a Picture or upload</Text>
       
              <TouchableOpacity
                style={{marginLeft:'auto',marginRight:widthToDp('0')}}
                        onPress={() =>setpopshow(false)} 
              >
   
              <Image
                resizeMode="contain"
                source={CloseImage}
                style={{width: widthToDp('8'), height: heightToDp('4'),marginLeft:widthToDp('26')}}
              
            
              />
              </TouchableOpacity>

          </View>



<View
  style={{
    flexDirection: 'row',
    justifyContent: 'space-around',
  
  }}>
 
     <TouchableOpacity style={component.ImageStyle} onPress={()=> openCamera()}>
    <AddImage/>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => uploadDocuments()}
    style={[component.ImageStyle]}>
    <AddFile />
  </TouchableOpacity>

</View>
</View> 
      
        {/* </ScrollView> */}
      </Overlay>

    
    </View>
  );
};

export default MaintenanceDetails;

export const component = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: styles.centralColor,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 0,

    elevation: 1,
  },
  ImageStyle: [
    appStyle.homeShadow,

    {
      backgroundColor: 'white',
      height: heightToDp('10'),
      // width: widthToDp('44'),
      flex:1,
      margin:widthToDp('2.5'),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
    },
  ],
});

//  <WebView
//  source={{
//    uri: `https://drive.google.com/viewerng/viewer?embedded=true&url=${file}`
//    // uri:'https://drive.google.com/viewerng/viewer?embedded=true&url=https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.doc'

//  }}
//  style={{ marginTop: 0 }}
// />
//     <View style={{flex:1,paddingVertical:heightToDp('5')}}>
//     <StatusBar animated={true} backgroundColor={styles.centralColor} barStyle="light-content" />
//     <Icon name='close' style={{position:'absolute',top:'2%',left:'2%'}} onPress={()=>showWebView(false)} />
//     <WebView
//   source={{
//     uri: 'https://drive.google.com/viewerng/viewer?embedded=true&url=www.appsloveworld.com/wp-content/uploads/2020/01/SAMPLE_42mb_76_Pages.pdf'
//     // uri:'https://drive.google.com/viewerng/viewer?embedded=true&url=https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.doc'

//   }}
//   style={{ marginTop: 0 }}
// />
//            <WebView
//              source={{uri:file}}
//              originWhitelist={['*']}
//              startInLoadingState={true}
//              renderLoading={() => (
//                <ActivityIndicator
//                  color={'red'}
//                  size="large"
//                  style={{
//                    position: 'absolute',
//                    width: '100%',
//                    height: '100%',
//                    backgroundColor: 'white',
//                    alignSelf: 'center',
//                    justifyContent: 'center',
//                    top: 0,
//                    left: 0,
//                    right: 0,
//                    bottom: 0,
//                    zIndex: 10,
//                    elevation: 1000,
//                  }}
//                />
//              )}
//            />
//      </View>
// {/* <View style={{alignItems: 'center', justifyContent: 'center'}}>
// <View
//   style={{
//     backgroundColor: '#fff',
//     width: '100%',
//     alignItems: 'center',
//     justifyContent: 'center',
//     alignSelf: 'center',
//   }}>
//   <View
//     style={{
//       width: '20%',
//       height: 5,

//       backgroundColor: 'lightgrey',
//       marginTop: heightToDp('0'),
//       borderRadius: 10,
//     }}
//   />

//   <View
//     style={{
//       width: '100%',
//       height: 1,

//       flexDirection: 'row',
//       marginTop: heightToDp('2'),
//     }}
//   />
//   <Text
//     allowFontScaling={false}
//     style={{
//       padding: Platform.OS === 'ios' ? 15 : 10,
//       flex: 1,

//       color: 'grey',
//     }}>
//     Upload files / images
//   </Text>
//   <TouchableOpacity
//     onPress={() => setpopshow(false)}
//     style={[
//       appStyle.borderShadow,
//       {
//         alignItems: 'center',
//         width: widthToDp('10'),
//         height: widthToDp('10'),
//         backgroundColor: 'white',
//         justifyContent: 'center',
//         alignItems: 'center',
//         margin: heightToDp('5'),
//         borderRadius: 35,
//         padding: 10,
//       },
//     ]}>
//     {/* <Icon2
//           name="cross"
//           size={heightToDp('5.5')}
//           color="black"
//         /> */}
//     <Image source={require('../../Icon/icons/close.png')} />
//   </TouchableOpacity>

//   <View
//     style={{
//       width: '100%',
//       height: 1,

//       flexDirection: 'row',
//       marginTop: heightToDp('3'),
//     }}
//   />
//   <View
//     style={{
//       flexDirection: 'row',
//       justifyContent: 'center',
//       flex: 1,
//       width: '100%',
//     }}>
//     <TouchableOpacity
//       onPress={() => uploadDocuments()}
//       style={[
//         appStyle.borderShadow,
//         {
//           alignItems: 'center',
//           width: widthToDp('24'),
//           height: heightToDp('12'),
//           backgroundColor: 'white',
//           justifyContent: 'center',
//           alignItems: 'center',
//           margin: heightToDp('2'),
//           borderRadius: 15,
//           padding: 10,
//         },
//       ]}>
//       <Image
//         source={require('../Assets/addImage512w.png')}
//         style={[
//           appStyle.centrailView,
//           {width: widthToDp('8'), height: heightToDp('4')},
//         ]}
//       />
//     </TouchableOpacity>
//     <View
//       style={{
//         height: '100%',
//         width: 1,
//       }}
//     />
//     <TouchableOpacity
//       onPress={() => openCamera()}
//       style={[
//         appStyle.borderShadow,
//         {
//           alignItems: 'center',
//           width: widthToDp('24'),
//           height: heightToDp('12'),
//           backgroundColor: 'white',
//           justifyContent: 'center',
//           alignItems: 'center',
//           margin: heightToDp('2'),
//           borderRadius: 15,
//           padding: 10,
//         },
//       ]}>
//       {Platform.OS === 'android' ? (
//         <Image
//           source={require('../../Icon/icons/camera.png')}
//           style={[
//             appStyle.centrailView,
//             {width: widthToDp('8'), height: heightToDp('4')},
//           ]}
//         />
//       ) : (
//         <Icon3
//           name="camera"
//           size={heightToDp('3.5')}
//           color="#FFAB5A"
//         />
//       )}

//       {/* <Icon3
//           name="camera"
//           size={heightToDp('3.5')}
//           color="#FFAB5A"
//         /> */}
//     </TouchableOpacity>
//   </View>
// </View>
// </View> */}