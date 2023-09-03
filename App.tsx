import 'react-native-gesture-handler'
import React, { useEffect } from 'react'

import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native'
import Navigator from './src/navigations/Navigator'
import RootStackParamsList from './src/navigations/RootStackParamsList'

import SplashScreen from 'react-native-splash-screen'

import { ToastProvider } from 'react-native-toast-notifications'

import { Provider } from 'react-redux'
import store from './src/state/store'

const navigatorRef = React.createRef()

const App = (): JSX.Element => {
    useEffect(() => {
        SplashScreen.hide()
    }, [])

    const handleNavigationRef = (ref: NavigationContainerRef<RootStackParamsList>): void => {
        navigatorRef.current = ref
    }

    return (
        <ToastProvider>
            <Provider store={store}>
                <NavigationContainer ref={handleNavigationRef}>
                    <Navigator />
                </NavigationContainer>
            </Provider>
        </ToastProvider>
    )
}

export { navigatorRef }

export default App
