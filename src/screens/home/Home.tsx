import React from 'react'
import { View, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Home = (): JSX.Element => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} testID="HomeScreen">
            <Text>Home Screen</Text>
            <Ionicons name="home" size={30} color="#4F8EF7" />
        </View>
    )
}

export default Home
