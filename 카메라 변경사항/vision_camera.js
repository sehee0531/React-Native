import React, { Component } from 'react';
import { StyleSheet, View, Button, Text, Image, FlatList, NativeModules} from 'react-native';

import { Camera, useFrameProcessor } from 'react-native-vision-camera';
import { styles } from "../style/vision_camera_style";
import {Buffer} from "buffer";
import WebServiceManager from './util/webservice_manager';
import ImageFetch from './util/image_fetch';

export default class VisionCamera extends Component {
    constructor(props) {
        super(props);

        this.camera = React.createRef();
        this.cameraView=React.createRef();
        this.capturedView=React.createRef();
        
        //안드로이드에서 정의한 모듈 가져옴
        const {ImageModule} = NativeModules;
        this.imageModule = ImageModule;

        this.devices = [];
        this.state = {
            imageURLs: [], // 원본 사진 담는 배열 uri
            device: null,
            capturedImage:null, //자른 이미지에 대한 uri
        }
        this.source={};
        this.target={};
    }

    componentDidMount() {
        this.availableCameraDevices().then((select) => {
            this.setState({ device: select });
        });
    }

    async availableCameraDevices() {
        this.devices = await Camera.getAvailableCameraDevices();
        const sorted = this.devices.sort(this.devices.devices);

        return {
            back: sorted.find((d) => d.position === "back"),
            front: sorted.find((d) => d.position === "front"),
        }
    }

    // 카메라 촬영 버튼
    onPressButton = async () => {
        const photo = await this.camera.current.takeSnapshot({
            flash: 'off',
        });

        this.setState({ imageURLs: this.state.imageURLs.concat('file://' + photo.path) });
        console.log('source:',this.source);
        console.log('target:',this.target);
        
        //ImageModule.getImageBase64('file://' + photo.path,this.failedCallback,this.successCallback);
        //ImageModule.getResizeImageBase64('file://' + photo.path,this.failedCallback,this.successCallback);
        //전체 이미지에서 target사이즈 만큼 자른 이미지의 uri를 가져옴
        this.imageModule.getCutImageUri('file://' + photo.path,this.source,this.target,this.failedCallback,this.successCallback);
        //이미지 사이즈 줄이기(3이면 1/3으로...)
        this.imageModule.getReduceImageUri('file://' + photo.path,3,this.reduceFailedCallback,this.reduceSuccessCallback);

        this.callImageFetch('file://' + photo.path).then((response)=> {
            /*
            let reader = new FileReader();
            reader.readAsDataURL(response);
            reader.onloadend=()=> {
                console.log('original image size:',reader.result.length);
            } */
        });
    }

    //안드로이드 모듈 호출 실패시 Callback함수
    failedCallback=(message)=> {
        console.log(message);
    }

    //안드로이드 모듈 호출 성공시 Callback함수
    successCallback=(message)=> {
        console.log(message);
        this.setState({capturedImage:message}); //uri

        this.imageModule.deleteImage(message,(m)=> {
            console.log(m);
        },(m)=> {
            console.log('delete success',m);
        });
        /*
        this.callTextDetectorAPI(message).then((response) => {
            console.log(response);
            this.props.okListener(response);
        });*/
        
        //this.setState({blobImage:'data:image/jpeg;base64,'+message}); //base64로 이미지 가져옴
        /*
        this.callAddGoodsAPI(message).then((response) => {
            console.log('response message : ',response);
            this.imageModule.deleteImage(message,(m)=> {
                console.log(m);
            },(m)=> {
                console.log(m);
            });
        });*/
    }  

    reduceFailedCallback=(message)=> {
        console.log(message);
    }

    reduceSuccessCallback=(message)=> {
        console.log('reduce success:',message);
        //const url = URL.createObjectURL(message,{type:"image/jpeg"});
        this.callImageFetch(message).then((response)=> {
            //console.log(response.data.size);
            //const url = URL.createObjectURL(new Blob([response.blob],{type:"image/jpeg"}));
            //console.log('image url:',url);
            /*
            let reader = new FileReader();
            reader.readAsDataURL(response);
            reader.onloadend=()=> {
                console.log('reduced image size:',reader.result.length);
            } */
        });

    }


    async callTextDetectorAPI(imageUri) {
        let manager = new WebServiceManager("http://lab.pyunhan.co.kr/api/paper/DetectTexts","post");
        manager.addBinaryData("file",{uri:imageUri,type:"image/jpeg",name:"file1"});
        let response = await manager.start();
        if(response.ok)
            return response.json();
    }
    
    //자른 이미지를 이용하여 품번 가져오기 Web API 호출
    async callAddGoodsAPI(imageURI) {
        let manager = new WebServiceManager("http://203.241.251.177/wparts/AddGoods","post");
        const formData = {userID:3,name:"알터네이터",number:"034586940",price:250000,hashTag:"제네레타, 제너레이터,소나타,2017",quantity:1,filenames:['file1']};       

        manager.addFormData("data",formData); 
        manager.addBinaryData("file1",{uri:imageURI,type:"image/jpeg",name:"file1"});
        let response = await manager.start();
        
        if(response.ok)
            return response.json();
    }

    //이미지 uri로 사진 가져오기
    async callImageFetch(uri) {
        let imageFetch = new ImageFetch(uri);
        let response = await imageFetch.start();
        console.log('image fetch : ',response);
        return response;
    }

    //render에 정의한 View 사이즈 가져오기
    getViewSize=(event) => {
        const layout = event.nativeEvent.layout;
        console.log('width',layout.width);
        console.log('width',layout.height);
        let topMargin=0;
        let leftMargin=0;
        
        this.cameraView.current.measure( (fx, fy, width, height, px, py) => {
            console.log('Component fx is: ' + fx)
            console.log('Component fy is: ' + fy)
            console.log('Component width is: ' + width)
            console.log('Component height is: ' + height)
            console.log('X offset to page: ' + px)
            console.log('Y offset to page: ' + py)

            topMargin=py;
            leftMargin=px;
            this.source={width:width,height:height};
        });
        this.capturedView.current.measure( (fx, fy, width, height, px, py) => {
            console.log('captured fx is: ' + fx)
            console.log('captured fy is: ' + fy)
            console.log('captured width is: ' + width)
            console.log('captured height is: ' + height)
            console.log('X offset to page: ' + px)
            console.log('Y offset to page: ' + py)

            this.target={top:py-topMargin,left:px-leftMargin,width:width,height:height};
        });
    }

    frameProcessor=(frame)=> {
        console.log('frame received...');
    };

    render() {
        if (this.state.device == null) return (<></>);
        return (
            <View style={styles.container}>
                
                <View style={styles.viewHeaderLayout}>
                    {/* 원본 사진 FlatList */}
                    <FlatList
                        data={this.state.imageURLs}
                        renderItem={(item) => <ImageRender image={item} />}
                        horizontal={true}
                    />
                    {/* 자른 이미지 사진 */}
                    <Image source={{uri:this.state.capturedImage}} style={{width:350,height:150}}/>
                </View>

                <View style={styles.viewBodyLayout} onLayout={(event) => this.getViewSize(event)} ref={this.cameraView} >
                    <View style={styles.viewStyle}>
                        <View style={{ width: "100%", height: "100%", position: 'absolute', zIndex: 1 }}>
                            <Camera
                                ref={this.camera}
                                //frameProcessor={this.frameProcessor}
                                //frameProcessorFps={5}
                                style={StyleSheet.absoluteFill} //view 설정한 크기에 맞게 채워줌
                                device={this.state.device.back}
                                isActive={true}
                            />
                        </View>
                        {/* 자를 이미지 크기 */}
                        <View style={{width:250,height:50, position:'absolute',top:100, left:50, zIndex:2, borderWidth:1, borderColor:'white'}} ref={this.capturedView}/>
                    </View>
                </View>

                <View style={styles.viewBottomLayout}>
                    <View style={styles.buttonLayout}>
                        <Button title="촬영" onPress={this.onPressButton} />
                    </View>
                </View>
            </View>
        );
    }
}

class ImageRender extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const imagePath = this.props.image.item;
        const imageIndex = this.props.image.index;

        return (
            <View style={styles.touchableStyle}>
                <Image source={{ uri: imagePath }} style={styles.image} />
            </View>
        )
    }
}