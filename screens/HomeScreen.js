import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import React, { useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../Firebase'

const HomeScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([])

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out user successfully")
      })
      .catch(error => console.log(error.message))
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.chat}>

      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  buttonContainer: {
    backgroundColor: 'white',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    marginTop: 10,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  chat: {

  },
})