import React from 'react';

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Install, Menu, Scan, Search} from '../../Icon/Icon';
import {heightToDp, widthToDp} from '../../responsive';
import {appStyle} from '../../styles/styles';
const MyInstallations = ({navigation}) => {
  return (
    <View style={{marginTop: heightToDp('3'),marginBottom:heightToDp('0')}}>
      <View style={{flexDirection: 'row', marginLeft: widthToDp('2.4')}}>
        <Install style={{alignSelf: 'center'}} />

        <Text style={[appStyle.SubTitle1, {marginLeft: widthToDp('2')}]}>
          myInstallations
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: heightToDp('1'),
        }}>
        {/* <TouchableOpacity style={page.ImageStyle}>
          <Search />
        </TouchableOpacity> */}
           <TouchableOpacity style={page.ImageStyle} onPress={()=> navigation.navigate('QrCode')}>
          <Scan />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Menu',{id:'sai'})}
          style={page.ImageStyle}>
          <Menu />
        </TouchableOpacity>
     
      </View>
    </View>
  );
};
export default MyInstallations;

const page = StyleSheet.create({
  ImageStyle: [
    appStyle.homeShadow,

    {
      backgroundColor: 'white',
      height: heightToDp('11'),
      width: widthToDp('40'),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
    },
  ],
});
