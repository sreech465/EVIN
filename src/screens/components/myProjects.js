import {useNavigation} from '@react-navigation/native';
import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  TouchableOpacity,
  View,
  Image,Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Install, Menu, Project, Search} from '../../Icon/Icon';
import {heightToDp, widthToDp} from '../../responsive';
import {appStyle, styles} from '../../styles/styles';
const MyProjects = (props) => {
  const navigation=useNavigation()

  const{DynamicDataTimelineStatus}=props

  return (
    <View style={{marginTop: heightToDp('4'),marginBottom:0}}>
      <View style={{flexDirection: 'row', marginLeft: widthToDp('2.4')}}>
        <Project style={{alignSelf:'center'}} />
     
        <Text
          style={[
            {
              marginLeft: widthToDp('2'),
           
            },
            appStyle.SubTitle1,
          ]}>
          myProjects
        </Text>
      </View>
  
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: heightToDp('1'),
        }}>
     
        <TouchableOpacity

        onPress={()=>navigation.navigate('ProjectList',{DynamicDataTimelineStatus})}
        style={
          page.IconStyle
        }
          >
          <Menu />
        </TouchableOpacity>
      
      </View>
    </View>
  );
};
export default MyProjects;

export const page = StyleSheet.create({
 
  
  IconStyle: [
    appStyle.homeShadow,

    {
      backgroundColor: 'white',
      height: heightToDp('12'),
      width: widthToDp('80'),
      alignItems:'center',
      justifyContent:'center'
    },
  ]
})


