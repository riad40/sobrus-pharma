import React, { lazy, Suspense } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import RootStackParamsList from './RootStackParamsList'
import { View, Text } from 'react-native'
import { ToConnect } from '../screens'

// lazy loaded screens
const Syncing = lazy(() => import('../screens/syncing/Syncing'))
const BottomTabs = lazy(() => import('../navigations/BottomTabsStack/BottomTabs'))

// loading component for suspense fallback
const Loading = (): JSX.Element => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
    </View>
)

const RootStack = createStackNavigator<RootStackParamsList>()

const Navigator = (): JSX.Element => {
    return (
        <RootStack.Navigator
            screenOptions={{ headerShown: false, animationEnabled: false }}
            initialRouteName="ToConnect"
        >
            <RootStack.Screen name="ToConnect" component={ToConnect} />
            <RootStack.Screen name="Syncing">
                {() => (
                    <Suspense fallback={<Loading />}>
                        <Syncing />
                    </Suspense>
                )}
            </RootStack.Screen>
            <RootStack.Screen name="BottomTabs">
                {() => (
                    <Suspense fallback={<Loading />}>
                        <BottomTabs />
                    </Suspense>
                )}
            </RootStack.Screen>
        </RootStack.Navigator>
    )
}

export default Navigator
