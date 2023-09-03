import React, { useState, useEffect, memo } from 'react'
import { View, Text, StyleSheet, Pressable, Keyboard, ViewStyle } from 'react-native'

import Modal from 'react-native-modal'

import colors from '../../constants/colors'
import { FONT_SIZE_14, FONT_SIZE_18 } from '../../constants/fontsSizes'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { CustomInputContainer, Button, CustomTextInput } from '..'

interface CreateProductModalProps {
    visible: boolean
    onClose: () => void
    codeBar: string
    name?: string
    quantity?: number
    onSave: () => void
    onProductChange: (value: string, type: string) => void
    onQuantityChange: (value: number) => void
    error?: { name: string; quantity: string }
}

const CreateProductModal = ({
    visible,
    onClose,
    codeBar,
    name,
    onSave,
    onProductChange,
    onQuantityChange,
    error
}: CreateProductModalProps): JSX.Element => {
    const [keyboardShown, setKeyboardShown] = useState(false)
    const [keyboardType, setKeyboardType] = useState<string>('')
    // const [keyboardHeight, setKeyboardHeight] = useState<number>(0)

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            // setKeyboardHeight(e.endCoordinates.height)
            setKeyboardShown(true)
        })

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            // setKeyboardHeight(0)
            setKeyboardType('')
            setKeyboardShown(false)
        })

        return () => {
            keyboardDidShowListener.remove()
            keyboardDidHideListener.remove()
        }
    }, [])

    const modalContainerStyle: ViewStyle = {
        justifyContent: keyboardShown ? 'flex-start' : 'flex-end'
    }

    return (
        <Modal
            isVisible={visible}
            onBackdropPress={onClose}
            style={[styles.modal, modalContainerStyle]}
            backdropOpacity={0.5}
        >
            <View
                style={[
                    styles.modalContainer,
                    keyboardShown && { marginTop: keyboardType === 'numeric' ? hp(16) : hp(2) }
                ]}
            >
                <Pressable onPress={onClose}>
                    <View style={styles.closeModalLine} />
                </Pressable>
                <Text style={styles.modalTitle}>Ajouter un produit</Text>

                <View style={styles.inputContainer}>
                    <CustomInputContainer
                        label="Code Bar"
                        element={
                            <CustomTextInput
                                placeholder="Code Bar"
                                value={codeBar}
                                onChangeText={value => value}
                                editable={false}
                            />
                        }
                    />
                    <CustomInputContainer
                        label="Nom du produit"
                        error={error?.name}
                        element={
                            <CustomTextInput
                                placeholder="Nom du produit"
                                value={name || ''}
                                onChangeText={value => onProductChange(value, 'name')}
                                editable={true}
                                onFocus={() => setKeyboardType('')}
                            />
                        }
                    />

                    <CustomInputContainer
                        label="Quantité"
                        error={error?.quantity}
                        element={
                            <CustomTextInput
                                placeholder="Quantité"
                                onChangeText={value => onQuantityChange(parseInt(value))}
                                keyboardType="numeric"
                                onFocus={() => setKeyboardType('numeric')}
                            />
                        }
                    />
                </View>

                <View style={styles.button}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="chevron-back-outline" size={24} color={colors.primary} />
                    </View>
                    <Button text="Sauvegarder" onPress={onSave} />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        margin: 0
    },

    modalContainer: {
        backgroundColor: colors.white,
        paddingHorizontal: wp(5),
        borderRadius: wp(2),
        borderTopLeftRadius: hp(5),
        borderTopRightRadius: hp(5)
    },

    closeModalLine: {
        marginVertical: hp(2),
        width: wp(15),
        height: hp(0.5),
        backgroundColor: colors.secondary,
        borderRadius: wp(1),
        alignSelf: 'center'
    },

    modalTitle: {
        fontSize: FONT_SIZE_18,
        fontFamily: 'Poppins-SemiBold',
        marginBottom: wp(2),
        textAlign: 'center',
        color: '#000'
    },

    inputContainer: {
        marginBottom: wp(5)
    },

    input: {
        borderWidth: 1,
        borderColor: colors.secondary,
        borderRadius: wp(1),
        padding: wp(2)
    },

    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: wp(5),
        paddingBottom: hp(1)
    },

    buttonText: {
        color: colors.white,
        fontSize: FONT_SIZE_14,
        fontFamily: 'Poppins-Medium'
    },

    iconContainer: {
        borderRadius: wp(2),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: wp(2),
        borderWidth: 1,
        borderColor: colors.primary,
        padding: wp(3.5)
    }
})

export default memo(CreateProductModal)
