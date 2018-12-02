//Home Screen
import React, { Component } from "react";
import MapView from "react-native-maps";
import {
  View,
  Text,
  Button,
  Dimensions,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from "react-native";
import styles from "./Styles";
import * as firebase from "firebase";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      name: " "
    };
  }

  state = { currentUser: null };

  state = { moveToUserLocation: true };
  _gotoCurrentLocation(e) {
    this.map.animateToRegion({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: 0.0059397161733585335,
      longitudeDelta: 0.005845874547958374
    });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      var lat = parseFloat(position.coords.latitude);
      var long = parseFloat(position.coords.longitude);
      this.setState({ latitude: lat });
      this.setState({ longitude: long });
    });

    const { currentUser } = firebase.auth();
    this.setState({ currentUser });

    //get values from firebase database
    let db = firebase.database();

    //only works for specific user name when /users/UID/name
    //can get all user information by: /users/uid
    let ref = db.ref(`/users/${currentUser.uid}/name`);

    //get user info and display in alert box
    ref.on("value", function(snapshot) {
      const messageText = JSON.stringify(snapshot.val());
      alert(messageText + "Logged In");
    });

    //this sets name to name
    ref.once("value").then(snapshot => {
      this.setState({
        //.replace removes special characters like " " or '
        name: JSON.stringify(snapshot.val()).replace(/[^a-zA-Z ]/g, "")
      });
    });
  }

  static navigationOptions = {
    title: "Home Screen"
  };

  render() {
    const { name } = this.state;
    const { currentUser } = this.state;

    return (
      //SearchBar
      //Map
      //FoodIconSlider
      //ShopTables
      <View style={styles.container}>
        <Text>Welcome {name} ! </Text>
        <Text>Email {currentUser && currentUser.email} </Text>
        <Text>User Id {currentUser && currentUser.uid} ! </Text>

        <MapView
          ref={ref => {
            this.map = ref;
          }}
          onMapReady={() => {
            if (
              this.state.moveToUserLocation &&
              this.props.userLocation.data.coords &&
              this.props.userLocation.data.coords.latitude
            ) {
              this._gotoCurrentLocation();
              this.state.moveToUserLocation = false;
            }
          }}
          showsUserLocation
          onRegionChangeComplete={region => {}}
          style={{ flex: 1 }}
          region={this.props.coordinate}
          showsUserLocation={true}
        >
          <MapView.Marker
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324
            }}
          >
            <View style={styles.radius}>
              <View style={styles.marker} />
            </View>
          </MapView.Marker>
        </MapView>

        <Button
          title="Focus Location"
          onPress={() => this._gotoCurrentLocation()}
          style={styles.spot}
        >
          location
        </Button>
      </View>
    );
  }
}
