import React, { Component } from "react";

//Tab
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//경로를 위한 import
import Home from "../../list/components/home";
import AddGoods from "./add_goods";

//아이콘을 위한

import Icon from 'react-native-vector-icons/Octicons'
const Tab = createBottomTabNavigator(); //Tab 일 경우

class TabNavigation extends Component {
  
  render() {

    return (
        <Tab.Navigator screenOptions={{
          headerTitleAlign:'center',
          headerShown:true,
          tabBarActiveTintColor:"#1e272e",
          tabBarInactiveTintColor:"#808e9b",
          headerStyle:{
            backgroundColor:"white",
          },
          headerTitleStyle:{
              color:"#1e272e",
          },
          tabBarLabelStyle:{
              marginTop:-5,
              fontSize:12,
              fontWeight:"600"
          },
        }}>
            <Tab.Screen name="Home" component={Home}
                  options={{title:"홈", headerShown:false ,
                  tabBarIcon:({focused, color, size})=>{
                   return <Icon name={"home"} color={color} size={size} ></Icon>
                }
                }}/>
            <Tab.Screen name="AddGoods" component={AddGoods}
                initialParams={{imageURLs:[]}}
  
                options={{title:"상품 등록",
                tabBarIcon:({focused, color, size})=>{
                  return <Icon name={"pencil"} color={color} size={size} ></Icon>
               }
                }} />
        </Tab.Navigator>
    

    
    );
  }
}

export default TabNavigation;