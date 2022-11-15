import React, { Component } from 'react';
import { StatusBar, Button, StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList, Image, Dimensions, NativeModules } from 'react-native';

import IconCamera from 'react-native-vector-icons/Entypo';
import { template } from "../../../styles/template/page_style";
import { styles } from "../../../styles/gallery_style";

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

class Gallery extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imageURLs: [],
            itemIndex: [],
        };
    }
 
    componentDidMount() {
        // 앨범에서 uri를 가져오는 부분
        const { AlbumModule } = NativeModules;
        AlbumModule.getAlbumUris(this.failedCallback, this.successCallback);
    }

    successCallback = (message) => {
        this.setState({ imageURLs: message })
        //console.log("successCallback : ", this.state.imageURLs);
    }

    failedCallback = (message) => {
        console.log("failedCallback : ", message);
    }

    //카메라 업로드 버튼 클릭
    goVisionCameraSreen = () => {
        this.props.navigation.push('VisionCamera');
        //console.log(this.state.imageURLs);
    }

    //등록 버튼 클릭
    putButton = (index) => {
        const imageURLs = this.state.itemIndex;
        this.props.navigation.navigate('AddGoods',{imageURLs:imageURLs});
        //console.log("등록버튼 ",this.state.imageURLs);
    }

    // 이미지를 누를 때
    handlePress = (item) => {
        if (this.state.itemIndex.includes(item)) {
            const selectItem = this.state.itemIndex.filter(itemIndex => itemIndex !== item);
            return this.setState({ itemIndex: selectItem })
        }
        this.setState({ itemIndex: this.state.itemIndex.concat(item) });
    }

    // 이미지가 선택되어 itemPath 배열에 있다면 true 반환 => 선택이 되어있는지 확인을 위해 ImageRender class에서 overlay사용
    getSelected = (item) => {
        return this.state.itemIndex.includes(item)
    }

    render() {
        return (
            <View style={template.total_container}>

                <View style={styles.viewHeaderLayout}>
                    <View style={styles.textLayout}>
                        <TouchableOpacity style={styles.btn_camera} onPress={this.goVisionCameraSreen}>
                            <IconCamera name="camera" color="white" size={20}><Text style={styles.text}>  카메라로 업로드</Text>  </IconCamera>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.btnLayout}>
                        <TouchableOpacity style={styles.btn_put} onPress={this.putButton}>
                            <Text style={styles.text}>등 록</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.viewBodyLayout}>
                    {console.log(this.state.itemIndex)}
                    {/*이미지 보여주기 */}
                    <FlatList
                        numColumns={2}
                        data={this.state.imageURLs}
                        renderItem={(item) => <ImageRender image={item} handlePress={(image) => this.handlePress(image)} itemSelected={(image) => this.getSelected(image)} itemNum={this.state.num} />}
                        horizontal={false} // 가로정렬
                    />
                </View>

                <View style={styles.viewBottomLayout}>

                </View>
            </View>
        )
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
            <TouchableOpacity onPress={() => this.props.handlePress(imagePath)}>
                <View>
                    <Image source={{ uri: this.props.image.item }} style={styles.image} />
                </View>
                {/* 선택되어있는 항목 사진을 표시해주기위함 */}
                {this.props.itemSelected(imagePath) && <View style={styles.overlay}><Text style={{ color: 'white', textAlign:'right' }}>V</Text></View>}
            </TouchableOpacity>

        )
    }
}
export default Gallery;