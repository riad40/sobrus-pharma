import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { FONT_SIZE_14 } from '../../constants/fontsSizes'

interface CustomTextInputProps {
    value?: string
    placeholder: string
    editable?: boolean
    onChangeText: (text: string) => void
}

const CustomTextInput = ({ value, placeholder, editable, onChangeText }: CustomTextInputProps): JSX.Element => {
    return (
        <>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                editable={editable}
            />
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        fontSize: FONT_SIZE_14,
        color: '#000000',
        width: '90%'
    }
})

export default CustomTextInput
