/*
 Navigation Page
*/
import React from 'react';
import { createStackNavigator} from 'react-navigation';
import Main from './Screens/Main';
import HomeScreen from './Screens/HomeScreen';
import Signup from './Screens/Signup';
import SignupVendor from './Screens/SignupVendor';
import HomeScreenVendor from './Screens/HomeScreenVendor'
export default class App extends React.Component{
    render(){
        return(
            <AppNavigator/>  
        );
     }
}

const AppNavigator = createStackNavigator({
    MainScreen: {screen: Main},
    HomeScreen: {screen: HomeScreen},
    SignupScreen: {screen: Signup},
    SignupVendor: {screen: SignupVendor},
    HomeScreenVendor: {screen: HomeScreenVendor}
});
