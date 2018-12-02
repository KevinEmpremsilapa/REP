import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDAhQsIix2GQ1MeYwZkFoCmiLGRimzxgxk",
  authDomain: "repapp-b6c22.firebaseapp.com",
  databaseURL: "https://repapp-b6c22.firebaseio.com",
  projectId: "repapp-b6c22",
  storageBucket: "repapp-b6c22.appspot.com",
  messagingSenderId: "663030358207"
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

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      loading: false
    };
  }

  signUpUser = (email, password) => {
    this.props.navigation.navigate("SignupScreen");

  };

  loginUser = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate("HomeScreen");
        this.setState({ error: "", loading: false });
      })
      .catch(() => {
        this.setState({ error: "\nInvalid Email or Password", loading: false });
      });

  };

  render() {
    return (
      <Container style={styles.container}>
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
            style={{ marginTop: 10 }}
            full
            rounded
            success
            onPress={() =>
              this.loginUser(this.state.email, this.state.password)
            }
          >
            <Text> login </Text>
          </Button>

          <Button
            style={{ marginTop: 10 }}
            full
            rounded
            primary
            onPress={() =>
              this.signUpUser(this.state.email, this.state.password)
            }
          >
            <Text> Sign up </Text>
          </Button>
          <Text>{this.state.error}</Text>
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
  }
});
