import React, { Component } from 'react';
import { TextInput, StyleSheet, View, Text, Alert, Button } from 'react-native';
import {styles} from "../style/Inpstyle";
 
class TextInp extends Component {
 
  constructor(props) {
    super(props);

    this.state={text:'',inputText:''}
  }
 
  submitBtn = () => {
    this.setState({text: this.state.inputText});
  }
 
 render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>TextInput 가지고 놀아보자</Text>
        <View style={styles.bodyContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => {this.setState({inputText: text})}}
            placeholder="아무거나 입력해주세요."
          />
          <Button title="제출" onPress = {this.submitBtn} />
          <Text style = {styles.showText}>{this.state.text}</Text>
        </View>
      </View>
    );
  }
}

  export default TextInp;