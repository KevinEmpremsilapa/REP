/*
 Navigation Page
*/
import React from 'react';
import { StackNavigator} from 'react-navigation';
import Main from './Screens/Main';
import HomeScreen from './Screens/HomeScreen';
import Signup from './Screens/Signup';

export default class App extends React.Component{
    render(){
        return(
            <AppNavigator/>  
        );
     }
}

const AppNavigator = StackNavigator({
    MainScreen: {screen: Main},
    HomeScreen: {screen: HomeScreen},
    SignupScreen: {screen: Signup},
});
