import React from 'react';
import {Text, View, ActivityIndicator, StatusBar, Platform} from 'react-native';
import WebView from 'react-native-webview';
import {heightToDp} from '../../responsive';
import {appStyle, styles} from '../../styles/styles';
import BackButon from '../components/BackButon';

const FileView = ({route, navigation}) => {
  console.log('hgfvghjvb', route.params.url);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          position: 'absolute',
          zIndex: 100,
          left: '7%',
          top: Platform.OS == 'android' ? '0.8%' : '2%',
        }}>
        <BackButon navigation={() => navigation.goBack()} />
      </View>

      <View
        style={{
          height: heightToDp('10'),
          width: '100%',
          backgroundColor: '#132D4B',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* <Image source={require('./../Icon/icons/logo_text.png')}
        style={{height:widthToDp('30'),width:widthToDp('30'),resizeMode:'contain'}}
        
        /> */}
        <Text
          style={{
            fontSize: 14,
            color: 'white',
            width: '55%',
            alignSelf: 'center',
            textAlign: 'center',
            marginTop: Platform.OS == 'android' ? 0 : heightToDp('4'),
          }}>
          {route.params.name}
        </Text>
      </View>
      <WebView
        source={{
          uri:
            Platform.OS === 'ios' || route.params.url.includes('.png')
              ? route.params.url
              : `https://drive.google.com/viewerng/viewer?embedded=true&url=${route.params.uri}`,
        }}
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
  );
};

export default FileView;
