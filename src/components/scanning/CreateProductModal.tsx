import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import colors from '../../constants/colors'
import { FONT_SIZE_14, FONT_SIZE_18 } from '../../constants/fontsSizes'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Modal from 'react-native-modal'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { CustomInputContainer, Button, CustomTextInput } from '..'

interface CreateProductModalProps {
    visible: boolean
    onClose: () => void
    codeBar: string
    productName?: string
    onSave: () => void
    onProductChange: (value: string, type: string) => void
    onQuantityChange: (value: number) => void
}

const CreateProductModal = ({
    visible,
    onClose,
    codeBar,
    productName,
    onSave,
    onProductChange,
    onQuantityChange
}: CreateProductModalProps): JSX.Element => {
    return (
        <Modal isVisible={visible} onBackdropPress={onClose} style={styles.modal} backdropOpacity={0.5}>
            <View style={styles.modalContainer}>
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
                                onChangeText={value => console.log(value)}
                                editable={false}
                            />
                        }
                    />
                    <CustomInputContainer
                        label="Nom du produit"
                        element={
                            <CustomTextInput
                                placeholder="Nom du produit"
                                value={productName || ''}
                                onChangeText={value => onProductChange(value, 'productName')}
                                editable={productName === undefined ? true : false}
                            />
                        }
                    />

                    <CustomInputContainer
                        label="Quantité"
                        element={
                            <CustomTextInput
                                placeholder="Quantité"
                                onChangeText={value => onQuantityChange(parseInt(value))}
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
                            onSave()
                            onClose()
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

export default CreateProductModal