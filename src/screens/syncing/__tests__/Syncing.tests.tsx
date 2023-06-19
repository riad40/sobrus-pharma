import React from 'react'
import Syncing from '../Syncing'
import { render } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'

describe('Syncing Screen', () => {
    jest.useFakeTimers()

    const SyncingScreen = (): JSX.Element => {
        return (
            <NavigationContainer>
                <Syncing />
            </NavigationContainer>
        )
    }

    // test all the screen renders
    it('should render correctly', () => {
        const screen = render(<SyncingScreen />)
        expect(screen).toMatchSnapshot()
    })
})
