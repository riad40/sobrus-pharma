import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Menu, ProductsList, ProductDetails } from '../../../screens'
import MenuStackParamsList from './MenuStackParamsList'

const MenuStack = createStackNavigator<MenuStackParamsList>()

const MenuStackScreen = (): JSX.Element => {
    return (
        <MenuStack.Navigator screenOptions={{ headerShown: false }}>
            <MenuStack.Screen name="Menu" component={Menu} />
            <MenuStack.Screen name="ProductsList" component={ProductsList} />
            <MenuStack.Screen name="ProductDetails" component={ProductDetails} />
        </MenuStack.Navigator>
    )
}

export default MenuStackScreen
