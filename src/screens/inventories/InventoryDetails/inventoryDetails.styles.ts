import { StyleSheet } from 'react-native'

import colors from '../../../constants/colors'
import { FONT_SIZE_14, FONT_SIZE_18 } from '../../../constants/fontsSizes'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

const inventoryDetailsStyles = StyleSheet.create({
    scrollView: {},

    container: {
        borderTopLeftRadius: wp(10),
        borderTopRightRadius: wp(10),
        backgroundColor: '#f2f2f2',
        padding: wp('5%'),
        width: '100%'
    },

    heading: {
        fontSize: FONT_SIZE_18,
        color: '#000000',
        marginBottom: hp(1.5),
        fontFamily: 'Poppins-SemiBold'
    },

    separator: {
        width: '100%',
        height: hp(1),
        marginVertical: hp(0.5)
    },

    closeBtn: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(2),
        backgroundColor: colors.white,
        borderRadius: 10,
        paddingVertical: hp(2)
    },

    closeBtnText: {
        fontSize: FONT_SIZE_14,
        color: '#EE5B62',
        fontFamily: 'Poppins-Medium'
    }
})

export default inventoryDetailsStyles
