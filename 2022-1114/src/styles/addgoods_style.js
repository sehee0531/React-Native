import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
   
     viewImageLayout:{
       flex:1,
       marginBottom:50
     },
     viewItemLayout:{
       flex:2,
       marginBottom:50
     },
     viewDeliveryLayout:{
       flex:2.5,
       marginBottom:50
     },
     rowLayout:{
      flex:1,
      flexDirection:'row',
     },
     item:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
    },
    item_text:{
      flex:2,
      alignItems:'center',
       justifyContent:'center',
       backgroundColor:"#F1F1F3",
       borderRadius: 10,
       height: 55,
    },
   
    select:{
      marginBottom:15,
    },
    text_camera:{
      fontFamily:"Cochin",
      fontSize:13,
      color:"gray",
      marginBottom:15
    },
    text_count:{
      color:"#FD9C91"
    },
    title:{
       fontFamily:"Cochin",
       fontSize:17,
       color:"black",
       marginBottom:15,
     },
  
     btn:{
       height:40,
       backgroundColor:"black",
       alignItems:'center',
       justifyContent:'center'
     },
     btn_text:{
        fontFamily:"Cochin",
       fontSize:15,
       color:"white",
     },
     btn_count:{
      width:40,
      height:40,
      backgroundColor:"black",
      alignItems:'center',
       justifyContent:'center',
       borderRadius: 10,
     },
     btn_camera:{
      width:60,
      height:60,
      backgroundColor:"#F1F1F3",
      alignItems:'center',
      justifyContent:'center',
      borderRadius: 10,
      marginRight:10
     },
   
     textCountInput:{
      backgroundColor:'#F1F1F3',
      marginBottom: 15,
      paddingHorizontal: 10,
      height: 55,
      width:120,
      borderRadius: 10,
      borderColor:'#F1F1F3',
      borderWidth: 1,
   },
 
   image:{
    width:60,
    height:60,
    marginRight:10,
    justifyContent:'flex-start',
    alignItems:'flex-end',
    borderRadius: 10,
  },
  });
  