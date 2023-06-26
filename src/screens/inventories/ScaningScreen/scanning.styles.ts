import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../../constants/dimensions'
import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../../../constants/colors'

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
        fontFamily: 'Poppins-Regular',
        height: hp(5)
    },
    topContentText: {
        color: '#FFF',
        marginHorizontal: wp(5),
        fontFamily: 'Poppins-Regular',
        textTransform: 'capitalize',
        textAlign: 'center'
    },
    customMarker: {
        width: wp(60),
        height: hp(15),
        backgroundColor: 'lightgray',
        borderColor: 'white',
        opacity: 0.3,
        borderRadius: wp(2)
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
    }
})

export default scanningStyles
