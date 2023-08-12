import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import { ActivityIndicator } from 'react-native';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
  <Stack.Navigator>
    <Stack.Screen options={{ headerShown: false }} name="LoginScreen" component={LoginScreen} />
  </Stack.Navigator>)
}

function MainStack() {
  return (
    <Stack.Navigator>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
  </Stack.Navigator>)
}

function RootNavigation() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async userSignedIn => {
      print(true)
      if (userSignedIn) {
        setUser(userSignedIn)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return unsubscribe()
  }, [user])
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    )
  }
  return (
    <NavigationContainer>
      {user ? <MainStack/> : <AuthStack/>}
    </NavigationContainer>
  )
}

export default function App() {
  return (
      <RootNavigation />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
