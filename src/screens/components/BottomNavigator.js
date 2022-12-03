import React from 'react';
import {View, Text, Image, SafeAreaView, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {heightToDp, widthToDp} from '../../responsive';
import {Link} from '@react-navigation/native';
import {Logo} from '../../Icon/Icon';
import { appStyle } from '../../styles/styles';

const BottomNavigation = ({navigation}) => {
  return (
    <View
      style={[{
        width: '100%',
        height: heightToDp('5'),
        backgroundColor: 'white',
        position: 'absolute',
        bottom: heightToDp('0'),
        flexDirection: 'column',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.15,
        shadowRadius: 14.78,
        // elevation:30

        // elevation: 20,
      },appStyle.homeShadow]}>
      <View style={{backgroundColor: 'white', zIndex: -2, bottom: 35}}>
        <Image
          source={require('../Assets/Polygon.png')}
          style={{
            height: 60,
            position: 'absolute',
            alignSelf: 'center',
            zIndex: 10000,
          }}
        />
      </View>

      <Link
        to={{screen: 'Main'}}
        style={{position: 'absolute', alignSelf: 'center', bottom: 20}}>
        <View>
          <Image source={require('../../Icon/icons/logo.png')} />
        </View>
      </Link>
    </View>
  );
};
export default BottomNavigation;
