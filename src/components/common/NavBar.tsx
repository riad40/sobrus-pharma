import React from 'react'
import { Image, View, StyleSheet } from 'react-native'

const NavBar = (): JSX.Element => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/pharmalogo.png')} style={styles.image} />
            <Image source={require('../../assets/images/doctorHeadset.png')} style={styles.image} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    image: {}
})

export default NavBar
