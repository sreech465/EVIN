import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Menu from '../Menu';
import Main from '../../main';
import EquipmentDetail from '../EquipmentDetail';
import DocumentScreen from '../DocumentScreen';

import SparePartScreen from '../SparePartsScreen';

import MaintenenceScreen from '../Maintenence_screens/MaintenenceScreen1';
import CheckList1 from '../Maintenence_screens/CheckList1';
import CheckList2 from '../Maintenence_screens/CheckList2';
import CheckList3 from '../Maintenence_screens/CheckList3';
import ProjectList from '../ProjectList';
import ProjectDetailScreen from '../ProjectDetailScreen';
import FileView from '../components/FileView';
import Login from '../Login';
import MaintenanceDetails from '../Maintenence_screens/MaintananceDetail';
import Test from '../../../Test';
import TestScreen, { FileViewer } from '../TestScreen';
import ImageViwer from '../components/ImageViewer';
import { AndroidFileView } from '../components/AndroidFileView';
import QrCodeScreen from '../QrCodeScreen';
import ProcessLineDetails from '../ProcessLineDetails';

const Navigation = props => {
  const StartStack = createStackNavigator();

  return (
    // <Provider  store={store}  >

    <StartStack.Navigator initialRouteName="Main">


      <StartStack.Screen
        name="Main"
        component={Main}
        options={{headerShown: false}}
      />
      <StartStack.Screen
        name="Menu"
        component={Menu}
        options={{headerShown: false}}
      />
      <StartStack.Screen
        name="EquipmentDetails"
        component={EquipmentDetail}
        options={{headerShown: false}}
      />
      <StartStack.Screen
        name="Documents"
        component={DocumentScreen}
        options={{headerShown: false}}
      />
      <StartStack.Screen
        name="SpareParts"
        component={SparePartScreen}
        options={{headerShown: false}}
      />
      <StartStack.Screen
        name="Maintenence"
        component={MaintenenceScreen}
        options={{headerShown: false}}
      />
      <StartStack.Screen
        name="CheckList1"
        component={CheckList1}
        options={{headerShown: false}}
      />
      <StartStack.Screen
        name="CheckList2"
        component={CheckList2}
        options={{headerShown: false}}
      />
      <StartStack.Screen
        name="CheckList3"
        component={CheckList3}
        options={{headerShown: false}}
      />
      <StartStack.Screen
        name="ProjectList"
        component={ProjectList}
        options={{headerShown: false}}
      />
      <StartStack.Screen
        name="ProjectDetail"
        component={ProjectDetailScreen}
        options={{headerShown: false}}
      />
      <StartStack.Screen
        name="FileView"
        component={FileView}
        options={{headerShown: false}}
      />
      <StartStack.Screen
        name="MaintenanceDetails"
        component={MaintenanceDetails}
        options={{headerShown: false}}
      />
        <StartStack.Screen
        name="ImageViewer"
        component={ImageViwer}
        options={{headerShown: false}}
      />
        <StartStack.Screen
        name="AndroidFileView"
        component={AndroidFileView}
        options={{headerShown: false}}
      />
        <StartStack.Screen
        name="Test"
        component={Test}
        options={{headerShown: false}}
      />
       <StartStack.Screen
        name="FileViewer"
        component={FileViewer}
        options={{headerShown: false}}
      />
       <StartStack.Screen
        name="QrCode"
        component={QrCodeScreen}
        options={{headerShown: false}}
      />
        <StartStack.Screen
        name="ProcessLineDetail"
        component={ProcessLineDetails}
        options={{headerShown: false}}
      />
      
    </StartStack.Navigator>
    // </Provider>
  );
};
export default Navigation;
