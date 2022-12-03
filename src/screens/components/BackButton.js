import React from "react"
import { View ,TouchableWithoutFeedback,Image} from "react-native"
import { Back } from "../../Icon/Icon"
import { heightToDp, widthToDp } from "../../responsive"
import { appStyle } from "../../styles/styles"

const BackButton=(props)=>{
    return(
        <View
            style={[
              {
              height: heightToDp('4.5'),
              width: heightToDp('4.5'),
              backgroundColor: 'white',
              position: 'absolute',
              marginLeft:5,
              top:'5%',
              left: widthToDp('3'),
              borderRadius: widthToDp('2'),
              justifyContent:"center",
              alignItems:"center"
             
            }]}
            onPress={() => console.log('hai')}>
            <TouchableWithoutFeedback
             onPress={props.navigation}
            
            
            >

              {/* <Back/> */}
              <Image
              
                source={require('../../Icon/icons/back.png')}
                style={[
                  appStyle.centerHorizontal,
                  {resizeMode: 'cover',position:'absolute',},
                ]}
              />
            </TouchableWithoutFeedback>
          </View>
    )
}

export default BackButton;