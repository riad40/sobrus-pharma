import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { InventoriesList, InventoryDetails } from '../../../screens'
import InventoryStackParamsList from './InventoryStackParamsList'

const InventoryStack = createStackNavigator<InventoryStackParamsList>()

const InventoryStackScreen = (): JSX.Element => {
    return (
        <InventoryStack.Navigator screenOptions={{ headerShown: false }}>
            <InventoryStack.Screen name="InventoriesList" component={InventoriesList} />
            <InventoryStack.Screen name="InventoryDetails" component={InventoryDetails} />
        </InventoryStack.Navigator>
    )
}

export default InventoryStackScreen
