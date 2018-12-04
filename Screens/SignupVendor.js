//Sign up Vendor Screen
import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  TextInput,
  StyleSheet
} from "react-native";
import styles from "./Styles";

import {
  Container,
  Content,
  Header,
  Form,
  Input,
  Item,
  Label
} from "native-base";

import * as firebase from "firebase";

export default class Signup extends Component {
  static navigationOptions = {
    title: "SignUpVendor"
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      email: "",
      password: "",
      error: "",
      loading: false
    };
  }

  signUpUser = (email, password, name, phone) => {
    try {
      if (this.state.password.length < 6) {
        alert("Enter a password that is 6 characters or longer");
        return;
      }

      //add user and user ID
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          firebase
            .database()
            .ref("vendors/" + res.user.uid)
            .set({
              email: email,
              name: name,
              phone: phone
            });
        });
    } catch (error) {
      console.log(error.toString());
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label>Full Name</Label>
            <Input onChangeText={name => this.setState({ name })} />
          </Item>

          <Item floatingLabel>
            <Label>Phone</Label>
            <Input onChangeText={phone => this.setState({ phone })} />
          </Item>

          <Item floatingLabel>
            <Label>Email</Label>
            <Input onChangeText={email => this.setState({ email })} />
          </Item>

          <Item floatingLabel>
            <Label>Password</Label>
            <Input onChangeText={password => this.setState({ password })} />
          </Item>

          <TouchableOpacity
            style={styles.Button}
            onPress={() =>
              this.signUpUser(
                this.state.email,
                this.state.password,
                this.state.name,
                this.state.phone
              )
            }
          >
            <Text style={styles.ButtonText}> Create Your Account </Text>
          </TouchableOpacity>

          <Text
            style={{ textAlign: "center", padding: 10 }}
            onPress={() => this.props.navigation.navigate("MainScreen")}
          >
            Already have an account? Login here
          </Text>

          <Text
            style={{ textAlign: "center", marginTop: 10, padding: 10 }}
            onPress={() => this.props.navigation.navigate("SignupScreen")}
          >
            Are you a new user? Sign Up
            <Text style={{ textDecorationLine: "underline" }}> here </Text>
          </Text>
        </Form>
      </Container>
    );
  }
}
