import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import colors from '../../constants/colors'
import { FONT_SIZE_14 } from '../../constants/fontsSizes'

import Modal from 'react-native-modal'

interface EmailSentAlertProps {
    visible: boolean
    onClose: () => void
}

const EmailSentAlert = ({ visible, onClose }: EmailSentAlertProps): JSX.Element => {
    return (
        <Modal isVisible={visible} style={styles.modal} onBackdropPress={onClose} backdropOpacity={0.5}>
            <View style={styles.modalContainer}>
                <Text style={styles.modalHeading}>Email envoyé succévement</Text>
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
        width: '100%',
        borderRadius: 10,
        padding: 20
    },

    modalHeading: {
        fontSize: FONT_SIZE_14,
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
        color: '#000000',
        textTransform: 'capitalize'
    }
})

export default EmailSentAlert
