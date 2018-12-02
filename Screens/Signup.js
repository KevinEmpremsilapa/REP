//Sign up Screen
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
    title: "Sign Up"
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
            .ref("users/" + res.user.uid)
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

          <Text style={styles.bottomText}>
            By creating an account, you agree to our Terms
          </Text>

          <Text style={styles.bottomText}>
            Already have an account? Sign in
          </Text>
        </Form>
      </Container>
    );
  }
}
