import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const ComingSoon = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/coming-soon.png')} />
            <Text style={styles.text}>Coming soon...</Text>
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
        marginTop: 20,
        fontSize: 20,
        color: '#000',
        fontWeight: '700'
    }
})

export default ComingSoon
