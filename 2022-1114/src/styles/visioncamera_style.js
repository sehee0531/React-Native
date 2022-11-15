import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'black',
    },
    viewHeaderLayout:{
      flex:2,
      justifyContent:'center',
    
    },
    viewBodyLayout:{
      flex:7,
    },
    viewBottomLayout:{
      flex:1,
      flexDirection:'row',
     marginTop:30,
      marginLeft:30,
      marginRight:30,
      marginBottom:30
    },
    row:{
      flex:1,
      padding:5,
      width: 160,
      height: 100,
      borderWidth:1,
      borderColor:"#DDDDDD",
      backgroundColor:'skyblue',
      margin:5,
      flexDirection:'row'
    },
    image:{
      flex:1,
      width:160,
      height:100,
      justifyContent:'flex-start',
      alignItems:'flex-end',
    },
    imageModal:{
      flex:1,
      width:360,
      height:500,
      justifyContent:'flex-start',
      alignItems:'flex-end',
    },
    imageLo:{
      flex:1,
      justifyContent:'flex-start',
      //borderWidth:1,
    },
    TextLo:{
      flex:1,
      padding:10,
      //textAlign:'right', // 텍스트 정렬
      //borderWidth:1,
    },
    viewStyle:{
      flex:1,
    },
    viewModalStyle:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      marginTop:100,
    },
    pictureLayout:{
      flex:1,
      alignItems:'flex-start',
      justifyContent:'center',
    },
   cameraLayout:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
   },
    putLayout:{
      flex:1,
      alignItems:'flex-end',
      justifyContent:'center',
    },
 
    btn_picture:{
      width:40,
      height:40,
      alignItems:'center',
      justifyContent:'center',
    },
    btn_camera:{
      width:65,
      height:65,
      //backgroundColor:"#C0C0CE",
      backgroundColor:"white",
      alignItems:'center',
      justifyContent:'center',
      borderRadius: 50,
    },
    btn_put:{
      width:60,
      height:35,
      backgroundColor:"#F1F1F3",
      alignItems:'center',
      justifyContent:'center',
      borderRadius: 10,
    },
    btn_xicon:{
      alignItems:'right',

    },
    buttonStyle:{
      width:100,
      height:38,
      margin:5,
      borderWidth:1,
    },
    touchableStyle:{
      flex : 1,
      width:160,
      height:100,
      margin:5,
    },
    text:{
     
      fontSize:15,
      color:"black",
    },
    touchableModalStyle:{
      flex : 1,
      width:380,
      height:580,
      margin:5,
    },
    imageBig:{
      flex:1,
      width:380,
      height:600,
    },
    

  });

  export default styles;