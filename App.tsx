import { View, Text } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { useEffect } from 'react'

const App = (): JSX.Element => {
    useEffect(() => {
        SplashScreen.hide()
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Hey</Text>
        </View>
    )
}

export default App
