import React from 'react'
import { Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import colors from '../../constants/colors'

type ButtonProps = {
    text: string
    disabled?: boolean
    loading?: boolean
    testID?: string
    onPress?: () => void
}

const Button = ({ text, disabled, loading, onPress, testID }: ButtonProps): JSX.Element => {
    return (
        <TouchableOpacity style={styles.buttonContainer} disabled={disabled} onPress={onPress} testID={testID}>
            <Text style={styles.buttonText}>{loading ? <ActivityIndicator color="#fff" /> : text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: colors.primary,
        paddingVertical: 20,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10
    },
    buttonText: {
        fontFamily: 'Poppins-Meduim',
        fontSize: 16,
        color: '#fff',
        textAlign: 'center'
    }
})

export default Button
