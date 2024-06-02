import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Button,
    Modal,
    Animated,
    Dimensions
} from 'react-native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { Divider, Image, ListItem } from 'react-native-elements';

const { height: windowHeight } = Dimensions.get('window');

const itemsPerPage = 5;

const MainScreen = (props) => {
    const [search, setSearch] = useState('');
    const [stocks, setStocks] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const modalHeight = useRef(new Animated.Value(windowHeight / 2)).current;
    const lastGestureDy = useRef(0);
    const dragY = useRef(new Animated.Value(0)).current;
    const dispatch = useDispatch();
    const globalStocks = useSelector(state => state.stocks);

    const [expandId, setExpandedId] = useState('');

    useEffect(() => {
        fetchStocks();
        setModalVisible(true)
    }, []);

    const fetchStocks = async () => {
        setIsFetching(true);
        try {
            const options = {
                method: 'GET',
                url: 'https://real-time-finance-data.p.rapidapi.com/market-trends',
                params: {
                    trend_type: 'GAINERS',
                    country: 'us',
                    language: 'en'
                },
                headers: {
                    'X-RapidAPI-Key': '1a3f38b61amsh126baf105a9ef9cp1a7168jsnedf5c59469f2',
                    'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
                }
            };
            const response = await axios.request(options);
            setStocks(response.data.data.trends);
            setTotalPages(Math.ceil(response.data.data.trends.length / itemsPerPage));
        } catch (error) {
            console.error(error);
        }
        setIsFetching(false);
    };

    const handleSearch = async () => {
        if (search.trim()) {
            setIsFetching(true);
            try {
                const options = {
                    method: 'GET',
                    url: 'https://real-time-finance-data.p.rapidapi.com/search',
                    params: {
                        query: search,
                        language: 'en'
                    },
                    headers: {
                        'X-RapidAPI-Key': '1a3f38b61amsh126baf105a9ef9cp1a7168jsnedf5c59469f2',
                        'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
                    }
                };
                const response = await axios.request(options);
                setStocks(response.data.data.stock);
                setPage(1);
                setTotalPages(Math.ceil(response.data.data.stock.length / itemsPerPage));
            } catch (error) {
                console.error(error);
            }
            setIsFetching(false);
        } else {
            setPage(1);
            fetchStocks();
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const onGestureEvent = Animated.event(
        [{ nativeEvent: { translationY: dragY } }],
        { useNativeDriver: false }
    );

    const onHandlerStateChange = ({ nativeEvent }) => {
        if (nativeEvent.oldState === State.ACTIVE) {
            let newY = nativeEvent.translationY + lastGestureDy.current;
            if (newY < -50) {
                newY = -windowHeight / 2;
            } else {
                newY = 0;
            }

            lastGestureDy.current = newY;
            dragY.setValue(0);

            const toValue = newY < 0 ? windowHeight : windowHeight / 2;
            setIsFullScreen(toValue === windowHeight);
            Animated.spring(modalHeight, {
                toValue,
                useNativeDriver: false,
            }).start();
        }
    };

    const navigateStock = (stock) => {
        setExpandedId(''),
            setModalVisible(false)
        dispatch({ type: 'NAVIGATION_STOCK', payload: { stock } });
        props.navigation.navigate('addToBuy');
    };

    const displayedStocks = stocks.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Modal
                    visible={modalVisible}
                    transparent
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <PanGestureHandler
                            onGestureEvent={onGestureEvent}
                            onHandlerStateChange={onHandlerStateChange}
                        >
                            <Animated.View style={[styles.modalContent, { height: modalHeight }]}>
                                <View style={{ height: 6, width: 50, alignSelf: 'center', backgroundColor: '#D9D9D9', marginTop: 2, marginBottom: 15, borderRadius: 5 }} />
                                {isFullScreen && (
                                    <View style={styles.searchContainer}>
                                        <FontAwesome name="search" size={20} color="#999999" style={styles.searchIcon} />
                                        <TextInput
                                            style={styles.searchBar}
                                            placeholder="Search for stocks"
                                            placeholderTextColor={'#999999'}
                                            onChangeText={setSearch}
                                            value={search}
                                            onSubmitEditing={handleSearch}
                                        />
                                    </View>
                                )}

                                <FlatList
                                    data={displayedStocks}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <>
                                            <TouchableOpacity onLongPress={() => setExpandedId(item.symbol)}
                                                onPress={() => navigateStock(item)}>
                                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <View style={styles.mainCardDiv}>
                                                        <View>
                                                            <Image source={require('../Images/AMD.png')} style={styles.cardImage} />
                                                        </View>
                                                        <View>
                                                            <Text style={styles.cardHeading}>{item.symbol}</Text>
                                                            <Text style={styles.cardParagraph}>{item.name}</Text>
                                                            <View style={styles.mainCardDivsub}>
                                                                <Text style={styles.cardPrice}>${item.price}</Text>
                                                                <Entypo name="triangle-up" size={22} style={styles.gainerIcon} />
                                                                <Text style={styles.searchIcons}>{(item.change_percent).toFixed(2)} %</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    {expandId == item.symbol && <Entypo name="triangle-up" size={30} />}
                                                </View>
                                                {expandId == item.symbol &&
                                                    <>
                                                        <ListItem.Title>Lorem ipsum dolor</ListItem.Title>
                                                        <ListItem.Subtitle>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem dignissimos explicabo consequatur quas, dolor ullam aperiam voluptates eaque modi molestias!</ListItem.Subtitle>
                                                    </>}
                                            </TouchableOpacity>
                                            <Divider style={{ height: 5 }} />
                                        </>
                                    )}
                                    ListFooterComponent={() => isFetching && <Text>Loading...</Text>}
                                />
                                {isFullScreen && (
                                    <View style={styles.pagination}>
                                        <Button title="<" onPress={handlePreviousPage} disabled={page === 1} />
                                        {[...Array(totalPages)].map((_, index) => (
                                            <Button
                                                key={index + 1}
                                                title={(index + 1).toString()}
                                                onPress={() => setPage(index + 1)}
                                                disabled={page === index + 1}
                                            />
                                        ))}
                                        <Button title=">" onPress={handleNextPage} disabled={page === totalPages} />
                                    </View>
                                )}
                            </Animated.View>
                        </PanGestureHandler>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#EBEBEB',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EBEBEB'
    },
    triggerButton: {
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
    },
    triggerButtonText: {
        color: 'white',
        fontSize: 18,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        backgroundColor: '#EBEBEB',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 8,
        marginTop: '15%',
        width: 340
    },
    searchIcon: {
        marginRight: 8,
    },
    searchBar: {
        flex: 1,
        height: 40,
        color: '#090909',
    },
    stockCard: {
        padding: 16,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 8,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    searchIcons: {
        color: '#34C759',
        alignSelf: 'flex-end',
        fontSize: 14,
        letterSpacing: 0.5,
    },
    gainerIcon: {
        color: '#34C759',
        alignSelf: 'flex-end',
        marginBottom: -2,
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
        marginBottom: 5,
    },
    cardParagraph: {
        fontSize: 14,
        fontWeight: '500',
        textTransform: 'capitalize',
        color: '#999999'
    },
    cardPrice: {
        fontSize: 20,
        fontWeight: '600',
    },
    mainCardDiv: {
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
    },
    mainCardDivsub: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
        paddingBottom: 15,
    },
});

export default MainScreen;
