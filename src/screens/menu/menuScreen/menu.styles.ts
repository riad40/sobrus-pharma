import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import colors from '../../../constants/colors'
import { SCREEN_HEIGHT } from '../../../constants/dimensions'

const menuStyles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        height: SCREEN_HEIGHT,
        borderTopLeftRadius: wp(10),
        borderTopRightRadius: wp(10)
    }
})

export default menuStyles
