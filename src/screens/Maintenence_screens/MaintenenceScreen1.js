import React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  StatusBar,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {appStyle, bdRad, styles} from '../../styles/styles';
import {useSelector} from 'react-redux';
import {heightToDp, widthToDp} from '../../responsive';

import BackButton from '../components/BackButton';
import moment from 'moment';
import BackButon from '../components/BackButon';
import BottomNavigation from '../components/BottomNavigator';
const MaintenenceScreen = ({navigation,route}) => {

  const ReduxState = useSelector(
    state => state.EquipmentDetails.EquipmentDetails,
  );
  const {
    equip_mnt_checklist,
    supplier_equipment_name,
    model_name,
    equipment_id,
    tagged_equipment_name
  } = ReduxState && ReduxState.data.length && ReduxState.data[0];
  
  
  const Box = () =>
    equip_mnt_checklist.map((item, index) => {
      console.log('item',item)
      return (
        <Pressable
          onPress={() => navigation.navigate('MaintenanceDetails',{index:index,Eqname:item.equipment_name,dsrc:item.description,org_id:ReduxState.data[0].installed_by,EqId:route.params?.EqId})}
          key={index}>
          <View
            style={[{
              flexDirection: 'row',
              backgroundColor: '#FFFFFF',
              // backgroundColor:'red',
              borderRadius: 14,
              marginBottom: heightToDp('1.4'),
              paddingVertical: heightToDp('1'),
            },appStyle.homeShadow]}>
            <View style={{flex: 0.3}}>
              <Image
                source={require('../Assets/maintenance11.png')}
                style={{
                  resizeMode: 'cover',
                  width: widthToDp('8'),
                  height: heightToDp('3'),
                  borderRadius: 7,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: heightToDp('2'),
                  borderColor: 'gray',
                }}
              />
            </View>
            <View style={{flex: 1, margin: 10}}>
              <Text style={[appStyle.SubTitle1]}>{item.name} Checklist</Text>

              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Text style={appStyle.Tiny}>Frquency</Text>
                  <Text style={appStyle.body2Text}>
                    {item.checklist_type_name}
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={appStyle.Tiny}>Steps</Text>
                  <Text style={[appStyle.body2Text, {color: 'green'}]}>
                    {item && item.checklist_fields.length}
                  </Text>
                </View>
                <View style={{flex: 1.3}}>
                  <Text style={appStyle.Tiny}>Latest Maintenence</Text>
                  <Text style={[appStyle.body2Text]}>
                 {/* { item.last_maintenance_date } */}
                    {item.last_maintenance_date && moment(item.last_maintenance_date).format('MMMM Do YYYY')}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      );
    });

  return (
    <>
    <SafeAreaView
      style={{
        flexDirection: 'column',
        flex: 1,
        backgroundColor: styles.centralColor,
      }}>
      {/* <StatusBar animated={true} backgroundColor={styles.centralColor} /> */}
      <View style={{flexDirection: 'row',marginTop:heightToDp('0')}}>
        <View style={{flex: 1.2, alignItems: 'center',marginTop:heightToDp('0')}}>
          <BackButon navigation={() => navigation.goBack()} />
        </View>
        <View style={[{flex: 5}, component.header]}>
          <Text style={[appStyle.H6,{color:'#FFFFFF'}]}>Maintenance Checklists</Text>
          <Text style={[appStyle.body2Text,{color:'white'}]}>{tagged_equipment_name}</Text>
          <View style={component.headerDetail}>
            <View style={{flex: 1}}>
              <Text style={appStyle.caption}>Serial</Text> 
              <Text style={[appStyle.body2Text,{color:'white'}]}>{equipment_id}</Text>
            </View>

            <View style={{flex: 0.5}}>
              <Text style={appStyle.caption}>Model </Text>
              <Text style={[appStyle.body2Text,{color:'white'}]}>{model_name}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Part 2 */}
      <View
        style={{
          backgroundColor: '#f5f5f5',
          // backgroundColor:'red',
          flex: 1,
          borderTopLeftRadius: bdRad,
          borderTopRightRadius: bdRad,
        }}>
        <View style={{marginHorizontal: widthToDp('7'),marginTop:widthToDp('7')}}>
          {equip_mnt_checklist && equip_mnt_checklist.length > 0 ? (
            Box()
          ) : (
            <View style={{height:'100%',justifyContent:'center',alignItems:'center'}}>
              <Text>Checklists empty</Text>
            </View>
          )}
        </View>
      </View>
      
    </SafeAreaView>
    <BottomNavigation/>
    
    </>
  );
};
export default MaintenenceScreen;

export const component = StyleSheet.create({
  TopView: {
    flexDirection: 'row',
  },
  header: {
    marginTop: heightToDp('1.5'),

    marginBottom: heightToDp('2'),
    marginRight:heightToDp('2')
  },
  headerDetail: {
    flexDirection: 'row',
    marginTop:widthToDp('1')
  },
 
  box2: {
    flex: 1,
    backgroundColor: '#F4F7FF',
    borderRadius: 30,
  },
  innerView: {
    marginHorizontal: widthToDp('8'),
    marginTop: heightToDp('2'),

    // backgroundColor:'white'
  },
 
  fileView: {
    flexDirection: 'row',
    borderRadius: 16,
    backgroundColor: 'white',
    paddingVertical: heightToDp('1'),

    shadowColor: '#000',
    marginVertical: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  imageStyle: {
    resizeMode: 'contain',
    margin: 1,
  }
});
