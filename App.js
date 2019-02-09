/*
 Navigation Page
*/
import React from 'react';
import {RkButton} from 'react-native-ui-kitten';
import { createStackNavigator, createAppContainer} from 'react-navigation';

import Main from './Screens/Main';
import HomeScreen from './Screens/HomeScreen';
import Signup from './Screens/Signup';
import SignupVendor from './Screens/SignupVendor';
import HomeScreenVendor from './Screens/HomeScreenVendor';


export default class App extends React.Component{


    render(){
        return(
            <AppContainer/>  
        );
     }
}
const AppStackNavigator = createStackNavigator({
    MainScreen: {screen: Main},
    HomeScreen: {screen: HomeScreen},
    SignupScreen: {screen: Signup},
    SignupVendor: {screen: SignupVendor},
    HomeScreenVendor: {screen: HomeScreenVendor}
});

const AppContainer = createAppContainer(AppStackNavigator);
