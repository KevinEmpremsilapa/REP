/*
 Navigation Page
*/
import React from 'react';
import {createDrawerNavigator, DrawerItems, createStackNavigator,StackNavigator,DrawerNavigator} from 'react-navigation';
import { StyleSheet, Text, View, Button,SafeAreaView, ScrollView, Dimensions, Image,Asyncstorage} from 'react-native';

import Main from './Screens/Main';
import HomeScreen from './Screens/HomeScreen';
import Signup from './Screens/Signup';
import SignupVendor from './Screens/SignupVendor';
import HomeScreenVendor from './Screens/HomeScreenVendor';
import styles from "./Screens/Styles";


export default class App extends React.Component{


    render(){
        return(
            <RootNavigator/> 
        );
     }
}

const CustomDrawerComponent = (props) => ( //customize the hamburger here
    <SafeAreaView style = {{flex:1}}>
        <View style = {styles.safeAreaStyle}>
            <Image source = {require('./assets/personIcon.png')} style={styles.menuImage}/>
        </View>
        <ScrollView>
            <DrawerItems {...props}/>
            
        </ScrollView>
    </SafeAreaView>
)

const Stack = {
    MainScreen: {screen: Main},
    HomeScreen: {screen: HomeScreen},
    SignupScreen: {screen: Signup},
    SignupVendor: {screen: SignupVendor},
    HomeScreenVendor: {screen: HomeScreenVendor}
};
const drawerRoutes = {
   'Logout': {
        name: 'Logout',
        screen: createStackNavigator(Stack, {initialRouteName: 'MainScreen'})
    },
    'Home': {
        name: 'Home',
        screen: createStackNavigator(Stack, {initialRouteName: 'HomeScreen'})
    },
    'Vendor Home': {
        name: 'Vendor Home',
        screen: createStackNavigator(Stack, {initialRouteName: 'HomeScreenVendor'})
    }
};//creates paths for the drawer navigator using the stack navigation
const RootNavigator = createStackNavigator({
    Drawer: {
        name: 'Drawer',
        screen: createDrawerNavigator(
           drawerRoutes,
            {
                contentComponent: CustomDrawerComponent,
                navigationOpions:{
                    drawerLockMode:'locked-closed' //should disable opening the drawer navigator by swiping right
                 }
            }
        )
    },
    ...Stack
},
{
    headerMode: 'none' //this removes the header for the stack navigator since we already have one for the drawer navigator
});
