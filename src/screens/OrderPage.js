import React, { useState } from 'react';
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Button, Image } from 'react-native-elements';
import SwipeButton from 'rn-swipe-button';
import { useDispatch, useSelector } from 'react-redux';


export const OrderPage = (props) => {
    const [buttonText, setButtonText] = useState('Swipe to Submit');
    const dispatch = useDispatch();
    const globalStocks = useSelector(state => state.stocks.stocks);

    const removeCart = () => {
        dispatch({ type: 'REMOVE_ORDER' });
        props.navigation.replace('ModalScreen');
    };


    return (
        <SafeAreaView>
            <Entypo name="chevron-left" color={'#999999'} size={30} onPress={() => props.navigation.replace('addToBuy')} />
            <Text style={styles.orderHeading}>Open Orders</Text>
            <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: '87%' }}>
                <View style={{ paddingLeft: 15, paddingTop: 20, }}>
                    <View style={styles.mainCardDiv}>
                        <View>
                            <Image source={require('../Images/AMD.png')} style={styles.cardImage} />
                        </View>
                        <View>
                            <Text style={styles.cardHeading}>{globalStocks.symbol}</Text>
                            <Text style={styles.cardParagraph}>{globalStocks.name}</Text>
                            <View style={styles.mainCardDiv}>
                                <Text style={styles.cardPrice}>${globalStocks.price}</Text>
                                <Entypo name="triangle-up" style={styles.searchIcons} />
                                <Text style={styles.searchIcons}>{(globalStocks.change_percent).toFixed(2)}%</Text>
                            </View>
                        </View>
                        <View style={{ alignSelf: 'center', marginLeft: '15%' }}>
                            <TouchableOpacity onPressIn={() => removeCart()}>
                                <AntDesign name="delete" size={25} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ marginHorizontal: 20 }}>
                    <SwipeButton
                        disabled={false}
                        swipeSuccessThreshold={70}
                        height={70}
                        width={330}
                        title={buttonText}
                        titleStyles={{ zIndex: 1 }}
                        onSwipeStart={() => {
                            setButtonText('Release');
                        }}
                        onSwipeSuccess={() => {
                            setButtonText('Confirmed!');
                            dispatch({ type: 'REMOVE_ORDER' });
                            props.navigation.replace('ModalScreen');
                        }}
                        thumbIconImageSource={buttonText === 'Confirmed!' ? require('../Images/tick.png') : require('../Images/right.png')}
                        railFillBackgroundColor={buttonText === 'Confirmed!' ? '#34C759' : '#FFF5D1'}
                        railFillBorderColor={buttonText === 'Confirmed!' ? '#34C759' : 'transperant'}
                        thumbIconBackgroundColor="#FFFFFF"
                        thumbIconBorderColor={buttonText === 'Confirmed!' ? '#34C759' : 'lightgray'}
                        railBackgroundColor={buttonText === 'Confirmed!' ? '#34C759' : '#FFF5D1'}
                        railBorderColor={buttonText === 'Confirmed!' ? '#34C759' : 'lightgray'}
                        railStyles={{
                            backgroundColor: buttonText === 'Confirmed!' ? '#34C759' : '#FFF5D1',
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    //cardcomponent styles
    mainCardDiv: {
        display: 'flex',
        flexDirection: 'row',
    },
    searchIcons: {
        color: 'green',
        alignSelf: 'flex-end',
        fontSize: 16
    },
    cardImage: {
        height: 60,
        width: 60,
        objectFit: 'contain',
        marginRight: '10%',
    },
    cardHeading: {
        fontSize: 20,
        fontWeight: '600',
        textTransform: 'uppercase',
        marginBottom: '2%',
    },
    orderHeading: {
        fontSize: 20,
        fontWeight: '600',
        textTransform: 'uppercase',
        margin: 15

    },
    cardParagraph: {
        fontSize: 14,
        fontWeight: '500',
        textTransform: 'capitalize',
        color: '#999999',
        marginBottom: '2%',
    },
    cardPrice: {
        fontSize: 20,
        fontWeight: '600',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    titleStyle: {
        fontSize: 18,
        marginBottom: 12,
    },
})