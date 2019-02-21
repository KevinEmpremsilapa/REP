//Home Screen
import React, { Component } from "react";
import MapView from "react-native-maps";
import SlidingPanel from "react-native-sliding-up-down-panels";
import {SearchBar} from "react-native-elements";
import {
  ScrollView,
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
import { debuglog } from "util";

const win = Dimensions.get("window");

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      listingData: [],
      name: " "
    };
  }

  state = { currentUser: null };
  //animate zoom on location by pressing button
  state = { moveToUserLocation: true };

  _gotoCurrentLocation(e) {
    this.map.animateToRegion({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: 0.0059397161733585335,
      longitudeDelta: 0.005845874547958374
    });
  }

  //find user location using geolocation
  componentWillMount() {

    
    //iterate through each vendor's location, using "on" instead of "once"
    //will check for any change in location
    let q = firebase.database().ref("vendors");
    var finished = [];
    var that = this;
    q.once("value", snapshot => {
      snapshot.forEach(function(data) {
        let result = data.val();
        result["key"] = data.key;
        finished.push(result);
      });
    }).then(function() {
      that.setState({
        listingData: finished
      });
    });
    
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

  /*
  static navigationOptions = {
    title: "Home Screen"
  };
  */

  render() {
    const { name } = this.state;
    const { currentUser } = this.state;
   
    console.log("Hello");
   

    return (

      <View style ={{flex:1}}>
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

          onRegionChangeComplete={region => {}}
          region={this.props.coordinate}
          showsUserLocation={true}
          showsMyLocationButton = {true}

          style={{
            alignSelf: "center",
            marginTop: 0,
            height: 535,
            width: win.width,
          }}
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

          {this.state.listingData.map(function(x) {
            return (
              <MapView.Marker
                //display marker for a vendor's location
                coordinate={{
                  latitude: x.location.vendorLatitude,
                  longitude: x.location.vendorLongitude
                }}
              />
            );
          })}

        </MapView>

        <Button
          title="Get Location"
          onPress={() => this._gotoCurrentLocation()}
          style={styles.spot}
        >
          location
        </Button>


        {/*Starting sliding pannel view*/}

        <SlidingPanel
          headerLayoutHeight = {win.height - 650}
          headerLayout = {() =>
          <View style={{backgroundColor: 'white', width: win.width, height: win.height}}> 
            <Text
              style ={{fontSize: 18, fontWeight: "bold"}}>
              {"\n\t"} Find a vendor near you {currentUser && currentUser.name}
            </Text>
            
            <SearchBar
              placeholder = "Seach Location"
              lightTheme
              round
              backgroundColor = "white"
            />

            <Text
              style ={{fontSize: 26, fontWeight: "bold", alignSelf: "center"}}>
              {"\n\t"} YOUR AD HERE! {currentUser && currentUser.name}
            </Text>
          
          </View>
          } 
          /*
          slidingPanelLayout = {() =>
            <View style={{backgroundColor: 'white', width: win.width, height: win.height}}>
              <Text>Email  </Text>
              <Text>User Id </Text>
            </View>
          }*/
        />

      </View>
    );
  }
}

