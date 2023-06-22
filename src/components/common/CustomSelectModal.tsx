import React, { useState } from 'react'
import { TouchableOpacity, View, ScrollView, StyleSheet, Text } from 'react-native'
import Modal from 'react-native-modal'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONT_SIZE_14 } from '../../constants/fontsSizes'
import colors from '../../constants/colors'

interface CustomSelectModalProps {
    options: string[]
    initialOption: string
    onSelect: (option: string) => void
}

const CustomSelectModal = ({ options, onSelect, initialOption }: CustomSelectModalProps): JSX.Element => {
    const [show, setShow] = useState<boolean>(false)

    const [selectedOption, setSelectedOption] = useState<string>(initialOption)

    const handleSelectOption = (option: string): void => {
        onSelect(option)
        setSelectedOption(option)
        setShow(false)
    }

    return (
        <>
            <TouchableOpacity style={styles.button} onPress={() => setShow(!show)}>
                <Text style={styles.buttonText}>{selectedOption}</Text>
            </TouchableOpacity>

            {show && (
                <Modal isVisible={show} onBackdropPress={() => setShow(false)} onBackButtonPress={() => setShow(false)}>
                    <View style={styles.modalContainer}>
                        <ScrollView>
                            {options.map((option, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.optionContainer}
                                    onPress={() => handleSelectOption(option)}
                                >
                                    <Text style={styles.optionText}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </Modal>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: colors.white,
        paddingHorizontal: wp(5),
        borderRadius: wp(2),
        maxHeight: '90%',
        borderRaduis: wp(5),
        paddingVertical: hp(2)
    },

    optionContainer: {
        width: '90%',
        marginVertical: hp(1)
    },

    option: {
        width: '90%'
    },

    optionTextContainer: {
        width: '90%'
    },

    optionText: {
        fontSize: FONT_SIZE_14,
        color: 'black',
        textAlign: 'left'
    },
    button: {
        width: '90%',
        height: hp(6),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(3)
    },
    buttonText: {
        fontSize: FONT_SIZE_14,
        color: '#000'
    }
})

export default CustomSelectModal
