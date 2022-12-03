import { useNavigation } from '@react-navigation/native';
import React, {Component, useState} from 'react';
import {Text, View, TouchableOpacity, Image, SafeAreaView} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {heightToDp, widthToDp} from '../../responsive';
import {appStyle, styles} from '../../styles/styles';
import Navigation from '../Navigation/Navigation';

const CloseImage = require('../Assets/close2x.png');

const MaintenanceTop = ({data,Eqname,dsrc,full, steps, totalSteps, updateChkLst,maxsteps}) => {


  const [drpDwn,setDrpdwn]=useState(false)
  const navigation=useNavigation()
  const ProgressBar = color => (
    <View
      style={{
        height: 4,
        backgroundColor: color,
    
        borderRadius: 20,
        flex: 1,
        marginRight: widthToDp('1'),
      }}></View>
  );


const dropDown=()=>{
  console.log(!drpDwn,drpDwn)
  setDrpdwn(true)
}


  const renderBar = () => {
    return data.field_entries.map((item, index) => {
      if(full){
        if (item.complete_status == true) {
          return ProgressBar('#54D62C');
        } 
        else if (item.complete_status == false) {
          return ProgressBar('#FF4842');
      }  
      }
      else{
        if (steps == index) {
          return ProgressBar('#FFFFFF');
          }
          else if(index<=maxsteps){
            if (item.complete_status == true) {
              return ProgressBar('#54D62C');
            } 
            else if (item.complete_status == false) {
              return ProgressBar('#FF4842');
          }  
          }
         
  
         else {
          return ProgressBar('#454F5B');
        }
      }
        
    });
  };
  return (
   
      <SafeAreaView
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          marginVertical: heightToDp('1'),
          marginTop: heightToDp('2'),
          // backgroundColor:'red',
        

          width: '85%',
        }}>
        <View style={{flexDirection: 'row',marginVertical:heightToDp('2')}}>
          <View style={{flex: 1}}>
            <Text style={[appStyle.H6,{color:'#FFFFFF'}]}>{data.checklist_name}</Text>
          </View>
          <View style={{flex: 0.2}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Maintenence')}
              style={appStyle.centrailView}>
              <Image
                resizeMode="contain"
                source={CloseImage}
                style={{width: widthToDp('8'), height: heightToDp('4')}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flexDirection: 'row',marginBottom:heightToDp('1')}}>
          <View style={{flex: 1}}>
            <Text style={appStyle.caption}>Equipment</Text>
            <Text style={[appStyle.body2Text, {color: 'white'}]}>
              {Eqname}{' '}
            </Text>
          </View>
          <View style={{flex: 0.7}}>
            <View style={{flexDirection:'row'}} > 
            <Text style={appStyle.caption}>Frequency</Text>



            <TouchableOpacity

            onPress={()=>{setDrpdwn(!drpDwn)}}
            // style={{position:'absolute',left:widthToDp('26')}}
            style={{width:widthToDp('9'),height:heightToDp('4.5'),
          
            backgroundColor: drpDwn?  'rgba(0, 0, 0, 0.48)':styles.centralColor
            ,alignItems:'center',justifyContent:'center',marginLeft:'auto',marginRight:widthToDp('3'),borderRadius:10,
          position:'absolute',left:widthToDp('23'),bottom:heightToDp('-2')
          
          }}
             >



              {drpDwn?
               <Image

            
                source={require('../../Icon/icons/uparrow.png')}
                style={{
                  resizeMode: 'center',
              
                  
                }} 
              /> 
              :
              <Image

            
              source={require('../../Icon/icons/down.png')}
              style={{
                resizeMode: 'center',
            
                
              }} 
            /> 
              
            }

            </TouchableOpacity>
          
           

              
            </View>
            <Text style={[appStyle.body2Text, {color: 'white'}]}>
              {data.checklist_type_name}
            </Text>
          

         

        
          </View>
        </View>
        {dsrc!=null  && drpDwn?  <View style={{marginBottom:heightToDp('0')}}>
            <Text style={appStyle.caption}>Description</Text>
            <ScrollView style={{height:heightToDp('22')}}  >
            <Text style={[appStyle.body2Text, {color: 'white'}]}>
              {dsrc}
            </Text>

            </ScrollView>
           
          </View>:null}
      <View  style={{marginVertical:heightToDp('1.5')}} >
      <View style={{flexDirection: 'row', justifyContent: 'space-between',marginVertical:heightToDp('0')}}>
          <Text style={[appStyle.SubTitle2, {color: 'white'}]}>
            Completion Status
          </Text>
          <Text style={[appStyle.SubTitle2, {color: 'white'}]}>
            ({steps + 1} of {totalSteps} tasks){' '}
          </Text>
        </View>

    
      
        <View style={{flexDirection: 'row', marginTop: heightToDp('1')}}>
          {renderBar('white')}
        </View>
        </View>
      </SafeAreaView>
  
  );
};

export default MaintenanceTop;
