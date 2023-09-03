import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONT_SIZE_14, FONT_SIZE_16 } from '../../../../constants/fontsSizes'

const productsListStyles = StyleSheet.create({
    startView: {
        position: 'absolute',
        top: hp(9),
        zIndex: 9999,
        borderTopLeftRadius: wp(10),
        borderTopRightRadius: wp(10),
        backgroundColor: '#f2f2f2',
        paddingVertical: hp(1.5),
        width: '100%'
    },
    container: {
        paddingHorizontal: wp(5)
    },

    productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        borderRadius: 10,
        paddingHorizontal: wp(5),
        paddingVertical: hp(2),
        marginBottom: wp(2)
    },

    productName: {
        fontSize: FONT_SIZE_16,
        color: '#000',
        marginBottom: wp(1),
        textTransform: 'uppercase',
        fontFamily: 'Poppins-SemiBold'
    },

    lightText: {
        fontSize: FONT_SIZE_14,
        fontFamily: 'Poppins-light',
        color: '#707070'
    },

    noProductsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(10)
    },

    noProductsText: {
        fontSize: FONT_SIZE_16,
        fontFamily: 'Poppins-SemiBold',
        color: '#707070'
    }
})

export default productsListStyles
