import React  from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import WebView from 'react-native-webview'

export const AndroidFileView =(props)=> {
    const {url}=props.route.params
    console.log(url)
const file='https://portalenablingwindiag.blob.core.windows.net/enabling-storage/Sanitation-Manual-OEMSOL04082021-051849.docx'
    return (
      <View>
        <View style={{padding:20,backgroundColor:'red'}} >
        <Text>AndroidFileView</Text>
        <WebView source={{ uri:

       `http://docs.google.com/gview?embedded=true&url=${file}`
    }} 
      style={{width:'100%'}}
      originWhitelist={['*']}
              startInLoadingState={true}
              renderLoading={() => (
                <ActivityIndicator
                  color='#132D4B'
                  size="large"
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'white',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 10,
                    elevation: 1000,
                  }}
                />
              )}
      />

        </View>
       
      </View>
    )
  
}
