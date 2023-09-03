import React, { useRef, useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, Animated, StyleSheet } from 'react-native'

import colors from '../../constants/colors'
import { SCREEN_WIDTH } from '../../constants/dimensions'
import { FONT_SIZE_14 } from '../../constants/fontsSizes'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { getInventories } from '../../controllers/InventoriesController'

import { useAppDispatch } from '../../state/store'
import { saveInventories } from '../../state/features/InventorySlice'

import filterInventories from '../../helpers/filterInventories'

import { useNavigation, NavigationProp } from '@react-navigation/native'
import InventoryStackParamsList from '../../navigations/stacks/InventoryStack/InventoryStackParamsList'

const StatusTabs = (): JSX.Element => {
    const navigation = useNavigation<NavigationProp<InventoryStackParamsList, 'InventoriesList'>>()

    const [activeTab, setActiveTab] = useState(0)

    const tabPosition = useRef(new Animated.Value(0)).current

    const handleTabChange = (tabIndex: number) => {
        setActiveTab(tabIndex)

        Animated.timing(tabPosition, {
            toValue: (SCREEN_WIDTH / 3) * tabIndex,
            duration: 200,
            useNativeDriver: true
        }).start()
    }

    const dispatch = useAppDispatch()

    useEffect(() => {
        navigation.addListener('focus', () => {
            dispatch(saveInventories(getInventories()))
        })
    }, [dispatch])

    useEffect(() => {
        switch (activeTab) {
            case 0:
                dispatch(saveInventories(getInventories()))
                break
            case 1:
                dispatch(saveInventories(filterInventories(getInventories(), 'férmé')))
                break
            case 2:
                dispatch(saveInventories(filterInventories(getInventories(), 'ouvert')))
                break
            default:
                break
        }
    }, [activeTab])

    return (
        <>
            <View style={styles.tabsContainer}>
                <TouchableOpacity onPress={() => handleTabChange(0)} style={styles.tabContainer}>
                    <Text style={[styles.tabText, { color: activeTab === 0 ? colors.primary : colors.secondary }]}>
                        Tout
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleTabChange(1)} style={styles.tabContainer}>
                    <Text style={[styles.tabText, { color: activeTab === 1 ? colors.primary : colors.secondary }]}>
                        Fermé
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleTabChange(2)} style={styles.tabContainer}>
                    <Text style={[styles.tabText, { color: activeTab === 2 ? colors.primary : colors.secondary }]}>
                        Ouvert
                    </Text>
                </TouchableOpacity>
            </View>
            <Animated.View
                style={[
                    styles.bottomBorder,
                    {
                        transform: [{ translateX: tabPosition }],
                        width: SCREEN_WIDTH / 3
                    }
                ]}
            />
        </>
    )
}

const styles = StyleSheet.create({
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: hp(2),
        paddingBottom: hp(1),
        width: '100%',
        backgroundColor: colors.white,
        position: 'absolute',
        top: hp(9),
        zIndex: 1,
        borderTopLeftRadius: wp(10),
        borderTopRightRadius: wp(10)
    },

    tabContainer: {
        width: SCREEN_WIDTH / 3
    },

    tabText: {
        fontSize: FONT_SIZE_14,
        textTransform: 'uppercase',
        fontFamily: 'Poppins-Regular',
        textAlign: 'center'
    },

    bottomBorder: {
        height: hp(0.3),
        backgroundColor: colors.primary,
        zIndex: 300
    }
})

export default StatusTabs
