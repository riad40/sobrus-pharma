import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Home } from '../../../screens'
import HomeStackParamsList from './HomeStackParamsList'

const HomeStack = createStackNavigator<HomeStackParamsList>()

const HomeStackScreen = (): JSX.Element => {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name="Home" component={Home} />
        </HomeStack.Navigator>
    )
}

export default HomeStackScreen
