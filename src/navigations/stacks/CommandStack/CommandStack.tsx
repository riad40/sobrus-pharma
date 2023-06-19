import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Commands } from '../../../screens'
import CommandStackParamsList from './CommandStackParamsList'

const CommandStack = createStackNavigator<CommandStackParamsList>()

const CommandStackScreen = (): JSX.Element => {
    return (
        <CommandStack.Navigator screenOptions={{ headerShown: false }}>
            <CommandStack.Screen name="Commands" component={Commands} />
        </CommandStack.Navigator>
    )
}

export default CommandStackScreen
