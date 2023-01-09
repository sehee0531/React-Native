import React, { Component } from 'react';
import { StyleSheet, View, Button, Text, Image, FlatList, NativeModules} from 'react-native';

import { styles } from "../../style/vision_camera_style";
import VisionCamera from '../vision_camera';
import UserCamera from '../camera2';

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.capturedStyle={
            position:'absolute',
            top:'44%', 
            left:'15%',
            right:'15%',
            bottom:'44%', 
            zIndex:2, 
            borderWidth:1,
            borderColor:'white',
        };
    }

    onCapturedListener=(uri)=> {
        console.log('original image : ',uri);
    }

    onCutImageListener=(uri) => {
        console.log('cut image : ',uri);
    }

    render() {
        return(
            <View style={styles.container}>
                <UserCamera capturedStyle={this.capturedStyle} onCapturedListener={this.onCapturedListener} onCutImageListener={this.onCutImageListener} />
                //비전카메라가 실질적으로 있는 곳 , 자식이 뭐가 달렸는지 USerCamera가 알 수 있음
                props로 스타일만 넘겨줌 
                사진찍으면 두개의 이미지가 옴 ,,, 
            </View>
           
        );
    }
}