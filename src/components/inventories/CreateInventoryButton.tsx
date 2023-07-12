import React from 'react'
import { View, Pressable, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Ionicons from 'react-native-vector-icons/Ionicons'
import colors from '../../constants/colors'

interface CreateInventoryButtonProps {
    onPress: () => void
}

const CreateInventoryButton = ({ onPress }: CreateInventoryButtonProps): JSX.Element => {
    return (
        <View style={styles.container}>
            <Pressable style={styles.button} onPress={onPress}>
                <Ionicons name="add-sharp" size={30} color={colors.white} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: hp(5),
        right: wp(5),
        zIndex: 999
    },
    button: {
        backgroundColor: colors.primary,
        borderRadius: hp(7.5),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: wp(15),
        height: hp(7.5),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5
    }
})

export default CreateInventoryButton
