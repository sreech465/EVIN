import React, {useDebugValue, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Platform,
  Pressable,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';

import {heightToDp, widthToDp} from '../responsive';
import {appStyle, bdRad, styles} from '../styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import BottomNavigation from './components/BottomNavigator';
import CustomSearchBar from './components/CustomSearchBar';
import BackButon from './components/BackButon';
import {SpareTick} from '../Icon/Icon';
import {SparePart} from '../redux/spareParts/action';
import {Document, Maintenence, Search, Settings} from '../Icon/Icon';

const SparePartScreen = ({navigation, route}) => {
  const ReduxState = useSelector(state => state);

  const [nosearch, setSearching] = useState(false);
  const [searchData, setSearchData] = useState('');
  const access_token = useSelector(
    state => state.LoginReducer.data.access_token,
  );
  const {
    supplier_equipment_name,
    model_name,
    spare_parts,
    line_id,
    id,
    equipment_id,
    tagged_equipment_name,
  } = ReduxState.EquipmentDetails.EquipmentDetails.data[0];
  const [spareParts, setSpareParts] = useState(spare_parts);
  const [checkedData, setCheckedData] = useState([]);
  const dispatch = useDispatch();

  const onChangeSearch = (data, name) => {
    if (name.length > 0) {
      setSearching(true);
      setSearchData(data);
    } else {
      setSearching(false);
    }
  };

  onFail = x => {
    Platform.OS === 'ios'
      ? Alert.alert(x + ':- ' + checkedData, [
          {
            text: 'ok',
          },
        ])
      : alert('sucessfull');
    setCheckedData([]);
  };
  sucess = x => {
    onFail('Request sent for Spare Number');
  };
  const SpareSelected = (selected, i) => {
    const existed = checkedData.find(item => item == selected);
    if (existed) {
      setCheckedData(checkedData.filter(item => item != selected));
    } else {
      setCheckedData([...checkedData, selected]);
    }
  };

  return (
    <SafeAreaView
      style={{
        flexDirection: 'column',
        flex: 1,
        backgroundColor: styles.centralColor,
      }}>
      <View style={component.header}>
        <View style={component.headerDetail}>
          <View style={{flex: 0.9}}>
            <Text style={[appStyle.H6, {color: '#FFFFFF'}]}>Spare Part</Text>
            <Text style={[appStyle.body2Text, {color: '#FFFFFF'}]}>
              {tagged_equipment_name}
            </Text>
          </View>

          <View style={{flex: 0.6}}>
            <View
              style={{
                backgroundColor:
                  checkedData.length > 0
                    ? 'rgba(50, 139, 203, 1)'
                    : 'rgba(50, 139, 203, 0.5)',

                padding: widthToDp('2.1'),
                marginRight: widthToDp('5'),
                marginTop: heightToDp('2'),
                borderRadius: widthToDp('2'),
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  // console.log('haiiii')
                  if (sucess.length > 0) {
                    var data = {
                      relation_id: id,
                      spare_part_ids: checkedData,
                      remarks: '',
                    };
                    dispatch(SparePart(access_token, data, x => sucess(x)));
                  }
                }}>
                <Text
                  style={[
                    appStyle.SubTitle2,
                    {color: checkedData.length > 0 ? 'white' : '#919EAB'},
                  ]}>
                  Requst RFQ
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={component.headerDetail}>
          <View style={{flex: 0.8}}>
            <Text style={appStyle.caption}>Serial</Text>
            <Text style={[{color: 'white'}, appStyle.body2Text]}>
              {equipment_id}
            </Text>
          </View>

          <View style={{flex: 0.5}}>
            <Text style={appStyle.caption}>Model </Text>
            <Text style={[{color: 'white'}, appStyle.body2Text]}>
              {model_name}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          top: Platform.OS == 'android' ? '0.2%' : '5.5%',
          marginHorizontal: widthToDp('5'),
        }}>
        {/* <BackButon  /> */}
        <BackButon navigation={() => navigation.goBack()} />
      </View>
      <SafeAreaView style={component.box2}>
        {/* <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'padding' : null}> */}
        <CustomSearchBar
          data={spare_parts}
          tab="SpareParts"
          onChangeSearch={onChangeSearch}
        />

        <View
          style={{
            marginHorizontal: widthToDp('8'),
            backgroundColor: '#F4F7FF',

            marginBottom:
              Platform.OS === 'android' ? heightToDp('16') : heightToDp('13'),

            borderRadius: widthToDp('6'),
          }}>
          {spareParts && spareParts.length > 0 ? (
            <FlatList
              data={nosearch ? searchData : spareParts}
              bounces={false}
              showsVerticalScrollIndicator={false}
              renderItem={(item, index) => {
                var x = checkedData.find(items => items == item.item.id);

                return (
                  <Pressable
                    style={[
                      {
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        marginBottom: heightToDp('1.5'),
                        borderRadius: widthToDp('4'),
                        // marginBottom: Platform.OS=='ios'?heightToDp('1.5'):heightToDp('4.6'),

                        borderWidth: 2,
                        borderColor: x ? 'rgba(50, 139, 203, 0.5)' : 'white',
                      },
                    ]}
                    onPress={() => {
                      if (
                        item.item.available === 'Yes' &&
                        item.item.vendor_name === 'Self'
                      ) {
                        SpareSelected(item.item.id, item.index);
                      } else {
                        alert("You can't select this spare item  ");
                      }
                    }}>
                    <View style={{flex: 0.35}}>
                      {x && (
                        <View
                          style={{
                            position: 'absolute',
                            top: heightToDp('3'),
                            zIndex: 2,
                            left: widthToDp('6.5'),
                            backgroundColor: 'white',
                            borderRadius: 20,
                            borderWidth: 2,
                            borderColor: 'white',
                          }}>
                          {/* <SpareTick /> */}
                          <Image
                            source={require('../Icon/icons/sparetick.png')}
                            style={{resizeMode: 'contain'}}
                          />
                        </View>
                      )}

                      {item.item && item.item.spare_part_image == '' ? (
                        <View
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: widthToDp('3'),
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: heightToDp('2'),
                            borderColor: 'gray',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 0.3,
                          }}>
                          <Settings />
                        </View>
                      ) : (
                        <Image
                          // source={require('./Assets/Equipment/1.png')}
                          source={{uri: item.item.spare_part_image}}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: widthToDp('3'),
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: heightToDp('2'),
                            borderColor: 'gray',
                            borderWidth: 0.3,
                          }}
                        />
                      )}

                      {/* <Image
                     
                        source={{uri: item.item.spare_part_image==''?
                      null:item.item.spare_part_image
                      }}
                      
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: widthToDp('3'),
                          marginLeft: 'auto',
                          marginRight: 'auto',
                          marginTop: heightToDp('2'),
                          borderColor: 'gray',
                          borderWidth: 0.3,
                        }}
                   
                      /> */}
                    </View>
                    <View style={{flex: 1, marginVertical: heightToDp('1.2')}}>
                      <Text style={appStyle.SubTitle1}>
                        {item.item.part_number}
                      </Text>
                      <Text style={appStyle.SubTitle2}>
                        {item.item.part_name}
                      </Text>
                      <Text
                        style={[
                          appStyle.body2Text,
                          {marginBottom: heightToDp('0.3')},
                        ]}>
                        {item.item.description}
                      </Text>
                      <Text style={appStyle.Tiny}>Vendor</Text>
                      <Text style={appStyle.body2Text}>
                        {item.item.vendor_name}
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                          <Text style={appStyle.Tiny}>Criticality</Text>
                          <Text style={appStyle.body2Text}>
                            {item.item.critical}
                          </Text>
                        </View>
                        <View style={{flex: 1}}>
                          <Text style={appStyle.Tiny}>Availability</Text>
                          <Text
                            style={[
                              appStyle.SubTitle2,
                              {
                                color:
                                  item.item.available === 'Yes'
                                    ? 'green'
                                    : 'red',
                                marginVertical: heightToDp('0.3'),
                              },
                            ]}>
                            {item.item.available === 'Yes'
                              ? 'Available'
                              : 'Unavailable'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </Pressable>
                );
              }}
            />
          ) : (
            <View style={{alignItems: 'center', marginTop: '50%'}}>
              <Text>No spare parts</Text>
            </View>
          )}
        </View>
        {/* </KeyboardAvoidingView> */}
      </SafeAreaView>

      <BottomNavigation />
    </SafeAreaView>
  );
};
export default SparePartScreen;

const component = StyleSheet.create({
  TopView: {
    flexDirection: 'row',
  },
  header: {
    marginTop: Platform.OS === 'ios' ? heightToDp('0.7') : heightToDp('0.8'),
    marginLeft: widthToDp('18'),
  },
  headerText: {
    fontSize: 18,
    color: 'white',
  },
  headerDetail: {
    flexDirection: 'row',
    marginVertical: heightToDp('0.8'),
    marginBottom: heightToDp('2'),
    // marginRight:widthToDp('3')
  },
  // equipmentName: {
  //   marginVertical: 5,
  //   color: 'white',
  //   fontSize: 14,
  // },
  equipmentKey: {
    color: 'gray',
    fontSize: 12,
    lineHeight: 18,
  },
  box2: {
    flex: 1,
    backgroundColor: '#F4F7FF',
    borderTopEndRadius: bdRad,
    borderTopLeftRadius: bdRad,
  },
  innerView: {
    marginHorizontal: widthToDp('8'),
    marginTop: heightToDp('2'),

    // backgroundColor:'white'
  },
  sectionText: {
    color: 'black',
    fontSize: 14,
    lineHeight: 17.5,
    fontWeight: '700',
  },
  // fileView: {
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 3,
  //   },
  //   shadowOpacity: 0.27,
  //   shadowRadius: 4.65,

  //   elevation: 4,
  // },
  imageStyle: {
    resizeMode: 'contain',
    margin: 1,
  },
  fileName: {
    fontWeight: '700',
    fontSize: 16,
    // marginVertical:heightToDp('0.7')
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 15,
    height: heightToDp('6'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightToDp('1'),
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    marginTop: heightToDp('2'),
  },
});
