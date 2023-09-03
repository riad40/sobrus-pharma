import React, { memo } from 'react'
import { KeyboardTypeOptions } from 'react-native'
import { StyleSheet, TextInput } from 'react-native'
import { FONT_SIZE_14 } from '../../constants/fontsSizes'

interface CustomTextInputProps {
    value?: string
    placeholder: string
    editable?: boolean
    onChangeText: (text: string) => void
    keyboardType?: KeyboardTypeOptions
    ref?: React.LegacyRef<TextInput>
    onFocus?: () => void
}

const CustomTextInput = ({
    value,
    placeholder,
    editable,
    onChangeText,
    keyboardType,
    ref,
    onFocus
}: CustomTextInputProps): JSX.Element => {
    console.log(`text input rendred ${placeholder}`)

    return (
        <>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                editable={editable}
                keyboardType={keyboardType}
                returnKeyType={'none'}
                ref={ref}
                onFocus={onFocus}
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

export default memo(CustomTextInput)
