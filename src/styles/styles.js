import React from "react";
import { StyleSheet } from "react-native"
import { heightToDp, widthToDp } from "../responsive";
import Equipment from "../screens/components/Equipment";
export const styles={
    centralColor:'#132D4B',
    fontFamily:'Proxima Nova Bold',
    fontFamily1:'ProximaNova-Regular',
    boaderAllRadius:30
    
   
}


export const bdRad=30



export const appStyle=StyleSheet.create({
    centrailView:{
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:'auto',
        marginBottom:'auto'
    },
   

    H4Text:{
        fontSize:widthToDp('6.66'),
      
        lineHeight:widthToDp('10'),
    
        color:'#FFFFFF',
        fontFamily:styles.fontFamily
        
    },

    H5Text:{
        fontSize:widthToDp('5.55'),
        lineHeight:widthToDp('8.33'),
       
        color:'#212B36',
        fontFamily:styles.fontFamily


    },
    Ag:{
        lineHeight:24,
        fontSize:16,
        fontFamily:styles.fontFamily
    },
 borderShadow:{
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.27,
  shadowRadius: 4.65,
  
  elevation: 6,

 },
    centerHorizontal:{
        marginLeft:'auto',
        marginRight:'auto'
    },
    backIcon:{
        backgroundColor: 'white',
        width: widthToDp('10'),
        height: heightToDp('5'),
        position: 'absolute',
        top: heightToDp('2'),
        left: widthToDp('3'),
        borderRadius: 20,
    },
    
    SubTitle1:{
        fontFamily:styles.fontFamily,
        fontSize:widthToDp('4.444'),
        lineHeight:widthToDp('6.66'),
        color:'#212B36',
      },
      SubTitle2:{
      fontFamily:styles.fontFamily,
        fontSize:widthToDp('3.87'),
        // lineHeight:17.5
        color:'#202727'
      },
      lightGrayText:{
        color:'gray',
        fontSize:widthToDp('2.77'),
        lineHeight:widthToDp('3.38'),

      fontFamily:styles.fontFamily1
    },
    body2Text:{
        fontSize:widthToDp('3.88'),
      fontFamily:styles.fontFamily1,
        lineHeight:widthToDp('5.833'),
    },
    body1:{
    
    fontFamily:styles.fontFamily1,
    fontSize:widthToDp('4.444'),
    lineHeight:widthToDp('6.66')
  
      // color:'white'
  },
    BoxHeading:{
        fontSize:16,
        fontWeight:'700',
        lineHeight:24,
        

    },
    H6:{
        fontSize:widthToDp('4.99'),
        fontFamily:styles.fontFamily,
        lineHeight:widthToDp('7.77'),
        color:'#202727'

    },
    caption: {
       
        fontSize: widthToDp('3.33'),
        lineHeight: widthToDp('5'),
        color:'#919EAB',
      
      
        fontFamily:styles.fontFamily1
      },

     
      H4:{
        fontSize:24,
        lineHeight:36,
        fontWeight:'700'
      },

      cationTitle:{
     fontFamily:styles.fontFamily,
        lineHeight:15,
        fontSize:12
      },

      buttonShadow:{
        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        
        elevation: 2,
      }
      ,Tiny:{
        fontSize:widthToDp('2.77'),
        lineHeight:widthToDp('3.38'),
        color:'#919EAB',
        fontFamily:styles.fontFamily1
      },
      homeShadow:{
        borderRadius: 20,


     shadowColor: "#545151",
shadowOffset: {
  width: 0,
  height: 4,
},
shadowOpacity:  0.19,
shadowRadius: 5.62,
elevation: 6}
    
})


