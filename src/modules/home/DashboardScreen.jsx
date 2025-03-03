import React, { useState, useRef, useEffect, useOptimistic } from "react"
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, Image, FlatList, Linking } from "react-native";
import Colors from "../../core/library/Colors";
import { FONT_FAMILYS, selected_Font_Type, fontStyles } from "../../core/library/Fonts";
import { TextInput, Button } from 'react-native-paper';
import { CustomTexttInput, ScreenContainer } from "../../components";
import { relativeHeight, relativeWidth } from "../../core/library/Metrix";
import { InputType } from "../../core/library/Constant";
import Icon from "../../../assets/Icon.png"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { requestPushNotification } from "../../core/helper/PushNotificationHelper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchMarketNews } from "../../core/services/Api.service";
import moment from "moment";
import { RefreshControl } from "react-native-gesture-handler";
import { Toast, ALERT_TYPE } from "react-native-alert-notification";



const DashboardScreen = () => {
    const [user, setUser] = useState(null);
    const [news, setNews] = useState([]);
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {

        const loadUserData = async () => {
            try {
                const storedUser = await AsyncStorage.getItem("user");
                if (storedUser) {
                    setUser(JSON.parse(storedUser)); // Convert from JSON
                }
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };

        loadNews();
        loadUserData();
    }, []);

    const loadNews = async () => {
        toggleLoading(!loading)
        const data = await fetchMarketNews();
        setNews(data);
        toggleLoading(false);
    };

    const onRefresh = () => {
        loadNews();
    };

    const openUrl = async (url) => {

        try {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                if (Platform.OS == 'android') {
                    url = encodeURI(url)
                     Linking.openURL(url).catch(err => {
                        console.error("Failed to open URL:", err)
                        Toast.show({
                            type: ALERT_TYPE.DANGER,
                            title: 'Error',
                            textBody: 'Cannot open this URL',
                        });
    
                    })
                } else {
                    Toast.show({
                        type: ALERT_TYPE.DANGER,
                        title: 'Error',
                        textBody: 'Cannot open this URL',
                    })
                }



            }
        } catch (error) {
            console.error('Failed to open URL:', error);
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: 'An unexpected error occurred.',
            })
        }
    }

    const renderListEmpty = ({ item, index }) => {
        return (
            <View style={{ height: relativeHeight(200), marginTop: relativeHeight(10), }}>
                <Text style={[
                    fontStyles.CUSTOM_TEXT(
                        Colors.white,
                        'left',
                        FONT_FAMILYS[selected_Font_Type].REGULAR,
                        'normal',
                        15,
                    ),
                    { fontWeight: '500', lineHeight: relativeHeight(24) }
                ]}>Something went wrong. Please try again later.</Text>
            </View>
        )
    }

    const renderItem = ({ item, index }) => {

        return (
            <TouchableOpacity onPress={() => openUrl(item?.url)} style={styles.card}>
                <Image source={{ uri: item?.image }} style={styles.image} />
                <View style={styles.textContainer}>
                    <View style={styles.topRow}>
                        <View>
                            <Text style={[
                                fontStyles.CUSTOM_TEXT(
                                    Colors.white7,
                                    'left',
                                    FONT_FAMILYS[selected_Font_Type].REGULAR,
                                    'normal',
                                    12,
                                ),
                                { fontWeight: '400', lineHeight: relativeHeight(16) }
                            ]}>{item.category}</Text>

                        </View>
                        <View>

                            <Text style={[
                                fontStyles.CUSTOM_TEXT(
                                    Colors.white7,
                                    'left',
                                    FONT_FAMILYS[selected_Font_Type].REGULAR,
                                    'normal',
                                    12,
                                ),
                                { fontWeight: '400', lineHeight: relativeHeight(16) }
                            ]}>{moment(new Date(item.datetime)).format("DD MMM YYYY")}</Text>

                        </View>
                    </View>
                    <View>
                        <Text numberOfLines={3} lineBreakMode={'tail'} style={[
                            fontStyles.CUSTOM_TEXT(
                                Colors.white,
                                'left',
                                FONT_FAMILYS[selected_Font_Type].REGULAR,
                                'normal',
                                20,
                            ),
                            { fontWeight: '500', lineHeight: relativeHeight(24) }
                        ]}>{item.headline}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };
    return (
        <ScreenContainer
            height={124}
            headerTextColor={Colors.white}
            backgroundColor={Colors.navyBlue}
            // isHideLeft comment if you want to show back button
            isHideLeft
            headerText={`Hey ${user?.firstName}`}
            paddingHorizontal={10}
        >
            <FlatList
                refreshControl={
                    <RefreshControl
                        progressBackgroundColor={Colors.white}
                        colors={[Colors.navyBlue]}
                        tintColor={Colors.white}
                        size={'default'}
                        onRefresh={onRefresh}
                        refreshing={loading} />}
                data={news}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                initialNumToRender={20}
                maxToRenderPerBatch={50}
                windowSize={10}
                removeClippedSubviews={true}
                getItemLayout={(_, index) => ({
                    length: relativeHeight(132),
                    offset: 50 * index,
                    index,
                })}
                ListEmptyComponent={renderListEmpty}
            />

        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        borderRadius: 8,
        alignItems: "center",
        width: '100%',
        height: relativeHeight(132),
        justifyContent: "center",
    },
    image: {
        width: relativeHeight(100),
        height: relativeHeight(100),

        marginRight: relativeHeight(15),
        resizeMode: "center"
    },
    textContainer: {
        flex: 1,
        height: '100%',
        paddingVertical: relativeHeight(20)
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
    },
    BottomRow: {

    }

});

export default DashboardScreen;