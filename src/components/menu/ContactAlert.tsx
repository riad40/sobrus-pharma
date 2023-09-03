import React from 'react'
import { View, Text, StyleSheet, Pressable, Image } from 'react-native'

import colors from '../../constants/colors'
import { FONT_SIZE_12, FONT_SIZE_14, FONT_SIZE_16 } from '../../constants/fontsSizes'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Modal from 'react-native-modal'
import { TouchableOpacity } from 'react-native'

interface ContactAlertProps {
    visible: boolean
    onClose: () => void
    onCall: () => void
    onMail: () => void
}

const ContactAlert = ({ visible, onClose, onCall, onMail }: ContactAlertProps): JSX.Element => {
    return (
        <Modal isVisible={visible} style={styles.modal}>
            <View style={styles.modalContainer}>
                <Pressable style={styles.closeButton} onPress={onClose}>
                    <Ionicons name="close-outline" size={wp(5)} color="black" />
                </Pressable>
                <Text style={styles.modalHeading}>Contacter Sobrus </Text>

                <Text style={styles.modalSubHeading}>Merci de choisir</Text>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            onClose()
                            onCall()
                        }}
                        style={[{ backgroundColor: '#F2F2F2' }, styles.button]}
                    >
                        <Image source={require('../../assets/images/phone.png')} />
                        <Text style={[styles.buttonText, { color: colors.primary }]}>Théléphone</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            onClose()
                            onMail()
                        }}
                        style={[{ backgroundColor: colors.primary }, styles.button]}
                    >
                        <Image source={require('../../assets/images/email.png')} />
                        <Text style={[styles.buttonText, { color: colors.white }]}>E-mail</Text>
                    </TouchableOpacity>
                </View>
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
        fontSize: FONT_SIZE_16,
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',
        color: '#000000',
        textTransform: 'capitalize'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonText: {
        fontSize: FONT_SIZE_12,
        fontFamily: 'Poppins-Regular',
        textTransform: 'uppercase',
        marginLeft: wp(2),
        marginTop: hp(0.5)
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10
    },
    modalSubHeading: {
        fontSize: FONT_SIZE_14,
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'Poppins-Regular',
        color: colors.secondary
    },
    button: {
        width: '48%',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp(1)
    }
})

export default ContactAlert
