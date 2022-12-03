import React, {useEffect, useState} from 'react';

import {StyleSheet, View, TextInput, Dimensions, Platform} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import {Filter, InputSearch} from '../../Icon/Icon';
import { getEquipmentData, getProcesslineData } from '../../redux/login_credentials/action';
import {heightToDp, widthToDp} from '../../responsive';
export const CustomSearchBar = props => {
  const [array, setArray] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const windowHeight = Dimensions.get('window').height;
  const access_token = useSelector(
    state => state.LoginReducer.data.access_token,
  );
  const [input, setInput] = useState('');
  const dispatch=useDispatch()

  useEffect(() => {
    setArray(props.data);
    // setInput('');
  }, [props.data]);
  useEffect(()=>{
    setInput('');
    
    props.tab==='Process Line'? dispatch(getProcesslineData(access_token,1,'')):
    props.tab==='Equipment'? dispatch(getEquipmentData(access_token,1,'')):null

  },[props.tab])

  console.log(props.tab,props.popshow,'-----------')

  const handleSearch = name => {
    

    // console.log(props.tab)
    setInput(name);

    // dispatch(getProcesslineData(access_token,1,name))

    props.tab==='Process Line'?dispatch(getProcesslineData(access_token,1,name))
    :props.tab==='Equipment'?dispatch(getEquipmentData(access_token,1,name)):null
    

    if (props.tab) {
     
      if (props.tab === 'SpareParts') {
        console.log(name);

        const data = array.filter(
          item =>
            item.part_number.search(name) !== -1 ||
            item.vendor_name.search(name) !== -1,
        );
        console.log(data);
        setSuggestions(data);
        props.onChangeSearch(data, name);
      }
      if(props.tab === 'projectList'){
        console.log('hai helllooo')
            const data = array.filter(
        item =>
          item.name.search(name) !== -1 || item.project_id.search(name) !== -1,
        // ||  item?.po_number!==null?item?.po_number.search(name) !== -1:''
        // || item.po_number===null?'':item?.po_number.search(name) !== -1

        // po_number
      );
      setSuggestions(data);
      props.onChangeSearch(suggestions, name);
    
      }
      
    //   else {
    //     const data1 = array.filter(
    //       item =>
    //         item.tagged_equipment_name.search(name) !== -1 ||
    //         item.line_name.search(name) !== -1,
    //     );
    //     // console.log(data1);
    //     setSuggestions(data1);
    //     // props.onChangeSearch(suggestions, name);
    //     // setArray([])
    //   }
    // } else {
    //   const data = array.filter(
    //     item =>
    //       item.name.search(name) !== -1 || item.project_id.search(name) !== -1,
    //     // ||  item?.po_number!==null?item?.po_number.search(name) !== -1:''
    //     // || item.po_number===null?'':item?.po_number.search(name) !== -1

    //     // po_number
    //   );
    //   setSuggestions(data);
    //   props.onChangeSearch(suggestions, name);
    // }
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        // marginHorizontal: widthToDp('2'),
        alignItems: 'center',
        backgroundColor: '#F4F7FF',
        // justifyContent:'center',
        // backgroundColor:'red',
      margin:widthToDp('2'),
        borderRadius: widthToDp('4'),
      }}>
      <View
        style={[
          {
            backgroundColor: 'white',
            width: props.tab==='SpareParts'?'89%':'75%',
            height:0.055*windowHeight,
            paddingLeft: widthToDp('2.5'),
            // backgroundColor:'red',

            flexDirection: 'row',
            marginVertical: heightToDp('2'),
            marginLeft: widthToDp('5'),
            textAlign: 'left',
          },
          component.border,
        ]}>
        <TextInput
          value={input}
          style={{width:props.tab=="SpareParts"?'100%': '83%', height: '100%'}}
          onChangeText={name => {
            handleSearch(name);
          }}
          placeholder="Search"
          placeholderTextColor="rgba(145, 158, 171, 1)"
        />
{props.tab==='SpareParts'?

<View
        
style={{
  width: '17%',
  position:'relative',
  right:widthToDp('8'),
  top:heightToDp('1.4')
  

}}>
<InputSearch />
</View>




:
<View
        
style={{
  width: '17%',
  justifyContent: 'center',
  alignItems: 'center',

}}>
<InputSearch />
</View>


}

       
      </View>
      {props.tab!=="SpareParts"?
      (
        <>

        {props.tab=='Process Line' && props.tab==='Equipment'?
               <TouchableOpacity
               onPress={()=>props?.setpopshow(true)}
                 style={[
                   component.border,
                   {
                     width: widthToDp('10') ,
                     height: widthToDp('10'),
                     // height:0.055*windowHeight,
                     marginLeft: widthToDp('2.6'),
                     justifyContent: 'center',
                     alignItems: 'center',
                     backgroundColor:'#FFFFFF',
                 
                     borderRadius:widthToDp('2')
                   },
                 ]}>
                 <Filter />
               </TouchableOpacity>:
               <TouchableOpacity
          
                 style={[
                   component.border,
                   {
                     width: widthToDp('10') ,
                     height: widthToDp('10'),
                     // height:0.055*windowHeight,
                     marginLeft: widthToDp('2.6'),
                     justifyContent: 'center',
                     alignItems: 'center',
                     backgroundColor:'#FFFFFF',
                 
                     borderRadius:widthToDp('2')
                   },
                 ]}>
                 <Filter />
               </TouchableOpacity>


        }
        
 
        </>
      ):null}

    </View>
  );
};
export default CustomSearchBar;

const component = StyleSheet.create({
  border: {
    borderWidth:widthToDp('0.3'),
    borderRadius:widthToDp('4.3'),
    borderColor: 'rgba(145, 158, 171, 0.32)',
  },
});

