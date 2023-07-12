import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import Modal from 'react-native-modal'

import colors from '../../constants/colors'
import { FONT_SIZE_14, FONT_SIZE_16 } from '../../constants/fontsSizes'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { InventoryProducts } from '../../@types'

interface ProductExistAlertProps {
    visible: boolean
    onClose: () => void
    selectedOption?: string
    onOptionSelected: (option: string) => void
    product: InventoryProducts
}

const ProductExistAlert = ({
    visible,
    onClose,
    selectedOption,
    onOptionSelected,
    product
}: ProductExistAlertProps): JSX.Element => {
    return (
        <Modal isVisible={visible} style={styles.modal} backdropOpacity={0.5}>
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>
                    Le produit {product.name} à déjà été inventorié avec une quantité de {product.quantity}
                    {'\n'}
                    Voulez-vous le remplacer ou l&apos; ecraser ?
                </Text>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            onClose()
                            onOptionSelected('replace')
                        }}
                        style={[styles.button, selectedOption === 'replace' ? { backgroundColor: colors.primary } : {}]}
                    >
                        <Text style={[styles.buttonText, { color: colors.white }]}>Remplacer</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            onClose()
                            onOptionSelected('add')
                        }}
                        style={[styles.button, selectedOption === 'add' ? { backgroundColor: colors.primary } : {}]}
                    >
                        <Text style={[styles.buttonText, { color: colors.white }]}>Ecraiser</Text>
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
        width: wp(80),
        borderRadius: 10,
        padding: 20
    },

    modalTitle: {
        fontSize: FONT_SIZE_16,
        textAlign: 'center',
        marginBottom: hp(2),
        color: '#000',
        fontFamily: 'Poppins-Medium'
    },

    buttonsContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    button: {
        width: '100%',
        height: hp(5),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        marginBottom: hp(1)
    },

    buttonText: {
        fontSize: FONT_SIZE_14
    },

    buttonSelected: {
        backgroundColor: colors.primary
    },

    buttonTextSelected: {
        color: colors.white
    },

    buttonDisabled: {
        backgroundColor: colors.secondary
    },

    buttonTextDisabled: {
        color: colors.primary
    }
})

export default ProductExistAlert
