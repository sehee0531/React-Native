import React from 'react';
import {View, Text, StyleSheet, FlatList,Image} from 'react-native';
import moon from "../images/달.jpg";

export default function ItemList() {
  const data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]; //길이가 긴 Array 라고 가정
  return (
    <FlatList
      data={data}
      renderItem={({item, i}) => (
        <View style={styles.container} key={i}>
          <View>
            <Image style={styles.logo} source ={moon}/>
          </View>  
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    height: 435,
    width:500,
    backgroundColor: 'white'
  },
  logo:{
    width:400,
    height:400,
  },

});