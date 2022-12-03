import React, { Component } from 'react'
import { Button, Text, View } from 'react-native'
import WebView from 'react-native-webview'
import * as OpenAnything from 'react-native-openanything';

export const Test=() => {
  
    return (
      <View style={{backgroundColor:'white',flex:1}} >
        <Text> textInComponent </Text>
        {/* <WebView source={{ uri: 'http://www.africau.edu/images/default/sample.pdf' }} 
        style={{width:'100%'}}
        /> */}
                <Button onPress={() => OpenAnything.Web('https://portalenablingwindiag.blob.core.windows.net/enabling-storage/multiple_S_20042022-172022.pdf')}  title='vicj'/>
    
      

        {/* <Button onPress={() => OpenAnything.Call('+917095373638').catch(err => console.error('error'))} title='button' >
     
        
        </Button>
        <Button onPress={() => Text('+917095373638', 'Can you please call me!')} title='text' /> */}
      </View>
    )
  
}

export default Test

