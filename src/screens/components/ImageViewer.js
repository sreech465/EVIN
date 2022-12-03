import React, {useState} from 'react';
import {Button, StyleSheet, Text, View, Image} from 'react-native';
import { widthToDp,heightToDp } from '../../responsive';


export const ImageViwer = ({route}) => {
  const [viewer, setViewer] = useState(false);

  const{format}=route.params

  const formats = [
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
  const base = 'https:drive.google.com/viewerng/viewer?embedded=true&url=';
  console.log(format)
  return(
    <View style={{display: 'flex'}}>
    <Button
      title={'Your Viewing'+' '+format.slice(format.length - 3)}
    // title='haii'
      color="#132D4B"  ></Button>
    <View
      style={{
        margin: widthToDp('0'),
        height: heightToDp('70'),
        width:'100%'
      }}>
      <Image
        source={{uri: format}}
        style={{
          width: '100%',
          height: '100%',
          resizeMode: 'contain',
       
        }}
      />
    </View>
  </View>
  )

//   return viewer ? (
//     <View style={{backgroundColor: 'white', flex: 1}}>
//       <Button
//         onPress={() => setViewer(false)}
//         title={formats[0].slice(formats[0].length - 3)}
//         color="#132D4B"></Button>
//     </View>
//   ) : (
//     <View style={{display: 'flex'}}>
//       <Button
//         title={props.image.slice(formats[0].length - 3)}
//         color="#132D4B"></Button>
//       <View
//         style={{
//           margin: widthToDp('0'),
//           padding: widthToDp('10'),
//           height: heightToDp('70'),
//         }}>
//         <Image
//           source={{uri: formats[0]}}
//           style={{
//             width: '100%',
//             height: '100%',
//             resizeMode: 'center',
//             borderLeftWidth: 2,
//             borderColor: 'red',
//           }}
//         />
//       </View>
//     </View>
//   );
};

export default ImageViwer;
