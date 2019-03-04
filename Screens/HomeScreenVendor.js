//Home Screen Vendor
import React, { Component } from "react";
import MapView from "react-native-maps";
import {
  View,
  Text,
  Button,
  Dimensions,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Asyncstorage
} from "react-native";
import styles from "./Styles";
import * as firebase from "firebase";
import {Header, Left, Right, Icon} from 'native-base';
import SlidingPanel from "react-native-sliding-up-down-panels";
import {SearchBar} from "react-native-elements";
const win = Dimensions.get("window");
export default class HomeVendor extends Component {
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
  //will animate zoom in on location on press
  _gotoCurrentLocation(e) {
    this.map.animateToRegion({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: 0.0059397161733585335,
      longitudeDelta: 0.005845874547958374
    });
  }
//find position of user using geolocation: longitute and lattitude
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
    let ref = db.ref(`/vendors/${currentUser.uid}/name`);

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
    header: null,
    drawerIcon: ({})=>(
      <Icon name="md-home" style={{fontSize:24, color:'#4C2250'}}/>
    )
  }

  render() {
    const { name } = this.state;
    const { currentUser } = this.state;

    return (
      //SearchBar
      //Map
      //FoodIconSlider
      //ShopTables
      <View style={styles.container2}>
        <Header style = {{backgroundColor: '#f9e0d6'}}>
			    <Left>
				    <Icon name="md-menu" onPress={()=> this.props.navigation.openDrawer()}/>
			    </Left>
		    </Header>
        <View style = {styles.menuOptionsStyle}>
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
      <SlidingPanel
            headerLayoutHeight = {100}
            headerLayout = { () =>
                <View style={styles.headerLayoutStyle}>
                  <Text style={styles.commonTextStyle}>User Info</Text>
                </View>
            }
            slidingPanelLayout = { () =>
                <View style={styles.slidingPanelLayoutStyle}>
                    <Text>Welcome {name} ! </Text>
                    <Text>Email {currentUser && currentUser.email} </Text>
                    <Text>User Id {currentUser && currentUser.uid} ! </Text>
                </View>
            }
      />
      
      </View>
    );
  }
};
