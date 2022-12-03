import React, {useEffect, useState} from 'react';
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
  TouchableOpacity,
  Settings,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Maintenence, Document} from '../Icon/Icon';
import {ProcessAllDetail} from '../redux/ProcessDetail/action';
import {heightToDp, widthToDp} from '../responsive';
import {appStyle, bdRad, styles} from '../styles/styles';
import BackButon from './components/BackButon';
import BottomNavigation from './components/BottomNavigator';

const IconList = ['Documents'];
const lists = [
  'Capacity',
  'Location',
  'Month & year of installation',
  'Warranty Expiry',
];

export default ProcessLineDetails = ({route, navigation}) => {
  const access_token = useSelector(
    state => state.LoginReducer.data.access_token,
  );
  const ReduxState = useSelector(state => state.ProcessDetails);
  console.log(console.log(ReduxState));

  const dispatch = useDispatch();

  const {id} = route.params;

  useEffect(() => {
    console.log('useEffect')
    if (id) {
      dispatch(ProcessAllDetail(access_token, id));
    }
  }, []);

  const IconView = (name, number, nextScreen) => {
    const icons = [<Document />];
    return (
      //         return ReduxState.ProcessDetails &&
      // ReduxState.ProcessDetails.data.length > 0 ? (
      <View style={[styles1.iconView, appStyle.homeShadow]}>
        <TouchableOpacity
         
          style={{justifyContent: 'center', alignItems: 'center'}}>
          {icons[number]}
          <Text
            style={[
              appStyle.body2Text,
              appStyle.centerHorizontal,
              {color: '#212B36', marginTop: heightToDp('0.3')},
            ]}>
            {/* {name} */}
            Documents
          </Text>
        </TouchableOpacity>
      </View>
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
          {data === null || data === 'null' || data === '' ? (
            <Text
              style={[
                styles1.DetailText,
                appStyle.body2Text,
                {color: '#212B36'},
              ]}>
              --
            </Text>
          ) : (
            <Text
              style={[
                styles1.DetailText,
                appStyle.body2Text,
                {color: '#212B36', fontSize: widthToDp('3.5')},
              ]}>
              {data}
            </Text>
          )}
        </View>
      </View>
    );
  };

  return ReduxState.ProcessDetails &&
    ReduxState.ProcessDetails.data.length > 0 
 
      ? 
      (
        // <View></View>
        
    // <View>
    //   {console.log(ReduxState.ProcessDetails.data[0])}
    //   <Text>hai</Text>
    //   <Text style={[appStyle.body2Text, {color: '#212B36'}]}>
    //     {ReduxState?.ProcessDetails?.data[0].name}
    //   </Text>
    // </View>
    <SafeAreaView style={{flex: 1, backgroundColor: styles.centralColor}}>

    <View
      style={{
        width: widthToDp('100'),
        backgroundColor: styles.centralColor,
        height: heightToDp('24'),
      }}>
      <View style={[{width: widthToDp('38')},
      Platform.OS=='ios'? [appStyle.centerHorizontal,{marginTop:'auto',marginBottom:heightToDp('3.8')}]:appStyle.centrailView
       ]}>
        {console.log(ReduxState.ProcessDetails.data[0].primary_product_details.primary_product_image)}
        <Image
          source={{

            uri:ReduxState.ProcessDetails.data[0].primary_product_details.primary_product_image
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
            <Text style={[appStyle.caption, {paddingTop: heightToDp('0'),color:'#919EAB'}]}>
              Primary product
            </Text>
            <Text style={[appStyle.body2Text, {color: '#212B36'}]}>
            {ReduxState.ProcessDetails.data[0].primary_product_details.name}

          </Text>

          </View>

        </View>
        <View style={{backgroundColor: 'white'}}>
          <Text style={appStyle.caption}>Line</Text>

          <Text style={[appStyle.H6, {color: 'black'}]}>
          {ReduxState.ProcessDetails.data[0].name}
            </Text>
        </View>
      </View>

      <View style={styles1.ParentIconView}>
      {IconView(IconList[0], 0, 'Documents')}

      </View>
      <View>
      {oneBox(lists[0], ReduxState.ProcessDetails.data[0].line_capacity)}
      
      {oneBox(lists[1], ReduxState.ProcessDetails.data[0].org_location_name)}
      {oneBox(lists[2], 
      ReduxState.ProcessDetails.data[0].line_capacity+ ' '+

      ReduxState.ProcessDetails.data[0].capacity_uom_name)
        
        
        // ReduxState.ProcessDetails.data[0].month_of_installation,ReduxState.ProcessDetails.data[0].year_of_installation)
        
        }
    
      {oneBox(lists[3],ReduxState.ProcessDetails.data[0].modified_on)}

      </View>
    </View>
    <BottomNavigation />
  </SafeAreaView>
  ) :
   (
    //   <SafeAreaView style={{flex: 1, backgroundColor: styles.centralColor}}>

    //   <View
    //     style={{
    //       width: widthToDp('100'),
    //       backgroundColor: styles.centralColor,
    //       height: heightToDp('24'),
    //     }}>
    //     <View style={[{width: widthToDp('38')},
    //     Platform.OS=='ios'? [appStyle.centerHorizontal,{marginTop:'auto',marginBottom:heightToDp('3.8')}]:appStyle.centrailView
    //      ]}>
    //       {console.log(ReduxState.ProcessDetails.data[0].primary_product_details.primary_product_image)}
    //       <Image
    //         source={{

    //           uri:ReduxState.ProcessDetails.data[0].primary_product_details.primary_product_image
    //         }}
    //         style={[
    //           styles1.imageStyle,
    //           appStyle.centrailView,
    //           {backgroundColor: 'white'},
    //         ]}
    //       />
    //     </View>
    //   </View>
    //   <View style={{position: 'absolute', top: Platform.OS=='android'?'0.4%':'6.0%', left: '6%'}}>

    //     <BackButon
    //     navigation={() => navigation.goBack()}
    //      />

    //   </View>

    //   <View //part 2
    //     style={{
    //       backgroundColor: '#FFFFFF',
    //       borderRadius: bdRad,
    //       height: '100%',
    //       paddingHorizontal: widthToDp('6'),
    //       paddingTop: widthToDp('6'),

    //       // paddingHorizontal: widthToDp('2'),
    //     }}>
    //     <View
    //       style={
    //         {
    //           // marginHorizontal: widthToDp('5'),
    //           // marginTop: widthToDp('3'),
    //         }
    //       }>
    //       <View style={{flexDirection: 'row'}}>
    //         <View style={{flex: 3}}>
    //           <Text style={[appStyle.caption, {paddingTop: heightToDp('0'),color:'#919EAB'}]}>
    //             Equipment
    //           </Text>
    //           <Text style={[appStyle.body2Text, {color: '#212B36'}]}>
    //           {ReduxState.ProcessDetails.data[0].name}

    //         </Text>

    //         </View>

    //       </View>
    //       <View style={{backgroundColor: 'white'}}>
    //         <Text style={appStyle.caption}>Line</Text>

    //         <Text style={[appStyle.H6, {color: 'black'}]}>
    //         Pc-32 potato starch
    //           </Text>
    //       </View>
    //     </View>

    //     <View style={styles1.ParentIconView}>
    //     {IconView(IconList[0], 0, 'Documents')}

    //     </View>
    //     <View>
    //     {oneBox(lists[0], '1500 kg/hr')}
    //     {oneBox(lists[1], 'Xiam')}
    //     {oneBox(lists[2], 'May 2020')}
    //     {oneBox(lists[3], 'May 12 , 20020')}

    //     </View>
    //   </View>
    //   <BottomNavigation />
    // </SafeAreaView>
    <>
      <View
        style={[
          appStyle.centrailView,
          {backgroundColor: appStyle.centralColor},
        ]}>
        <ActivityIndicator size="large" color="#132D4B" />
      </View>
    </>
  );
};
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

    width: '99%',

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
    height: heightToDp('9.0'),
    // backgroundColor:'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',

    marginVertical: heightToDp('1.5'),
  },
});
