import React, { Component } from 'react';
import { Camera,useFrameProcessor } from "react-native-vision-camera";
import { View,StyleSheet,TouchableOpacity,Button,Image, NativeModules, TouchableWithoutFeedbackBase } from 'react-native';

import IconCamera from 'react-native-vector-icons/Feather';
import IconCircle from "react-native-vector-icons/FontAwesome";
import { styles } from "../style/vision_camera_style";

class UserCamera extends Component {
    constructor(props) {
        super(props);

        //this.frameProcessor = this.props.frameProcessor;

        this.camera = React.createRef();
        this.capturedView = React.createRef();
        this.cameraView = React.createRef();
        this.source={};
        this.target={};

        //안드로이드에서 정의한 모듈 가져옴
        const {ImageModule} = NativeModules;
        this.imageModule = ImageModule;
        
        this.state={
            device:null,
            cutImage:null
        };
    }

    componentDidMount() {
        this.availableCameraDevices().then((select)=> {
            this.setState({ device: select });
        });
    }

    async availableCameraDevices() {
        const devices = await Camera.getAvailableCameraDevices();
        return {
            back: devices.find((d) => d.position === "back"),
            front: devices.find((d) => d.position === "front"),
        }
    }

    // 카메라 촬영 버튼
    onShutterClicked = async () => {
        const photo = await this.camera.current.takeSnapshot({
            flash: 'off',
        });
        this.props.onCapturedListener(photo.path); //URL을 onCapturedListener에게 넘겨줌
        this.imageModule.getCutImageUri('file://' + photo.path,this.source,this.target,this.failedCallback,this.successCallback);
    }

    //안드로이드 모듈 호출 실패시 Callback함수
    failedCallback=(message)=> {
        console.log(message);
    }

    //안드로이드 모듈 호출 성공시 Callback함수
    successCallback=(imageURI)=> {
        console.log(imageURI);
        this.setState({cutImage:imageURI}); //uri
        this.props.onCutImageListener(imageURI);        
    }

    //render에 정의한 View 사이즈 가져오기
    getViewSize=(event) => {
        const layout = event.nativeEvent.layout;
        let topMargin=0;
        let leftMargin=0;
        
        this.cameraView.current.measure( (fx, fy, width, height, px, py) => {     
            topMargin=py;
            leftMargin=px;
            this.source={width:width,height:height};
        });

        this.capturedView.current.measure( (fx, fy, width, height, px, py) => {
            this.target={top:py-topMargin,left:px-leftMargin,width:width,height:height};
        });
    }

    render() {
        if (this.state.device == null) return (<></>);
        return(
            <View style={styles.container}>
                <View style={styles.viewHeaderLayout}>
                    <Image source={{uri:this.state.cutImage}} style={{flex:1, resizeMode:"contain"}}/>
                </View>
                <View style={styles.viewBodyLayout} onLayout={(event) => this.getViewSize(event)} ref={this.cameraView}>
                    <View style={{ width: "100%", height: "100%", position: 'absolute', zIndex: 1 }}>
                        <Camera 
                            ref={this.camera}
                            frameProcessor={this.frameProcessor}
                            //frameProcessorFps={5}
                            style={StyleSheet.absoluteFill} //view 설정한 크기에 맞게 채워줌
                            device={this.state.device.back}
                            isActive={true}
                        />
                        <View style={this.props.capturedStyle} ref={this.capturedView}> //사각형 뷰 (this.props.childern) 하면 밑에 자식을 알 수 있음
                         문제점 : ViewSize를 알아야하는데 ref를 알아야해서 main에서 ref를 주면 안댐 
                         style을 props로 받음     
                        </View>
                    </View>          
                </View>      

                <View style={styles.viewBottomLayout}>
                    <View style={styles.buttonLayout}>
                        <Button title="촬영" onPress={this.onShutterClicked} />
                        //사진찍은 크기들만 가져오면 댐
                    </View>
                </View>
            </View>
        );
    }
}


//useLocation, useNaviagion, useParams를 사용하기 위해 클래스를 Wrap
//클래스에서는 위와 같은 함수를 사용하지 못함
const withWrapper = (Component) => (props) => {
    const frameProcessor = useFrameProcessor((frame)=> {

    });
    return <Component frameProcessor={frameProcessor} {...props} />;
};

//export default withWrapper(UserCamera);

export default UserCamera;