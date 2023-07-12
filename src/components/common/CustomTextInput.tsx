import React from 'react'
import { KeyboardTypeOptions } from 'react-native'
import { StyleSheet, TextInput } from 'react-native'
import { FONT_SIZE_14 } from '../../constants/fontsSizes'

interface CustomTextInputProps {
    value?: string
    placeholder: string
    editable?: boolean
    onChangeText: (text: string) => void
    keyBoardType?: KeyboardTypeOptions
}

const CustomTextInput = ({
    value,
    placeholder,
    editable,
    onChangeText,
    keyBoardType
}: CustomTextInputProps): JSX.Element => {
    return (
        <>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                editable={editable}
                keyboardType={keyBoardType}
                returnKeyType={'none'}
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
