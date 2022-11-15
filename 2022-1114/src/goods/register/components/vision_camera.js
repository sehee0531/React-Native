import React, { Component } from 'react';
import { StyleSheet, View, Button, Text, Image, FlatList, TouchableOpacity,
     ImageBackground, Modal,DeviceEventEmitter } from 'react-native';


import { Camera } from 'react-native-vision-camera';

import {styles} from "../../../styles/visioncamera_style";
import IconDelete from 'react-native-vector-icons/Ionicons';
import IconCircle from "react-native-vector-icons/FontAwesome";
import IconPicture from "react-native-vector-icons/SimpleLineIcons";

class VisionCamera extends Component {
    constructor(props) {
        super(props);

        this.camera = React.createRef();
        this.devices = [];
        this.state = {
            imageURLs: [],
            device: null,
            modal: false,       
        }
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
            front: sorted.find((d) => d.position === "front")
        }
    }

   
    //카메라 버튼 클릭
    onPressButton = async () => {
        const photo = await this.camera.current.takeSnapshot({
            flash: 'off',
        })
        this.setState({ imageURLs: this.state.imageURLs.concat('file://' + photo.path) })
    }
    //등록 버튼 클릭
    putButton = (index) => {
    
        this.props.navigation.navigate('AddGoods',{imageURLs:this.state.imageURLs});
        console.log("등록버튼 ",this.state.imageURLs);
    }

    // 이미지 모달 표시 여부
    handleModal = () => {
        this.setState({
            modal: this.state.modal ? false : true,
        });
    };

  
    // 이미지 삭제
    imageRemove = (index) => {
        console.log(index);
        this.setState({
            imageURLs: this.state.imageURLs.filter((value, indexNum) => indexNum !== index)
        });
        console.log('삭제완료');
    };

    render() {
        if (this.state.device == null) return (<></>);
        return (
            <View style={styles.container}>

                <View style={styles.viewHeaderLayout}>
                    <FlatList
                        data={this.state.imageURLs}
                        renderItem={(item) => <ImageRender image={item} imageModal={this.handleModal} imageRemove={(index) => this.imageRemove(index)} />}
                        horizontal={true} // 가로정렬
                    />
                </View>

                <View style={styles.viewBodyLayout}>
                    <Camera
                        ref={this.camera}
                        style={StyleSheet.absoluteFill}
                        device={this.state.device.back}
                        isActive={true}
                        photo={true}
                    />
                    <Modal visible={this.state.modal}>
                        <View style={styles.container}>
                            <FlatList
                                data={this.state.imageURLs}
                                renderItem={(item) => <ImageModal image={item} imageModal={this.handleModal} imageRemove={(index) => this.imageRemove(index)} />}
                                horizontal={true} // 가로정렬
                            />
                        </View>
                    </Modal>
                </View>

                <View style={styles.viewBottomLayout}>
                    <View style={styles.pictureLayout}>
                    </View>
                    <View style={styles.cameraLayout}>
                        <TouchableOpacity style={styles.btn_camera} onPress={this.onPressButton}>
                            <IconCircle name="circle-thin" size={65} color="#C0C0CE"></IconCircle>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.putLayout}>
                        <TouchableOpacity style={styles.btn_put} onPress={this.putButton}>
                            <Text style={styles.text}>등 록</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/*<Text>{this.state.imageURLs}</Text>*/}

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
            <TouchableOpacity style={styles.touchableStyle} onPress={this.props.imageModal}>
                <View style={styles.viewStyle}>
                    <ImageBackground source={{ uri: imagePath }} style={styles.image}>
                        <TouchableOpacity onPress={() => this.props.imageRemove(imageIndex)}>
                            <IconDelete name="close" color="black" size={30}></IconDelete> 
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
            </TouchableOpacity >
        )
    }
}

class ImageModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const imagePath = this.props.image.item;
        const imageIndex = this.props.image.index;

        return (
            <TouchableOpacity style={styles.touchableModalStyle} onPress={this.props.imageModal}>
                <View style={styles.viewModalStyle}>
                   
                    <ImageBackground source={{ uri: imagePath }} style={styles.imageModal}>
                        <TouchableOpacity onPress={() => this.props.imageRemove(imageIndex)}>
                            <IconDelete name="close" color="black" size={50}></IconDelete>   
                        </TouchableOpacity>
                    </ImageBackground>             
                </View>
            </TouchableOpacity >
        )
    }
}

export default VisionCamera;