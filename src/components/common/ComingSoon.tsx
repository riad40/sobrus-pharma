import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import colors from '../../constants/colors'

const ComingSoon = () => {
    return (
        <View style={styles.container}>
            <Ionicons name="construct-outline" size={50} color={colors.primary} />
            <Text style={styles.text}>soon...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontFamily: 'Poppins-Regular',
        fontSize: 20,
        color: colors.primary
    }
})

export default ComingSoon
