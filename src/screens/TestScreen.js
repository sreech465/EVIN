import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Platform,
  
} from 'react-native';
import WebView from 'react-native-webview';
import { Mp4 } from '../Icon/Icon';
import {heightToDp, widthToDp} from '../responsive';
import BackButon from './components/BackButon';
import Video from 'react-native-video';


export const FileViewer = props => {

  const navigation = useNavigation();

  const {url, name,extension} = props.route.params;
  console.log(url,'hiiiiii')

  const base = 'https:drive.google.com/viewerng/viewer?embedded=true&url=';

  

  // return extension!=='mp4' && Platform.OS=='android'  ?  (
    return extension !=='mp4' || Platform.OS==='ios' ?(
    <View
  
    >
      <View
        style={{
          position: 'absolute',
          zIndex: 100,
          left: '7%',
          top: Platform.OS == 'android' ? '0.8%' : '3.6%',
        }}>
        <BackButon navigation={() => navigation.goBack()} />
      </View>

      <View
        style={{
          height:Platform.OS==='android'? heightToDp('10'):heightToDp('13'),
          width: '100%',
          backgroundColor: '#132D4B',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        
        <Text
          style={{
            fontSize: 14,
            color: 'white',
            width: '55%',
            alignSelf: 'center',
            textAlign: 'center',
            marginTop: Platform.OS == 'android' ? 0 : heightToDp('4'),
          }}>
          {name}
        </Text>
      </View>
      {console.log(!extension.includes('jpeg'))}
      {!extension.includes('png') && !extension.includes('jpeg') ?
      <View
        style={{
          margin: widthToDp('0'),
          padding: widthToDp('0'),
          height: heightToDp('100'),
        }}>
        <WebView
          source={{
            uri:
              Platform.OS === 'android'
                ? `http://docs.google.com/gview?embedded=true&url=${url}`
                : url,
          }}
          style={{width: '100%', height: '100%'}}
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
      </View>:
         <View
         style={{
           margin: widthToDp('0'),
           height: heightToDp('70'),
           width:'100%'
         }}>
         <Image
           source={{uri: url}}
           style={{
             width: '100%',
             height: '100%',
             resizeMode: 'contain',
          
           }}
         />
       </View>


            }
    </View>
  ):
  <View
  >
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
          <Text style={{color:'white',fontSize:20}} >Video</Text>
          </View>

          <View style={{backgroundColor:'gray',height:600}} >
            <Video

            source={{uri:'https://portalenablingwindiag.blob.core.windows.net/enabling-storage/file_example_MP4_1280_10MG.mp4-OEMSOL25072022-052818.mp4'}}
   
                style={styles.video}
                onLoad={()=>console.log('haii')}
                onLoadStart={()=>console.log('video load started')}

                onProgress={()=>console.log('running...')}
                controls={true}
                
                // fullscreen={true}
                // poster={'https://tse3.mm.bing.net/th?id=OIP.CXPhGOOmJdWVk4MrsltTlAHaEJ&pid=Api&P=0'}
                posterResizeMode='contain'
                onError={(er)=>console.log(er)}

            />
          </View>

   
          {/* "react-native-video": "^5.2.0", */}
  </View>

// https://www.swarovski.ae/on/demandware.static/-/Sites-swarovski-master-catalog/default/dw9793d8aa/images/model/5552783.mp4

//  <View style={styles.videoContainer}>
//   {/* {console.log(url)} */}
// <Video
//     source={{uri:'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}
//     // source={{uri:'https://www.appsloveworld.com/wp-content/uploads/2018/10/sample-mp4-video.mp4'}}
//     // source={{uri:url}}



//     style={styles.video}
//     onError={(err)=>console.log('video not playable',err)}
//     onVideoLoad={()=>console.log('waitt')}
//     onBuffer={()=>console.log('buffering..')} 
//     onEnd={()=>console.log('haii')}
//     onLoadStart={() => {
//       console.log('onLoadStart', new Date());
//     }}
//     onLoad={() => 
//       // console.log('onLoad', new Date())
//       <ActivityIndicator
//       color={'red'}
//       size="large"
//       style={{
//         position: 'absolute',
//         width: '100%',
//         height: '100%',
//         backgroundColor: 'white',
//         alignSelf: 'center',
//         justifyContent: 'center',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         zIndex: 10,
//         elevation: 1000,
//       }}
//     />
      
//     }


//     onProgress={()=>console.log('haii')}
//     renderLoading={() => (
//       console.log('load...')
      
//     )}
  
//     ref={()=>console.log('haii')}
    
    

// />

//   </View> 
 
  







};

export default FileViewer;
var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height:'1'
  },
  videoContainer: {
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'black',
    flex:1
},
video: {
    position: 'absolute',
    top: '40%',
    bottom: 0,
    left: '20%',
    right: 0,
},
});

export const formats = [
  'https://portalenablingwindiag.blob.core.windows.net/enabling-storage/file_example_PNG_500kB.png-OEMSOL25072022-052818.png', //png 0
  'https://portalenablingwindiag.blob.core.windows.net/enabling-storage/file-sample_1MB.doc-OEMSOL25072022-052818.doc', //doc 1
  'https://portalenablingwindiag.blob.core.windows.net/enabling-storage/Notifications--Updated-stacey-4.25.22-(2).pptx-OEMSOL25072022-052818.pptx', //pptx 2
  'https://portalenablingwindiag.blob.core.windows.net/enabling-storage/PDF-3-Book.pdf-OEMSOL17062022-084829.pdf', //pdf 3
  'https://portalenablingwindiag.blob.core.windows.net/enabling-storage/file_example_MP4_1280_10MG.mp4-OEMSOL25072022-052818.mp4', //mp4 4
  'https://portalenablingwindiag.blob.core.windows.net/enabling-storage/Maintenance-Manual-OEMSOL04082021-051711.xlsx', //xlsx 5
  'https://portalenablingwindiag.blob.core.windows.net/enabling-storage/Sanitation-Manual-OEMSOL04082021-051849.docx', //docx 6
  'https://portalenablingwindiag.blob.core.windows.net/enabling-storage/Troubleshoot-Guide-OEMSOL04082021-051849.xlb', // xlb 7
  'https://portalenablingwindiag.blob.core.windows.net/enabling-storage/installation_guidelines_S_13072021-141105.jpg', //jpg 8
];
              //  `https:drive.google.com/viewerng/viewer?embedded=true&url=${formats[0]}`

{
  /* <WebView source={{ uri:
      //  `https:drive.google.com/viewerng/viewer?embedded=true&url=${formats[0]}`
       `http://docs.google.com/gview?embedded=true&url=${formats[3]}`
    }} 
      style={{width:'100%'}}
      /> */
}

// {
//     visible ?
//       <WebView source={{ uri:
//        // `https:drive.google.com/viewerng/viewer?embedded=true&url=${formats[0]}`
//        `http://docs.google.com/gview?embedded=true&url=${formats[1]}`
//     }}
//       style={{width:'100%'}}
//       />
// :
//       <View>
//        <Text>haii</Text>
//       </View>

//     }

{
  /* <Button onPress={() => OpenAnything.Call('+917095373638').catch(err => console.error('error'))} title='button' >
     
        
        </Button>
        <Button onPress={() => Text('+917095373638', 'Can you please call me!')} title='text' /> */
}

{
  /* <Button onPress={() => OpenAnything.Web('https://portalenablingwindiag.blob.core.windows.net/enabling-storage/multiple_S_20042022-172022.pdf')}  title='vicj'/> */
}
