import React from 'react'
import { Text, View, Pressable, StyleSheet } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import colors from '../../constants/colors'
import { FONT_SIZE_14, FONT_SIZE_12 } from '../../constants/fontsSizes'

import { useNavigation, NavigationProp } from '@react-navigation/native'
import RootStackParamsList from '../../navigations/RootStackParamsList'

import { Inventory } from '../../@types'

interface InventoryCardProps {
    inventory: Inventory
    onPress: () => void
}

const InventoryCard = ({ inventory, onPress }: InventoryCardProps): JSX.Element => {
    const disabled = inventory.status === 'férmé' ? true : false

    const navigation = useNavigation<NavigationProp<RootStackParamsList, 'ScanningScreen'>>()

    const { status } = inventory

    const idFormatted = inventory.id < 10 ? `0${inventory.id}` : inventory.id

    return (
        <>
            <Pressable onPress={onPress}>
                <View style={styles.cardContainer}>
                    <View style={styles.cardLeft}>
                        <View style={styles.cardLeftTop}>
                            <Text style={styles.cardLeftTopTitle}>{inventory.reason}</Text>
                            <Text style={styles.cardLeftTopId}>-{idFormatted}</Text>
                        </View>
                        <View style={styles.cardLeftBottom}>
                            <View style={styles.bottomLeftContainer}>
                                <Text style={styles.dateText}>{inventory.date}</Text>
                            </View>
                            <View
                                style={[
                                    styles.bottomLeftContainer,
                                    status === 'ouvert'
                                        ? { backgroundColor: '#E4F9F9' }
                                        : { backgroundColor: '#ffc2c9' }
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.statusText,
                                        status === 'ouvert' ? { color: colors.primary } : { color: '#FE5D66' }
                                    ]}
                                >
                                    {status}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <Pressable
                        onPress={() => navigation.navigate('ScanningScreen', { id: inventory.id })}
                        style={[
                            styles.cardRight,
                            {
                                backgroundColor: status === 'ouvert' ? colors.primary : '#F5F5F8'
                            }
                        ]}
                        disabled={disabled}
                    >
                        <Ionicons
                            name="scan-outline"
                            size={30}
                            color={status === 'ouvert' ? colors.white : '#000'}
                            style={{ marginLeft: wp(0.5) }}
                        />
                    </Pressable>
                </View>
            </Pressable>
        </>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingVertical: hp(2),
        paddingHorizontal: wp(5),
        borderRadius: wp(2),
        marginBottom: hp(2),
        marginHorizontal: wp(5)
    },

    cardLeft: {
        alignItems: 'flex-start'
    },

    cardLeftTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: hp(1)
    },

    cardLeftTopTitle: {
        fontSize: FONT_SIZE_14,
        fontFamily: 'Poppins-SemiBold',
        color: '#000'
    },

    cardLeftTopId: {
        fontSize: FONT_SIZE_14,
        fontFamily: 'Poppins-SemiBold',
        color: colors.primary,
        marginLeft: wp(2)
    },

    cardLeftBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    dateText: {
        fontSize: FONT_SIZE_12,
        fontFamily: 'Poppins-Regular',
        color: '#838585'
    },

    bottomLeftContainer: {
        borderRadius: wp(5),
        backgroundColor: '#F5F5F8',
        paddingHorizontal: wp(4),
        paddingVertical: hp(0.5),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: wp(2)
    },

    statusText: {
        fontSize: FONT_SIZE_12,
        fontFamily: 'Poppins-Medium',
        textTransform: 'capitalize'
    },

    cardRight: {
        backgroundColor: '#F5F5F8',
        borderRadius: wp(4),
        padding: wp(2)
    }
})

export default InventoryCard
