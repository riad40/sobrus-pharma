import React from 'react'
import OfferStackParamsList from './OfferStackParamsList'
import { createStackNavigator } from '@react-navigation/stack'
import { Offers } from '../../../screens'

const OfferStack = createStackNavigator<OfferStackParamsList>()

const OfferStackScreen = (): JSX.Element => {
    return (
        <OfferStack.Navigator screenOptions={{ headerShown: false }}>
            <OfferStack.Screen name="Offers" component={Offers} />
        </OfferStack.Navigator>
    )
}

export default OfferStackScreen
