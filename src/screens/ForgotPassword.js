import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
  Keyboard,
  Button,
  Platform,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {LoginAction} from '../redux/login_credentials/action';
import {heightToDp, widthToDp} from '../responsive';
import {ReSolveAuth} from '../redux/login_credentials/action';
import {useNavigation} from '@react-navigation/native';
import { LogoText } from '../Icon/Icon';
import { appStyle } from '../styles/styles';
import { ForgotPassword1 } from '../redux/ForgotPassword/actions';



const ForgotPassword = () => {
 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const[view,setView]=useState(true)
  const[login,setLogin]=useState(false)


  const navigation=useNavigation()






  const dispatch = useDispatch();

  const onSubmitFormHandler = () => {

    // navigation.navigate('Login')

    dispatch(ForgotPassword1(username,(info)=>alert(info),()=>navigation.navigate('Login')));
    // dispatch(ScanQrCode(access_token,e.data,() => navigation.navigate('EquipmentDetails', {})
    
    // ,
    
    // (x)=> {
    //   console.log(x)
    //   Alert.alert('No EQUIPMENT FOUND')
     
    
    
    
    
    // }
    // )
    // )
  };
  

  



  const keyboardShowListener = Keyboard.addListener(
    'keyboardDidShow',
    () => {
        setView(false)
    }
);
const keyboardHideListener = Keyboard.addListener(
    'keyboardDidHide',
    () => {
        setView(true)
    }
);


const handleChange = (e) => {
  // const { name, value } = e.target;
  // setFormValues({ ...formValues, [name]: value });
  console.log(e.target.value)
};


  return (
    <View style={styles.container}>
      <StatusBar barStyle = "light-content" hidden = {false} backgroundColor ='#132D4B' translucent = {true}/>
      <View style={{marginBottom:!view  && Platform.OS==='ios'?'60%':0}} >
      <View style={{justifyContent: 'center',alignSelf:'center'}}>
      
       
        <Image
        source={require('../Icon/icons/logo_text.png')}
        style={{height:
          view?heightToDp('14'):heightToDp('10')
          ,width:widthToDp('33'),resizeMode:'contain'}}
        />
 
     

      </View>
     
       <TouchableOpacity>

<Text style={[appStyle.SubTitle2,styles.forgot_button]}  


>Forgot Password?</Text>
</TouchableOpacity>
<View style={[{width:'85%',marginTop:10}]} >
    <Text  style={[appStyle.body2Text,{color:'gray'}]}  >
        Enter your registed email address and we'll
        send you a link to reset your password



 
    </Text>
</View>

  

      <View style={[styles.inputView, {marginTop: heightToDp(2)}]}>
        <TextInput
          style={styles.TextInput}
          placeholder={view?"Email address":''}
          placeholderTextColor="#919EAB"
          onChangeText={username => setUsername(username)}
          value={username}
         
          keyboardType="email-address"
          underlineColorAndroid="transparent"
          onPressIn={()=>setView(false)}
        />
      </View>

      <View style={{width:10,height:10,borderRadius:50,backgroundColor:'green',position:'absolute',top:'46%',left:'75%',display:'none'}} ></View>

    

     

      <TouchableOpacity style={[styles.frgtBtn,{backgroundColor: view?'#081B31':'#328BCB'}]} onPress={onSubmitFormHandler}>
        <Text style={[appStyle.H6,{color:view?'#454F5B':'white'}]}>Reset password</Text>
      </TouchableOpacity>


      </View>
      
      

     
   
    </View>
  );
};
{/* <Text numberOfLines={2} style={[appStyle.body2Text]} > A link to reset your password has been sent to your email address.</Text> */}
export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#132D4B',
    // backgroundColor:'red'
  },

 

  inputView: {
    borderRadius: 10,
    width: widthToDp('82'),
    height: heightToDp('6'),
    marginBottom: heightToDp('2'),
    backgroundColor: 'white',
    alignSelf:'center'

  },

  TextInput: {
   
    backgroundColor:'white',
    height:'100%',
    marginHorizontal:widthToDp('2')
    

  
  },

  forgot_button: {
    // height: heightToDp('5'),
    marginLeft: widthToDp('0'),
    marginTop:heightToDp('4'),

    color: 'white',
  },

  frgtBtn: {
  
    width: widthToDp('82'),
    borderRadius: widthToDp('3'),
    height: heightToDp('6'),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:heightToDp('1')
           
  },
  loginText: {
 
    color: 'white',
  },
});




{/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
  <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
  <View>
    <Text style={{width: 50, textAlign: 'center'}}>Hello</Text>
  </View>
  <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
</View> */}