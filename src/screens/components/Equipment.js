import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Image, SafeAreaView, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {heightToDp, widthToDp} from '../../responsive';
import {appStyle} from '../../styles/styles';
const Equipment = props => {
  const {
    tagged_equipment_name,
    equipment_image,
    line_name,
    equipment_id,
    id,
    equipment_rating,
    order_number,
    installed_by_name,
    supplier_name
  } = props.item.item;
  // console.log(props.item.item,"helllooo")
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('EquipmentDetails', {id})}>
      <View style={{flexDirection: 'row'}}>
        {/* <View style={{width: widthToDp('28')}}> */}
        <View style={{width: widthToDp('28')}}>
          <Image
            source={{uri: equipment_image}}
            style={[styles.imageStyle, appStyle.centrailView]}
          />
        </View>

        <View style={{marginVertical: widthToDp('3'), width: widthToDp('53')}}>
          <SafeAreaView>
          
              <View style={{width:widthToDp('50')}} >
              <Text numberOfLines={1} style={[appStyle.SubTitle1]} ellipsizeMode={'tail'}  >{tagged_equipment_name}</Text>

              </View>

            <Text style={[appStyle.body2Text]}>{line_name}</Text>
          </SafeAreaView>

          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={appStyle.Tiny}>Serial</Text>

              <Text style={appStyle.body2Text}>{equipment_id}</Text>
            </View>
            <View style={{flex: 1 }}>
              <Text style={appStyle.Tiny}>OEM</Text>
              <Text style={[appStyle.body2Text,{width:'100%'}]} numberOfLines={1} ellipsizeMode={'tail'}  >{supplier_name}</Text>
            </View>
          </View>
          {equipment_rating != null && (
            <View
              style={[
                styles.status,
                {
                  backgroundColor:
                    equipment_rating == 1
                      ? '#229A16'
                      : equipment_rating == 2
                      ? '#FFC107'
                      : '#B72136',
                },
              ]}></View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default Equipment;
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

  status: {
    width: widthToDp('3'),
    height: widthToDp('3'),

    borderRadius: widthToDp('50'),
    position: 'absolute',
    top: heightToDp('1'),
    left: '96%',
  },
});
