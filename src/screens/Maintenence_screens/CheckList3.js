import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {heightToDp, widthToDp} from '../../responsive';
import {appStyle} from '../../styles/styles';
import MaintenanceTop from '../components/MaintenenceTop';
import {component} from './CheckList1';
import WebView from 'react-native-webview';
import BottomSaveComponent from '../components/BottomSaveComponent';
import Options from '../components/Options';

const CheckList3 = ({navigation}) => {
  // console.log('welcome');

  return (
    <View style={component.container}>
      <MaintenanceTop />

      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          marginHorizontal: widthToDp('0'),
        }}>
        <View style={{marginHorizontal: 15, marginTop: heightToDp('2')}}>
          <Text style={[appStyle.H6, {color: 'black'}]}>
            What is the color of the vacuum gauge?
          </Text>
          <Options />

          <View
            style={[
              appStyle.borderShadow,
              {
                flexDirection: 'row',
                backgroundColor: 'white',
                height: heightToDp('8'),
                marginTop: heightToDp('2'),
                width: '100%',
              },
            ]}>
            <View style={{flex: 1, backgroundColor: 'white', borderRadius: 20}}>
              <View
                style={[
                  appStyle.centrailView,
                  {
                    width: '40%',
                    height: '45%',
                    borderRadius: 50,
                    borderColor: 'gray',
                    borderWidth: 1,
                  },
                ]}>
                {/* <Image

                                source={require('../Assets/tick1x.png')}
                                style={[{resizeMode:'contain',marginLeft:'auto',marginRight:'auto',marginTop:'auto',marginBottom:'auto'}]}
/> */}
              </View>
            </View>
            <View style={{flex: 4}}>
              <Text
                style={[
                  appStyle.SubTitle1,
                  {marginTop: 'auto', marginBottom: 'auto'},
                ]}>
                White
              </Text>
            </View>
          </View>

          <View
            style={[
              appStyle.borderShadow,
              {
                flexDirection: 'row',
                backgroundColor: 'white',
                height: heightToDp('8'),
                marginTop: heightToDp('2'),
                width: '100%',
              },
            ]}>
            <View style={{flex: 1, backgroundColor: 'white', borderRadius: 20}}>
              <View
                style={[
                  appStyle.centrailView,
                  {
                    width: '40%',
                    height: '45%',
                    borderRadius: 50,
                    borderColor: 'gray',
                    borderWidth: 1,
                  },
                ]}>
                {/* <Image

                                source={require('../Assets/tick1x.png')}
                                style={[{resizeMode:'contain',marginLeft:'auto',marginRight:'auto',marginTop:'auto',marginBottom:'auto'}]}
/> */}
              </View>
            </View>
            <View style={{flex: 4}}>
              <Text
                style={[
                  appStyle.SubTitle1,
                  {marginTop: 'auto', marginBottom: 'auto'},
                ]}>
                Orange
              </Text>
            </View>
          </View>

          <View
            style={[
              appStyle.borderShadow,
              {
                flexDirection: 'row',
                backgroundColor: 'white',
                height: heightToDp('8'),
                marginTop: heightToDp('2'),
                width: '100%',
              },
            ]}>
            <View style={{flex: 1, backgroundColor: 'white', borderRadius: 20}}>
              <View
                style={[
                  appStyle.centrailView,
                  {
                    width: '40%',
                    height: '45%',
                    borderRadius: 50,
                    borderColor: 'gray',
                    borderWidth: 1,
                  },
                ]}>
                {/* <Image

                                source={require('../Assets/tick1x.png')}
                                style={[{resizeMode:'contain',marginLeft:'auto',marginRight:'auto',marginTop:'auto',marginBottom:'auto'}]}
/> */}
              </View>
            </View>
            <View style={{flex: 4}}>
              <Text
                style={[
                  appStyle.SubTitle1,
                  {marginTop: 'auto', marginBottom: 'auto'},
                ]}>
                Red
              </Text>
            </View>
          </View>
          <View style={[{margin: widthToDp('2'), marginTop: heightToDp('3')}]}>
            <Text style={[appStyle.caption]}>Upload files/Images</Text>
            <View
              style={[
                appStyle.buttonShadow,
                {
                  width: widthToDp('87'),
                  height: heightToDp('11'),
                  backgroundColor: 'white',
                  borderRadius: 20,
                },
              ]}>
              <Image
                source={require('../Assets/addImage512w.png')}
                style={[
                  appStyle.centrailView,
                  {width: widthToDp('8'), height: heightToDp('4')},
                ]}
              />
            </View>
          </View>
        </View>

        <BottomSaveComponent nextScreen="CheckList2" />

        {/* <BottomSaveComponent/> */}
      </View>
    </View>
  );
};

export default CheckList3;
