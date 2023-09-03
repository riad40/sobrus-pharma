import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONT_SIZE_14 } from '../../constants/fontsSizes'
import Ionicons from 'react-native-vector-icons/Ionicons'
import colors from '../../constants/colors'

interface CustomInputContainerProps {
    label?: string
    element: React.ReactNode
    icon?: string
    error?: string
}

const CustomInputContainer = ({ label, element, icon, error }: CustomInputContainerProps): JSX.Element => {
    return (
        <>
            {label && <Text style={styles.inputLabel}>{label}</Text>}
            <View
                style={[
                    styles.inputContainer,
                    {
                        borderColor: error ? 'red' : 'lightgrey'
                    }
                ]}
            >
                {element}

                {icon && <Ionicons name={icon} size={hp(3)} color={colors.secondary} />}
            </View>
            {error && <Text style={{ color: 'red', fontSize: FONT_SIZE_14 }}>{error}</Text>}
        </>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        backgroundColor: '#F8F8F8',
        borderRadius: hp(1),
        paddingHorizontal: wp(2),
        paddingVertical: hp(0.2),
        borderColor: 'lightgrey',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: hp(1.5)
    },
    inputLabel: {
        fontSize: FONT_SIZE_14,
        color: '#000',
        fontFamily: 'Poppins-Medium',
        marginBottom: hp(1),
        marginLeft: wp(1)
    }
})

export default CustomInputContainer
