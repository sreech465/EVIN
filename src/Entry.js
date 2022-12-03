import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ReSolveAuth} from './redux/login_credentials/action';
import Login from './screens/Login';
import {connect} from 'react-redux';
import EquipmentDetail from './screens/EquipmentDetail';
import Main from './main';
import Menu from './screens/Menu';
import Navigation from './screens/Navigation/Navigation';
import SplashScreen from 'react-native-splash-screen';
import {useSelector,useDispatch} from 'react-redux';
import ForgotPassword from './screens/ForgotPassword';

const Entry = () => {
  const token = useSelector(
    state => state.LoginReducer.data.access_token,
  );
  const dispatch = useDispatch();
  const StartStack = createStackNavigator();


  console.log(token,"kikikiki9090")
 

  useEffect(() => {
   dispatch(ReSolveAuth(()=>{}));
   setTimeout(() => SplashScreen.hide(),1000);
  }, []);

  return (
    <>
      <NavigationContainer>
        <StartStack.Navigator>
         

          {
           !token
           ? (
            <>
          
              <StartStack.Screen
                name="BeforeAuth"
                component={BeforeAuth}
                options={{headerShown: false}}
              />
             
            </>
          ) : (
            <>
              <StartStack.Screen
                name="navigation"
                component={Navigation}
                options={{headerShown: false}}
              />
                
              
            </>
          )}
        </StartStack.Navigator>
      </NavigationContainer>
    </>
  );
};


export default Entry


const HomeStack = createStackNavigator();
const HomeScreens = () => (

    <HomeStack.Navigator initialRouteName={"home"}>
      <HomeStack.Screen name="home" component={Main} options={{ headerShown:false }} />   
      <HomeStack.Screen name="menu" component={Menu} options={{ headerShown:false }} />  
      <HomeStack.Screen name="equipmentDetails" component={EquipmentDetail} options={{ headerShown:false }} />     
  
    </HomeStack.Navigator>

  )


export  function BeforeAuth() {
    const StartStack = createStackNavigator();
  return (
    <StartStack.Navigator initialRouteName="Login">


      <StartStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
        <StartStack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
    
    
    
    
     
        
      
    </StartStack.Navigator>
  )
}


