import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import React, { useLayoutEffect, useState, useCallback } from 'react'
import { signOut } from 'firebase/auth'
import { auth, db } from '../Firebase'
import { collection, addDoc, orderBy, query, onSnapshot, getDocs } from "firebase/firestore";
import { SafeAreaView } from 'react-native-safe-area-context'

const HomeScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([])
  useLayoutEffect(() => {
    const getMessages = async () => {
      const q = await getDocs(collection(db, "chats"), orderBy('createdAt'));

      setMessages(q.docs.map(item => ({
        _id: item.data()._id,
        createdAt: item.data().createdAt.toDate(),
        text: item.data().text,
        user: item.data().user
      })))
      console.log(messages)
    }
    return () => getMessages()
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )

    const {_id, createdAt, text, user} = messages[0]
    const addMessageToDB = async () => {
      await addDoc(collection(db, 'chats'), {
        _id,
        createdAt,
        text,
        user
      })
    }

    return addMessageToDB()
  }, [])

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
      <SafeAreaView style={{ flex: 1, width: '100%' }}>
        <GiftedChat
          messages={messages}
          user={{
            _id: auth?.currentUser?.email,
            avatar: 'https://i.pravatar.cc/300'
          }}
          messageContainerStyle={{ backgroundColor: 'white' }}
          onSend={onSend} />
      </SafeAreaView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1
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