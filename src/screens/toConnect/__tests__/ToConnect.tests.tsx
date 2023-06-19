import React from 'react'
import ToConnect from '../ToConnect'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native'

jest.useFakeTimers()

jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native')
    return {
        ...actualNav,
        useNavigation: jest.fn()
    }
})

describe('ToConnect Screen', () => {
    const mockNavigate = jest.fn()

    const mockUseNavigation = () => {
        return {
            navigate: mockNavigate,
            addListener: jest.fn()
        }
    }

    beforeEach(() => {
        ;(useNavigation as jest.Mock).mockReturnValue(mockUseNavigation())
    })

    const ToConnectScreen = (): JSX.Element => {
        return (
            <NavigationContainer>
                <ToConnect />
            </NavigationContainer>
        )
    }

    // test all the screen renders
    it('should render correctly', () => {
        const screen = render(<ToConnectScreen />)
        expect(screen).toMatchSnapshot()
    })

    // test the image renders
    it('should render the image', () => {
        const screen = render(<ToConnectScreen />)
        const image = screen.getByTestId('toConnectImage')
        expect(image).toBeTruthy()
    })

    // test the button press and wait 2 seconds then navigate to the next screen
    it('should navigate to the next screen', async () => {
        const screen = render(<ToConnectScreen />)
        const button = screen.getByTestId('Button')
        fireEvent.press(button)
        jest.advanceTimersByTime(2000)
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('Syncing'))
    })
})
