import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { useDispatch } from 'react-redux';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleLogin = () => {
        dispatch({ type: 'LOGIN', payload: { email } });
        navigation.replace('ModalScreen');
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../Images/splashIcon.png')}
                style={styles.iconStyle}
            />
            <Text style={styles.title}>
                1% CLUB
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <View style={styles.buttonContainer}>
                <Button title="Login" onPress={handleLogin} color={'black'} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: 'black'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ecd996',
        textAlign: 'center',
        paddingBottom: '5%',
        marginTop: -40,
        marginBottom: '5%',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
        color: 'white',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        color: 'white'
    },
    iconStyle: {
        width: '15%',
        height: '15%',
        margin: '10%',
        objectFit: 'contain',
        alignSelf: 'center'
    },
    buttonContainer: {
        margin: 16,
        width: '50%',
        alignSelf: 'center',
        backgroundColor: '#ecd996',
        borderRadius: 25,
    }
});

export default LoginScreen;
