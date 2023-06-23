import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import SplashScreen from 'react-native-splash-screen'
import Navigator from './src/navigations/Navigator'
import { Provider } from 'react-redux'
import store from './src/state/store'

const App = (): JSX.Element => {
    useEffect(() => {
        SplashScreen.hide()
    }, [])

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Navigator />
            </NavigationContainer>
        </Provider>
    )
}

export default App
