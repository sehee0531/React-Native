import React, { Component } from "react";
import { StyleSheet,ScrollView, Text, View ,SafeAreaView,StatusBar ,Button,FlatList } from 'react-native';
import Constant from "../util/constant_variables";
import WebServiceManager from "../util/webservice_manager";
class Product extends Component {

    constructor(props) {
        super(props);

        this.state={goodsContents:[]}
    }

    componentDidMount() {
        this.callGetRepairAPI().then((response) => {
            console.log(response);//response는 json자체       
            this.setState({goodsContents:response.goods});
        });
    }

    async callGetRepairAPI() {
        let manager = new WebServiceManager(Constant.serviceURL+"/GetGoods");
        let response = await manager.start();
        console.log(response);//헤더포함한 response message
        if(response.ok)
            return response.json();
        else
            Promise.reject(response);
    }

    render() {
        return(
          <>
          <View>
            <Text>
            이름   상품명      상품설명                       가격
            </Text>
          </View>
          <FlatList
          data={this.state.goodsContents}
          renderItem={({item}) => (
            <View>
              <Text>
                {item.name}
                {item.title}
                {item.content}
                {item.price}
                
              </Text>  
            </View>
          )}
        />
        </>
        );
    }
}

/*class GetRepairList extends Component {
    constructor(props) {
        super(props);
    }
    renderitem=({item})=>{
      <View>
        <Text>
          {item.name}
          {item.title}
          {item.price}
          {item.content}
        </Text>
      </View>

    }
    render() {
        return (
            <SafeAreaView >
              <View>
                <FlatList
                  data={this.props.item}
                  renderItem={this.renderitem}
                />
              </View>
            </SafeAreaView>
          );
        }
}*/
/*const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    text: {
      fontSize: 42,
    },
  });*/

export default Product;
