import { ToConnect, Syncing, ScaningScreen } from '../screens'
import React from 'react'
import BottomTabs from './BottomTabsStack/BottomTabs'
import { createStackNavigator } from '@react-navigation/stack'
import RootStackParamsList from './RootStackParamsList'

const RootStack = createStackNavigator<RootStackParamsList>()

const Navigator = (): JSX.Element => {
    return (
        <RootStack.Navigator
            screenOptions={{ headerShown: false, animationEnabled: false }}
            initialRouteName="ToConnect"
        >
            <RootStack.Screen name="ToConnect" component={ToConnect} />
            <RootStack.Screen name="Syncing" component={Syncing} />
            <RootStack.Screen name="ScanningScreen" component={ScaningScreen} />
            <RootStack.Screen name="BottomTabs" component={BottomTabs} />
        </RootStack.Navigator>
    )
}

export default Navigator
