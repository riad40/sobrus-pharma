import React, { useRef } from 'react'
import { View, Pressable, StyleSheet, Animated, Dimensions } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import TabView from './TabView'
import colors from '../../constants/colors'

type TabBarProps = {
    state: BottomTabBarProps['state']
    descriptors: BottomTabBarProps['descriptors']
    navigation: BottomTabBarProps['navigation']
}

const TabBar = ({ state, descriptors, navigation }: TabBarProps): JSX.Element => {
    const translateX = useRef(new Animated.Value(0)).current

    return (
        <View style={tabBarStyles.container}>
            <Animated.View style={[tabBarStyles.activeTab, { transform: [{ translateX }] }]} />

            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key]
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name

                const isFocused = state.index === index

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true
                    })

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name)
                    }

                    Animated.spring(translateX, {
                        toValue: index * (Dimensions.get('window').width / 5),
                        useNativeDriver: true
                    }).start()
                }

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key
                    })
                }

                return (
                    <>
                        <Pressable
                            key={index}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                        >
                            <TabView focused={isFocused} label={label as string} key={index} />
                        </Pressable>
                    </>
                )
            })}
        </View>
    )
}

const tabBarStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
        borderTopColor: '#E2E2E2',
        borderTopWidth: 1,
        height: 60
    },
    activeTab: {
        position: 'absolute',
        width: Dimensions.get('window').width / 5,
        height: 3,
        backgroundColor: colors.primary,
        top: 0
    }
})

export default TabBar
