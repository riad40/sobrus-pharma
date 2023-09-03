import React from 'react'
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native'

import Modal from 'react-native-modal'

import colors from '../../constants/colors'
import { FONT_SIZE_14 } from '../../constants/fontsSizes'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { CustomInputContainer, Button, CustomTextInput } from '..'

interface EmailModalProps {
    visible: boolean
    onClose: () => void
    email?: string
    message?: string
    onlyEmail?: boolean
    onSave: () => void
    onEmailChange: (value: string) => void
    onMessageChange: (value: string) => void
    loading?: boolean
    emailError?: string
}

const EmailModal = ({
    visible,
    onClose,
    email,
    message,
    onlyEmail,
    onSave,
    onEmailChange,
    onMessageChange,
    loading,
    emailError
}: EmailModalProps): JSX.Element => {
    return (
        <Modal isVisible={visible} onBackdropPress={onClose} style={styles.modal} backdropOpacity={0.5}>
            <View style={styles.modalContainer}>
                <Pressable onPress={onClose}>
                    <View style={styles.closeModalLine} />
                </Pressable>
                <Text style={styles.modalTitle}>Veuillez saisir les informations nécessaires</Text>

                <View style={styles.inputContainer}>
                    {onlyEmail && (
                        <CustomInputContainer
                            label="Email"
                            error={emailError}
                            element={
                                <CustomTextInput
                                    placeholder="Email"
                                    value={email}
                                    onChangeText={value => onEmailChange(value)}
                                    editable={true}
                                />
                            }
                        />
                    )}

                    {!onlyEmail && (
                        <CustomInputContainer
                            label="Message"
                            element={
                                <TextInput
                                    placeholder="Message"
                                    value={message}
                                    onChangeText={value => onMessageChange(value)}
                                    editable={true}
                                    style={{
                                        height: hp(20),
                                        width: '100%',
                                        textAlignVertical: 'top'
                                    }}
                                />
                            }
                        />
                    )}
                </View>

                <Button text="Envoyer" onPress={onSave} loading={loading} />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0
    },

    modalContainer: {
        backgroundColor: colors.white,
        paddingHorizontal: wp(5),
        borderRadius: wp(2),
        maxHeight: '90%',
        borderTopLeftRadius: hp(5),
        borderTopRightRadius: hp(5)
    },

    closeModalLine: {
        marginBottom: hp(2),
        width: wp(15),
        height: hp(0.5),
        backgroundColor: colors.secondary,
        borderRadius: wp(1),
        alignSelf: 'center',
        marginTop: wp(2)
    },

    modalTitle: {
        fontSize: FONT_SIZE_14,
        fontFamily: 'Poppins-SemiBold',
        marginBottom: wp(5),
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

export default EmailModal
