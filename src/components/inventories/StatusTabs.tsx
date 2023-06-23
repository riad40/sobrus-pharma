import React, { useRef, useState, useEffect } from 'react'
import { Text, View, Pressable, Animated, StyleSheet } from 'react-native'
import colors from '../../constants/colors'
import { SCREEN_WIDTH } from '../../constants/dimensions'
import { FONT_SIZE_14 } from '../../constants/fontsSizes'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useAppDispatch } from '../../state/store'
import { getInventoriesByStatus } from '../../state/features/InventorySlice'

const StatusTabs = (): JSX.Element => {
    const [activeTab, setActiveTab] = useState(0)
    const tabPosition = useRef(new Animated.Value(0)).current

    const handleTabChange = (tabIndex: number) => {
        setActiveTab(tabIndex)

        Animated.timing(tabPosition, {
            toValue: (SCREEN_WIDTH / 3) * tabIndex,
            duration: 300,
            useNativeDriver: true
        }).start()
    }

    const dispatch = useAppDispatch()

    useEffect(() => {
        switch (activeTab) {
            case 0:
                dispatch(getInventoriesByStatus(0))
                break
            case 1:
                dispatch(getInventoriesByStatus(1))
                break
            case 2:
                dispatch(getInventoriesByStatus(2))
                break
            default:
                break
        }
    }, [activeTab, dispatch])

    return (
        <>
            <View style={styles.tabsContainer}>
                <Pressable onPress={() => handleTabChange(0)}>
                    <Text style={[styles.tabText, { color: activeTab === 0 ? colors.primary : colors.secondary }]}>
                        Tout
                    </Text>
                </Pressable>

                <Pressable onPress={() => handleTabChange(1)}>
                    <Text style={[styles.tabText, { color: activeTab === 1 ? colors.primary : colors.secondary }]}>
                        Fermé
                    </Text>
                </Pressable>

                <Pressable onPress={() => handleTabChange(2)}>
                    <Text style={[styles.tabText, { color: activeTab === 2 ? colors.primary : colors.secondary }]}>
                        Ouvert
                    </Text>
                </Pressable>
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
        paddingHorizontal: wp('15%'),
        paddingTop: hp('2%'),
        paddingBottom: hp('1%'),
        width: '100%',
        backgroundColor: colors.white,
        borderTopLeftRadius: wp(10),
        borderTopRightRadius: wp(10)
    },

    tabText: {
        fontSize: FONT_SIZE_14,
        textTransform: 'uppercase',
        fontFamily: 'Poppins-Regular',
        textAlign: 'center'
    },

    bottomBorder: {
        height: hp('0.3%'),
        backgroundColor: colors.primary
    }
})

export default StatusTabs
