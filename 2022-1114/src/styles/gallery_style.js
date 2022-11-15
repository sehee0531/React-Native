import {StyleSheet, Dimensions} from 'react-native';

const ScreenHeight=Dimensions.get('window').height;
const ScreenWidth=Dimensions.get('window').width;
export const styles = StyleSheet.create({
 

viewHeaderLayout:{
    flex:1,
   
    flexDirection:'row',
    marginTop:20,
    marginLeft:30,
    marginBottom:30,
    marginRight:20,
},
viewBodyLayout:{
    flex:10,
   
},
viewBottomLayout:{
    flex:1,
    marginTop:10,
    marginRight:10,
},

textLayout:{
    flex:1
},
btnLayout:{
    flex:1,
    alignItems:'flex-end',
    justifyContent:'flex-start',
},
btn_camera:{
    width:ScreenWidth/2,
    height:ScreenWidth/8, 
    backgroundColor:'#D9D9DE',
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 10,
   },
btn_put:{
    width:ScreenWidth/5,
    height:ScreenWidth/8, 
    backgroundColor:"#F1F1F3",
    
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 10,
  },
  image:{
    width:ScreenWidth/2,
    height:ScreenWidth/2,
    alignSelf:'center',
  },
  text:{
    fontFamily:"Cochin",
    fontSize:15,
    color:"black",
    
  },
  overlay:{
    position:"absolute",
    width:196,
    height :"100%",
    backgroundColor : "rgba(0,0,0,0.6)",
    top:0,
  },
}
)