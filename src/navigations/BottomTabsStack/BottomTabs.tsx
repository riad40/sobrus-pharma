import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeStackScreen, OfferStackScreen, CommandStackScreen, InventoryStackScreen, MenuStackScreen } from '../stacks'
import BottomTabsParamsList from './BottomTabsParamsList'
import TabBar from '../../components/navigation/TabBar'

const Tabs = createBottomTabNavigator<BottomTabsParamsList>()

const BottomTabs = (): JSX.Element => {
    return (
        <>
            <Tabs.Navigator screenOptions={{ headerShown: false }} tabBar={props => <TabBar {...props} />}>
                <Tabs.Screen name="HomeStack" component={HomeStackScreen} />
                <Tabs.Screen name="OffersStack" component={OfferStackScreen} />
                <Tabs.Screen name="CommandsStack" component={CommandStackScreen} />
                <Tabs.Screen name="InventoriesStack" component={InventoryStackScreen} />
                <Tabs.Screen name="MenuStack" component={MenuStackScreen} />
            </Tabs.Navigator>
        </>
    )
}

export default BottomTabs
