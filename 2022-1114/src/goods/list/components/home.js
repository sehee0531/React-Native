import React, { Component, useState, useCallback } from 'react';
import { TextInput, StyleSheet, View, Text, Button, Image, FlatList, TouchableOpacity, Modal, } from 'react-native';

import Constant from "../../../util/constatnt_variables";
import WebServiceManager from "../../../util/webservice_manager";
import Variables from "../../../util/search_file";

import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from "../../../styles/home_style";
import { Header } from '@react-navigation/stack';

class Home extends Component {
    constructor(props) {
        super(props);
        this.Contents = [];  //모든 users값 가져오는 것
        this.names = Variables.getNames();
        this.numbers = Variables.getNumbers();
        this.hashTags = Variables.getHashTags();
        this.state = {
            name: this.names[0].value, //품명, 초기값 All
            number: this.numbers[0].value, //부품번호, 초기값 All
            hashTag: this.hashTags[0].value,
            goodsContent: [],
            modal: false,
        };
    }

    componentDidMount() {
        this.callGetRepairAPI().then((response) => {
            this.Contents = response;
            //console.log(response);//response는 json자체
            this.setState({ goodsContent: response });
        });
    }

    //간편검색
    FirstName = (value) => {
        console.log('selected data: ', value);
        this.setState({
            name: value,
        });
        this.setState({ goodsContent: this.FirstdataFiltering(value, this.state.number) })

    };

    FirstdataFiltering = (name, number) => {
        let goodsContent = this.Contents;
        goodsContent = goodsContent.filter((content) => {
            return content.name.includes(name);
        });
        return goodsContent;
    }

    //상세검색

    dataFiltering = (name, number, hashTag) => {

        let goodsContent = this.Contents;
        goodsContent = goodsContent.filter((content) => {
            return content.name.includes(name);
        });
        goodsContent = goodsContent.filter((content) => {
            return content.number.includes(number);
        });
        goodsContent = goodsContent.filter((content) => {
            return content.hashTag.includes(hashTag);
        })
        return goodsContent;
    }

    handleModal = () => { //리스트 띄우는 모달
        this.setState({
            modal: this.state.modal ? false : true,
        });
    };

    async callGetRepairAPI() {
        let manager = new WebServiceManager(Constant.serviceURL + "/GetGoods");
        let response = await manager.start();
        if (response.ok)
            return response.json();
        else
            Promise.reject(response);
    }

    render() {
        return (
            <>
                <View style={styles.homeTop}>
                    <Text style={styles.textStyle}>Where Parts                           <TouchableOpacity onPress={this.handleModal}>
                        <Icon name="search" size={25} color="white" />
                    </TouchableOpacity></Text>
                    <Text></Text><Text></Text>
                    <Text style={styles.textStyle}>내가 원하는 부품을</Text>
                    <Text style={styles.textStyle}>손쉽게 구매하세요.</Text>

                    <TextInput
                        onChange={(event) => this.FirstName(event.nativeEvent.text)}
                        placeholder="품명을 입력해주세요"
                        placeholderTextColor="light grey"
                        style={styles.input}
                    />
                </View>


                {this.state.modal && (<SearchModal selectname={(value) => this.setState({ name: value })} selectnumber={(value) => this.setState({ number: value })} selecthashTag={(value) => this.setState({ hashTag: value })}
                    statemodal={this.state.modal} setstatemodal={() => this.setState({ modal: this.state.modal ? false : true })} searchmodals={() => this.setState({
                        modal: this.state.modal ? false : true,
                        goodsContent: this.dataFiltering(this.state.name, this.state.number, this.state.hashTag)
                    })} />)}
                <View style={styles.homebottom}>
                    <FlatList
                        data={this.state.goodsContent}
                        renderItem={({ item }) => <GetImages item={item} />}
                    />
                </View>
            </>
        );
    }
}
class GetImages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageURL: null,
            modal: false,
        };
    }
    componentDidMount() {
        this.callGetRepairImageAPI(this.props.item).then((response) => {
            let reader = new FileReader();
            reader.readAsDataURL(response); //blob을 읽어줌 읽은 놈이 reader
            reader.onloadend = () => {
                this.setState({ imageURL: reader.result }) //base64를 imageURL에 집어넣어준다

            } //끝까지 다 읽었으면 
        });
    }
    async callGetRepairImageAPI(id) {

        let manager = new WebServiceManager(Constant.serviceURL + "/GetGoodsImage?id=" + id.imageIDs[0]);
        let response = await manager.start();
        if (response.ok)
            return response.blob();
    }
    renderImage = (item) => {
        return <AllImages item={item} />
    }

    handleModal = () => { //모달을 띄우는 부울 값
        this.setState({
            modal: this.state.modal ? false : true,
        });
    };

    render() {
        const item = this.props.item;

        return (
            <>
                <TouchableOpacity style={styles.homebottom} onPress={this.handleModal}>
                    <View style={styles.row}>
                        <Image source={{ uri: this.state.imageURL }} style={styles.logo} />
                        <Text style={styles.TextLo}>
                            {"품명 : "}{item.name}{"\n"}
                            {"부품번호 : "}{item.number}{"\n"}
                            {"가격 : "}{item.price}{"\n"}
                            {"해시태그 : "}{item.hashTag.slice(0, 9)}{"...\n"}
                            {"판매개수 : "}{item.quantity}{"                   "}

                        </Text>
                    </View>
                </TouchableOpacity >
                {this.state.modal && (<ImageModal statemodal={this.state.modal} setstatemodal={() => this.setState({ modal: this.state.modal ? false : true })}
                    item={item} renderImage={(item) => { return <AllImages item={item} /> }} />)}
            </>
        );
    }
}
class AllImages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageURL: null,
        };
    }
    componentDidMount() {
        this.callGetRepairImageAPI(this.props.item).then((response) => {
            let reader = new FileReader();
            reader.readAsDataURL(response); //blob을 읽어줌 읽은 놈이 reader
            reader.onloadend = () => {
                this.setState({ imageURL: reader.result }) //base64를 imageURL에 집어넣어준다

            } //끝까지 다 읽었으면 
        });
    }
    async callGetRepairImageAPI(id) {
        console.log(id);
        let manager = new WebServiceManager(Constant.serviceURL + "/GetGoodsImage?id=" + id.item);
        let response = await manager.start();
        if (response.ok)
            return response.blob();
    }
    render() {
        return (
            <View style={styles.row}>
                <Image source={{ uri: this.state.imageURL }} style={styles.logo} />
            </View >
        );
    }
}

class SearchModal extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
                <Modal animationType='slide' transparent={true} visible={this.props.statemodal}>
                    <View style={styles.centeredSearchView}>
                        <View style={styles.modalSearchView}>
                            <TouchableOpacity onPress={this.props.setstatemodal} style={styles.modalText}>
                                <Text style={styles.textSSTTYYLLE}>X</Text>
                            </TouchableOpacity>
                            <TextInput
                                onChange={(event) => this.props.selectname(event.nativeEvent.text)}
                                placeholder="품명을 입력해주세요"
                                placeholderTextColor="light grey"
                                style={styles.textinput}
                            />
                            <TextInput
                                onChange={(event) => this.props.selectnumber(event.nativeEvent.text)}
                                placeholder="부품번호를 입력해주세요"
                                placeholderTextColor="light grey"
                                style={styles.textinput}
                            />
                            <TextInput
                                onChange={(event) => this.props.selecthashTag(event.nativeEvent.text)}
                                placeholder="해시태그를 입력해주세요"
                                placeholderTextColor="light grey"
                                style={styles.textinput}
                            />
                            <TouchableOpacity onPress={this.props.searchmodals}>
                                <Icon name="check" size={35} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </>
        )
    }
}

class ImageModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Modal animationType='slide' transparent={true} visible={this.props.statemodal}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity onPress={this.props.setstatemodal} style={styles.modalText}>
                                <Text style={styles.textSSTTYYLLE}>X</Text>
                            </TouchableOpacity>
                            <FlatList
                                data={this.props.item.imageIDs}
                                renderItem={this.props.renderImage}
                                horizontal={true}
                            />
                            <Text style={styles.TextLo}>
                                {"품명 : "}{this.props.item.name}{"\n"}
                                {"부품번호 : "}{this.props.item.number}{"\n"}
                                {"가격 : "}{this.props.item.price}{"\n"}
                                {"해시태그 : "}{this.props.item.hashTag}{"\n"}
                                {"판매개수 : "}{this.props.item.quantity}{"\n"}
                                {"배송방법 : "}{this.props.item.deliveryMethod}{"\n"}
                                {"배송비 : "}{this.props.item.deliveryPrice}{"\n"}{"                   "}
                            </Text>
                        </View>
                    </View>
                </Modal>
            </>
        )
    }
}


export default Home;