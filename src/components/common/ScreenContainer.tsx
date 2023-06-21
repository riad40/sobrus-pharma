import React from 'react'
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native'
import { FONT_SIZE_24 } from '../../constants/fontsSizes'
import colors from '../../constants/colors'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SCREEN_HEIGHT } from '../../constants/dimensions'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

interface ScreenContainerProps {
    title: string
    icon: boolean
    children?: React.ReactNode
}

const ScreenContainer = ({ title, icon, children }: ScreenContainerProps): JSX.Element => {
    return (
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <StatusBar backgroundColor={colors.primary} />
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    {icon && (
                        <View style={styles.icon}>
                            <Ionicons name="arrow-back" size={20} color={colors.white} />
                        </View>
                    )}
                    <Text style={styles.title}>{title}</Text>
                </View>
            </View>

            <View style={styles.screenBody}>{children}</View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(7),
        paddingVertical: hp(4)
    },

    mainContainer: {
        backgroundColor: colors.primary,
        height: SCREEN_HEIGHT - 700
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
        paddingVertical: wp(1),
        paddingHorizontal: wp(1.2),
        alignItems: 'center',
        borderRadius: wp(5)
    },

    screenBody: {
        position: 'relative',
        bottom: SCREEN_HEIGHT - 800,
        zIndex: 1,
        width: '100%',
        borderTopLeftRadius: wp(10),
        borderTopRightRadius: wp(10),
        justifyContent: 'center'
    }
})

export default ScreenContainer
