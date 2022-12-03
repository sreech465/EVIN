import React, { Component } from 'react'
import { Text, View,TouchableOpacity,Image ,ActivityIndicator, TextInput} from 'react-native'
import { heightToDp, widthToDp } from '../../responsive';
import { appStyle } from '../../styles/styles';
import MaintenanceTop from '../components/MaintenenceTop';
import { component } from './CheckList1';
import WebView from 'react-native-webview';
import BottomSaveComponent from '../components/BottomSaveComponent';







const CheckList2=({navigation})=> {
 
  
    return (
        <View style={component.container}>
            <MaintenanceTop/>
          
            <View style={{flex:1,backgroundColor:'white',marginHorizontal:widthToDp('2')}} >

                <View style={{margin:widthToDp('3'),flex:1}} >
                    <Text style={[appStyle.H6,{color:'black',fontSize:16}]} >Describe the state of the vacuum gauge?</Text>
                    <TextInput
                    placeholder='Enter'
                    style={{borderWidth:0.3,borderColor:'gray',height:heightToDp('41'),borderRadius:20}}
                   
                
                    
                    
                    />
                     <View style={[{margin:widthToDp('2'),}]} >
                        <Text style={[appStyle.caption]}>
                            Upload files/Images
                        </Text>
                        <View style={[appStyle.buttonShadow,{width:widthToDp('87'),height:heightToDp('11'),backgroundColor:'white',borderRadius:20}]} >
                            <Image
                            source={require('../Assets/addImage512w.png')}
                            style={[appStyle.centrailView,{width:widthToDp('8'),height:heightToDp('4')}]}
                            />

                        </View>
                     </View>

                </View>
           

         
            <BottomSaveComponent  nextScreen='CheckList3' />
            </View>
        </View>
        
    
    )
  
}

export default CheckList2
   {/* <WebView
                                // style={{
                                //     flex: 1,
                                //     backgroundColor: 'white',
                                //     width: '100%',
                                //     height: 100,
                                //     justifyContent: 'center', alignItems: 'center'
                                // }}
                                source={{ uri: 'https://portalenablingwindiag.blob.core.windows.net/enabling-storage/multiple_S_01062022-130859.doc', }}
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                startInLoadingState={true}
                                renderLoading={() => (
                                    <ActivityIndicator
                                        color='green'
                                        size='large'
                                      //   style={
                                      //     {
                                      //       // position: 'absolute',
                                      //       // width: '100%',
                                      //       // height: '100%',
                                      //       // backgroundColor: 'white',
                                      //       // alignSelf: 'center',
                                      //       // justifyContent: 'center',
                                      //       // top: 0,
                                      //       // left: 0,
                                      //       // right: 0,
                                      //       // bottom: 0,
                                      //       // zIndex: 10,
                                      //       // elevation: 1000,
                                      //   }
                                      // }
                                    />
                                )}
                            />  */}