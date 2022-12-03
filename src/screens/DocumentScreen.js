import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
  Alert,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {heightToDp, widthToDp} from '../responsive';
import {appStyle, bdRad, styles} from '../styles/styles';
import {useSelector} from 'react-redux';
import BackButon from './components/BackButon';
import BottomNavigation from './components/BottomNavigator';
import {Doc, Img, Mp4, Pdf, Pptx, Xlsx} from '../Icon/Icon';

var finalData = {};

const DocumentScreen = ({navigation, route}) => {
  console.log(route);
  const {finalData} = route.params.fnlData;
  console.log(finalData,'====-----')

  const ReduxState = useSelector(state => state);

  const fileOpening = (format, fileName) => {
    const extension = format.split('.').pop();

    const allowExtensions=['doc','docx','ppt','pptx','pdf','png','jpeg','jpg','jpe','mp4','avi','mpeg','xlsx']
    const unsupportedFormat=allowExtensions.find(v=>v===extension)
    console.log(extension)
    if(unsupportedFormat!==undefined){
  
navigation.navigate('FileViewer',{url:format,name:fileName,extension:extension})
    }else{
      Alert.alert(
        "Unsupported format",
        "Can't open in mobile",
        [
          {
            text: "Ok",
          },
     
        ]
      );
  
    }

  
  };

  const renderData = () => {
    return Object.entries(finalData).map(([key, value]) => {
      return (
        <View style={[component.innerView]}>
          <Text style={appStyle.SubTitle1}>{key}</Text>
          {value.map(i => {
            const format =
              ReduxState.EquipmentDetails.EquipmentDetails.data[0].documents[i]
                ?.document_url;
            const formatType = format.slice(format.length - 3, format.length);
            const extension = format.split('.').pop();

            return ReduxState.EquipmentDetails.EquipmentDetails.data[0]
              .documents[i] && format ? (
              <TouchableWithoutFeedback
                onPress={() =>
                  fileOpening(
                    format,
                    ReduxState.EquipmentDetails.EquipmentDetails.data[0]
                      .documents[i].file_name,
                  )
                }>
                <View style={[component.fileView, appStyle.homeShadow]}>
                  <View
                    style={{
                      flex: 2.5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
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
                  </View>
                  <View style={{flex: 10}}>
                    <Text style={appStyle.SubTitle1}>
                      {ReduxState.EquipmentDetails.EquipmentDetails.data[0]
                        .documents[i].file_name === null
                        ? key
                        //  : documents[i].file_name.split('.')[0]}
                            // :"hello"
                           : ReduxState.EquipmentDetails.EquipmentDetails.data[0]
                            .documents[i]
                            .file_name.split('.')[0]}
                       
                      }
                        
                    </Text>
                    <Text style={[appStyle.caption, {color: '#637381'}]}>
                      {
                        ReduxState.EquipmentDetails.EquipmentDetails.data[0]
                          .documents[i]
                          .document_size
                      }
                      kb
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            ) : null;
          })}
        </View>
      );
    });
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        flex: 1,
        backgroundColor: styles.centralColor,
      }}>
      <View
        style={{
          flexDirection: 'row',
          
          marginHorizontal: widthToDp('2'),
        }}>
        <View style={{flex: 1.1, alignItems: 'center',marginTop: Platform.OS=='ios'?   heightToDp('3.7'):heightToDp('0.5')}}>
          <BackButon navigation={() => navigation.goBack()} />
        </View>
        <View style={[{flex: 5}, component.header,{marginTop:Platform.OS==='ios'?heightToDp('5.5'):heightToDp('2')}]}>
          <Text style={[appStyle.H6, {color: '#FFFFFF'}]}>Documents</Text>
          <Text style={[appStyle.body2Text, {color: 'white'}]}>
            {
              ReduxState.EquipmentDetails.EquipmentDetails.data[0]
                .tagged_equipment_name
            }
          </Text>
          <View style={component.headerDetail}>
            <View style={{flex: 1}}>
              <Text style={appStyle.caption}>Serial</Text>
              <Text style={{color: 'white'}}>
                {
                  ReduxState.EquipmentDetails.EquipmentDetails.data[0]
                    .equipment_id
                }
              </Text>
            </View>

            <View style={{flex: 0.5}}>
              <Text style={appStyle.caption}>Model </Text>
              <Text style={{color: 'white'}}>
                {
                  ReduxState.EquipmentDetails.EquipmentDetails.data[0]
                    .model_name
                }
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={component.box2}>
        <ScrollView
          style={{
            marginHorizontal: widthToDp('6'),
            marginTop: widthToDp('3'),
            paddingHorizontal: widthToDp('1.5'),
          }}
          showsVerticalScrollIndicator={false}>
          {console.log(finalData)}
          {finalData &&
          ReduxState.EquipmentDetails.EquipmentDetails.data[0].documents
            .length > 0 &&
          Object.keys(finalData).length > 0 ? (
            <View>{renderData()}</View>
          ) : (
            <View style={{alignItems: 'center', marginTop: heightToDp('16')}}>
              <Text>No documents here </Text>
            </View>
          )}
        </ScrollView>
      </View>

      <BottomNavigation />
    </View>
  );
};
export default DocumentScreen;

const component = StyleSheet.create({
  TopView: {
    flexDirection: 'row',
  },
  header: {
   marginTop:Platform.OS==='android'? heightToDp('1.5'):null,
    marginBottom: heightToDp('3'),
  },
  headerText: {
    fontSize: 18,
    color: 'white',
    // marginBottom:heightToDp('0.5'),
  },
  headerDetail: {
    flexDirection: 'row',
  },
  box2: {
    flex: 1,
    backgroundColor: '#F4F7FF',
    borderTopLeftRadius: bdRad,
    borderTopRightRadius: bdRad,


     paddingBottom:heightToDp('5')

    // borderRadius: 30,
  },
  innerView: {
  
    marginTop: heightToDp('2.5'),
    



    // backgroundColor:'white'
  },
  sectionText: {
    color: 'black',
    fontSize: 14,
    lineHeight: 17.5,
    fontWeight: '700',
  },
  fileView: {
    flexDirection: 'row',
    borderRadius: 16,
    backgroundColor: 'white',
    paddingVertical: heightToDp('1'),

    // shadowColor: '#000',
    marginVertical: 4,
    paddingHorizontal: widthToDp('1.2'),
    // backgroundColor:'red'
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.3,
    // shadowRadius: 4.65,

    // elevation: 8,
  },
  imageStyle: {
    resizeMode: 'contain',
    margin: 1,
  },
  fileName: {
    fontWeight: '700',
    fontSize: 16,
  },
});

{
  /* <WebView
                                style={{
                                    flex: 1,
                                    backgroundColor: 'white',
                                    width: deviceWidth,
                                    height: deviceHeight,
                                    justifyContent: 'center', alignItems: 'center'
                                }}
                                source={{ uri: title, }}
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                startInLoadingState={true}
                                renderLoading={() => (
                                    <ActivityIndicator
                                        color='green'
                                        size='large'
                                        style={{
                                            position: 'absolute',
                                            width: '100%',
                                            height: '100%',
                                            backgroundColor: 'white',
                                            alignSelf: 'center',
                                            justifyContent: 'center',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            zIndex: 10,
                                            elevation: 1000,
                                        }}
                                    />
                                )}
                            /> */
}
{
  /* <View style={component.innerView} >
<Text style={component.sectionText} >Policies</Text>
<TouchableWithoutFeedback onPress={()=>console.log("haiaii")}  >
<View style={component.fileView} >
    <View style={{flex:2.5,alignItems:'center',justifyContent:'center'}} >
        <Image 
        source={require('./Assets/pdf.png')} 
        style={component.imageStyle}
        />

    </View>
    <View style={{flex:10}} >
        <Text style={component.fileName} >Policy resourse</Text>
        <Text style={component.equipmentKey} >1 MB</Text>

</View>


</View>
</TouchableWithoutFeedback>




</View> */
}
