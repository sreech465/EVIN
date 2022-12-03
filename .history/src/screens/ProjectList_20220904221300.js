
import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
  ActivityIndicator,
  Animated,
  Platform,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {heightToDp, widthToDp} from '../responsive';
import {appStyle, styles} from '../styles/styles';
import BottomNavigation from './components/BottomNavigator';
import CustomSearchBar from './components/CustomSearchBar';

const ProjectList = ({route, navigation}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const {view} = route.params.DynamicDataTimelineStatus;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  const [nosearch, setSearching] = useState(false);
  const [searchData, setSearchData] = useState('');

 
  // useEffect(()=>{
  //   console.log(ProjectList.data.results)

  // },[ProjectList?.data.results])

  const projectIcon = require('./Assets/myproject512w.png');

  const ProjectList = useSelector(
    state => state.ProjectListReducer.ProjectList,
  );

  const onChangeSearch = (data, name) => {
    // console.log(data,name,"-----------------+")
    if (name.length > 0) {
      // setSearching(true);
      // setSearchData(data);
      if(data.length>0){
          setSearching(true);
      setSearchData(data);

      }
    } else {
      setSearching(false);
    }
  };

  const Box = item => (
    <TouchableOpacity
    
      onPress={() =>
        navigation.navigate('ProjectDetail', {id: item.item.id, view: view})
      
      }>
      <View
        style={[
          
          {
            flexDirection: 'row',
            marginHorizontal: widthToDp('7'),
        
           
        
            borderRadius: widthToDp('6'),
            marginBottom: heightToDp('2'),


          
      
      
            shadowColor: "#545151",
       shadowOffset: {
         width: 0,
         height: 4,
       },
       shadowOpacity:  0.19,
       shadowRadius: 5.62,
       elevation: 6
          }





        
          

        ]}>
        <View
          style={{
            flex: 0.25,
            height: heightToDp('13'),
            backgroundColor: 'white',
            borderTopLeftRadius: widthToDp('6'),
            borderBottomLeftRadius: widthToDp('6'),
          }}>
          <Image
            source={projectIcon}
            style={[
              styleComponent.imageStyle,
              appStyle.centerHorizontal,
              {marginTop:Platform.OS=='ios'?heightToDp('2.5'): heightToDp('2')},
            ]}
          />
        </View>
        <View
          style={{
            flex: 1,
            height: heightToDp('13'),
            backgroundColor: 'white',
            // justifyContent:'center',
            justifyContent:Platform.OS==='ios'?'center':null,
            borderTopRightRadius: widthToDp('6'),
            borderBottomRightRadius: widthToDp('6'),
          }}>
          <Text style={[appStyle.SubTitle1, {marginTop: heightToDp('1')}]}>
            {item.item.name}
          </Text>
          <Text style={appStyle.body2Text}>
            {item.item.solution_organization}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={appStyle.lightGrayText}>Project Id</Text>
              <Text style={appStyle.body2Text}>{item.item.project_id}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={appStyle.lightGrayText}>PO No</Text>
              <Text style={appStyle.body2Text}>{item.item.po_number}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: styles.centralColor,
        paddingBottom: heightToDp('12'),
      }}>
      <Text
        style={[
          appStyle.H4,
          {
            color: '#F4F7FF',
            marginTop: heightToDp('6'),
            marginBottom: heightToDp('2'),
            marginHorizontal: widthToDp('6'),
          },
        ]}>
        myProjects
      </Text>
      <Animated.View
        style={{
          // flex: 1,
          backgroundColor: '#F4F7FF',
          // backgroundColor: 'red'
          height:'100%',
          

          borderTopLeftRadius: widthToDp('9'),
          borderTopRightRadius: widthToDp('9'),
          opacity: fadeAnim, // Binds directly
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [150, 0], // 0 : 150, 0.5 : 75, 1 : 0
              }),
            },
          ],
        }}>
        <CustomSearchBar
          data={ProjectList?.data?.results}
          onChangeSearch={onChangeSearch}
          tab='projectList'
        />

        {ProjectList !== [] &&
        ProjectList.data &&
        ProjectList.data.results.length > 0 ? (
          // <View style={{backgroundColor: '#F4F7FF'}}>
                      <View style={{backgroundColor: '#F4F7FF',marginBottom: Platform.OS=='ios'? heightToDp('15'):heightToDp('16')}}>
            <FlatList
              data={nosearch ? searchData : ProjectList.data.results}
              renderItem={Box}
              keyExtractor={(item, index) => index}
            />
          </View>
        ) : (
          <View style={{alignItems: 'center'}}>
            <ActivityIndicator />
          </View>
        )}
      </Animated.View>
      <BottomNavigation />
    </View>
  );
};

export default ProjectList;

const styleComponent = StyleSheet.create({
  imageStyle: {
    height: heightToDp('3.5'),
    width: Platform.OS=='android'?widthToDp('7'):widthToDp('8'),
  },
  cardBorder: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cardBorder1: {
    elevation: 6,
  },
  IconStyle: [
    appStyle.homeShadow,

   
  ]
});
