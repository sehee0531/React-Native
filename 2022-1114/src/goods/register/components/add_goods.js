import React, { Component} from 'react';
import { StatusBar, Button, StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, FlatList, 
    Image, ImageBackground, } from 'react-native';

import { styles } from "../../../styles/addgoods_style";
import { template } from "../../../styles/template/page_style";

import IconCamera from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/AntDesign';
import IconDelete from 'react-native-vector-icons/Ionicons';

import { Picker } from '@react-native-picker/picker';
import Constant from "../../../util/constatnt_variables";
import WebServiceManager from "../../../util/webservice_manager";



class AddGoods extends Component{

    
    constructor(props) {
        super(props);

        this.fileCount = 0;
        this.state = {
            name: null,
            number: null,
            price: null,
            hashTag: null,
            quantity: 1,
            deliveryMethod: null,
            deliveryPrice: null,
            viewModal: false,
            filenames: [],
            imageURLs: [],
           
            itemArea: null,
            itemCategory: null,

        }
    }
 

  //props가 업데이트 될 때
    componentDidUpdate(prevProps,prevState){
        if(prevProps.route.params.imageURLs !=this.props.route.params.imageURLs){
            this.setState({imageURLs: this.state.imageURLs.concat(this.props.route.params.imageURLs)});
        
        }
        console.log("state변수 ", this.state.imageURLs);
    }
    

    makeBinaryData() {
        let imageData = []; // 이미지 객체를 저장해 줄 배열 만들어주기
        //const imageURLs = this.props.route.params.imageInputValue;//VisionCamFlat에서 받은 ImageInputValue
        for (let i = 0; i < this.state.imageURLs.length; i++) { // 배열안에 있는 이미지의 갯수만큼 반복문 돌려주기
            const uri = this.state.imageURLs[i]; // 갯수만큼 uri 만들어줌
            const filename = uri.substring(uri.lastIndexOf("/") + 1); 
            const fileData = {
                uri: uri,
                type: "image/jpeg",
                name: 'photo.jpg',
            }
            imageData.push(fileData);// imageData 배열 안에 이미지의 객체들을 넣어줌
        }
        return imageData; // 객체가 들어있는 배열을 리턴
    }

    upload = () => { // 등록 버튼을 눌렀을 때 호출되는 함수
        const imageData = this.makeBinaryData(); 
        this.callUploadAPI(imageData).then((response) => {
            console.log(response);
        })
    }
    async callUploadAPI(imageData) { // 이미지와 데이터를 서버로 보내주는 API
        let manager = new WebServiceManager(Constant.serviceURL + "/AddGoods", "post");
        filenames = []; //"file1","file2" ... 파일 이름들을 넣어줄 배열

        for (let i = 0; i < imageData.length; i++) { //리턴받은 이미지 객체 배열의 길이만큼 반복
            filenames.push("file"+(i+1)); // 파일 이름들을 배열에 넣어줌
            manager.addBinaryData("file"+(i+1),imageData[i]); //addBinaryData에 앞에는 이미지의 이름들 뒤에는 이미지 객체가 들어있는 배열
        }
        manager.addFormData("data", {
            name: this.state.name, number: this.state.number,
            price: this.state.price, hashTag: this.state.hashTag , quantity: this.state.quantity, deliveryMethod: this.state.deliveryMethod
            , deliveryPrice: this.state.deliveryPrice,filenames: filenames
        }); 

        let response = await manager.start();// --끝났다
        if (response.ok) {
            return response.json();
        }
    }

   

    // 갤러리로 이동
    goGallerySreen = () => {
        this.props.navigation.push('Gallery')
    }
    // -버튼 클릭
    minusNum = () => {
        if (this.state.quantity <= 1) {
            this.setState({ quantity: 1 })
        }
        else {
            this.setState({ quantity: this.state.quantity - 1 });
        }
    }

    //이미지 삭제 버튼
    imageRemove = (index) => {
        console.log(index);
        this.setState({
            imageURLs: this.state.imageURLs.filter((value, indexNum) => indexNum !== index)
        });
        console.log('삭제완료');
    };
  

    render() { 
        
        return (
            <>
            <View style={template.total_container}>
                <ScrollView style={template.ScrollView}>
                    <View style={template.container}>

                        <View style={styles.viewImageLayout}>
                            <View style={styles.rowLayout}>
                                <Icon name="exclamationcircleo" size={15}></Icon>
                                <Text style={styles.text_camera}>  등록한 첫번째 사진이 대표이미지로 등록됩니다 </Text>
                            </View>
                            <View style={styles.rowLayout}>
                                <TouchableOpacity style={styles.btn_camera} onPress={this.goGallerySreen}>
                                    <IconCamera name="camera" size={30}></IconCamera>
                                    <Text><Text style={styles.text_count}>{this.state.imageURLs.length}</Text>/10</Text>
                                </TouchableOpacity>

                                {/*이미지 뿌려주기 */}
                                <FlatList
                                    data={this.state.imageURLs}
                                    renderItem={(item) => <ImageRender image={item} imageRemove={(index) => this.imageRemove(index)} />}
                                    horizontal={true}
                                />

                            </View>
                        </View>

                        <View style={styles.viewItemLayout}>
                            <Text style={styles.title}>상품 정보</Text>

                            <Picker style={styles.select}
                                selectedValue={this.state.itemArea}
                                onValueChange={(value, index) => { this.setState({ itemArea: value }) }}>
                                <Picker.Item label='판매지역' value="" />
                                <Picker.Item label='서울' value="seoul" />
                                <Picker.Item label='부산' value="busan" />
                            </Picker>
                            <Picker style={styles.select}
                                selectedValue={this.state.itemCategory}
                                onValueChange={(value, index) => { this.setState({ itemCategory: value }) }}>
                                <Picker.Item label='카테고리' value="" />
                                <Picker.Item label='핸들' value="handle" />
                                <Picker.Item label='바퀴' value="wheel" />
                            </Picker>

                            <TextInput style={template.textInput}
                                onChange={(event) => { this.setState({ name: event.nativeEvent.text }) }}
                                placeholder="품명을 입력하세요."
                            />
                            <TextInput style={template.textInput}
                                onChange={(event) => { this.setState({ number: event.nativeEvent.text }) }}
                                placeholder="부품번호를 입력하세요."
                            />
                            <TextInput style={template.textInput}
                                keyboardType="number-pad"
                                onChange={(event) => { this.setState({ price: event.nativeEvent.text }) }}
                                placeholder="판매가격를 입력하세요."
                            />
                             <TextInput style={template.textInput}
                                onChange={(event) => { this.setState({ hashTag: event.nativeEvent.text }) }}
                                placeholder="해쉬태그를 입력하세요."
                            />
                            <View style={styles.rowLayout}>
                                <View style={styles.item}>
                                    <Text>판매개수</Text>
                                </View>

                                <View style={styles.item_text}>
                                    <Text>{this.state.quantity}</Text>
                                </View>

                                <View style={styles.item}>
                                    <TouchableOpacity activeOpacity={0.8} style={styles.btn_count} onPress={() => { this.setState({ quantity : this.state.quantity + 1 }) }}>
                                        <Text style={styles.btn_text}>+</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.item}>
                                    <TouchableOpacity activeOpacity={0.8} style={styles.btn_count} onPress={this.minusNum}>
                                        <Text style={styles.btn_text}>-</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>


                        <View style={styles.viewDeliveryLayout}>
                            <Text style={styles.title}>배송 정보</Text>

                            <TextInput style={template.textInput}
                               onChange={(event) => { this.setState({ deliveryMethod: event.nativeEvent.text }) }}
                               placeholder="배송방법을 입력하세요."
                            />
                            <TextInput style={template.textInput}
                                keyboardType="number-pad"
                                onChange={(event) => { this.setState({ deliveryPrice: event.nativeEvent.text }) }}
                                placeholder="배송비를 입력하세요."
                            />
                           
                        </View>
                    </View>

                    <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={this.upload}>
                        <Text style={styles.btn_text}>상품등록하기</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            </>
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
            <TouchableOpacity >
                <ImageBackground source={{ uri: imagePath }} style={styles.image}>
                    <TouchableOpacity style={styles.btn_x} onPress={() => this.props.imageRemove(imageIndex)}>
                        <IconDelete name="close-circle" color="gray" size={20}></IconDelete>
                    </TouchableOpacity>
                </ImageBackground>
            </TouchableOpacity>

        )
    }
}
export default AddGoods;