import { StyleSheet, ImageBackground, Dimensions, ScrollView } from 'react-native'
import React, { ReactNode } from 'react'

const BackgroundImage = ({ children }: { children: ReactNode }): JSX.Element => {
    return (
        <ScrollView>
            <ImageBackground source={require('../../assets/images/sobBg.png')} style={styles.image}>
                {children}
            </ImageBackground>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: Dimensions.get('window').width
    }
})

export default BackgroundImage
