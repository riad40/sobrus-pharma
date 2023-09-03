import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { InventoriesList, InventoryDetails, ScaningScreen, KnownProducts, UnkownProducts } from '../../../screens'
import InventoryStackParamsList from './InventoryStackParamsList'

const InventoryStack = createStackNavigator<InventoryStackParamsList>()

const InventoryStackScreen = (): JSX.Element => {
    return (
        <InventoryStack.Navigator screenOptions={{ headerShown: false, animationEnabled: false }}>
            <InventoryStack.Screen name="InventoriesList" component={InventoriesList} />
            <InventoryStack.Screen name="InventoryDetails" component={InventoryDetails} />
            <InventoryStack.Screen name="ScanningScreen" component={ScaningScreen} />
            <InventoryStack.Screen name="KnownProducts" component={KnownProducts} />
            <InventoryStack.Screen name="UnknownProducts" component={UnkownProducts} />
        </InventoryStack.Navigator>
    )
}

export default InventoryStackScreen
