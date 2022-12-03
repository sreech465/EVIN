import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {Back} from '../../Icon/Icon';
import {heightToDp, widthToDp} from '../../responsive';
const BackButon = props => {


  // console.log(props,"ji")

  return (
    
      <TouchableOpacity 
      onPress={props.navigation}
        style={{
          backgroundColor: 'white',
          width: heightToDp('4.6'),
          height: heightToDp('4.6'),
          borderRadius: widthToDp('2'),
          marginTop: heightToDp('2'),
          justifyContent: 'center',
          alignItems: 'center',
         
        }}
      >
        <Back  />
      </TouchableOpacity>
  );
};
export default BackButon;
