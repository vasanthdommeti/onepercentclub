import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Login');
        }, 2000);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image
                source={require('../Images/splashIcon.png')}
                style={styles.iconStyle}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    iconStyle: {
        width: 97.49,
        height: 145.25
    },
});

export default SplashScreen;
