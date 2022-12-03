import React, {useEffect,useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  StatusBar,
  ActivityIndicator,
  SafeAreaView,
  Platform,
} from 'react-native';
import {
  TouchableOpacity,
} from 'react-native-gesture-handler';
import moment from 'moment';

import {EquipmentAllDetail} from '../redux/EquipmentDetail/action';
import {useDispatch, useSelector} from 'react-redux';

import {heightToDp, widthToDp} from '../responsive';
import {appStyle, bdRad, styles} from '../styles/styles';
import BottomNavigation from './components/BottomNavigator';
import BackButton from './components/BackButton';
import {Document, Maintenence, Search, Settings} from '../Icon/Icon';
import BackButon from './components/BackButon';
import {color} from 'react-native-elements/dist/helpers';

var finalData={}
export default EquipmentDetail = ({route, navigation}) => {
  const dispatch = useDispatch();
  const access_token = useSelector(
    state => state.LoginReducer.data.access_token,
  );

  const {id, Eqname} = route.params;
  const ReduxState = useSelector(state => state.EquipmentDetails);



  const lists = [
    'Serial no',
    'Model',
    'Capacity',
    'Purchase Order',
    'OEM',
    'Country of origin',
    'Location',
    'Installed on',
    'Warranty Expiry',
  ];

  const IconList = ['Documents', 'Spare Parts', 'Maintenance'];

  useEffect(() => {
    console.log('ggghhj', id);
    if(id){
      dispatch(EquipmentAllDetail(access_token, id));
    }
    
  }, []);




  const [documentLabelsEmpty, setDocumentLabel] = useState(true);
  const ReduxState1 = useSelector(state => state);
  // console.log(ReduxState1,"Rd1")

  useEffect(() => {
    finalData = {};

    ReduxState1.EquipmentDetails.EquipmentDetails!=''?
      DataPopulate()

      
    :null

  }, [ReduxState1,finalData]);

  const DataPopulate = () => {
    ReduxState1.EquipmentDetails.EquipmentDetails.data[0].documents.forEach(
      (item, index) => {
        if (item.documentlabels.length > 0) {
          item.documentlabels.forEach(item1 => {
            if (Object.keys(finalData).includes(item1.name)) {
              finalData[item1.name] = [...finalData[item1.name], index];
            } else {
              finalData[item1.name] = [index];
            }
          });
        } else {
          setDocumentLabel(false);

          if (Object.keys(finalData).includes(item.document_label)) {
            finalData[item.document_label] = [
              ...finalData[item.document_label],
              index,
            ];
          } else {
            finalData[item.document_label] = [index];
          }
        }
      },
    );

  };
 




  const oneBox = (title, data) => {
    // console.log(data,"data values...")
    return (
      <View style={styles1.marginLength}>
        <View
          style={{
            width: '100%',
            backgroundColor: '#F4F6F8',
            height: heightToDp('0.1'),
          }}></View>
        <View style={[styles1.equipmentDetails]}>
          <Text style={[styles1.DetailValue, appStyle.caption]}>{title}</Text>
          {data===null || data==='null' ||data==='' ?   <Text
            style={[
              styles1.DetailText,
              appStyle.body2Text,
              {color: '#212B36'},
            ]}>

              --
           
          </Text>:
          <Text
            style={[
              styles1.DetailText,
              appStyle.body2Text,
              {color: '#212B36'},
            ]}>
            {    title === 'Warranty Expiry' || title==='Installed on'
              ? // data.substring(0,10)
                data != null
                ? moment(data).format('MMMM Do YYYY')
                : null
              : data    }
          </Text>}
        </View>
      </View>
    );
  };

  const IconView = (name, number, nextScreen) => {
    const icons = [<Document />, <Settings />, <Maintenence />];
    return (
      <View style={[styles1.iconView, appStyle.homeShadow]}>
        <TouchableOpacity
          onPress={() => navigation.navigate(nextScreen, {EqId: id,fnlData:{finalData}})}
          style={{justifyContent: 'center', alignItems: 'center'}}>
          {icons[number]}
          <Text
            style={[
              appStyle.body2Text,
              appStyle.centerHorizontal,
              {color: '#212B36', marginTop: heightToDp('0.3')},
            ]}>
            {name}
          
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return ReduxState.EquipmentDetails &&
    ReduxState.EquipmentDetails.data.length > 0 ? (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: styles.centralColor}}>
        {/* <StatusBar animated={true} backgroundColor={styles.centralColor} barStyle="light-content" /> */}

        <View
          style={{
            width: widthToDp('100'),
            backgroundColor: styles.centralColor,
            height: heightToDp('24'),
          }}>
          <View style={[{width: widthToDp('38')},
          Platform.OS=='ios'? [appStyle.centerHorizontal,{marginTop:'auto',marginBottom:heightToDp('3.8')}]:appStyle.centrailView
           ]}>
            <Image
              source={{
                uri: ReduxState.EquipmentDetails.data[0].equipment_image,
              }}
              style={[
                styles1.imageStyle,
                appStyle.centrailView,
                {backgroundColor: 'white'},
              ]}
            />
          </View>
        </View>
        <View style={{position: 'absolute', top: Platform.OS=='android'?'0.4%':'6.0%', left: '6%'}}>
          
          <BackButon 
          navigation={() => navigation.goBack()}
           />

        </View>

        <View //part 2
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: bdRad,
            height: '100%',
            paddingHorizontal: widthToDp('6'),
            paddingTop: widthToDp('6'),

            // paddingHorizontal: widthToDp('2'),
          }}>
          <View
            style={
              {
                // marginHorizontal: widthToDp('5'),
                // marginTop: widthToDp('3'),
              }
            }>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 3}}>
                <Text style={[appStyle.caption, {paddingTop: heightToDp('0')}]}>
                  Equipment
                </Text>
                <Text style={[appStyle.H6, {color: 'black'}]}>
                  {ReduxState.EquipmentDetails.data[0].tagged_equipment_name}
                </Text>
              </View>
              {ReduxState.EquipmentDetails.data[0].equipment_rating != null && (
                <View
                  style={{
                    flex: 0.85,
                    backgroundColor:
                      ReduxState.EquipmentDetails.data[0].equipment_rating == 1
                        ? '#E9FCD4'
                        : ReduxState.EquipmentDetails.data[0]
                            .equipment_rating == 2
                        ? '#FFF7CD'
                        : ReduxState.EquipmentDetails.data[0]
                            .equipment_rating == 3
                        ? '#FFE7D9'
                        : '',

                    borderRadius: widthToDp('3'),
                  }}>
                  <View style={{marginTop: 'auto', marginBottom: 'auto'}}>
                    <Text
                      numberOfLines={2}
                      style={[
                        appStyle.cationTitle,
                        {
                          textAlign: 'center',
                          alignSelf: 'center',
                          width: '80%',
                          color:
                            ReduxState.EquipmentDetails.data[0]
                              .equipment_rating == 1
                              ? '#229A16'
                              : ReduxState.EquipmentDetails.data[0]
                                  .equipment_rating == 2
                              ? '#DD9C1D'
                              : ReduxState.EquipmentDetails.data[0]
                                  .equipment_rating == 3
                              ? '#B72136'
                              : '',
                        },
                      ]}>
                      {ReduxState.EquipmentDetails.data[0].equipment_rating == 1
                        ? 'Performing Well'
                        : ReduxState.EquipmentDetails.data[0]
                            .equipment_rating == 2
                        ? 'Minor Concern'
                        : 'Major Concern'}
                        {console.log(ReduxState.EquipmentDetails.data[0],"0-----------0equipment details")}
                    </Text>
                  </View>
                </View>
              )}
            </View>
            <View style={{backgroundColor: 'white'}}>
              <Text style={appStyle.caption}>Line</Text>
              <Text style={[appStyle.body2Text, {color: '#328BCB'}]}>
                {/* {ReduxState.EquipmentDetails.data[0].line_name} */}
                {ReduxState.EquipmentDetails.data[0].line_name!=='' &&
                ReduxState.EquipmentDetails.data[0].line_name!==null?'--':
                ReduxState.EquipmentDetails.data[0].line_name}



              </Text>
            </View>
          </View>

          <View style={styles1.ParentIconView}>
            {IconView(IconList[0], 0, 'Documents')}
            {IconView(IconList[1], 1, 'SpareParts')}
            {IconView(IconList[2], 2, 'Maintenence')}
          </View>
          <View>
            {oneBox(lists[0], ReduxState.EquipmentDetails.data[0].equipment_id)}

            {oneBox(lists[1], ReduxState.EquipmentDetails.data[0].model_name)}

            {oneBox(
              lists[2],
              ReduxState.EquipmentDetails.data[0].capacity+

              ReduxState.EquipmentDetails.data[0].capacity_uom_name,
            )}

            {oneBox(lists[3], ReduxState.EquipmentDetails.data[0].order_number)}

            {oneBox(
              lists[4],
              ReduxState.EquipmentDetails.data[0].supplier_name,
            )}

            {oneBox(
              lists[5],
              ReduxState.EquipmentDetails.data[0].country_of_origin,
            )}

            {oneBox(lists[6], ReduxState.EquipmentDetails.data[0].org_location_name)}

            {oneBox(
              lists[7],
              ReduxState.EquipmentDetails.data[0].installation_date,
            )}

            {oneBox(
              lists[8],
              ReduxState.EquipmentDetails.data[0].warranty_expiry,
            )}
          </View>
        </View>
        <BottomNavigation />
      </SafeAreaView>
    </>
  ) : (
    <>
      <View
        style={[
          appStyle.centrailView,
          {backgroundColor: appStyle.centralColor},
        ]}>
        <ActivityIndicator size="large" color='#132D4B' />
      </View>
    </>
  );
};

// export default EquipmentDetail;

const styles1 = StyleSheet.create({
  imageStyle: {
    width: widthToDp('38'),
    resizeMode: 'contain',
    borderWidth: 0.5,
    margin: 10,
    height: heightToDp('18'),
    borderColor: 'gray',
    borderRadius: 16,
  },
  iconView: {
    borderRadius: 14,
    elevation: 5,

    backgroundColor: 'white',
    width: 10,
    width: '30.5%',

    justifyContent: 'center',
  },

  equipmentDetails: {
    flexDirection: 'row',
    borderColor: 'gray',
    padding: widthToDp('1.3'),
  },

  marginLength: {
    backgroundColor: 'white',
  },

  DetailValue: {
    justifyContent: 'flex-start',
    flex: 1,
  },
  ParentIconView: {
    height: heightToDp('9.5'),
    // backgroundColor:'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',

    marginVertical: heightToDp('1.5'),
  },
});
