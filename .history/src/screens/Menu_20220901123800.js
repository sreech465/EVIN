import axios from 'axios';
import React, {useEffect, useState} from 'react';

import {
  SafeAreaView,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Overlay } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {useSelector,useDispatch} from 'react-redux';
import { getEquipmentData, getProcesslineData, Process_more_action } from '../redux/login_credentials/action';
import {heightToDp, widthToDp} from '../responsive';

import {appStyle, styles} from '../styles/styles';
import BottomNavigation from './components/BottomNavigator';
import CustomSearchBar from './components/CustomSearchBar';
import Equipment from './components/Equipment';
import HeaderTabs from './components/HeaderTabs';
import Item from './components/Item';


export const process_page=1
const CloseImage = require('./Assets/close2x.png');


const arrobj=[
  {name:'hyd',
id:1},
{name:'hyd',
id:2},
{name:'hyd',
id:3},
{name:'hyd',
id:4},
]



const loc =[
  
  'location1',
  'location2',
  'location3',
  'location4',
  'location5',




]

const Menu = (props) => {
  // console.log(props,"haiiiii09090")
  const dispatch=useDispatch()
  const[processArray,setProcessArray]=useState( useSelector(
    state => state.ProcessAndEquipmentReducer?.ProcessLineData,
  ))

  const [popshow,setpopshow]=useState(false)

const [customList,setCustomList]=useState([])
const[choosedList,setChoosedList]=useState([])
  const[EquipmentArray,setEquipmentArray]=useState([EquipmentData])
  const[processView,setProcessView]=useState(false)
  const ProcessData =useSelector(
    state => state.ProcessAndEquipmentReducer?.ProcessLineData,
  );
  const P_E_Reducer= useSelector(
    state => state.ProcessAndEquipmentReducer,
  );
  // console.log(P_E_Reducer,"pdata----------------------")

  const EquipmentData = useSelector(
    state => state?.ProcessAndEquipmentReducer?.EquipmentData,
  );
  const access_token = useSelector(
    state => state.LoginReducer.data.access_token,
  );
  //  console.log(EquipmentData,'Edata')

  const [tab, setTab] = useState('Process Line');
  const tabs = data => {
    setTab(data);
  };


  useEffect(()=>{
if(arrobj){
  let dataListNow=arrobj;
  dataListNow.map(item=>item.checked=false)
  setCustomList(dataListNow)
}

  },[arrobj])





  useEffect(()=>{
    console.log(ProcessData,ProcessData.length,"--------pppp")
    console.log(EquipmentData,EquipmentData.length,"--------eeee")
    },[ProcessData,EquipmentData])


  useEffect(()=>{
  

    
    if(tab==="Process Line"){
      if(ProcessData.length>0){
        setProcessArray(ProcessData)
        // setProcessView(true)
  
  
      }
      
    }else{
      if(EquipmentData.length>0){
        setEquipmentArray(EquipmentData)
      }
    }


    console.log(tab)


  },[tab])


  const selectedItem=(item)=>{
    let customListNow=[...customList];
    for(const val in customListNow){
      if(customListNow[val].id===item.id){
        if(customListNow[val].checked!=true){
          customListNow[val].checked=true
          let itemChoosed=customListNow[item]
          setChoosedList([itemChoosed])
        }else{
          customListNow[val].checked=false
          let itemChoosed=customListNow[item]
          setChoosedList([itemChoosed])

        }
      }
      else{
        customListNow[val].checked=false
       
    
      }
    }
    setCustomList(customListNow)
  
  }



  useEffect(()=>{
    console.log(customList,'----------')

  },[customList])



  const renderLoad=()=>{
    return(
      <View>
        <ActivityIndicator/>
      </View>
    )
  }

  const locationView=()=>{
    return(
      <View style={{padding:10,backgroundColor:'red',width:widthToDp('26'),alignItems:'center',marginRight:widthToDp('3')}} >
      <Text style={appStyle.body1} >Location</Text>
       
      </View>
    )
  }

  const loadMoreProcess=()=>{
    // console.log('loadMore/....')
    console.log('loadMore/....e',P_E_Reducer.c2)
    
    dispatch(getProcesslineData(access_token,P_E_Reducer.c1,''))
  

  }
  const loadMoreEqupmt=()=>{
    console.log('loadMore/....e',P_E_Reducer.c2)

    
    dispatch(getEquipmentData(access_token,P_E_Reducer.c2,''))
  }


  return (
    <>
      <SafeAreaView style={{backgroundColor:styles.centralColor}} >
        <HeaderTabs Tab={tabs} />
        <View
          style={{
            backgroundColor: '#F4F7FF',
          
            borderTopLeftRadius: widthToDp('8'),
            borderTopRightRadius: widthToDp('8'),
          }}>
          <CustomSearchBar
            data={tab === 'Equipment' ? EquipmentData : ProcessData}
            tab={tab}
            popshow={popshow}
            setpopshow={setpopshow}
          />


      
          {tab === 'Process Line' ? (
            
            ProcessData !== undefined && ProcessData.length > 0 ? (
          
<View  style={{marginBottom: Platform.OS=='ios' ?heightToDp('52'):heightToDp('60')}} >

              <FlatList
              bounces={false}
              keyExtractor={(item, index) => String(index)}
              showsVerticalScrollIndicator={false}
              onEndReached={loadMoreProcess}
              onEndReachedThreshold={0.75}
              data={
                  ProcessData}
            
                renderItem={item => {
            
                  
               
         

                
               
                  
                  
                  return (
                    <View style={{backgroundColor:
               
                
                    
                    '#F4F7FF'
                    }
                    }>
                      <View
                        style={[{
                          marginBottom: heightToDp('2'),

                          backgroundColor: '#FFFFFF',
                        

                          elevation: 4,
                          borderRadius: widthToDp('5'),
                          marginHorizontal: widthToDp('7'),
                        },appStyle.homeShadow]}>
                        <Item item={item} />
                      </View>
                    </View>
                  );
                }}
              // ListFooterComponent={renderLoad}
           
              />
              </View>
            ) : (
              <View style={{backgroundColor: '#f5f5f5', alignItems: 'center',flex:1,backgroundColor:'gray'}}>
                <Text style={{color: 'black'}}>No data found</Text>
                {/* <ActivityIndicator /> */}
              </View>
            )
          ) : (
            <View style={{paddingBottom:460}}>
              {EquipmentData !== undefined && EquipmentData.length > 0 ? (
                <FlatList
                  bounces={false}
                  keyExtractor={(item, index) => String(index)}
                  showsVerticalScrollIndicator={false}
                  data={
                      EquipmentData}
                  onEndReached={loadMoreEqupmt}
                  onEndReachedThreshold={0.75}
                  renderItem={item => {
                    return (
                      <View style={{backgroundColor: '#F4F7FF'}}>
                        <View
                          style={[{
                            marginBottom: heightToDp('2'),

                            backgroundColor: '#FFFFFF',
  
                            elevation: 4,
                            borderRadius: widthToDp('5'),
                            marginHorizontal: widthToDp('7'),
                          },appStyle.homeShadow]}>
                          <Equipment item={item} />
                        </View>
                      </View>
                    );
                  }}
                />
              ) : null}
            </View>
          )}






        </View>


       

      </SafeAreaView>
      <BottomNavigation/>




      <Overlay
        animationType="slide"
        onRequestClose={() => {
          setpopshow(false);
        }}
        isVisible={popshow}
        // isVisible={true}
        windowBackgroundColor={'rgba(0, 0, 0, 0.6)'}
        containerStyle={{
          marginBottom: 200,
          borderRadius: 10,
        }}
        fullScreen
        transparent
        overlayStyle={[
          {
            padding: 0,
            marginTop: heightToDp('100'),
            width: '100%',
            height: '120.00%', //Platform.OS==='ios'?'15.88%':'13.88%',
            borderRadius: 10,
            overflow: 'hidden',
            elevation: 10,
          },
        ]}>
         <View style={{marginTop:heightToDp('2'),marginHorizontal:widthToDp('7'),flexDirection:'row'}} >
          <Text style={[appStyle.H5Text,]} >Filters</Text>
          <TouchableOpacity
                style={{marginLeft:'auto',marginRight:widthToDp('0')}}
                        onPress={() =>setpopshow(false)} 
              >
   
              <Image
                resizeMode="contain"
                source={CloseImage}
                style={{width: widthToDp('8'), height: heightToDp('4'),marginLeft:widthToDp('26')}}
              
            
              />
              </TouchableOpacity>

        
          
         </View>
         <View
          style={{
            width: '100%',
            backgroundColor: '#F4F6F8',
            height: heightToDp('0.3'),
            marginVertical:heightToDp('1')
          }}></View>
          <View style={{marginHorizontal:widthToDp('7')}}  >
            <Text style={appStyle.SubTitle1} >Location</Text>
            <View style={{flexDirection:'row',flexWrap:'wrap'}} >
            {/* <View style={{padding:10,backgroundColor:'red',width:widthToDp('26'),alignItems:'center',marginRight:10}} >
      <Text style={appStyle.body1} >Location</Text>
       
      </View>
      <View style={{padding:10,backgroundColor:'red',width:widthToDp('26'),alignItems:'center',marginRight:10}} >
      <Text style={appStyle.body1} >Location</Text>
       
      </View> */}
      {/* <FlatList
      data={customList}
      renderItem={(item)=><Text>haii</Text>}
      /> */}

      {customList.map((i)=>  
      
      
      
      
      <TouchableOpacity
      onPress={
       ()=>selectedItem(i)
        
     
      }
      
      style={{padding:10,backgroundColor:i.checked ?'black':'yellow',width:widthToDp('26'),alignItems:'center',marginRight:widthToDp('2'),marginTop:10}} >

      <Text style={appStyle.body1} >{i.name}</Text>
       
      </TouchableOpacity> 
      )}
      <View>
        
      </View>
        


        

        



  

            </View>
            <Text style={appStyle.SubTitle1} >OEM</Text>

            <View style={{flexDirection:'row',flexWrap:'wrap'}} >
            {/* <View style={{padding:10,backgroundColor:'red',width:widthToDp('26'),alignItems:'center',marginRight:10}} >
      <Text style={appStyle.body1} >Location</Text>
       
      </View>
      <View style={{padding:10,backgroundColor:'red',width:widthToDp('26'),alignItems:'center',marginRight:10}} >
      <Text style={appStyle.body1} >Location</Text>
       
      </View> */}
      {/* <FlatList
      data={customList}
      renderItem={(item)=><Text>haii</Text>}
      /> */}

      {customList.map((i)=>  
      
      
      
      
      <TouchableOpacity
      onPress={
       ()=>selectedItem(i)
        
     
      }
      
      style={{padding:10,backgroundColor:i.checked ?'black':'yellow',width:widthToDp('26'),alignItems:'center',marginRight:widthToDp('2'),marginTop:10}} >

      <Text style={appStyle.body1} >{i.name}</Text>
       
      </TouchableOpacity> 
      )}
      <View>
        
      </View>
        


        

        



  

            </View>

            <Text style={appStyle.SubTitle1} >Prmiary product</Text>

<View style={{flexDirection:'row',flexWrap:'wrap'}} >


{customList.map((i)=>  




<TouchableOpacity
onPress={
()=>selectedItem(i)


}

style={{padding:10,backgroundColor:i.checked ?'black':'yellow',width:widthToDp('26'),alignItems:'center',marginRight:widthToDp('2'),marginTop:10}} >

<Text style={appStyle.body1} >{i.name}</Text>

</TouchableOpacity> 
)}
<View>

</View>











</View>
  

          </View>
      
      
      
      </Overlay>
      </>
  
  );
};
export default Menu;
