import React, { Component } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { View, FlatList, StyleSheet, Text } from 'react-native';
//Stack
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//경로를 위한 import

import TabNavigation from "./src/goods/register/components/tab_navigation";
import Gallery from "./src/goods/register/components/gallery";
import VisionCamera from "./src/goods/register/components/vision_camera";

//아이콘을 위한
import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createNativeStackNavigator();//Stack 일 경우


class App extends Component {
  render() {
    return (
    
        <NavigationContainer>
            <Stack.Navigator initialRouteName="TabNavigation"
                 screenOptions={{
                  headerTitleAlign:'center',
                }}>
              <Stack.Screen name="TabNavigation" component={TabNavigation}
                            options={{title:"홈", headerShown:false,}}/>
              <Stack.Screen name="Gallery" component={Gallery}
                            options={{title:"앨범"}}/>
              <Stack.Screen name="VisionCamera" component={VisionCamera}
                            options={{title:"카메라"}}/>
              </Stack.Navigator> 
        </NavigationContainer>
        
    
    );
  }
}

export default App;