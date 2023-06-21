import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

const inventoriesListStyles = StyleSheet.create({
    inventoriesContainer: {
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('2%')
    }
})

export default inventoriesListStyles
