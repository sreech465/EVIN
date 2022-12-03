import React, {Component} from 'react';
import {Button} from 'react-native';
import {ActivityIndicator} from 'react-native';
import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import WebView from 'react-native-webview';
import {heightToDp, widthToDp} from '../../responsive';
import {appStyle, styles} from '../../styles/styles';
import BottomSaveComponent from '../components/BottomSaveComponent';
import MaintenanceTop from '../components/MaintenenceTop';
import CheckList2 from './CheckList2';

const CheckList1 = ({navigation}) => {
  return (
    <View style={component.container}>
      <MaintenanceTop />

      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}
        //Part 2
      >
        <View style={{flex: 1, margin: heightToDp('3')}}>
          <Text>Intructions</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={[appStyle.BoxHeading, {fontWeight: '400'}]}>
                Ensure the safety of the .Ensure the safety of the machine
              </Text>
            </View>
            <View style={{flex: 0.5}}>
              <View
                style={[
                  {alignItems: 'center', width: '90%', borderRadius: 10},
                ]}>
                <Image
                  source={require('../Assets/Equipment/1.png')}
                  style={{
                    width: widthToDp('18'),
                    height: heightToDp('11'),
                    borderRadius: 20,
                  }}
                />
              </View>
            </View>
          </View>
          <Text
            style={[appStyle.H6, {color: 'black', marginTop: heightToDp('2')}]}>
            Does it show exact pressure in the vacuum gauge???
          </Text>
          <View style={[{flexDirection:'row',borderRadius:20}]} >
            <View style={{flex:0.2}} >
                <Image
                source={require(`../Assets/tick3x.png`)}
                style={{borderWidth:1,resizeMode:'contain'}}
        
                />

            </View>
            <View style={{flex:1,marginTop:'auto',marginBottom:'auto'}} >
                <Text>Yes</Text>

            </View>
            </View>
            <View style={{flexDirection:'row',borderRadius:20}} >
            <View style={{flex:0.2}} >
                <Image
                source={require(`../Assets/tick3x.png`)}
                style={{borderWidth:1,resizeMode:'contain'}}
        
                />

            </View>
            <View style={{flex:1,marginTop:'auto',marginBottom:'auto'}} >
                <Text>Yes</Text>

            </View>
            </View>

          <Text style={[appStyle.caption, {marginBottom: heightToDp('1')}]}>
            Upload files/images
          </Text>
          <View style={{flexDirection: 'row'}}>
            <View
              style={[
                {
                  width: widthToDp('19'),
                  height: heightToDp('10'),
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: 'gray',
                  marginRight: widthToDp('2'),
                },
              ]}>
              <Image
                source={require('../Assets/Equipment/1.png')}
                style={[
                  appStyle.centrailView,
                  {height: '80%', width: '80%', borderRadius: 10},
                ]}
              />
            </View>
            <View
              style={[
                {
                  width: widthToDp('17'),
                  height: heightToDp('10'),
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: 'gray',
                  marginRight: widthToDp('2'),
                },
              ]}>
              <Image
                source={require('../Assets/Equipment/1.png')}
                style={[
                  appStyle.centrailView,
                  {height: '80%', width: '80%', borderRadius: 10},
                ]}
              />
            </View>
          </View>
        </View>
        {/* <View></View> */}
        <BottomSaveComponent
          nextScreen="CheckList2"
          navigation={navigation}
          steps="2"
        />
   
      </View>
    </View>
  );
};
export default CheckList1;

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
});




 
