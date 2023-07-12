import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import colors from '../../../constants/colors'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../../constants/dimensions'

import { FONT_SIZE_14 } from '../../../constants/fontsSizes'

const scanningStyles = StyleSheet.create({
    container: {
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH
    },
    cameraStyle: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT
    },
    topContent: {
        position: 'absolute',
        top: hp(20),
        zIndex: 999,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(5),
        backgroundColor: colors.white,
        borderRadius: wp(20),
        width: '70%',
        alignSelf: 'center'
    },
    topContentInput: {
        width: '80%',
        backgroundColor: '#FFF',
        borderRadius: wp(20),
        paddingHorizontal: wp(5),
        paddingVertical: hp(1),
        fontFamily: 'Poppins-Regular'
    },
    bottomContent: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        width: '60%',
        bottom: hp(20),
        alignSelf: 'center'
    },
    bottomContentButtom: {
        textAlign: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(5),
        paddingVertical: hp(1),
        backgroundColor: '#707070',
        borderRadius: wp(20)
    },
    bottomContentText: {
        color: '#FFF',
        marginHorizontal: wp(1),
        fontFamily: 'Poppins-Regular',
        textTransform: 'capitalize'
    },
    offContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: FONT_SIZE_14,
        color: 'white'
    }
})

export default scanningStyles
