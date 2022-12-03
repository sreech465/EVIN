import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Dimensions} from 'react-native';
import {heightToDp, widthToDp} from './responsive';
import MyInstallations from './screens/components/myInstallation';
import MyProjects from './screens/components/myProjects';
import {appStyle, styles} from './styles/styles';
import {
  getEquipmentData,
  getProcesslineData,
  Logout,
} from './redux/login_credentials/action';
import {ProjectListAction} from './redux/ProjectList/actions';
import {feature} from './screens/constants/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width, height} = Dimensions.get('window');

const Main = ({navigation}) => {
  const dispatch = useDispatch();
  const role_permissions = useSelector(
    state => state.LoginReducer.data.role_permissions,
  );
  const userData = useSelector(state => state.LoginReducer.data);


  let date = new Date().toUTCString();
console.log(date.slice(0,17));


  const access_token = useSelector(
    state => state.LoginReducer.data.access_token,
  );


  


  const renderMyinstallation = role_permissions => {
    const myInstallation = role_permissions.filter(
      item => item.module_name === 'myInstallations',
    );
    //  let myInstallation=[]
    const filtered = myInstallation.filter(
      item =>
        item.feature_name === 'Equipment' ||
        item.feature_name === 'Process Lines',
    );
    const showMyinstallations = filtered.find(i => i.view === true);
    if (showMyinstallations) {
      return <MyInstallations navigation={navigation} />;
    }
  };

  const renderMyProjects = role_permissions => {
    const myProjects = role_permissions.filter(
      item => item.module_name === 'myProjects',
    );
    

    // let myProjects=[]
    const DynamicDataTimelineStatus = myProjects.find(
      item => item.feature_name == feature.DynamicDataTimelineStatus,
    );

    const Project = myProjects
      ? myProjects.find(item => item.feature_name == 'Solution layout')
      : null;

        console.log(Project,"-----------------------------",myProjects[0].feature_name,myProjects.length,myProjects)
    if (Project.view === true ) {
      return (
        <MyProjects
          navigation={navigation}
          DynamicDataTimelineStatus={DynamicDataTimelineStatus}
        />
      );
    }
  };

  useEffect(() => {
    dispatch(getProcesslineData(access_token,1,''));
    dispatch(getEquipmentData(access_token,1,''));
    const data = role_permissions.find(
      item => item.module_name === 'myProjects',
    );
    if (data?.module_name === 'myProjects') {
      dispatch(ProjectListAction(access_token));
    }
  }, []);

  return (
    <View
      style={{
        flexDirection: 'column',
        flex: 1,
        backgroundColor: styles.centralColor,
      }}>
      <StatusBar
        animated={true}
        backgroundColor={styles.centralColor}
        barStyle="light-content"
      />

      <TouchableOpacity
        style={{
          alignSelf: 'flex-end',
          marginTop: heightToDp('4'),
          marginTop: heightToDp('5'),
          marginRight: widthToDp('5'),
        }}
        onPress={() => {
          dispatch(Logout());
        }}>
        <Icon name="logout" size={30} color="white" />
      </TouchableOpacity>

      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Image
          source={require('./Icon/icons/logo_text.png')}
          style={{
            width: widthToDp('30'),
            height: heightToDp('25'),
            resizeMode: 'contain',
          }}
        />
      </View>

      <View
        style={{
          position: 'relative',
          bottom: heightToDp('2.5'),
          left: widthToDp('9'),
        }}>
        <Text style={appStyle.H4Text}>
          {'Hello' + ' ' +userData.first_name}{' '}
          {console.log(userData,"----------userData")}
        </Text>
        <Text style={[appStyle.body2Text, {color: '#919EAB'}]}>
          {userData.username}
        </Text>
        <Text style={[appStyle.body2Text, {color: '#919EAB'}]}>
          {date.slice(0,17)}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: '#F4F7FF',

          borderTopLeftRadius: widthToDp('8'),
          borderTopRightRadius: widthToDp('8'),
        }}>
        <View
          style={{margin: heightToDp('3'), paddingVertical: heightToDp('1')}}>
          <Text style={[page.MediumText, appStyle.H5Text]}>
            What would you like to do?
          </Text>

        

          {role_permissions ? renderMyinstallation(role_permissions) : null}
          {role_permissions && role_permissions.length > 0
            ? renderMyProjects(role_permissions)
            : null}
        </View>
      </View>
    </View>
  );
};
export default Main;

export const page = StyleSheet.create({
  Center: {
    marginLeft: 'auto',
    marginBottom: 'auto',
    marginTop: 'auto',
    marginRight: 'auto',
  },
  MediumText: {
    margin: heightToDp('1'),
    marginLeft: widthToDp('3'),
  },
  IconColor: {
    color: 'green',
  },
  IconSize: 40,
});
