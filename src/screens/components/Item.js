import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from 'react-native';
import { TouchableOpacity} from 'react-native-gesture-handler';
import {heightToDp, widthToDp} from '../../responsive';
import {appStyle} from '../../styles/styles';
const Item = props => {
 
  const {
  id
  } = props.item.item;

  const navigation = useNavigation()
  return (

    

    props.item.item!==undefined?
    <TouchableOpacity 
    // onPress={()=>console.log(props.item.item.id)}
    onPress={() => navigation.navigate('ProcessLineDetail', {id})}
   
  
   
   >
   


       <View style={[styles.row]}>
        <View style={{width: widthToDp('28')}}>
          <Image
            source={{
              uri: props.item.item.primary_product_details
                ?.primary_product_image,
            }}
            style={[styles.imageStyle,appStyle.centrailView]}
          />
        </View>

        <View style={{marginVertical: widthToDp('6'), width: widthToDp('53')}}>
            <Text style={[appStyle.SubTitle1,{color:'#202727'}]}>
              {props.item.item.name}{' '}
            </Text>
         

          <View style={{flexDirection: 'row', marginTop: widthToDp('1.5'),marginLeft:widthToDp('1')}}>
            <Text
              style={[
               appStyle.body2Text,{color:'#202727'}
              ]}>
              {props.item.item.line_capacity}
              
              
              {' ' + 'Kg/hr'}
            </Text>
            <Text
              style={[
                {color: '#202727', marginLeft: widthToDp('16')},
                appStyle.body2Text,
              ]}>
              {props.item.item.org_location_name}
            </Text>
          </View>
        </View>
      </View> 
    </TouchableOpacity>:<View><Text>wait</Text></View>
  );
};
export default Item;
const styles = StyleSheet.create({
  imageStyle: {
    width: widthToDp('18'),
    resizeMode: 'contain',
  
    borderWidth:widthToDp('0.3'),
    borderColor:'rgba(145, 158, 171, 0.16)',

    height: widthToDp('18'),
    borderColor: 'rgba(145, 158, 171, 0.32)',
    borderRadius: widthToDp('3.5'),


    
  },
  row: {
    flexDirection: 'row',
  
  },
  IconStyle: [
    appStyle.homeShadow,

   
  ]
});
