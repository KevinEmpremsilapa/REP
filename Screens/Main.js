import React from "react";
import { StyleSheet, Text, View } from "react-native";
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

  render() {
    return (
      <Container style={styles.container}>
        <Text style={styles.mainTitle}>REP</Text>
        <Text style={styles.mainTitle}>Raspados | Elotes | Paletas</Text>

        <Form>
          <Item floatingLabel>
            <Label>email</Label>
            <Input onChangeText={email => this.setState({ email })} />
          </Item>
          <Item floatingLabel>
            <Label>password</Label>
            <Input onChangeText={password => this.setState({ password })} />
          </Item>

          <Button
            style={{ marginTop: 10, backgroundColor: '#135AA8' }}
            full
            rounded
            success
            onPress={() =>
              this.loginUser(this.state.email, this.state.password)
            }
          >
            <Text style ={{color:'white'}}> Sign in </Text>
          </Button>

          <Button
            style={{ marginTop: 10, backgroundColor:'black' }}
            full
            rounded
            success
            onPress={() =>
              this.loginVendor(this.state.email, this.state.password)
            }
          >
            <Text style ={{color:'white'}}> Sign in as vendor </Text>
          </Button>

          <Text
            style={{ marginTop: 10, padding: 15, textAlign: "center" }}
            onPress={() =>
              this.signUpUser(this.state.email, this.state.password)
            }
          >
            Don' have an account? Sign Up
            <Text style={{ textDecorationLine: "underline" }}> here </Text>
          </Text>

          <Text style={{ textAlign: "center" }}>{this.state.error}</Text>
        </Form>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    justifyContent: "center"
  },
  mainTitle: {
    textAlign: "center"
  }
});
