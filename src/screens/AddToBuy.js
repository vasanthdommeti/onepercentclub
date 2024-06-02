import { Modal, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from 'react-native-vector-icons/Entypo';
import { BottomSheet, Button, Divider, Icon, Image, ListItem, SearchBar } from 'react-native-elements';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';



const AddToBuy = ({ navigation, close, open }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();
    const cartStocks = useSelector(state => state.navigationDetails.navigationStock.stock);
    const { name, change_percent, price, symbol } = cartStocks;

    const addToCart = () => {
        dispatch({ type: 'SET_STOCKS', payload: cartStocks });
        navigation.replace('orderPage')
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View >
                <Entypo name="chevron-left" color={'gray'} size={30} onPress={() => navigation.replace('ModalScreen')} />
                <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: '92%' }}>
                    <View style={{ paddingLeft: 15, paddingTop: 20 }}>
                        <Image source={require('../Images/AMD.png')} style={styles.cardImage} />
                        <View>
                            <Text style={styles.cardHeading}>{symbol}</Text>
                            <Text style={styles.cardParagraph}>{name}</Text>
                            <Text style={styles.cardPrice} >${price}</Text>
                            <View style={styles.mainCardDiv}>
                                <Entypo name="triangle-up" style={{ fontSize: 28, color: '#34C759', marginLeft: -5 }} />
                                <Text style={{ fontSize: 20, color: '#34C759' }}>{change_percent} %</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: '10%' }}>
                            <Text style={styles.stockDescription}>
                                Lorem ipsum dolor
                            </Text>
                            <Text style={styles.stockPara}>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur expedita iusto suscipit quod ex rerum excepturi ad harum ipsum distinctio nisi, temporibus tempore tempora impedit dignissimos eum porro odit doloribus!
                            </Text>
                        </View>
                        <View style={{ marginTop: '10%' }}>
                            <Text style={styles.stockDescription}>
                                Lorem ipsum dolor
                            </Text>
                            <Text style={styles.stockPara}>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur expedita iusto suscipit quod ex rerum excepturi ad harum ipsum distinctio nisi, temporibus tempore tempora impedit dignissimos eum porro odit doloribus!
                            </Text>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 20, marginTop: '%' }}>
                        <Button
                            onPress={() => addToCart()}
                            title="Add to order"
                            titleStyle={{ color: '#090909', fontSize: 20, fontWeight: '600', }}
                            buttonStyle={{ backgroundColor: '#ECD996', padding: 15 }}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default AddToBuy;

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
        height: 100,
        width: 100,
        objectFit: 'contain',
        marginRight: '10%',
    },
    cardHeading: {
        fontSize: 28,
        fontWeight: '600',
        textTransform: 'uppercase',
        marginBottom: '1%',
        marginTop : '-6%'
    },
    stockDescription: {
        fontSize: 20,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    cardParagraph: {
        fontSize: 16,
        fontWeight: '500',
        textTransform: 'capitalize',
        color: '#999999',
        marginBottom: '1%',
    },
    cardPrice: {
        fontSize: 32,
        fontWeight: '600',
    },
    stockPara:{
        fontSize: 16,
        fontWeight: '500',
        marginTop: '2%',
    }
})