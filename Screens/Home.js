//Home Screen
import React, { Component } from 'react'
import MapView from 'react-native-maps'
import styles from './Styles';
import { SearchBar } from 'react-native-elements'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

export default class Home extends Component {
   render() {
      return (
         <View>           
             <SearchBar
                round
                searchIcon={{ size: 24 }}
                placeholder='Search'/>
            
             <MapView
                style ={styles.map}>
             </MapView>

         </View>
      );
   }
}


