import React, { useRef } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeStackScreen, OfferStackScreen, CommandStackScreen, InventoryStackScreen, MenuStackScreen } from '../stacks'
import BottomTabsParamsList from './BottomTabsParamsList'
import TabView from '../../components/navigation/TabView'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { Animated, StyleSheet } from 'react-native'
import { SCREEN_WIDTH } from '../../constants/dimensions'
import colors from '../../constants/colors'
import { navigatorRef } from '../../../App'

const Tabs = createBottomTabNavigator<BottomTabsParamsList>()

const BottomTabs = (): JSX.Element => {
    const translateX = useRef(new Animated.Value(0)).current

    const animatedTab = (toValue: number) => {
        Animated.spring(translateX, {
            toValue: toValue,
            useNativeDriver: true
        }).start()
    }

    const { name } = navigatorRef.current.getCurrentRoute()

    return (
        <>
            <Animated.View
                style={[
                    styles.activeTab,
                    { transform: [{ translateX }] },
                    { display: name === 'ScanningScreen' ? 'none' : 'flex' }
                ]}
            />

            <Tabs.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarHideOnKeyboard: true,
                    tabBarStyle: {
                        display: getFocusedRouteNameFromRoute(route) === 'ScanningScreen' ? 'none' : 'flex'
                    },
                    tabBarLabel: () => null,
                    tabBarIcon: ({ focused }) => {
                        let label = ''

                        switch (route.name) {
                            case 'HomeStack':
                                label = 'HomeStack'
                                break

                            case 'MenuStack':
                                label = 'MenuStack'
                                break

                            case 'CommandsStack':
                                label = 'CommandsStack'
                                break

                            case 'InventoriesStack':
                                label = 'InventoriesStack'
                                break

                            case 'OffersStack':
                                label = 'OffersStack'
                                break
                        }

                        return <TabView focused={focused} label={label} />
                    }
                })}
            >
                {/*  HomeStack */}
                <Tabs.Screen
                    name="HomeStack"
                    component={HomeStackScreen}
                    listeners={() => ({
                        tabPress: () => {
                            animatedTab(0)
                        }
                    })}
                />

                {/*  OfferStack */}
                <Tabs.Screen
                    name="OffersStack"
                    component={OfferStackScreen}
                    listeners={() => ({
                        tabPress: () => {
                            animatedTab(SCREEN_WIDTH / 5)
                        }
                    })}
                />

                {/*  CommandStack */}
                <Tabs.Screen
                    name="CommandsStack"
                    component={CommandStackScreen}
                    listeners={() => ({
                        tabPress: () => {
                            animatedTab((SCREEN_WIDTH / 5) * 2)
                        }
                    })}
                />

                {/*  InventoryStack */}
                <Tabs.Screen
                    name="InventoriesStack"
                    component={InventoryStackScreen}
                    listeners={() => ({
                        tabPress: () => {
                            animatedTab((SCREEN_WIDTH / 5) * 3)
                        }
                    })}
                />

                {/*  MenuStack */}
                <Tabs.Screen
                    name="MenuStack"
                    component={MenuStackScreen}
                    listeners={() => ({
                        tabPress: () => {
                            animatedTab((SCREEN_WIDTH / 5) * 4)
                        }
                    })}
                />
            </Tabs.Navigator>
        </>
    )
}

const styles = StyleSheet.create({
    activeTab: {
        position: 'absolute',
        width: SCREEN_WIDTH / 5,
        zIndex: 999,
        height: 4,
        backgroundColor: colors.primary,
        bottom: 45
    }
})

export default BottomTabs
