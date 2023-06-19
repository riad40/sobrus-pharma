import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import SplashScreen from 'react-native-splash-screen'
import Navigator from './src/navigations/Navigator'

const App = (): JSX.Element => {
    useEffect(() => {
        SplashScreen.hide()
    }, [])

    return (
        <NavigationContainer>
            <Navigator />
        </NavigationContainer>
    )
}

export default App
