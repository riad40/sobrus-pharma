import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import colors from '../../constants/colors'
import { FONT_SIZE_12, FONT_SIZE_14 } from '../../constants/fontsSizes'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

interface ProductCardProps {
    product: { name: string; codeBar: string; quantity: number }
}

const ProductCard = ({ product }: ProductCardProps): JSX.Element => {
    const { name, codeBar, quantity } = product

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/images/packaging.png')} style={styles.image} />
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.name}>{name}</Text>
                <View style={styles.minContainer}>
                    <Text style={styles.codeBar}>{codeBar}</Text>
                    <Text style={styles.quantity}>Qte: {quantity}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 6,
        paddingVertical: hp(1),
        paddingHorizontal: wp(3),
        marginVertical: hp(1),
        marginHorizontal: wp(3)
    },

    imageContainer: {
        borderRadius: 10,
        overflow: 'hidden',
        width: '20%',
        height: wp(15),
        marginRight: wp(5)
    },

    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },

    detailsContainer: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '80%'
    },

    name: {
        fontSize: FONT_SIZE_14,
        fontWeight: 'bold',
        color: '#000',
        textTransform: 'uppercase',
        marginBottom: hp(1),
        fontFamily: 'Poppins-Regular'
    },

    minContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        marginTop: hp(1)
    },

    codeBar: {
        fontSize: FONT_SIZE_12,
        color: colors.secondary
    },

    quantity: {
        fontSize: FONT_SIZE_12,
        color: colors.primary
    }
})

export default ProductCard
