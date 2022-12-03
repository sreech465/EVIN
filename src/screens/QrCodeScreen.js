
import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Platform,TouchableOpacity,Alert, SafeAreaView, StatusBar
} from 'react-native';
import WebView from 'react-native-webview';
import {heightToDp, widthToDp} from '../responsive';
import BackButon from './components/BackButon';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import {ScanQrCode} from '../redux/EquipmentDetail/action';
import {useDispatch, useSelector} from 'react-redux';
import Equipment from './components/Equipment';
import { appStyle, styles } from '../styles/styles';

export const QrCodeScreen = ({navigation}) => {


  const dispatch = useDispatch();
  const access_token = useSelector(
    state => state.LoginReducer.data.access_token,
  );

  onFail=(x)=>{
    Alert.alert(
      x,
      [
        {
          text: "Ok",
          onPress: () => navigation.goBack(),
        },
   
      ]
    );
  }
 
  onSuccess = e => {
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', 3)
    // );
    console.log('An error occured', e.data,e)
    dispatch(ScanQrCode(access_token,e.data,() => navigation.navigate('EquipmentDetails', {})
    
    ,
    
    (x)=> {
      console.log(x)
      Alert.alert('No EQUIPMENT FOUND')
     
    
    
    
    
    }
    )
    )
   
  };

  // console.log(url,name)

  

  return   (
    <SafeAreaView style={{  flex: 1,
      backgroundColor:styles.centralColor,

      }}
    > 
    
  



     <View
        style={{
         
       height:heightToDp('9'),
       
          backgroundColor:styles.centralColor,
         

        }}>
  
          <View style={{marginHorizontal:widthToDp('5'),flexDirection:'row'}} >
          <BackButon navigation={() => navigation.goBack()} />
          <Text style={[appStyle.body1,{marginLeft:widthToDp('5'),color:'white',marginTop:'auto'}]} >{'Scan Qr Code'}</Text>

          </View>

      </View>
      {/* <View
        style={{
          position: 'absolute',
          zIndex: 100,
          left: '7%',
          top: Platform.OS == 'android' ? '0.8%' : '4%',
        }}>
        <BackButon navigation={() => navigation.goBack()} />
      </View> */}

      <QRCodeScanner
     cameraStyle={{height:'100%'}}
      
      containerStyle={{opacity:0.8}}
      markerStyle={{borderWidth:1.5,borderStyle:"dashed"}}
        onRead={this.onSuccess}
        showMarker={true}
     
        //flashMode={RNCamera.Constants.FlashMode.torch}
  
    
      />
    
    
    </SafeAreaView>
  );
};

export default QrCodeScreen;
