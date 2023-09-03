import React from 'react'
import { Image, View, StyleSheet, Pressable, Linking } from 'react-native'

const NavBar = (): JSX.Element => {
    const url = 'tel:+212530500500'

    const handlPhoneCall = async () => {
        await Linking.openURL(url)
    }

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/pharmalogo.png')} style={styles.image} />
            <Pressable onPress={handlPhoneCall}>
                <Image source={require('../../assets/images/doctorHeadset.png')} style={styles.image} />
            </Pressable>
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
