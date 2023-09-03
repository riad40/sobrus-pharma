import React from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'
import { FONT_SIZE_14 } from '../../constants/fontsSizes'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Ionicons from 'react-native-vector-icons/Ionicons'

//@types
interface MenuItemProps {
    title: string
    onPress: () => void
    logout?: boolean
}

const MenuItem = ({ title, onPress, logout }: MenuItemProps): JSX.Element => {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            {logout && <Ionicons name="log-out-outline" size={wp(5)} color="red" />}
            <Text style={[styles.title, { color: logout ? 'red' : '#000' }]}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        alignItems: 'center',
        paddingVertical: hp(2.5),
        flexDirection: 'row',
        paddingHorizontal: wp(5)
    },

    title: {
        fontSize: FONT_SIZE_14,
        marginLeft: wp(1)
    }
})

export default MenuItem
