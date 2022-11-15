//Home Style
import { StyleSheet } from "react-native"
export const styles = StyleSheet.create({ //export를 해주어야 다른 곳에서 사용할 수 있음
   
textStyle: { //Home의 웨어파츠 글자 색
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize:20,
  },
  input: { //Home TextInput
    backgroundColor: 'white',
    paddingVertical : 10,
    paddingHorizontal : 40,
    borderRadius :10,
    marginTop:20,
    fontSize:15,
 
  },
  row:{
    padding:5,
    borderWidth:1,
    borderColor:"#DDDDDD",
    backgroundColor:'light grey',
    margin:5,
    flexDirection:'row'
  },

  homeTop: {
    backgroundColor: 'black',
    paddingHorizontal: 30,
    paddingTop : 30,
    paddingBottom :40,
    
  },
  homebottom: {
    marginVertical: 0,
    paddingBottom:0,
    flex:1,
    
  },
  logo:{ //작은 이미지
      width:160,
      height:110,
  },
  photo:{
    width:300,
    height:300,
  },
  
  TextLo:{
    marginLeft:10,
    color: 'black',
    textAlign: 'left',
    fontSize:15,

  },
  viewStyle:{
    justifyContent:'flex-start',
    //borderWidth:1,
  },

    //VisionCam
    viewHeaderLayout:{
      height:'20%',
      borderWidth:1,
      justifyContent:'center',
      padding: 10,
    },
    viewBodyLayout:{
      height:'70%',
      borderWidth:1,
    },
    viewBottomLayout:{
      height:'8%',
      flexDirection:'row',
      borderWidth:1,
      justifyContent:'center',
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
      height:80,
      margin:5,
    },
    // Image Modal
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:22,
    },
    modalView: {
      height:410,
      width:300,
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,

      alignItems: 'center',
      shadowColor: '#000',
    },
    modalText: {
      width : 180,
      marginBottom: 15,
    },
    textSSTTYYLLE:{ // x
      textAlign:"right",
    },

    //SearchModal
    centeredSearchView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:22,
    },
    modalSearchView: {
      height:400,
      width:400,
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,

      alignItems: 'center',
      shadowColor: '#000',
    },
    textinput: {
      backgroundColor: 'lightgrey',
      paddingVertical : 10,
      paddingHorizontal : 40,
      borderRadius :10,
      marginTop:20,
      fontSize:15,
   
    },
    
});