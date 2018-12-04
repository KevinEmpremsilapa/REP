import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity,Button , TextInput, StyleSheet } from 'react-native'
import styles from './Styles';

export default class EditProfile extends Component {

   render() {
      return (
         <View>

            <Text style = {styles.bottomText}>
                    Edit Profile Screen
            </Text>

            <Image source = {require('../Screens/Images/Dog.jpg')}
             style={{width: 100, height: 100}} />

         </View>
      )
   }
}