import {useNavigation} from '@react-navigation/native';
import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {heightToDp, widthToDp} from '../../responsive';
import {appStyle} from '../../styles/styles';

const BottomSaveComponent = ({
  steps,
  input,
  remark,
  totalSteps,
  updateChkLst,
  saveAnswer,
  full,
  complete,
  goBack,
  showAlert,
}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        height: heightToDp('12'),
        
        // width: widthToDp('96'),
        width:'100%',
        // marginBottom: heightToDp('1'),
        // paddingBottom:heightToDp('10'),
        position: 'absolute',
        backgroundColor:'white',
        // backgroundColor:'red',
        // marginRight:14,
        borderTopWidth:0.3,
        borderColor:'rgba(145, 158, 171, 0.32)',

      
      
        bottom: 0,
        left:0,
        // right:2
      }}>
      <View
        style={{
          flexDirection: 'row',
          // margin: widthToDp('3'),
          marginVertical:widthToDp('3'),
        

          justifyContent: 'space-between',
          marginHorizontal:widthToDp('3'),
        
         
        }}>
        <TouchableOpacity
          onPress={() => {
            showAlert(false);
            if (full) {
              goBack();
            } else if (steps != 0) {
              updateChkLst(steps - 1);
            } else {
            }
          }}>
          <View
            style={[
              appStyle.buttonShadow,
              {
                height: heightToDp('7'),
                width: widthToDp('12'),
                backgroundColor: steps == 0 ? '#F4F6F8' : 'white',
                borderRadius: 10,
              },
            ]}>
            <Image
              source={
                steps == 0
                  ? require('../Assets/backLight512w.png')
                  : require('../Assets/back512w.png')
              }
              style={[
                {
                  width: widthToDp('4'),
                  height: heightToDp('2'),
                },
                appStyle.centrailView,
              ]}
            />
          </View>
        </TouchableOpacity>
        {totalSteps != steps + 1 && (
          <TouchableOpacity
            onPress={() => {
              showAlert(false);
              if (totalSteps != steps + 1) {
                updateChkLst(steps + 1);
              }
            }}>
            <View
              style={[
                appStyle.buttonShadow,

                {
                  height: heightToDp('7'),
                  width: widthToDp('12'),
                  backgroundColor: 'white',
                  borderRadius: 10,
                },
              ]}>
              <Image
                source={require('../Assets/forward512w.png')}
                style={[
                  {width: widthToDp('4'), height: heightToDp('2')},
                  appStyle.centrailView,
                ]}
              />
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => {
            console.log('hgfgfd', steps, totalSteps, full);
            if (!input) {
              showAlert(true);
              return;
            } else if (full == 1) {
              if(!remark){
                showAlert(true);
                return
              }
              complete(1);
            } else if (steps == totalSteps - 1) {
              complete(0);
            } else {
              saveAnswer(steps + 1);
            }
            showAlert(false);
          }}
          style={{
            height: heightToDp('7'),
            // width: widthToDp('58'),
            width:widthToDp('55'),
            backgroundColor: '#229A16',
            // backgroundColor:'red',
            borderRadius: 20,
          }}>
          <Text
            style={[
              appStyle.centrailView,
            
              {color: 'white', fontWeight: '700',fontSize:widthToDp('3.8')},
            ]}>
            {full ? 'Save and Complete' : 'Save & proceed'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default BottomSaveComponent;
