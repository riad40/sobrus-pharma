import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import colors from '../../constants/colors'
import { FONT_SIZE_14, FONT_SIZE_18 } from '../../constants/fontsSizes'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Modal from 'react-native-modal'

interface SuccessAlertProps {
    visible: boolean
    onClose: () => void
    message: string
    onContinue: () => void
    onQuit: () => void
}

const SuccessAlert = ({ visible, onClose, message, onContinue, onQuit }: SuccessAlertProps): JSX.Element => {
    return (
        <Modal isVisible={visible} onBackdropPress={onClose} style={styles.modal} backdropOpacity={0.5}>
            <View style={styles.modalContainer}>
                <Text style={styles.modalMessage}>{message}</Text>

                <Pressable
                    onPress={() => {
                        onClose()
                        onContinue()
                    }}
                    style={[styles.buttonsContainer, { backgroundColor: colors.primary }]}
                >
                    <Text style={[styles.buttonText, { color: colors.white }]}>Enregistrer et continuer</Text>
                </Pressable>

                <Pressable
                    onPress={() => {
                        onClose()
                        onQuit()
                    }}
                    style={[styles.buttonsContainer, { backgroundColor: 'lightgrey' }]}
                >
                    <Text style={[styles.buttonText, { color: colors.primary }]}>Enregistrer et quitter</Text>
                </Pressable>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        backgroundColor: colors.white,
        width: wp('80%'),
        borderRadius: 10,
        padding: 20
    },
    modalMessage: {
        fontSize: FONT_SIZE_18,
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'Poppins-SemiBold',
        color: '#000000',
        textTransform: 'capitalize'
    },
    buttonsContainer: {
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10
    },
    buttonText: {
        fontSize: FONT_SIZE_14,
        fontFamily: 'Poppins-SemiBold'
    }
})

export default SuccessAlert
