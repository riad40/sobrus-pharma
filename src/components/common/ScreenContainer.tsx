import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FONT_SIZE_24 } from '../../constants/fontsSizes'
import colors from '../../constants/colors'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

interface ScreenContainerProps {
    title: string
    icon: boolean
    children?: React.ReactNode
}

const ScreenContainer = ({ title, icon, children }: ScreenContainerProps): JSX.Element => {
    return (
        <>
            <View style={styles.container}>
                {icon && (
                    <View style={styles.icon}>
                        <Ionicons name="arrow-back" size={20} color={colors.white} />
                    </View>
                )}
                <Text style={styles.title}>{title}</Text>
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
        paddingTop: hp(2)
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
