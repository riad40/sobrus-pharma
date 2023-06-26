import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import colors from '../../constants/colors'
import { FONT_SIZE_14, FONT_SIZE_18 } from '../../constants/fontsSizes'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Modal from 'react-native-modal'
import { CustomInputContainer, CustomSelectModal, Button, DatePicker } from '../'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import RootStackParamsList from '../../navigations/RootStackParamsList'

interface CreateInventoryModalProps {
    visible: boolean
    onClose: () => void
}

const options = ['Inventaire annuel', 'Inventaire tournant', 'Inventaire exceptionnel', 'Inventaire de contrôle']

const CreateInventoryModal = ({ visible, onClose }: CreateInventoryModalProps): JSX.Element => {
    const navigation = useNavigation<NavigationProp<RootStackParamsList>>()

    const [date, setDate] = useState<string>('')
    const [reason, setReason] = useState<string>('')

    return (
        <Modal isVisible={visible} onBackdropPress={onClose} style={styles.modal} backdropOpacity={0.5}>
            <View style={styles.modalContainer}>
                <Pressable onPress={onClose}>
                    <View style={styles.closeModalLine} />
                </Pressable>
                <Text style={styles.modalTitle}>Nouvel inventaire</Text>

                <View style={styles.inputContainer}>
                    <CustomInputContainer
                        label="Date"
                        icon="calendar-outline"
                        element={
                            <DatePicker
                                setDate={value => {
                                    setDate(value)
                                }}
                            />
                        }
                    />
                    <CustomInputContainer
                        label="Raison"
                        icon="chevron-down-outline"
                        element={
                            <CustomSelectModal
                                options={options}
                                initialOption={options[0]}
                                onSelect={value => {
                                    setReason(value)
                                }}
                            />
                        }
                    />
                </View>

                <View style={styles.button}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="chevron-back-outline" size={24} color={colors.primary} />
                    </View>
                    <Button
                        text="Sauvegarder"
                        onPress={() => {
                            onClose()
                            navigation.navigate('ScanningScreen', {
                                data: {
                                    date: date,
                                    reason: reason
                                }
                            })
                        }}
                    />
                </View>
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
        minHeight: '50%',
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
        fontSize: FONT_SIZE_18,
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

    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: wp(5)
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

export default CreateInventoryModal
