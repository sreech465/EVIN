import React from 'react'
import { Text, View,Image } from 'react-native'
import { heightToDp } from '../../responsive'
import { appStyle } from '../../styles/styles'

const Options=()=>  {

    return (
        <View  style={[
                        
            {shadowColor: "#000",
shadowOffset: {
width: 0,
height: 1,
},
shadowOpacity: 0.22,
shadowRadius: 2.22,

elevation: 3,
borderRadius:20}
,{flexDirection:'row',backgroundColor:'white',height:heightToDp('8'),marginTop:heightToDp('2'),width:'100%'}]}>
            <View style={{flex:1,backgroundColor:'white',borderRadius:20}} >
                <View style={[appStyle.centrailView,{width:'40%',height:'45%',borderRadius:50,borderColor:'gray',borderWidth:1}]} >
                    <Image

                    source={require('../Assets/tick1x.png')}
                    style={[{resizeMode:'contain',marginLeft:'auto',marginRight:'auto',marginTop:'auto',marginBottom:'auto'}]}
/>

                </View>


            </View>
            <View style={{flex:4}} >  
            <Text style={[appStyle.SubTitle1,{marginTop:"auto",marginBottom:'auto'}]} >Yellow</Text>

</View>

        </View>
    )
  
}

export default Options
