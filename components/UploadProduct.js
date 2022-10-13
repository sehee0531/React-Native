import React, { Component } from 'react';
import { TextInput, StyleSheet, View, Text, Button} from 'react-native';
import {styles} from "../style/Inpstyle";
import Constant from "../util/constant_variables";
import WebServiceManager from "../util/webservice_manager";
class UploadProduct extends Component {
 
  constructor(props) {
    super(props);

    this.state={
      name:null,
      title:null,
      content:null,
      price:null,
    }
  }
  /*details=()=> {
    this.props.navigation.navigate('Product')
  }*/
  sendRepair=()=> {
    console.log(this.state);
    this.callPutRepairAPI().then((response) => {
        console.log(response);
    });
    this.props.navigation.navigate('Product');
}

async callPutRepairAPI() {
    let manager = new WebServiceManager(Constant.serviceURL+"/AddGoods","post");
    manager.addFormData("data",{name:this.state.name,title:this.state.title,content:this.state.content,price:this.state.price});
    let response = await manager.start();
    if (response.ok) {
      return response.json();
    }
    return response;
}
 
 render() {
    return (
      <View style={styles.container}>
       
        <View style={styles.bodyContainer}>
        <TextInput
            style={styles.textInput}
            onChange={(event) => {this.setState({name:event.nativeEvent.text})}}
            placeholder="이름을 입력해주세요."
          />
          <TextInput
            style={styles.textInput}
            onChange={(event) => {this.setState({title:event.nativeEvent.text})}}
            placeholder="상품명을 입력해주세요."
          />
          <TextInput
            style={styles.textInput}
            onChange={(event) => {this.setState({content:event.nativeEvent.text})}}
            placeholder="상품설명을 입력해주세요."
          />
          <TextInput
            style={styles.textInput}
            onChange={(event) => {this.setState({price:event.nativeEvent.text})}}
            placeholder="가격을 입력해주세요."
          />
          <Button title="전송" color='skyblue' onPress = {this.sendRepair}/>
        
    
          <Text style = {styles.showText}>{this.state.text}</Text>
        </View>
      </View>
    );
  }
}


export default UploadProduct;