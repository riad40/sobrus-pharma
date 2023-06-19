import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { InventoriesList, InventoryDetails, ScaningScreen } from '../../../screens'
import InventoryStackParamsList from './InventoryStackParamsList'

const InventoryStack = createStackNavigator<InventoryStackParamsList>()

const InventoryStackScreen = (): JSX.Element => {
    return (
        <InventoryStack.Navigator screenOptions={{ headerShown: false }}>
            <InventoryStack.Screen name="InventoriesList" component={InventoriesList} />
            <InventoryStack.Screen name="InventoryDetails" component={InventoryDetails} />
            <InventoryStack.Screen name="ScaningScreen" component={ScaningScreen} />
        </InventoryStack.Navigator>
    )
}

export default InventoryStackScreen
