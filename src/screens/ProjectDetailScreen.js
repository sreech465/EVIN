import React, {useEffect, useRef} from 'react';
import {Text, View, Image, Animated} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {ProjectDetail} from '../redux/ProjectDetail/action';
import {heightToDp, widthToDp} from '../responsive';
import {appStyle, styles} from '../styles/styles';
import BackButon from './components/BackButon';
import BottomNavigation from './components/BottomNavigator';
import moment from 'moment';
import {component} from './Maintenence_screens/MaintenenceScreen1';
import BackButton from './components/BackButton';
const ProjectDetailScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const {id, view} = route.params;
  console.log(view, 'hehheh');
  const access_token = useSelector(
    state => state.LoginReducer.data.access_token,
  );

  const ReduxState = useSelector(
    state => state.ProjectDetailReducer.ProjectDetails,
  );

  // const{name,solution_organization,project_id,plant_name,country_of_origin,customer_location,stage_project}=ReduxState.data

  useEffect(() => {
    dispatch(ProjectDetail(access_token, id, () => fun()));
  }, [id]);


  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];




  const fun = () => {
    Animated.spring(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  const Box = () => (
    
    <FlatList
      data={ReduxState.data.stage_project}
      renderItem={item => {
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

        return (
   
        <View
          style={[
            appStyle.borderShadow,
            {
              height: widthToDp('30'),
              width: '100%',
              backgroundColor: '#328BCB',
        
              borderRadius: widthToDp('2'),
              marginBottom: heightToDp('3'),
            },
          ]}>
          <TouchableOpacity
          
            style={{
              marginLeft: widthToDp('1.7'),
              paddingHorizontal:widthToDp('3'),
              backgroundColor: 'white',
              // backgroundColor:'green',
              borderRadius: widthToDp('2'),
              height: '100%',
            }}
          >
            
              <View style={{marginVertical: heightToDp('1')}}>
                <Text style={[appStyle.SubTitle1, {color: 'black'}]}>
                  {' '}
                  {item.item.stage_name}
                  {console.log(item.item,'-------------------')}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: widthToDp('2.5'),
                    // marginVertical: heightToDp('1')
                  }}>
                  <View style={{flex: 1}}>
                    <Text style={appStyle.Tiny}>Planned End Date</Text>
                    <Text style={[appStyle.body2Text,{}]}>
                      {/* May  */}
                      {item.item.planned_end_date != null
                ? moment(item.item.planned_end_date).format('MMMM Do YYYY').slice(0,3)+" "+
                item.item.planned_end_date.slice(8, 10)+" "+
                item.item.planned_end_date.slice(0, 4)
                : null}
                     
                    </Text>

                    {/* planned_end_date: "2022-04-13T06:37:00Z" */}
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={appStyle.Tiny}>Start Date</Text>
                    <Text style={appStyle.body2Text}>
                    {item.item.progress_start_date != null
                ? moment(item.item.progress_start_date).format('MMMM Do YYYY').slice(0,3)+" "+
                item.item.progress_start_date.slice(8, 10)+" "+
                item.item.progress_start_date.slice(0, 4)
                : null}
                  
                      {/* {item.item.progress_start_date.slice(5, 7)}{' '}
                    {item.item.progress_start_date.slice(8, 10)}{' '}
                      {item.item.progress_start_date.slice(0, 4)} */}
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={appStyle.Tiny}>End Date</Text>
                    <Text style={appStyle.body2Text}>
                    {item.item.progress_end_date != null
                ? moment(item.item.progress_end_date).format('MMMM Do YYYY').slice(0,3)+" "+
                item.item.progress_end_date.slice(8, 10)+" "+
                item.item.progress_end_date.slice(0, 4)
                : '---'}

                      {/* {item.item.progress_end_date!==null
                      
                      ?+
                     item.item.progress_end_date.slice(8, 10)+' ' + item.item.progress_end_date.slice(0,4):'-'
                    } */}

                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: widthToDp('2.5'),
                  }}>
                  <Text style={[appStyle.caption]} >Progress</Text>
                  <Text style={[appStyle.caption]} >{item.item.progress_percentage===null?"0%":item.item.progress_percentage+'%'}</Text>
                  {/* {console.log(item,"hiiii")} */}
                </View>
                <View
                  style={{
                    height: heightToDp('0.5'),
                    width:'95%',
                    backgroundColor: '#DFE3E8',
                    alignSelf: 'center',
                    marginTop: heightToDp('0.5'),
                  }}>
                  <View
                    style={{
                      height: heightToDp('0.5'),
                      width:  item.item.progress_percentage!==null? `${item.item.progress_percentage}%`:'0%',
                      backgroundColor: 'green',
                      borderRadius: widthToDp('10'),
                    }}></View>
                </View>
              </View>
            {/* </View> */}
          </TouchableOpacity>
        </View>
      )}}
      showsVerticalScrollIndicator={false}
    />
  );

  return (
    <SafeAreaView
      style={{
        flexDirection: 'column',
        flex: 1,
        backgroundColor: styles.centralColor,
      }}>
      
      {ReduxState.status === 200 ? (
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1.3, alignItems: 'center',marginTop:heightToDp('0')}}>
            <BackButon navigation={() => navigation.goBack()} />
          </View>
          <View style={[{flex: 5}, component.header,{marginTop:heightToDp('1')}]}>
            <Text style={[appStyle.H6,{color:'#FFFFFF'}]}>{ReduxState.data.name}</Text>
            <Text style={[appStyle.body2Text, {color: 'white'}]}>
              {ReduxState.data.solution_organization? ReduxState.data.solution_organization:'-'}
            </Text>

            <View style={[component.headerDetail]}>
              <View style={{flex: 1}}>
                <Text style={[appStyle.caption]}>Project ID</Text>
                <Text style={{color: 'white'}}>
                  {ReduxState.data.project_id? ReduxState.data.project_id:'-'}
                </Text>
              </View>

              <View style={{flex: 1}}>
                <Text style={[appStyle.caption]}>Country of origin </Text>
                <Text style={{color: 'white'}}>
                  {ReduxState.data.country_of_origin? ReduxState.data.country_of_origin:'-'}
                </Text>
              </View>
            </View>
            <View style={component.headerDetail}>
              <View style={{flex: 1}}>
                <Text style={[appStyle.caption]}>Plant Name</Text>
                <Text style={{color: 'white'}}>
                  {ReduxState.data.plant_name ? ReduxState.data.plant_name: '-'}
                </Text>
              </View>

              <View style={{flex: 1}}>
                <Text style={[appStyle.caption]}>Location</Text>
                <Text style={{color: 'white'}}>
                  {ReduxState.data.customer_location?ReduxState.data.customer_location:'-'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View>
          <Text></Text>
        </View>
      )}
      <Animated.View
        style={{
          flex: 1,

          backgroundColor: '#F4F7FF',

          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
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
        <View style={{margin: heightToDp('3'), flex: 1}}>
          {ReduxState.data &&
          ReduxState.data.stage_project.length != 0 &&
          view ? (
          
            Box()
          ) : (
            <View style={{alignSelf: 'center',height:'100%',justifyContent:'center'}}>
              <Text>No Data Found</Text>
            </View>
          )}
        </View>
      </Animated.View>
      <BottomNavigation />
    </SafeAreaView>
  );
};

export default ProjectDetailScreen;
 {/* {item.item.planned_end_date.slice(5, 7)}{' '}
                      {item.item.planned_end_date.slice(8, 10)}{' '}
                      {item.item.planned_end_date.slice(0, 4)} */}