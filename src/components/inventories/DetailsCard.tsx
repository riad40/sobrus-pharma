import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import colors from '../../constants/colors'
import { FONT_SIZE_12 } from '../../constants/fontsSizes'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

interface DetailsCardProps {
    details: { label: string; value: string | number }[]
}

const DetailsCard = ({ details }: DetailsCardProps): JSX.Element => {
    if (!details) return <View />

    return (
        <View style={styles.container}>
            {details.map((detail, index) => (
                <View key={index} style={styles.wrapper}>
                    <Text style={styles.text}>{detail.label}</Text>
                    <View
                        style={
                            detail.label === 'Statut' && [
                                styles.statusContainer,
                                detail.value === 'ouvert'
                                    ? { backgroundColor: colors.primary }
                                    : { backgroundColor: '#FE5D66' }
                            ]
                        }
                    >
                        <Text
                            style={[
                                styles.text,
                                detail.label === 'Statut' && { color: colors.white, textTransform: 'capitalize' },
                                detail.label === 'Nombre de produits sondés' && { color: colors.primary }
                            ]}
                        >
                            {detail.value}
                        </Text>
                    </View>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: colors.white,
        borderRadius: 10,
        paddingHorizontal: wp(5),
        paddingVertical: hp(2),
        marginVertical: hp(1)
    },

    text: {
        fontSize: FONT_SIZE_12,
        color: '#000',
        fontFamily: 'Poppins-light'
    },

    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: hp(1)
    },

    statusContainer: {
        color: colors.white,
        paddingHorizontal: wp(5),
        paddingVertical: hp(0.7),
        borderRadius: 5
    }
})

export default DetailsCard
