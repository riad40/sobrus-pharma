import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import colors from '../../constants/colors'
import { FONT_SIZE_14 } from '../../constants/fontsSizes'

interface ProductStatusCardProps {
    status: string
    onPress: () => void
}

const ProductStatusCard = ({ status, onPress }: ProductStatusCardProps): JSX.Element => {
    const text = status === 'known' ? 'Les produits connus' : 'Les produits inconnus'

    const statusColor = status === 'known' ? colors.primary : '#ECBF78'

    const statusBackgroundColor = status === 'known' ? '#E4F9F9' : '#FFF7E5'

    return (
        <Pressable style={styles.container} onPress={onPress}>
            <Text style={[styles.text, { color: statusColor }]}>{text}</Text>
            <View style={[styles.statusContainer, { backgroundColor: statusBackgroundColor }]}>
                <Ionicons name="chevron-forward-outline" size={20} color={statusColor} />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: colors.white,
        borderRadius: 10,
        paddingHorizontal: wp(5),
        paddingVertical: hp(3),
        marginVertical: hp(1),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        fontSize: FONT_SIZE_14,
        color: '#000',
        fontFamily: 'Poppins-light'
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        width: wp(6),
        height: hp(3)
    }
})

export default ProductStatusCard
