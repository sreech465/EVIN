

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import Entry from './src/Entry';
import store from './src/redux/store';
import DocumentScreen from './src/screens/DocumentScreen';
import Login from './src/screens/Login';



const App = () => {



  return (
    
    <Provider store={store} >
      <Entry/>
     
  
    </Provider>
  );
};

export default App;
