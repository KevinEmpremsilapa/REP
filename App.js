/*
 Navigation Page
*/
import React from 'react';
import {RkButton} from 'react-native-ui-kitten';
// V3 NAV ERROR
//import { createStackNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator, createAppContainer} from 'react-navigation';

import Main from './Screens/Main';
import HomeScreen from './Screens/HomeScreen';
import Signup from './Screens/Signup';
import SignupVendor from './Screens/SignupVendor';
import HomeScreenVendor from './Screens/HomeScreenVendor';


// V3 NAV ERROR
// export default ...
export default class App extends React.Component{
    render(){
        return(
            // V3 NAV ERROR
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
