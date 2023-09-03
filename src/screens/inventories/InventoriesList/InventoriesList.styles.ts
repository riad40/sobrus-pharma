import { StyleSheet } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../../../constants/colors'

const inventoriesListStyles = StyleSheet.create({
    inventoriesContainer: {
        paddingVertical: hp('2%')
    },
    newInventoryAddedContainer2: {
        position: 'absolute',
        top: hp(11.5),
        zIndex: 9999,
        width: '90%',
        alignSelf: 'center',
        shadowColor: '#E0F6F4',
        backgroundColor: '#E0F6F4',
        paddingHorizontal: hp(2),
        paddingVertical: hp(1),
        borderRadius: 20
    },
    newInventoryAddedContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },

    newInventoryAddedText: {
        fontSize: hp(2),
        fontWeight: '500',
        color: colors.primary
    }
})

export default inventoriesListStyles
