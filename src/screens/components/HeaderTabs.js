import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Platform,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {act} from 'react-test-renderer';
import {widthToDp} from '../../responsive';
import {appStyle, styles} from '../../styles/styles';

const HeaderTabs = props => {
  const [activeTab, setActiveTab] = useState('Process Line');
  const [currentTab, setCurrentTab] = useState('Process Line');

  useEffect(() => {
    props.Tab(currentTab);
  }, [currentTab]);
  const CurrentTab = tab => {
    setCurrentTab(tab);
  };

  return (
    <View style={{backgroundColor: styles.centralColor, padding: 15}}>
      <View style={styles1.headerView}>
        <HeaderButton
          text="Process Line"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          btncolor="white"
          setCurrentTab={CurrentTab}
        />
        <HeaderButton
          text="Equipment"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          btncolor="gray"
          setCurrentTab={CurrentTab}
        />
      </View>
    </View>
  );
};
export default HeaderTabs;

const HeaderButton = props => {
  return (
    <TouchableOpacity
    style={[
      styles1.headerText,
      {backgroundColor: props.activeTab === props.text ? 'white' : '#919EAB',borderRadius:15}]} onPress={() => {
        props.setActiveTab(props.text);
        props.setCurrentTab(props.text);
      }} >
    <Text
    style={appStyle.SubTitle2}
      >
      {props.text==='Process Line'?"Process Lines":"Equipment"}
    </Text>
    </TouchableOpacity>
  );
};

const styles1 = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
  

    width: widthToDp('85'),
    justifyContent: 'space-evenly',
    backgroundColor: '#919EAB',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 20,
  
  },
  headerText: {
    color: 'black',

    paddingVertical: 10,
    paddingHorizontal:Platform.OS==='android'? widthToDp('8'):widthToDp('7.8'),
  

    margin: widthToDp('1.5'),
    width: widthToDp('40'),
    alignItems:"center"
  },
});
