import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../Firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                navigation.replace('HomeScreen')
            }
        })

        return unsubscribe
    })

    const handleRegister = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const user = userCredentials.user
            console.log("Successfully registered user:", user.email)
        })
        .catch(error => console.log(error.message))
    }

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const user = userCredentials.user
            console.log("Successfully logged in user:", user.email)
        })
        .catch(error => console.log(error.message))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>ChatApp</Text>
            <View style={styles.inputWrapper}>
                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input} />
                <TextInput
                    placeholder='Password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry />
            </View>
            <View style={styles.buttonWrapper}> 
                <TouchableOpacity 
                    style={styles.button}
                    onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2e2e2e'
    },
    inputWrapper: {
        width: '70%'
    },
    input: {
        backgroundColor: 'white',
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10
    },
    buttonWrapper: {
        marginTop: 20,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: 'red',
        width: '100%',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 15,
        marginBottom: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 20
    },
    titleText: {
        fontSize: 30,
        paddingBottom: 40,
        fontWeight: 'bold',
        color: 'white'
    }
})