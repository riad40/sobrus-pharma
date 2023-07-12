import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONT_SIZE_12, FONT_SIZE_18 } from '../../../../constants/fontsSizes'

const productDetailsStyles = StyleSheet.create({
    container: {
        borderTopLeftRadius: wp(10),
        borderTopRightRadius: wp(10),
        backgroundColor: '#f2f2f2',
        paddingHorizontal: wp(5),
        paddingTop: hp(3),
        width: '100%'
    },

    imageContainer: {
        width: '100%',
        height: hp(20),
        borderRadius: 10,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center'
    },

    heading: {
        fontSize: FONT_SIZE_18,
        color: '#000000',
        marginVertical: hp(1.5),
        fontWeight: 'bold'
    },

    infoContainer: {
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#FFF',
        paddingVertical: wp(5)
    },

    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp(5),
        paddingVertical: hp(1)
    },

    infoText: {
        fontSize: FONT_SIZE_12,
        color: '#000',
        fontFamily: 'Poppins-light'
    }
})

export default productDetailsStyles
