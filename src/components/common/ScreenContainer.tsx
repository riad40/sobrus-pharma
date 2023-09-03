import React from 'react'
import { View, Text, StyleSheet, StatusBar, Pressable } from 'react-native'

import colors from '../../constants/colors'
import { FONT_SIZE_24 } from '../../constants/fontsSizes'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { useNavigation } from '@react-navigation/native'

interface ScreenContainerProps {
    title: string
    element?: React.ReactNode
    icon: boolean
    children?: React.ReactNode
}

const ScreenContainer = ({ title, icon, children, element }: ScreenContainerProps): JSX.Element => {
    const navigation = useNavigation()

    return (
        <>
            <StatusBar backgroundColor={colors.primary} />
            <View style={styles.container}>
                {icon && (
                    <Pressable style={styles.icon} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={20} color={colors.white} />
                    </Pressable>
                )}
                {element ? element : <Text style={styles.title}>{title}</Text>}
            </View>

            <View style={styles.screenBody}>{children}</View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: wp(7),
        backgroundColor: colors.primary,
        height: hp(15),
        paddingTop: hp(2),
        alignItems: 'flex-start'
    },

    title: {
        fontSize: FONT_SIZE_24,
        color: colors.white,
        marginLeft: wp(3),
        fontFamily: 'Poppins-Medium'
    },

    icon: {
        borderColor: colors.primary,
        borderWidth: wp(1),
        backgroundColor: '#80E3DE',
        alignItems: 'center',
        width: wp(10),
        height: wp(10),
        borderRadius: wp(5),
        justifyContent: 'center'
    },

    screenBody: {
        position: 'absolute',
        top: hp(9),
        zIndex: 1,
        width: '100%'
    }
})

export default ScreenContainer
