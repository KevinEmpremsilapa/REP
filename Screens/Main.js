import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import * as firebase from "firebase";

//fixes yellow warning in expo 'setting a timer for a long period...'
import { YellowBox } from 'react-native';
import _ from 'lodash';
//fixes yellow warning for expo..
YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

// JS ADDS
import LinearGradient from 'react-native-linear-gradient';
import GradientButton from 'react-native-gradient-buttons';
import sunsetBG from './Images/sunsetBG3.png';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCdRrAkOeud4rODubGM7ZMs8HqJE7204RM",
  authDomain: "repapp-8255c.firebaseapp.com",
  databaseURL: "https://repapp-8255c.firebaseio.com",
  projectId: "repapp-8255c",
  storageBucket: "repapp-8255c.appspot.com",
  messagingSenderId: "487056809078"
};
firebase.initializeApp(config);

import {
  Container,
  Content,
  Header,
  Form,
  Input,
  Item,
  Button,
  Label
} from "native-base";

export default class App extends React.Component {
  static navigationOptions = {
    title: "Main Screen"
  };

//sets values
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      currentUser: null,
      email: "",
      password: "",
      error: "",
      loading: false
    };
  }

  //for clickable text user 'padding: #' to increase sensitivity and touchable areas
  signUpUser = (email, password) => {
    this.props.navigation.navigate("SignupScreen");
  };

  //check if user is logging in
  loginUser = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        const { currentUser } = firebase.auth();
        this.setState({ currentUser });

        //get values from firebase database
        let db = firebase.database();

        //only works for specific user name when /users/UID/name
        //can get all user information by: /users/uid
        let ref = db.ref(`/users/${this.state.currentUser.uid}/name`);

        //this sets name to name
        ref.once("value").then(snapshot => {
          this.setState({
            //.replace removes special characters like " " or '
            name: JSON.stringify(snapshot.val()).replace(/[^a-zA-Z ]/g, "")
          });
        
          //check if user was found
          if (this.state.name != "null" && this.state.name != null) {
            this.props.navigation.navigate("HomeScreen");
            this.setState({ error: "", loading: false });
          } else {
            this.setState({
              error: "\nAre you a vendor? try signing in as vendor"
            });
          }
        });
      })
      .catch(() => {
        this.setState({ error: "\nInvalid Email or Password", loading: false });
      });
  };
 
  //check if vendor
  loginVendor = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        const { currentUser } = firebase.auth();
        this.setState({ currentUser });

        //get values from firebase database
        let db = firebase.database();

        //only works for specific user name when /users/UID/name
        //can get all user information by: /users/uid
        let ref = db.ref(`/vendors/${this.state.currentUser.uid}/name`);

        //this sets name to name
        ref.once("value").then(snapshot => {
          this.setState({
            //.replace removes special characters like " " or '
            name: JSON.stringify(snapshot.val()).replace(/[^a-zA-Z ]/g, "")
          });

          if (this.state.name != "null" && this.state.name != null) {
            this.props.navigation.navigate("HomeScreenVendor");
            this.setState({ error: "", loading: false });
          } else {
            this.setState({
              error: "\nAre you a user? try signing in as user"
            });
          }
        });
      })
      .catch(() => {
        this.setState({ error: "\nInvalid Email or Password", loading: false });
      });
  };

  // Screen View Login Page
  render() {
    return (
      
       <ImageBackground source={sunsetBG} style={styles.backgroundContainer}>
          
          <View
            style={styles.form}>
            <Form>
              <Text style={{  color: 'red', fontWeight: "bold", alignSelf: 'center'}}>{this.state.error}</Text>
              <Item 
                rounded
                style={styles.formInput}>
                <Input placeholder = "Email"
                       onChangeText={email => this.setState({ email })}
                />
              </Item>
              <Item 
                rounded
                style={styles.formInput}>
                <Input placeholder = "Password"
                       onChangeText={password => this.setState({ password })}
                />
              </Item>
              <GradientButton
                  style={{ marginVertical: 8, marginTop: 15, alignSelf: 'center'}}
                  text="Sign In"
                  textStyle={{ fontSize: 20, color: '#FF6D6F'}}      
                  gradientBegin="#FFF"
                  gradientEnd="#FFF"           
                  gradientDirection="diagonal"
                  height={50}
                  width={150}
                  radius={50}
                  success
                  onPressAction={() => this.loginUser(this.state.email, this.state.password)}
              />
            </Form>
          </View>

          <View style={styles.bottom}>
            <Text
              style={styles.smallFont}
              onPress={() =>this.signUpUser(this.state.email, this.state.password)}
            >
              Don't have an account? Sign up{" "}
              <Text style={{ textDecorationLine: "underline" }}>here</Text>
            </Text>
            <Text
              style={styles.smallFont}
              onPress={() => this.props.navigation.navigate("SignupVendor")}
            >
              Are you a vendor? Log in{" "}  
              <Text style={{ textDecorationLine: "underline" }}>here</Text>
            </Text>
          </View>
        </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  // Style Background
  backgroundContainer:{
    flex: 1,
    resizeMode: 'cover',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  },

  // Alignment
  centerView: {
    marginTop: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginBottom: 36
  },
  form:{
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop: 360,
    alignSelf: 'center'
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20
  },

  // Style Form
  formInput:{
    marginTop: 10, 
    paddingHorizontal: 15,
    width: 310, 
    alignSelf: 'center', 
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderColor: 'rgba(255, 255, 255, 0.85)'
  },
  smallFont: {
    color: '#FFF',
    padding: 5, 
    textAlign: "center",
    fontWeight: 'bold'
  }
});

/*
Colors:
 // Original Image Colors (Currently in use)
  #FBBC82
  #FB8B74   
  #FF6D6F  
  #8F425F
  #87456F
  #4C2250

  // Faded Image Colors
  #FAB7AF
  #F7B8B1
  #CF9FC7
  #CD9BCC

  #F8B195
  #F67280
  #C06C84
  #6C5B7B
  #355C7D
 */